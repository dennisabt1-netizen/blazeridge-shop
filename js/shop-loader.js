/**
 * Loads additional products from products.json and merges them into the
 * existing static shop configuration.
 */
(function (global) {
  const config = global.BLAZERIDGE_CONFIG;

  function guard() {
    return global.BlazeRidgeSafe || null;
  }

  function normalize(product) {
    const safe = guard();
    const id = safe ? safe.safeId(product.id) : String(product.id || "");
    const text = (value, max) => safe ? safe.plainText(value, max) : String(value || "");
    const paymentLink = safe ? safe.safePaymentUrl(product.paymentLink) : "";
    const image = text(product.image || "", 200);
    return {
      id,
      slug: id,
      image: image.startsWith("images/") ? image : "",
      name: text(product.title, 140),
      tag: text(product.category, 80),
      price: safe ? safe.moneyAmount(product.price) : Number(product.price) || 0,
      currency: product.currency || config.currency || "EUR",
      description: text(product.description, 2000),
      longDescription: text(product.description, 4000),
      featured: Boolean(product.featured),
      paymentLink,
      downloadFile: safe ? safe.safeDownloadName(product.downloadFile) : "",
      tags: Array.isArray(product.tags) ? product.tags.map((tag) => text(tag, 40)).filter(Boolean) : [],
      comingSoon: !paymentLink
    };
  }

  async function loadProducts() {
    if (!config || !Array.isArray(config.products)) return [];

    try {
      const response = await fetch("products.json", { cache: "no-cache" });
      if (!response.ok) throw new Error("Product catalog could not be loaded");

      if (!guard()) return [];
      const data = await response.json();
      const additions = (Array.isArray(data.products) ? data.products : [])
        .filter((product) => product && product.id && product.title)
        .map(normalize)
        .filter((product) => product.id && product.name);
      const existingIds = new Set(config.products.map((product) => product.id));

      additions.forEach((product) => {
        if (!existingIds.has(product.id)) config.products.push(product);
      });

      return additions;
    } catch (error) {
      console.warn("BlazeRidge product loader:", error.message);
      return [];
    }
  }

  global.BLAZERIDGE_PRODUCTS_READY = loadProducts();
})(window);
