const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.conf');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "Invalid email"
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true
});

module.exports = User;
