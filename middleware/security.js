const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');

const securityMiddleware = (app) => {
    // Enable CORS (Cross-Origin Resource Sharing)
    app.use(cors());

    // Set security HTTP headers
    app.use(helmet());

    // Sanitize data against NoSQL Query Injection
    app.use((req, res, next) => {
        if (req.body) mongoSanitize.sanitize(req.body);
        if (req.query) mongoSanitize.sanitize(req.query);
        if (req.params) mongoSanitize.sanitize(req.params);
        next();
    });

    // Prevent HTTP Parameter Pollution
    app.use(hpp());
};

module.exports = securityMiddleware;