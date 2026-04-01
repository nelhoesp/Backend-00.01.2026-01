const router = require('express').Router();
const asyncHandler = require('../utils/asyncHandler');
const apiKey = require('../middlewares/apiKey');
const controller = require('../controllers/ticket.controller');


//Rutas Protegidas

router.post('/', apiKey, asyncHandler(controller.createTicket));

module.exports = router;