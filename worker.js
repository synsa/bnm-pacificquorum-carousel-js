/* ============================================================
   PQ CAROUSEL — Cloudflare Worker
   KV-backed REST endpoint for carousel card persistence.

   Bindings required (set in Cloudflare dashboard or wrangler.toml):
     KV namespace: CAROUSEL_STORE

   Environment variables required:
     CAROUSEL_TOKEN  — secret checked on PUT requests

   Routes:
     GET /carousel  — return stored card data (or empty object)
     PUT /carousel  — write card data (requires X-Carousel-Token header)
   ============================================================ */

const KV_KEY_PREFIX = 'carousel_data';
const CORS_ORIGIN = '*'; /* Restrict to your Bravesites domain in production,
                            e.g. 'https://mainland-pacificquorum.bravesites.com' */

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin':  CORS_ORIGIN,
    'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Carousel-Token',
    'Access-Control-Max-Age':       '86400',
  };
}

function json(data, status, extraHeaders) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: Object.assign({
      'Content-Type': 'application/json',
    }, corsHeaders(), extraHeaders || {}),
  });
}

export default {
  async fetch(request, env) {
    const url    = new URL(request.url);
    const method = request.method.toUpperCase();

    /* Preflight */
    if (method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders() });
    }

    if (url.pathname !== '/carousel') {
      return json({ error: 'Not found' }, 404);
    }

    /* Derive per-page KV key from ?id= param (falls back to 'default') */
    const pageId = (url.searchParams.get('id') || 'default').replace(/[^a-zA-Z0-9_-]/g, '_');
    const KV_KEY = KV_KEY_PREFIX + '_' + pageId;

    /* GET — return stored data */
    if (method === 'GET') {
      const stored = await env.CAROUSEL_STORE.get(KV_KEY);
      if (!stored) return json({}, 200);
      return new Response(stored, {
        status: 200,
        headers: Object.assign({ 'Content-Type': 'application/json' }, corsHeaders()),
      });
    }

    /* PUT — write data (token-gated) */
    if (method === 'PUT') {
      const token = request.headers.get('X-Carousel-Token');
      if (!token || token !== env.CAROUSEL_TOKEN) {
        return json({ error: 'Unauthorized' }, 401);
      }

      let body;
      try {
        body = await request.json();
      } catch {
        return json({ error: 'Invalid JSON' }, 400);
      }

      if (!body || !Array.isArray(body.rows)) {
        return json({ error: 'Expected { rows: [...] }' }, 400);
      }

      await env.CAROUSEL_STORE.put(KV_KEY, JSON.stringify(body));
      return json({ ok: true }, 200);
    }

    return json({ error: 'Method not allowed' }, 405);
  },
};
