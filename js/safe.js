/**
 * Shared guards for HTML, Stripe links, catalog ids, and download names.
 * Safe to load in the browser and in Node tests.
 */
(function (root) {
  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#039;"
    })[char]);
  }

  function plainText(value, max) {
    const limit = Number(max) > 0 ? Number(max) : 2000;
    return String(value == null ? "" : value)
      .replace(/[\u0000-\u001F\u007F]/g, "")
      .trim()
      .slice(0, limit);
  }

  function safeId(value) {
    const id = String(value == null ? "" : value).trim().toLowerCase();
    return /^[a-z0-9][a-z0-9-]{0,63}$/.test(id) ? id : "";
  }

  /** Only live Stripe Payment Links. Blocks javascript:, data:, and other hosts. */
  function safePaymentUrl(value) {
    try {
      const url = new URL(String(value || "").trim());
      if (url.protocol !== "https:") return "";
      if (url.hostname !== "buy.stripe.com") return "";
      if (!/^\/[A-Za-z0-9]+/.test(url.pathname)) return "";
      url.hash = "";
      return url.href;
    } catch (_) {
      return "";
    }
  }

  function safeDownloadName(value) {
    const clean = String(value == null ? "" : value).replace(/[^A-Za-z0-9._-]+/g, "").replace(/^\.+/, "");
    return /^[A-Za-z0-9][A-Za-z0-9._-]{0,120}\.(pdf|zip)$/i.test(clean) ? clean : "";
  }

  function moneyAmount(value) {
    const amount = Number(value);
    if (!Number.isFinite(amount) || amount < 0) return 0;
    return Math.min(amount, 100000);
  }

  root.BlazeRidgeSafe = {
    escapeHtml,
    plainText,
    safeId,
    safePaymentUrl,
    safeDownloadName,
    moneyAmount
  };
})(typeof globalThis !== "undefined" ? globalThis : this);
