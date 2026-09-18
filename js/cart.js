/**
 * BlazeRidge cart — localStorage, works across pages.
 */
(function (global) {
  const KEY = "blazeridge_cart_v1";

  function read() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
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
      return read().reduce((n, i) => n + (i.qty || 0), 0);
    },

    subtotal() {
      return read().reduce((sum, i) => {
        const p = getProduct(i.id);
        return sum + (p ? p.price * i.qty : 0);
      }, 0);
    },

    add(id, qty) {
      qty = Math.max(1, parseInt(qty, 10) || 1);
      const items = read();
      const existing = items.find((i) => i.id === id);
      if (existing) existing.qty += qty;
      else items.push({ id, qty });
      write(items);
      return items;
    },

    setQty(id, qty) {
      qty = parseInt(qty, 10) || 0;
      let items = read();
      if (qty <= 0) items = items.filter((i) => i.id !== id);
      else {
        const existing = items.find((i) => i.id === id);
        if (existing) existing.qty = qty;
        else items.push({ id, qty });
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
          return { ...p, qty: i.qty, lineTotal: p.price * i.qty };
        })
        .filter(Boolean);
    }
  };

  global.BlazeRidgeCart = Cart;
})(window);
