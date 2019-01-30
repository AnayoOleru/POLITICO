'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dbconnect = require('../databaseTables/dbconnect');

var _dbconnect2 = _interopRequireDefault(_dbconnect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var TokenAuth = {

  /**
   * Verify Token
   * @param {object} req 
   * @param {object} res 
   * @param {object} next
   * @returns {object|void} response object 
   */
  verifyToken: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
      var token, decoded, text, _ref2, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
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
                "error": "Token is not provided"
              }));

            case 3:
              _context.prev = 3;
              _context.next = 6;
              return _jsonwebtoken2.default.verify(token, process.env.SECRET);

            case 6:
              decoded = _context.sent;
              text = 'SELECT * FROM users WHERE id = $1';
              _context.next = 10;
              return _dbconnect2.default.query(text, [decoded.userId]);

            case 10:
              _ref2 = _context.sent;
              rows = _ref2.rows;

              if (rows[0]) {
                _context.next = 14;
                break;
              }

              return _context.abrupt('return', res.status(400).send({
                "status": 400,
                "error": "The token you provided is invalid"
              }));

            case 14:
              req.user = { id: decoded.userId };
              next();
              _context.next = 21;
              break;

            case 18:
              _context.prev = 18;
              _context.t0 = _context['catch'](3);
              return _context.abrupt('return', res.status(400).send({
                "status": 400,
                "error": _context.t0
              }));

            case 21:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[3, 18]]);
    }));

    function verifyToken(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    }

    return verifyToken;
  }()
};

exports.default = TokenAuth;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2hlbHBlci90b2tlbkF1dGguanMiXSwibmFtZXMiOlsiVG9rZW5BdXRoIiwidmVyaWZ5VG9rZW4iLCJyZXEiLCJyZXMiLCJuZXh0IiwidG9rZW4iLCJoZWFkZXJzIiwic3RhdHVzIiwic2VuZCIsImp3dCIsInZlcmlmeSIsInByb2Nlc3MiLCJlbnYiLCJTRUNSRVQiLCJkZWNvZGVkIiwidGV4dCIsImRiIiwicXVlcnkiLCJ1c2VySWQiLCJyb3dzIiwidXNlciIsImlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU1BLFlBQVk7O0FBRWhCOzs7Ozs7O0FBT01DLGFBVFU7QUFBQSx3RkFTRUMsR0FURixFQVNPQyxHQVRQLEVBU1lDLElBVFo7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVVSQyxtQkFWUSxHQVVBSCxJQUFJSSxPQUFKLENBQVksZ0JBQVosQ0FWQTs7QUFBQSxrQkFXVkQsS0FYVTtBQUFBO0FBQUE7QUFBQTs7QUFBQSwrQ0FZTEYsSUFBSUksTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQzFCLDBCQUFVLEdBRGdCO0FBRTFCLHlCQUFTO0FBRmlCLGVBQXJCLENBWks7O0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBa0JVQyx1QkFBSUMsTUFBSixDQUFXTCxLQUFYLEVBQWtCTSxRQUFRQyxHQUFSLENBQVlDLE1BQTlCLENBbEJWOztBQUFBO0FBa0JOQyxxQkFsQk07QUFtQk5DLGtCQW5CTSxHQW1CQyxtQ0FuQkQ7QUFBQTtBQUFBLHFCQW9CV0Msb0JBQUdDLEtBQUgsQ0FBU0YsSUFBVCxFQUFlLENBQUNELFFBQVFJLE1BQVQsQ0FBZixDQXBCWDs7QUFBQTtBQUFBO0FBb0JKQyxrQkFwQkksU0FvQkpBLElBcEJJOztBQUFBLGtCQXFCUkEsS0FBSyxDQUFMLENBckJRO0FBQUE7QUFBQTtBQUFBOztBQUFBLCtDQXNCSGhCLElBQUlJLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUN4QiwwQkFBVSxHQURjO0FBRXhCLHlCQUFTO0FBRmUsZUFBckIsQ0F0Qkc7O0FBQUE7QUEyQlpOLGtCQUFJa0IsSUFBSixHQUFXLEVBQUVDLElBQUlQLFFBQVFJLE1BQWQsRUFBWDtBQUNBZDtBQTVCWTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBLCtDQThCTEQsSUFBSUksTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQzFCLDBCQUFVLEdBRGdCO0FBRTFCO0FBRjBCLGVBQXJCLENBOUJLOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsQ0FBbEI7O2tCQXNDZVIsUyIsImZpbGUiOiJ0b2tlbkF1dGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgand0IGZyb20gJ2pzb253ZWJ0b2tlbic7XHJcbmltcG9ydCBkYiBmcm9tICcuLi9kYXRhYmFzZVRhYmxlcy9kYmNvbm5lY3QnO1xyXG5cclxuY29uc3QgVG9rZW5BdXRoID0ge1xyXG5cclxuICAvKipcclxuICAgKiBWZXJpZnkgVG9rZW5cclxuICAgKiBAcGFyYW0ge29iamVjdH0gcmVxIFxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSByZXMgXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IG5leHRcclxuICAgKiBAcmV0dXJucyB7b2JqZWN0fHZvaWR9IHJlc3BvbnNlIG9iamVjdCBcclxuICAgKi9cclxuICBhc3luYyB2ZXJpZnlUb2tlbihyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgY29uc3QgdG9rZW4gPSByZXEuaGVhZGVyc1sneC1hY2Nlc3MtdG9rZW4nXTtcclxuICAgIGlmKCF0b2tlbikge1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xyXG4gICAgICAgIFwic3RhdHVzXCI6IDQwMCwgXHJcbiAgICAgICAgXCJlcnJvclwiOiBcIlRva2VuIGlzIG5vdCBwcm92aWRlZFwiIFxyXG4gICAgfSk7XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBkZWNvZGVkID0gYXdhaXQgand0LnZlcmlmeSh0b2tlbiwgcHJvY2Vzcy5lbnYuU0VDUkVUKTtcclxuICAgICAgY29uc3QgdGV4dCA9ICdTRUxFQ1QgKiBGUk9NIHVzZXJzIFdIRVJFIGlkID0gJDEnO1xyXG4gICAgICBjb25zdCB7IHJvd3MgfSA9IGF3YWl0IGRiLnF1ZXJ5KHRleHQsIFtkZWNvZGVkLnVzZXJJZF0pO1xyXG4gICAgICBpZighcm93c1swXSkge1xyXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XHJcbiAgICAgICAgICAgIFwic3RhdHVzXCI6IDQwMCwgXHJcbiAgICAgICAgICAgIFwiZXJyb3JcIjogXCJUaGUgdG9rZW4geW91IHByb3ZpZGVkIGlzIGludmFsaWRcIiBcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICByZXEudXNlciA9IHsgaWQ6IGRlY29kZWQudXNlcklkIH07XHJcbiAgICAgIG5leHQoKTtcclxuICAgIH0gY2F0Y2goZXJyb3IpIHtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcclxuICAgICAgICBcInN0YXR1c1wiOiA0MDAsIFxyXG4gICAgICAgIFwiZXJyb3JcIjogZXJyb3IgXHJcbiAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUb2tlbkF1dGg7Il19