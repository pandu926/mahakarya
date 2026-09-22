/* global window, document, innerHeight */
import assert from 'node:assert/strict'
import process from 'node:process'
import console from 'node:console'
import { existsSync } from 'node:fs'
import { chromium } from 'playwright'
import { preview } from 'vite'

// Capture the immutable production build, never an HMR page during source edits.
const server = await preview({ preview: { host: '127.0.0.1', port: 0, open: false } })
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || (existsSync('/usr/bin/google-chrome') ? '/usr/bin/google-chrome' : undefined),
  args: ['--no-sandbox', '--enable-unsafe-swiftshader', '--use-gl=angle', '--use-angle=swiftshader'],
})
try {
  const errors = []
  const page = await browser.newPage({ viewport: { width: 1536, height: 1024 }, reducedMotion: 'reduce' })
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  await page.goto(server.resolvedUrls.local[0] + '?debug=1')
  await page.locator('.mk-loader').waitFor({ state: 'hidden' })
  assert.equal(await page.locator('canvas').getAttribute('data-world-valid'), 'true')
  assert.equal(await page.locator('canvas').getAttribute('data-landmark-count'), '6')
  await page.addStyleTag({ content: '.mk-content,.mk-topbar,.mk-chapter-rail,.mk-current-chapter,.mk-cursor,.mk-atmosphere { visibility:hidden!important; }' })
  const captures = []
  for (const [name, progress] of [['prelude', 0], ['origins', .2275], ['craft', .3875], ['impact', .5575], ['process', .73], ['future', .895]]) {
    await page.evaluate(p => window.scrollTo(0, p * (document.documentElement.scrollHeight - innerHeight)), progress)
    await page.locator(`[data-storyboard-state="${name}"]`).waitFor({ state: 'attached' })
    await page.waitForTimeout(500)
    assert.equal(await page.locator('vite-error-overlay').count(), 0)
    assert.deepEqual(errors, [])
    const clip = name === 'prelude' ? { x: 80, y: 60, width: 460, height: 585 } : { x: 760, y: 60, width: 700, height: 595 }
    captures.push([name, await page.screenshot({ type: 'jpeg', quality: 90, clip })])
  }
  // Do not overwrite any assets until all six captures have passed readiness checks.
  const { writeFile } = await import('node:fs/promises')
  for (const [name, bytes] of captures) await writeFile(`public/assets/images/chapters/${name}.jpg`, bytes)
  console.log('Captured six validated production scenes.')
} finally {
  await browser.close()
  await new Promise(resolve => server.httpServer.close(resolve))
}
