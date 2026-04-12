// ============================================================
//  NutriCore — Core App Logic
//  Cart (localStorage) · Navigation · Toast · Shared utils
// ============================================================

// ── Cart ─────────────────────────────────────────────────────
const Cart = (() => {
  const KEY = 'nutricore_cart';

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch { return []; }
  }
  function save(items) { localStorage.setItem(KEY, JSON.stringify(items)); }

  function getItems() { return load(); }

  function addItem(product, variant, isSubscription = false) {
    const items = load();
    const existIdx = items.findIndex(i => i.variantId === variant.id && i.isSubscription === isSubscription);

    if (existIdx >= 0) {
      items[existIdx].qty += 1;
    } else {
      const basePrice   = variant.price;
      const finalPrice  = isSubscription ? +(basePrice * 0.85).toFixed(2) : basePrice;
      items.push({
        id:             `${variant.id}-${isSubscription ? 'sub' : 'once'}-${Date.now()}`,
        productId:      product.id,
        variantId:      variant.id,
        name:           product.name,
        variantLabel:   variant.label,
        icon:           getProductIcon(product.id),
        qty:            1,
        unitPrice:      finalPrice,
        originalPrice:  basePrice,
        isSubscription,
      });
    }
    save(items);
    updateCartBadge();
    return items;
  }

  function removeItem(itemId) {
    const items = load().filter(i => i.id !== itemId);
    save(items);
    updateCartBadge();
    return items;
  }

  function updateQty(itemId, delta) {
    const items = load();
    const idx   = items.findIndex(i => i.id === itemId);
    if (idx < 0) return items;
    items[idx].qty = Math.max(1, items[idx].qty + delta);
    save(items);
    updateCartBadge();
    return items;
  }

  function clear() { save([]); updateCartBadge(); }

  function getTotal() {
    return load().reduce((sum, i) => sum + i.unitPrice * i.qty, 0);
  }

  function getCount() {
    return load().reduce((sum, i) => sum + i.qty, 0);
  }

  return { getItems, addItem, removeItem, updateQty, clear, getTotal, getCount };
})();

// ── Update cart badge in header ──────────────────────────────
function updateCartBadge() {
  const badge = document.getElementById('cart-count');
  if (!badge) return;
  const n = Cart.getCount();
  badge.textContent = n;
  badge.style.display = n > 0 ? 'inline-flex' : 'none';
}

// ── Product icon map ─────────────────────────────────────────
function getProductIcon(productId) {
  const map = {
    'thermofire-pro':    '🔥',
    'slimburn-elite':    '💫',
    'cutlean-max':       '⚡',
    'aquadetox-plus':    '💧',
    'drainfit-bio':      '🌿',
    'satia-control':     '🎯',
    'energyx-daily':     '☀️',
    'nightburn-advanced':'🌙',
  };
  return map[productId] || '💊';
}

// ── Category label map ───────────────────────────────────────
function getCategoryLabel(catId) {
  const map = {
    burners:   'Brûleurs de graisse',
    drainants: 'Drainants & Détox',
    appetite:  'Coupe-Faim',
    booster:   'Boosters Énergie',
  };
  return map[catId] || catId;
}

// ── Stars HTML ───────────────────────────────────────────────
function starsHTML(rating) {
  let html = '<div class="stars">';
  for (let i = 1; i <= 5; i++) {
    html += `<span class="star ${i <= Math.round(rating) ? 'filled' : 'empty'}">★</span>`;
  }
  html += '</div>';
  return html;
}

// ── Toast ────────────────────────────────────────────────────
function showToast(icon, title, subtitle = '') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <div class="toast-text">
      <strong>${title}</strong>
      ${subtitle ? subtitle : ''}
    </div>`;
  container.appendChild(el);

  setTimeout(() => {
    el.classList.add('removing');
    el.addEventListener('animationend', () => el.remove());
  }, 3000);
}

// ── Format price ─────────────────────────────────────────────
function fmtPrice(p) {
  return p.toFixed(2).replace('.', ',') + ' €';
}

// ── Run on every page ────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();

  // Mobile nav toggle
  const burger  = document.getElementById('burger');
  const mobileNav = document.getElementById('mobile-nav');
  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });
  }

  // Highlight active nav link
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
});
