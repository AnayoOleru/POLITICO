import jwt from 'jsonwebtoken';
import db from '../databaseTables/dbconnect';
import dotenv from 'dotenv';

dotenv.config();

const TokenAuth = {

 /**
   * Verify Token
   * @param {object} req 
   * @param {object} res 
   * @param {object} next
   * @returns {object|void} response object 
   */
  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    console.log(token);
    if(!token) {
      return res.status(400).send({
        "status": 400, 
        "error": "Token is not provided" 
    });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await db.query(text, [decoded.id]);
      if(!rows) {
        return res.status(400).send({
            "status": 400, 
            "error": "The token you provided is invalid" 
        });
      }
      req.user = { id: decoded.id, isAdmin: decoded.isAdmin };
      next();
    } catch(error) {
      return res.status(500).send({
        "status": 500, 
        "error": "sorry something went wrong, go back and check" 
    });
    }
}
};

export default TokenAuth;