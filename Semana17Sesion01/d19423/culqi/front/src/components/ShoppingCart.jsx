import React from 'react';

export default function ShoppingCart({ 
  isOpen, 
  cart, 
  onClose, 
  onUpdateQty, 
  onRemoveItem, 
  onCheckout, 
  checkoutLoading, 
  checkoutError 
}) {
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const formatPrice = (priceInCents) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(priceInCents / 100);
  };

  const handleQtyChange = (id, change) => {
    const item = cart.find(p => p.id === id);
    if (item) {
      const newQty = item.quantity + change;
      if (newQty > 0) {
        onUpdateQty({ id, quantity: newQty });
      }
    }
  };

  return (
    <div className={`cart-backdrop ${isOpen ? 'open' : ''}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="cart-drawer">
        <div className="cart-header">
          <h2 className="cart-title">Tu Carrito</h2>
          <button onClick={onClose} className="btn-close">&times;</button>
        </div>

        {/* Cart Items */}
        <div className="cart-items-container">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
              </div>
              <p>Tu carrito está vacío</p>
              <button onClick={onClose} className="btn-secondary" style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                Continuar Explorando
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4 className="cart-item-name">{item.name}</h4>
                  <span className="cart-item-price">{formatPrice(item.price)}</span>
                  <div className="cart-item-controls">
                    <button onClick={() => handleQtyChange(item.id, -1)} className="btn-qty">-</button>
                    <span className="qty-val">{item.quantity}</span>
                    <button onClick={() => handleQtyChange(item.id, 1)} className="btn-qty">+</button>
                  </div>
                </div>
                <button onClick={() => onRemoveItem(item.id)} className="btn-remove" title="Eliminar artículo">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Checkout Error */}
        {checkoutError && (
          <div className="checkout-error-banner">
            {checkoutError}
          </div>
        )}

        {/* Cart Footer */}
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary-line">
              <span>Subtotal</span>
              <span className="cart-total-price">{formatPrice(cartTotal)}</span>
            </div>
            <button 
              onClick={onCheckout} 
              disabled={checkoutLoading} 
              className="btn-checkout"
            >
              {checkoutLoading ? (
                <span>
                  <span className="spinner-small"></span>
                  Procesando...
                </span>
              ) : (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Proceder al Pago
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
