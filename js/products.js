/* ============================================================
   Nat's Collection — Produk
   Render kartu produk, modal detail produk, serta filter & search
   yang dipakai di index.html dan categories.html.
   ============================================================ */

function renderProductCard(p) {
  return `
    <article class="product-card" data-id="${p.id}">
      <div class="product-thumb" data-open="${p.id}">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
      </div>
      <div class="product-body">
        <span class="product-cat">${categoryName(p.category)}</span>
        <h3 class="product-name" data-open="${p.id}">${p.name}</h3>
        <div class="product-meta">
          <span class="rating">★ ${p.rating.toFixed(1)}</span>
          <span>· ${p.origin}</span>
        </div>
        <div class="product-price">${formatIDR(p.price)}</div>
        <div class="product-actions">
          <button class="btn btn-primary btn-sm btn-block" data-add="${p.id}">+ Keranjang</button>
        </div>
      </div>
    </article>`;
}

function categoryName(slug) {
  const c = CATEGORIES.find(c => c.slug === slug);
  return c ? c.name : slug;
}

function bindProductCardEvents(container = document) {
  container.querySelectorAll("[data-add]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      addToCart(btn.dataset.add, 1);
    });
  });
  container.querySelectorAll("[data-open]").forEach(el => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      openProductModal(el.dataset.open);
    });
  });
}

/* ---------------- Product detail modal ---------------- */
function ensureModalRoot() {
  let root = document.getElementById("product-modal-root");
  if (!root) {
    root = document.createElement("div");
    root.id = "product-modal-root";
    document.body.appendChild(root);
  }
  return root;
}

function openProductModal(id) {
  const p = getProductById(id);
  if (!p) return;
  trackEvent("ecommerce", "view_item", p.name);
  const root = ensureModalRoot();
  root.innerHTML = `
    <div class="modal-overlay open" id="product-modal-overlay">
      <div class="modal" role="dialog" aria-modal="true" aria-label="${p.name}">
        <button class="modal-close" id="modal-close" aria-label="Tutup">✕</button>
        <div class="modal-grid">
          <div class="modal-visual"><img src="${p.img}" alt="${p.name}"></div>
          <div class="modal-info">
            <span class="product-cat">${categoryName(p.category)} · ${p.origin}</span>
            <h2 style="margin-bottom:4px">${p.name}</h2>
            <div class="product-meta"><span class="rating">★ ${p.rating.toFixed(1)}</span><span>· Stok ${p.stock}</span></div>
            <div class="product-price" style="font-size:1.4rem">${formatIDR(p.price)}</div>
            <p class="muted">${p.desc}</p>
            <div class="tag-row">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
            <div class="qty-row">
              <div class="qty-control">
                <button type="button" id="modal-qty-minus">−</button>
                <input type="number" id="modal-qty" value="1" min="1" max="${p.stock}" readonly>
                <button type="button" id="modal-qty-plus">+</button>
              </div>
              <span class="muted" style="font-size:.85rem">Maks. ${p.stock} pcs</span>
            </div>
            <button class="btn btn-primary btn-block" id="modal-add-cart">Tambah ke Keranjang</button>
            <a href="cart.html" class="btn btn-ghost btn-block">Lihat Keranjang</a>
          </div>
        </div>
      </div>
    </div>`;

  const overlay = document.getElementById("product-modal-overlay");
  const qtyInput = document.getElementById("modal-qty");
  document.getElementById("modal-qty-minus").addEventListener("click", () => {
    qtyInput.value = Math.max(1, parseInt(qtyInput.value) - 1);
  });
  document.getElementById("modal-qty-plus").addEventListener("click", () => {
    qtyInput.value = Math.min(p.stock, parseInt(qtyInput.value) + 1);
  });
  document.getElementById("modal-add-cart").addEventListener("click", () => {
    addToCart(p.id, parseInt(qtyInput.value) || 1);
    closeProductModal();
  });
  document.getElementById("modal-close").addEventListener("click", closeProductModal);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeProductModal(); });
  document.addEventListener("keydown", escCloseModal);
}

function escCloseModal(e) {
  if (e.key === "Escape") closeProductModal();
}

function closeProductModal() {
  const overlay = document.getElementById("product-modal-overlay");
  if (overlay) overlay.classList.remove("open");
  document.removeEventListener("keydown", escCloseModal);
}

/* ---------------- Catalog: filter, search, sort ---------------- */
function initCatalogPage() {
  const grid = document.getElementById("catalog-grid");
  if (!grid) return;

  const params = new URLSearchParams(window.location.search);
  const state = {
    q: params.get("q") || "",
    cats: params.get("cat") ? [params.get("cat")] : [],
    min: 0,
    max: 2000000,
    sort: "popular",
  };

  const catList = document.getElementById("cat-filter-list");
  catList.innerHTML = CATEGORIES.map(c => `
    <label class="filter-check">
      <input type="checkbox" value="${c.slug}" ${state.cats.includes(c.slug) ? "checked" : ""}>
      ${c.name}
    </label>`).join("");

  const searchInput = document.getElementById("catalog-search-input");
  searchInput.value = state.q;
  const minInput = document.getElementById("price-min");
  const maxInput = document.getElementById("price-max");
  const sortSelect = document.getElementById("sort-select");
  const resultCount = document.getElementById("result-count");

  function readState() {
    state.cats = [...catList.querySelectorAll("input:checked")].map(i => i.value);
    state.q = searchInput.value.trim().toLowerCase();
    state.min = minInput.value ? Number(minInput.value) : 0;
    state.max = maxInput.value ? Number(maxInput.value) : Infinity;
    state.sort = sortSelect.value;
  }

  function applyFilters() {
    readState();
    let list = PRODUCTS.filter(p => {
      const matchesCat = state.cats.length === 0 || state.cats.includes(p.category);
      const matchesQ = !state.q || p.name.toLowerCase().includes(state.q) || p.tags.some(t => t.includes(state.q));
      const matchesPrice = p.price >= state.min && p.price <= state.max;
      return matchesCat && matchesQ && matchesPrice;
    });

    if (state.sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (state.sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (state.sort === "rating") list.sort((a, b) => b.rating - a.rating);
    else list.sort((a, b) => b.rating - a.rating);

    resultCount.textContent = `${list.length} produk ditemukan`;
    grid.innerHTML = list.length
      ? list.map(renderProductCard).join("")
      : `<div class="empty-state"><h3>Tidak ada produk cocok</h3><p>Coba ubah kata kunci atau filter Anda.</p></div>`;
    bindProductCardEvents(grid);
    trackEvent("catalog", "filter_applied", JSON.stringify({ q: state.q, cats: state.cats, sort: state.sort }));
  }

  catList.addEventListener("change", applyFilters);
  sortSelect.addEventListener("change", applyFilters);
  minInput.addEventListener("input", debounce(applyFilters, 300));
  maxInput.addEventListener("input", debounce(applyFilters, 300));
  searchInput.addEventListener("input", debounce(applyFilters, 250));

  applyFilters();
}

function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

document.addEventListener("DOMContentLoaded", initCatalogPage);
