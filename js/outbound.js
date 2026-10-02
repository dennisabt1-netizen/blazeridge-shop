/**
 * Stripe Payment Link tagging (no cookies, no external requests, no personal data).
 * Appends client_reference_id = "<page>[_<source>]" to buy.stripe.com links at click time,
 * so the origin of a sale is visible in the Stripe dashboard. Source comes from
 * ?utm_source= / ?ref= on arrival (kept in sessionStorage for the tab only).
 * Stripe Payment Links support client_reference_id (a-z, 0-9, -, _ ; max 200 chars).
 * utm_* params are NOT interpreted by Payment Links, so they are not appended.
 */
(function () {
  var KEY = "br_src";
  function clean(s) { return String(s || "").toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 40); }
  try {
    var q = new URLSearchParams(location.search);
    var src = clean(q.get("utm_source") || q.get("ref"));
    var camp = clean(q.get("utm_campaign"));
    if (src) sessionStorage.setItem(KEY, camp ? src + "-" + camp : src);
  } catch (e) {}
  function page() {
    var p = (location.pathname.split("/").pop() || "index.html").replace(/\.html$/, "");
    var id = "";
    try { id = clean(new URLSearchParams(location.search).get("id")); } catch (e) {}
    return clean(p) + (id ? "-" + id : "");
  }
  function tag(a) {
    var href = a.getAttribute("href") || "";
    if (href.indexOf("https://buy.stripe.com/") !== 0 || href.indexOf("client_reference_id=") !== -1) return;
    var s = ""; try { s = sessionStorage.getItem(KEY) || ""; } catch (e) {}
    var ref = page() + (s ? "_" + s : "");
    a.setAttribute("href", href + (href.indexOf("?") === -1 ? "?" : "&") + "client_reference_id=" + encodeURIComponent(ref.slice(0, 190)));
  }
  function handler(e) {
    var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
    if (a) tag(a);
  }
  document.addEventListener("mousedown", handler, true);
  document.addEventListener("touchstart", handler, true);
  document.addEventListener("click", handler, true);
  document.addEventListener("keydown", function (e) { if (e.key === "Enter") handler(e); }, true);
})();
