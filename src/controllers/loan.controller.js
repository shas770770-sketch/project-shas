const db = require('../models');
const Loan = db.Loan;
const Item = db.Item;
const User = db.User;

// יצירת השאלה חדשה
exports.createLoan = async (req, res) => {
  try {
    const { userId, itemId, dueDate } = req.body;

    // 1. בדיקה האם הפריט קיים
    const item = await Item.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // 2. בדיקה האם הפריט זמינה להשאלות
    if (item.status !== 'available') {
      return res.status(400).json({ message: `Item is not available (current status: ${item.status})` });
    }

    // 3. יצירת ההשאלה
    const newLoan = await Loan.create({
      userId,
      itemId,
      dueDate,
      status: 'active'
    });

    // 4. עדכון סטטוס הפריט ל-"מושאל"
    item.status = 'borrowed';
    await item.save();

    res.status(201).json({
      message: 'Loan created successfully',
      loan: newLoan
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating loan', error: error.message });
  }
};

// שליפת כל ההשאלות (כולל פרטי המשתמש והפריט המושאל)
exports.getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.findAll({
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Item }
      ]
    });
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loans', error: error.message });
  }
};

// החזרת פריט (סגירת השאלה)
exports.returnLoan = async (req, res) => {
  try {
    const { loanId } = req.params;

    const loan = await Loan.findByPk(loanId);
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    if (loan.status === 'returned') {
      return res.status(400).json({ message: 'Loan is already returned' });
    }

    // עדכון ההשאלה
    loan.status = 'returned';
    loan.returnDate = new Date();
    await loan.save();

    // שחרור הפריט חזרה למלאי
    const item = await Item.findByPk(loan.itemId);
    if (item) {
      item.status = 'available';
      await item.save();
    }

    res.status(200).json({ message: 'Item returned successfully', loan });
  } catch (error) {
    res.status(500).json({ message: 'Error returning item', error: error.message });
  }
};