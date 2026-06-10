const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

//  Middleware 
// Parse incoming JSON request bodies
app.use(express.json());

// Log every incoming request to the console
app.use((req, res, next) => {
    const now = new Date().toLocaleTimeString();
    console.log(`[${now}] ${req.method} ${req.url}`);
    next();
});

// Serve your static frontend files (index.html, monitor.html, jscripts.js)
app.use(express.static(path.join(__dirname, 'public')));

//  Server-side data store Transactions live here while the server is running.
let transactions = [];

// API Routes 
// GET /api/transactions  →  return all transactions
app.get('/api/transactions', (req, res) => {
    res.json(transactions);
});

// POST /api/transactions  →  add a new transaction
app.post('/api/transactions', (req, res) => {
    const { description, amount, type } = req.body;

    // Basic server-side validation
    if (!description || isNaN(Number(amount)) || Number(amount) <= 0 || !['income', 'expense'].includes(type)) {
        return res.status(400).json({ error: 'Invalid transaction data.' });
    }

    const newTransaction = {
        id: Date.now(),          // simple unique ID
        description,
        amount: Number(amount),
        type,
        date: new Date().toLocaleDateString()
    };

    transactions.push(newTransaction);
    console.log(`Transaction added: ${type} $${amount} — "${description}"`);

    res.status(201).json(newTransaction);
});

// Catch-all for any route that doesn't exist
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found.' });
});

// Start server 
app.listen(PORT, () => {
    console.log(`Wealth & Asset Tracker running at http://localhost:${PORT}`);
});
