window.DriveImages = (function () {
  const MAP_PATH = 'drive-image-map.json'; // adjust path if you place it elsewhere
  let mapPromise = null;

  function load() {
    if (!mapPromise) {
      mapPromise = fetch(MAP_PATH)
        .then((r) => r.json())
        .catch((err) => {
          console.error('DriveImages: could not load drive-image-map.json', err);
          return {};
        });
    }
    return mapPromise;
  }

  function urlFromId(id) {
    return `https://lh3.googleusercontent.com/d/${id}=w1000`;
  }

  // For non-image files (PDFs, etc). Opens Google Drive's built-in
  // viewer in a new tab. Use this instead of urlFromId for anything
  // that isn't meant to render as an <img>.
  function urlFromIdAsFile(id) {
    return `https://drive.google.com/file/d/${id}/view`;
  }

  // Resolve one local path once you already have the loaded map.
  // Falls back to the original path if no match is found, so a missing
  // mapping never breaks the page — it just shows a broken image icon
  // you can spot and fix.
  function resolve(map, assetPath) {
    const clean = assetPath.replace(/^\.?\/?assets\//, '');
    return map[clean] ? urlFromId(map[clean]) : assetPath;
  }

  // Same lookup, but for files that should open/download rather than
  // render inline (PDF product sheets, etc).
  function resolveFile(map, assetPath) {
    const clean = assetPath.replace(/^\.?\/?assets\//, '');
    return map[clean] ? urlFromIdAsFile(map[clean]) : assetPath;
  }

  // ------------------------------------------------------------------
  // AUTO-SWAP: catches any <img> tag anywhere on the page (or any
  // element with a data-image attribute, like the homepage story
  // thumbnails) that still points at a local "assets/..." path, and
  // swaps it for the matching Drive URL automatically. This covers
  // static images sitting directly in your HTML — logo, hero banner,
  // brand collage, "why choose us" cards, client photos — without
  // needing to hand-edit every page.
  //
  // Runs once, right when each page's DOM is ready. Include
  // drive-images.js as the FIRST script tag on every page (before
  // main.js, home.js, brands.js, etc.) so this runs before anything
  // else tries to use those images.
  // ------------------------------------------------------------------
  function autoSwap() {
    load().then((map) => {
      document.querySelectorAll('img[src*="assets/"]').forEach((img) => {
        const current = img.getAttribute('src');
        const swapped = resolve(map, current);
        if (swapped !== current) img.setAttribute('src', swapped);
      });

      document.querySelectorAll('[data-image*="assets/"]').forEach((el) => {
        const current = el.getAttribute('data-image');
        const swapped = resolve(map, current);
        if (swapped !== current) el.setAttribute('data-image', swapped);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', autoSwap);

  return { load, resolve, resolveFile };
})();