import type { APIRoute } from 'astro';

/** Open to every crawler, including AI search agents, and points them to the sitemap. */
export const GET: APIRoute = ({ site }) => {
  const body = ['User-agent: *', 'Allow: /', '', `Sitemap: ${new URL('sitemap.xml', site).href}`, ''].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
