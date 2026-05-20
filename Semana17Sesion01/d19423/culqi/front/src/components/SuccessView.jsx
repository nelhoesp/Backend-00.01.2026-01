import React from 'react';

export default function SuccessView({ onNavigate, isMock }) {
  return (
    <div className="feedback-view">
      <div className="feedback-icon success">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
      </div>
      <h2 className="feedback-title">¡Pago Completado!</h2>
      <p className="feedback-message">
        Muchas gracias por tu compra. Tu pedido está siendo procesado y recibirás un correo de confirmación a la brevedad.
      </p>
      
      <button onClick={() => onNavigate('catalog')} className="btn-secondary">
        Volver a la Tienda
      </button>

      {isMock && (
        <div className="mock-warning-banner">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="15"/><line x1="12" y1="19" x2="12.01" y2="19"/></svg>
          <span><strong>Pago Simulado:</strong> El backend no tiene configurada una clave secreta de Culqi.</span>
        </div>
      )}
    </div>
  );
}
