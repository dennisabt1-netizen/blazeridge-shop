import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const memory = new Map();
const context = {
  URL,
  localStorage: {
    getItem: (key) => (memory.has(key) ? memory.get(key) : null),
    setItem: (key, value) => memory.set(key, value),
    removeItem: (key) => memory.delete(key)
  },
  BLAZERIDGE_CONFIG: {
    products: [
      { id: "bias-checklist", price: 9 },
      { id: "pipeline-pilot", price: 79, type: "service", category: "service" },
      { id: "bad-price", price: -5 }
    ]
  },
  CustomEvent: class CustomEvent {
    constructor(type, init) {
      this.type = type;
      this.detail = init && init.detail;
    }
  },
  dispatchEvent() {}
};
context.window = context;
vm.createContext(context);
vm.runInContext(fs.readFileSync(new URL("../js/safe.js", import.meta.url), "utf8"), context);
vm.runInContext(fs.readFileSync(new URL("../js/cart.js", import.meta.url), "utf8"), context);

const cart = context.BlazeRidgeCart;
cart.add("does-not-exist", 3);
assert.equal(cart.count(), 0);
cart.add("pipeline-pilot", 1);
assert.equal(cart.count(), 0);
cart.add("bias-checklist", 100);
assert.equal(cart.count(), 20);
cart.add("bad-price", 1);
assert.equal(cart.enriched().find((item) => item.id === "bad-price").lineTotal, 0);
cart.setQty("bias-checklist", 0);
assert.equal(cart.enriched().some((item) => item.id === "bias-checklist"), false);

console.log("cart.test.mjs ok");
