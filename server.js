const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const config = {
    user: 'admin',
    password: 'pass',
    server: 'DESKTOP-RRTU67G\\PLAYGROUND',
    database: 'Test',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

// Define the directory where your static files (including index.html, styles.css, and app.js) are located
const publicDirectory = path.join(__dirname, 'public');
const jsDirectory = path.join(__dirname, 'js');

// Serve static files from the specified directories
app.use(express.static(publicDirectory));
app.use('/js', express.static(jsDirectory)); // Serve js files from the 'js' directory

app.get('/api/test', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query('SELECT * FROM TestTable');
        res.json(result.recordset);
        console.log('Fetched records:', result.recordset);
    } catch (error) {
        console.error('Error fetching records:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/test', async (req, res) => {
    try {
        const { test_value } = req.body;
        console.log('Creating record with test_value:', test_value);
        
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('test_value', sql.VarChar(50), test_value)
            .query('INSERT INTO TestTable (test_value) VALUES (@test_value)');
        
        res.status(201).send('Record created successfully');
        console.log('Record created successfully');
    } catch (error) {
        console.error('Error creating record:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/api/test/:id', async (req, res) => {
    try {
        const { test_value } = req.body;
        const { id } = req.params;
        console.log('Updating record with id:', id);
        
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('test_id', sql.Int, id)
            .input('test_value', sql.VarChar(50), test_value)
            .query('UPDATE TestTable SET test_value = @test_value WHERE test_id = @test_id');
        
        res.status(200).send('Record updated successfully');
        console.log('Record updated successfully');
    } catch (error) {
        console.error('Error updating record:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/api/test/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Deleting record with id:', id);
        
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('test_id', sql.Int, id)
            .query('DELETE FROM TestTable WHERE test_id = @test_id');
        
        res.status(200).send('Record deleted successfully');
        console.log('Record deleted successfully');
    } catch (error) {
        console.error('Error deleting record:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
