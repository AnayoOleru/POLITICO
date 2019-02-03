import db from '../models/db';

const justAdmin = async (req, res, next) => {
  const { rows } = await db.query(`SELECT is_admin FROM users WHERE id = $1`, [res.locals.user.id]);
  if (rows[0].is_admin === true) {
    return next();
  }
  return res.status(403).send({
    status: 403,
    error: 'You are not allowed to access this route',
  });
};

export default justAdmin;
