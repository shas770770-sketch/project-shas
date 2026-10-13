const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller'); // מושך את הבקר שיצרת הרגע

// נתיב ליצירת משתמש חדש (POST request)
// הכתובת בפועל תהיה: http://localhost:3000/api/users/register
router.post('/register', userController.createUser);

// נתיב לשליפת כל המשתמשים (GET request)
// הכתובת בפועל תהיה: http://localhost:3000/api/users
router.get('/', userController.getAllUsers);

module.exports = router;

// התחברות (Login) וקבלת טוקן
router.post('/login', userController.login);