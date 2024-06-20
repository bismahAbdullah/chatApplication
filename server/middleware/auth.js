
const jwt = require('jsonwebtoken');

// Middleware function to authenticate the user
const authenticate = (req, res, next) => {
  // Get the JWT token from the request headers
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: token is not given' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user object to the request object
    req.user = decoded.user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Unauthorized: token is invalid' });
  }
}

module.exports = {
  authenticate
}
