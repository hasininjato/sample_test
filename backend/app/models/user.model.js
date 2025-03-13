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
        allowNull: false,
        unique: false,
        validate: {
            notNull: { msg: "Full name is required" },
            notEmpty: { msg: "Full name cannot be empty" }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: { msg: "Email is required" },
            notEmpty: { msg: "Email cannot be empty" },
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
