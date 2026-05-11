const express = require('express');
const session = require('express-session');
const passport = require('./controllers/authController');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const initializeSocket = require('./sockets/paymentSocket');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});

app.set('io', io);
initializeSocket(io);

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', require('./routes/auth'));
app.use('/products', require('./routes/products'));
app.use('/payments', require('./routes/payments'));

app.get('/', (req, res) => {
    res.json({ message: 'Payment System API' });
});

app.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ user: req.user, message: 'Welcome to your dashboard' });
    } else {
        res.status(401).json({ error: 'Not authenticated' });
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});