import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        dashboard: resolve(__dirname, 'dashboard.html'),
        locations: resolve(__dirname, 'locations.html'),
        experience: resolve(__dirname, 'experience.html'),
        project: resolve(__dirname, 'project.html'),
        how: resolve(__dirname, 'how.html')
      }
    }
  }
});
