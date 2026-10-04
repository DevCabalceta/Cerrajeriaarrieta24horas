import type { APIRoute } from 'astro';
import { seo } from '@/data/site';

/** Single-page site: the sitemap lists the home page and its social image. */
export const GET: APIRoute = ({ site }) => {
  const home = new URL('/', site).href;
  const image = new URL(seo.image.src, site).href;
  const lastModified = new Date().toISOString().slice(0, 10);

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${home}</loc>
    <lastmod>${lastModified}</lastmod>
    <image:image>
      <image:loc>${image}</image:loc>
    </image:image>
  </url>
</urlset>
`;

  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
