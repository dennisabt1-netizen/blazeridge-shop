/**
 * Contact form submission through the configured Formspree endpoint.
 */
(function (global) {
  function endpoint() {
    const auth = global.BLAZERIDGE_AUTH || {};
    return String(auth.FORMSPREE_ENDPOINT || auth.formspreeEndpoint || "").trim();
  }

  function status(form, message, kind) {
    const output = form.querySelector("[data-contact-status]");
    output.textContent = message;
    output.className = "form-status " + (kind || "");
    output.hidden = !message;
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

  async function submit(form) {
    const trap = form.querySelector("[data-hp]");
    const formData = new FormData(form);
    formData.delete("website");
    const email = String(formData.get("email") || "").trim().slice(0, 254);
    const message = String(formData.get("message") || "").trim().slice(0, 5000);
    if (trap && trap.value.trim()) {
      form.reset();
      status(form, "Message sent. BlazeRidge will reply by email.", "ok");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
      status(form, "Please enter a valid email and a message of at least 10 characters.", "warn");
      return;
    }
    if (!endpoint()) {
      status(form, "The contact form is offline. Email Einkaufnow@outlook.de instead.", "warn");
      return;
    }

    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    status(form, "Sending…", "");

    try {
      const response = await fetch(endpoint(), {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData
      });
      if (!response.ok) throw new Error("Contact request failed");
      form.reset();
      status(form, "Message sent. BlazeRidge will reply by email.", "ok");
    } catch (error) {
      status(form, "Message could not be sent. Please try again shortly.", "warn");
    } finally {
      button.disabled = false;
    }
  }

  document.querySelectorAll("[data-contact-form]").forEach((form) => {
    ensureTrap(form);
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      submit(form);
    });
  });
})(window);
