const { Pool } = require('pg');

require('dotenv').config();

const pool = new Pool({
    user: process.env.USER_NAME,
    host: process.env.HOST_NAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DIALECT,
    port: process.env.PORT_NUMBER
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error in connection');
    }
    client.query('SELECT * from customer1', (err, result) => {
        release();
        if (err) {
            return console.error('Error executing query');
        }
        console.log("Connected to Database.");
    });
});

module.exports = pool;
