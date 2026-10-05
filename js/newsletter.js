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

  function trapFilled(form) {
    const trap = form.querySelector("[data-hp]");
    return !!(trap && trap.value.trim());
  }

  function ensureTrap(form) {
    if (form.querySelector("[data-hp]")) return;
    const label = document.createElement("label");
    label.className = "hp-field";
    label.setAttribute("aria-hidden", "true");
    label.textContent = "Website";
    const input = document.createElement("input");
    input.type = "text";
    input.name = "website";
    input.tabIndex = -1;
    input.autocomplete = "off";
    input.setAttribute("data-hp", "");
    label.appendChild(input);
    form.appendChild(label);
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
    const name = (nameInput && nameInput.value || "").trim().slice(0, 80);
    const email = (emailInput && emailInput.value || "").trim().slice(0, 254);
    if (trapFilled(form)) {
      setStatus(form, "You're on the list — thanks!", "ok");
      form.reset();
      return;
    }
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
          "mailto:Einkaufnow@outlook.de?subject=" +
          encodeURIComponent("Newsletter signup") +
          "&body=" +
          encodeURIComponent("Name: " + entry.name + "\nEmail: " + entry.email);
        setStatus(
          form,
          "Saved on this device only. Email Einkaufnow@outlook.de if it should be collected for real.",
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
      ensureTrap(form);
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


/* Einwilligungshinweis unter jedem Anmeldeformular (Art. 7 DSGVO / Transparenz). */
(function () {
  function addNotes() {
    document.querySelectorAll("form[data-newsletter-form]").forEach(function (f) {
      if (f.parentNode.querySelector(".newsletter-consent")) return;
      var p = document.createElement("p");
      p.className = "newsletter-consent muted";
      p.style.cssText = "font-size:.8rem;margin:.5rem 0 0";
      p.innerHTML = 'Mit der Anmeldung willigst du in den Versand des Newsletters ein. Abmeldung jederzeit per E-Mail an <a href="mailto:Einkaufnow@outlook.de">Einkaufnow@outlook.de</a>. Infos: <a href="datenschutz.html">Datenschutzerklärung</a>.';
      f.insertAdjacentElement("afterend", p);
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", addNotes); else addNotes();
})();
