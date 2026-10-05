/**
 * Offer ladder on top of existing Stripe Payment Links.
 * Shop stack (one-time tools) → YouTube → pipeline services.
 */
(function (global) {
  const YOUTUBE = "https://www.youtube.com/@blazeridgeorigin";
  const STACK_IDS = ["subscription-audit", "payday-automation", "habit-tracker"];
  const UPSELL = {
    "money-rules": "bias-checklist",
    "bias-checklist": "subscription-audit",
    "subscription-audit": "payday-automation",
    "payday-automation": "savings-challenge",
    "savings-challenge": "debt-snowball",
    "debt-snowball": "geld-entscheidungs-kit",
    "geld-entscheidungs-kit": "habit-tracker",
    "habit-tracker": "pipeline-pilot"
  };

  function safe() {
    return global.BlazeRidgeSafe || {
      escapeHtml: (v) => String(v == null ? "" : v),
      safePaymentUrl: () => ""
    };
  }

  function app() {
    return global.BlazeRidgeApp || {};
  }

  function products() {
    const cfg = global.BLAZERIDGE_CONFIG || {};
    return cfg.products || [];
  }

  function byId(id) {
    return products().find((p) => p.id === id) || null;
  }

  function stackProducts() {
    return STACK_IDS.map(byId).filter(Boolean);
  }

  function payLink(product) {
    const url = safe().safePaymentUrl(product && product.paymentLink);
    return url || "";
  }

  function priceText(product) {
    if (app().formatPrice) return app().formatPrice(product);
    return "€" + product.price;
  }

  function upsellFor(product) {
    if (!product) return null;
    const nextId = UPSELL[product.id];
    return nextId ? byId(nextId) : null;
  }

  function buyAnchor(product, label, className) {
    const href = payLink(product);
    const escape = safe().escapeHtml;
    if (!href) {
      return `<a class="${className || "btn"}" href="product.html?id=${encodeURIComponent(product.id)}">${escape(label)}</a>`;
    }
    return `<a class="${className || "btn"}" href="${escape(href)}" target="_blank" rel="noopener noreferrer">${escape(label)}</a>`;
  }

  function mountHomeStack(root) {
    const items = stackProducts();
    if (!items.length) return;
    const escape = safe().escapeHtml;
    const total = items.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
    const format = app().money ? app().money(total) : "€" + total;
    root.hidden = false;
    root.innerHTML = `
      <div class="panel stack-teaser">
        <div>
          <p class="eyebrow">Offer</p>
          <h2>Calm Money Stack</h2>
          <p class="muted">Three worksheets people actually finish: subscriptions, payday, and the habit tracker. Buy each one with its own Stripe link — together ${escape(format)}, no bundle markup.</p>
          <div class="hero-actions">
            <a class="btn" href="stack.html">See the stack</a>
            <a class="btn-ghost" href="${YOUTUBE}" target="_blank" rel="noopener noreferrer">YouTube · @blazeridgeorigin</a>
          </div>
        </div>
        <ol class="stack-mini">
          ${items.map((item) => `<li><a href="product.html?id=${encodeURIComponent(item.id)}">${escape(item.name)}</a> <span>${escape(priceText(item))}</span></li>`).join("")}
        </ol>
      </div>`;
  }

  function mountStackPage(root) {
    const items = stackProducts();
    const escape = safe().escapeHtml;
    const total = items.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
    const format = app().money ? app().money(total) : "€" + total;
    const german = byId("geld-entscheidungs-kit");
    root.innerHTML = `
      <div class="stack-layout">
        <div class="panel">
          <p class="eyebrow">One-time downloads</p>
          <h2 class="section-title-inline">Buy the stack one file at a time</h2>
          <p class="muted">Static checkout can’t combine these into one Stripe session. Each button is the live Payment Link for that file. If you buy all three, you pay ${escape(format)}.</p>
          <ol class="stack-list">
            ${items.map((item, index) => `
              <li>
                <div>
                  <strong>${escape(String(index + 1).padStart(2, "0"))} · ${escape(item.name)}</strong>
                  <p>${escape(item.description)}</p>
                </div>
                <div class="stack-buy">
                  <span class="price">${escape(priceText(item))}</span>
                  ${buyAnchor(item, "Buy", "btn btn-sm")}
                </div>
              </li>`).join("")}
          </ol>
        </div>
        <aside class="stack-aside">
          <div class="panel">
            <p class="eyebrow">YouTube</p>
            <h2 class="section-title-inline">@blazeridgeorigin</h2>
            <p class="muted">Shorts are the free front door. These worksheets are the paid version of the same ideas.</p>
            <a class="btn" href="${YOUTUBE}" target="_blank" rel="noopener noreferrer">Open the channel</a>
          </div>
          <div class="panel">
            <p class="eyebrow">Creators</p>
            <h2 class="section-title-inline">Ship the Shorts yourself</h2>
            <p class="muted">Pipeline Pilot is €79 once. Pipeline Seat is €197 per month if you want the system kept running.</p>
            <a class="btn-ghost" href="services.html">View services</a>
          </div>
        </aside>
      </div>
      ${german ? `
      <div class="panel stack-de">
        <p class="eyebrow">Deutsch</p>
        <h2 class="section-title-inline">${escape(german.name)}</h2>
        <p class="muted">${escape(german.description)}</p>
        <div class="hero-actions">
          <a class="btn" href="product.html?id=${encodeURIComponent(german.id)}">Zum Kit · ${escape(priceText(german))}</a>
          ${buyAnchor(german, "Direkt kaufen", "btn-ghost")}
        </div>
      </div>` : ""}`;
  }

  function mountProductUpsell(root, product) {
    const next = upsellFor(product);
    if (!root || !next) return;
    root.querySelectorAll("[data-offer-upsell]").forEach((node) => node.remove());
    const escape = safe().escapeHtml;
    const aside = document.createElement("aside");
    aside.className = "panel upsell";
    aside.setAttribute("data-offer-upsell", "");
    aside.innerHTML = `
      <p class="eyebrow">Next step</p>
      <h2 class="section-title-inline">${escape(next.name)}</h2>
      <p class="muted">${escape(next.description)}</p>
      <div class="hero-actions">
        <a class="btn-ghost" href="product.html?id=${encodeURIComponent(next.id)}">Details · ${escape(priceText(next))}</a>
        ${buyAnchor(next, "Buy this too", "btn")}
      </div>`;
    root.appendChild(aside);
  }

  function mountCheckoutBump(root) {
    if (!root || !global.BlazeRidgeCart) return;
    root.querySelectorAll("[data-offer-bump]").forEach((node) => node.remove());
    const inCart = new Set(global.BlazeRidgeCart.enriched().map((item) => item.id));
    const next = stackProducts().find((item) => !inCart.has(item.id)) || byId("pipeline-pilot");
    if (!next || inCart.has(next.id)) return;
    const escape = safe().escapeHtml;
    const bump = document.createElement("aside");
    bump.className = "panel upsell";
    bump.setAttribute("data-offer-bump", "");
    bump.innerHTML = `
      <p class="eyebrow">Before you pay</p>
      <h2 class="section-title-inline">${escape(next.name)}</h2>
      <p class="muted">${escape(next.description)} ${escape(priceText(next))}.</p>
      <div class="hero-actions">
        ${buyAnchor(next, "Pay for this too", "btn")}
        <a class="btn-ghost" href="stack.html">See the full stack</a>
      </div>`;
    root.appendChild(bump);
  }

  function boot() {
    const home = document.getElementById("money-stack");
    if (home) {
      Promise.resolve(global.BLAZERIDGE_PRODUCTS_READY).then(() => mountHomeStack(home));
    }
    const page = document.getElementById("stack-root");
    if (page) {
      Promise.resolve(global.BLAZERIDGE_PRODUCTS_READY).then(() => mountStackPage(page));
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  global.BlazeRidgeOffers = {
    stackProducts,
    upsellFor,
    mountHomeStack,
    mountStackPage,
    mountProductUpsell,
    mountCheckoutBump
  };
})(window);
