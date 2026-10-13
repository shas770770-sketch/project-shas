const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // מייבא את החיבור שלנו ל-SQLite

const db = {};

// שומרים את החיבור עצמו בתוך אובייקט ה-db
db.sequelize = sequelize;

// טעינת שלושת המודלים שיצרנו
db.User = require('./user.model')(sequelize, DataTypes);
db.Item = require('./item.model')(sequelize, DataTypes);
db.Loan = require('./loan.model')(sequelize, DataTypes);

// --- הגדרת הקשרים (Associations) ---

// 1. קשר בין משתמש להשאלות (One-to-Many): משתמש אחד יכול לבצע הרבה השאלות
db.User.hasMany(db.Loan, { foreignKey: 'userId', onDelete: 'CASCADE' });
db.Loan.belongsTo(db.User, { foreignKey: 'userId' });

// 2. קשר בין פריט להשאלות (One-to-Many): פריט אחד יכול להיות קשור להרבה השאלות (לאורך הזמן)
db.Item.hasMany(db.Loan, { foreignKey: 'itemId', onDelete: 'CASCADE' });
db.Loan.belongsTo(db.Item, { foreignKey: 'itemId' });

module.exports = db;