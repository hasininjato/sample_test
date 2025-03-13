const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../services/user.service');
const { createTransaction, getUserTransactions } = require('../services/transaction.service');
const verifyToken = require('../middlewares/auth.middleware');


/**
 * public routes, everyone can create an user
 */
router.post('/', async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const newUser = await createUser({ fullname, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ errors: error.errors });
        }

        if (error.name === "UniqueConstraintError") {
            return res.status(409).json({ errors: error.errors });
        }

        return res.status(500).json({ message: "Internal server error" });
    }
});


router.get('/', verifyToken, async (req, res) => {
    // manual pagination for list of all users
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;
    try {
        const users = await getAllUsers({ limit, offset });
        res.json(users);
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});


// routes for transaction
router.post('/:id/transactions', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { amount, description } = req.body;
    try {
        const newTransaction = await createTransaction(id, amount, description);
        res.status(201).json(newTransaction);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ errors: error.errors });
        }

        return res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/:id/transactions', verifyToken, async (req, res) => {
    const { id } = req.params;
    // I put a 500 delay to clearly show the loader spinner when loading user's transactions
    setTimeout(async () => {
        try {
            const transactions = await getUserTransactions(id);
            res.status(200).json(transactions);
        } catch (error) {
            if (error.message.includes("User not found")) {
                return res.status(404).json({ message: "User not found" })
            }
            res.status(500).json({ message: 'Internal server error' });
        }
    }, 500);
});
// end routes for transaction

router.get('/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        const user = await getUserById(id);
        res.json(user);
    } catch (error) {
        if (error.message.includes("User not found")) {
            return res.status(404).json({ message: error.message })
        }
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});


router.put('/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { fullname, email, password } = req.body;

    try {
        const updatedUser = await updateUser(id, { fullname, email, password });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.delete('/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        await deleteUser(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
