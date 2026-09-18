/**
 * Newsletter signup — Formspree when FORMSPREE_ENDPOINT is set,
 * otherwise localStorage demo + mailto fallback.
 */
(function (global) {
  const STORAGE_KEY = "blazeridge_newsletter_signups";

  function endpoint() {
    const auth = global.BLAZERIDGE_AUTH || {};
    const cfg = global.BLAZERIDGE_CONFIG || {};
    return String(
      auth.FORMSPREE_ENDPOINT ||
      auth.formspreeEndpoint ||
      cfg.FORMSPREE_ENDPOINT ||
      ""
    ).trim();
  }

  function saveLocal(entry) {
    let list = [];
    try {
      list = JSON.parse(global.localStorage.getItem(STORAGE_KEY) || "[]");
      if (!Array.isArray(list)) list = [];
    } catch (_) {
      list = [];
    }
    list.push(entry);
    global.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  function setStatus(form, text, kind) {
    const el = form.querySelector("[data-newsletter-status]");
    if (!el) return;
    el.textContent = text || "";
    el.hidden = !text;
    el.classList.toggle("ok", kind === "ok");
    el.classList.toggle("warn", kind === "warn");
  }

  async function submit(form) {
    const nameInput = form.querySelector('[name="name"]');
    const emailInput = form.querySelector('[name="email"]');
    const name = (nameInput && nameInput.value || "").trim();
    const email = (emailInput && emailInput.value || "").trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus(form, "Please enter a valid email.", "warn");
      return;
    }

    const entry = {
      name: name || "",
      email,
      at: new Date().toISOString(),
      source: form.getAttribute("data-source") || "site"
    };

    const url = endpoint();
    const btn = form.querySelector('button[type="submit"]');
    if (btn) btn.disabled = true;

    try {
      if (url) {
        const res = await fetch(url, {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({ name: entry.name, email: entry.email, source: entry.source })
        });
        if (!res.ok) throw new Error("Formspree error");
        setStatus(form, "You're on the list — thanks!", "ok");
        form.reset();
        if (global.BlazeRidgeApp && global.BlazeRidgeApp.toast) {
          global.BlazeRidgeApp.toast("Subscribed — check your inbox soon");
        }
      } else {
        saveLocal(entry);
        const mailto =
          "mailto:hello@blazeridge.local?subject=" +
          encodeURIComponent("Newsletter signup") +
          "&body=" +
          encodeURIComponent("Name: " + entry.name + "\nEmail: " + entry.email);
        setStatus(
          form,
          "Saved locally on this device. Add FORMSPREE_ENDPOINT in config.js to collect for real. Or email us via mailto.",
          "warn"
        );
        const link = form.querySelector("[data-newsletter-mailto]");
        if (link) {
          link.href = mailto;
          link.hidden = false;
        }
        if (global.BlazeRidgeApp && global.BlazeRidgeApp.toast) {
          global.BlazeRidgeApp.toast("Saved locally (demo)", "warn");
        }
      }
    } catch (err) {
      setStatus(form, "Could not submit right now. Try again in a moment.", "warn");
    } finally {
      if (btn) btn.disabled = false;
    }
  }

  function bind(root) {
    (root || document).querySelectorAll("[data-newsletter-form]").forEach((form) => {
      if (form._brBound) return;
      form._brBound = true;
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        submit(form);
      });
    });
  }

  function init() {
    bind();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  global.BlazeRidgeNewsletter = { bind, submit, endpoint };
})(window);
