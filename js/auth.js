/**
 * BlazeRidge authentication UI.
 * Google Sign-In uses Google Identity Services when auth-config.js supplies a client ID.
 * Email/Password: Firebase only. Passwords are never stored in this browser.
 */
(function (global) {
  const authConfig = global.BLAZERIDGE_AUTH || {};
  const SESSION_KEY = "blazeridge_auth_session";
  let googleReady = false;
  let googleInitPromise = null;
  let firebaseApp = null;
  let firebaseAuth = null;
  let firebaseInitPromise = null;

  function siteConfig() {
    return global.BLAZERIDGE_CONFIG || {};
  }

  function googleClientId() {
    const legacy = siteConfig();
    return String(authConfig.googleClientId || legacy.GOOGLE_CLIENT_ID || "").trim();
  }

  function firebaseKeys() {
    const cfg = siteConfig();
    const fromAuth = authConfig.firebase || {};
    return {
      apiKey: String(fromAuth.apiKey || cfg.FIREBASE_API_KEY || "").trim(),
      authDomain: String(fromAuth.authDomain || cfg.FIREBASE_AUTH_DOMAIN || "").trim(),
      projectId: String(fromAuth.projectId || cfg.FIREBASE_PROJECT_ID || "").trim()
    };
  }

  function hasFirebase() {
    const k = firebaseKeys();
    return !!(k.apiKey && k.authDomain && k.projectId);
  }

  function hasGoogle() {
    return authConfig.authEnabled?.google !== false && !!googleClientId();
  }

  function hasApple() {
    return authConfig.authEnabled?.apple === true && !!authConfig.appleClientId;
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector('script[src="' + src + '"]');
      if (existing) {
        if (existing.dataset.loaded === "1") return resolve();
        existing.addEventListener("load", () => resolve());
        existing.addEventListener("error", () => reject(new Error("Failed to load " + src)));
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = () => {
        script.dataset.loaded = "1";
        resolve();
      };
      script.onerror = () => reject(new Error("Failed to load " + src));
      document.head.appendChild(script);
    });
  }

  function loadGoogleIdentityServices() {
    if (!hasGoogle()) {
      return Promise.reject(new Error("Google Sign-In is not configured."));
    }
    if (global.google?.accounts?.id) return Promise.resolve();
    if (googleInitPromise) return googleInitPromise;
    googleInitPromise = loadScript("https://accounts.google.com/gsi/client");
    return googleInitPromise;
  }

  async function verifyGoogleIdToken(credential) {
    const clientId = googleClientId();
    if (!credential || !clientId) return null;
    try {
      const res = await fetch("https://oauth2.googleapis.com/tokeninfo?id_token=" + encodeURIComponent(credential));
      if (!res.ok) return null;
      const profile = await res.json();
      const aud = profile && profile.aud;
      const audOk = aud === clientId || (Array.isArray(aud) && aud.indexOf(clientId) !== -1);
      if (!profile || !audOk) return null;
      if (profile.iss !== "https://accounts.google.com" && profile.iss !== "accounts.google.com") return null;
      if (String(profile.email_verified) !== "true") return null;
      const exp = Number(profile.exp);
      if (!Number.isFinite(exp) || exp * 1000 <= Date.now()) return null;
      return profile;
    } catch (_) {
      return null;
    }
  }

  function setSession(user) {
    global.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    global.dispatchEvent(new CustomEvent("blazeridge:signed-in", { detail: user }));
  }

  function getSession() {
    try {
      return JSON.parse(global.localStorage.getItem(SESSION_KEY) || "null");
    } catch (_) {
      return null;
    }
  }

  function clearSession() {
    global.localStorage.removeItem(SESSION_KEY);
    global.localStorage.removeItem("blazeridge_google_user");
    global.dispatchEvent(new CustomEvent("blazeridge:signed-out"));
  }

  function handleGoogleCredential(response) {
    const credential = response && response.credential;
    verifyGoogleIdToken(credential).then((profile) => {
      if (!profile || !profile.sub || !profile.email) {
        const msg = document.getElementById("oauth-msg");
        if (msg) {
          msg.textContent = "Google sign-in could not be verified. Try again.";
          msg.classList.add("show", "warn");
        }
        return;
      }
      const picture = typeof profile.picture === "string" && profile.picture.startsWith("https://")
        ? profile.picture
        : "";
      const user = {
        provider: "google",
        sub: String(profile.sub),
        name: String(profile.name || ""),
        email: String(profile.email),
        picture
      };
      global.localStorage.setItem("blazeridge_google_user", JSON.stringify(user));
      setSession(user);
      global.dispatchEvent(new CustomEvent("blazeridge:google-signed-in", { detail: user }));
      updateLoginUi();
    });
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

  async function initFirebase() {
    if (!hasFirebase()) return false;
    if (firebaseAuth) return true;
    if (firebaseInitPromise) return firebaseInitPromise;

    firebaseInitPromise = (async () => {
      await loadScript("https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js");
      await loadScript("https://www.gstatic.com/firebasejs/10.14.1/firebase-auth-compat.js");
      const k = firebaseKeys();
      firebaseApp = global.firebase.initializeApp({
        apiKey: k.apiKey,
        authDomain: k.authDomain,
        projectId: k.projectId
      });
      firebaseAuth = global.firebase.auth();
      return true;
    })().catch(() => {
      firebaseInitPromise = null;
      return false;
    });

    return firebaseInitPromise;
  }

  function emailUnavailable() {
    return {
      ok: false,
      message: "Email login isn’t available yet. Use Google, or shop without an account. Passwords are not stored in this browser."
    };
  }

  async function emailSignUp(email, password) {
    email = String(email || "").trim().toLowerCase();
    if (!hasFirebase()) return emailUnavailable();
    if (!email || !password || password.length < 6) {
      return { ok: false, message: "Use a valid email and a password of at least 6 characters." };
    }
    const ready = await initFirebase();
    if (!ready) return { ok: false, message: "Firebase could not load. Check your keys." };
    try {
      const cred = await firebaseAuth.createUserWithEmailAndPassword(email, password);
      const user = {
        provider: "email",
        mode: "firebase",
        sub: cred.user.uid,
        name: "",
        email: cred.user.email || email
      };
      setSession(user);
      return { ok: true, message: "Account created. Signed in." };
    } catch (err) {
      return { ok: false, message: err.message || "Sign-up failed." };
    }
  }

  async function emailSignIn(email, password) {
    email = String(email || "").trim().toLowerCase();
    if (!hasFirebase()) return emailUnavailable();
    if (!email || !password) {
      return { ok: false, message: "Enter email and password." };
    }
    const ready = await initFirebase();
    if (!ready) return { ok: false, message: "Firebase could not load. Check your keys." };
    try {
      const cred = await firebaseAuth.signInWithEmailAndPassword(email, password);
      const user = {
        provider: "email",
        mode: "firebase",
        sub: cred.user.uid,
        name: "",
        email: cred.user.email || email
      };
      setSession(user);
      return { ok: true, message: "Signed in." };
    } catch (err) {
      return { ok: false, message: err.message || "Sign-in failed." };
    }
  }

  async function sendMagicLink(email) {
    email = String(email || "").trim().toLowerCase();
    if (!email) return { ok: false, message: "Enter your email." };
    if (!hasFirebase()) {
      return {
        ok: false,
        message: "Magic Link needs Firebase. Add FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, and FIREBASE_PROJECT_ID, or use Google sign-in."
      };
    }
    const ready = await initFirebase();
    if (!ready) return { ok: false, message: "Firebase could not load." };
    try {
      const actionCodeSettings = {
        url: (authConfig.redirectUri || global.location.origin + global.location.pathname).replace(/login\.html.*/, "login.html"),
        handleCodeInApp: true
      };
      await firebaseAuth.sendSignInLinkToEmail(email, actionCodeSettings);
      global.localStorage.setItem("blazeridge_email_for_link", email);
      return { ok: true, message: "Magic link sent — check your inbox." };
    } catch (err) {
      return { ok: false, message: err.message || "Could not send magic link." };
    }
  }

  async function completeMagicLinkIfPresent() {
    if (!hasFirebase()) return;
    const ready = await initFirebase();
    if (!ready || !global.firebase.auth().isSignInWithEmailLink(global.location.href)) return;
    let email = global.localStorage.getItem("blazeridge_email_for_link") || "";
    if (!email) email = global.prompt("Confirm your email to finish sign-in") || "";
    if (!email) return;
    try {
      const cred = await firebaseAuth.signInWithEmailLink(email, global.location.href);
      global.localStorage.removeItem("blazeridge_email_for_link");
      const user = {
        provider: "email",
        mode: "firebase",
        sub: cred.user.uid,
        name: "",
        email: cred.user.email || email
      };
      setSession(user);
      global.dispatchEvent(new CustomEvent("blazeridge:signed-in", { detail: user }));
      global.history.replaceState({}, "", global.location.pathname + global.location.search.replace(/[?&]apiKey=[^&]*/g, "").replace(/^&/, "?"));
    } catch (_) { /* ignore */ }
  }

  function updateLoginUi() {
    const note = document.getElementById("email-auth-note");
    const modeBadge = document.getElementById("email-mode-badge");
    if (note) {
      if (hasFirebase()) {
        note.textContent = "Email auth uses Firebase on this site.";
        note.classList.remove("warn-note");
      } else {
        note.textContent = "Email login isn’t available yet. Use Google, or shop without an account.";
        note.classList.add("warn-note");
      }
    }
    if (modeBadge) {
      modeBadge.textContent = hasFirebase() ? "Firebase" : "Off";
      modeBadge.hidden = false;
    }

    const session = getSession();
    const sessionEl = document.getElementById("auth-session");
    if (sessionEl) {
      const email = session && typeof session.email === "string" ? session.email : "";
      sessionEl.replaceChildren();
      if (email) {
        sessionEl.hidden = false;
        sessionEl.append("Signed in as ");
        const strong = document.createElement("strong");
        strong.textContent = email;
        sessionEl.append(strong);
        sessionEl.append(" · ");
        const out = document.createElement("button");
        out.type = "button";
        out.className = "linkish";
        out.id = "btn-signout";
        out.textContent = "Sign out";
        out.addEventListener("click", () => {
          clearSession();
          updateLoginUi();
        });
        sessionEl.append(out);
      } else {
        sessionEl.hidden = true;
      }
    }

    const magicBtn = document.getElementById("btn-magic-link");
    if (magicBtn) magicBtn.hidden = !hasFirebase();
  }

  function bindEmailForm() {
    const form = document.getElementById("email-auth-form");
    if (!form || form._brBound) return;
    form._brBound = true;

    const msg = document.getElementById("oauth-msg");
    function show(text, warning) {
      if (!msg) return;
      msg.textContent = text || "";
      msg.classList.toggle("show", !!text);
      msg.classList.toggle("warn", !!warning);
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = form.querySelector('[name="email"]').value;
      const password = form.querySelector('[name="password"]').value;
      const mode = form.getAttribute("data-mode") || "signin";
      const btn = form.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;
      const result = mode === "signup"
        ? await emailSignUp(email, password)
        : await emailSignIn(email, password);
      show(result.message, !result.ok);
      updateLoginUi();
      if (btn) btn.disabled = false;
    });

    document.querySelectorAll("[data-email-mode]").forEach((tab) => {
      tab.addEventListener("click", () => {
        const mode = tab.getAttribute("data-email-mode");
        form.setAttribute("data-mode", mode);
        document.querySelectorAll("[data-email-mode]").forEach((t) => {
          t.classList.toggle("active", t === tab);
        });
        const submit = form.querySelector('button[type="submit"]');
        if (submit) submit.textContent = mode === "signup" ? "Create account" : "Sign in with email";
      });
    });

    const magic = document.getElementById("btn-magic-link");
    if (magic) {
      magic.addEventListener("click", async () => {
        const email = form.querySelector('[name="email"]').value;
        magic.disabled = true;
        const result = await sendMagicLink(email);
        show(result.message, !result.ok);
        magic.disabled = false;
      });
    }
  }

  const Auth = {
    isConfigured(provider) {
      if (provider === "google") return hasGoogle();
      if (provider === "apple") return hasApple();
      if (provider === "email") return true;
      return false;
    },
    firebaseReady() {
      return hasFirebase();
    },
    isDemoEmail() {
      return false;
    },
    getSession,
    signOut: clearSession,
    emailSignIn,
    emailSignUp,
    sendMagicLink,
    explain(provider) {
      if (provider === "google") {
        return "Google Sign-In is unavailable until a Google client ID is configured.";
      }
      if (provider === "email") {
        return hasFirebase()
          ? "Email auth via Firebase."
          : "Email login isn’t available yet. Passwords are not stored in this browser.";
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
    initGoogle,
    updateLoginUi,
    bindEmailForm
  };

  global.BlazeRidgeAuth = Auth;

  function boot() {
    try { global.localStorage.removeItem("blazeridge_demo_users"); } catch (_) { /* ignore */ }
    // Google Identity Services nur auf der Login-Seite laden (Datenschutz, pending-legal 2026-09-25)
    if (hasGoogle() && document.getElementById("google-signin-button")) initGoogle();
    bindEmailForm();
    updateLoginUi();
    completeMagicLinkIfPresent();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})(window);
