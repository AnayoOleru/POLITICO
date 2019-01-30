import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
      if(password.length > 4) return true;
      return false;
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
   * Gnerate Token
   * @param {string} id
   * @returns {string} token
   */
  generateToken(id, isAdmin) {
    const token = jwt.sign({
      userId: id,
      isAdmin
    },
      process.env.SECRET, { expiresIn: '7d' }
    );
    return token;
  }
}

export default userAuthHelper;