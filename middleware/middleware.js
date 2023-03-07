const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
  if (req.url === '/login' || req.url === '/register') {
    return next();
  }
  try {
    const { authorization } = req.headers;
    const decoded = jwt.verify(authorization, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
