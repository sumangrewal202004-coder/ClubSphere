const jwt = require('jsonwebtoken');

module.exports = (roles = []) => {
  return (req, res, next) => {
    console.log('Auth middleware called, roles required:', roles);
    try {
      const authHeader = req.headers.authorization;
      console.log('Auth header present:', !!authHeader);

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('No auth header or wrong format');
        return res.status(401).json({ error: 'No token provided' });
      }

      const token = authHeader.split(' ')[1];
      console.log('Token extracted, length:', token.length);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('JWT decoded successfully, role:', decoded.role);

      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        console.log('Role check failed, user role:', decoded.role, 'required roles:', roles);
        return res.status(403).json({ error: 'Access denied' });
      }

      console.log('Auth middleware passed');
      next();

    } catch (err) {
      console.error('Auth middleware error:', err.message);
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
};