import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://bashburn.com',
  vite: {
    plugins: [tailwindcss()],
  },
});
