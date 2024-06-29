import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'node:path'
import * as packageJson from './package.json'
import dts from "vite-plugin-dts";
import terser from '@rollup/plugin-terser';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    dts({
      rollupTypes: true ,
      // root:'./src/Components',
      // include: ['src/Components'],
      // exclude: ['src/Components/index.ts']
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test-setup.ts'],
  },
  build: {
    lib: {
      entry: resolve('src', 'Components/index.ts'),
      name: 'ScrollingTabs',
      formats: ['es', 'umd'],
      fileName: (format) => `scrolling-tabs.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
      output: {
        globals: {
          react: 'React'
        }
      },
      
    },
  },
  // rollupOutputOptions:{
  //   plugins: [
  //     terser({
  //       // mangle: false,
  //       // keep_fnames: true,
  //     }),
  //   ],
  // }

})
