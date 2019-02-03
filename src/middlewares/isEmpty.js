import { joinStrings, splitName } from '../helpers';

const populateError = (req, ...fields) => {
  const error = [];
  fields.map(field => {
    if (!req.body[field]) error.push(field);
  });
  return error;
};

const setErrorMsg = error => {
  let errorMsg;
  if (error.length === 1) {
    errorMsg = `No values provided for ${error[0]}`;
  } else {
    errorMsg = `No values provided for ${joinStrings(error)}`;
  }
  return errorMsg;
};

const isEmpty = (req, res, next) => {
  let path = req.url.split('/');
  path = path[path.length - 1];
  let error = [];

  if (req.method === 'PATCH') {
    if (!req.body[path]) {
      return res.status(400).send({
        status: 400,
        error: `No ${path} value provided`,
      });
    }
  } else {
    const endpointRoot = req.originalUrl.split('/')[3];
    if (endpointRoot === 'offices') {
      if (req.originalUrl.split('/')[5] === 'register')
        error = populateError(req, 'office', 'party');
      else error = populateError(req, 'name', 'type');
    } else if (endpointRoot === 'parties') error = populateError(req, 'name', 'hqAddress');
    else if (endpointRoot === 'votes') error = populateError(req, 'office', 'candidate');
    else {
      if (!req.body.fullname) {
        error.push('fullname');
      } else {
        const name = splitName(req.body.fullname);
        if (!name.lastName) {
          error.push('lastName');
        }
      }
      const err = populateError(req, 'email', 'phoneNumber', 'password', 'confirmPassword');
      if (err[0]) err.map(e => error.push(e));
    }
    if (error[0]) {
      const errorMsg = setErrorMsg(error);
      return res.status(400).send({
        status: 400,
        error: errorMsg,
      });
    }
  }
  return next();
};

export default isEmpty;
