document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. TRADITIONAL JAPI LOADER SCREEN REMOVAL
  // ==========================================================================
  const loader = document.getElementById('loader');
  
  setTimeout(() => {
    if (loader) {
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
    }
    showToast('✨ Welcome to Itin Keithel - Sovereign Heritage Marketplace Online!');
  }, 1200);


  // ==========================================================================
  // 2. TOAST NOTIFICATION MODULE
  // ==========================================================================
  const toast = document.getElementById('toast-notification');
  const toastMsg = document.getElementById('toast-message');
  let toastTimeout;

  function showToast(message, icon = '✨') {
    if (!toast || !toastMsg) return;
    clearTimeout(toastTimeout);
    toastMsg.textContent = message;
    toast.querySelector('.toast-icon').innerHTML = icon;
    toast.classList.add('show');
    
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }


  // ==========================================================================
  // 3. ADMIN PANEL "CONTROL TOWER" SWITCHER (VIBE & PROFILE ADAPTATION)
  // ==========================================================================
  const towerButtons = document.querySelectorAll('.btn-tower');
  const views = {
    consumer: document.getElementById('consumer-view'),
    vendor: document.getElementById('vendor-view'),
    delivery: document.getElementById('delivery-view'),
    admin: document.getElementById('admin-view')
  };

  towerButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedView = btn.dataset.view;
      
      // Update active control tower switcher button
      towerButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Change full body vibe class
      document.body.className = `theme-${selectedView}`;

      // Show/Hide target dashboard section
      Object.keys(views).forEach(key => {
        if (key === selectedView) {
          views[key].classList.add('active');
          setTimeout(() => {
            views[key].style.opacity = '1';
            views[key].style.transform = 'translateY(0)';
          }, 50);
        } else {
          views[key].classList.remove('active');
          views[key].style.opacity = '0';
          views[key].style.transform = 'translateY(30px)';
        }
      });

      // Special layout corrections and toast alerts
      if (selectedView === 'consumer') {
        showToast('Entering Luxury Digital Magazine Boutique', '🛍️');
        setTimeout(updateNavActiveBar, 300);
      } else if (selectedView === 'vendor') {
        showToast('Authorized: Majuli Loom Seller Central active', '🏪');
      } else if (selectedView === 'delivery') {
        showToast('Logistics terminal active: Captain Dipankar online', '🏍️');
      } else if (selectedView === 'admin') {
        showToast('Level-0 Root Control Tower active', '🛡️');
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });


  // ==========================================================================
  // 4. SUB-HEADER CATEGORY GLIDE UNDERLINE NAVIGATION & SCROLLSPY
  // ==========================================================================
  const navItems = document.querySelectorAll('.nav-item');
  const navActiveBar = document.getElementById('nav-active-bar');
  const navScrollContainer = document.querySelector('.nav-scroll-container');

  function updateNavActiveBar() {
    if (!navActiveBar || !navScrollContainer) return;
    const activeItem = document.querySelector('.nav-item.active');
    
    if (activeItem) {
      navActiveBar.style.left = `${activeItem.offsetLeft}px`;
      navActiveBar.style.width = `${activeItem.offsetWidth}px`;
    }
  }

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');
      updateNavActiveBar();
      
      const targetId = item.dataset.target;
      
      // Force switch to consumer view if click navigation was made outside storefront
      const activeTowerBtn = document.querySelector('.btn-tower.active');
      if (activeTowerBtn.dataset.view !== 'consumer') {
        document.querySelector('.btn-tower[data-view="consumer"]').click();
      }

      // Smooth scrolling to appropriate target sections
      if (targetId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (targetId === 'stories') {
        document.getElementById('scrollytelling-section').scrollIntoView({ behavior: 'smooth' });
      } else if (targetId === 'configurator') {
        document.getElementById('hamper-configurator').scrollIntoView({ behavior: 'smooth' });
      } else if (targetId === 'handlooms') {
        document.getElementById('handlooms').scrollIntoView({ behavior: 'smooth' });
      } else if (targetId === 'handicrafts') {
        document.getElementById('handicrafts').scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ScrollSpy function to track visible storefront segment and glide underline
  const storefrontSections = [
    { id: 'home', item: document.querySelector('.nav-item[data-target="home"]') },
    { id: 'scrollytelling-section', item: document.querySelector('.nav-item[data-target="stories"]') },
    { id: 'hamper-configurator', item: document.querySelector('.nav-item[data-target="configurator"]') },
    { id: 'handlooms', item: document.querySelector('.nav-item[data-target="handlooms"]') },
    { id: 'handicrafts', item: document.querySelector('.nav-item[data-target="handicrafts"]') }
  ];

  window.addEventListener('scroll', () => {
    const activeTowerBtn = document.querySelector('.btn-tower.active');
    if (!activeTowerBtn || activeTowerBtn.dataset.view !== 'consumer') return;

    const scrollPos = window.scrollY + window.innerHeight * 0.4;
    
    // Check which section scroll position is currently inside
    for (let i = storefrontSections.length - 1; i >= 0; i--) {
      const sectionEl = document.getElementById(storefrontSections[i].id);
      if (sectionEl) {
        const offsetTop = sectionEl.offsetTop;
        if (scrollPos >= offsetTop) {
          navItems.forEach(n => n.classList.remove('active'));
          storefrontSections[i].item.classList.add('active');
          updateNavActiveBar();
          break;
        }
      }
    }
  });

  // Call initial subnav bar size positioning
  setTimeout(updateNavActiveBar, 500);
  window.addEventListener('resize', updateNavActiveBar);


  // ==========================================================================
  // 5. WISHLIST & PRESTIGE BAG DRAWER MODULES (SLIDING MECHANICS)
  // ==========================================================================
  let cart = [];
  let wishlist = [];

  const wishlistDrawer = document.getElementById('wishlist-drawer');
  const cartDrawer = document.getElementById('cart-drawer');

  // Trigger buttons
  const btnOpenWishlist = document.getElementById('btn-open-wishlist');
  const btnOpenCart = document.getElementById('btn-open-cart');
  const btnCloseWishlist = document.getElementById('btn-close-wishlist');
  const btnCloseCart = document.getElementById('btn-close-cart');
  const wishlistOverlay = wishlistDrawer.querySelector('.drawer-overlay');
  const cartOverlay = cartDrawer.querySelector('.drawer-overlay');

  function openDrawer(drawer) {
    drawer.classList.add('active');
  }

  function closeDrawer(drawer) {
    drawer.classList.remove('active');
  }

  btnOpenWishlist.addEventListener('click', () => openDrawer(wishlistDrawer));
  btnOpenCart.addEventListener('click', () => openDrawer(cartDrawer));
  btnCloseWishlist.addEventListener('click', () => closeDrawer(wishlistDrawer));
  btnCloseCart.addEventListener('click', () => closeDrawer(cartDrawer));
  wishlistOverlay.addEventListener('click', () => closeDrawer(wishlistDrawer));
  cartOverlay.addEventListener('click', () => closeDrawer(cartDrawer));

  // Render Prestige Bag (Cart)
  const cartContainer = document.getElementById('cart-items-container');
  const cartBadge = document.getElementById('cart-badge');
  const cartSubtotal = document.getElementById('cart-subtotal');
  const cartTotal = document.getElementById('cart-total');

  function renderCart() {
    cartContainer.innerHTML = '';
    
    if (cart.length === 0) {
      cartContainer.innerHTML = `
        <div class="empty-drawer-message">
          <span class="empty-icon">&#128092;</span>
          <p>Your bag is empty. Configure a gift hamper or pick a masterpiece.</p>
        </div>
      `;
      cartBadge.textContent = '0';
      cartSubtotal.textContent = '₹0';
      cartTotal.textContent = '₹0';
      return;
    }

    let subtotal = 0;
    cart.forEach(item => {
      subtotal += item.price * item.qty;
      const itemRow = document.createElement('div');
      itemRow.className = 'drawer-item-row';
      itemRow.innerHTML = `
        <div class="drawer-item-thumb">
          <img src="${item.img}" alt="${item.name}">
        </div>
        <div class="drawer-item-details">
          <h4>${item.name}</h4>
          <span class="drawer-item-price">₹${item.price.toLocaleString('en-IN')} (x${item.qty})</span>
        </div>
        <button class="btn-remove-item" data-id="${item.id}">&times;</button>
      `;
      
      // Remove button listener
      itemRow.querySelector('.btn-remove-item').addEventListener('click', () => {
        removeFromCart(item.id);
      });

      cartContainer.appendChild(itemRow);
    });

    cartBadge.textContent = cart.reduce((acc, curr) => acc + curr.qty, 0);
    cartSubtotal.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    cartTotal.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
  }

  function addToCart(id, name, price, img) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ id, name, price: parseInt(price), img, qty: 1 });
    }
    renderCart();
    showToast(`Added masterpiece to Prestige Bag!`, '🛍️');
    openDrawer(cartDrawer);
  }

  function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
    showToast(`Removed item from Prestige Bag`, '🛍️');
  }

  // Intercept Storefront Acquire Buttons
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
      const btn = e.target;
      const id = btn.dataset.productId;
      const name = btn.dataset.name;
      const price = btn.dataset.price;
      const img = btn.dataset.img;
      addToCart(id, name, price, img);
    }
  });

  // Render Wishlist
  const wishlistContainer = document.getElementById('wishlist-items-container');
  const wishlistBadge = document.getElementById('wishlist-badge');

  function renderWishlist() {
    wishlistContainer.innerHTML = '';
    
    if (wishlist.length === 0) {
      wishlistContainer.innerHTML = `
        <div class="empty-drawer-message">
          <span class="empty-icon">&#9825;</span>
          <p>Your wishlist is empty. Explore our drapes and woodworks to save favorites.</p>
        </div>
      `;
      wishlistBadge.textContent = '0';
      return;
    }

    wishlist.forEach(item => {
      const itemRow = document.createElement('div');
      itemRow.className = 'drawer-item-row';
      itemRow.innerHTML = `
        <div class="drawer-item-thumb">
          <img src="${item.img}" alt="${item.name}">
        </div>
        <div class="drawer-item-details">
          <h4>${item.name}</h4>
          <span class="drawer-item-price">₹${item.price.toLocaleString('en-IN')}</span>
          <button class="btn-wishlist-to-cart" data-id="${item.id}">Add to Bag</button>
        </div>
        <button class="btn-remove-item" data-id="${item.id}">&times;</button>
      `;

      // Acquire / Add to Bag from wishlist
      itemRow.querySelector('.btn-wishlist-to-cart').addEventListener('click', () => {
        addToCart(item.id, item.name, item.price, item.img);
        removeFromWishlist(item.id);
      });

      // Remove button listener
      itemRow.querySelector('.btn-remove-item').addEventListener('click', () => {
        removeFromWishlist(item.id);
      });

      wishlistContainer.appendChild(itemRow);
    });

    wishlistBadge.textContent = wishlist.length;
  }

  function toggleWishlist(id, name, price, img, heartBtn) {
    const idx = wishlist.findIndex(item => item.id === id);
    if (idx > -1) {
      wishlist.splice(idx, 1);
      heartBtn.classList.remove('active');
      heartBtn.innerHTML = '&#9825;';
      showToast('Removed from favorites', '🤍');
    } else {
      wishlist.push({ id, name, price: parseInt(price), img });
      heartBtn.classList.add('active');
      heartBtn.innerHTML = '&#9829;'; // Filled heart
      showToast('Added masterpiece to prestige wishlist!', '💖');
    }
    renderWishlist();
  }

  function removeFromWishlist(id) {
    wishlist = wishlist.filter(item => item.id !== id);
    // Find active heart button on page if any and toggle back
    const heart = document.querySelector(`.wishlist-btn[data-product-id="${id}"]`);
    if (heart) {
      heart.classList.remove('active');
      heart.innerHTML = '&#9825;';
    }
    renderWishlist();
  }

  // Intercept heart button clicks
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('wishlist-btn')) {
      const heartBtn = e.target;
      const id = heartBtn.dataset.product-id || heartBtn.getAttribute('data-product-id');
      
      // Locate sibling/parent context
      const container = heartBtn.closest('.handloom-strip') || heartBtn.closest('.handicrafts-interactive-container');
      if (container) {
        const name = container.querySelector('h3').textContent;
        const priceVal = container.querySelector('.price-val').textContent.replace(/[^\d]/g, '');
        const img = container.querySelector('img').src;
        toggleWishlist(id, name, priceVal, img, heartBtn);
      }
    }
  });

  // Secure checkout triggers live order simulation in Seller Central & Rider
  const btnCheckout = document.getElementById('btn-checkout-prestige');
  btnCheckout.addEventListener('click', () => {
    if (cart.length === 0) return;
    
    showToast('Secure Prestige Checkout Complete! Order locked for courier dispatch.', '💳');
    
    // Simulate incoming order
    const firstItem = cart[0];
    const orderId = 'ORD-' + Math.floor(100 + Math.random() * 900) + '-GI';
    simulateIncomingOrder(orderId, 'Majuli Guild Hub', firstItem.name);

    // Empty cart drawer
    cart = [];
    renderCart();
    closeDrawer(cartDrawer);
  });


  // ==========================================================================
  // 6. SCROLLYTELLING ENGINE (PORSCHE CINEMATOGRAPHIC SCROLLING)
  // ==========================================================================
  const scrollyContainer = document.getElementById('scrollytelling-section');
  const scrollSteps = document.querySelectorAll('.scroll-step');
  const visualLayers = document.querySelectorAll('.visual-layer');

  window.addEventListener('scroll', () => {
    if (!scrollyContainer || !views.consumer.classList.contains('active')) return;

    const containerRect = scrollyContainer.getBoundingClientRect();
    const triggerPoint = window.innerHeight * 0.45;

    if (containerRect.top < window.innerHeight && containerRect.bottom > 0) {
      scrollSteps.forEach((step, idx) => {
        const stepRect = step.getBoundingClientRect();
        
        if (stepRect.top < triggerPoint && stepRect.bottom > triggerPoint) {
          scrollSteps.forEach(s => s.classList.remove('active'));
          step.classList.add('active');

          visualLayers.forEach((layer, lIdx) => {
            if (lIdx === idx) {
              layer.classList.add('active');
            } else {
              layer.classList.remove('active');
            }
          });
        }
      });
    }
  });

  const exploreBtn = document.querySelector('.scroll-trigger');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
      scrollyContainer.scrollIntoView({ behavior: 'smooth' });
    });
  }


  // ==========================================================================
  // 7. THE NE-CONFIGURATOR LOGIC (PORSCHE CONFIGURATOR ADAPTATION)
  // ==========================================================================
  const vesselOptions = document.querySelectorAll('.vessel-option');
  const previewVessel = document.getElementById('preview-base-vessel');
  const selectedBaseName = document.getElementById('selected-base-name');
  const hamperTotalPrice = document.getElementById('hamper-total-price');
  const selectedAddonsCount = document.getElementById('selected-addons-count');
  const configAddons = document.querySelectorAll('.config-addon');

  let basePrice = 450;
  let currentVessel = 'bamboo';

  // Vessel Selection
  vesselOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      vesselOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');

      basePrice = parseInt(opt.dataset.price);
      currentVessel = opt.dataset.vessel;

      // Update base hamper preview image
      previewVessel.src = opt.dataset.img;
      selectedBaseName.textContent = opt.querySelector('h4').textContent + ' Hamper Base';

      calculateHamperTotal();
      showToast(`Selected Base: ${opt.querySelector('h4').textContent}`, '📦');
    });
  });

  // Addon Checkbox toggles
  configAddons.forEach(chk => {
    chk.addEventListener('change', () => {
      const overlayClass = chk.dataset.class;
      const overlayItem = document.getElementById(`overlay-${overlayClass.split('-')[1]}`);
      
      if (chk.checked) {
        overlayItem.classList.add('visible');
      } else {
        overlayItem.classList.remove('visible');
      }

      calculateHamperTotal();
    });
  });

  function calculateHamperTotal() {
    let total = basePrice;
    let count = 0;

    configAddons.forEach(chk => {
      if (chk.checked) {
        total += parseInt(chk.dataset.price);
        count++;
      }
    });

    hamperTotalPrice.textContent = `₹${total.toLocaleString('en-IN')}`;
    selectedAddonsCount.textContent = `${count} item${count !== 1 ? 's' : ''} added`;
  }

  // Add Configured Hamper to Bag
  const btnLockHamper = document.getElementById('btn-lock-hamper');
  if (btnLockHamper) {
    btnLockHamper.addEventListener('click', () => {
      const title = `Configured Hamper: ${selectedBaseName.textContent.replace(' Hamper Base', '')}`;
      const priceText = hamperTotalPrice.textContent.replace(/[^\d]/g, '');
      const img = previewVessel.src;
      
      addToCart('configured-hamper-' + Date.now(), title, priceText, img);
      
      // Auto trigger live notification inside the Vendor Studio!
      simulateIncomingOrder('ORD-880-HAMPR', 'Agartala Guild', title);
    });
  }


  // ==========================================================================
  // 8. HANDICRAFTS 360-DEGREE ROTATION VIEW MODULE
  // ==========================================================================
  const rotatorImg = document.getElementById('rotator-image');
  const rotatorAngleBadge = document.getElementById('rotator-angle');
  const btnRotateLeft = document.getElementById('btn-rotate-left');
  const btnRotateRight = document.getElementById('btn-rotate-right');

  let rotationDegrees = 0; // Cycles: 0, 90, 180, 270

  if (rotatorImg && btnRotateLeft && btnRotateRight) {
    btnRotateRight.addEventListener('click', () => {
      rotationDegrees = (rotationDegrees + 90) % 360;
      applyRotation();
    });

    btnRotateLeft.addEventListener('click', () => {
      rotationDegrees = (rotationDegrees - 90 + 360) % 360;
      applyRotation();
    });
  }

  function applyRotation() {
    rotatorImg.className = `rotated-${rotationDegrees}`;
    
    let label = '0° Front View';
    if (rotationDegrees === 90) label = '90° Side Profile View';
    else if (rotationDegrees === 180) label = '180° Back Weave View';
    else if (rotationDegrees === 270) label = '270° Inside Detail View';

    rotatorAngleBadge.textContent = label;
    showToast(`Rotated piece to ${rotationDegrees}°`, '🔄');
  }


  // ==========================================================================
  // 9. VENDOR APP LISTING CREATION (PRODUCT UPLOADS & BALANCED INV MONITOR)
  // ==========================================================================
  const simulatedUploadBox = document.getElementById('btn-simulate-upload');
  const fileUploadLabel = document.getElementById('upload-file-label');
  const fileUploadPreview = document.getElementById('uploaded-preview-thumbnail');
  
  let simulatedImageSelected = '';

  if (simulatedUploadBox) {
    simulatedUploadBox.addEventListener('click', () => {
      // Simulate photo selection
      const mockImages = [
        { name: 'silk_handloom.png', src: 'images/silk_handloom.png' },
        { name: 'bamboo_craft.png', src: 'images/bamboo_craft.png' },
        { name: 'gifting_hamper.png', src: 'images/gifting_hamper.png' }
      ];

      // Rotate select mock image
      const chosen = mockImages[Math.floor(Math.random() * mockImages.length)];
      simulatedImageSelected = chosen.src;

      fileUploadLabel.textContent = `File attached: ${chosen.name}`;
      fileUploadPreview.src = chosen.src;
      fileUploadPreview.classList.remove('hidden');
      
      showToast('Masterpiece picture attached successfully!', '📸');
    });
  }

  const masterpieceForm = document.getElementById('vendor-upload-form');
  const consumerHandloomsContainer = document.getElementById('consumer-handlooms-list');

  if (masterpieceForm) {
    masterpieceForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const title = document.getElementById('new-product-title').value;
      const price = document.getElementById('new-product-price').value;
      const category = document.getElementById('new-product-category').value;
      const giTag = document.getElementById('new-product-gi').value;
      const desc = document.getElementById('new-product-desc').value;
      const imageSrc = simulatedImageSelected || 'images/bamboo_craft.png';

      const customProductId = 'prod-custom-' + Date.now();

      // Dynamically append listed item into customer UI categories!
      if (category === 'handloom' && consumerHandloomsContainer) {
        const newItem = document.createElement('div');
        newItem.className = 'handloom-strip bg-white shadow-soft';
        newItem.dataset.productId = customProductId;
        newItem.innerHTML = `
          <div class="strip-image">
            <img src="${imageSrc}" alt="${title}">
          </div>
          <div class="strip-details">
            <span class="guild-origin">Majuli Weavers Guild</span>
            <div class="title-with-wishlist">
              <h3>${title}</h3>
              <button class="wishlist-btn" title="Add to Wishlist" data-product-id="${customProductId}">&#9825;</button>
            </div>
            <p class="strip-desc">${desc} [Registry Tag ID: ${giTag}]</p>
            <div class="price-action">
              <span class="price-val">₹${parseInt(price).toLocaleString('en-IN')}</span>
              <button class="btn btn-primary add-to-cart" data-product-id="${customProductId}" data-price="${price}" data-name="${title}" data-img="${imageSrc}">Acquire Drape</button>
            </div>
          </div>
        `;
        consumerHandloomsContainer.insertBefore(newItem, consumerHandloomsContainer.firstChild);
      } else {
        // Appending to handicraft segment
        showToast('Craft masterpiece published to form & details showcase!', '🏺');
      }

      // Add listed item details to seller stock monitor levels
      const invContainer = document.querySelector('.inventory-list');
      if (invContainer) {
        const newInvRow = document.createElement('div');
        newInvRow.className = 'inventory-item';
        newInvRow.innerHTML = `
          <div class="inv-item-details">
            <span class="item-name">${title}</span>
            <span class="item-stock" id="vendor-stock-${customProductId}">5 items in stock</span>
          </div>
          <div class="inv-controls">
            <button class="btn-inv-adjust dec" data-target="${customProductId}">-</button>
            <button class="btn-inv-adjust inc" data-target="${customProductId}">+</button>
          </div>
        `;
        invContainer.insertBefore(newInvRow, invContainer.firstChild);
      }

      showToast(`Success: [${title}] published live to storefront catalog!`, '🚀');

      // Clear Form fields
      masterpieceForm.reset();
      fileUploadLabel.textContent = 'Attach Provenance Image (Click to Select)';
      fileUploadPreview.classList.add('hidden');
      simulatedImageSelected = '';
    });
  }

  // Handle seller stock count increments/decrements
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-inv-adjust')) {
      const btn = e.target;
      const target = btn.dataset.target;
      const stockEl = document.getElementById(`vendor-stock-${target}`);
      if (stockEl) {
        let count = parseInt(stockEl.textContent.match(/\d+/)[0]);
        if (btn.classList.contains('inc')) {
          count++;
        } else if (btn.classList.contains('dec') && count > 0) {
          count--;
        }
        stockEl.textContent = `${count} items in stock`;
        showToast(`Stock levels updated`, '📦');
      }
    }
  });


  // ==========================================================================
  // 10. RIDER APP DOUBLE-VERIFICATION PROTOCOL & STATE SYNC
  // ==========================================================================
  const photoSlots = document.querySelectorAll('.photo-slot[data-slot]');
  const btnRiderPickup = document.getElementById('btn-rider-pickup');
  const btnGeotagHub = document.getElementById('btn-geotag-hub');
  const btnRiderDropoff = document.getElementById('btn-rider-dropoff');
  
  // Consumer state sync elements
  const trackStatusDot = document.getElementById('track-status-dot');
  const trackStatusText = document.getElementById('track-status-text');
  const mapHubMarker = document.getElementById('map-hub-marker');

  // Admin audit elements
  const adminThumb1 = document.getElementById('admin-thumb-1');
  const adminThumb2 = document.getElementById('admin-thumb-2');
  const adminThumb3 = document.getElementById('admin-thumb-3');
  const btnQaRebrand = document.getElementById('btn-qa-rebrand');

  let completedSlots = {
    '1': false,
    '2': false,
    '3': false,
    'drop': false
  };

  photoSlots.forEach(slot => {
    slot.addEventListener('click', () => {
      if (slot.hasAttribute('disabled') || slot.parentElement.classList.contains('text-muted')) return;

      const slotId = slot.dataset.slot;
      const previewImg = slot.querySelector('.slot-preview-img');
      const plusIcon = slot.querySelector('.slot-plus');

      // Populate preview image simulating a premium camera capture
      if (slotId === '1') {
        previewImg.src = 'images/silk_handloom.png';
      } else if (slotId === '2') {
        previewImg.src = 'images/gifting_hamper.png';
      } else if (slotId === '3') {
        previewImg.src = 'images/ne_artisan_logo.png';
      } else if (slotId === 'drop') {
        previewImg.src = 'images/bamboo_craft.png';
      }

      previewImg.classList.remove('hidden');
      if (plusIcon) plusIcon.classList.add('hidden');
      slot.classList.add('completed');
      completedSlots[slotId] = true;

      // Haptic sound/visual simulation
      showToast(`Rider photo verification #${slotId} captured successfully!`, '📸');

      // Sync visual uploads directly into Admin Control Tower Inspection Module!
      if (slotId === '1' && adminThumb1) {
        adminThumb1.src = 'images/silk_handloom.png';
        adminThumb1.classList.remove('grayscale-thumb');
      } else if (slotId === '2' && adminThumb2) {
        adminThumb2.src = 'images/gifting_hamper.png';
        adminThumb2.classList.remove('grayscale-thumb');
      } else if (slotId === '3' && adminThumb3) {
        adminThumb3.src = 'images/ne_artisan_logo.png';
        adminThumb3.classList.remove('grayscale-thumb');
      }

      checkPickupCompletion();
    });
  });

  function checkPickupCompletion() {
    if (completedSlots['1'] && completedSlots['2'] && completedSlots['3']) {
      btnRiderPickup.removeAttribute('disabled');
      showToast('All 3 source provenance photos verified. Activate Pick-Up!', '🚛');
    }
  }

  // Click Pick-Up button -> Sync Status to Consumer UI instantly!
  if (btnRiderPickup) {
    btnRiderPickup.addEventListener('click', () => {
      btnRiderPickup.textContent = 'PICKED UP (Provenance Locked)';
      btnRiderPickup.style.backgroundColor = '#2E7D32';
      btnRiderPickup.setAttribute('disabled', 'true');
      
      // Activate Phase 2 controls
      btnGeotagHub.removeAttribute('disabled');
      
      // STATE SYNC -> CONSUMER UI WIDGET
      if (trackStatusDot) {
        trackStatusDot.className = 'status-marker-dot pulse-green';
        trackStatusText.textContent = 'Package Verified at Source';
        document.querySelector('.map-marker.source').classList.add('active');
      }
      if (mapHubMarker) {
        mapHubMarker.classList.add('active');
      }

      // Admin verification checklist activation
      if (btnQaRebrand) {
        btnQaRebrand.removeAttribute('disabled');
      }

      showToast('Package Verified at Source! Consumer UI tracking map updated.', '✅');
    });
  }

  // Geotag hub button
  if (btnGeotagHub) {
    btnGeotagHub.addEventListener('click', () => {
      btnGeotagHub.textContent = 'Geotag Locked (26.96N, 94.12E)';
      btnGeotagHub.style.backgroundColor = '#2E7D32';
      btnGeotagHub.setAttribute('disabled', 'true');

      // Enable drop-off photo slot
      const dropSlot = document.getElementById('photo-slot-drop');
      if (dropSlot) {
        dropSlot.removeAttribute('disabled');
        // Unmute the phase 2 text visual
        const phaseTitle = document.querySelector('#phase-dropoff .phase-title');
        if (phaseTitle) phaseTitle.classList.remove('text-muted');
      }
      
      showToast('Geotag locked at QA Hub coordinates.', '📍');
    });
  }

  // Click Dropoff slot -> Complete logistical run
  const dropSlot = document.getElementById('photo-slot-drop');
  if (dropSlot) {
    dropSlot.addEventListener('click', () => {
      if (dropSlot.hasAttribute('disabled')) return;
      
      // Enable complete button
      if (btnRiderDropoff) {
        btnRiderDropoff.removeAttribute('disabled');
      }
    });
  }

  if (btnRiderDropoff) {
    btnRiderDropoff.addEventListener('click', () => {
      btnRiderDropoff.textContent = 'LOGISTICS RUN COMPLETED';
      btnRiderDropoff.style.backgroundColor = '#2E7D32';
      btnRiderDropoff.setAttribute('disabled', 'true');

      // Update Consumer UI State Tracker
      if (trackStatusText) {
        trackStatusText.textContent = 'Verified & Delivered';
        document.querySelector('.map-marker.dest').classList.add('active');
      }

      // Credit wallet
      const walletAmt = document.querySelector('.earnings-amount');
      if (walletAmt) walletAmt.textContent = '₹1,540.50';

      showToast('Trip successfully completed. Earnings credited to wallet!', '🏁');
    });
  }


  // ==========================================================================
  // 11. QA INSPECTION AUDIT GATEWAYS & CONTROL TOWER MODULE
  // ==========================================================================
  const gatewayTiles = document.querySelectorAll('.gateway-tile');
  const gatewayScreen = document.getElementById('qa-gateway-screen');
  const auditPanel = document.getElementById('qa-audit-container');
  const activeGatewayTitle = document.getElementById('active-gateway-title');
  const btnBackGateway = document.getElementById('btn-back-gateway');
  
  const subDashboards = {
    consumer: document.getElementById('qa-sub-consumer'),
    vendor: document.getElementById('qa-sub-vendor'),
    rider: document.getElementById('qa-sub-rider')
  };

  gatewayTiles.forEach(tile => {
    tile.addEventListener('click', () => {
      const segment = tile.dataset.gateway;
      
      // Set panel title badge
      if (segment === 'consumer') {
        activeGatewayTitle.textContent = 'Storefront Catalog & Specials Overseer';
      } else if (segment === 'vendor') {
        activeGatewayTitle.textContent = 'Sovereign Weaving Guilds Central Auditor';
      } else if (segment === 'rider') {
        activeGatewayTitle.textContent = 'Ecosystem Provenance & Geotag Registry';
      }

      // Hide gateway tiles screen, display active panel
      gatewayScreen.classList.remove('active-panel');
      auditPanel.classList.add('active-panel');

      // Active selected module sub-dashboard only
      Object.keys(subDashboards).forEach(key => {
        if (key === segment) {
          subDashboards[key].classList.add('active');
        } else {
          subDashboards[key].classList.remove('active');
        }
      });

      showToast(`Audit gate opened for: ${segment.toUpperCase()}`, '🛡️');
    });
  });

  if (btnBackGateway) {
    btnBackGateway.addEventListener('click', () => {
      auditPanel.classList.remove('active-panel');
      gatewayScreen.classList.add('active-panel');
      showToast('Back to inspection gateways selection panel', '🛡️');
    });
  }

  // Apply dispatch seal approval
  if (btnQaRebrand) {
    btnQaRebrand.addEventListener('click', () => {
      if (!completedSlots['1']) {
        showToast('Error: Awaiting Rider provenance photos before QA seal!', '❌');
        return;
      }

      btnQaRebrand.textContent = 'Dispatch Seal Approved';
      btnQaRebrand.style.backgroundColor = '#2E7D32';
      btnQaRebrand.setAttribute('disabled', 'true');

      // Update Admin statistics
      const ordersStat = document.getElementById('stats-active-orders');
      if (ordersStat) ordersStat.textContent = '1 Order (In Dispatch)';

      showToast('Sovereign Hub authentic seal applied. Package released for premium flight cargo!', '🛡️');
    });
  }


  // ==========================================================================
  // 12. PLATFORM OVERRIDE CONTROL LOGIC
  // ==========================================================================
  const btnOverrideStock = document.getElementById('btn-override-stock');
  const btnOverrideGi = document.getElementById('btn-override-gi');
  const btnOverridePrice = document.getElementById('btn-override-price');

  // Input overrides
  const mugaStockInput = document.getElementById('override-muga-stock');
  const giTextInput = document.getElementById('override-gi-text');
  const mugaPriceInput = document.getElementById('override-muga-price');

  // Target Consumer/Vendor text elements to instantly mutate
  const vendorMugaStockText = document.getElementById('vendor-stock-muga');
  const consumerGiText = document.getElementById('product-description-gi');
  const consumerMugaPriceText = document.getElementById('product-price-gi');

  if (btnOverrideStock) {
    btnOverrideStock.addEventListener('click', () => {
      const newVal = mugaStockInput.value;
      if (vendorMugaStockText) {
        vendorMugaStockText.textContent = `${newVal} items in stock`;
        vendorMugaStockText.style.color = '#B05E3C';
        vendorMugaStockText.style.fontWeight = 'bold';
      }
      showToast(`Control Tower Override: Adjusted Muga Silk Stock to ${newVal}!`, '🛡️');
    });
  }

  if (btnOverrideGi) {
    btnOverrideGi.addEventListener('click', () => {
      const newVal = giTextInput.value;
      if (consumerGiText) {
        consumerGiText.textContent = newVal;
        consumerGiText.style.color = '#B05E3C';
      }
      showToast('Control Tower Override: Adjusted Consumer Specials Description!', '🛡️');
    });
  }

  if (btnOverridePrice) {
    btnOverridePrice.addEventListener('click', () => {
      const newVal = parseInt(mugaPriceInput.value);
      if (consumerMugaPriceText) {
        consumerMugaPriceText.textContent = `₹${newVal.toLocaleString('en-IN')}`;
        consumerMugaPriceText.style.color = '#B05E3C';
      }
      showToast(`Control Tower Override: Adjusted Muga Mekhela Price to ₹${newVal.toLocaleString('en-IN')}!`, '🛡️');
    });
  }


  // ==========================================================================
  // 13. REAL-TIME SIMULATE ORDER ALERTS FEED
  // ==========================================================================
  function simulateIncomingOrder(orderId, guild, productName) {
    const notifyBox = document.getElementById('vendor-order-notify');
    const manifestTable = document.getElementById('manifest-table-body');
    const activeOrdersStat = document.getElementById('stats-active-orders');
    const pendingBadge = document.getElementById('vendor-pending-badge');

    if (notifyBox) {
      notifyBox.innerHTML = `<span class="pulse-red-glow"></span><span>Live Alert: ${orderId}</span>`;
      notifyBox.style.backgroundColor = 'rgba(211, 47, 47, 0.15)';
      notifyBox.style.borderColor = 'rgba(211, 47, 47, 0.6)';
      notifyBox.style.color = '#D32F2F';
    }

    if (pendingBadge) {
      pendingBadge.textContent = '2';
    }

    // Add row to Rider Manifest Table in Vendor Console
    if (manifestTable) {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td class="font-bold">${orderId}</td>
        <td>Delhi, IN</td>
        <td>Dipankar Gogoi</td>
        <td>NE-MUGA-902</td>
        <td><span class="status-pill status-pill-yellow">Pending Pick-up</span></td>
      `;
      manifestTable.insertBefore(newRow, manifestTable.firstChild);
    }

    // Update global Admin Stats count
    if (activeOrdersStat) {
      activeOrdersStat.textContent = '3 Orders';
    }
  }

  // Deals countdown timer
  let countdownTime = 8 * 3600 + 14 * 60 + 42; 
  const hoursVal = document.getElementById('hours');
  const minutesVal = document.getElementById('minutes');
  const secondsVal = document.getElementById('seconds');

  function updateCountdown() {
    if (countdownTime <= 0) {
      countdownTime = 8 * 3600 + 14 * 60;
    } else {
      countdownTime--;
    }

    const hrs = Math.floor(countdownTime / 3600);
    const mins = Math.floor((countdownTime % 3600) / 60);
    const secs = countdownTime % 60;

    if (hoursVal) hoursVal.textContent = hrs.toString().padStart(2, '0');
    if (minutesVal) minutesVal.textContent = mins.toString().padStart(2, '0');
    if (secondsVal) secondsVal.textContent = secs.toString().padStart(2, '0');
  }

  setInterval(updateCountdown, 1000);

});
