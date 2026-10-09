// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // GitHub Pages : https://kbosirany.github.io/kportfolio/
  site: 'https://kbosirany.github.io',
  base: '/kportfolio',
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()],
  },
});
