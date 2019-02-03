import uploadImage from '../helpers/uploadImage';

const uploadlogo = (req, res, next) => {
  uploadImage('logoUrl', req, res, next);
};

export default uploadlogo;
