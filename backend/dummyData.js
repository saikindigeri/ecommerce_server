const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.resolve(__dirname, 'database.db');
let db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to the SQLite database.');
        seedProducts();
    }
});

const seedProducts = () => {
    const products = [
        {
            title: 'Stylish Running Shoes',
            description: 'Comfortable and stylish running shoes for all terrains.',
            price: 69.99,
            stock: 150,
            image_url: 'https://example.com/images/running-shoes.jpg'
        },
        {
            title: 'Wireless Bluetooth Headphones',
            description: 'High-quality wireless headphones with noise cancellation.',
            price: 89.99,
            stock: 200,
            image_url: 'https://example.com/images/bluetooth-headphones.jpg'
        },
        {
            title: 'Smartwatch',
            description: 'A smart and versatile smartwatch with multiple features.',
            price: 129.99,
            stock: 100,
            image_url: 'https://example.com/images/smartwatch.jpg'
        },
        {
            title: '4K Ultra HD TV',
            description: 'High-definition 4K TV with vibrant colors and sharp details.',
            price: 499.99,
            stock: 50,
            image_url: 'https://example.com/images/4k-tv.jpg'
        },
        {
            title: 'Digital Camera',
            description: 'A high-resolution digital camera with advanced features.',
            price: 349.99,
            stock: 75,
            image_url: 'https://example.com/images/digital-camera.jpg'
        }
    ];

    db.serialize(() => {
        const stmt = db.prepare('INSERT INTO products (title, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?)');

        products.forEach(product => {
            stmt.run(product.title, product.description, product.price, product.stock, product.image_url);
        });

        stmt.finalize(() => {
            console.log('Dummy data seeded into products table.');
            db.close();
        });
    });
};
