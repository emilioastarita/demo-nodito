const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/create', {
        target: 'http://localhost:3001/',
        changeOrigin: true,
    }));
    app.use(proxy('/faye', {
        target: 'http://localhost:3001/',
        changeOrigin: true,
        ws: true,
    }));
};