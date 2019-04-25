'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dbconnect = require('../controllers/databaseTables/dbconnect');

var _dbconnect2 = _interopRequireDefault(_dbconnect);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var TokenAuth = {

  /**
    * Verify Token
    * @param {object} req 
    * @param {object} res 
    * @param {object} next
    * @returns {object|void} response object 
    */
  verifyToken: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
      var token, decoded, text, _ref2, rows;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              token = req.headers['x-access-token'];

              if (token) {
                _context.next = 3;
                break;
              }

              return _context.abrupt('return', res.status(400).send({
                "status": 400,
                "error": "User not authorised!"
              }));

            case 3:
              _context.prev = 3;

              // console.log(process.env.SECRET)
              decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET);
              // console.log('2323')

              text = 'SELECT * FROM users WHERE id = $1';
              _context.next = 8;
              return _dbconnect2.default.query(text, [decoded.id]);

            case 8:
              _ref2 = _context.sent;
              rows = _ref2.rows;

              if (rows) {
                _context.next = 12;
                break;
              }

              return _context.abrupt('return', res.status(400).send({
                "status": 400,
                "error": "User not authorised!"
              }));

            case 12:
              req.user = { id: decoded.id, isAdmin: decoded.isAdmin };
              next();
              _context.next = 19;
              break;

            case 16:
              _context.prev = 16;
              _context.t0 = _context['catch'](3);
              return _context.abrupt('return', res.status(500).send({
                "status": 500,
                "error": "sorry something went wrong, go back and check"
              }));

            case 19:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[3, 16]]);
    }));

    function verifyToken(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    }

    return verifyToken;
  }()
};

exports.default = TokenAuth;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oZWxwZXIvdG9rZW5BdXRoLmpzIl0sIm5hbWVzIjpbImRvdGVudiIsImNvbmZpZyIsIlRva2VuQXV0aCIsInZlcmlmeVRva2VuIiwicmVxIiwicmVzIiwibmV4dCIsInRva2VuIiwiaGVhZGVycyIsInN0YXR1cyIsInNlbmQiLCJkZWNvZGVkIiwiand0IiwidmVyaWZ5IiwicHJvY2VzcyIsImVudiIsIlNFQ1JFVCIsInRleHQiLCJkYiIsInF1ZXJ5IiwiaWQiLCJyb3dzIiwidXNlciIsImlzQWRtaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQUEsaUJBQU9DLE1BQVA7O0FBRUEsSUFBTUMsWUFBWTs7QUFFakI7Ozs7Ozs7QUFPT0MsYUFUVTtBQUFBLHlHQVNFQyxHQVRGLEVBU09DLEdBVFAsRUFTWUMsSUFUWjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBVVJDLG1CQVZRLEdBVUFILElBQUlJLE9BQUosQ0FBWSxnQkFBWixDQVZBOztBQUFBLGtCQVlWRCxLQVpVO0FBQUE7QUFBQTtBQUFBOztBQUFBLCtDQWFMRixJQUFJSSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDMUIsMEJBQVUsR0FEZ0I7QUFFMUIseUJBQVM7QUFGaUIsZUFBckIsQ0FiSzs7QUFBQTtBQUFBOztBQW1CWjtBQUNNQyxxQkFwQk0sR0FvQklDLHVCQUFJQyxNQUFKLENBQVdOLEtBQVgsRUFBa0JPLFFBQVFDLEdBQVIsQ0FBWUMsTUFBOUIsQ0FwQko7QUFxQlo7O0FBQ01DLGtCQXRCTSxHQXNCQyxtQ0F0QkQ7QUFBQTtBQUFBLHFCQXVCV0Msb0JBQUdDLEtBQUgsQ0FBU0YsSUFBVCxFQUFlLENBQUNOLFFBQVFTLEVBQVQsQ0FBZixDQXZCWDs7QUFBQTtBQUFBO0FBdUJKQyxrQkF2QkksU0F1QkpBLElBdkJJOztBQUFBLGtCQXlCUkEsSUF6QlE7QUFBQTtBQUFBO0FBQUE7O0FBQUEsK0NBMEJIaEIsSUFBSUksTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQ3hCLDBCQUFVLEdBRGM7QUFFeEIseUJBQVM7QUFGZSxlQUFyQixDQTFCRzs7QUFBQTtBQStCWk4sa0JBQUlrQixJQUFKLEdBQVcsRUFBRUYsSUFBSVQsUUFBUVMsRUFBZCxFQUFrQkcsU0FBU1osUUFBUVksT0FBbkMsRUFBWDtBQUNBakI7QUFoQ1k7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQSwrQ0FtQ0xELElBQUlJLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUMxQiwwQkFBVSxHQURnQjtBQUUxQix5QkFBUztBQUZpQixlQUFyQixDQW5DSzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLENBQWxCOztrQkEyQ2VSLFMiLCJmaWxlIjoidG9rZW5BdXRoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGp3dCBmcm9tICdqc29ud2VidG9rZW4nO1xuaW1wb3J0IGRiIGZyb20gJy4uL2NvbnRyb2xsZXJzL2RhdGFiYXNlVGFibGVzL2RiY29ubmVjdCc7XG5pbXBvcnQgZG90ZW52IGZyb20gJ2RvdGVudic7XG5cbmRvdGVudi5jb25maWcoKTtcblxuY29uc3QgVG9rZW5BdXRoID0ge1xuXG4gLyoqXG4gICAqIFZlcmlmeSBUb2tlblxuICAgKiBAcGFyYW0ge29iamVjdH0gcmVxIFxuICAgKiBAcGFyYW0ge29iamVjdH0gcmVzIFxuICAgKiBAcGFyYW0ge29iamVjdH0gbmV4dFxuICAgKiBAcmV0dXJucyB7b2JqZWN0fHZvaWR9IHJlc3BvbnNlIG9iamVjdCBcbiAgICovXG4gIGFzeW5jIHZlcmlmeVRva2VuKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgY29uc3QgdG9rZW4gPSByZXEuaGVhZGVyc1sneC1hY2Nlc3MtdG9rZW4nXTtcbiAgICBcbiAgICBpZighdG9rZW4pIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIFwic3RhdHVzXCI6IDQwMCwgXG4gICAgICAgIFwiZXJyb3JcIjogXCJVc2VyIG5vdCBhdXRob3Jpc2VkIVwiICBcbiAgICB9KTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHByb2Nlc3MuZW52LlNFQ1JFVClcbiAgICAgIGNvbnN0IGRlY29kZWQgPSBqd3QudmVyaWZ5KHRva2VuLCBwcm9jZXNzLmVudi5TRUNSRVQpO1xuICAgICAgLy8gY29uc29sZS5sb2coJzIzMjMnKVxuICAgICAgY29uc3QgdGV4dCA9ICdTRUxFQ1QgKiBGUk9NIHVzZXJzIFdIRVJFIGlkID0gJDEnO1xuICAgICAgY29uc3QgeyByb3dzIH0gPSBhd2FpdCBkYi5xdWVyeSh0ZXh0LCBbZGVjb2RlZC5pZF0pO1xuICAgICAgLy8gY29uc29sZS5sb2cocm93cyk7XG4gICAgICBpZighcm93cykge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICAgICAgXCJzdGF0dXNcIjogNDAwLCBcbiAgICAgICAgICAgIFwiZXJyb3JcIjogXCJVc2VyIG5vdCBhdXRob3Jpc2VkIVwiIFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJlcS51c2VyID0geyBpZDogZGVjb2RlZC5pZCwgaXNBZG1pbjogZGVjb2RlZC5pc0FkbWluIH07XG4gICAgICBuZXh0KCk7XG4gICAgfSBjYXRjaChlcnJvcikge1xuICAgICAgLy8gY29uc29sZS5sb2coZXJyb3IpXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLnNlbmQoe1xuICAgICAgICBcInN0YXR1c1wiOiA1MDAsIFxuICAgICAgICBcImVycm9yXCI6IFwic29ycnkgc29tZXRoaW5nIHdlbnQgd3JvbmcsIGdvIGJhY2sgYW5kIGNoZWNrXCIgXG4gICAgfSk7XG4gICAgfVxufVxufTtcblxuZXhwb3J0IGRlZmF1bHQgVG9rZW5BdXRoOyJdfQ==