/**
 * BlazeRidge cart — localStorage, works across pages.
 */
(function (global) {
  const KEY = "blazeridge_cart_v1";

  const MAX_QTY = 20;

  function read() {
    try {
      const raw = localStorage.getItem(KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(parsed)) return [];
      return parsed
        .filter((item) => item && typeof item.id === "string")
        .map((item) => ({
          id: item.id,
          qty: Math.min(MAX_QTY, Math.max(1, parseInt(item.qty, 10) || 1))
        }));
    } catch {
      return [];
    }
  }

  function write(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
    global.dispatchEvent(new CustomEvent("blazeridge:cart", { detail: items }));
  }

  function getProduct(id) {
    const cfg = global.BLAZERIDGE_CONFIG;
    return (cfg && cfg.products || []).find((p) => p.id === id || p.slug === id);
  }

  const Cart = {
    getItems() {
      return read();
    },

    count() {
      return this.enriched().reduce((n, i) => n + (i.qty || 0), 0);
    },

    subtotal() {
      return this.enriched().reduce((sum, i) => sum + i.lineTotal, 0);
    },

    add(id, qty) {
      const product = getProduct(id);
      if (!product || product.type === "service" || product.category === "service") return read();
      qty = Math.min(MAX_QTY, Math.max(1, parseInt(qty, 10) || 1));
      const items = read();
      const existing = items.find((i) => i.id === product.id);
      if (existing) existing.qty = Math.min(MAX_QTY, existing.qty + qty);
      else items.push({ id: product.id, qty });
      write(items);
      return items;
    },

    setQty(id, qty) {
      const product = getProduct(id);
      qty = parseInt(qty, 10) || 0;
      let items = read();
      const key = product ? product.id : id;
      if (!product || qty <= 0) items = items.filter((i) => i.id !== id && i.id !== key);
      else {
        qty = Math.min(MAX_QTY, Math.max(1, qty));
        const existing = items.find((i) => i.id === key);
        if (existing) existing.qty = qty;
        else if (product.type !== "service" && product.category !== "service") items.push({ id: key, qty });
      }
      write(items);
      return items;
    },

    remove(id) {
      write(read().filter((i) => i.id !== id));
    },

    clear() {
      write([]);
    },

    enriched() {
      return read()
        .map((i) => {
          const p = getProduct(i.id);
          if (!p) return null;
          const price = global.BlazeRidgeSafe ? global.BlazeRidgeSafe.moneyAmount(p.price) : Number(p.price) || 0;
          return { ...p, qty: i.qty, lineTotal: price * i.qty };
        })
        .filter(Boolean);
    }
  };

  global.BlazeRidgeCart = Cart;
})(window);
