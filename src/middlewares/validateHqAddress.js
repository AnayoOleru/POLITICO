import dotenv from 'dotenv';
import googleMaps from '@google/maps';

dotenv.load();

const validateHqAddress = (req, res, next) => {
  try {
    const googleMapsClient = googleMaps.createClient({
      key: process.env.GOOGLE_API_KEY,
    });
    googleMapsClient.places(
      {
        query: req.body.hqAddress.trim().replace(/\s{2,}/gi, ' '),
      },
      (err, response) => {
        if (response.json.results[0]) {
          res.locals.address = response.json.results[0].formatted_address;
          return next();
        }
        res.locals.address = req.body.hqAddress.trim().replace(/\s{2,}/gi, ' ');
        return next();
      },
    );
  } catch (error) {
    res.locals.address = req.body.hqAddress.trim().replace(/\s{2,}/gi, ' ');
    return next();
  }
};

export default validateHqAddress;
