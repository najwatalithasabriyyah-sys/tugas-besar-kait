/* ============================================================
   Nat's Collection — Core Script
   Header/footer templating, keranjang belanja (localStorage),
   notifikasi toast, dan util umum yang dipakai lintas halaman.
   ============================================================ */

const CART_KEY = "nc_cart";

/* ---------------- Cart (localStorage) ---------------- */
function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(id, qty = 1) {
  const cart = getCart();
  const existing = cart.find(i => i.id === id);
  const product = getProductById(id);
  if (!product) return;
  const maxQty = product.stock;
  if (existing) {
    existing.qty = Math.min(existing.qty + qty, maxQty);
  } else {
    cart.push({ id, qty: Math.min(qty, maxQty) });
  }
  saveCart(cart);
  trackEvent("ecommerce", "add_to_cart", product.name);
  showToast(`${product.name} ditambahkan ke keranjang`);
}

function updateCartQty(id, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  const product = getProductById(id);
  item.qty = Math.max(1, Math.min(qty, product ? product.stock : 99));
  saveCart(cart);
}

function removeFromCart(id) {
  const cart = getCart().filter(i => i.id !== id);
  saveCart(cart);
  trackEvent("ecommerce", "remove_from_cart", id);
  showToast("Produk dihapus dari keranjang");
}

function cartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}

function cartSubtotal() {
  return getCart().reduce((sum, i) => {
    const p = getProductById(i.id);
    return p ? sum + p.price * i.qty : sum;
  }, 0);
}

function updateCartBadge() {
  document.querySelectorAll(".cart-badge").forEach(el => {
    const count = cartCount();
    el.textContent = count;
    el.style.display = count > 0 ? "flex" : "none";
  });
}

/* ---------------- Toast ---------------- */
let toastTimer;
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

/* ---------------- Header / Footer templates ---------------- */
function renderHeader(activePage) {
  const header = document.getElementById("site-header");
  if (!header) return;
  header.innerHTML = `
    <nav class="nav">
      <div class="nav-inner">
        <a href="index.html" class="brand"><span class="brand-mark"></span> Nat's Collection</a>
        <ul class="nav-links" id="nav-links">
          <li><a href="index.html" class="${activePage === "index.html" ? "active" : ""}">Beranda</a></li>
          <li><a href="categories.html" class="${activePage === "categories.html" ? "active" : ""}">Katalog</a></li>
          <li><a href="about.html" class="${activePage === "about.html" ? "active" : ""}">Tentang Kami</a></li>
        </ul>
        <div class="nav-search">
          <span aria-hidden="true">🔍</span>
          <input type="search" id="global-search" placeholder="Cari bergo, pasmina, segi empat..." aria-label="Cari produk">
        </div>
        <div class="nav-actions">
          <button class="icon-btn" id="dark-toggle" aria-label="Ganti mode gelap/terang">
            <span class="dm-icon-moon">🌙</span><span class="dm-icon-sun">☀️</span>
          </button>
          <a href="cart.html" class="icon-btn" aria-label="Keranjang belanja">
            🛍️<span class="cart-badge" id="cart-badge">0</span>
          </a>
          <button class="nav-toggle" id="nav-toggle" aria-label="Buka menu" aria-expanded="false">☰</button>
        </div>
      </div>
    </nav>`;

  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");
  toggle?.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });

  const searchInput = document.getElementById("global-search");
  searchInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && searchInput.value.trim()) {
      trackEvent("search", "global_search", searchInput.value.trim());
      window.location.href = `categories.html?q=${encodeURIComponent(searchInput.value.trim())}`;
    }
  });

  updateCartBadge();
}

function renderFooter() {
  const footer = document.getElementById("site-footer");
  if (!footer) return;
  const catLinks = CATEGORIES.map(c => `<li><a href="categories.html?cat=${c.slug}">${c.name}</a></li>`).join("");
  footer.innerHTML = `
    <div class="container footer-grid">
      <div class="footer-brand">
        <a href="index.html" class="brand" style="color:#EDE7D8"><span class="brand-mark"></span> Nat's Collection</a>
        <p>Hijab premium berkualitas untuk gaya harian hingga acara spesial — nyaman dipakai, elegan dipandang.</p>
        <div class="footer-social">
          <a href="#" aria-label="Instagram">IG</a>
          <a href="#" aria-label="Facebook">FB</a>
          <a href="#" aria-label="TikTok">TT</a>
        </div>
      </div>
      <div>
        <h4>Kategori</h4>
        <ul>${catLinks}</ul>
      </div>
      <div>
        <h4>Bantuan</h4>
        <ul>
          <li><a href="cart.html">Keranjang Saya</a></li>
          <li><a href="checkout.html">Checkout</a></li>
          <li><a href="about.html">Tentang Kami</a></li>
          <li><a href="#">Kebijakan Pengiriman</a></li>
          <li><a href="#">Retur & Penukaran</a></li>
        </ul>
      </div>
      <div>
        <h4>Info Terbaru</h4>
        <p style="color:#C9C2AD;font-size:.88rem">Dapatkan info koleksi baru & promo mingguan.</p>
        <form class="newsletter-form" id="newsletter-form">
          <input type="email" required placeholder="Email Anda" aria-label="Email untuk newsletter">
          <button type="submit" class="btn btn-primary btn-sm">Ikut</button>
        </form>
      </div>
    </div>
    <div class="container footer-bottom">
      <span>&copy; ${new Date().getFullYear()} Nat's Collection. Semua hak dilindungi.</span>
      <span>Dibuat dengan cinta untuk hijabers Indonesia 🇮🇩</span>
    </div>`;

  document.getElementById("newsletter-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    trackEvent("engagement", "newsletter_signup", "footer");
    showToast("Terima kasih! Anda telah berlangganan.");
    e.target.reset();
  });
}

/* ---------------- Simple scroll-reveal animation ---------------- */
function initScrollReveal() {
  const items = document.querySelectorAll(".product-card, .cat-card");
  if (!("IntersectionObserver" in window) || items.length === 0) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "kn-fade-up .5s ease both";
        io.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  items.forEach(el => io.observe(el));
}

const style = document.createElement("style");
style.textContent = `@keyframes kn-fade-up{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}`;
document.head.appendChild(style);

document.addEventListener("DOMContentLoaded", initScrollReveal);
