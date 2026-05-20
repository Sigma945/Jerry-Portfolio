// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://sigma945.github.io',
  base: '/Jerry-Portfolio',
  vite: {
    plugins: [tailwindcss()]
  }
});
