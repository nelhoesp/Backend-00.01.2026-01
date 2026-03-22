require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { where } = require('sequelize');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscando usuario
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Comparando password
        const isValid = await bcrypt.compare(password, user.passwordHash);

        if (!isValid) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Generando token
        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en login' });
    }
};

