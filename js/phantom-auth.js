/**
 * Phantom Connect social login (Google + Apple) for the static shop.
 * The Browser SDK loads only after a click, an OAuth return, or a still-valid
 * local Phantom session on this page. One BrowserSDK instance per page.
 */
(function (global) {
  const SDK_URL = "https://esm.sh/@phantom/browser-sdk@2.0.4";
  const PENDING_KEY = "blazeridge_phantom_pending";
  let sdk = null;
  let loadPromise = null;
  let restoreGen = 0;

  function authConfig() {
    return global.BLAZERIDGE_AUTH || {};
  }

  function appId() {
    return String(authConfig().phantomAppId || authConfig().PHANTOM_APP_ID || "").trim();
  }

  function redirectUrl() {
    const configured = String(authConfig().phantomRedirectUrl || "").trim();
    if (configured) return configured;
    return "https://dennisabt1-netizen.github.io/blazeridge-shop/login.html";
  }

  function hasAuthParams() {
    const query = new URLSearchParams(global.location.search);
    const state = query.get("state") || "";
    if (state.indexOf("tt.") === 0) return false;
    if (query.has("code") || query.has("state") || query.has("error")) return true;
    return /(?:^|[?#&])(?:code|state|error)=/.test(global.location.hash || "");
  }

  function isOAuthReturn() {
    if (global.sessionStorage.getItem(PENDING_KEY) !== "1") return false;
    return hasAuthParams();
  }

  function stripPhantomQuery() {
    const url = new URL(global.location.href);
    ["code", "state", "error", "error_description"].forEach((key) => {
      url.searchParams.delete(key);
    });
    if (/(?:^|[?#&])(?:code|state|error)=/.test(url.hash || "")) url.hash = "";
    const next = url.pathname + (url.search ? url.search : "") + url.hash;
    global.history.replaceState({}, "", next);
    global.sessionStorage.removeItem(PENDING_KEY);
  }

  function show(text, warning) {
    const msg = document.getElementById("oauth-msg");
    if (!msg) return;
    msg.textContent = text || "";
    msg.classList.toggle("show", !!text);
    msg.classList.toggle("warn", !!warning);
  }

  function solanaAddress(addresses) {
    const list = Array.isArray(addresses) ? addresses : [];
    const match = list.find((item) => {
      const kind = String((item && (item.addressType || item.chain)) || "").toLowerCase();
      return kind === "solana" || kind.indexOf("sol") !== -1;
    });
    const picked = match || list[0] || {};
    return String(picked.address || "");
  }

  function providerName(value) {
    const text = String(value || "");
    if (text === "apple" || text === "phantom-apple") return "phantom-apple";
    if (text === "google" || text === "phantom-google") return "phantom-google";
    if (text.indexOf("phantom") === 0) return text;
    return "phantom";
  }

  function recordConnection(data) {
    const addresses = (data && data.addresses) || (sdk && sdk.isConnected() ? sdk.getAddresses() : []);
    const address = solanaAddress(addresses);
    if (!address || !global.BlazeRidgeAuth || !global.BlazeRidgeAuth.noteSession) return;
    const existing = global.BlazeRidgeAuth.getSession && global.BlazeRidgeAuth.getSession();
    const connectedAt = existing && existing.address === address && existing.connectedAt
      ? Number(existing.connectedAt)
      : Date.now();
    global.BlazeRidgeAuth.noteSession({
      provider: providerName((data && data.provider) || (existing && existing.provider)),
      sub: address,
      name: "",
      email: "",
      address: address,
      connectedAt: connectedAt
    });
  }

  function ensureSdk(autoConnect) {
    if (sdk) return Promise.resolve(sdk);
    if (!appId()) return Promise.reject(new Error("missing-app-id"));
    if (loadPromise) return loadPromise;
    loadPromise = import(SDK_URL).then((mod) => {
      const AddressType = mod.AddressType;
      const chain = AddressType && (AddressType.solana || AddressType.Solana);
      if (!mod.BrowserSDK || !chain) throw new Error("Phantom SDK did not load.");
      sdk = new mod.BrowserSDK({
        providers: ["google", "apple"],
        appId: appId(),
        addressTypes: [chain],
        authOptions: { redirectUrl: redirectUrl() },
        autoConnect: !!autoConnect
      });
      sdk.on("connect", (event) => {
        recordConnection({
          addresses: event && event.addresses,
          provider: event && event.provider
        });
      });
      return sdk;
    }).catch((error) => {
      loadPromise = null;
      sdk = null;
      throw error;
    });
    return loadPromise;
  }

  function missingAppMessage() {
    return "Phantom-Anmeldung braucht eine bestehende App-ID aus dem Phantom Portal (phantomAppId in auth-config.js). Neue Portal-Anmeldungen sind derzeit pausiert. Die Redirect-URL " + redirectUrl() + " muss in der App freigeschaltet sein.";
  }

  async function connect(provider) {
    if (provider !== "google" && provider !== "apple") {
      return { ok: false, message: "Nur Google und Apple sind für Phantom freigeschaltet." };
    }
    if (!appId()) return { ok: false, message: missingAppMessage() };
    global.sessionStorage.setItem(PENDING_KEY, "1");
    const gen = restoreGen;
    try {
      const instance = await ensureSdk(false);
      if (gen !== restoreGen) return { ok: false, message: "Anmeldung abgebrochen." };
      const result = await instance.connect({ provider: provider });
      recordConnection({
        addresses: (result && result.addresses) || instance.getAddresses(),
        provider: provider
      });
      global.sessionStorage.removeItem(PENDING_KEY);
      return { ok: true, message: "Angemeldet. Die Solana-Adresse liegt in dieser Sitzung (7 Tage)." };
    } catch (error) {
      global.sessionStorage.removeItem(PENDING_KEY);
      const text = error && error.message ? String(error.message) : "";
      if (/reject|cancel|closed|denied/i.test(text)) {
        return { ok: false, message: "Anmeldung abgebrochen." };
      }
      return { ok: false, message: text || "Anmeldung fehlgeschlagen." };
    }
  }

  async function disconnect() {
    restoreGen += 1;
    global.sessionStorage.removeItem(PENDING_KEY);
    if (!sdk) return;
    try {
      await sdk.disconnect();
    } catch (_) { /* user may already be signed out */ }
  }

  function bindButtons() {
    async function go(provider, button) {
      button.disabled = true;
      const result = await connect(provider);
      show(result.message, !result.ok);
      button.disabled = false;
    }
    const google = document.getElementById("btn-phantom-google");
    const apple = document.getElementById("btn-phantom-apple");
    if (google) google.addEventListener("click", () => go("google", google));
    if (apple) apple.addEventListener("click", () => go("apple", apple));
  }

  async function restoreIfNeeded() {
    if (!appId() || !global.BlazeRidgeAuth) return;
    const oauthReturn = isOAuthReturn();
    const session = global.BlazeRidgeAuth.getSession && global.BlazeRidgeAuth.getSession();
    const keep = session && String(session.provider || "").indexOf("phantom") === 0;
    if (!oauthReturn && !keep) return;
    const gen = restoreGen;
    try {
      const instance = await ensureSdk(true);
      if (gen !== restoreGen) {
        if (oauthReturn) stripPhantomQuery();
        return;
      }
      if (!instance.isConnected()) await instance.autoConnect();
      if (oauthReturn) stripPhantomQuery();
      if (gen !== restoreGen) return;
      if (instance.isConnected()) {
        recordConnection({ addresses: instance.getAddresses(), provider: (session && session.provider) || "phantom" });
        return;
      }
      if (keep && global.BlazeRidgeAuth.markSessionExpired) global.BlazeRidgeAuth.markSessionExpired();
    } catch (_) {
      if (oauthReturn) stripPhantomQuery();
      if (gen !== restoreGen) return;
      show("Phantom-Sitzung konnte nicht geladen werden. Die lokale Anmeldung bleibt.", true);
    }
  }

  function boot() {
    bindButtons();
    restoreIfNeeded();
  }

  global.BlazeRidgePhantom = {
    appId: appId,
    redirectUrl: redirectUrl,
    connect: connect,
    disconnect: disconnect,
    isConfigured: function () { return !!appId(); }
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})(window);
