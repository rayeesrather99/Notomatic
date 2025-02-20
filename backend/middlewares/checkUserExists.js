// checkUserExists.js

const User = require('../models/User'); // Import the User model

/**
 * Middleware to check if a user exists based on their email.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const checkUserExists = async (req, res, next) => {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      // If no user is found, respond with an error
      return res.status(404).json({ error: 'User not found' });
    }

    // User exists; proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle any errors during database operation
    console.error('Error checking user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = checkUserExists;
