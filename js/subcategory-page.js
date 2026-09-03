// ==========================================================
// subcategory-page.js
// Drives subcategory.html — ONE common page reused for every
// subcategory of every category on the site.
//
// URL shape:  subcategory.html?cat=<category-slug>&sub=<subcategory-id>
//
// Shows a grid of "subpart" cards (the finer groupings inside a
// subcategory, e.g. "Steel Fixings", "Standard Fixings"...).
// Clicking a card goes to subpart.html to show that subpart's
// product table.
//
// Subcategories that have no further grouping (a flat `products`
// array) get a single synthetic "General" card instead, so the
// page works the same way for every subcategory without special
// casing anywhere else on the site.
//
// Relies on CATEGORY_REGISTRY / helpers from category-registry.js,
// which must be loaded before this file.
// ==========================================================

const SUBPART_PAGE = "subpart.html";

let allSubparts = [];

function getURLParams() {
  const params = new URLSearchParams(window.location.search);
  return { catSlug: params.get("cat"), subId: params.get("sub") };
}

async function loadSubcategoryData() {
  const { catSlug, subId } = getURLParams();

  if (!catSlug || !subId || !CATEGORY_REGISTRY[catSlug]) {
    showNotFound("This product family link looks incomplete or invalid.");
    return;
  }

  try {
    const { config, data } = await fetchCategoryData(catSlug);
    const subcat = findSubcategory(data, subId);

    if (!subcat) {
      showNotFound("This product family could not be found in " + escapeHTML(data.category_name) + ".");
      return;
    }

    // Breadcrumb
    document.getElementById("breadcrumb-cat-link").textContent = data.category_name;
    document.getElementById("breadcrumb-cat-link").href = `${catSlug}.html`;
    document.getElementById("breadcrumb-sub-name").textContent = subcat.name;

    // Title / description
    document.getElementById("subcat-title").textContent = subcat.name;
    document.getElementById("subcat-description").textContent =
      `Explore the product ranges within ${subcat.name}.`;
    document.title = `${subcat.name} | Ahuja Infracore`;
    const titleTag = document.getElementById("page-title-tag");
    if (titleTag) titleTag.textContent = `${subcat.name} | Ahuja Infracore`;

    allSubparts = getSubparts(subcat).map(part => ({ ...part, catSlug, subId }));
    renderGrid(allSubparts);
    updateCount(allSubparts.length, allSubparts.length);

  } catch (err) {
    console.error(err);
    showNotFound("Could not load product data. Please try again later.");
  }
}

function showNotFound(message) {
  document.getElementById("subcat-title").textContent = "Not Found";
  const grid = document.getElementById("subcat-grid");
  const noResults = document.getElementById("no-results");
  grid.innerHTML = "";
  noResults.textContent = message;
  noResults.style.display = "block";
}

function renderGrid(subparts) {
  const grid = document.getElementById("subcat-grid");
  const noResults = document.getElementById("no-results");

  if (subparts.length === 0) {
    grid.innerHTML = "";
    noResults.style.display = "block";
    return;
  }
  noResults.style.display = "none";
  grid.innerHTML = subparts.map(part => {
    const count = part.products.length;
    const href = `assets/products_new/product-sheets/${part.catSlug}/${part.subId}/${toFileName(part.name)}.pdf`;
    const iconHtml = part.image
      ? `<div class="subcat-card-icon subcat-card-icon-img">
          <img src="${part.image}" alt="${escapeHTML(part.name)}" loading="lazy"
               onerror="this.parentElement.classList.remove('subcat-card-icon-img'); this.remove();" />
        </div>`
      : `<div class="subcat-card-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
            <rect x="3" y="3" width="7" height="7" rx="1.2"/>
            <rect x="14" y="3" width="7" height="7" rx="1.2"/>
            <rect x="3" y="14" width="7" height="7" rx="1.2"/>
            <rect x="14" y="14" width="7" height="7" rx="1.2"/>
          </svg>
        </div>`;
    return `
      <a class="subcat-card" href="${href}">
        ${iconHtml}
        <div>
          <h3>${escapeHTML(part.name)}</h3>
          <p class="subcat-product-count">${count} product${count === 1 ? "" : "s"}</p>
        </div>
        <span class="subcat-view-link">View Products &rarr;</span>
      </a>
    `;
  }).join("");
}

function updateCount(shown, total) {
  const el = document.getElementById("subcat-count");
  el.textContent = shown === total
    ? `${total} product part${total === 1 ? "" : "s"}`
    : `Showing ${shown} of ${total} product parts`;
}

// ---------------- Search / Filter ----------------
function setupSearch() {
  const input = document.getElementById("subcat-search-input");
  if (!input) return;
  input.addEventListener("input", () => {
    const term = input.value.trim().toLowerCase();
    const filtered = term === ""
      ? allSubparts
      : allSubparts.filter(p => p.name.toLowerCase().includes(term));

    renderGrid(filtered);
    updateCount(filtered.length, allSubparts.length);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadSubcategoryData();
  setupSearch();
});