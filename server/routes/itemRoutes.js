const express = require('express');
const multer = require('multer');
const { createItem, getItems, getItemById, deleteItem } = require('../controllers/itemController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.array('images', 5), createItem);
router.get('/', getItems);
router.get('/:id', getItemById);
router.delete('/:id', deleteItem);

module.exports = router;