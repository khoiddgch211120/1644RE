const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Lấy dữ liệu từ file JSON
const products = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf8'));

// Trang chủ (Home)
router.get('/', (req, res) => {
    res.render('home', { products });
});

// Trang chi tiết sản phẩm (Product Detail)
router.get('/product/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        res.render('product', { product });
    } else {
        res.status(404).send('Product not found');
    }
});

module.exports = router;
