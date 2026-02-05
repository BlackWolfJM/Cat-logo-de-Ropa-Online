// Filtering and Search Logic

let filteredProducts = [...products];
let currentPage = 1;
const productsPerPage = 12;

/**
 * Apply all filters to products
 */
function applyFilters() {
    const category = document.getElementById('filterCategory').value;
    const size = document.getElementById('filterSize').value;
    const color = document.getElementById('filterColor').value;
    const maxPrice = parseInt(document.getElementById('filterPrice').value);
    const sortBy = document.getElementById('filterSort').value;

    // Start with all products
    filteredProducts = [...products];

    // Apply category filter
    if (category) {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    // Apply size filter
    if (size) {
        filteredProducts = filteredProducts.filter(p => p.sizes.includes(size));
    }

    // Apply color filter
    if (color) {
        filteredProducts = filteredProducts.filter(p =>
            p.colors.some(c => c.toLowerCase().includes(color.toLowerCase()))
        );
    }

    // Apply price filter
    filteredProducts = filteredProducts.filter(p => p.price <= maxPrice);

    // Apply sorting
    switch (sortBy) {
        case 'newest':
            filteredProducts.sort((a, b) => b.isNew - a.isNew);
            break;
        case 'price-asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
    }

    // Reset to first page
    currentPage = 1;

    // Update UI
    updateProductCount(filteredProducts.length);
    renderPaginatedProducts();
    updateLoadMoreButton();
}

/**
 * Handle search input
 */
function handleSearch(query) {
    if (!query) {
        // If search is empty, apply normal filters
        applyFilters();
        return;
    }

    // Search in product names and descriptions
    filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );

    // Reset to first page
    currentPage = 1;

    // Update UI
    updateProductCount(filteredProducts.length);
    renderPaginatedProducts();
    updateLoadMoreButton();
}

/**
 * Render products with pagination
 */
function renderPaginatedProducts() {
    const startIndex = 0;
    const endIndex = currentPage * productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);

    renderProducts(productsToShow, 'productsGrid');
}

/**
 * Load more products
 */
function loadMoreProducts() {
    currentPage++;
    renderPaginatedProducts();
    updateLoadMoreButton();
}

/**
 * Update load more button visibility
 */
function updateLoadMoreButton() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!loadMoreBtn) return;

    const totalShown = currentPage * productsPerPage;

    if (totalShown >= filteredProducts.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-block';
    }
}

/**
 * Clear all filters
 */
function clearFilters() {
    document.getElementById('filterCategory').value = '';
    document.getElementById('filterSize').value = '';
    document.getElementById('filterColor').value = '';
    document.getElementById('filterPrice').value = '300';
    document.getElementById('priceValue').textContent = '300';
    document.getElementById('filterSort').value = 'newest';
    document.getElementById('searchInput').value = '';

    applyFilters();
}

/**
 * Initialize all filter event listeners
 */
function initFilters() {
    // Category filter
    const categoryFilter = document.getElementById('filterCategory');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }

    // Size filter
    const sizeFilter = document.getElementById('filterSize');
    if (sizeFilter) {
        sizeFilter.addEventListener('change', applyFilters);
    }

    // Color filter
    const colorFilter = document.getElementById('filterColor');
    if (colorFilter) {
        colorFilter.addEventListener('change', applyFilters);
    }

    // Price filter
    const priceFilter = document.getElementById('filterPrice');
    const priceValue = document.getElementById('priceValue');
    if (priceFilter && priceValue) {
        priceFilter.addEventListener('input', (e) => {
            priceValue.textContent = e.target.value;
        });
        priceFilter.addEventListener('change', applyFilters);
    }

    // Sort filter
    const sortFilter = document.getElementById('filterSort');
    if (sortFilter) {
        sortFilter.addEventListener('change', applyFilters);
    }

    // Clear filters button
    const clearBtn = document.getElementById('clearFilters');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearFilters);
    }

    // Load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreProducts);
    }

    // Initial render
    applyFilters();
}
