const express = require('express');
const productionController = require('../controllers/productionController');

const router = express.Router();

router.get('/', productionController.getAll);
router.get('/summary', productionController.getSummary);
router.get('/total', productionController.getTotal);
router.get('/:id', productionController.getById);
router.post('/', productionController.create);
router.delete('/:id', productionController.delete);

module.exports = router;
