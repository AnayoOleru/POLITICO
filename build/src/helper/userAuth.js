'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _userAuthHelper;

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _dbconnect = require('../controllers/databaseTables/dbconnect');

var _dbconnect2 = _interopRequireDefault(_dbconnect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var userAuthHelper = (_userAuthHelper = {
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
    return (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)
    );
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
  isAddress: function isAddress(address) {
    return (/[A-Za-z0-9'\.\-\s\,]/.test(address)
    );
  },

  /**
  * validate address:
  * @description the isAddress methods will pass only
  * if the string contains alphabets, numbers, spaces, period, comma, and dash
  * @param {string} address
  * @returns boolean
  */
  isHigher: function isHigher(higher) {
    if (higher.length < 30) return true;
    return false;
  },


  /**
  * @description allow only alphabets and spaces
  * @param {string} name
  * @returns boolean
  */
  isName: function isName(name) {
    return (/^[A-Za-z\s]+$/.test(name)
    );
  },

  /**
  * @description check if string is digit
  * @param {string} string
  * @returns boolean
  */
  isInt: function isInt(string) {
    return (/^[0]\d{10}$/.test(string)
    );
  },


  /**
  * @description check if string is digit
  * @param {string} string
  * @returns boolean
  */
  isURL: function isURL(string) {
    return (/https?:\/\/[^\s]+/.test(string)
    );
  },


  /**
  * @description check if UUID is valid
  * @param {string} string
  * @returns boolean
  */
  isUUID: function isUUID(string) {
    return (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(string)
    );
  }
}, (0, _defineProperty3.default)(_userAuthHelper, 'isURL', function isURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?' + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + '((\\d{1,3}\\.){3}\\d{1,3}))' + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + '(\\?[;&a-z\\d%_.~+=-]*)?' + '(\\#[-a-z\\d_]*)?$', 'i');
  return pattern.test(str);
}), (0, _defineProperty3.default)(_userAuthHelper, 'isWhiteSpace', function isWhiteSpace(email, password) {
  if (email.includes(' ')) return false;
  if (password.includes(' ')) return false;
  return true;
}), (0, _defineProperty3.default)(_userAuthHelper, 'validateUserId', function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var text, _ref2, rows;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            text = 'SELECT * FROM users WHERE id = $1';
            _context.next = 3;
            return _dbconnect2.default.query(text, [req.params.id]);

          case 3:
            _ref2 = _context.sent;
            rows = _ref2.rows;

            if (rows) {
              _context.next = 7;
              break;
            }

            return _context.abrupt('return', res.status(404).send({
              "status": 404,
              "error": "UserId not found"
            }));

          case 7:
            next();

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function validateUserId(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  }

  return validateUserId;
}()), (0, _defineProperty3.default)(_userAuthHelper, 'generateToken', function generateToken(userToken) {
  var appToken = _jsonwebtoken2.default.sign(userToken, process.env.SECRET, { expiresIn: '1d' });
  return appToken;
}), _userAuthHelper);

exports.default = userAuthHelper;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oZWxwZXIvdXNlckF1dGguanMiXSwibmFtZXMiOlsiZG90ZW52IiwiY29uZmlnIiwidXNlckF1dGhIZWxwZXIiLCJoYXNoUGFzc3dvcmQiLCJwYXNzd29yZCIsImJjcnlwdCIsImhhc2hTeW5jIiwiZ2VuU2FsdFN5bmMiLCJjb21wYXJlUGFzc3dvcmQiLCJjb21wYXJlU3luYyIsImlzVmFsaWRFbWFpbCIsImVtYWlsIiwidGVzdCIsImlzcGFzc3dvcmRWYWxpZCIsImlzQWRkcmVzcyIsImFkZHJlc3MiLCJpc0hpZ2hlciIsImhpZ2hlciIsImxlbmd0aCIsImlzTmFtZSIsIm5hbWUiLCJpc0ludCIsInN0cmluZyIsImlzVVJMIiwiaXNVVUlEIiwic3RyIiwicGF0dGVybiIsIlJlZ0V4cCIsImluY2x1ZGVzIiwicmVxIiwicmVzIiwibmV4dCIsInRleHQiLCJkYiIsInF1ZXJ5IiwicGFyYW1zIiwiaWQiLCJyb3dzIiwic3RhdHVzIiwic2VuZCIsInVzZXJUb2tlbiIsImFwcFRva2VuIiwiand0Iiwic2lnbiIsInByb2Nlc3MiLCJlbnYiLCJTRUNSRVQiLCJleHBpcmVzSW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBQSxpQkFBT0MsTUFBUDs7QUFFQSxJQUFNQztBQUNKOzs7OztBQUtBQyxjQU5JLHdCQU1TQyxRQU5ULEVBTW1CO0FBQ3JCLFdBQU9DLG1CQUFPQyxRQUFQLENBQWdCRixRQUFoQixFQUEwQkMsbUJBQU9FLFdBQVAsQ0FBbUIsQ0FBbkIsQ0FBMUIsQ0FBUDtBQUNELEdBUkc7O0FBU0o7Ozs7OztBQU1BQyxpQkFmSSwyQkFlWUwsWUFmWixFQWUwQkMsUUFmMUIsRUFlb0M7QUFDdEMsV0FBT0MsbUJBQU9JLFdBQVAsQ0FBbUJMLFFBQW5CLEVBQTZCRCxZQUE3QixDQUFQO0FBQ0QsR0FqQkc7O0FBa0JKOzs7OztBQUtBTyxjQXZCSSx3QkF1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cG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0anMnO1xuaW1wb3J0IGp3dCBmcm9tICdqc29ud2VidG9rZW4nO1xuaW1wb3J0IGRvdGVudiBmcm9tICdkb3RlbnYnO1xuaW1wb3J0IGRiIGZyb20gJy4uL2NvbnRyb2xsZXJzL2RhdGFiYXNlVGFibGVzL2RiY29ubmVjdCc7XG5cbmRvdGVudi5jb25maWcoKTtcblxuY29uc3QgdXNlckF1dGhIZWxwZXIgPSB7XG4gIC8qKlxuICAgKiBIYXNoIFBhc3N3b3JkIE1ldGhvZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGFzc3dvcmRcbiAgICogQHJldHVybnMge3N0cmluZ30gcmV0dXJucyBoYXNoZWQgcGFzc3dvcmRcbiAgICovXG4gIGhhc2hQYXNzd29yZChwYXNzd29yZCkge1xuICAgIHJldHVybiBiY3J5cHQuaGFzaFN5bmMocGFzc3dvcmQsIGJjcnlwdC5nZW5TYWx0U3luYyg4KSlcbiAgfSxcbiAgLyoqXG4gICAqIGNvbXBhcmVQYXNzd29yZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gaGFzaFBhc3N3b3JkIFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGFzc3dvcmQgXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSByZXR1cm4gVHJ1ZSBvciBGYWxzZVxuICAgKi9cbiAgY29tcGFyZVBhc3N3b3JkKGhhc2hQYXNzd29yZCwgcGFzc3dvcmQpIHtcbiAgICByZXR1cm4gYmNyeXB0LmNvbXBhcmVTeW5jKHBhc3N3b3JkLCBoYXNoUGFzc3dvcmQpO1xuICB9LFxuICAvKipcbiAgICogaXNWYWxpZEVtYWlsIGhlbHBlciBtZXRob2RcbiAgICogQHBhcmFtIHtzdHJpbmd9IGVtYWlsXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIG9yIEZhbHNlXG4gICAqL1xuICBpc1ZhbGlkRW1haWwoZW1haWwpIHtcbiAgICByZXR1cm4gL1xcUytAXFxTK1xcLlxcUysvLnRlc3QoZW1haWwpO1xuICB9LFxuICAvKipcbiAgICogaXNwYXNzd29yZCB2YWxpZCBoZWxwZXIgbWV0aG9kXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXNzd29yZCBcbiAgICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgb3IgRmFsc2VcbiAgICovXG4gIGlzcGFzc3dvcmRWYWxpZChwYXNzd29yZCkge1xuICAgcmV0dXJuICgvXig/PS4qW0EtWmEtel0pKD89LipcXGQpW0EtWmEtelxcZF17OCx9JC8udGVzdChwYXNzd29yZCkpXG4gICAgICAvLyBpZihwYXNzd29yZC5cbiAgICAgIC8vICAgbGVuZ3RoID4gNikgcmV0dXJuIHRydWU7XG4gICAgICAvLyByZXR1cm4gZmFsc2U7XG4gIH0sXG4gIC8qKlxuXHQgKiB2YWxpZGF0ZSBhZGRyZXNzOlxuXHQgKiBAZGVzY3JpcHRpb24gdGhlIGlzQWRkcmVzcyBtZXRob2RzIHdpbGwgcGFzcyBvbmx5XG5cdCAqIGlmIHRoZSBzdHJpbmcgY29udGFpbnMgYWxwaGFiZXRzLCBudW1iZXJzLCBzcGFjZXMsIHBlcmlvZCwgY29tbWEsIGFuZCBkYXNoXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzXG5cdCAqIEByZXR1cm5zIGJvb2xlYW5cblx0ICovXG4gIGlzQWRkcmVzcyhhZGRyZXNzKSB7XG4gICAgcmV0dXJuICgvW0EtWmEtejAtOSdcXC5cXC1cXHNcXCxdLy50ZXN0KGFkZHJlc3MpKTtcbiAgfSxcbiAgLyoqXG5cdCAqIHZhbGlkYXRlIGFkZHJlc3M6XG5cdCAqIEBkZXNjcmlwdGlvbiB0aGUgaXNBZGRyZXNzIG1ldGhvZHMgd2lsbCBwYXNzIG9ubHlcblx0ICogaWYgdGhlIHN0cmluZyBjb250YWlucyBhbHBoYWJldHMsIG51bWJlcnMsIHNwYWNlcywgcGVyaW9kLCBjb21tYSwgYW5kIGRhc2hcblx0ICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3Ncblx0ICogQHJldHVybnMgYm9vbGVhblxuXHQgKi9cbiAgaXNIaWdoZXIoaGlnaGVyKSB7XG4gICAgaWYoaGlnaGVyLmxlbmd0aCA8IDMwKSByZXR1cm4gdHJ1ZTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfSxcblxuICBcbiAgLyoqXG5cdCAqIEBkZXNjcmlwdGlvbiBhbGxvdyBvbmx5IGFscGhhYmV0cyBhbmQgc3BhY2VzXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG5cdCAqIEByZXR1cm5zIGJvb2xlYW5cblx0ICovXG4gIGlzTmFtZShuYW1lKSB7XG4gICAgcmV0dXJuICgvXltBLVphLXpcXHNdKyQvLnRlc3QobmFtZSkpO1xuICB9LFxuICAvKipcblx0ICogQGRlc2NyaXB0aW9uIGNoZWNrIGlmIHN0cmluZyBpcyBkaWdpdFxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nXG5cdCAqIEByZXR1cm5zIGJvb2xlYW5cblx0ICovXG4gIGlzSW50KHN0cmluZykge1xuICAgIHJldHVybiAoL15bMF1cXGR7MTB9JC8udGVzdChzdHJpbmcpKTtcblxuICAgIFxuICB9LFxuXG4gIC8qKlxuXHQgKiBAZGVzY3JpcHRpb24gY2hlY2sgaWYgc3RyaW5nIGlzIGRpZ2l0XG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmdcblx0ICogQHJldHVybnMgYm9vbGVhblxuXHQgKi9cbiAgaXNVUkwoc3RyaW5nKSB7XG4gICAgcmV0dXJuICgvaHR0cHM/OlxcL1xcL1teXFxzXSsvLnRlc3Qoc3RyaW5nKSk7XG5cbiAgICBcbiAgfSxcblxuICAvKipcblx0ICogQGRlc2NyaXB0aW9uIGNoZWNrIGlmIFVVSUQgaXMgdmFsaWRcblx0ICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZ1xuXHQgKiBAcmV0dXJucyBib29sZWFuXG5cdCAqL1xuICBpc1VVSUQoc3RyaW5nKSB7XG4gICAgcmV0dXJuICgvXlswLTlhLWZBLUZdezh9LVswLTlhLWZBLUZdezR9LVswLTlhLWZBLUZdezR9LVswLTlhLWZBLUZdezR9LVswLTlhLWZBLUZdezEyfSQvLnRlc3Qoc3RyaW5nKSk7XG5cbiAgICBcbiAgfSxcbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBjaGVjayBpZiBzdHJpbmcgaXMgdXJsXG4gICAqIEBvcmlnaW5hbEFhdXRob3IgRGlvZ28gQ2FyZG9zb1xuICAgKmh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzU3MTcwOTMvY2hlY2staWYtYS1qYXZhc2NyaXB0LXN0cmluZy1pcy1hLXVybFxuICAgKiBAZWRpdGVkIEVtbWFudWVsIERhbmllbCA8QGVtbXNkYW4+LCBNYWRlIGl0IGVzNiBjb21wYWN0YWJsZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0clxuICAgKiBAcmV0dXJucyBib29sZWFuXG4gICAqL1xuICBpc1VSTChzdHIpIHtcbiAgICBjb25zdCBwYXR0ZXJuID0gbmV3IFJlZ0V4cCgnXihodHRwcz86XFxcXC9cXFxcLyk/J1xuICArICcoKChbYS16XFxcXGRdKFthLXpcXFxcZC1dKlthLXpcXFxcZF0pKilcXFxcLikrW2Etel17Mix9fCdcbiAgKyAnKChcXFxcZHsxLDN9XFxcXC4pezN9XFxcXGR7MSwzfSkpJ1xuICArICcoXFxcXDpcXFxcZCspPyhcXFxcL1stYS16XFxcXGQlXy5+K10qKSonXG4gICsgJyhcXFxcP1s7JmEtelxcXFxkJV8ufis9LV0qKT8nXG4gICsgJyhcXFxcI1stYS16XFxcXGRfXSopPyQnLCAnaScpO1xuICAgIHJldHVybiBwYXR0ZXJuLnRlc3Qoc3RyKTtcbiAgfSxcbiAgLyoqXG4gICAqIGlzd2hpdGVzcGFjZSBoZWxwZXIgbWV0aG9kXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBlbWFpbFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGFzc3dvcmRcbiAgICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgb3IgRmFsc2UgXG4gICAqL1xuICBpc1doaXRlU3BhY2UoZW1haWwsIHBhc3N3b3JkKSB7XG4gICAgICBpZihlbWFpbC5pbmNsdWRlcygnICcpKSByZXR1cm4gZmFsc2U7XG4gICAgICBpZihwYXNzd29yZC5pbmNsdWRlcygnICcpKSByZXR1cm4gZmFsc2U7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgIC8qKlxuICAgKiBpc3doaXRlc3BhY2UgaGVscGVyIG1ldGhvZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gZW1haWxcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhc3N3b3JkXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIG9yIEZhbHNlIFxuICAgKi9cbiAgYXN5bmMgdmFsaWRhdGVVc2VySWQocmVxLCByZXMsIG5leHQpIHtcbiAgICBjb25zdCB0ZXh0ID0gJ1NFTEVDVCAqIEZST00gdXNlcnMgV0hFUkUgaWQgPSAkMSc7XG4gICAgICBjb25zdCB7IHJvd3MgfSA9IGF3YWl0IGRiLnF1ZXJ5KHRleHQsIFtyZXEucGFyYW1zLmlkXSk7XG4gICAgICBpZighcm93cykge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLnNlbmQoe1xuICAgICAgICAgIFwic3RhdHVzXCI6IDQwNCxcbiAgICAgICAgICBcImVycm9yXCI6IFwiVXNlcklkIG5vdCBmb3VuZFwiXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgbmV4dCgpO1xufSxcbiAgLyoqXG4gICAqIEduZXJhdGUgVG9rZW5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IHRva2VuXG4gICAqL1xuICBnZW5lcmF0ZVRva2VuKHVzZXJUb2tlbikge1xuICAgIGNvbnN0IGFwcFRva2VuID0gand0LnNpZ24oXG4gICAgICB1c2VyVG9rZW4sXG4gICAgICBwcm9jZXNzLmVudi5TRUNSRVQsIHsgZXhwaXJlc0luOiAnMWQnIH1cbiAgICApO1xuICAgIHJldHVybiBhcHBUb2tlbjtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB1c2VyQXV0aEhlbHBlcjsiXX0=