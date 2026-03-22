const controller = require('../controllers/auth.controller');
const authRouter = require('express').Router();

authRouter.post('/login', controller.login);

module.exports = { authRouter };
