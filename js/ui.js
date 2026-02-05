// UI Rendering Functions

/**
 * Render product card HTML
 */
function renderProductCard(product) {
    const badgeClass = product.isNew ? 'product-card__badge--new' : 'product-card__badge--offer';
    const badge = product.badge
        ? `<span class="product-card__badge ${badgeClass}">${product.badge}</span>`
        : '';

    const oldPrice = product.oldPrice
        ? `<span class="product-card__price-old">S/ ${product.oldPrice.toFixed(2)}</span>`
        : '';

    const isFavorite = favorites.includes(product.id);
    const favoriteClass = isFavorite ? 'active' : '';

    return `
    <div class="product-card" data-product-id="${product.id}">
      <div class="product-card__image">
        <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
        ${badge}
        <button class="product-card__favorite ${favoriteClass}" data-favorite-id="${product.id}" aria-label="Agregar a favoritos">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>
      <div class="product-card__content">
        <h3 class="product-card__name">${product.name}</h3>
        <div class="product-card__price">
          <span class="product-card__price-current">S/ ${product.price.toFixed(2)}</span>
          ${oldPrice}
        </div>
        <button class="btn btn--primary btn--sm product-card__btn" data-whatsapp-id="${product.id}">
          Pedir por WhatsApp
        </button>
      </div>
    </div>
  `;
}

/**
 * Render products grid
 */
function renderProducts(productsToRender, containerId = 'productsGrid') {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (productsToRender.length === 0) {
        container.innerHTML = '<div class="no-products"><p>No se encontraron productos con estos filtros.</p></div>';
        return;
    }

    container.innerHTML = productsToRender.map(product => renderProductCard(product)).join('');

    // Add click events to product cards
    container.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't open modal if clicking favorite or whatsapp button
            if (e.target.closest('.product-card__favorite') || e.target.closest('[data-whatsapp-id]')) {
                return;
            }
            const productId = parseInt(card.dataset.productId);
            openProductModal(productId);
        });
    });

    // Add click events to WhatsApp buttons
    container.querySelectorAll('[data-whatsapp-id]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = parseInt(btn.dataset.whatsappId);
            const product = products.find(p => p.id === productId);
            sendWhatsAppMessage(product);
        });
    });

    // Add click events to favorite buttons
    container.querySelectorAll('[data-favorite-id]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = parseInt(btn.dataset.favoriteId);
            toggleFavorite(productId);
        });
    });
}

/**
 * Update product count display
 */
function updateProductCount(count) {
    const countElement = document.getElementById('productCount');
    if (countElement) {
        countElement.textContent = `${count} ${count === 1 ? 'producto encontrado' : 'productos encontrados'}`;
    }
}

/**
 * Show skeleton loading
 */
function showSkeleton() {
    const skeleton = document.getElementById('productsSkeleton');
    const grid = document.getElementById('productsGrid');
    if (skeleton && grid) {
        skeleton.style.display = 'grid';
        grid.style.display = 'none';
    }
}

/**
 * Hide skeleton loading
 */
function hideSkeleton() {
    const skeleton = document.getElementById('productsSkeleton');
    const grid = document.getElementById('productsGrid');
    if (skeleton && grid) {
        skeleton.style.display = 'none';
        grid.style.display = 'grid';
    }
}

/**
 * Render testimonial card
 */
function renderTestimonialCard(testimonial) {
    const stars = '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating);

    return `
    <div class="testimonial-card">
      <div class="testimonial-card__header">
        <div class="testimonial-card__avatar">
          <img src="${testimonial.image}" alt="${testimonial.name}" loading="lazy">
        </div>
        <div class="testimonial-card__info">
          <h4>${testimonial.name}</h4>
          <div class="testimonial-card__rating">${stars}</div>
        </div>
      </div>
      <p class="testimonial-card__text">"${testimonial.text}"</p>
      <p class="testimonial-card__date">${testimonial.date}</p>
    </div>
  `;
}

/**
 * Render all testimonials
 */
function renderTestimonials() {
    const container = document.getElementById('testimonialsGrid');
    if (!container) return;

    container.innerHTML = testimonials.map(testimonial => renderTestimonialCard(testimonial)).join('');
}

/**
 * Send WhatsApp message with product info
 */
function sendWhatsAppMessage(product, size = null, color = null, quantity = 1) {
    const baseMessage = `Hola! Quiero el producto *${product.name}*`;
    const sizeText = size ? `, talla *${size}*` : '';
    const colorText = color ? `, color *${color}*` : '';
    const quantityText = quantity > 1 ? `, cantidad *${quantity}*` : '';
    const priceText = `\n\nPrecio: S/ ${product.price.toFixed(2)}`;

    const message = baseMessage + sizeText + colorText + quantityText + priceText;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${contactConfig.whatsapp.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
}

/**
 * Send Instagram DM (opens Instagram profile)
 */
function sendInstagramDM(product, size = null, color = null, quantity = 1) {
    const instagramUrl = `https://instagram.com/${contactConfig.instagram.replace('@', '')}`;
    window.open(instagramUrl, '_blank');

    // Show a message to user
    alert(`Abre Instagram y envía este mensaje:\n\nHola! Quiero el producto ${product.name}${size ? `, talla ${size}` : ''}${color ? `, color ${color}` : ''}${quantity > 1 ? `, cantidad ${quantity}` : ''}`);
}

/**
 * Toggle favorite status for a product
 */
let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

function toggleFavorite(productId) {
    const index = favorites.indexOf(productId);

    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(productId);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoriteCount();

    // Update UI
    const favBtn = document.querySelector(`[data-favorite-id="${productId}"]`);
    if (favBtn) {
        favBtn.classList.toggle('active');
    }
}

/**
 * Update favorite count in header
 */
function updateFavoriteCount() {
    const countElement = document.getElementById('favCount');
    if (countElement) {
        countElement.textContent = favorites.length;
    }
}

/**
 * Show favorites when clicking favorites button
 */
function showFavorites() {
    const favoriteProducts = products.filter(p => favorites.includes(p.id));

    if (favoriteProducts.length === 0) {
        alert('No tienes productos favoritos aún.');
        return;
    }

    renderProducts(favoriteProducts);
    updateProductCount(favoriteProducts.length);

    // Scroll to products
    document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
}

/**
 * Initialize tabs functionality
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;

            // Remove active class from all buttons and panes
            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Add active class to clicked button and corresponding pane
            btn.classList.add('active');
            document.getElementById(targetTab).classList.add('active');

            // Render products for this tab
            renderTabProducts(targetTab);
        });
    });

    // Render initial tab
    renderTabProducts('ofertas-semana');
}

/**
 * Render products for specific tab
 */
function renderTabProducts(tabName) {
    let productsToShow = [];
    let containerId = '';

    switch (tabName) {
        case 'ofertas-semana':
            productsToShow = products.filter(p => p.isOffer).slice(0, 8);
            containerId = 'offersGrid';
            break;
        case 'nueva-coleccion':
            productsToShow = products.filter(p => p.isNew).slice(0, 8);
            containerId = 'newGrid';
            break;
        case 'basicos':
            productsToShow = products.filter(p =>
                p.category === 'polos' && !p.isOffer && !p.isNew
            ).slice(0, 8);
            containerId = 'basicsGrid';
            break;
        case 'mas-vendido':
            // Random selection of products as "bestsellers"
            productsToShow = [...products].sort(() => 0.5 - Math.random()).slice(0, 8);
            containerId = 'bestsellerGrid';
            break;
    }

    renderProducts(productsToShow, containerId);
}

/**
 * Initialize mobile menu
 */
function initMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const nav = document.getElementById('nav');

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
        });
    }
}

/**
 * Initialize search functionality
 */
function initSearch() {
    const searchBtn = document.getElementById('searchBtn');
    const closeSearch = document.getElementById('closeSearch');
    const searchBar = document.getElementById('searchBar');
    const searchInput = document.getElementById('searchInput');

    if (searchBtn && searchBar) {
        searchBtn.addEventListener('click', () => {
            searchBar.classList.add('active');
            searchInput.focus();
        });
    }

    if (closeSearch && searchBar) {
        closeSearch.addEventListener('click', () => {
            searchBar.classList.remove('active');
            searchInput.value = '';
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            handleSearch(query);
        });
    }
}

/**
 * Initialize header scroll effect
 */
function initHeaderScroll() {
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }

        lastScroll = currentScroll;
    });
}
