const jwt = require('jsonwebtoken');

const authSeller = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Check if the user's role is 'Seller'
    if (decoded.role !== 'Seller') {
      return res.status(403).json({ message: 'Access denied. Seller access only.' });
    }

    // Attach the decoded user info (which includes id, name, role, etc.) to the request object
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authSeller;