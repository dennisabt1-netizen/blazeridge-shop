/**
 * BlazeRidge auth UI — Google / Apple placeholders.
 * Real OAuth / Firebase only when client IDs (and optional Firebase keys) are set.
 */
(function (global) {
  function hasGoogle() {
    const c = global.BLAZERIDGE_CONFIG || {};
    return !!(c.GOOGLE_CLIENT_ID && c.GOOGLE_CLIENT_ID.trim());
  }
  function hasApple() {
    const c = global.BLAZERIDGE_CONFIG || {};
    return !!(c.APPLE_CLIENT_ID && c.APPLE_CLIENT_ID.trim());
  }
  function hasFirebase() {
    const c = global.BLAZERIDGE_CONFIG || {};
    return !!(c.FIREBASE_API_KEY && c.FIREBASE_API_KEY.trim() &&
      c.FIREBASE_AUTH_DOMAIN && c.FIREBASE_PROJECT_ID);
  }

  const Auth = {
    isConfigured(provider) {
      if (provider === "google") return hasGoogle();
      if (provider === "apple") return hasApple();
      return false;
    },
    firebaseReady() {
      return hasFirebase();
    },
    explain(provider) {
      if (provider === "google") {
        return "Add GOOGLE_CLIENT_ID in config.js (Google Cloud Console → OAuth 2.0 Web client), or Firebase Auth with Google enabled.";
      }
      return "Add APPLE_CLIENT_ID in config.js (Apple Developer → Sign in with Apple → Services ID), or Firebase Auth with Apple enabled.";
    },
    start(provider) {
      if (!this.isConfigured(provider) && !this.firebaseReady()) {
        return { ok: false, message: this.explain(provider) };
      }
      return {
        ok: false,
        message:
          "Keys are present in config, but OAuth/Firebase Sign-In still needs to be wired for this domain. See README."
      };
    }
  };

  global.BlazeRidgeAuth = Auth;
})(window);
