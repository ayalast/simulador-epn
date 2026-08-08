/**
 * Cloudflare Pages Function — GET/POST /api/sync
 * Binding KV: EPN_SYNC → key epn_unified_progress
 *
 * Contrato (cliente en app.js):
 *   GET  /api/sync?pin=...  → { ok, data: { updatedAt, data: { hist, seen, cfg } } }
 *   POST /api/sync?pin=...  body { data: { hist, seen, cfg } } → reemplaza el estado cloud
 */

const SECURITY_PIN = '235677';
const KV_KEY = 'epn_unified_progress';

function emptyState() {
  return { updatedAt: 0, data: { hist: [], seen: {}, seen1000: {}, cfg: {}, active: null } };
}

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status: status || 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

function pinFrom(request) {
  return new URL(request.url).searchParams.get('pin');
}

function unauthorized() {
  return json({ ok: false, error: 'PIN de seguridad incorrecto' }, 401);
}

export async function onRequestOptions() {
  return json({ ok: true });
}

export async function onRequestGet(context) {
  if (pinFrom(context.request) !== SECURITY_PIN) return unauthorized();
  var kv = context.env.EPN_SYNC;
  if (!kv) return json({ ok: false, error: 'KV EPN_SYNC no configurado' }, 500);
  var stored = (await kv.get(KV_KEY, 'json')) || emptyState();
  return json({ ok: true, data: stored });
}

export async function onRequestPost(context) {
  if (pinFrom(context.request) !== SECURITY_PIN) return unauthorized();
  var kv = context.env.EPN_SYNC;
  if (!kv) return json({ ok: false, error: 'KV EPN_SYNC no configurado' }, 500);

  var body;
  try {
    body = await context.request.json();
  } catch (e) {
    return json({ ok: false, error: 'JSON inválido' }, 400);
  }

  var incoming = (body && body.data) || {};
  var seen1000In = incoming.seen1000 && typeof incoming.seen1000 === 'object' ? incoming.seen1000 : {};
  var activeIn = incoming.active && typeof incoming.active === 'object' ? incoming.active : null;
  // sanea active mínimo: requiere active.qs y timestamps numéricos
  if(activeIn && (!Array.isArray(activeIn.qs) || typeof activeIn.startMs !== 'number' || typeof activeIn.limitMs !== 'number')) activeIn = null;
  var merged = {
    updatedAt: Date.now(),
    data: {
      hist: Array.isArray(incoming.hist) ? incoming.hist : [],
      seen: incoming.seen && typeof incoming.seen === 'object' ? incoming.seen : {},
      seen1000: seen1000In,
      cfg: incoming.cfg && typeof incoming.cfg === 'object' ? incoming.cfg : {},
      active: activeIn,
    },
  };

  await kv.put(KV_KEY, JSON.stringify(merged));
  return json({ ok: true, data: merged });
}
