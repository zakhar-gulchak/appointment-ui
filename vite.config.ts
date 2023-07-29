import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import devtools from 'solid-devtools/vite'
import suidPlugin from '@suid/vite-plugin'

export default defineConfig({
  plugins: [
    suidPlugin(),
    devtools({
      /* additional options */
      autoname: true, // e.g. enable autoname
      locator: {
        targetIDE: 'webstorm',
        componentLocation: true,
        jsxLocation: true,
      },
    }),
    solidPlugin({ hot: false }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
})
