// ==========================================================================
// AHUJA INFRACORE — Brands page: load a brand's products from its JSON file
// Expects one JSON file per brand at: src/brands_data/<data-json>.json
//
// Supported JSON shapes (either works):
//   [ { "name": "...", "image": "..." }, ... ]
//   { "products": [ { "name": "...", "image": "..." }, ... ] }
//
// Each product object can use any of these keys:
//   name  -> name | title | product_name
//   image -> image | img | photo | src
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const DATA_PATH = 'src/brands_data/';

  const grid = document.getElementById('brandGrid');
  const productsSection = document.getElementById('brandProducts');
  const productsTitle = document.getElementById('brandProductsTitle');
  const productsGrid = document.getElementById('brandProductsGrid');
  const closeBtn = document.getElementById('brandProductsClose');

  if (!grid || !productsSection || !productsGrid) return;

  const cache = new Map();

  function normalizeList(data) {
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.products)) return data.products;
    return [];
  }

  function pick(obj, keys, fallback) {
    for (const k of keys) {
      if (obj && obj[k]) return obj[k];
    }
    return fallback;
  }

  function renderProducts(brandName, products) {
    productsTitle.textContent = `${brandName} — Products`;

    if (!products.length) {
      productsGrid.innerHTML = `<p class="brand-products-empty">No products found for ${brandName} yet.</p>`;
    } else {
      productsGrid.innerHTML = products.map(p => {
        const name = pick(p, ['name', 'title', 'product_name'], 'Product');
        const image = pick(p, ['image', 'img', 'photo', 'src'], '');
        return `
          <div class="product-card">
            <div class="product-image-box">
              ${image ? `<img src="${image}" alt="${name}" loading="lazy">` : `<span class="product-image-placeholder">No Image</span>`}
            </div>
            <span class="product-name">${name}</span>
          </div>
        `;
      }).join('');
    }

    productsSection.hidden = false;
    productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function loadBrand(card) {
    const brandName = card.dataset.brand;
    const jsonFile = card.dataset.json;
    if (!jsonFile) return;

    grid.querySelectorAll('.brand-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');

    productsSection.hidden = false;
    productsTitle.textContent = `${brandName} — Loading…`;
    productsGrid.innerHTML = `<p class="brand-products-loading">Loading products…</p>`;
    productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (cache.has(jsonFile)) {
      renderProducts(brandName, cache.get(jsonFile));
      return;
    }

    try {
      const res = await fetch(`${DATA_PATH}${jsonFile}`);
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const data = await res.json();
      const products = normalizeList(data);
      cache.set(jsonFile, products);
      renderProducts(brandName, products);
    } catch (err) {
      productsTitle.textContent = `${brandName} — Products`;
      productsGrid.innerHTML = `<p class="brand-products-empty">Couldn't load products for ${brandName} right now.</p>`;
      console.error('Failed to load brand JSON:', jsonFile, err);
    }
  }

  grid.querySelectorAll('.brand-card').forEach(card => {
    card.addEventListener('click', () => loadBrand(card));
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      productsSection.hidden = true;
      grid.querySelectorAll('.brand-card').forEach(c => c.classList.remove('active'));
    });
  }
});