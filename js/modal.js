// Product Modal Logic

/**
 * Open product modal with details
 */
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');

    if (!modal || !modalBody) return;

    // Generate modal content
    modalBody.innerHTML = generateModalContent(product);

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Initialize modal interactions
    initModalInteractions(product);
}

/**
 * Close product modal
 */
function closeProductModal() {
    const modal = document.getElementById('productModal');
    if (!modal) return;

    modal.classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * Generate modal HTML content
 */
function generateModalContent(product) {
    const oldPrice = product.oldPrice
        ? `<span class="modal-product__price-old">S/ ${product.oldPrice.toFixed(2)}</span>`
        : '';

    const badge = product.badge
        ? `<span class="product-card__badge ${product.isNew ? 'product-card__badge--new' : 'product-card__badge--offer'}">${product.badge}</span>`
        : '';

    return `
    <div class="modal-product">
      <div class="modal-product__gallery">
        <div class="modal-product__main-image" id="mainImage">
          <img src="${product.images[0]}" alt="${product.name}">
          ${badge}
        </div>
        <div class="modal-product__thumbnails">
          ${product.images.map((img, index) => `
            <div class="modal-product__thumbnail ${index === 0 ? 'active' : ''}" data-image-index="${index}">
              <img src="${img}" alt="${product.name} - Imagen ${index + 1}">
            </div>
          `).join('')}
        </div>
      </div>

      <div class="modal-product__info">
        <h2>${product.name}</h2>
        
        <div class="modal-product__price">
          <span class="modal-product__price-current">S/ ${product.price.toFixed(2)}</span>
          ${oldPrice}
        </div>

        <p class="modal-product__description">${product.description}</p>

        <div class="modal-product__options">
          <!-- Size selector -->
          <div class="modal-product__option">
            <label for="modalSize">Talla:</label>
            <select id="modalSize">
              ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
            </select>
          </div>

          <!-- Color selector -->
          <div class="modal-product__option">
            <label for="modalColor">Color:</label>
            <select id="modalColor">
              ${product.colors.map(color => `<option value="${color}">${color}</option>`).join('')}
            </select>
          </div>

          <!-- Quantity selector -->
          <div class="modal-product__option">
            <label for="modalQuantity">Cantidad:</label>
            <input type="number" id="modalQuantity" min="1" max="10" value="1">
          </div>
        </div>

        <div class="modal-product__actions">
          <button class="btn btn--primary btn--lg" id="modalWhatsAppBtn">
            📱 Pedir por WhatsApp
          </button>
          <button class="btn btn--secondary btn--lg" id="modalInstagramBtn">
            📷 Pedir por Instagram
          </button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Initialize modal interactions
 */
function initModalInteractions(product) {
    // Image gallery
    const thumbnails = document.querySelectorAll('.modal-product__thumbnail');
    const mainImage = document.getElementById('mainImage');

    if (thumbnails && mainImage) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                const index = parseInt(thumb.dataset.imageIndex);
                const img = mainImage.querySelector('img');
                if (img) {
                    img.src = product.images[index];
                }

                // Update active thumbnail
                thumbnails.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
        });
    }

    // WhatsApp button
    const whatsappBtn = document.getElementById('modalWhatsAppBtn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', () => {
            const size = document.getElementById('modalSize').value;
            const color = document.getElementById('modalColor').value;
            const quantity = parseInt(document.getElementById('modalQuantity').value);

            sendWhatsAppMessage(product, size, color, quantity);
            closeProductModal();
        });
    }

    // Instagram button
    const instagramBtn = document.getElementById('modalInstagramBtn');
    if (instagramBtn) {
        instagramBtn.addEventListener('click', () => {
            const size = document.getElementById('modalSize').value;
            const color = document.getElementById('modalColor').value;
            const quantity = parseInt(document.getElementById('modalQuantity').value);

            sendInstagramDM(product, size, color, quantity);
            closeProductModal();
        });
    }
}

/**
 * Initialize modal event listeners
 */
function initModal() {
    const modal = document.getElementById('productModal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');

    // Close button
    if (modalClose) {
        modalClose.addEventListener('click', closeProductModal);
    }

    // Click outside to close
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeProductModal);
    }

    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeProductModal();
        }
    });
}
