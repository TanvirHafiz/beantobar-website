export default {
  async fetch(request, env) {
    try {
      if (!env || !env.ASSETS) {
        return new Response("DEBUG: env.ASSETS binding is missing. env keys: " + Object.keys(env || {}).join(","), { status: 500 });
      }
      return await env.ASSETS.fetch(request);
    } catch (e) {
      return new Response("DEBUG: " + (e && e.stack ? e.stack : String(e)), { status: 500 });
    }
  },
};
