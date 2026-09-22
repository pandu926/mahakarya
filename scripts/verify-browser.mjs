/* global window, document, innerHeight, innerWidth, HTMLCanvasElement, Event */
import assert from 'node:assert/strict'
import process from 'node:process'
import console from 'node:console'
import { existsSync } from 'node:fs'
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { chromium } from 'playwright'
import { createServer } from 'vite'

const server = process.env.BASE_URL ? null : await createServer({ server: { host: '127.0.0.1', port: 0 } })
await server?.listen()
const baseURL = (process.env.BASE_URL || server.resolvedUrls.local[0]).replace(/\/$/, '') + '/?debug=1'
const artifacts = await mkdtemp(join(tmpdir(), 'mahakarya-browser-'))
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || (existsSync('/usr/bin/google-chrome') ? '/usr/bin/google-chrome' : undefined),
  headless: true,
  args: ['--no-sandbox', '--enable-unsafe-swiftshader', '--use-gl=angle', '--use-angle=swiftshader'],
})
const errors = []
try {
  const page = await browser.newPage({ viewport: { width: 1536, height: 1024 }, reducedMotion: 'reduce' })
  page.on('pageerror', e => errors.push(e.message))
  page.on('console', message => { if (message.type() === 'error' && !message.text().includes('favicon')) errors.push(message.text()) })
  await page.goto(baseURL)
  await page.locator('.mk-loader').waitFor({ state: 'hidden' })
  assert.equal(await page.locator('canvas').count(), 1)
  await page.waitForFunction(() => Number(document.querySelector('canvas')?.dataset.triangles) > 1000)
  assert.equal(await page.locator('canvas').getAttribute('data-world-valid'), 'true', 'All world coordinates must be finite; catches JS/TS module shadowing')
  assert.equal(await page.locator('canvas').getAttribute('data-landmark-count'), '6')
  assert(Number(await page.locator('canvas').getAttribute('data-triangles')) > 1000)
  console.log('Renderer:', await page.locator('canvas').evaluate(canvas => ({ drawCalls: canvas.dataset.drawCalls, triangles: canvas.dataset.triangles })))
  for (const [name, progress] of [['prelude', 0], ['prelude-leaving', .1], ['origins', .2275], ['craft', .3875], ['impact', .5575], ['process', .73], ['future', .895], ['end', 1]]) {
    await page.evaluate(p => window.scrollTo(0, p * (document.documentElement.scrollHeight - innerHeight)), progress)
    if (!['prelude-leaving', 'end'].includes(name)) await page.locator(`[data-storyboard-state="${name}"]`).waitFor()
    await page.waitForTimeout(350)
    await page.screenshot({ path: join(artifacts, `${name}.png`) })
  }
  await page.goto(baseURL + '#impact/digital-experience-platform')
  await page.locator('.mk-project-overlay').waitFor()
  await page.keyboard.press('Escape')
  await page.locator('.mk-project-overlay').waitFor({ state: 'detached' })
  await page.locator('.mk-project-index button').first().click()
  await page.locator('.mk-project-overlay').waitFor()
  await page.goBack()
  await page.locator('.mk-project-overlay').waitFor({ state: 'detached' })
  await page.goForward()
  await page.locator('.mk-project-overlay').waitFor()
  await page.keyboard.press('Escape')
  await page.locator('.mk-project-overlay').waitFor({ state: 'detached' })
  await page.getByRole('button', { name: 'Menu', exact: true }).click()
  await page.locator('.mk-menu-overlay.is-open').waitFor()
  assert.equal(await page.evaluate(() => document.body.style.overflow), 'hidden')
  await page.locator('.mk-menu-chapters button').last().click()
  await page.locator('[data-storyboard-state="future"]').waitFor()
  await page.setViewportSize({ width: 1024, height: 768 })
  await page.waitForTimeout(350)
  assert.equal(await page.locator('[data-storyboard-state]').getAttribute('data-storyboard-state'), 'future', 'Resize must preserve the chapter')
  for (const [width, height] of [[1366, 768], [1024, 768], [768, 1024], [390, 844], [360, 800]]) {
    await page.setViewportSize({ width, height })
    await page.goto(baseURL)
    await page.locator('.mk-loader').waitFor({ state: 'hidden' })
    assert.equal(await page.locator('canvas').count(), 1)
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'No horizontal body overflow')
    if (width < 768) assert.equal(await page.locator('[data-mobile-chapter]').count(), 6)
    await page.screenshot({ path: join(artifacts, `${width}x${height}.png`) })
  }
  const fallback = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
  await fallback.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext
    HTMLCanvasElement.prototype.getContext = function(type, ...args) {
      if (String(type).includes('webgl')) return null
      return original.call(this, type, ...args)
    }
  })
  await fallback.goto(baseURL + '#origins')
  await fallback.locator('.mk-loader').waitFor({ state: 'hidden' })
  await fallback.locator('[data-storyboard-state="origins"]').waitFor()
  assert.equal(await fallback.locator('[data-webgl-fallback="true"]').count(), 1)
  await fallback.screenshot({ path: join(artifacts, 'no-webgl.png') })
  // Release the preceding WebGL page before allocating a fresh motion context.
  await page.close()
  await fallback.close()
  const motion = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' })
  motion.on('pageerror', e => errors.push(e.message))
  motion.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  await motion.goto(baseURL + '#impact/digital-experience-platform')
  await motion.locator('.mk-loader').waitFor({ state: 'hidden' })
  await motion.locator('.mk-project-overlay').waitFor()
  await motion.keyboard.press('Escape')
  await motion.locator('[data-storyboard-state="impact"]').waitFor()
  await motion.locator('.mk-story-index__item').nth(2).click()
  await motion.locator('[data-storyboard-state="craft"]').waitFor()
  await motion.keyboard.press('End')
  await motion.locator('[data-storyboard-state="future"]').waitFor()
  await motion.locator('canvas').evaluate(canvas => canvas.dispatchEvent(new Event('webglcontextlost', { cancelable: true })))
  await motion.locator('[data-webgl-fallback="true"]').waitFor()
  await motion.locator('.mk-loader').waitFor({ state: 'hidden' })
  assert.deepEqual(errors, [])
  console.log(`Browser checks passed. Screenshots: ${artifacts}`)
} finally {
  await browser.close()
  await server?.close()
}
