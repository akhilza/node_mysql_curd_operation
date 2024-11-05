const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8080;
const db = require('./db')

  // middleware
  
  app.use(bodyParser.json());


  // create

  app.post('/items', (req, res) => {
    const { name, price } = req.body;
    const sql = 'INSERT INTO items (name, price) VALUES (?, ?)';
    db.query(sql, [name, price], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(201).json({ id: result.insertId, name, price });
    });
});

// get All
app.get('/items', (req, res) => {
    const sql = 'SELECT * FROM items';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(results);
    });
});

// get by ID
app.get('/items/:id', (req, res) => {
    const sql = 'SELECT * FROM items WHERE id = ?';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Item not found' });
        res.json(results[0]);
    });
});

// UPDATE
app.put('/items/:id', (req, res) => {
    const { name, price } = req.body;
    const sql = 'UPDATE items SET name = ?, price = ? WHERE id = ?';
    db.query(sql, [name, price, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Item updated successfully' });
    });
});

// DELETE
app.delete('/items/:id', (req, res) => {
    const sql = 'DELETE FROM items WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Item deleted successfully' });
    });
});


 

app.listen(port, ()=>{
    console.log(`Hello mysql http://localhost:${port}`)
})
