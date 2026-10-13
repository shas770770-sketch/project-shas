const db = require('../models');
const Item = db.Item;

// הוספת פריט ציוד חדש למערכת
exports.createItem = async (req, res) => {
  try {
    const { name, category, serialNumber } = req.body;
    
    // יצירת הרשומה בטבלת הציוד
    const newItem = await Item.create({
      name,
      category,
      serialNumber
    });
    
    res.status(201).json({ message: 'Item created successfully', item: newItem });
  } catch (error) {
    res.status(500).json({ message: 'Error creating item', error: error.message });
  }
};

// שליפת כל הציוד במערכת (כדי להציג למשתמשים מה קיים/פנוי)
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error: error.message });
  }
};