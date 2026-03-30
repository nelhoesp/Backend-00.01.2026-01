const router =  require('express').Router();
const controller = require('../controllers/author.controller');

router.post('/', controller.create);
router.get('/',controller.get);
router.get('/:id',controller.getById)
router.put('/:id',controller.put)
router.delete('/:id',controller.delete)


module.exports = router;