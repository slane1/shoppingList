import jwt from 'jsonwebtoken';

async function verifyToken(req, res, next) {
  const token = req.cookies.token;
  console.log("token", token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}

export default verifyToken;