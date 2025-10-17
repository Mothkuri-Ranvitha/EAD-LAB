const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your_super_secret_key_123456'; // Use a secure key from environment variables in production!

// Middleware to parse JSON body
app.use(express.json());

// --- 1. Middleware to Verify JWT (Protected Route Logic) ---
function authenticateToken(req, res, next) {
    // Get the token from the Authorization header (Format: Bearer <token>)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        // 401: Unauthorized (No token provided)
        return res.status(401).json({ message: 'Access Denied: Token required' });
    }

    // Verify the token
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            // 403: Forbidden (Invalid or expired token)
            return res.status(403).json({ message: 'Access Denied: Invalid or expired token' });
        }
        // Token is valid, save the decoded payload (user info) to the request object
        req.user = user;
        next(); // Proceed to the protected route handler
    });
}

// -----------------------------------------------------------------
// --- 2. Route for Token Generation (Login) ---
app.post('/login', (req, res) => {
    // In a real application, you would:
    // 1. Get username/password from req.body
    // 2. Validate against a database
    // 3. If credentials are valid, create the payload

    // Mock User for demonstration
    const user = { id: 101, username: 'postman_tester', email: 'test@example.com' };

    // Create the token
    const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });

    // Send the token back to the client/Postman
    res.json({ message: 'Login successful', token: token });
});

// -----------------------------------------------------------------
// --- 3. Protected Route ---
app.get('/api/protected', authenticateToken, (req, res) => {
    // This code only runs if the token verification in authenticateToken passed
    res.json({
        message: 'Welcome to the protected resource!',
        user_info_from_token: req.user // Data decoded from the JWT payload
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});