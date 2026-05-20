const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

// Initialize Stripe if secret key is provided
let stripe = null;
if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY.trim() !== '') {
  stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  console.log('Stripe initialized successfully.');
} else {
  console.warn('WARNING: STRIPE_SECRET_KEY is empty or not defined in .env. Checkout functionality will return mock success/error endpoints.');
}

// Middleware
app.use(cors({
  origin: clientUrl,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Mock Products Database
const products = [
  {
    id: 1,
    name: 'AeroVolt X1 Sneakers',
    price: 12900, // in cents ($129.00)
    description: 'Next-gen running shoes with reactive cushioning and breathable mesh.',
    image: '/images/sneakers.png'
  },
  {
    id: 2,
    name: 'Chronos Smartwatch Elite',
    price: 24900, // in cents ($249.00)
    description: 'Sleek titanium smartwatch featuring advanced wellness tracking and 7-day battery life.',
    image: '/images/smartwatch.png'
  },
  {
    id: 3,
    name: 'Sonos Aura Wireless Headphones',
    price: 34900, // in cents ($349.00)
    description: 'Immersive active noise-canceling headphones with spatial audio and pure sound fidelity.',
    image: '/images/headphones.png'
  },
  {
    id: 4,
    name: 'Eclipse Designer Sunglasses',
    price: 8900, // in cents ($89.00)
    description: 'Handcrafted polarized acetate sunglasses with complete UV protection and timeless style.',
    image: '/images/sunglasses.png'
  },
  {
    id: 5,
    name: 'Aviator Designer Sunglasses',
    price: 7999, // in cents ($89.00)
    description: 'Handcrafted polarized acetate sunglasses with complete UV protection and timeless style.',
    image: '/images/sunglasses.png'
  }
];

// Endpoints
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { cartItems } = req.body;

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty or invalid.' });
    }

    // Map items securely. Don't trust prices or details from the client.
    const line_items = [];
    for (const item of cartItems) {
      const dbProduct = products.find(p => p.id === item.id);
      if (!dbProduct) {
        return res.status(404).json({ error: `Product with ID ${item.id} not found.` });
      }
      
      line_items.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: dbProduct.name,
            description: dbProduct.description,
          },
          unit_amount: dbProduct.price,
        },
        quantity: item.quantity,
      });
    }

    // If Stripe is not configured, simulate checkout success redirection for testing/demo
    if (!stripe) {
      console.log('Stripe is not configured. Simulating mock checkout redirect...');
      // Return a simulated checkout URL which redirects to our own frontend success page
      return res.json({ 
        url: `${clientUrl}/success?mock=true`,
        warning: 'STRIPE_SECRET_KEY is missing. This is a simulated checkout.' 
      });
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${clientUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${clientUrl}/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating Stripe Checkout Session:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
