/**
 * update-images.js  (v2 — handles nested JSON, not just flat product arrays)
 *
 * Rewrites EVERY "image" field it finds anywhere inside your JSON files
 * — no matter how deeply nested — from a local "assets/..." path to a
 * Google Drive URL.
 *
 * Covers both shapes in your project:
 *   src/brands_data/*.json  -> flat: { products: [ { image }, ... ] }
 *   src/_data/*.json        -> nested: { subcategories: [ { image, groups: [ { image, products } ] } ] }
 *
 * Usage:
 *   1. Put drive-image-map.json (from generate-drive-map.gs) next to
 *      this script.
 *   2. node update-images.js
 *   3. Check console for "NO MATCH" warnings.
 *   4. JSON files are updated in place; a .bak of each original is kept.
 */

const fs = require('fs');
const path = require('path');

// ---- CONFIG ----------------------------------------------------------
const PROJECT_ROOT = path.join(__dirname, 'ahuja-infracore'); // adjust if needed
const JSON_DIRS = [
  path.join(PROJECT_ROOT, 'src', 'brands_data'),
  path.join(PROJECT_ROOT, 'src', '_data'),
];
const DRIVE_MAP_PATH = path.join(__dirname, 'drive-image-map.json');

function toDriveUrl(fileId) {
  return `https://lh3.googleusercontent.com/d/${fileId}=w1000`;
  // Alternative: return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
}
// ------------------------------------------------------------------

function loadDriveMap() {
  if (!fs.existsSync(DRIVE_MAP_PATH)) {
    console.error(`Missing ${DRIVE_MAP_PATH}. Run the Apps Script first and download drive-image-map.json here.`);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(DRIVE_MAP_PATH, 'utf8'));
}

function normalizePath(imagePath) {
  return imagePath.replace(/^\.?\/?assets\//, '');
}

// Walks ANY JSON structure — arrays, nested objects, whatever — and
// rewrites every "image" key it finds along the way. This is what
// makes it safe for both the flat brands_data shape and the deeply
// nested _data shape without needing to know the shape in advance.
function walkAndRewrite(node, driveMap, stats) {
  if (Array.isArray(node)) {
    node.forEach((item) => walkAndRewrite(item, driveMap, stats));
    return;
  }
  if (node && typeof node === 'object') {
    Object.keys(node).forEach((key) => {
      const value = node[key];
      if (key === 'image' && typeof value === 'string' && value.trim() !== '') {
        const cleanKey = normalizePath(value);
        const fileId = driveMap[cleanKey];
        if (fileId) {
          node[key] = toDriveUrl(fileId);
          stats.matched++;
        } else {
          stats.unmatched.push(value);
        }
      } else {
        walkAndRewrite(value, driveMap, stats);
      }
    });
  }
}

function processFile(filePath, driveMap, stats) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);

  walkAndRewrite(data, driveMap, stats);

  fs.writeFileSync(filePath + '.bak', raw, 'utf8');
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

function main() {
  const driveMap = loadDriveMap();
  const stats = { matched: 0, unmatched: [] };

  JSON_DIRS.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      console.warn(`Directory not found, skipping: ${dir}`);
      return;
    }
    fs.readdirSync(dir)
      .filter((f) => f.endsWith('.json'))
      .forEach((f) => {
        const fullPath = path.join(dir, f);
        console.log(`Processing ${fullPath}`);
        processFile(fullPath, driveMap, stats);
      });
  });

  console.log(`\nDone. Matched ${stats.matched} images.`);
  if (stats.unmatched.length) {
    console.log(`\n${stats.unmatched.length} images had NO MATCH in drive-image-map.json:`);
    stats.unmatched.forEach((u) => console.log('  -', u));
  }
}

main();
