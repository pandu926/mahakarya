import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: { output: { manualChunks: { three: ['three'] } } },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.js'],
    coverage: {
      provider: 'v8',
      exclude: [
        'dist/**',
        'coverage/**',
        'scripts/**',
        '*.config.{js,ts}',
        'src/App.{jsx,tsx}',
        'src/main.{jsx,tsx}',
        'src/components/**',
        'src/chapters/**',
        'src/experience/**',
        'src/hooks/**',
        'src/data/**',
        'src/store/experienceStore.ts',
      ],
      thresholds: { lines: 80, functions: 80, branches: 80, statements: 80 },
    },
  },
})
