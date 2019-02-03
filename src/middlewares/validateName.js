const validateName = (req, res, next) => {
  let partyNameLength;
  let error;
  if (req.body.name) {
    if (/^[A-Z\s]+$/i.test(req.body.name)) {
      res.locals.partyName = req.body.name.trim().replace(/\s{2,}/gi, ' ');
      partyNameLength = res.locals.partyName.split(/\s+/).length;
      if (partyNameLength < 2) error = 'Party Name should be more than one word';
      if (res.locals.partyName.length > 70) error = 'Party name is too Long';
    } else error = 'Party name is invalid';
  }
  if (error)
    return res.status(400).send({
      status: 400,
      error,
    });
  return next();
};

export default validateName;
