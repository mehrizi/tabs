import react from '@vitejs/plugin-react-swc';
import { readFileSync } from 'fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import dts from "vite-plugin-dts";
import * as packageJson from './package.json';
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    dts({
      rollupTypes: true ,
      // root:'./src/Components',
      // include: ['src/Components'],
      // exclude: ['src/Components/index.ts']
    }),
    {
      name: 'load-file',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/api/readme') {
            const filePath = resolve(__dirname, 'README.md');
            const fileContent = readFileSync(filePath, 'utf-8');
            res.setHeader('Content-Type', 'text/plain');
            res.end(fileContent);
            return;
          }
          next();
        });
      }
    },
    viteStaticCopy({
      targets: [
        {
          src: 'README.md',
          dest: ''
        }
      ]
    })
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
