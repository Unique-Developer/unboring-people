// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://unboringpeople.com',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    sitemap({
      // /work stays out until there is real work to show. /start is a link-in-bio page, not a search landing page.
      filter: (page) => !/\/(work|start|404|thanks)$/.test(page.replace(/\/$/, '')),
    }),
  ],
});
