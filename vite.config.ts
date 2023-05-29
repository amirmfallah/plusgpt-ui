import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import type { Plugin } from 'vite';
// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  console.log(mode);
  const env = loadEnv(mode, process.cwd(), '');
  console.log(env.VITE_SERVER_URL);
  return {
    server: {
      host: '0.0.0.0',
      port: 3090,
      strictPort: false,
      proxy: {
        '/api': {
          target: env.VITE_SERVER_URL,
          changeOrigin: true,
          secure: false
        },
        '/auth': {
          target: env.VITE_SERVER_URL,
          changeOrigin: true,
          secure: false
        },
        '/oauth': {
          target: env.VITE_SERVER_URL,
          changeOrigin: true,
          secure: false
        }
      }
    },
    plugins: [react(), sourcemapExclude({ excludeNodeModules: true })],
    publicDir: './public',
    build: {
      sourcemap: true,
      outDir: './dist',
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          }
        }
      }
    },
    resolve: {
      alias: {
        '~': path.join(__dirname, 'src/')
      }
    }
  };
});

interface SourcemapExclude {
  excludeNodeModules?: boolean;
}
export function sourcemapExclude(opts?: SourcemapExclude): Plugin {
  return {
    name: 'sourcemap-exclude',
    transform(code: string, id: string) {
      if (opts?.excludeNodeModules && id.includes('node_modules')) {
        return {
          code,
          // https://github.com/rollup/rollup/blob/master/docs/plugin-development/index.md#source-code-transformations
          map: { mappings: '' }
        };
      }
    }
  };
}

function htmlPlugin(env: ReturnType<typeof loadEnv>) {
  return {
    name: 'html-transform',
    transformIndexHtml: {
      enforce: 'pre' as const,
      transform: (html: string): string => html.replace(/%(.*?)%/g, (match, p1) => env[p1] ?? match)
    }
  };
}
