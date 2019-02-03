const validOfficeName = (req, res, next) => {
  let error;
  if (req.body.name) {
    if (/^[A-Z\s]+$/i.test(req.body.name)) {
      res.locals.name = req.body.name.trim().replace(/\s{2,}/gi, ' ');
      if (res.locals.name.length > 60) error = 'Office name is too Long';
    } else error = 'Office name is invalid';
  }
  if (error)
    return res.status(400).send({
      status: 400,
      error,
    });
  return next();
};

export default validOfficeName;
