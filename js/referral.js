/**
 * Native share and clipboard helpers for the referral page.
 */
(function () {
  const shareButton = document.querySelector("[data-share-site]");
  const copyButton = document.querySelector("[data-copy-site]");
  const status = document.querySelector("[data-share-status]");
  const url = new URL("index.html?ref=friend", document.baseURI).href;
  const payload = {
    title: "BlazeRidge digital tools",
    text: "Short, practical digital tools for money habits, content and productivity.",
    url
  };

  function show(message) {
    if (status) {
      status.textContent = message;
      status.hidden = false;
    }
  }

  if (shareButton) {
    shareButton.addEventListener("click", async () => {
      if (!navigator.share) {
        copyButton.click();
        return;
      }
      try {
        await navigator.share(payload);
        show("Thanks for sharing BlazeRidge.");
      } catch (error) {
        if (error.name !== "AbortError") show("Sharing was cancelled. You can copy the link instead.");
      }
    });
  }

  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(url);
        show("Link copied. Send it to a friend.");
      } catch (error) {
        show(url);
      }
    });
  }
})();
