'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userAuthHelper = {
  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
  hashPassword: function hashPassword(password) {
    return _bcryptjs2.default.hashSync(password, _bcryptjs2.default.genSaltSync(8));
  },

  /**
   * comparePassword
   * @param {string} hashPassword 
   * @param {string} password 
   * @returns {Boolean} return True or False
   */
  comparePassword: function comparePassword(hashPassword, password) {
    return _bcryptjs2.default.compareSync(password, hashPassword);
  },

  /**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
  isValidEmail: function isValidEmail(email) {
    return (/\S+@\S+\.\S+/.test(email)
    );
  },

  /**
   * ispassword valid helper method
   * @param {string} password 
   * @returns {Boolean} True or False
   */
  ispasswordValid: function ispasswordValid(password) {
    if (password.length > 4) return true;
    return false;
  },

  /**
   * iswhitespace helper method
   * @param {string} email
   * @param {string} password
   * @returns {Boolean} True or False 
   */
  isWhiteSpace: function isWhiteSpace(email, password) {
    if (email.includes(' ')) return false;
    if (password.includes(' ')) return false;
    return true;
  },

  /**
   * Gnerate Token
   * @param {string} id
   * @returns {string} token
   */
  generateToken: function generateToken(id) {
    var token = _jsonwebtoken2.default.sign({
      userId: id
    }, process.env.SECRET, { expiresIn: '7d' });
    return token;
  }
};

exports.default = userAuthHelper;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2hlbHBlci91c2VyQXV0aC5qcyJdLCJuYW1lcyI6WyJ1c2VyQXV0aEhlbHBlciIsImhhc2hQYXNzd29yZCIsInBhc3N3b3JkIiwiYmNyeXB0IiwiaGFzaFN5bmMiLCJnZW5TYWx0U3luYyIsImNvbXBhcmVQYXNzd29yZCIsImNvbXBhcmVTeW5jIiwiaXNWYWxpZEVtYWlsIiwiZW1haWwiLCJ0ZXN0IiwiaXNwYXNzd29yZFZhbGlkIiwibGVuZ3RoIiwiaXNXaGl0ZVNwYWNlIiwiaW5jbHVkZXMiLCJnZW5lcmF0ZVRva2VuIiwiaWQiLCJ0b2tlbiIsImp3dCIsInNpZ24iLCJ1c2VySWQiLCJwcm9jZXNzIiwiZW52IiwiU0VDUkVUIiwiZXhwaXJlc0luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxpQkFBaUI7QUFDckI7Ozs7O0FBS0FDLGNBTnFCLHdCQU1SQyxRQU5RLEVBTUU7QUFDckIsV0FBT0MsbUJBQU9DLFFBQVAsQ0FBZ0JGLFFBQWhCLEVBQTBCQyxtQkFBT0UsV0FBUCxDQUFtQixDQUFuQixDQUExQixDQUFQO0FBQ0QsR0FSb0I7O0FBU3JCOzs7Ozs7QUFNQUMsaUJBZnFCLDJCQWVMTCxZQWZLLEVBZVNDLFFBZlQsRUFlbUI7QUFDdEMsV0FBT0MsbUJBQU9JLFdBQVAsQ0FBbUJMLFFBQW5CLEVBQTZCRCxZQUE3QixDQUFQO0FBQ0QsR0FqQm9COztBQWtCckI7Ozs7O0FBS0FPLGNBdkJxQix3QkF1QlJDLEtBdkJRLEVBdUJEO0FBQ2xCLFdBQU8sZ0JBQWVDLElBQWYsQ0FBb0JELEtBQXBCO0FBQVA7QUFDRCxHQXpCb0I7O0FBMEJyQjs7Ozs7QUFLQUUsaUJBL0JxQiwyQkErQkxULFFBL0JLLEVBK0JLO0FBQ3RCLFFBQUdBLFNBQVNVLE1BQVQsR0FBa0IsQ0FBckIsRUFBd0IsT0FBTyxJQUFQO0FBQ3hCLFdBQU8sS0FBUDtBQUNILEdBbENvQjs7QUFtQ3JCOzs7Ozs7QUFNQUMsY0F6Q3FCLHdCQXlDUkosS0F6Q1EsRUF5Q0RQLFFBekNDLEVBeUNTO0FBQzFCLFFBQUdPLE1BQU1LLFFBQU4sQ0FBZSxHQUFmLENBQUgsRUFBd0IsT0FBTyxLQUFQO0FBQ3hCLFFBQUdaLFNBQVNZLFFBQVQsQ0FBa0IsR0FBbEIsQ0FBSCxFQUEyQixPQUFPLEtBQVA7QUFDM0IsV0FBTyxJQUFQO0FBQ0gsR0E3Q29COztBQThDckI7Ozs7O0FBS0FDLGVBbkRxQix5QkFtRFBDLEVBbkRPLEVBbURIO0FBQ2hCLFFBQU1DLFFBQVFDLHVCQUFJQyxJQUFKLENBQVM7QUFDckJDLGNBQVFKO0FBRGEsS0FBVCxFQUdaSyxRQUFRQyxHQUFSLENBQVlDLE1BSEEsRUFHUSxFQUFFQyxXQUFXLElBQWIsRUFIUixDQUFkO0FBS0EsV0FBT1AsS0FBUDtBQUNEO0FBMURvQixDQUF2Qjs7a0JBNkRlakIsYyIsImZpbGUiOiJ1c2VyQXV0aC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0anMnO1xyXG5pbXBvcnQgand0IGZyb20gJ2pzb253ZWJ0b2tlbic7XHJcblxyXG5jb25zdCB1c2VyQXV0aEhlbHBlciA9IHtcclxuICAvKipcclxuICAgKiBIYXNoIFBhc3N3b3JkIE1ldGhvZFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXNzd29yZFxyXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IHJldHVybnMgaGFzaGVkIHBhc3N3b3JkXHJcbiAgICovXHJcbiAgaGFzaFBhc3N3b3JkKHBhc3N3b3JkKSB7XHJcbiAgICByZXR1cm4gYmNyeXB0Lmhhc2hTeW5jKHBhc3N3b3JkLCBiY3J5cHQuZ2VuU2FsdFN5bmMoOCkpXHJcbiAgfSxcclxuICAvKipcclxuICAgKiBjb21wYXJlUGFzc3dvcmRcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gaGFzaFBhc3N3b3JkIFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXNzd29yZCBcclxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gcmV0dXJuIFRydWUgb3IgRmFsc2VcclxuICAgKi9cclxuICBjb21wYXJlUGFzc3dvcmQoaGFzaFBhc3N3b3JkLCBwYXNzd29yZCkge1xyXG4gICAgcmV0dXJuIGJjcnlwdC5jb21wYXJlU3luYyhwYXNzd29yZCwgaGFzaFBhc3N3b3JkKTtcclxuICB9LFxyXG4gIC8qKlxyXG4gICAqIGlzVmFsaWRFbWFpbCBoZWxwZXIgbWV0aG9kXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGVtYWlsXHJcbiAgICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgb3IgRmFsc2VcclxuICAgKi9cclxuICBpc1ZhbGlkRW1haWwoZW1haWwpIHtcclxuICAgIHJldHVybiAvXFxTK0BcXFMrXFwuXFxTKy8udGVzdChlbWFpbCk7XHJcbiAgfSxcclxuICAvKipcclxuICAgKiBpc3Bhc3N3b3JkIHZhbGlkIGhlbHBlciBtZXRob2RcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGFzc3dvcmQgXHJcbiAgICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgb3IgRmFsc2VcclxuICAgKi9cclxuICBpc3Bhc3N3b3JkVmFsaWQocGFzc3dvcmQpIHtcclxuICAgICAgaWYocGFzc3dvcmQubGVuZ3RoID4gNCkgcmV0dXJuIHRydWU7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICB9LFxyXG4gIC8qKlxyXG4gICAqIGlzd2hpdGVzcGFjZSBoZWxwZXIgbWV0aG9kXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGVtYWlsXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhc3N3b3JkXHJcbiAgICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgb3IgRmFsc2UgXHJcbiAgICovXHJcbiAgaXNXaGl0ZVNwYWNlKGVtYWlsLCBwYXNzd29yZCkge1xyXG4gICAgICBpZihlbWFpbC5pbmNsdWRlcygnICcpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGlmKHBhc3N3b3JkLmluY2x1ZGVzKCcgJykpIHJldHVybiBmYWxzZTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgfSxcclxuICAvKipcclxuICAgKiBHbmVyYXRlIFRva2VuXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICogQHJldHVybnMge3N0cmluZ30gdG9rZW5cclxuICAgKi9cclxuICBnZW5lcmF0ZVRva2VuKGlkKSB7XHJcbiAgICBjb25zdCB0b2tlbiA9IGp3dC5zaWduKHtcclxuICAgICAgdXNlcklkOiBpZFxyXG4gICAgfSxcclxuICAgICAgcHJvY2Vzcy5lbnYuU0VDUkVULCB7IGV4cGlyZXNJbjogJzdkJyB9XHJcbiAgICApO1xyXG4gICAgcmV0dXJuIHRva2VuO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdXNlckF1dGhIZWxwZXI7Il19