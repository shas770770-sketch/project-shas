const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item.controller');

// נתיב להוספת פריט ציוד חדש (POST)
// כתובת: http://localhost:3000/api/items
router.post('/', itemController.createItem);

// נתיב לשליפת כל פריטי הציוד (GET)
// כתובת: http://localhost:3000/api/items
router.get('/', itemController.getAllItems);

module.exports = router;