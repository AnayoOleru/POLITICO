import jwt from 'jsonwebtoken';
import db from '../controllers/databaseTables/dbconnect';
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
    
    if(!token) {
      return res.status(400).send({
        "status": 400, 
        "error": "User not authorised!"  
    });
    }
    try {
      console.log(process.env.SECRET)
      const decoded = jwt.verify(token, process.env.SECRET);
      console.log('2323')
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await db.query(text, [decoded.id]);
      console.log(rows);
      if(!rows) {
        return res.status(400).send({
            "status": 400, 
            "error": "User not authorised!" 
        });
      }
      req.user = { id: decoded.id, isAdmin: decoded.isAdmin };
      next();
    } catch(error) {
      console.log(error)
      return res.status(500).send({
        "status": 500, 
        "error": "sorry something went wrong, go back and check" 
    });
    }
}
};

export default TokenAuth;