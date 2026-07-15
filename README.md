# Nat's Collection

Toko hijab daring (bergo instan, pasmina crinkle, segi empat) — dibangun dengan **HTML, CSS, dan JavaScript murni (vanilla)**, tanpa framework atau library eksternal untuk logika UI.

**Link Github Pages (Live Website):** (https://najwatalithasabriyyah-sys.github.io/tugas-besar-kait/)

**Link Repository Github:** (https://github.com/najwatalithasabriyyah-sys/tugas-besar-kait)

**Link Video Demonstrasi:** (https://drive.google.com/file/d/18bEvM-6n4W28AzKHFPs4EuyQcNPaybyx/view?usp=drivesdk)


---

## Daftar Isi
1. [Ringkasan Bisnis](#1-ringkasan-bisnis)
2. [Fitur Teknis](#2-fitur-teknis)
3. [Struktur Folder](#3-struktur-folder)
4. [Menjalankan Secara Lokal](#4-menjalankan-secara-lokal)
5. [Deployment ke GitHub Pages](#5-deployment-ke-github-pages)
6. [Rencana Pengembangan Lanjutan](#6-rencana-pengembangan-lanjutan)

---

## 1. Ringkasan Bisnis

### Nama, Deskripsi & Value Proposition
**Nat's Collection** adalah toko daring yang fokus menjual hijab dalam tiga kategori inti — bergo instan, pasmina crinkle, dan segi empat. Value proposition utama: **bahan berkualitas konsisten + warna akurat sesuai foto + harga bersahabat**, dengan pengalaman belanja daring yang ringkas dari katalog hingga checkout.

### Target Market & Segmentasi
- **Pelajar & pekerja muda** (17–30 th) — mencari bergo instan praktis untuk dipakai harian.
- **Ibu bekerja & profesional** (25–45 th) — mengutamakan bahan adem dan tampilan rapi tanpa banyak waktu bersiap.
- **Pecinta fashion hijab** — senang bereksperimen dengan gaya styling pasmina & segi empat.

### Analisis Pasar & Kompetitor
Kompetitor mencakup brand hijab nasional dengan katalog sangat luas, serta reseller/toko rumahan di media sosial dan marketplace umum (Shopee/Tokopedia) yang bersaing lewat harga. Diferensiasi Nat's Collection: fokus kategori yang jelas, konsistensi kualitas bahan, dan pengalaman belanja daring yang ringkas — detail lengkap ada di halaman [`about.html`](about.html).

### Strategi Manajemen Produk & Katalog
3 kategori inti (Bergo Instan, Pasmina, Segi Empat), masing-masing dengan deskripsi bahan, tag pencarian, rating, dan info stok — dikelola terpusat di [`js/data.js`](js/data.js) agar mudah ditambah/diedit tanpa menyentuh HTML.

### Model Bisnis & Revenue Stream
Model penjualan langsung (direct-to-consumer) + bundling warna senada lintas kategori + penjualan lewat media sosial/live shopping + program reseller/dropship.

### Strategi Harga, Promosi & Diskon
Harga flat per kategori agar transparan. Promosi berupa kode diskon (disimulasikan di keranjang: `NATSC10` = 10%, `HIJAB20` = 20%), gratis ongkir untuk belanja di atas Rp150.000, dan bundling warna senada.

### Proses Checkout & Simulasi Payment Gateway
Alur dua langkah (Keranjang → Checkout) dengan simulasi metode pembayaran bergaya **Midtrans**: **QRIS** (kode QR dinamis + hitung mundur) sebagai metode utama, ditambah Virtual Account (BCA/BNI/BRI/Mandiri), E-Wallet (GoPay/OVO/DANA/ShopeePay), dan Kartu Kredit/Debit — lengkap dengan validasi form. Pada produksi nyata, langkah ini digantikan Midtrans Snap API sungguhan.

### Rencana SEO, Keamanan & Pemeliharaan
- **SEO:** URL deskriptif, meta description unik per halaman, heading semantik, alt text gambar (nama & warna produk), konten gaya styling hijab untuk kata kunci long-tail.
- **Keamanan:** HTTPS wajib, validasi input dua sisi, sanitasi data, payment gateway pihak ketiga bersertifikasi PCI-DSS (data kartu tidak pernah disimpan sendiri).
- **Pemeliharaan:** audit performa & broken link bulanan, backup mingguan, update dependensi berkala.

### Rencana Penggunaan Data Analytics
Metrik GA4 (disimulasikan di [`js/analytics.js`](js/analytics.js)) — bounce rate, conversion rate, add-to-cart rate, cart abandonment, rata-rata nilai pesanan (AOV), kata kunci pencarian internal — ditinjau tiap dua minggu untuk keputusan stok warna, copywriting, retargeting, dan efektivitas promo/metode pembayaran.

*Dokumentasi bisnis lengkap dengan penjelasan naratif tersedia juga di halaman [`about.html`](about.html) pada website.*

---

## 2. Fitur Teknis

- ✅ **Responsive design** penuh (desktop / tablet / mobile) via `css/responsive.css`
- ✅ Navbar + hero banner
- ✅ Halaman katalog dengan 10 produk di 3 kategori, foto asli produk
- ✅ Detail produk via **modal** (dapat dibuka dari kartu produk di halaman mana pun)
- ✅ Keranjang belanja: tambah, ubah kuantitas, hapus, subtotal & total otomatis — tersimpan di **localStorage**
- ✅ Halaman checkout: form data pengiriman + simulasi payment gateway (QRIS dengan QR dinamis & timer) + validasi
- ✅ Footer lengkap (kategori, bantuan, newsletter, sosial media)
- ✅ Filter & pencarian produk (kategori, rentang harga, nama/tag, pengurutan)
- ✅ Mode gelap (dark mode) dengan preferensi tersimpan
- ✅ Smooth scroll + scroll-reveal animation ringan (menghormati `prefers-reduced-motion`)
- ✅ Integrasi Google Analytics (dummy `gtag`) dengan event kustom (`add_to_cart`, `purchase`, `search`, dll.) — lihat komentar di `js/analytics.js` untuk daftar metrik yang dipantau

---

## 3. Struktur Folder

```
nats-collection/
├── index.html          # Beranda
├── categories.html      # Katalog produk + filter/search
├── cart.html            # Keranjang belanja
├── checkout.html        # Checkout + simulasi payment (QRIS/VA/E-Wallet/Kartu)
├── about.html           # Business overview (versi web dari README)
├── README.md
├── css/
│   ├── style.css         # Token warna/tipografi, layout, komponen
│   ├── darkmode.css       # Override mode gelap
│   └── responsive.css     # Media queries
├── js/
│   ├── data.js            # Data kategori & produk (single source of truth)
│   ├── script.js           # Header/footer, cart logic, toast, util
│   ├── products.js         # Render kartu produk, modal detail, filter/search
│   ├── darkmode.js         # Toggle & persist mode gelap
│   └── analytics.js        # Simulasi GA4 + trackEvent()
└── images/               # Foto asli produk (bergo, pasmina, segi empat)
```

---

## 4. Menjalankan Secara Lokal

Karena situs ini murni statis, cukup buka `index.html` langsung di browser, **atau** jalankan local server sederhana agar path relatif dan fetch berjalan konsisten:

```bash
# Python 3
python3 -m http.server 8000

# atau Node.js
npx serve .
```

Lalu buka `http://localhost:8000`.

---

## 5. Deployment ke GitHub Pages

1. Buat repository baru di GitHub (privat/pribadi atau grup maks. 3 orang).
2. Push seluruh isi folder ini ke branch `main`:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: struktur project Nat's Collection"
   git branch -M main
   git remote add origin https://github.com/<username>/<nama-repo>.git
   git push -u origin main
   ```
3. Buat commit-commit bermakna secara bertahap (lihat contoh riwayat commit yang disarankan di bawah) — minimal 8–10 commit.
4. Di GitHub: **Settings → Pages → Source: Deploy from a branch → Branch: `main` / `root`** → Save.
5. Tunggu beberapa menit, lalu akses situs di:
   (https://najwatalithasabriyyah-sys.github.io/tugas-besar-kait/)
7. Tempel URL live tersebut di bagian atas README ini.

### Contoh riwayat commit yang disarankan
```
1. Initial commit: struktur project & index.html
2. Tambah token desain & style.css dasar
3. Tambah dark mode & responsive.css
4. Tambah data produk & kategori (data.js)
5. Implementasi header/footer & cart logic (script.js)
6. Tambah kartu produk, modal detail & filter (products.js)
7. Bangun halaman katalog dengan filter & search
8. Bangun halaman keranjang belanja
9. Bangun halaman checkout & simulasi payment gateway (QRIS/VA/E-Wallet/Kartu)
10. Tambah halaman about & integrasi analytics dummy
11. Polish responsive & aksesibilitas, tulis README
```

---

## 6. Rencana Pengembangan Lanjutan

- Integrasi backend nyata (autentikasi pengguna, database produk, riwayat pesanan)
- Integrasi payment gateway sungguhan (Midtrans Snap API / Xendit)
- Galeri multi-gambar & video singkat per produk (cara styling)
- Sistem ulasan & rating dari pembeli terverifikasi
- Dashboard admin untuk mengelola stok & melihat analitik penjualan
