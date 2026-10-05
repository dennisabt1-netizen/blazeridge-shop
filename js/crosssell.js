/**
 * Cross-sell box "Pet-Komplett". Comparison price = real sum of the single products listed in
 * the bundle's `includes` (config.js) — computed, never hard-coded. Shown only if the bundle
 * is purchasable (has a paymentLink) and is actually cheaper than the sum.
 */
(function (global) {
  function payable(link) {
    if (global.BlazeRidgeSafe && global.BlazeRidgeSafe.safePaymentUrl) return !!global.BlazeRidgeSafe.safePaymentUrl(link);
    try {
      var url = new URL(String(link || "").trim());
      return url.protocol === "https:" && url.hostname === "buy.stripe.com" && /^\/[A-Za-z0-9]+/.test(url.pathname);
    } catch (e) { return false; }
  }
  function eur(n) { return Number(n).toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €"; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c]; }); }
  function info(productId) {
    var cfg = global.BLAZERIDGE_CONFIG || { products: [] };
    var list = cfg.products || [];
    var bundle = list.filter(function (x) { return x.id === "pet-komplett"; })[0];
    if (!bundle || !payable(bundle.paymentLink) || !bundle.includes) return null;
    var eligible = bundle.includes.concat(bundle.alsoIn || []);
    if (productId === bundle.id || eligible.indexOf(productId) === -1) return null;
    var sum = 0;
    for (var i = 0; i < bundle.includes.length; i++) {
      var q = list.filter(function (x) { return x.id === bundle.includes[i]; })[0];
      if (!q) return null;
      sum += Math.round(Number(q.price) * 100);
    }
    sum = sum / 100;
    if (!(sum > bundle.price)) return null;
    return { bundle: bundle, sum: sum, save: Math.round((sum - bundle.price) * 100) / 100, pct: Math.round((1 - bundle.price / sum) * 100) };
  }
  function html(productId) {
    var x = info(productId);
    if (!x) return "";
    return '<aside class="panel cross-sell" aria-label="Pet-Komplett"><p class="eyebrow" style="margin:0 0 .25rem">Alle Pakete</p>' +
      '<p style="margin:0 0 .5rem"><strong>Pet-Komplett: ' + eur(x.bundle.price) + ' statt ' + eur(x.sum) + '</strong> bei Einzelkauf der ' + x.bundle.includes.length +
      ' enthaltenen Pakete (' + x.pct + ' % günstiger, du sparst ' + eur(x.save) + ').</p>' +
      '<p class="muted" style="margin:0 0 .75rem">7 Pakete, 34 A4-Seiten für Hund &amp; Katze als ein ZIP-Download. Summe = Einzelpreise der enthaltenen Pakete laut Shop.</p>' +
      '<a class="btn btn-sm" href="product.html?id=' + esc(x.bundle.id) + '">Pet-Komplett ansehen</a></aside>';
  }
  global.BlazeRidgeCrossSell = { info: info, html: html };
})(window);
