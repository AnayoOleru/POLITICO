import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../controllers/databaseTables/dbconnect';

dotenv.config();

const userAuthHelper = {
  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  },
  /**
   * comparePassword
   * @param {string} hashPassword 
   * @param {string} password 
   * @returns {Boolean} return True or False
   */
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  /**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },
  /**
   * ispassword valid helper method
   * @param {string} password 
   * @returns {Boolean} True or False
   */
  ispasswordValid(password) {
   return (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password))
      // if(password.
      //   length > 6) return true;
      // return false;
  },
  /**
	 * validate address:
	 * @description the isAddress methods will pass only
	 * if the string contains alphabets, numbers, spaces, period, comma, and dash
	 * @param {string} address
	 * @returns boolean
	 */
  isAddress(address) {
    return (/[A-Za-z0-9'\.\-\s\,]/.test(address));
  },
  /**
	 * validate address:
	 * @description the isAddress methods will pass only
	 * if the string contains alphabets, numbers, spaces, period, comma, and dash
	 * @param {string} address
	 * @returns boolean
	 */
  isHigher(higher) {
    if(higher.length < 30) return true;
      return false;
  },

  
  /**
	 * @description allow only alphabets and spaces
	 * @param {string} name
	 * @returns boolean
	 */
  isName(name) {
    return (/^[A-Za-z\s]+$/.test(name));
  },
  /**
	 * @description check if string is digit
	 * @param {string} string
	 * @returns boolean
	 */
  isInt(string) {
    return (/^[0]\d{10}$/.test(string));

    
  },

  /**
	 * @description check if string is digit
	 * @param {string} string
	 * @returns boolean
	 */
  isURL(string) {
    return (/https?:\/\/[^\s]+/.test(string));

    
  },

  /**
	 * @description check if UUID is valid
	 * @param {string} string
	 * @returns boolean
	 */
  isUUID(string) {
    return (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(string));

    
  },
  /**
   * @description check if string is url
   * @originalAauthor Diogo Cardoso
   *https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
   * @edited Emmanuel Daniel <@emmsdan>, Made it es6 compactable.
   * @param {string} str
   * @returns boolean
   */
  isURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?'
  + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'
  + '((\\d{1,3}\\.){3}\\d{1,3}))'
  + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'
  + '(\\?[;&a-z\\d%_.~+=-]*)?'
  + '(\\#[-a-z\\d_]*)?$', 'i');
    return pattern.test(str);
  },
  /**
   * iswhitespace helper method
   * @param {string} email
   * @param {string} password
   * @returns {Boolean} True or False 
   */
  isWhiteSpace(email, password) {
      if(email.includes(' ')) return false;
      if(password.includes(' ')) return false;
      return true;
  },
   /**
   * iswhitespace helper method
   * @param {string} email
   * @param {string} password
   * @returns {Boolean} True or False 
   */
  async validateUserId(req, res, next) {
    const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await db.query(text, [req.params.id]);
      if(!rows) {
        return res.status(404).send({
          "status": 404,
          "error": "UserId not found"
        });
      }
      next();
},
  /**
   * Gnerate Token
   * @param {string} id
   * @returns {string} token
   */
  generateToken(userToken) {
    const appToken = jwt.sign(
      userToken,
      process.env.SECRET, { expiresIn: '1d' }
    );
    return appToken;
  }
}

export default userAuthHelper;