const bcrypt = require('bcrypt');
const db = require('../models');
const User = db.User;
const jwt = require('jsonwebtoken');

// יצירת משתמש חדש (הרשמה)
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // הצפנת הסיסמה לפני שמירה במסד הנתונים
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // יצירת הרשומה בטבלה
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    // החזרת תשובה מוצלחת (ללא חשיפת הסיסמה)
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

// שליפת כל המשתמשים (ללא סיסמאות)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] } // הגנה: לא שולחים סיסמאות בחזרה ללקוח
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// התחברות משתמש קיים (Login)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. חיפוש המשתמש במסד הנתונים לפי אימייל
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 2. בדיקה האם הסיסמה שהוקלדה תואמת לסיסמה המוצפנת במסד הנתונים
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // 3. יצירת האסימון (Token) שישמש אותנו כ"צמיד כניסה"
    const token = jwt.sign(
      { id: user.id, role: user.role }, // המידע שנשמור בתוך הצמיד
      process.env.JWT_SECRET,           // המפתח הסודי שלנו מה-.env שנועל את הצמיד
      { expiresIn: '1h' }               // תוקף האסימון (יפוג בעוד שעה - 1 hour)
    );

    res.status(200).json({
      message: 'Login successful',
      token: token // מחזירים למשתמש את הצמיד!
    });
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
};