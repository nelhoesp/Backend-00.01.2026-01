<template>
  <div class="app-container">
    <!-- Header -->
    <header class="header-glass">
      <div class="brand" @click="navigateTo('catalog')">
        <div class="brand-logo">V</div>
        <span class="brand-name">VELOCE</span>
      </div>

      <button @click="isCartOpen = true" class="cart-trigger">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
        <span>Carrito</span>
        <span v-if="cartItemCount > 0" class="cart-badge">{{ cartItemCount }}</span>
      </button>
    </header>

    <!-- Main Views -->
    <main class="main-content">
      <ProductCatalog 
        v-if="currentView === 'catalog'" 
        @add-to-cart="addToCart" 
      />
      <SuccessView 
        v-else-if="currentView === 'success'" 
        @navigate="navigateTo" 
      />
      <CancelView 
        v-else-if="currentView === 'cancel'" 
        @navigate="navigateTo" 
      />
    </main>

    <!-- Shopping Cart Drawer -->
    <ShoppingCart 
      :is-open="isCartOpen" 
      :cart="cart" 
      @close="isCartOpen = false" 
      @update-qty="updateQty"
      @remove-item="removeItem"
    />

    <!-- Footer -->
    <footer>
      <p>&copy; 2026 VELOCE Premium E-commerce. Todos los derechos reservados.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import ProductCatalog from './components/ProductCatalog.vue';
import ShoppingCart from './components/ShoppingCart.vue';
import SuccessView from './components/SuccessView.vue';
import CancelView from './components/CancelView.vue';

const currentView = ref('catalog');
const isCartOpen = ref(false);
const cart = ref([]);

// Load cart from localStorage and determine view based on URL pathname
onMounted(() => {
  const savedCart = localStorage.getItem('veloce_cart');
  if (savedCart) {
    try {
      cart.value = JSON.parse(savedCart);
    } catch (e) {
      console.error('Error parsing saved cart:', e);
    }
  }

  const path = window.location.pathname;
  if (path === '/success') {
    currentView.value = 'success';
    // Success: clear cart state and cache
    cart.value = [];
    localStorage.removeItem('veloce_cart');
  } else if (path === '/cancel') {
    currentView.value = 'cancel';
    // Cancel: keep cart items so user can try again
  } else {
    currentView.value = 'catalog';
  }
});

// Total number of items in the cart
const cartItemCount = computed(() => {
  return cart.value.reduce((total, item) => total + item.quantity, 0);
});

// Helper to save cart state to localStorage
const saveCart = () => {
  localStorage.setItem('veloce_cart', JSON.stringify(cart.value));
};

// Add product to cart
const addToCart = (product) => {
  const existingItem = cart.value.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.value.push({
      ...product,
      quantity: 1
    });
  }
  saveCart();
  // Open cart drawer when a new item is added for better UX
  isCartOpen.value = true;
};

// Update item quantity
const updateQty = ({ id, quantity }) => {
  const item = cart.value.find(item => item.id === id);
  if (item) {
    item.quantity = quantity;
    saveCart();
  }
};

// Remove item from cart
const removeItem = (id) => {
  cart.value = cart.value.filter(item => item.id !== id);
  saveCart();
};

// Custom SPA routing/navigation
const navigateTo = (view) => {
  currentView.value = view;
  // Clear the path on success/cancel back transition to catalog
  if (view === 'catalog') {
    window.history.pushState({}, '', '/');
  }
};
</script>
