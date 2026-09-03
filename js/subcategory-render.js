// subcategory-render.js
// Handles dynamic rendering of subcategory tables based on URL parameter (?id=subcategory-id)

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const subcatId = params.get('id');

  const titleEl = document.getElementById('subcat-title');
  const catLinkEl = document.getElementById('parent-cat-link');
  const breadcrumbSubcatEl = document.getElementById('breadcrumb-subcat');
  const descEl = document.getElementById('subcat-desc');
  const tableContainer = document.getElementById('table-container');
  const loader = document.getElementById('loading-indicator');

  if (!subcatId) {
    showError('No subcategory specified. Please go back to the products page.');
    return;
  }

  // Fetch compiled global product data
  fetch('/js/products-data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load product catalogue.');
      }
      return response.json();
    })
    .then(data => {
      let foundSubcat = null;
      let foundCat = null;
      let foundCatKey = null;

      // Search through all categories
      const catKeys = Object.keys(data);
      for (const key of catKeys) {
        const category = data[key];
        if (category && category.subcategories) {
          const sub = category.subcategories.find(s => s.id === subcatId);
          if (sub) {
            foundSubcat = sub;
            foundCat = category;
            foundCatKey = key;
            break;
          }
        }
      }

      if (!foundSubcat) {
        showError('Subcategory not found. It might have been moved or renamed.');
        return;
      }

      // Hide loader
      if (loader) loader.style.display = 'none';

      // Update metadata & breadcrumbs
      document.title = `${foundSubcat.name} | Ahuja Infracore`;
      if (titleEl) titleEl.textContent = foundSubcat.name;
      if (descEl) descEl.textContent = `Explore our high-quality range of ${foundSubcat.name.toLowerCase()} sourced from trusted manufacturers.`;
      
      if (catLinkEl) {
        catLinkEl.textContent = foundCat.category_name;
        // Map category keys to our category page paths
        const catPageSlug = foundCatKey.replace('_', '-');
        catLinkEl.href = `/categories/${catPageSlug}/index.html`;
      }
      if (breadcrumbSubcatEl) {
        breadcrumbSubcatEl.textContent = foundSubcat.name;
      }

      // Build product table
      renderProductTable(foundSubcat.products);
    })
    .catch(error => {
      console.error(error);
      showError('An error occurred while loading the product list.');
    });

  function showError(message) {
    if (loader) loader.style.display = 'none';
    if (tableContainer) {
      tableContainer.innerHTML = `
        <div class="error-box" style="text-align: center; padding: 40px; background: #fff; border-radius: 8px; border: 1px solid var(--beige); margin: 20px 0;">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" style="margin-bottom: 15px;">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <h3 style="color: var(--dark); margin-bottom: 10px; font-family: var(--font-display);">Unable to Load Products</h3>
          <p style="color: var(--muted); margin-bottom: 20px;">${message}</p>
          <a href="/products_new.html" class="btn btn-primary">Return to Catalog</a>
        </div>
      `;
    }
  }

  function renderProductTable(products) {
    if (!products || products.length === 0) {
      tableContainer.innerHTML = '<p style="text-align: center; color: var(--muted); padding: 40px;">No products found in this subcategory.</p>';
      return;
    }

    const tableWrapper = document.createElement('div');
    tableWrapper.style.overflowX = 'auto';

    const table = document.createElement('table');
    table.className = 'product-b2b-table';

    // Create table header
    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th style="width: 30%;">Product Name</th>
        <th style="width: 25%;">Company / Manufacturer</th>
        <th style="width: 30%;">Specifications / Size Details</th>
        <th style="width: 15%; text-align: center;">Action</th>
      </tr>
    `;
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    products.forEach(p => {
      const tr = document.createElement('tr');
      
      // Is it Ahuja Infracore? (brand badge styling helper)
      const isAhuja = p.company && p.company.trim().toLowerCase() === 'ahuja infracore';
      const badgeClass = isAhuja ? 'brand-badge brand-badge-ahuja' : 'brand-badge';
      
      tr.innerHTML = `
        <td><strong>${escapeHtml(p.name)}</strong></td>
        <td>
          <span class="${badgeClass}">
            ${escapeHtml(p.company || 'Multi-Brand')}
          </span>
        </td>
        <td style="font-size: 0.88rem; color: #555;">${escapeHtml(p.specifications || 'Standard specifications')}</td>
        <td style="text-align: center;">
          <a href="mailto:info@ahujainfracore.com?subject=Inquiry%20for%20${encodeURIComponent(p.name)}" class="btn-quote-action">Get Quote</a>
        </td>
      `;
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    tableWrapper.appendChild(table);
    tableContainer.innerHTML = '';
    tableContainer.appendChild(tableWrapper);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
});
