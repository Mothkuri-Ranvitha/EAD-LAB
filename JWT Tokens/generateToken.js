const jwt = require('jsonwebtoken');

// ⚠️ IMPORTANT: In a real application, this secret key should be
// a long, complex, and random string stored securely in environment variables (e.g., .env).
const SECRET_KEY = 'your_super_secret_key_123456';

// 1. Define the payload (the data you want to store in the token)
// Use simple, non-sensitive data like a user ID or role.
const payload = {
    userId: '12345',
    username: 'testuser',
    role: 'member'
};

// 2. Define signing options (optional, but highly recommended)
const options = {
    // Registered claim: 'expires in' (exp). Sets the token expiration time.
    // '1h' means 1 hour, '7d' means 7 days.
    expiresIn: '1h',
    // Registered claim: 'issuer' (iss). Identifies the principal that issued the JWT.
    // issuer: 'MyNodeApp' 
};

// 3. Generate the token
const token = jwt.sign(payload, SECRET_KEY, options);

console.log('Generated JWT:');
console.log(token);