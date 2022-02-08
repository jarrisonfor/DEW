const path = require('path');

module.exports = {
    entry: {
        'app.js': [
            path.resolve(__dirname, 'about.js'),
            path.resolve(__dirname, 'contact.js'),
            path.resolve(__dirname, 'menu-nav.js'),
            path.resolve(__dirname, 'product-list.js'),
            path.resolve(__dirname, 'product.js'),
            path.resolve(__dirname, 'register.js'),
            path.resolve(__dirname, 'login.js'),
            path.resolve(__dirname, 'footer-info.js'),
            path.resolve(__dirname, 'vue.js'),
            path.resolve(__dirname, 'cart.js'),
            path.resolve(__dirname, 'carousel.js'),
        ]
    },
    output: {
        filename: '[name]',
        path: path.resolve(__dirname, '../js'),
    }
};