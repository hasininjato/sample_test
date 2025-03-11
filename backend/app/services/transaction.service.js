const User = require('../models/user.model');
const Transaction = require('../models/transaction.model');

const createTransaction = async (userId, amount) => {
    console.log(userId)
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const transaction = await Transaction.create({
            amount: amount,
            userId: user.id,
        });

        return transaction;
    } catch (error) {
        throw new Error('Error when creating the transaction: ' + error.message);
    }
};

const getUserTransactions = async (userId) => {
    // solution for the part 1 question 4: N+1 problem => Sequelize proposes the eager loading solution to avoid this by including transactions of the user
    try {
        const user = await User.findByPk(userId, {
            include: [
                {
                    model: Transaction,
                    as: 'Transactions'
                },
            ],
        });

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    } catch (error) {
        throw new Error('Error when fetching user transactions: ' + error.message);
    }
};

module.exports = {
    createTransaction,
    getUserTransactions,
};
