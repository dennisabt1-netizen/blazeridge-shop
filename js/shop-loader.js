/**
 * Loads additional products from products.json and merges them into the
 * existing static shop configuration.
 */
(function (global) {
  const config = global.BLAZERIDGE_CONFIG;

  function normalize(product) {
    return {
      id: product.id,
      slug: product.id,
      image: product.image || "",
      name: product.title,
      tag: product.category,
      price: Number(product.price) || 0,
      currency: product.currency || config.currency || "EUR",
      description: product.description || "",
      longDescription: product.description || "",
      featured: Boolean(product.featured),
      paymentLink: product.paymentLink || "",
      downloadFile: product.downloadFile || "",
      tags: Array.isArray(product.tags) ? product.tags : [],
      comingSoon: !product.paymentLink
    };
  }

  async function loadProducts() {
    if (!config || !Array.isArray(config.products)) return [];

    try {
      const response = await fetch("products.json", { cache: "no-cache" });
      if (!response.ok) throw new Error("Product catalog could not be loaded");

      const data = await response.json();
      const additions = (Array.isArray(data.products) ? data.products : [])
        .filter((product) => product && product.id && product.title)
        .map(normalize);
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
