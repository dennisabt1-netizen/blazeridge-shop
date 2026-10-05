/**
 * Shared UI: nav badge, money format, product helpers.
 * Checkout = Stripe Payment Links only (no serverless).
 */
(function (global) {
  function cfg() {
    return global.BLAZERIDGE_CONFIG || { products: [], currencySymbol: "€" };
  }

  function money(n) {
    const s = cfg().currencySymbol || "€";
    const amount = global.BlazeRidgeSafe ? global.BlazeRidgeSafe.moneyAmount(n) : Number(n) || 0;
    return s + amount.toFixed(amount % 1 ? 2 : 0);
  }

  function escapeHtml(value) {
    if (global.BlazeRidgeSafe) return global.BlazeRidgeSafe.escapeHtml(value);
    return String(value == null ? "" : value);
  }

  function safePaymentUrl(value) {
    return global.BlazeRidgeSafe ? global.BlazeRidgeSafe.safePaymentUrl(value) : "";
  }

  function productImage(product, className) {
    const name = escapeHtml(product.name);
    const initials = escapeHtml(product.name.split(/\s+/).slice(0, 2).map((word) => word[0]).join(""));
    if (!product.image) {
      return `<span class="${className || "product-cover"} product-cover-fallback" role="img" aria-label="${name}">${initials}</span>`;
    }
    return `<img src="${escapeHtml(product.image)}" alt="${name}" loading="lazy" width="640" height="480"
      onerror="this.hidden=true;this.nextElementSibling.hidden=false" />
      <span class="${className || "product-cover"} product-cover-fallback" role="img" aria-label="${name}" hidden>${initials}</span>`;
  }

  /** Prefer priceLabel / monthly interval when present (services). */
  function formatPrice(p) {
    if (p == null) return "";
    if (typeof p === "number") return money(p);
    if (p.priceLabel) return p.priceLabel;
    if (p.interval === "month") return money(p.price) + "/mo";
    return money(p.price);
  }

  function isService(p) {
    return p && (p.type === "service" || p.category === "service");
  }

  function shopProducts() {
    return (cfg().products || []).filter((p) => !isService(p));
  }

  function productByParam() {
    const params = new URLSearchParams(global.location.search);
    const id = params.get("id") || params.get("slug");
    if (!id) return null;
    return (cfg().products || []).find((p) => p.id === id || p.slug === id) || null;
  }

  function updateCartBadge() {
    const n = global.BlazeRidgeCart ? global.BlazeRidgeCart.count() : 0;
    document.querySelectorAll("[data-cart-count]").forEach((el) => {
      el.textContent = String(n);
      el.hidden = n === 0;
      el.setAttribute("aria-label", n + " items in cart");
    });
    const shortcut = document.getElementById("cart-shortcut");
    if (shortcut) {
      shortcut.hidden = n === 0;
      shortcut.querySelector("span").textContent = n + (n === 1 ? " item" : " items");
    }
  }

  function toast(msg, kind) {
    let el = document.getElementById("br-toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "br-toast";
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.toggle("toast-warn", kind === "warn");
    el.classList.add("show");
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove("show"), 3200);
  }

  function bindAddButtons(root) {
    (root || document).querySelectorAll("[data-add-cart]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const id = btn.getAttribute("data-add-cart");
        const qty = btn.getAttribute("data-qty") || 1;
        global.BlazeRidgeCart.add(id, qty);
        updateCartBadge();
        toast("Added to cart");
      });
    });
  }

  const YOUTUBE = "https://www.youtube.com/@blazeridgeorigin";

  function ensureLink(parent, href, text, before) {
    if (parent.querySelector('a[href="' + href + '"]')) return;
    const link = document.createElement("a");
    link.href = href;
    link.textContent = text;
    parent.insertBefore(link, before || null);
  }

  function init() {
    document.querySelectorAll('a[target="_blank"]').forEach((link) => {
      const rel = new Set((link.getAttribute("rel") || "").split(/\s+/).filter(Boolean));
      rel.add("noopener");
      rel.add("noreferrer");
      link.setAttribute("rel", Array.from(rel).join(" "));
    });
    document.querySelectorAll(".nav").forEach((nav) => {
      const cartLinks = Array.from(nav.querySelectorAll('a[href="cart.html"]'));
      if (cartLinks.length > 1) {
        const primary = cartLinks.find((link) => !link.classList.contains("cart-link")) || cartLinks[0];
        cartLinks.forEach((link) => {
          if (link === primary) return;
          const badge = link.querySelector("[data-cart-count]");
          if (badge && !primary.querySelector("[data-cart-count]")) {
            primary.classList.add("cart-link");
            primary.appendChild(document.createTextNode(" "));
            primary.appendChild(badge);
          }
          link.remove();
        });
      }
      if (!nav.querySelector('a[href="services.html"]')) {
        const link = document.createElement("a");
        link.href = "services.html";
        link.textContent = "Services";
        const shop = nav.querySelector('a[href="shop.html"]');
        if (shop && shop.nextSibling) shop.parentNode.insertBefore(link, shop.nextSibling);
        else {
          const login = nav.querySelector(".btn-login");
          nav.insertBefore(link, login || null);
        }
      }
      if (!nav.querySelector('a[href="stack.html"]')) {
        ensureLink(nav, "stack.html", "Stack", nav.querySelector('a[href="services.html"]'));
      }
      if (!nav.querySelector('a[href="contact.html"]')) {
        const link = document.createElement("a");
        link.href = "contact.html";
        link.textContent = "Contact";
        const login = nav.querySelector(".btn-login");
        nav.insertBefore(link, login || null);
      }
      if (!nav.querySelector('a[href="' + YOUTUBE + '"]')) {
        const link = document.createElement("a");
        link.href = YOUTUBE;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.className = "nav-youtube";
        link.textContent = "YouTube";
        const login = nav.querySelector(".btn-login");
        nav.insertBefore(link, login || null);
      }
    });
    document.querySelectorAll(".footer-nav").forEach((nav) => {
      if (!nav.querySelector('a[href="friends.html"]')) {
        nav.insertAdjacentHTML("beforeend", '<a href="friends.html">Tell a friend</a>');
      }
      if (!nav.querySelector('a[href="stack.html"]')) {
        nav.insertAdjacentHTML("beforeend", '<a href="stack.html">Stack</a>');
      }
      if (!nav.querySelector('a[href="contact.html"]')) {
        nav.insertAdjacentHTML("beforeend", '<a href="contact.html">Contact</a>');
      }
      if (!nav.querySelector('a[href="' + YOUTUBE + '"]')) {
        nav.insertAdjacentHTML("beforeend", '<a href="' + YOUTUBE + '" target="_blank" rel="noopener noreferrer">YouTube</a>');
      }
    });
    document.querySelectorAll(".footer").forEach((footer) => {
      if (footer.querySelector('a[href="' + YOUTUBE + '"]')) return;
      const slot = footer.querySelector(".footer-grid p, p");
      if (!slot) return;
      slot.appendChild(document.createTextNode(" · "));
      const link = document.createElement("a");
      link.href = YOUTUBE;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "@blazeridgeorigin";
      slot.appendChild(link);
    });
    if (!document.getElementById("cart-shortcut")) {
      document.body.insertAdjacentHTML("beforeend",
        '<a id="cart-shortcut" class="cart-shortcut" href="cart.html" hidden aria-label="Open cart"><span>0 items</span><strong>View cart →</strong></a>');
    }
    updateCartBadge();
    global.addEventListener("blazeridge:cart", updateCartBadge);
    bindAddButtons();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  global.BlazeRidgeApp = {
    money,
    escapeHtml,
    safePaymentUrl,
    productImage,
    formatPrice,
    isService,
    shopProducts,
    productByParam,
    updateCartBadge,
    toast,
    bindAddButtons,
    cfg
  };
})(window);
