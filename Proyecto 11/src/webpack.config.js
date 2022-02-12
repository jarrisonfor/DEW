const path = require('path');

module.exports = {
    entry: {
        'app.js': [
            path.resolve(__dirname, 'components/menu-nav.js'),
            path.resolve(__dirname, 'pages/about.js'),
            path.resolve(__dirname, 'pages/contact.js'),
            path.resolve(__dirname, 'pages/index.js'),
            path.resolve(__dirname, 'pages/product.js'),
            path.resolve(__dirname, 'pages/register.js'),
            path.resolve(__dirname, 'pages/login.js'),
            path.resolve(__dirname, 'pages/cart.js'),
            path.resolve(__dirname, 'components/footer-info.js'),
        ]
    },
    output: {
        filename: '[name]',
        path: path.resolve(__dirname, '../js'),
    }
};