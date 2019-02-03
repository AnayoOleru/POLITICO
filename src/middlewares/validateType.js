const isValidType = (req, res, next) => {
  const acceptedType = ['federal', 'legislature', 'state', 'local'];

  if (!acceptedType.includes(req.body.type)) {
    return res.status(400).send({
      status: 400,
      error: 'Type not valid. Valid types are: federal, legislature, state and local',
    });
  }
  return next();
};

export default isValidType;
