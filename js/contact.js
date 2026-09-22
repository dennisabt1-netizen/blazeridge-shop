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

  async function submit(form) {
    const formData = new FormData(form);
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
      status(form, "Please enter a valid email and a message of at least 10 characters.", "warn");
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
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      submit(form);
    });
  });
})(window);
