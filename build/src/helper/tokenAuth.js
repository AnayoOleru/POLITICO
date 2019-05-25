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

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _dbconnect = require('../controllers/databaseTables/dbconnect');

var _dbconnect2 = _interopRequireDefault(_dbconnect);

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
              console.log('I was here');

              token = req.headers['x-access-token'];

              if (token) {
                _context.next = 4;
                break;
              }

              return _context.abrupt('return', res.status(400).send({
                status: 400,
                error: 'User not authorised!'
              }));

            case 4:
              _context.prev = 4;

              // console.log(process.env.SECRET)
              decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET);
              // console.log('2323')

              text = 'SELECT * FROM users WHERE id = $1';
              _context.next = 9;
              return _dbconnect2.default.query(text, [decoded.id]);

            case 9:
              _ref2 = _context.sent;
              rows = _ref2.rows;

              if (rows) {
                _context.next = 13;
                break;
              }

              return _context.abrupt('return', res.status(400).send({
                status: 400,
                error: 'User not authorised!'
              }));

            case 13:
              req.user = { id: decoded.id, isAdmin: decoded.isAdmin };
              next();
              _context.next = 22;
              break;

            case 17:
              _context.prev = 17;
              _context.t0 = _context['catch'](4);

              console.log('here too');

              console.log(_context.t0);
              return _context.abrupt('return', res.status(500).send({
                status: 500,
                error: 'sorry something went wrong, go back and check'
              }));

            case 22:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[4, 17]]);
    }));

    function verifyToken(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    }

    return verifyToken;
  }()
};

exports.default = TokenAuth;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oZWxwZXIvdG9rZW5BdXRoLmpzIl0sIm5hbWVzIjpbImRvdGVudiIsImNvbmZpZyIsIlRva2VuQXV0aCIsInZlcmlmeVRva2VuIiwicmVxIiwicmVzIiwibmV4dCIsImNvbnNvbGUiLCJsb2ciLCJ0b2tlbiIsImhlYWRlcnMiLCJzdGF0dXMiLCJzZW5kIiwiZXJyb3IiLCJkZWNvZGVkIiwiand0IiwidmVyaWZ5IiwicHJvY2VzcyIsImVudiIsIlNFQ1JFVCIsInRleHQiLCJkYiIsInF1ZXJ5IiwiaWQiLCJyb3dzIiwidXNlciIsImlzQWRtaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQUEsaUJBQU9DLE1BQVA7O0FBRUEsSUFBTUMsWUFBWTs7QUFFaEI7Ozs7Ozs7QUFPTUMsYUFUVTtBQUFBLHlHQVNFQyxHQVRGLEVBU09DLEdBVFAsRUFTWUMsSUFUWjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBVWRDLHNCQUFRQyxHQUFSLENBQVksWUFBWjs7QUFFTUMsbUJBWlEsR0FZQUwsSUFBSU0sT0FBSixDQUFZLGdCQUFaLENBWkE7O0FBQUEsa0JBYVRELEtBYlM7QUFBQTtBQUFBO0FBQUE7O0FBQUEsK0NBY0xKLElBQUlNLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUMxQkQsd0JBQVEsR0FEa0I7QUFFMUJFLHVCQUFPO0FBRm1CLGVBQXJCLENBZEs7O0FBQUE7QUFBQTs7QUFvQlo7QUFDTUMscUJBckJNLEdBcUJJQyx1QkFBSUMsTUFBSixDQUFXUCxLQUFYLEVBQWtCUSxRQUFRQyxHQUFSLENBQVlDLE1BQTlCLENBckJKO0FBc0JaOztBQUNNQyxrQkF2Qk0sR0F1QkMsbUNBdkJEO0FBQUE7QUFBQSxxQkF3QldDLG9CQUFHQyxLQUFILENBQVNGLElBQVQsRUFBZSxDQUFDTixRQUFRUyxFQUFULENBQWYsQ0F4Qlg7O0FBQUE7QUFBQTtBQXdCSkMsa0JBeEJJLFNBd0JKQSxJQXhCSTs7QUFBQSxrQkEwQlBBLElBMUJPO0FBQUE7QUFBQTtBQUFBOztBQUFBLCtDQTJCSG5CLElBQUlNLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUMxQkQsd0JBQVEsR0FEa0I7QUFFMUJFLHVCQUFPO0FBRm1CLGVBQXJCLENBM0JHOztBQUFBO0FBZ0NaVCxrQkFBSXFCLElBQUosR0FBVyxFQUFFRixJQUFJVCxRQUFRUyxFQUFkLEVBQWtCRyxTQUFTWixRQUFRWSxPQUFuQyxFQUFYO0FBQ0FwQjtBQWpDWTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFtQ1pDLHNCQUFRQyxHQUFSLENBQVksVUFBWjs7QUFFQUQsc0JBQVFDLEdBQVI7QUFyQ1ksK0NBc0NMSCxJQUFJTSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDMUJELHdCQUFRLEdBRGtCO0FBRTFCRSx1QkFBTztBQUZtQixlQUFyQixDQXRDSzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLENBQWxCOztrQkE4Q2VYLFMiLCJmaWxlIjoidG9rZW5BdXRoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGp3dCBmcm9tICdqc29ud2VidG9rZW4nO1xuaW1wb3J0IGRvdGVudiBmcm9tICdkb3RlbnYnO1xuaW1wb3J0IGRiIGZyb20gJy4uL2NvbnRyb2xsZXJzL2RhdGFiYXNlVGFibGVzL2RiY29ubmVjdCc7XG5cbmRvdGVudi5jb25maWcoKTtcblxuY29uc3QgVG9rZW5BdXRoID0ge1xuXG4gIC8qKlxuICAgKiBWZXJpZnkgVG9rZW5cbiAgICogQHBhcmFtIHtvYmplY3R9IHJlcVxuICAgKiBAcGFyYW0ge29iamVjdH0gcmVzXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBuZXh0XG4gICAqIEByZXR1cm5zIHtvYmplY3R8dm9pZH0gcmVzcG9uc2Ugb2JqZWN0XG4gICAqL1xuICBhc3luYyB2ZXJpZnlUb2tlbihyZXEsIHJlcywgbmV4dCkge1xuICAgIGNvbnNvbGUubG9nKCdJIHdhcyBoZXJlJyk7XG4gIFxuICAgIGNvbnN0IHRva2VuID0gcmVxLmhlYWRlcnNbJ3gtYWNjZXNzLXRva2VuJ107XG4gICAgaWYgKCF0b2tlbikge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgIGVycm9yOiAnVXNlciBub3QgYXV0aG9yaXNlZCEnLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhwcm9jZXNzLmVudi5TRUNSRVQpXG4gICAgICBjb25zdCBkZWNvZGVkID0gand0LnZlcmlmeSh0b2tlbiwgcHJvY2Vzcy5lbnYuU0VDUkVUKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCcyMzIzJylcbiAgICAgIGNvbnN0IHRleHQgPSAnU0VMRUNUICogRlJPTSB1c2VycyBXSEVSRSBpZCA9ICQxJztcbiAgICAgIGNvbnN0IHsgcm93cyB9ID0gYXdhaXQgZGIucXVlcnkodGV4dCwgW2RlY29kZWQuaWRdKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHJvd3MpO1xuICAgICAgaWYgKCFyb3dzKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgICAgZXJyb3I6ICdVc2VyIG5vdCBhdXRob3Jpc2VkIScsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmVxLnVzZXIgPSB7IGlkOiBkZWNvZGVkLmlkLCBpc0FkbWluOiBkZWNvZGVkLmlzQWRtaW4gfTtcbiAgICAgIG5leHQoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coJ2hlcmUgdG9vJyk7XG5cbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogNTAwLFxuICAgICAgICBlcnJvcjogJ3NvcnJ5IHNvbWV0aGluZyB3ZW50IHdyb25nLCBnbyBiYWNrIGFuZCBjaGVjaycsXG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBUb2tlbkF1dGg7XG4iXX0=