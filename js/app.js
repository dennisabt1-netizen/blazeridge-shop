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
    return s + Number(n).toFixed(n % 1 ? 2 : 0);
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#039;"
    })[char]);
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

  function productByParam() {
    const params = new URLSearchParams(global.location.search);
    const id = params.get("id") || params.get("slug");
    if (!id) return cfg().products[0] || null;
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

  function init() {
    document.querySelectorAll(".nav").forEach((nav) => {
      if (!nav.querySelector('a[href="contact.html"]')) {
        const link = document.createElement("a");
        link.href = "contact.html";
        link.textContent = "Contact";
        const login = nav.querySelector(".btn-login");
        nav.insertBefore(link, login || null);
      }
    });
    document.querySelectorAll(".footer-nav").forEach((nav) => {
      if (!nav.querySelector('a[href="friends.html"]')) {
        nav.insertAdjacentHTML("beforeend", '<a href="friends.html">Tell a friend</a>');
      }
      if (!nav.querySelector('a[href="contact.html"]')) {
        nav.insertAdjacentHTML("beforeend", '<a href="contact.html">Contact</a>');
      }
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
    productImage,
    productByParam,
    updateCartBadge,
    toast,
    bindAddButtons,
    cfg
  };
})(window);
