const express = require('express');
const https = require('https');
const fs = require('fs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const app = express();

// HTTPS Options
const httpsOptions = {
    key: fs.readFileSync('path/to/key.pem'),
    cert: fs.readFileSync('path/to/cert.pem')
};

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Express Rate Limiting
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(apiLimiter);

// Express JSON Body Parser
app.use(express.json());

// User Login Endpoint
app.post('/api/login',
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Validate user credentials (replace with your database logic)

        // On successful validation
        const token = jwt.sign({ userId: req.body.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    }
);

// JWT Authentication Middleware
function authenticateToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Start HTTPS Server
https.createServer(httpsOptions, app).listen(3000, () => {
    console.log(`Secure server running on port 3000`);
});
