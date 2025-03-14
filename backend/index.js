require('dotenv').config();
const express = require('express');
const sequelize = require('./app/config/db.conf');
const cors = require('cors');
const helmet = require("helmet")

// swagger documentation
const swaggerjsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

// models
const User = require('./app/models/user.model');
const Transaction = require('./app/models/transaction.model');

// routes
const userRoutes = require('./app/routes/user.transaction.route');
const authRoutes = require('./app/routes/auth.route');

const app = express()

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PATCH,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: false }))

app.use(helmet());

const port = 8000

// swagger configuration
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Sample test API',
            description: 'Liste des API endpoints pour le test provenant de L3M holding',
            contact: {
                name: 'Hasininjato Rojovaao'
            },
        },
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        servers: [
            {
                url: "http://localhost:8000/api"
            }
        ],
    },
    apis: ['./app/routes/*.js']
}

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

const swaggerDocs = swaggerjsdoc(swaggerOptions)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})