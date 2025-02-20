const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'You must be logged in' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
           console.error('Token verification error:', err.message);
            return res.status(403).json({ error: 'Invalid or expired token', message: err.message });
        }

        req.user = { id: decoded.userId }; // Attach the userId to the `req.user` object.
        next();
    });
};

module.exports = authMiddleware;



// const jwt = require('jsonwebtoken');
// const JWT_SECRET = process.env.JWT_SECRET;

// const authenticateToken = (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(401).json({ error: 'You must be logged in' });
//     }

//     const token = authHeader.split(' ')[1];

//     jwt.verify(token, JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(403).json({ error: 'Invalid or expired token' });
//         }

//         req.userId = decoded.userId;
//         next();
//     });
// };

// module.exports = authenticateToken;