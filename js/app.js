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
    productByParam,
    updateCartBadge,
    toast,
    bindAddButtons,
    cfg
  };
})(window);
