import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
        // TODO: Update your API to use a universal router, then route all requests to the server here
      '/api': 'http://localhost:3000',
      '/ws': {
        target: 'ws://localhost:3000',
        ws: true,
      },
    },
  },
});