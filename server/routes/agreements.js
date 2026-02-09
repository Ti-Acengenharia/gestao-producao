const express = require('express');
const agreementsController = require('../controllers/agreementsController');

const router = express.Router();

router.get('/', agreementsController.getAll);
router.get('/:id', agreementsController.getById);
router.post('/', agreementsController.create);
router.put('/:id', agreementsController.update);
router.delete('/:id', agreementsController.delete);

module.exports = router;
