/**
 * routes for authentication (login/logout), signup is the same as POST /users
 */
require('dotenv').config();
const express = require('express');
const router = express.Router();
const { getUserByEmail } = require('../services/user.service');
const bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    try {
        const user = await getUserByEmail(email);
        // if user is found, validate password
        var isPasswordValid = bcrypt.compareSync(
            password,
            user.password
        );
        if (!isPasswordValid) {
            // invalid credentials
            return res.status(401).send({
                accessToken: null,
                message: "Invalid credentials"
            });
        }
        // generate jwt token
        const accessToken = jwt.sign({ id: user.id },
            process.env.JWT_SECRET,
            {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 60 * 15, // 15 min to ensure no long time access token
            });
        res.status(200).send({
            id: user.id,
            fullname: user.fullname,
            email: user.email,
            access_token: accessToken
        });
    } catch (error) {
        if (error.message == "User not found") {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});


module.exports = router;