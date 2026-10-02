import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const context = { URL };
vm.createContext(context);
vm.runInContext(fs.readFileSync(new URL("../js/safe.js", import.meta.url), "utf8"), context);
const safe = context.BlazeRidgeSafe;

assert.equal(safe.escapeHtml(`<img src=x onerror="alert(1)">`), "&lt;img src=x onerror=&quot;alert(1)&quot;&gt;");
assert.equal(safe.safePaymentUrl("https://buy.stripe.com/6oU9AUcV5gcTeoWb3x5J600"), "https://buy.stripe.com/6oU9AUcV5gcTeoWb3x5J600");
assert.equal(safe.safePaymentUrl("javascript:alert(1)"), "");
assert.equal(safe.safePaymentUrl("https://evil.example/phish"), "");
assert.equal(safe.safePaymentUrl("http://buy.stripe.com/abc"), "");
assert.equal(safe.safePaymentUrl("https://buy.stripe.com.evil.example/abc"), "");
assert.equal(safe.safeId("habit-tracker"), "habit-tracker");
assert.equal(safe.safeId("../etc/passwd"), "");
assert.equal(safe.safeId("<script>"), "");
assert.equal(safe.safeDownloadName("BlazeRidge_Kit.pdf"), "BlazeRidge_Kit.pdf");
assert.equal(safe.safeDownloadName("../../etc/passwd"), "");
assert.equal(safe.safeDownloadName("notes.html"), "");
assert.equal(safe.moneyAmount(-9), 0);
assert.equal(safe.moneyAmount("12"), 12);
assert.equal(safe.moneyAmount("nope"), 0);
assert.equal(safe.plainText("a\u0000b", 10), "ab");

console.log("safe.test.mjs ok");
