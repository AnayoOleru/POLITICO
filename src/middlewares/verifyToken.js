import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({
      status: 401,
      error: 'You need a token to access this route',
    });
  }
  try {
    const decoded = await jwt.verify(token, process.env.SECRET);
    res.locals.user = { id: decoded.userId };
  } catch (error) {
    return res.status(401).send({
      status: 401,
      error: 'Invalid token',
    });
  }
  return next();
};

export default verifyToken;
