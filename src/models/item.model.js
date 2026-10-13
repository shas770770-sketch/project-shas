module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'available' // אפשרויות: available, borrowed, maintenance
    },
    serialNumber: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  }, {
    timestamps: true
  });

  return Item;
};