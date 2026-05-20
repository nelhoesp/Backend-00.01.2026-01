<template>
  <div>
    <h1 class="section-title">Colección Exclusiva</h1>
    <p class="section-subtitle">Descubre productos premium diseñados para elevar tu estilo de vida cotidiano.</p>

    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p>Cargando productos...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-container">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      <p>{{ error }}</p>
      <button @click="fetchProducts" class="btn-secondary" style="margin-top: 1rem;">Reintentar</button>
    </div>

    <!-- Product Grid -->
    <div v-else class="product-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <div class="product-image-container">
          <img :src="product.image" :alt="product.name" class="product-image" />
        </div>
        <div class="product-info">
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-desc">{{ product.description }}</p>
          <div class="product-meta">
            <span class="product-price">{{ formatPrice(product.price) }}</span>
            <button @click="$emit('add-to-cart', product)" class="btn-add-to-cart">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
              Añadir
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

defineEmits(['add-to-cart']);

const products = ref([]);
const loading = ref(true);
const error = ref(null);

const formatPrice = (priceInCents) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(priceInCents / 100);
};

const fetchProducts = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await fetch('http://localhost:3000/api/products');
    if (!response.ok) {
      throw new Error('No se pudieron obtener los productos del servidor.');
    }
    products.value = await response.json();
  } catch (err) {
    console.error('Error fetching products:', err);
    error.value = 'Error al conectar con el servidor. Por favor asegúrate de que el backend está corriendo.';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 0;
  color: var(--text-secondary);
  gap: 1.5rem;
}

.spinner {
  width: 3rem;
  height: 3rem;
  border: 3px solid rgba(139, 92, 246, 0.15);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 2rem;
  background: rgba(244, 63, 94, 0.05);
  border: 1px solid rgba(244, 63, 94, 0.15);
  border-radius: 20px;
  color: var(--text-secondary);
  max-width: 500px;
  margin: 2rem auto;
  gap: 1rem;
}

.error-container svg {
  color: var(--color-error);
}
</style>
