/* ============================================================
   Nat's Collection — Mode Gelap
   Preferensi disimpan di localStorage dan diterapkan sebelum
   render agar tidak ada "flash" warna terang.
   ============================================================ */

const DM_KEY = "kn_dark_mode";

/* Script ini dimuat di akhir <body>, jadi document.body sudah ada
   saat kode berjalan — cukup terapkan langsung tanpa menunggu
   DOMContentLoaded, sehingga tidak ada "flash" warna terang. */
(function applyStoredTheme() {
  const stored = localStorage.getItem(DM_KEY);
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = stored ? stored === "1" : prefersDark;
  if (isDark) document.body.classList.add("dark-mode");
})();

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    const toggle = e.target.closest("#dark-toggle");
    if (!toggle) return;
    const nowDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem(DM_KEY, nowDark ? "1" : "0");
    if (typeof trackEvent === "function") trackEvent("ui", "toggle_dark_mode", nowDark ? "on" : "off");
  });
});
