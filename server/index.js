const express = require('express');
const app = express();
const cors = require("cors");
const path = require('path');
const ejs = require('ejs');
const PORT = process.env.PORT || 5000;
const pool = require('./db');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// Routes
app.get('/', async (req, res) => {
    try {
        const searchData = req.query.searchData; 
        const sortData = req.query.sortData; 
        const pageData = req.query.pageData;
        const orderData = req.query.orderData;
        const offlimit = (pageData - 1) * 20;
        let sortBy = "sno";
        let sortOrder = 'ASC'; // Default to ascending order

        if (sortData === "time") {
            sortBy = "creation->>'created_time'";
        } else if (sortData === "date") {
            sortBy = "creation->>'created_date'";
        }

        if (orderData === 'true') { // Check if orderData is specified and equals 'true' for ascending order
            sortOrder = 'DESC'; // Set to descending  order if specified in the request
        } else if (orderData === 'false') {
            sortOrder = 'ASC'; // Set to ascending order if specified in the request
        }

        const data = await pool.query(`
            SELECT * FROM customer1 
            WHERE customer_name ILIKE '%${searchData}%' OR location ILIKE '%${searchData}%'
            ORDER BY ${sortBy} ${sortOrder} OFFSET ${offlimit};`);
        res.status(200).json(data.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' }); // Return a 500 error response
    }
});

app.listen(PORT, () => { console.log(`Server started at port ${PORT}`) });
