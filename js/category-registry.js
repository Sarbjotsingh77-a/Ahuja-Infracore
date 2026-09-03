// ==========================================================
// category-registry.js
// Single source of truth for every category on the site.
// Used by category-page.js, subcategory-page.js and subpart-page.js
// so all three page types stay in sync automatically.
//
// TO ADD A NEW CATEGORY IN THE FUTURE:
//   Add one entry below (copy an existing one, change the key —
//   this becomes the "cat=" slug used in every URL on the site —
//   and update its 4 values). No other file needs to change.
// ==========================================================

const CATEGORY_REGISTRY = {
  "construction-shuttering": {
    jsonPath: "src/_data/construction_shuttering.json",
    imageFolder: "construction, shuttering & scaffolding",
    fallbackTitle: "Construction, Shuttering & Scaffolding",
  },
  "construction-chemicals": {
    jsonPath: "src/_data/construction_chemicals.json",
    imageFolder: "construction chemicals & waterproofing",
    fallbackTitle: "Construction Chemicals & Waterproofing",
  },
  "welding-consumables": {
    jsonPath: "src/_data/welding_consumables.json",
    imageFolder: "welding, cutting & industrial consumables",
    fallbackTitle: "Welding, Cutting & Industrial Consumables",
  },
  "safety-ppe": {
    jsonPath: "src/_data/safety_ppe.json",
    imageFolder: "safety, ppe & road safety",
    fallbackTitle: "Safety, PPE & Road Safety",
  },
  "power-hand-tools": {
    jsonPath: "src/_data/power_hand_tools.json",
    imageFolder: "power tools, hand tools & measuring",
    fallbackTitle: "Power Tools, Hand Tools & Measuring",
  },
  // Add future categories here, e.g.:
  // "new-category-slug": {
  //   jsonPath: "src/_data/new_category.json",
  //   imageFolder: "new category folder name",
  //   fallbackTitle: "New Category Display Name",
  // },
};

// Sentinel id used for the single "General" subpart card on
// subcategories that have no further grouping (flat `products` array).
const GENERAL_GROUP_ID = "general";

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str == null ? "" : str;
  return div.innerHTML;
}

function toFileName(name) {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")   // strip punctuation like / & ( )
    .trim()
    .replace(/[\s-]+/g, "_");   // spaces AND hyphens -> underscores
}

async function fetchCategoryData(catSlug) {
  const config = CATEGORY_REGISTRY[catSlug];
  if (!config) return { config: null, data: null };
  const res = await fetch(config.jsonPath);
  if (!res.ok) throw new Error(`Failed to load ${config.jsonPath} (${res.status})`);
  const data = await res.json();
  return { config, data };
}

function findSubcategory(data, subId) {
  return (data.subcategories || []).find(s => s.id === subId) || null;
}

// Normalizes a subcategory into a list of "subparts" (groups) regardless
// of whether it uses the new `groups` structure or the older flat
// `products` array. Flat subcategories get one synthetic "General" part.
function getSubparts(subcat) {
  if (Array.isArray(subcat.groups) && subcat.groups.length) {
    return subcat.groups.map(g => ({
      id: g.id,
      name: g.name,
      image: g.image || null,
      products: g.products || [],
    }));
  }
  return [{
    id: GENERAL_GROUP_ID,
    name: "General",
    image: subcat.image || null,
    products: subcat.products || [],
  }];
}

function getSubpart(subcat, groupId) {
  return getSubparts(subcat).find(g => g.id === groupId) || null;
}