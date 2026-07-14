/* ============================================================
   Nat's Collection — Integrasi Analytics (DUMMY)
   ------------------------------------------------------------
   Ini adalah simulasi Google Analytics 4 (gtag.js). ID pengukuran
   di bawah adalah PLACEHOLDER — ganti "G-XXXXXXXXXX" dengan ID
   properti GA4 asli sebelum deploy produksi, dan hapus console.log
   di trackEvent() karena itu hanya untuk demonstrasi lokal.

   METRIK UTAMA YANG DIPANTAU:
   1. Bounce rate        — persentase pengunjung yang keluar tanpa
                            interaksi apa pun dari halaman awal.
                            Target: turun seiring perbaikan hero &
                            kecepatan muat halaman.
   2. Conversion rate     — (jumlah checkout selesai / jumlah sesi)
                            dilacak lewat event "purchase".
   3. Add-to-cart rate    — event "add_to_cart" dibagi jumlah
                            page_view pada produk, mengukur daya
                            tarik listing produk.
   4. Cart abandonment    — sesi yang memicu "add_to_cart" tapi
                            tidak pernah memicu "purchase".
   5. Rata-rata nilai pesanan (AOV) — dihitung dari value pada
                            event "purchase".
   6. Sumber trafik & kata kunci pencarian internal — event
                            "search" membantu memahami permintaan
                            produk yang belum terpenuhi katalog.
   7. Engagement per kategori — event "select_category" &
                            "filter_applied" menunjukkan kategori
                            paling diminati untuk prioritas stok.
   ============================================================ */

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

/* Simulasi pemuatan gtag.js (tidak melakukan request nyata) */
gtag("js", new Date());
gtag("config", "G-XXXXXXXXXX", { anonymize_ip: true });

/**
 * Kirim event kustom ke GA4 (disimulasikan).
 * @param {string} category - Kategori event, mis. "ecommerce"
 * @param {string} action   - Nama aksi, mis. "add_to_cart"
 * @param {string} label    - Detail tambahan, mis. nama produk
 * @param {number} [value]  - Nilai numerik opsional (mis. harga)
 */
function trackEvent(category, action, label, value) {
  const payload = { event_category: category, event_label: label, value };
  gtag("event", action, payload);
  // Simulasi kirim ke GA4 — pada produksi baris ini dihapus/diarahkan
  // ke DevTools Network tab, bukan console.
  console.log(`[GA4 dummy] ${action}`, payload);
}

document.addEventListener("DOMContentLoaded", () => {
  trackEvent("engagement", "page_view", document.title);
});
