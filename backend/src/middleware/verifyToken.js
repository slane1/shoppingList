import jwt from 'jsonwebtoken';

function verifyToken(req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access Denied');
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    req.uername = verified.username;
    req.userId = verified._id;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
}

export default verifyToken;