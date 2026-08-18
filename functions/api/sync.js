/**
 * Cloudflare Pages Function — GET/POST /api/sync
 * Binding KV: EPN_SYNC → key epn_unified_progress
 *
 * Contrato:
 *   GET  /api/sync?pin=...  → { ok, data: { updatedAt, data: { hist, seen, seen1000, cfg, active } } }
 *   POST /api/sync?pin=...  body { data: { hist, seen, seen1000, cfg, active } }
 *     Fusiona con lo ya guardado (unión por id). Nunca reemplaza a ciegas.
 *     Un intento remoto no se borra porque el cliente no lo traiga.
 *     deleted:true del cliente sí se aplica al mismo id.
 *
 * KV vive fuera del deploy estático: redesplegar Pages no borra el historial.
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

function byId(list) {
  var m = {};
  (list || []).forEach(function (r) { if (r && r.id) m[r.id] = r; });
  return m;
}

function mergeHist(local, remote) {
  var by = byId(remote);
  (local || []).forEach(function (r) {
    if (!r || !r.id) return;
    var prev = by[r.id];
    if (!prev) { by[r.id] = r; return; }
    if (r.deleted && !prev.deleted) by[r.id] = Object.assign({}, prev, r);
    else if (!r.deleted && prev.deleted) by[r.id] = r;
    else {
      var rN = (r.qs && r.qs.length) || 0;
      var pN = (prev.qs && prev.qs.length) || 0;
      by[r.id] = rN >= pN ? Object.assign({}, prev, r) : prev;
    }
  });
  return Object.keys(by).map(function (k) { return by[k]; })
    .sort(function (a, b) { return (a.ts || 0) - (b.ts || 0); });
}

function unionArr(a, b) {
  var s = {}, out = [];
  (a || []).concat(b || []).forEach(function (x) {
    var k = String(x);
    if (!s[k]) { s[k] = 1; out.push(x); }
  });
  return out;
}

function mergeSeen(local, remote) {
  var keys = {};
  Object.keys(remote || {}).forEach(function (k) { keys[k] = 1; });
  Object.keys(local || {}).forEach(function (k) { keys[k] = 1; });
  var out = {};
  Object.keys(keys).forEach(function (k) {
    out[k] = unionArr((remote || {})[k], (local || {})[k]);
  });
  return out;
}

function mergeActive(local, remote) {
  if (!local) return remote || null;
  if (!remote) return local;
  if (!Array.isArray(local.qs) || typeof local.startMs !== 'number') return remote;
  if (!Array.isArray(remote.qs) || typeof remote.startMs !== 'number') return local;
  return (local.startMs || 0) >= (remote.startMs || 0) ? local : remote;
}

function mergeState(incoming, stored) {
  incoming = incoming || {};
  stored = stored || {};
  var incomingHist = Array.isArray(incoming.hist) ? incoming.hist : [];
  var storedHist = Array.isArray(stored.hist) ? stored.hist : [];
  return {
    hist: mergeHist(incomingHist, storedHist),
    seen: mergeSeen(incoming.seen, stored.seen),
    seen1000: mergeSeen(incoming.seen1000, stored.seen1000),
    cfg: Object.assign({}, stored.cfg || {}, incoming.cfg || {}),
    active: mergeActive(incoming.active, stored.active)
  };
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
  var storedWrap = (await kv.get(KV_KEY, 'json')) || emptyState();
  var stored = (storedWrap && storedWrap.data) || {};

  var activeIn = incoming.active && typeof incoming.active === 'object' ? incoming.active : null;
  if (activeIn && (!Array.isArray(activeIn.qs) || typeof activeIn.startMs !== 'number' || typeof activeIn.limitMs !== 'number')) {
    activeIn = null;
  }
  incoming.active = activeIn;

  var mergedData = mergeState(incoming, stored);
  var merged = { updatedAt: Date.now(), data: mergedData };
  await kv.put(KV_KEY, JSON.stringify(merged));
  return json({ ok: true, data: merged });
}
