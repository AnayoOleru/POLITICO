import Query from '../helpers/Query';

const userInfoExists = async (req, res, next) => {
  const { rows } = await Query.checkDuplicate('users', 'email', [res.locals.email]);
  if (rows[0]) {
    return res.status(409).send({
      status: 409,
      error: 'Email Address Already Exists',
    });
  }
  return next();
};

export default userInfoExists;
