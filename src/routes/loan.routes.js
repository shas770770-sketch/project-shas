const express = require('express');
const { verifyToken } = require('../middlewares/auth.middleware');
const router = express.Router();
const loanController = require('../controllers/loan.controller');


// יצירת השאלה חדשה - מוגן באמצעות טוקן
router.post('/', verifyToken, loanController.createLoan);

// שליפת כל ההשאלות כולל פרטי משתמש ופריט (GET)
router.get('/', loanController.getAllLoans);

// החזרת פריט / סגירת השאלה (PATCH)
router.patch('/:loanId/return', loanController.returnLoan);

module.exports = router;