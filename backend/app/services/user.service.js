const User = require('../models/user.model');
const bcrypt = require('bcrypt');

const createUser = async ({ fullname, email, password }) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullname,
            email,
            password: hashedPassword,
        });
        return user;
    } catch (error) {
        throw new Error(error);
    }
};


const getAllUsers = async () => {
    try {
        const users = await User.findAll();
        return users;
    } catch (error) {
        throw new Error('Error fetching all users: ' + error.message);
    }
};

const getUserById = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            console.log('ajk;ji')
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        console.log('vncaihsdf')
        throw new Error(error.message);
    }
};

const updateUser = async (id, { fullname, email, password }) => {
    try {
        const user = await User.findByPk(id);

        if (!user) {
            throw new Error('User not found');
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        if (fullname) user.fullname = fullname;
        if (email) user.email = email;

        await user.save();

        return user;
    } catch (error) {
        throw new Error('Error when updating an user: ' + error.message);
    }
};

const deleteUser = async (id) => {
    try {
        await User.destroy({
            where: {
                id: id,
            },
        });
    } catch (error) {
        throw new Error('Error when deleting an user: ' + error.message);
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
