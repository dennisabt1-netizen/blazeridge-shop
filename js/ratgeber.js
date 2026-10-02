/* Ratgeber-Seiten: Druck-Button und Jahreskosten-Rechner. Rein lokal, keine Netzwerkzugriffe, kein Speichern. */
(function () {
  function ready(fn) { if (document.readyState !== "loading") fn(); else document.addEventListener("DOMContentLoaded", fn); }
  ready(function () {
    document.querySelectorAll("[data-print]").forEach(function (b) { b.addEventListener("click", function () { window.print(); }); });
    var form = document.querySelector("[data-calc]");
    if (!form) return;
    var out = document.getElementById("calc-out");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var raw = String(form.elements.amount.value || "").trim().replace(/\./g, "").replace(",", ".");
      var n = parseFloat(raw), per = parseInt(form.elements.period.value, 10);
      if (!isFinite(n) || n < 0) { out.textContent = "Bitte einen Betrag als Zahl eingeben, z. B. 240 oder 99,90."; return; }
      // jährlich: /12; halbjährlich: /6; vierteljährlich: /3
      var m = n / per;
      out.textContent = "Rund " + m.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " € pro Monat.";
    });
  });
})();
