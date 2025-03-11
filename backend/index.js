require('dotenv').config();
const express = require('express');
const sequelize = require('./app/config/db.conf');

// models
const User = require('./app/models/user.model');
const Transaction = require('./app/models/transaction.model');

// routes
const userRoutes = require('./app/routes/user.transaction.route');
const authRoutes = require('./app/routes/auth.route');

const app = express()

app.use(express.json());

app.use(express.urlencoded({ extended: false }))

const port = 8000

const syncDb = async () => {
    try {
        await sequelize.sync({ force: false }); // set to false if no need to recreate tables and all existing data
    } catch (error) {
        console.error('Database connection error:', error);
    }
}

syncDb()

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})