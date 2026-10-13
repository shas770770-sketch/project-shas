module.exports = (sequelize, DataTypes) => {
  const Loan = sequelize.define('Loan', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    loanDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    returnDate: {
      type: DataTypes.DATE,
      allowNull: true // יכול להיות ריק כל עוד הפריט לא הוחזר
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active' // אפשרויות: active, returned, overdue
    }
  }, {
    timestamps: true
  });

  return Loan;
};