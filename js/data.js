/* ============================================================
   Nat's Collection — Data Store
   Semua data kategori & produk didefinisikan di sini agar mudah
   dipelihara. Di produksi nyata, data ini akan datang dari API/CMS.
   ============================================================ */

const CATEGORIES = [
  { slug: "bergo",     name: "Bergo Instan",  blurb: "Hijab instan siap pakai, praktis untuk aktivitas harian" },
  { slug: "pasmina",   name: "Pasmina",       blurb: "Pasmina crinkle lembut jatuh, elegan untuk acara formal" },
  { slug: "segiempat", name: "Segi Empat",    blurb: "Hijab segi empat serbaguna dengan banyak gaya styling" },
];

const CAT_ACCENT = {
  bergo:     "#C08874",
  pasmina:   "#8A6F5C",
  segiempat: "#4F6472",
};

/* Setiap produk memakai foto asli (lihat folder images/) yang
   dirender via renderProductCard() di js/products.js. */
const PRODUCTS = [
  { id: "p01", name: "Bergo Instan Ice Pink", category: "bergo", price: 89000, rating: 4.8, stock: 24, origin: "Bandung", img: "images/bergo-ice-pink.png", tags: ["bergo","jersey","daily"], desc: "Bergo instan dua lapis berbahan jersey premium adem dan tidak menerawang, dilengkapi bros mutiara di sisi kanan. Praktis dipakai langsung tanpa peniti tambahan, cocok untuk aktivitas harian maupun kuliah/kerja." },
  { id: "p02", name: "Bergo Instan Coklat Tua", category: "bergo", price: 89000, rating: 4.7, stock: 19, origin: "Bandung", img: "images/bergo-coklat.png", tags: ["bergo","jersey","earth tone"], desc: "Warna coklat tua earth tone yang serbaguna, dipadukan dengan bahan jersey premium yang jatuh rapi dan menutup dada sempurna. Dilengkapi aksen jahitan pada bagian ciput dan bros mutiara." },
  { id: "p03", name: "Bergo Instan Cream", category: "bergo", price: 89000, rating: 4.9, stock: 27, origin: "Bandung", img: "images/bergo-cream.png", tags: ["bergo","jersey","netral"], desc: "Warna cream netral yang mudah dipadupadankan dengan busana apa pun. Bahan jersey premium dua lapis, adem dipakai seharian, dengan bros mutiara sebagai aksen manis." },
  { id: "p04", name: "Bergo Instan Putih", category: "bergo", price: 89000, rating: 4.8, stock: 30, origin: "Bandung", img: "images/bergo-putih.png", tags: ["bergo","jersey","putih"], desc: "Warna putih bersih untuk tampilan segar, cocok untuk seragam sekolah maupun acara formal. Bahan jersey premium tidak mudah kusut dan nyaman di kulit." },
  { id: "p05", name: "Pasmina Crinkle Abu", category: "pasmina", price: 68000, rating: 4.7, stock: 22, origin: "Bandung", img: "images/pasmina-abu.png", tags: ["pasmina","crinkle","rumbai"], desc: "Pasmina crinkle bertekstur bergelombang alami dengan finishing rumbai (fringe) di kedua ujung. Bahan ringan dan jatuh lembut, mudah dibentuk berbagai gaya hijab." },
  { id: "p06", name: "Pasmina Crinkle Burgundy", category: "pasmina", price: 68000, rating: 4.8, stock: 18, origin: "Bandung", img: "images/pasmina-burgundy.png", tags: ["pasmina","crinkle","rumbai"], desc: "Warna burgundy elegan yang cocok untuk acara semi-formal maupun harian. Tekstur crinkle premium memberi kesan mewah tanpa perlu disetrika berulang." },
  { id: "p07", name: "Pasmina Crinkle Hitam", category: "pasmina", price: 68000, rating: 4.9, stock: 25, origin: "Bandung", img: "images/pasmina-hitam.png", tags: ["pasmina","crinkle","basic"], desc: "Warna hitam basic wajib punya, mudah dipadukan dengan warna busana apa pun. Bahan crinkle premium yang tidak panas dan jatuhnya rapi." },
  { id: "p08", name: "Segi Empat Coklat Susu", category: "segiempat", price: 55000, rating: 4.7, stock: 32, origin: "Bandung", img: "images/segiempat-coklat-susu.png", tags: ["segiempat","crinkle","rumbai"], desc: "Hijab segi empat bahan crinkle dengan rumbai halus di setiap sisi, warna coklat susu yang hangat dan lembut di mata. Serbaguna untuk gaya syar'i maupun kasual sehari-hari." },
  { id: "p09", name: "Segi Empat Ice Blue", category: "segiempat", price: 55000, rating: 4.6, stock: 28, origin: "Bandung", img: "images/segiempat-ice-blue.png", tags: ["segiempat","crinkle","pastel"], desc: "Warna ice blue pastel yang menyegarkan, dengan tekstur crinkle ringan dan rumbai rapi di tepinya. Cocok untuk tampilan playful namun tetap sopan." },
  { id: "p10", name: "Segi Empat Navy", category: "segiempat", price: 55000, rating: 4.8, stock: 26, origin: "Bandung", img: "images/segiempat-navy.png", tags: ["segiempat","crinkle","navy"], desc: "Warna navy tegas dan elegan, favorit untuk seragam kantor maupun acara resmi. Bahan crinkle premium dengan rumbai rapi di keempat sisi." },
];

/* Kurs & format harga */
function formatIDR(n) {
  return "Rp" + n.toLocaleString("id-ID");
}

function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}
