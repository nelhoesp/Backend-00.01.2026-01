import React, { useState, useEffect, useRef } from 'react';
import ProductCatalog from './components/ProductCatalog';
import ShoppingCart from './components/ShoppingCart';
import SuccessView from './components/SuccessView';
import CancelView from './components/CancelView';

export default function App() {
  const [view, setView] = useState('catalog');
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [publicKey, setPublicKey] = useState('pk_test_placeholder_key');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);
  const [isMock, setIsMock] = useState(false);

  // Keep a reference to the latest cart items to avoid React closure stale state issues
  const cartRef = useRef(cart);
  useEffect(() => {
    cartRef.current = cart;
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Fetch Culqi configuration on mount
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/config');
        if (response.ok) {
          const data = await response.json();
          setPublicKey(data.publicKey);
        }
      } catch (err) {
        console.error('Error fetching public key config:', err);
      }
    };
    fetchConfig();

    // Bind Culqi Checkout callback to the window object
    window.culqi = async () => {
      if (window.Culqi && window.Culqi.token) {
        const token = window.Culqi.token.id;
        const email = window.Culqi.token.email;

        // Close the Culqi checkout modal
        window.Culqi.close();
        
        setCheckoutLoading(true);
        setCheckoutError(null);

        try {
          const res = await fetch('http://localhost:3000/api/process-charge', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              token,
              email,
              cartItems: cartRef.current
            })
          });

          const data = await res.json();

          if (res.ok && data.success) {
            setIsMock(!!data.mock);
            setCart([]); // Clear cart after success
            setView('success');
            setIsCartOpen(false);
          } else {
            console.error('Payment processing failed on backend:', data.error);
            setCheckoutError(data.error || 'Fallo en la comunicación con la pasarela.');
            setView('cancel');
            setIsCartOpen(false);
          }
        } catch (error) {
          console.error('Network error during checkout:', error);
          setCheckoutError('Error de red. No se pudo procesar la transacción.');
          setView('cancel');
          setIsCartOpen(false);
        } finally {
          setCheckoutLoading(false);
        }
      } else if (window.Culqi && window.Culqi.error) {
        console.error('Culqi tokenize error:', window.Culqi.error);
        alert(window.Culqi.error.user_message || 'No se pudo validar la tarjeta de pago.');
        setCheckoutLoading(false);
      }
    };
  }, []);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQty = ({ id, quantity }) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    if (!window.Culqi) {
      alert('La librería Culqi no se cargó correctamente. Por favor recarga la página.');
      return;
    }

    const totalCents = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Initialize Culqi Checkout
    window.Culqi.publicKey = publicKey;
    window.Culqi.settings({
      title: 'VELOCE',
      currency: 'USD',
      amount: totalCents,
      description: 'Compra en Veloce Premium Store'
    });

    window.Culqi.options({
      lang: 'auto',
      installments: false,
      modal: true
    });

    window.Culqi.open();
  };

  const handleNavigate = (newView) => {
    setView(newView);
    if (newView === 'catalog') {
      setCheckoutError(null);
    }
  };

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="app-container">
      {/* Premium Header */}
      <header className="header-glass">
        <a href="#" className="brand" onClick={(e) => { e.preventDefault(); handleNavigate('catalog'); }}>
          <div className="brand-logo">V</div>
          <span className="brand-name">VELOCE</span>
        </a>
        
        {view === 'catalog' && (
          <button className="cart-trigger" onClick={() => setIsCartOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            <span>Carrito</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        )}
      </header>

      {/* Main Content */}
      <main className="main-content">
        {view === 'catalog' && (
          <ProductCatalog onAddToCart={handleAddToCart} />
        )}
        
        {view === 'success' && (
          <SuccessView onNavigate={handleNavigate} isMock={isMock} />
        )}

        {view === 'cancel' && (
          <CancelView onNavigate={handleNavigate} />
        )}
      </main>

      {/* Cart Drawer */}
      <ShoppingCart
        isOpen={isCartOpen}
        cart={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
        checkoutLoading={checkoutLoading}
        checkoutError={checkoutError}
      />

      {/* Footer */}
      <footer>
        <p>&copy; {new Date().getFullYear()} Veloce Store. Todos los derechos reservados. Desarrollado con React y Culqi.</p>
      </footer>
    </div>
  );
}
