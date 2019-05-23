'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault2(_regenerator);

function _interopRequireDefault2(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _dbconnect = require('../../databaseTables/dbconnect');

var _dbconnect2 = _interopRequireDefault(_dbconnect);

var _userAuth = require('../../helper/userAuth');

var _userAuth2 = _interopRequireDefault(_userAuth);

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

var User = {
  /**
   * Create A User
   * @param {object} req 
   * @param {object} res
   * @returns {object} User Object
   */
  createUser: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
      var hashPassword, createQuery, values, _ref2, rows, token;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!req.body.email || !req.body.password || !req.body.fullname || !req.body.lastname || !req.body.passportUrl)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return', res.status(400).send({
                "status": 400,
                "error": "Some values are missing"
              }));

            case 2:
              if (_userAuth2.default.isWhiteSpace(req.body.email, req.body.password, req, req.body.passportUrl)) {
                _context.next = 4;
                break;
              }

              return _context.abrupt('return', res.status(400).send({
                "status": 400,
                "error": "White Space are not allowed in input fields"
              }));

            case 4:
              if (Helper.isValidEmail(req.body.email)) {
                _context.next = 6;
                break;
              }

              return _context.abrupt('return', res.status(400).send({
                "status": 400,
                "error": "Please enter a valid email"
              }));

            case 6:
              if (_userAuth2.default.ispasswordValid(req.body.password)) {
                _context.next = 8;
                break;
              }

              return _context.abrupt('return', res.status(400).send({
                "status": 400,
                "error": "Password Must Be at least Five Characters And Must Be A string"
              }));

            case 8:
              hashPassword = Helper.hashPassword(req.body.password);
              createQuery = 'INSERT INTO\n      users(id, firstname, lastname, \n        othername, email, phonenumber, passportUrl, \n        password, created_date)\n      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)\n      returning *';
              values = [(0, _v2.default)(), req.body.firstname, req.body.lastname, req.body.othername, req.body.email, req.body.phonenumber, req.body.passportUrl, hashPassword, (0, _moment2.default)(new Date())];
              _context.prev = 11;
              _context.next = 14;
              return _dbconnect2.default.query(createQuery, values);

            case 14:
              _ref2 = _context.sent;
              rows = _ref2.rows;
              token = _userAuth2.default.generateToken(rows[0].id);
              return _context.abrupt('return', res.status(201).header('x-auth-token', token).json({
                status: 201,
                data: [{
                  token: token,
                  user: rows[0]
                }]
              }));

            case 20:
              _context.prev = 20;
              _context.t0 = _context['catch'](11);

              if (!(_context.t0.routine === '_bt_check_unique')) {
                _context.next = 24;
                break;
              }

              return _context.abrupt('return', res.status(400).send({
                "data": 400,
                "message": "User with that EMAIL already exist"
              }));

            case 24:
              return _context.abrupt('return', res.status(400).send({
                "data": _context.t0
              }));

            case 25:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[11, 20]]);
    }));

    function createUser(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return createUser;
  }(),

  /**
   * Login
   * @param {object} req 
   * @param {object} res
   * @returns {object} user object 
   */
  login: function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
      var text, _ref4, rows, token;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(!req.body.email || !req.body.password)) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt('return', res.status(400).send({
                "status": 400,
                "error": "Some values are missing"
              }));

            case 2:
              if (Helper.isValidEmail(req.body.email)) {
                _context2.next = 4;
                break;
              }

              return _context2.abrupt('return', res.status(400).send({
                "status": 400,
                "error": "Please enter a valid email address"
              }));

            case 4:
              text = 'SELECT * FROM users WHERE email = $1';
              _context2.prev = 5;
              _context2.next = 8;
              return _dbconnect2.default.query(text, [req.body.email]);

            case 8:
              _ref4 = _context2.sent;
              rows = _ref4.rows;

              if (rows[0]) {
                _context2.next = 12;
                break;
              }

              return _context2.abrupt('return', res.status(400).send({
                "status": 400,
                "error": "The credentials you provided is incorrect"
              }));

            case 12:
              if (Helper.comparePassword(rows[0].password, req.body.password)) {
                _context2.next = 14;
                break;
              }

              return _context2.abrupt('return', res.status(400).send({
                "status": 400,
                "error": "The credentials you provided is incorrect"
              }));

            case 14:
              token = Helper.generateToken(rows[0].id);
              return _context2.abrupt('return', res.status(200).send({
                "status": 201,
                "data": [{
                  "token": token,
                  "user": rows[0]
                }]
              }));

            case 18:
              _context2.prev = 18;
              _context2.t0 = _context2['catch'](5);
              return _context2.abrupt('return', res.status(400).send({
                "status": 404,
                "error": _context2.t0
              }));

            case 21:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[5, 18]]);
    }));

    function login(_x3, _x4) {
      return _ref3.apply(this, arguments);
    }

    return login;
  }()
};
exports.default = User;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy91c2VyQ3RyLmpzIl0sIm5hbWVzIjpbIlVzZXIiLCJyZXEiLCJ1c2VyQXV0aEhlbHBlciIsIkhlbHBlciIsImRiIiwicm93cyIsInN0YXR1cyIsImRhdGEiLCJ0b2tlbiIsInVzZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQSxVQUFBLFFBQUEsUUFBQSxDQUFBOzs7O0FBQ0EsSUFBQSxLQUFBLFFBQUEsU0FBQSxDQUFBOzs7O0FBQ0EsSUFBQSxhQUFBLFFBQUEsZ0NBQUEsQ0FBQTs7OztBQUNBLElBQUEsWUFBQSxRQUFBLHVCQUFBLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLE9BQU87QUFDWDs7Ozs7O0FBRFcsY0FBQSxZQUFBO0FBQUEsUUFBQSxPQUFBLG1CQUFBLGFBQUEsY0FBQSxPQUFBLENBQUEsSUFBQSxDQUFBLFNBQUEsT0FBQSxDQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUE7QUFBQSxVQUFBLFlBQUEsRUFBQSxXQUFBLEVBQUEsTUFBQSxFQUFBLEtBQUEsRUFBQSxJQUFBLEVBQUEsS0FBQTs7QUFBQSxhQUFBLGNBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxTQUFBLFFBQUEsQ0FBQSxRQUFBLEVBQUE7QUFBQSxlQUFBLENBQUEsRUFBQTtBQUFBLGtCQUFBLFNBQUEsSUFBQSxHQUFBLFNBQUEsSUFBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxrQkFBQSxFQVFMLENBQUNDLElBQUFBLElBQUFBLENBQUQsS0FBQSxJQUFtQixDQUFDQSxJQUFBQSxJQUFBQSxDQUFwQixRQUFBLElBQXlDLENBQUNBLElBQUFBLElBQUFBLENBQTFDLFFBQUEsSUFBK0QsQ0FBQ0EsSUFBQUEsSUFBQUEsQ0FBaEUsUUFBQSxJQUFxRixDQUFDQSxJQUFBQSxJQUFBQSxDQVJqRixXQUFBLENBQUEsRUFBQTtBQUFBLHlCQUFBLElBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQTs7QUFB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O0FBRTFCLHlCQUFBLFVBQUE7QUFGMEIsZUFBckIsQ0ExSEEsQ0FBQTs7QUFBQSxpQkFBQSxFQUFBO0FBQUEsaUJBQUEsS0FBQTtBQUFBLHFCQUFBLFVBQUEsSUFBQSxFQUFBO0FBQUE7QUFBQTtBQUFBLE9BQUEsRUFBQSxRQUFBLEVBQUEsSUFBQSxFQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQSxDQUFBLENBQUEsQ0FBQTtBQUFBLEtBQUEsQ0FBQSxDQUFBOztBQUFBLGFBQUEsS0FBQSxDQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUE7QUFBQSxhQUFBLE1BQUEsS0FBQSxDQUFBLElBQUEsRUFBQSxTQUFBLENBQUE7QUFBQTs7QUFBQSxXQUFBLEtBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBYjtrQkFpSWVMLEkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcbmltcG9ydCB1dWlkdjQgZnJvbSAndXVpZC92NCc7XHJcbmltcG9ydCBkYiBmcm9tICcuLi8uLi9kYXRhYmFzZVRhYmxlcy9kYmNvbm5lY3QnO1xyXG5pbXBvcnQgdXNlckF1dGhIZWxwZXIgZnJvbSAnLi4vLi4vaGVscGVyL3VzZXJBdXRoJztcclxuXHJcbmNvbnN0IFVzZXIgPSB7XHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIEEgVXNlclxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSByZXEgXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IHJlc1xyXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IFVzZXIgT2JqZWN0XHJcbiAgICovXHJcbiAgYXN5bmMgY3JlYXRlVXNlcihyZXEsIHJlcykge1xyXG4gICAgaWYgKCFyZXEuYm9keS5lbWFpbCB8fCAhcmVxLmJvZHkucGFzc3dvcmQgfHwgIXJlcS5ib2R5LmZ1bGxuYW1lIHx8ICFyZXEuYm9keS5sYXN0bmFtZSB8fCAhcmVxLmJvZHkucGFzc3BvcnRVcmwpIHtcclxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoeyBcclxuICAgICAgICAgICAgXCJzdGF0dXNcIjogNDAwLCBcclxuICAgICAgICAgICAgXCJlcnJvclwiOiBcIlNvbWUgdmFsdWVzIGFyZSBtaXNzaW5nXCIgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCF1c2VyQXV0aEhlbHBlci5pc1doaXRlU3BhY2UocmVxLmJvZHkuZW1haWwsIHJlcS5ib2R5LnBhc3N3b3JkLCByZXEsIHJlcS5ib2R5LnBhc3Nwb3J0VXJsKSkge1xyXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7IFxyXG4gICAgICAgICAgICBcInN0YXR1c1wiOiA0MDAsIFxyXG4gICAgICAgICAgICBcImVycm9yXCI6IFwiV2hpdGUgU3BhY2UgYXJlIG5vdCBhbGxvd2VkIGluIGlucHV0IGZpZWxkc1wiIFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgaWYgKCFIZWxwZXIuaXNWYWxpZEVtYWlsKHJlcS5ib2R5LmVtYWlsKSkge1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xyXG4gICAgICAgIFwic3RhdHVzXCI6IDQwMCwgIFxyXG4gICAgICAgIFwiZXJyb3JcIjogXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBlbWFpbFwiXHJcbiAgICB9KTtcclxufVxyXG5cclxuICAgIGlmICghdXNlckF1dGhIZWxwZXIuaXNwYXNzd29yZFZhbGlkKHJlcS5ib2R5LnBhc3N3b3JkKSkge1xyXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7IFxyXG4gICAgICAgICAgICBcInN0YXR1c1wiOiA0MDAsIFxyXG4gICAgICAgICAgICBcImVycm9yXCI6IFwiUGFzc3dvcmQgTXVzdCBCZSBhdCBsZWFzdCBGaXZlIENoYXJhY3RlcnMgQW5kIE11c3QgQmUgQSBzdHJpbmdcIiBcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgIGNvbnN0IGhhc2hQYXNzd29yZCA9IEhlbHBlci5oYXNoUGFzc3dvcmQocmVxLmJvZHkucGFzc3dvcmQpO1xyXG5cclxuICAgIGNvbnN0IGNyZWF0ZVF1ZXJ5ID0gYElOU0VSVCBJTlRPXHJcbiAgICAgIHVzZXJzKGlkLCBmaXJzdG5hbWUsIGxhc3RuYW1lLCBcclxuICAgICAgICBvdGhlcm5hbWUsIGVtYWlsLCBwaG9uZW51bWJlciwgcGFzc3BvcnRVcmwsIFxyXG4gICAgICAgIHBhc3N3b3JkLCBjcmVhdGVkX2RhdGUpXHJcbiAgICAgIFZBTFVFUygkMSwgJDIsICQzLCAkNCwgJDUsICQ2LCAkNywgJDgsICQ5KVxyXG4gICAgICByZXR1cm5pbmcgKmA7XHJcblxyXG4gICAgY29uc3QgdmFsdWVzID0gW1xyXG4gICAgICB1dWlkdjQoKSxcclxuICAgICAgcmVxLmJvZHkuZmlyc3RuYW1lLFxyXG4gICAgICByZXEuYm9keS5sYXN0bmFtZSxcclxuICAgICAgcmVxLmJvZHkub3RoZXJuYW1lLFxyXG4gICAgICByZXEuYm9keS5lbWFpbCxcclxuICAgICAgcmVxLmJvZHkucGhvbmVudW1iZXIsXHJcbiAgICAgIHJlcS5ib2R5LnBhc3Nwb3J0VXJsLFxyXG4gICAgICBoYXNoUGFzc3dvcmQsXHJcbiAgICAgIG1vbWVudChuZXcgRGF0ZSgpKVxyXG4gICAgXTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IHJvd3MgfSA9IGF3YWl0IGRiLnF1ZXJ5KGNyZWF0ZVF1ZXJ5LCB2YWx1ZXMpO1xyXG4gICAgICBjb25zdCB0b2tlbiA9IHVzZXJBdXRoSGVscGVyLmdlbmVyYXRlVG9rZW4ocm93c1swXS5pZCk7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMSkuaGVhZGVyKCd4LWF1dGgtdG9rZW4nLCB0b2tlbikuanNvbih7XHJcbiAgICAgICAgc3RhdHVzOiAyMDEsXHJcbiAgICAgICAgZGF0YTogW3tcclxuICAgICAgICAgIHRva2VuLFxyXG4gICAgICAgICAgdXNlcjogcm93c1swXSxcclxuICAgICAgICB9XSxcclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoKGVycm9yKSB7XHJcbiAgICAgIGlmIChlcnJvci5yb3V0aW5lID09PSAnX2J0X2NoZWNrX3VuaXF1ZScpIHtcclxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoeyBcclxuICAgICAgICAgICAgXCJkYXRhXCI6IDQwMCxcclxuICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiVXNlciB3aXRoIHRoYXQgRU1BSUwgYWxyZWFkeSBleGlzdFwiIFxyXG4gICAgfSlcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xyXG4gICAgICAgICAgICBcImRhdGFcIjpcclxuICAgICAgICAgICAgZXJyb3JcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICAvKipcclxuICAgKiBMb2dpblxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSByZXEgXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IHJlc1xyXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IHVzZXIgb2JqZWN0IFxyXG4gICAqL1xyXG4gIGFzeW5jIGxvZ2luKHJlcSwgcmVzKSB7XHJcbiAgICBpZiAoIXJlcS5ib2R5LmVtYWlsIHx8ICFyZXEuYm9keS5wYXNzd29yZCkge1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xyXG4gICAgICAgIFwic3RhdHVzXCI6IDQwMCxcclxuICAgICAgICBcImVycm9yXCI6IFwiU29tZSB2YWx1ZXMgYXJlIG1pc3NpbmdcIlxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmICghSGVscGVyLmlzVmFsaWRFbWFpbChyZXEuYm9keS5lbWFpbCkpIHtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHsgXHJcbiAgICAgICAgXCJzdGF0dXNcIjogNDAwLFxyXG4gICAgICAgIFwiZXJyb3JcIjogXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBlbWFpbCBhZGRyZXNzXCIgXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdGV4dCA9ICdTRUxFQ1QgKiBGUk9NIHVzZXJzIFdIRVJFIGVtYWlsID0gJDEnO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyByb3dzIH0gPSBhd2FpdCBkYi5xdWVyeSh0ZXh0LCBbcmVxLmJvZHkuZW1haWxdKTtcclxuICAgICAgaWYgKCFyb3dzWzBdKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcclxuICAgICAgICAgIFwic3RhdHVzXCI6IDQwMCxcclxuICAgICAgICAgIFwiZXJyb3JcIjogXCJUaGUgY3JlZGVudGlhbHMgeW91IHByb3ZpZGVkIGlzIGluY29ycmVjdFwiXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYoIUhlbHBlci5jb21wYXJlUGFzc3dvcmQocm93c1swXS5wYXNzd29yZCwgcmVxLmJvZHkucGFzc3dvcmQpKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcclxuICAgICAgICAgIFwic3RhdHVzXCI6IDQwMCwgXHJcbiAgICAgICAgICBcImVycm9yXCI6IFwiVGhlIGNyZWRlbnRpYWxzIHlvdSBwcm92aWRlZCBpcyBpbmNvcnJlY3RcIiBcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCB0b2tlbiA9IEhlbHBlci5nZW5lcmF0ZVRva2VuKHJvd3NbMF0uaWQpO1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLnNlbmQoe1xyXG4gICAgICAgIFwic3RhdHVzXCI6IDIwMSxcclxuICAgICAgICBcImRhdGFcIjogW3tcclxuICAgICAgICAgIFwidG9rZW5cIjogdG9rZW4sXHJcbiAgICAgICAgICBcInVzZXJcIjogcm93c1swXSxcclxuICAgICAgICB9XSwgXHJcbiAgICAgIH0pXHJcbiAgICB9IGNhdGNoKGVycm9yKSB7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XHJcbiAgICAgICAgXCJzdGF0dXNcIjogNDA0LFxyXG4gICAgICAgIFwiZXJyb3JcIjogZXJyb3JcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbiAgfVxyXG5leHBvcnQgZGVmYXVsdCBVc2VyOyJdfQ==