/**
 * routes for authentication (login, no backend process for logout, we only delete localstorage in front),
 * signup is the same as POST /users
 */
require('dotenv').config();
const express = require('express');
const router = express.Router();
const { getUserByEmail } = require('../services/user.service');
const bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");
const Joi = require('joi');

// we begin with simple validation
const userSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required()
});
router.post('/login', async (req, res) => {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    const { email, password } = req.body;
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
                expiresIn: 60 * 60, //TODO: to change to 15 but this is for testing purpose only
            }
        );
        // generate refresh token, and store in cookie httponly, add secure if in https => on hold, refresh token is not taken into account
        // using refresh token and store in httponly secure cookie would be a best practice to secure and smooth user experience on log in
        const refreshToken = jwt.sign({ id: user.id },
            process.env.JWT_REFRESH_SECRET,
            {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 60 * 60 * 24 * 7, //TODO: make the refresh token more longer (here 7 days)
            }
        );
        res.status(200).send({
            id: user.id,
            fullname: user.fullname,
            email: user.email,
            access_token: accessToken,
            refresh_token: refreshToken
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

// this route should be protected by JWT refresh token, but for now public for all to validate a jwt token
router.get('/validate-token', async (req, res) => {
    const accessToken = req.query.accessToken;
    jwt.verify(accessToken,
        process.env.JWT_SECRET,
        (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized",
                });
            }
            req.userId = decoded.id;
            res.status(200).send({
                message: "Token valid"
            })
        });
})

module.exports = router;