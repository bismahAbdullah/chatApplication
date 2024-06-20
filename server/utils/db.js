// db.js
const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

client.connect(err => {
    if (err) {
        console.error("Connection error", err.stack);
    } else {
        console.log("Connected to PostgreSQL!");
    }
});

module.exports = client;
