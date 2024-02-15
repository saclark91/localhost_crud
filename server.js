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
    server: 'ISC133122\\PLAYGROUND',
    database: 'TestDB',
    port: '59569',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

const publicDirectory = path.join(__dirname, 'public');
const jsDirectory = path.join(__dirname, 'js');

app.use(express.static(publicDirectory));
app.use('/js', express.static(jsDirectory));

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



app.get('/api/test/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Fetching record with id:', id);

        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('item_id', sql.Int, id)
            .query('SELECT * FROM TestTable WHERE item_id = @item_id');

        if (result.recordset.length > 0) {
            res.json(result.recordset[0]); // Return the first (and only) record found
            console.log('Fetched record:', result.recordset[0]);
        } else {
            res.status(404).json({ error: 'Record not found' });
            console.log('Record not found');
        }
    } catch (error) {
        console.error('Error fetching record:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




app.post('/api/test', async (req, res) => {
    try {
        const { item_name, item_price } = req.body; 
        console.log('Creating record with item_name:', item_name);
        
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('item_name', sql.VarChar(50), item_name)
            .input('item_price', sql.Decimal(10, 2), item_price)  
            .query('INSERT INTO TestTable (item_name, item_price) VALUES (@item_name, @item_price)');
        
        res.status(201).send('Record created successfully');
        console.log('Record created successfully');
    } catch (error) {
        console.error('Error creating record:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/api/test/:id', async (req, res) => {
    try {
        const { item_name } = req.body;
        const { id } = req.params;
        console.log('Updating record with id:', id);
        
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('item_id', sql.Int, id) 
            .input('item_name', sql.VarChar(50), item_name)
            .input('item_price', sql.Decimal(10, 2), item_price)
            .query('UPDATE TestTable SET item_name = @item_name, item_price = @item_price WHERE item_id = @item_id');
        
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
            .input('item_id', sql.Int, id) 
            .query('DELETE FROM TestTable WHERE item_id = @item_id');
        
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
