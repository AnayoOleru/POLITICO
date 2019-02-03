import uploadImage from '../helpers/uploadImage';

const uploadPassport = (req, res, next) => {
  uploadImage('passportUrl', req, res, next);
};

export default uploadPassport;
