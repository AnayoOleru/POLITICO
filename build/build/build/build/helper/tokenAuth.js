'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault2(_regenerator);

function _interopRequireDefault2(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dbconnect = require('../databaseTables/dbconnect');

var _dbconnect2 = _interopRequireDefault(_dbconnect);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _asyncToGenerator(fn) {
  return function () {
    var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);var value = info.value;
        } catch (error) {
          reject(error);return;
        }if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }return step("next");
    });
  };
}

var TokenAuth = {

  /**
   * Verify Token
   * @param {object} req 
   * @param {object} res 
   * @param {object} next
   * @returns {object|void} response object 
   */
  verifyToken: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2hlbHBlci90b2tlbkF1dGguanMiXSwibmFtZXMiOlsiVG9rZW5BdXRoIiwicmVxIiwiand0IiwicHJvY2VzcyIsImRiIiwiZGVjb2RlZCIsInJvd3MiLCJpZCIsIm5leHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQSxnQkFBQSxRQUFBLGNBQUEsQ0FBQTs7OztBQUNBLElBQUEsYUFBQSxRQUFBLDZCQUFBLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFlBQVk7O0FBRWhCOzs7Ozs7O0FBRmdCLGVBQUEsWUFBQTtBQUFBLFFBQUEsT0FBQSxtQkFBQSxhQUFBLGNBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxTQUFBLE9BQUEsQ0FBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLElBQUEsRUFBQTtBQUFBLFVBQUEsS0FBQSxFQUFBLE9BQUEsRUFBQSxJQUFBLEVBQUEsS0FBQSxFQUFBLElBQUE7O0FBQUEsYUFBQSxjQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsU0FBQSxRQUFBLENBQUEsUUFBQSxFQUFBO0FBQUEsZUFBQSxDQUFBLEVBQUE7QUFBQSxrQkFBQSxTQUFBLElBQUEsR0FBQSxTQUFBLElBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsc0JBVUFDLElBQUFBLE9BQUFBLENBVkEsZ0JBVUFBLENBVkE7O0FBQUEsa0JBQUEsS0FBQSxFQUFBO0FBQUEseUJBQUEsSUFBQSxHQUFBLENBQUE7QUFBQTtBQUFBOztBQUFBLHFCQUFBLFNBQUEsTUFBQSxDQUFBLFFBQUEsRUFZTCxJQUFBLE1BQUEsQ0FBQSxHQUFBLEVBQUEsSUFBQSxDQUFxQjtBQUMxQiwwQkFEMEIsR0FBQTtBQUUxQix5QkFBUztBQUZpQixlQUFyQixDQVpLLENBQUE7O0FBQUEsaUJBQUEsQ0FBQTtBQUFBLHVCQUFBLElBQUEsR0FBQSxDQUFBO0FBQUEsdUJBQUEsSUFBQSxHQUFBLENBQUE7QUFBQSxxQkFrQlVDLGVBQUFBLE9BQUFBLENBQUFBLE1BQUFBLENBQUFBLEtBQUFBLEVBQWtCQyxRQUFBQSxHQUFBQSxDQWxCNUIsTUFrQlVELENBbEJWOztBQUFBLGlCQUFBLENBQUE7QUFBQSx3QkFBQSxTQUFBLElBQUE7QUFBQSxxQkFBQSxtQ0FBQTtBQUFBLHVCQUFBLElBQUEsR0FBQSxFQUFBO0FBQUEscUJBb0JXRSxZQUFBQSxPQUFBQSxDQUFBQSxLQUFBQSxDQUFBQSxJQUFBQSxFQUFlLENBQUNDLFFBcEIzQixNQW9CMEIsQ0FBZkQsQ0FwQlg7O0FBQUEsaUJBQUEsRUFBQTtBQUFBLHNCQUFBLFNBQUEsSUFBQTtBQUFBLHFCQUFBLE1BQUEsSUFBQTs7QUFBQSxrQkFxQlJFLEtBckJRLENBcUJSQSxDQXJCUSxFQUFBO0FBQUEseUJBQUEsSUFBQSxHQUFBLEVBQUE7QUFBQTtBQUFBOztBQUFBLHFCQUFBLFNBQUEsTUFBQSxDQUFBLFFBQUEsRUFzQkgsSUFBQSxNQUFBLENBQUEsR0FBQSxFQUFBLElBQUEsQ0FBcUI7QUFDeEIsMEJBRHdCLEdBQUE7QUFFeEIseUJBQVM7QUFGZSxlQUFyQixDQXRCRyxDQUFBOztBQUFBLGlCQUFBLEVBQUE7QUEyQlpMLGtCQUFBQSxJQUFBQSxHQUFXLEVBQUVNLElBQUlGLFFBQWpCSixNQUFXLEVBQVhBO0FBQ0FPO0FBNUJZLHVCQUFBLElBQUEsR0FBQSxFQUFBO0FBQUE7O0FBQUEsaUJBQUEsRUFBQTtBQUFBLHVCQUFBLElBQUEsR0FBQSxFQUFBO0FBQUEsdUJBQUEsRUFBQSxHQUFBLFNBQUEsT0FBQSxFQUFBLENBQUEsQ0FBQTtBQUFBLHFCQUFBLFNBQUEsTUFBQSxDQUFBLFFBQUEsRUE4QkwsSUFBQSxNQUFBLENBQUEsR0FBQSxFQUFBLElBQUEsQ0FBcUI7QUFDMUIsMEJBRDBCLEdBQUE7QUFFMUIseUJBQUEsU0FBQTtBQUYwQixlQUFyQixDQTlCSyxDQUFBOztBQUFBLGlCQUFBLEVBQUE7QUFBQSxpQkFBQSxLQUFBO0FBQUEscUJBQUEsU0FBQSxJQUFBLEVBQUE7QUFBQTtBQUFBO0FBQUEsT0FBQSxFQUFBLE9BQUEsRUFBQSxJQUFBLEVBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxFQUFBLENBQUEsQ0FBQSxDQUFBO0FBQUEsS0FBQSxDQUFBLENBQUE7O0FBQUEsYUFBQSxXQUFBLENBQUEsRUFBQSxFQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUE7QUFBQSxhQUFBLEtBQUEsS0FBQSxDQUFBLElBQUEsRUFBQSxTQUFBLENBQUE7QUFBQTs7QUFBQSxXQUFBLFdBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBbEI7O2tCQXNDZVIsUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBqd3QgZnJvbSAnanNvbndlYnRva2VuJztcclxuaW1wb3J0IGRiIGZyb20gJy4uL2RhdGFiYXNlVGFibGVzL2RiY29ubmVjdCc7XHJcblxyXG5jb25zdCBUb2tlbkF1dGggPSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIFZlcmlmeSBUb2tlblxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSByZXEgXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IHJlcyBcclxuICAgKiBAcGFyYW0ge29iamVjdH0gbmV4dFxyXG4gICAqIEByZXR1cm5zIHtvYmplY3R8dm9pZH0gcmVzcG9uc2Ugb2JqZWN0IFxyXG4gICAqL1xyXG4gIGFzeW5jIHZlcmlmeVRva2VuKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICBjb25zdCB0b2tlbiA9IHJlcS5oZWFkZXJzWyd4LWFjY2Vzcy10b2tlbiddO1xyXG4gICAgaWYoIXRva2VuKSB7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XHJcbiAgICAgICAgXCJzdGF0dXNcIjogNDAwLCBcclxuICAgICAgICBcImVycm9yXCI6IFwiVG9rZW4gaXMgbm90IHByb3ZpZGVkXCIgXHJcbiAgICB9KTtcclxuICAgIH1cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGRlY29kZWQgPSBhd2FpdCBqd3QudmVyaWZ5KHRva2VuLCBwcm9jZXNzLmVudi5TRUNSRVQpO1xyXG4gICAgICBjb25zdCB0ZXh0ID0gJ1NFTEVDVCAqIEZST00gdXNlcnMgV0hFUkUgaWQgPSAkMSc7XHJcbiAgICAgIGNvbnN0IHsgcm93cyB9ID0gYXdhaXQgZGIucXVlcnkodGV4dCwgW2RlY29kZWQudXNlcklkXSk7XHJcbiAgICAgIGlmKCFyb3dzWzBdKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcclxuICAgICAgICAgICAgXCJzdGF0dXNcIjogNDAwLCBcclxuICAgICAgICAgICAgXCJlcnJvclwiOiBcIlRoZSB0b2tlbiB5b3UgcHJvdmlkZWQgaXMgaW52YWxpZFwiIFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJlcS51c2VyID0geyBpZDogZGVjb2RlZC51c2VySWQgfTtcclxuICAgICAgbmV4dCgpO1xyXG4gICAgfSBjYXRjaChlcnJvcikge1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xyXG4gICAgICAgIFwic3RhdHVzXCI6IDQwMCwgXHJcbiAgICAgICAgXCJlcnJvclwiOiBlcnJvciBcclxuICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRva2VuQXV0aDsiXX0=