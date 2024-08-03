const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 6000;
const DB_PATH = path.resolve(__dirname, 'database.db');
const JWT_SECRET = 'your_jwt_secret';  // Replace with a more secure secret in production

// Initialize SQLite database
let db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to the SQLite database.');
        createTables();
    }
});

const createTables = () => {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            price REAL NOT NULL,
            stock INTEGER NOT NULL,
            image_url TEXT
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS cart (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            price REAL NOT NULL,
            quantity INTEGER NOT NULL,
            image_url TEXT,
            FOREIGN KEY (product_id) REFERENCES products(id),
            FOREIGN KEY (user_id) REFERENCES users(id)
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
     title TEXT NOT NULL,
    product_id INTEGER NOT NULL,
    price DECIMAL,
    quantity INTEGER NOT NULL,
    total_amount DECIMAL,
     image_url TEXT,
    FOREIGN KEY (product_id) REFERENCES products(id)


        )`);
    });
};

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Authentication routes
// POST /api/auth/register
// localhost:7000/api/auth/register
app.post('/api/auth/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function (err) {
        if (err) return res.status(500).send(err.message);
        res.status(201).send({ id: this.lastID, message: 'User registered successfully' });
    });
});

// POST /api/auth/login
// localhost:7000/api/auth/login
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
        if (err) return res.status(500).send(err.message);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send('Invalid credentials');
        }
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
});

// Product routes
// GET /api/products
// localhost:7000/api/products
app.get('/api/products', (req, res) => {
    db.all('SELECT * FROM products', (err, rows) => {
        if (err) return res.status(500).send(err.message);
        console.log(rows)
        res.json(rows);
    });
});

// GET /api/products/:id
// localhost:7000/api/products/:id
app.get('/api/products/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
        if (err) return res.status(500).send(err.message);
        if (!row) return res.status(404).send('Product not found');
        res.json(row);
    });
});
app.post('/api/products', (req, res) => {
    const { title, description, price, stock, image_url } = req.body;

    if (!name || !description || price === undefined || stock === undefined) {
        return res.status(400).send('Name, description, price, and stock are required');
    }

    db.run(
        'INSERT INTO products (name, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?)',
        [name, description, price, stock, image_url],
        function (err) {
            if (err) {
                return res.status(500).send('Error inserting product');
            }
            res.status(201).json({ id: this.lastID, message: 'Product added successfully' });
        }
    );
});
// Cart routes
// GET /api/cart
// localhost:7000/api/cart
app.get('/api/cart', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send('Token required');
    
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send('Invalid token');
        const userId = decoded.id;
        db.all('SELECT c.id, c.user_id, c.product_id, p.name AS title, c.price, c.quantity, p.image_url FROM cart c JOIN products p ON c.product_id = p.id WHERE c.user_id = ?', [userId], (err, rows) => {
            if (err) return res.status(500).send(err.message);
            res.json(rows);
        });
    });
});

// POST /api/cart
// localhost:7000/api/cart 
/*
app.post('/api/cart', (req, res) => {
    const { product_id, quantity } = req.body;
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send('Token required');
    
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send('Invalid token');
        const userId = decoded.id;
        db.get('SELECT * FROM products WHERE id = ?', [product_id], (err, product) => {
            if (err) return res.status(500).send(err.message);
            if (!product) return res.status(404).send('Product not found');
            db.run('INSERT INTO cart (user_id, product_id, title, price, quantity, image_url) VALUES (?, ?, ?, ?, ?, ?)', [userId, product_id, product.name, product.price, quantity, product.image_url], function (err) {
                if (err) return res.status(500).send(err.message);
                res.status(201).send({ id: this.lastID, message: 'Product added to cart' });
            });
        });
    });
});

*/
app.post('/api/cart', (req, res) => {
    const { product_id, quantity } = req.body;
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send('Token required');

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send('Invalid token');
        const userId = decoded.id;

        // Check if the item is already in the cart
        db.get('SELECT * FROM cart WHERE user_id = ? AND product_id = ?', [userId, product_id], (err, existingItem) => {
            if (err) return res.status(500).send(err.message);

            if (existingItem) {
                // Item already in cart, update quantity
                const newQuantity = existingItem.quantity + quantity;
                db.run('UPDATE cart SET quantity = ? WHERE id = ?', [newQuantity, existingItem.id], function (err) {
                    if (err) return res.status(500).send(err.message);
                    res.status(200).send({ message: 'Cart updated successfully' });
                });
            } else {
                // Item not in cart, add it
                db.get('SELECT * FROM products WHERE id = ?', [product_id], (err, product) => {
                    if (err) return res.status(500).send(err.message);
                    if (!product) return res.status(404).send('Product not found');
                    db.run('INSERT INTO cart (user_id, product_id, title, price, quantity, image_url) VALUES (?, ?, ?, ?, ?, ?)', [userId, product_id, product.name, product.price, quantity, product.image_url], function (err) {
                        if (err) return res.status(500).send(err.message);
                        res.status(201).send({ id: this.lastID, message: 'Product added to cart' });
                    });
                });
            }
        });
    });
});


// DELETE /api/cart/:id
// localhost:7000/api/cart/:id
app.delete('/api/cart/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM cart WHERE id = ?', [id], function (err) {
        if (err) return res.status(500).send(err.message);
        res.send({ message: 'Item removed from cart' });
    });
});

// Order routes
// POST /api/orders
// localhost:7000/api/orders 
/*
app.post('/api/orders', (req, res) => {
    const { total } = req.body;
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send('Token required');
    
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send('Invalid token');
        const userId = decoded.id;
        console.log(userId)
        db.all('SELECT * FROM cart WHERE user_id = ?', [userId], (err, cartItems) => {
            if (err) return res.status(500).send(err.message);
            if (cartItems.length === 0) return res.status(400).send('Cart is empty');
            let orderDetails = [];
            cartItems.forEach(item => {
                orderDetails.push({ title: item.title, price: item.price, quantity: item.quantity, image_url: item.image_url });
            });
            db.run('INSERT INTO orders (user_id, total, status, title, price, quantity, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)', [userId, total, 'pending', orderDetails.map(item => item.title).join(', '), orderDetails.reduce((acc, item) => acc + item.price, 0), orderDetails.reduce((acc, item) => acc + item.quantity, 0), orderDetails.map(item => item.image_url).join(', ')], function (err) {
                if (err) return res.status(500).send(err.message);
                db.run('DELETE FROM cart WHERE user_id = ?', [userId], (err) => {
                    if (err) return res.status(500).send(err.message);
                    res.status(201).send({ id: this.lastID, message: 'Order placed successfully' });
                });
            });
        });
    });
});
*/


app.post('/api/orders', (req, res) => {
    const { product_id, quantity } = req.body;
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) return res.status(401).send('Token required');
    
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send('Invalid token');
        
        const userId = decoded.id;
        db.get('SELECT * FROM cart WHERE user_id = ? AND product_id = ?', [userId, product_id], (err, existingItem) => {
            if (err) return res.status(500).send(err.message);
            if (!product) return res.status(404).send('Product not found');
            
            // Create an order
            db.run(
                'INSERT INTO orders (user_id, product_id, title, price, quantity, total_amount) VALUES (?, ?, ?, ?, ?, ?)',
                [userId, product_id, product.name, product.price, quantity, product.price * quantity],
                function (err) {
                    if (err) return res.status(500).send(err.message);
                    
                    res.status(201).send({ id: this.lastID, message: 'Order placed successfully' });
                }
            );
        });
    });
});

// GET /api/orders/:userId
// localhost:7000/api/orders/:userId

app.get('/api/orders', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) return res.status(401).send('Token required');
    
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send('Invalid token');
        
        const userId = decoded.id;
        db.all(
            'SELECT o.id, o.user_id, o.product_id, p.name AS title, o.price, o.quantity, o.total_amount FROM orders o JOIN products p ON o.product_id = p.id WHERE o.user_id = ?',
            [userId],
            (err, rows) => {
                if (err) return res.status(500).send(err.message);
                res.json(rows);
            }
        );
    });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
