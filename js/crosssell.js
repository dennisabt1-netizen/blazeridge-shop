/**
 * Cross-sell box "Pet-Komplett" (product page + get.html).
 * Bundle rule: show only the bundle's own price and an honest list of what's inside —
 * no comparison prices, no savings claims. Shown only if the bundle is purchasable.
 */
(function (global) {
  function eur(n) { return Number(n).toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €"; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c]; }); }
  function info(productId) {
    var cfg = global.BLAZERIDGE_CONFIG || { products: [] };
    var list = cfg.products || [];
    var bundle = list.filter(function (x) { return x.id === "pet-komplett"; })[0];
    if (!bundle || !bundle.paymentLink || !bundle.includes) return null;
    var eligible = bundle.includes.concat(bundle.alsoIn || []);
    if (productId === bundle.id || eligible.indexOf(productId) === -1) return null;
    var names = [];
    for (var i = 0; i < bundle.includes.length; i++) {
      var q = list.filter(function (x) { return x.id === bundle.includes[i]; })[0];
      if (!q) return null;
      names.push(q.name);
    }
    return { bundle: bundle, names: names };
  }
  function html(productId) {
    var x = info(productId);
    if (!x) return "";
    return '<aside class="panel cross-sell" aria-label="Pet-Komplett"><p class="eyebrow" style="margin:0 0 .25rem">Alle Pet-Pakete</p>' +
      '<p style="margin:0 0 .5rem"><strong>Pet-Komplett · ' + eur(x.bundle.price) + '</strong> – alle ' + x.names.length +
      ' Pet-Pakete (34 A4-Seiten) als ein ZIP-Download.</p>' +
      '<p class="muted" style="margin:0 0 .75rem">Enthalten: ' + x.names.map(esc).join(" · ") + '.</p>' +
      '<a class="btn btn-sm" href="product.html?id=' + esc(x.bundle.id) + '">Pet-Komplett ansehen</a></aside>';
  }
  global.BlazeRidgeCrossSell = { info: info, html: html };
})(window);
