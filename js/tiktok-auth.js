/**
 * TikTok Login Kit (web, OAuth v2) for the static shop.
 * The browser only redirects to TikTok and posts the returned code to a
 * configured server. The client secret never lives in this page.
 * Docs: https://developers.tiktok.com/docs/en/login-kit-web (4 August 2026).
 */
(function (global) {
  const AUTHORIZE = "https://www.tiktok.com/v2/auth/authorize/";
  const STATE_KEY = "blazeridge_tiktok_state";
  const SCOPE = "user.info.basic";

  function authConfig() {
    return global.BLAZERIDGE_AUTH || {};
  }

  function clientKey() {
    return String(authConfig().tiktokClientKey || authConfig().TIKTOK_CLIENT_KEY || "").trim();
  }

  function tokenEndpoint() {
    return String(authConfig().tiktokTokenEndpoint || authConfig().TIKTOK_TOKEN_ENDPOINT || "").trim();
  }

  function redirectUrl() {
    const configured = String(authConfig().tiktokRedirectUrl || "").trim();
    if (configured) return configured;
    return "https://dennisabt1-netizen.github.io/blazeridge-shop/login.html";
  }

  function show(text, warning) {
    const msg = document.getElementById("oauth-msg");
    if (!msg) return;
    msg.textContent = text || "";
    msg.classList.toggle("show", !!text);
    msg.classList.toggle("warn", !!warning);
  }

  function missingConfigMessage() {
    return "TikTok-Anmeldung braucht einen Client Key (tiktokClientKey) und eine Server-Adresse (tiktokTokenEndpoint), die den Code tauscht. Das Client Secret bleibt auf dem Server. Redirect-URL in Login Kit eintragen: " + redirectUrl();
  }

  function randomState() {
    const bytes = new Uint8Array(16);
    global.crypto.getRandomValues(bytes);
    let raw = "";
    for (let i = 0; i < bytes.length; i++) raw += String.fromCharCode(bytes[i]);
    return "tt." + global.btoa(raw).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
  }

  function authorizeUrl(state) {
    const url = new URL(AUTHORIZE);
    url.searchParams.set("client_key", clientKey());
    url.searchParams.set("response_type", "code");
    url.searchParams.set("scope", SCOPE);
    url.searchParams.set("redirect_uri", redirectUrl());
    url.searchParams.set("state", state);
    url.searchParams.set("disable_auto_auth", "1");
    return url.toString();
  }

  function stripTikTokQuery() {
    const url = new URL(global.location.href);
    ["code", "scopes", "state", "error", "error_description"].forEach((key) => {
      url.searchParams.delete(key);
    });
    const next = url.pathname + (url.search ? url.search : "") + url.hash;
    global.history.replaceState({}, "", next);
  }

  function profileFrom(data) {
    const body = data && typeof data === "object" ? data : {};
    const openId = String(body.open_id || body.openId || "").trim();
    const name = String(body.display_name || body.displayName || "").trim();
    const picture = String(body.avatar_url || body.avatarUrl || "").trim();
    if (!openId && !name) return null;
    return {
      provider: "tiktok",
      sub: openId,
      name: name,
      email: "",
      picture: picture,
      connectedAt: Date.now()
    };
  }

  async function finish(code) {
    const endpoint = tokenEndpoint();
    let target;
    try {
      target = new URL(endpoint, global.location.href);
    } catch (_) {
      show(missingConfigMessage(), true);
      return;
    }
    const sameOrigin = target.origin === global.location.origin;
    const response = await fetch(target.toString(), {
      method: "POST",
      credentials: sameOrigin ? "include" : "omit",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ code: code, redirect_uri: redirectUrl() })
    });
    if (!response.ok) {
      show("TikTok-Anmeldung konnte nicht abgeschlossen werden.", true);
      return;
    }
    const data = await response.json();
    const user = profileFrom(data);
    if (!user || !global.BlazeRidgeAuth || !global.BlazeRidgeAuth.noteSession) {
      show("TikTok-Anmeldung konnte nicht abgeschlossen werden.", true);
      return;
    }
    global.BlazeRidgeAuth.noteSession(user);
    show("Angemeldet mit TikTok.", false);
  }

  async function completeIfPresent() {
    const query = new URLSearchParams(global.location.search);
    const state = query.get("state") || "";
    if (state.indexOf("tt.") !== 0) return;
    const expected = global.sessionStorage.getItem(STATE_KEY);
    global.sessionStorage.removeItem(STATE_KEY);
    const error = query.get("error");
    const code = query.get("code");
    stripTikTokQuery();
    if (error) {
      show("TikTok-Anmeldung abgebrochen.", true);
      return;
    }
    if (!expected || expected !== state || !code) {
      show("TikTok-Anmeldung abgelehnt. Bitte erneut starten.", true);
      return;
    }
    if (!tokenEndpoint()) {
      show(missingConfigMessage(), true);
      return;
    }
    try {
      await finish(code);
    } catch (_) {
      show("TikTok-Anmeldung konnte nicht abgeschlossen werden.", true);
    }
  }

  async function connect() {
    if (!clientKey() || !tokenEndpoint()) {
      return { ok: false, message: missingConfigMessage() };
    }
    if (!global.crypto || !global.crypto.getRandomValues) {
      return { ok: false, message: "Dieser Browser kann die TikTok-Anmeldung nicht starten." };
    }
    const state = randomState();
    global.sessionStorage.setItem(STATE_KEY, state);
    global.location.assign(authorizeUrl(state));
    return { ok: true, message: "" };
  }

  function bind() {
    const button = document.getElementById("btn-tiktok");
    if (!button) return;
    button.addEventListener("click", async () => {
      button.disabled = true;
      const result = await connect();
      if (result && result.message) show(result.message, !result.ok);
      button.disabled = false;
    });
  }

  function boot() {
    bind();
    completeIfPresent();
  }

  global.BlazeRidgeTikTok = {
    clientKey: clientKey,
    redirectUrl: redirectUrl,
    connect: connect,
    authorizeUrl: authorizeUrl
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})(window);
