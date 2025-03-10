const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.conf');
const User = require('./user.model');

const Transaction = sequelize.define('Transaction', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    amount: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        unique: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: true
});

User.hasMany(Transaction, { foreignKey: 'userId' }); // foreign key
Transaction.belongsTo(User, { foreignKey: 'userId' });

module.exports = Transaction;
