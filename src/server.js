require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models'); // טוען את קובץ ה-index.js מתיקיית models שמכיל את החיבור והקשרים
const rateLimit = require('express-rate-limit');

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 דקות
  max: 100, // מקסימום 100 בקשות ל-IP
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

// החלת חוקי ההגבלה על כל הבקשות שנכנסות לשרת
app.use(limiter);
// שולף את הפורט מקובץ ה-.env, ואם אין שם, משתמש ב-3000
const PORT = process.env.PORT || 3000;

// Middlewares בסיסיים שחובה בכל שרת
app.use(cors()); // מאפשר גישה לשרת מדומיינים אחרים
app.use(express.json()); // מאפשר לשרת לקרוא את גוף הבקשה (Body) בפורמט JSON

// ייבוא והפעלת הראוטרים שלנו
const userRoutes = require('./routes/user.routes');
app.use('/api/users', userRoutes);

// ייבוא והפעלת הראוטר של הציוד
const itemRoutes = require('./routes/item.routes');
app.use('/api/items', itemRoutes);

// ייבוא והפעלת הראוטר של ההשאלות
const loanRoutes = require('./routes/loan.routes');
app.use('/api/loans', loanRoutes);

// נתיב בדיקה בסיסי לוודא שהשרת עובד
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to EquipTrack API!' });
});

// חיבור לבסיס הנתונים, סנכרון הטבלאות והפעלת השרת
db.sequelize.sync({ alter: true }) // alter: true מזהה את המודלים ויוצר או מעדכן את הטבלאות בהתאם
  .then(() => {
    console.log('Database connected and tables synced successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect or sync database:', err);
  });