const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const products = require('./data/products');

const app = express();

// Cấu hình Handlebars
app.engine('hbs', engine({
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials') 
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Cấu hình thư mục tĩnh
app.use(express.static(path.join(__dirname, 'public')));

// Route cho trang chính
app.get('/', (req, res) => {
    res.render('home', { products });
});

// Route cho trang chi tiết sản phẩm
app.get('/product/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const product = products.find(p => p.id === productId);
    if (product) {
        res.render('product-detail', { product });
    } else {
        res.status(404).send('Product not found');
    }
});

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
