/**
 * BlazeRidge authentication UI.
 * Google Sign-In uses Google Identity Services when auth-config.js supplies a client ID.
 */
(function (global) {
  const authConfig = global.BLAZERIDGE_AUTH || {};
  let googleReady = false;
  let googleInitPromise = null;

  function googleClientId() {
    const legacy = global.BLAZERIDGE_CONFIG || {};
    return String(authConfig.googleClientId || legacy.GOOGLE_CLIENT_ID || "").trim();
  }

  function hasGoogle() {
    return authConfig.authEnabled?.google !== false && !!googleClientId();
  }

  function hasApple() {
    return authConfig.authEnabled?.apple === true && !!authConfig.appleClientId;
  }

  function loadGoogleIdentityServices() {
    if (!hasGoogle()) {
      return Promise.reject(new Error("Google Sign-In is not configured."));
    }
    if (global.google?.accounts?.id) return Promise.resolve();
    if (googleInitPromise) return googleInitPromise;

    googleInitPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Google Identity Services could not be loaded."));
      document.head.appendChild(script);
    });
    return googleInitPromise;
  }

  function decodeCredential(credential) {
    try {
      const encoded = credential.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
      const bytes = Uint8Array.from(atob(encoded), (char) => char.charCodeAt(0));
      return JSON.parse(new TextDecoder().decode(bytes));
    } catch (_) {
      return null;
    }
  }

  function handleGoogleCredential(response) {
    const profile = decodeCredential(response.credential);
    if (profile) {
      const user = {
        sub: profile.sub,
        name: profile.name || "",
        email: profile.email || "",
        picture: profile.picture || ""
      };
      global.localStorage.setItem("blazeridge_google_user", JSON.stringify(user));
      global.dispatchEvent(new CustomEvent("blazeridge:google-signed-in", { detail: user }));
    }
  }

  function initGoogle() {
    if (!hasGoogle()) return Promise.resolve(false);
    return loadGoogleIdentityServices().then(() => {
      global.google.accounts.id.initialize({
        client_id: googleClientId(),
        callback: handleGoogleCredential,
        auto_select: false,
        cancel_on_tap_outside: true
      });
      googleReady = true;
      const target = document.getElementById("google-signin-button");
      const fallback = document.getElementById("btn-google");
      if (target) {
        target.hidden = false;
        global.google.accounts.id.renderButton(target, {
          type: "standard",
          theme: "outline",
          size: "large",
          text: "continue_with",
          shape: "rectangular",
          width: 320
        });
      }
      if (fallback) fallback.hidden = true;
      return true;
    }).catch(() => false);
  }

  const Auth = {
    isConfigured(provider) {
      if (provider === "google") return hasGoogle();
      if (provider === "apple") return hasApple();
      return false;
    },
    firebaseReady() {
      return false;
    },
    explain(provider) {
      if (provider === "google") {
        return "Google Sign-In is unavailable until a Google client ID is configured.";
      }
      return "Apple Sign-In is not enabled for this site.";
    },
    start(provider) {
      if (provider === "google" && hasGoogle()) {
        if (!googleReady) {
          initGoogle();
          return { ok: false, message: "Google Sign-In is loading. Please try again." };
        }
        global.google.accounts.id.prompt();
        return { ok: true, message: "" };
      }
      return { ok: false, message: this.explain(provider) };
    },
    initGoogle
  };

  global.BlazeRidgeAuth = Auth;
  if (hasGoogle()) initGoogle();
})(window);
