import React, { useState, useEffect } from 'react';

export default function ProductCatalog({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatPrice = (priceInCents) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(priceInCents / 100);
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/api/products');
      if (!response.ok) {
        throw new Error('No se pudieron obtener los productos del servidor.');
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Error al conectar con el servidor. Por favor asegúrate de que el backend está corriendo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className="section-title">Colección Exclusiva</h1>
      <p className="section-subtitle">Descubre productos premium diseñados para elevar tu estilo de vida cotidiano.</p>

      {/* Loading State */}
      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando productos...</p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="error-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <p>{error}</p>
          <button onClick={fetchProducts} className="btn-secondary" style={{ marginTop: '1rem' }}>Reintentar</button>
        </div>
      )}

      {/* Product Grid */}
      {!loading && !error && (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-desc">{product.description}</p>
                <div className="product-meta">
                  <span className="product-price">{formatPrice(product.price)}</span>
                  <button onClick={() => onAddToCart(product)} className="btn-add-to-cart">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                    Añadir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
