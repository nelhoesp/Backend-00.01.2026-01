const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

const culqiSecretKey = process.env.CULQI_SECRET_KEY;
const culqiPublicKey = process.env.CULQI_PUBLIC_KEY;

if (culqiSecretKey && culqiSecretKey.trim() !== '') {
  console.log('Culqi secret key loaded.');
} else {
  console.warn('WARNING: CULQI_SECRET_KEY is empty or not defined in .env. Charges will be simulated for testing.');
}

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || origin.startsWith('http://localhost:')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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
  }
];

// Endpoints
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Endpoint to fetch public key for frontend checkout
app.get('/api/config', (req, res) => {
  res.json({
    publicKey: culqiPublicKey || 'pk_test_placeholder_key'
  });
});

app.post('/api/process-charge', async (req, res) => {
  try {
    const { token, email, cartItems } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Culqi token is required.' });
    }
    if (!email) {
      return res.status(400).json({ error: 'Email is required.' });
    }
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty or invalid.' });
    }

    // Calculate total securely on the server
    let amount = 0;
    for (const item of cartItems) {
      const dbProduct = products.find(p => p.id === item.id);
      if (!dbProduct) {
        return res.status(404).json({ error: `Product with ID ${item.id} not found.` });
      }
      amount += dbProduct.price * item.quantity;
    }

    // Simulate charge if Culqi Secret Key is not configured
    if (!culqiSecretKey || culqiSecretKey.trim() === '') {
      console.log(`[SIMULATED PAY] Processing charge for ${email}. Amount: $${amount/100} USD (token: ${token})`);
      return res.json({
        success: true,
        message: 'Payment processed successfully (Simulated mode).',
        mock: true,
        charge: {
          id: 'chr_test_' + Math.random().toString(36).substr(2, 9),
          amount: amount,
          currency_code: 'USD',
          email: email
        }
      });
    }

    // Perform real request to Culqi Charges API
    console.log(`[REAL PAY] Sending charge to Culqi for ${email}. Amount: $${amount/100} USD`);
    const response = await fetch('https://api.culqi.com/v2/charges', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${culqiSecretKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: amount,
        currency_code: 'USD',
        email: email,
        source_id: token
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Culqi payment failure:', data);
      return res.status(400).json({
        error: data.user_message || data.merchant_message || 'Payment processing failed on Culqi.'
      });
    }

    console.log('Culqi payment success:', data.id);
    res.json({
      success: true,
      charge: data
    });

  } catch (error) {
    console.error('Error processing Culqi charge:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
