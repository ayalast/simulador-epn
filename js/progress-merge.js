/* Unión de progreso local ∪ nube. Un registro remoto no se borra porque un cliente no lo traiga. */
(function (root) {
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
    return (local.startMs || 0) >= (remote.startMs || 0) ? local : remote;
  }
  function mergeState(local, remote) {
    local = local || {};
    remote = remote || {};
    return {
      hist: mergeHist(local.hist, remote.hist),
      seen: mergeSeen(local.seen, remote.seen),
      seen1000: mergeSeen(local.seen1000, remote.seen1000),
      cfg: Object.assign({}, remote.cfg || {}, local.cfg || {}),
      active: mergeActive(local.active, remote.active)
    };
  }
  root.EPN_MERGE = { mergeHist: mergeHist, mergeSeen: mergeSeen, mergeState: mergeState, mergeActive: mergeActive };
})(typeof window !== 'undefined' ? window : globalThis);
