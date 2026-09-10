// ==========================================================
// category-page.js
// Shared logic for ALL category grid pages (Construction Shuttering,
// Construction Chemicals, Welding Consumables, Safety PPE,
// Power & Hand Tools, and any future category page).
//
// Relies on CATEGORY_REGISTRY / escapeHTML / toFileName from
// category-registry.js, which must be loaded first.
// ==========================================================

// Where a subcategory card links to (subparts listing page).
const FAMILY_PAGE = "subcategory.html";

let allSubcategories = [];
let CURRENT_CAT_SLUG = null;
let CURRENT_CONFIG = null;

function getCategorySlug() {
  // Preferred: <body data-category="...">
  const bodySlug = document.body && document.body.dataset && document.body.dataset.category;
  if (bodySlug && CATEGORY_REGISTRY[bodySlug]) return bodySlug;

  // Fallback: derive from the current HTML filename, e.g.
  // "construction-shuttering.html" -> "construction-shuttering"
  const path = window.location.pathname.split("/").pop() || "";
  const fromFile = path.replace(/\.html?$/i, "");
  if (CATEGORY_REGISTRY[fromFile]) return fromFile;

  return null;
}

async function loadCategoryData() {
  CURRENT_CAT_SLUG = getCategorySlug();
  CURRENT_CONFIG = CATEGORY_REGISTRY[CURRENT_CAT_SLUG];

  if (!CURRENT_CONFIG) {
    console.error("category-page.js: could not resolve a category for this page.");
    const grid = document.getElementById("subcat-grid");
    if (grid) {
      grid.innerHTML = `<p class="no-results">This page isn't linked to a known category. Add it to CATEGORY_REGISTRY in category-page.js.</p>`;
    }
    return;
  }

  try {
    const res = await fetch(CURRENT_CONFIG.jsonPath);
    if (!res.ok) throw new Error(`Failed to load ${CURRENT_CONFIG.jsonPath} (${res.status})`);
    const data = await res.json();

    // Hero (title + description now render inside the hero banner itself)
    document.getElementById("category-title").textContent = data.category_name;
    document.getElementById("category-description").textContent = data.description || "";
    document.title = `${data.category_name} | Ahuja Infracore`;

    allSubcategories = data.subcategories || [];
    renderGrid(allSubcategories);
    updateCount(allSubcategories.length, allSubcategories.length);

  } catch (err) {
    console.error(err);
    document.getElementById("category-title").textContent = CURRENT_CONFIG.fallbackTitle;
    document.getElementById("subcat-grid").innerHTML =
      `<p class="no-results">Could not load product data. Check that ${CURRENT_CONFIG.jsonPath} exists and you're viewing this via a local server.</p>`;
  }
}

// A subcategory's product count works whether it's still flat
// ({ products: [...] }) or has been grouped ({ groups: [{ products: [...] }] }).
function getProductCount(subcat) {
  if (Array.isArray(subcat.groups)) {
    return subcat.groups.reduce((sum, g) => sum + (g.products ? g.products.length : 0), 0);
  }
  return subcat.products ? subcat.products.length : 0;
}

function renderGrid(subcategories) {
  const grid = document.getElementById("subcat-grid");
  const noResults = document.getElementById("no-results");

  if (subcategories.length === 0) {
    grid.innerHTML = "";
    noResults.style.display = "block";
    return;
  }
  noResults.style.display = "none";

  grid.innerHTML = subcategories.map(subcat => {
    const productCount = getProductCount(subcat);
    return `
      <a class="subcat-card" href="${FAMILY_PAGE}?cat=${encodeURIComponent(CURRENT_CAT_SLUG)}&sub=${encodeURIComponent(subcat.id)}">
        <div class="subcat-card-img">
          <img
            src="assets/products_new/category/${CURRENT_CONFIG.imageFolder}/${toFileName(subcat.name)}.png"
            alt="${escapeHTML(subcat.name)}"
            onerror="console.error('Image failed:', this.src); this.parentElement.innerHTML = '<div style=\\'font-size:10px;padding:8px;color:#b00;word-break:break-all;\\'>Missing: ' + this.src + '</div>'; this.onerror=null;"
          />
        </div>
        <div>
          <h3>${escapeHTML(subcat.name)}</h3>
          <p class="subcat-product-count">${productCount} product${productCount === 1 ? "" : "s"}</p>
        </div>
        <span class="subcat-view-link">View Products &rarr;</span>
      </a>
    `;
  }).join("");
}

function updateCount(shown, total) {
  const el = document.getElementById("subcat-count");
  el.textContent = shown === total
    ? `${total} product families`
    : `Showing ${shown} of ${total} product families`;
}

// ---------------- Search / Filter ----------------
function setupSearch() {
  const input = document.getElementById("subcat-search-input");
  if (!input) return;
  input.addEventListener("input", () => {
    const term = input.value.trim().toLowerCase();
    const filtered = term === ""
      ? allSubcategories
      : allSubcategories.filter(s => s.name.toLowerCase().includes(term));

    renderGrid(filtered);
    updateCount(filtered.length, allSubcategories.length);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadCategoryData();
  setupSearch();
});