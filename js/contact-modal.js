// ==========================================================================
// contact-modal.js
// Injects the "Get in Touch" modal into the page and drives it.
//
// REQUIRES (load these BEFORE this script, on every page):
//   <script src="./js/category-registry.js"></script>
//   <script src="./js/contact-modal.js"></script>
//
// Opens when the user clicks a "Get in Touch" trigger. It looks for,
// in order:
//   1. Any element with id="getInTouchBtn"
//   2. Any element with [data-open-contact-modal]
//   3. Any nav link/button whose visible text is exactly "Get in Touch"
//      (case-insensitive) — so it works even if you haven't added an id.
//
// Requirements step lets the user browse:
//   Categories  ->  Subcategories  ->  Products
// using the same CATEGORY_REGISTRY / fetchCategoryData / getSubparts
// helpers category-page.js and subcategory-page.js already rely on —
// so it always matches your real JSON data, nothing hardcoded.
// ==========================================================================

(function () {
  const PARTIAL_PATH = "contact-modal.partial.html"; // put this file next to index.html
  const SUBMIT_EMAIL = "info@ahujainfracore.com"; // change to your inbox
  const GOOGLE_SHEET_URL =
    "https://script.google.com/macros/s/AKfycbyZ3vYGmvBE6lKk7wFSacw-TR3ebF-Dow-4GCslFaQyfuGvsUHCNJSHNaqo7ZvokIQq/exec";

  let modalInjected = false;
  let selected = []; // { categoryTitle, subcategoryName, productName, productCompany }

  // Browser state
  let view = "categories"; // 'categories' | 'subcategories' | 'products'
  let currentCat = null; // { slug, title }
  let currentSub = null; // { id, name }
  let currentProducts = []; // flattened [{ name, company, group }]

  function injectModal() {
    if (modalInjected) return Promise.resolve();
    return fetch(PARTIAL_PATH)
      .then((r) => r.text())
      .then((html) => {
        document.body.insertAdjacentHTML("beforeend", html);
        modalInjected = true;
        wireModal();
      })
      .catch((err) =>
        console.error("contact-modal: could not load partial", err),
      );
  }

  function findTriggers() {
    const triggers = new Set();
    const byId = document.getElementById("getInTouchBtn");
    if (byId) triggers.add(byId);
    document
      .querySelectorAll("[data-open-contact-modal]")
      .forEach((el) => triggers.add(el));
    document.querySelectorAll("a, button").forEach((el) => {
      if (el.textContent.trim().toLowerCase() === "get in touch")
        triggers.add(el);
    });
    return Array.from(triggers);
  }

  function bindTriggers() {
    findTriggers().forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        openModal();
      });
    });
  }

  let overlay, closeBtn, form, chipsEl, breadcrumbEl, listEl, statusEl;

  function wireModal() {
    overlay = document.getElementById("contactModalOverlay");
    closeBtn = document.getElementById("contactModalClose");
    form = document.getElementById("contactModalForm");
    chipsEl = document.getElementById("cmChips");
    breadcrumbEl = document.getElementById("cmBreadcrumb");
    listEl = document.getElementById("cmList");
    statusEl = document.getElementById("cmStatus");

    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !overlay.hidden) closeModal();
    });

    const phoneInput = document.getElementById("cmPhone");
    if (phoneInput) {
      phoneInput.addEventListener("input", () => {
        phoneInput.value = phoneInput.value.replace(/\D/g, "").slice(0, 10);
      });
    }

    form.addEventListener("submit", handleSubmit);

    resetBrowserToCategories();
  }

  function openModal() {
    injectModal().then(() => {
      overlay.hidden = false;
      document.body.style.overflow = "hidden";
    });
  }

  function closeModal() {
    if (overlay) {
      overlay.hidden = true;
      document.body.style.overflow = "";
    }
  }

  // ---------------- Requirements browser ----------------

  function resetBrowserToCategories() {
    view = "categories";
    currentCat = null;
    currentSub = null;
    renderBreadcrumb();
    renderCategories();
  }

  function renderBreadcrumb() {
    let html = `<button type="button" data-crumb="categories">All Categories</button>`;
    if (currentCat) {
      html += `<span class="cm-crumb-sep">/</span>`;
      html +=
        view === "subcategories"
          ? `<span class="cm-crumb-current">${escapeText(currentCat.title)}</span>`
          : `<button type="button" data-crumb="subcategories">${escapeText(currentCat.title)}</button>`;
    }
    if (currentSub) {
      html += `<span class="cm-crumb-sep">/</span>`;
      html += `<span class="cm-crumb-current">${escapeText(currentSub.name)}</span>`;
    }
    breadcrumbEl.innerHTML = html;

    breadcrumbEl.querySelectorAll("button[data-crumb]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.dataset.crumb === "categories") resetBrowserToCategories();
        if (btn.dataset.crumb === "subcategories")
          openCategory(currentCat.slug, currentCat.title);
      });
    });
  }

  function renderCategories() {
    const entries = Object.entries(CATEGORY_REGISTRY);
    listEl.innerHTML = entries
      .map(
        ([slug, cfg]) => `
      <div class="cm-list-item" data-slug="${slug}">
        <span>${escapeText(cfg.fallbackTitle)}</span>
        <span class="cm-list-arrow">&rsaquo;</span>
      </div>
    `,
      )
      .join("");

    listEl.querySelectorAll(".cm-list-item").forEach((row) => {
      row.addEventListener("click", () => {
        const slug = row.dataset.slug;
        openCategory(slug, CATEGORY_REGISTRY[slug].fallbackTitle);
      });
    });
  }

  function openCategory(slug, title) {
    view = "subcategories";
    currentCat = { slug, title };
    currentSub = null;
    renderBreadcrumb();
    listEl.innerHTML = `<p class="cm-list-loading">Loading...</p>`;

    fetchCategoryData(slug)
      .then(({ data }) => {
        const subs = data.subcategories || [];
        if (!subs.length) {
          listEl.innerHTML = `<p class="cm-list-empty">No product families found.</p>`;
          return;
        }
        listEl.innerHTML = subs
          .map(
            (s) => `
          <div class="cm-list-item" data-id="${s.id}" data-name="${escapeAttr(s.name)}">
            <span>${escapeText(s.name)}</span>
            <span class="cm-list-arrow">&rsaquo;</span>
          </div>
        `,
          )
          .join("");
        listEl.querySelectorAll(".cm-list-item").forEach((row) => {
          row.addEventListener("click", () =>
            openSubcategory(subs.find((s) => s.id === row.dataset.id)),
          );
        });
      })
      .catch((err) => {
        console.error(err);
        listEl.innerHTML = `<p class="cm-list-empty">Could not load this category right now.</p>`;
      });
  }

  function openSubcategory(subcat) {
    view = "products";
    currentSub = { id: subcat.id, name: subcat.name };
    renderBreadcrumb();

    // Flatten every group's products into one list (category -> subcategory -> products,
    // matching the 3-level browse the requirement asked for; the group name is kept
    // as a small subtitle so it's still clear which part range each product belongs to).
    const groups = getSubparts(subcat);
    currentProducts = [];
    groups.forEach((g) => {
      (g.products || []).forEach((p) => {
        currentProducts.push({
          name: p.name || p.title || "Product",
          company: p.company || "",
          group: g.name,
        });
      });
    });

    if (!currentProducts.length) {
      listEl.innerHTML = `<p class="cm-list-empty">No products listed here yet.</p>`;
      return;
    }

    renderProducts();
  }

  function renderProducts() {
    listEl.innerHTML = currentProducts
      .map((p, i) => {
        const isSelected = selected.some(
          (s) =>
            s.categoryTitle === currentCat.title &&
            s.subcategoryName === currentSub.name &&
            s.productName === p.name,
        );
        return `
        <div class="cm-list-item ${isSelected ? "cm-selected" : ""}" data-index="${i}">
          <span>${escapeText(p.name)}${p.group ? `<br><span class="cm-item-sub">${escapeText(p.group)}${p.company ? " &middot; " + escapeText(p.company) : ""}</span>` : ""}</span>
          <span class="cm-list-arrow">${isSelected ? "&#10003;" : "+"}</span>
        </div>
      `;
      })
      .join("");

    listEl.querySelectorAll(".cm-list-item").forEach((row) => {
      row.addEventListener("click", () =>
        toggleProduct(currentProducts[Number(row.dataset.index)]),
      );
    });
  }

  function toggleProduct(p) {
    const key = (s) =>
      s.categoryTitle === currentCat.title &&
      s.subcategoryName === currentSub.name &&
      s.productName === p.name;
    const existingIndex = selected.findIndex(key);
    if (existingIndex > -1) {
      selected.splice(existingIndex, 1);
    } else {
      selected.push({
        categoryTitle: currentCat.title,
        subcategoryName: currentSub.name,
        productName: p.name,
        productCompany: p.company,
      });
    }
    renderProducts();
    renderChips();
  }

  function renderChips() {
    if (!selected.length) {
      chipsEl.innerHTML = "";
      return;
    }
    chipsEl.innerHTML = selected
      .map(
        (s, i) => `
      <span class="cm-chip">
        ${escapeText(s.productName)}
        <button type="button" data-remove="${i}" aria-label="Remove">&times;</button>
      </span>
    `,
      )
      .join("");
    chipsEl.querySelectorAll("button[data-remove]").forEach((btn) => {
      btn.addEventListener("click", () => {
        selected.splice(Number(btn.dataset.remove), 1);
        renderChips();
        if (view === "products") renderProducts();
      });
    });
  }

  // ---------------- Submit ----------------

  function handleSubmit(e) {
    e.preventDefault();
    const name = document.getElementById("cmName").value.trim();
    const phone = document.getElementById("cmPhone").value.trim();
    const email = document.getElementById("cmEmail").value.trim();
    const comments = document.getElementById("cmComments").value.trim();

    if (!name || !phone || !email) {
      showStatus("Please fill in your name, phone and email.", true);
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      showStatus("Please enter a valid 10-digit phone number.", true);
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      showStatus("Please enter a valid email address.", true);
      return;
    }

    const requirementsText = selected.length
      ? selected
          .map(
            (s) =>
              `- ${s.productName} (${s.subcategoryName} > ${s.categoryTitle})`,
          )
          .join("\n")
      : "Not specified";

    const submitBtn = form.querySelector(".cm-submit");
    if (submitBtn) submitBtn.disabled = true;
    showStatus("Submitting...", false);

    fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      // 'text/plain' avoids a CORS preflight that Apps Script doesn't handle
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        name,
        phone,
        email,
        requirements: requirementsText,
        comments: comments || "None",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result === "success") {
          showStatus("Thank you! Your enquiry has been submitted.", false);
          form.reset();
          selected = [];
          renderChips();
          resetBrowserToCategories();
        } else {
          showStatus("Something went wrong. Please try again.", true);
        }
      })
      .catch(() => {
        showStatus("Could not submit right now. Please try again later.", true);
      })
      .finally(() => {
        if (submitBtn) submitBtn.disabled = false;
      });
  }

  function showStatus(msg, isError) {
    statusEl.textContent = msg;
    statusEl.className =
      "cm-status " + (isError ? "cm-status-error" : "cm-status-success");
  }

  // ---------------- Utils ----------------

  function escapeText(str) {
    const div = document.createElement("div");
    div.textContent = str == null ? "" : str;
    return div.innerHTML;
  }
  function escapeAttr(str) {
    return escapeText(str).replace(/"/g, "&quot;");
  }

  document.addEventListener("DOMContentLoaded", bindTriggers);
})();
