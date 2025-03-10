const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../services/user.service');
const { createTransaction, getUserTransactions } = require('../services/transaction.service');


router.post('/users', async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const newUser = await createUser({ fullname, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error.message)
        if (error.message.includes('SequelizeValidationError')) {
            const errors = {
                message: error.message
            }
            console.log(error.path)
            return res.status(400).json({
                status: 'error',
                message: 'Validation error',
                errors: errors
            });
        }
        // Handle other types of errors
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});


router.get('/users', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        console.log(error)
    }
});


// routes for transaction
router.post('/users/:id/transactions', async (req, res) => {
    const { id } = req.params;
    const { amount } = req.body;
    const newTransaction = await createTransaction(id, amount);
    res.status(201).json(newTransaction);
});

router.get('/users/:id/transactions', async (req, res) => {
    const { id } = req.params;
    const transactions = await getUserTransactions(id);
    res.status(200).json(transactions);
});
// end routes for transaction

router.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await getUserById(id);
        res.json(user);
    } catch (error) {
        if (error.message == "User not found") {
            return res.status(404).json({ message: error.message })
        }
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});


router.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { fullname, email, password } = req.body;

    try {
        const updatedUser = await updateUser(id, { fullname, email, password });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    await deleteUser(id);
    res.status(204).send();
});

module.exports = router;
