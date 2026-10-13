const jwt = require('jsonwebtoken');

// פונקציית המתווך ("השומר") שבודקת את הטוקן לפני פעולות רגישות
exports.verifyToken = (req, res, next) => {
  // 1. שליפת הטוקן מהכותרת של הבקשה (Headers)
  const authHeader = req.headers['authorization'];
  
  // נהוג לשלוח את הטוקן בפורמט: "Bearer <token>", לכן נחתוך רק את הטוקן עצמו
  const token = authHeader && authHeader.split(' ')[1];

  // אם אין טוקן בכלל, נחסום את הגישה
  if (!token) {
    return res.status(403).json({ message: 'A token is required for authentication' });
  }

  // 2. אימות הטוקן מול המפתח הסודי שלנו
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // שומרים את פרטי המשתמש מתוך הטוקן בתוך הבקשה
    next(); // השומר מאשר את הכניסה! מעביר את השרביט להמשך הפעולה (למשל לבקר ההשאלות)
  } catch (err) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
};