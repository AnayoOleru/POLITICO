import Query from '../helpers/Query';

const officeExists = async (req, res, next) => {  
  const { rows } = await Query.checkDuplicate('offices', 'name', [res.locals.name]);
  if (rows[0]) {
    return res.status(409).send({
      status: 409,
      error: 'Political Office already exists',
    });
  }
  return next();
};

export default officeExists;
