const jwt = require('jsonwebtoken');

const authSeller = (req, res, next) => {
  try {
    const {token} = req.cookies;

    if (!token) {
      return res.status(401).json({ message: 'Seller not authorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded.isSeller) {
      return res.status(403).json({ message: 'Seller access only' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Token verification failed' });
  }
};

module.exports = authSeller;