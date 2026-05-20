<template>
  <div class="cart-backdrop" :class="{ open: isOpen }" @click.self="$emit('close')">
    <div class="cart-drawer">
      <div class="cart-header">
        <h2 class="cart-title">Tu Carrito</h2>
        <button @click="$emit('close')" class="btn-close">&times;</button>
      </div>

      <!-- Cart Items -->
      <div class="cart-items-container">
        <div v-if="cart.length === 0" class="cart-empty">
          <div class="cart-empty-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          </div>
          <p>Tu carrito está vacío</p>
          <button @click="$emit('close')" class="btn-secondary" style="margin-top: 1rem; font-size: 0.9rem;">
            Continuar Explorando
          </button>
        </div>

        <div v-else v-for="item in cart" :key="item.id" class="cart-item">
          <img :src="item.image" :alt="item.name" class="cart-item-image" />
          <div class="cart-item-details">
            <h4 class="cart-item-name">{{ item.name }}</h4>
            <span class="cart-item-price">{{ formatPrice(item.price) }}</span>
            <div class="cart-item-controls">
              <button @click="updateQty(item.id, -1)" class="btn-qty">-</button>
              <span class="qty-val">{{ item.quantity }}</span>
              <button @click="updateQty(item.id, 1)" class="btn-qty">+</button>
            </div>
          </div>
          <button @click="$emit('remove-item', item.id)" class="btn-remove" title="Eliminar artículo">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
          </button>
        </div>
      </div>

      <!-- Checkout Error Toast -->
      <div v-if="checkoutError" class="checkout-error-banner">
        {{ checkoutError }}
      </div>

      <!-- Cart Footer -->
      <div class="cart-footer" v-if="cart.length > 0">
        <div class="cart-summary-line">
          <span>Subtotal</span>
          <span class="cart-total-price">{{ formatPrice(cartTotal) }}</span>
        </div>
        <button 
          @click="checkout" 
          :disabled="checkoutLoading" 
          class="btn-checkout"
        >
          <span v-if="checkoutLoading">
            <span class="spinner-small"></span>
            Procesando...
          </span>
          <span v-else style="display: flex; align-items: center; gap: 0.5rem;">
            Proceder al Pago
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  cart: Array
});

const emit = defineEmits(['close', 'update-qty', 'remove-item']);

const checkoutLoading = ref(false);
const checkoutError = ref(null);

const cartTotal = computed(() => {
  return props.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
});

const formatPrice = (priceInCents) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(priceInCents / 100);
};

const updateQty = (id, change) => {
  const item = props.cart.find(p => p.id === id);
  if (item) {
    const newQty = item.quantity + change;
    if (newQty > 0) {
      emit('update-qty', { id, quantity: newQty });
    }
  }
};

const checkout = async () => {
  checkoutLoading.value = true;
  checkoutError.value = null;

  try {
    const response = await fetch('http://localhost:3000/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cartItems: props.cart.map(item => ({
          id: item.id,
          quantity: item.quantity
        }))
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Fallo en la comunicación con el servidor.');
    }

    const data = await response.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error('No se recibió la URL de redirección del pago.');
    }
  } catch (err) {
    console.error('Checkout error:', err);
    checkoutError.value = err.message || 'Error al iniciar el checkout con Stripe.';
  } finally {
    checkoutLoading.value = false;
  }
};
</script>

<style scoped>
.spinner-small {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  vertical-align: middle;
  margin-right: 0.5rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.checkout-error-banner {
  background: rgba(244, 63, 94, 0.15);
  border-top: 1px solid rgba(244, 63, 94, 0.3);
  border-bottom: 1px solid rgba(244, 63, 94, 0.3);
  color: #fecdd3;
  padding: 0.75rem 2rem;
  font-size: 0.85rem;
  text-align: center;
}
</style>
