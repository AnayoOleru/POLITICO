'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _dbconnect = require('./databaseTables/dbconnect');

var _dbconnect2 = _interopRequireDefault(_dbconnect);

var _userAuth = require('../helper/userAuth');

var _userAuth2 = _interopRequireDefault(_userAuth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = {
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} User Object
   */
  createUser: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
      var hashPassword, createQuery, values, _ref2, rows, userToken, token;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!req.body.email || !req.body.password || !req.body.firstname || !req.body.lastname)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return', res.status(400).send({
                status: 400,
                error: 'Some values are missing'
              }));

            case 2:
              if (_userAuth2.default.isWhiteSpace(req.body.firstname, req.body.lastname, req.body.email, req.body.password, req.body.othername, req.body.phonenumber)) {
                _context.next = 4;
                break;
              }

              return _context.abrupt('return', res.status(400).send({
                status: 400,
                error: 'White Space are not allowed in input fields'
              }));

            case 4:
              if (_userAuth2.default.isValidEmail(req.body.email)) {
                _context.next = 6;
                break;
              }

              return _context.abrupt('return', res.status(400).send({
                status: 400,
                error: 'Please enter a valid email'
              }));

            case 6:
              if (req.body.passportUrl) {
                _context.next = 8;
                break;
              }

              return _context.abrupt('return', res.status(400).send({
                status: 400,
                error: 'URL field is empty'
              }));

            case 8:
              if (_userAuth2.default.ispasswordValid(req.body.password)) {
                _context.next = 10;
                break;
              }

              return _context.abrupt('return', res.status(400).send({
                status: 400,
                error: 'Password must be minimum eight characters, at least one letter and one number:'
              }));

            case 10:
              if (_userAuth2.default.isName(req.body.firstname, req.body.lastname, req.body.othername)) {
                _context.next = 12;
                break;
              }

              return _context.abrupt('return', res.status(400).send({
                status: 400,
                error: 'Names must only be Alphabets, spaces are allowed'
              }));

            case 12:
              if (_userAuth2.default.isInt(req.body.phonenumber)) {
                _context.next = 14;
                break;
              }

              return _context.abrupt('return', res.status(400).send({
                status: 400,
                error: 'Invalid Nigerian phone-number. Sorry, only Nigerians are allowed to vote'
              }));

            case 14:

              // if (!userAuthHelper.isURL(req.body.passportUrl)) {
              //   return res.status(400).send({
              //       "status": 400,
              //       "error": "Invalid URL"
              //   });
              // }


              hashPassword = _userAuth2.default.hashPassword(req.body.password);
              createQuery = 'INSERT INTO\n      users(id, firstname, lastname, \n        othername, email, phonenumber, passportUrl, \n        password, created_date)\n      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)\n      returning *';
              values = [(0, _v2.default)(), req.body.firstname, req.body.lastname, req.body.othername, req.body.email, req.body.phonenumber, req.body.passportUrl, hashPassword, (0, _moment2.default)(new Date())];
              // console.log(values);

              _context.prev = 17;
              _context.next = 20;
              return _dbconnect2.default.query(createQuery, values);

            case 20:
              _ref2 = _context.sent;
              rows = _ref2.rows;
              userToken = { id: rows[0].id, isAdmin: rows[0].isadmin, userName: rows[0].firstname };
              token = _userAuth2.default.generateToken(userToken);
              return _context.abrupt('return', res.status(201).header('x-auth-token', token).json({
                status: 201,
                data: [{
                  token: token,
                  user: rows[0]
                }]
              }));

            case 27:
              _context.prev = 27;
              _context.t0 = _context['catch'](17);

              console.log(_context.t0);

              if (!(_context.t0.routine === '_bt_check_unique')) {
                _context.next = 32;
                break;
              }

              return _context.abrupt('return', res.status(409).send({
                data: 409,
                error: 'User with that EMAIL already exist'
              }));

            case 32:
              return _context.abrupt('return', res.status(400).send({
                data: 'Oops, something went wrong, check and try again'
              }));

            case 33:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[17, 27]]);
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
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
      var text, _ref4, rows, userToken, token;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(!req.body.email || !req.body.password)) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt('return', res.status(400).send({
                status: 400,
                error: 'Some values are missing'
              }));

            case 2:
              if (_userAuth2.default.isWhiteSpace(req.body.email, req.body.password)) {
                _context2.next = 4;
                break;
              }

              return _context2.abrupt('return', res.status(400).send({
                status: 400,
                error: 'White Space are not allowed in input fields'
              }));

            case 4:
              if (_userAuth2.default.isValidEmail(req.body.email)) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt('return', res.status(400).send({
                status: 400,
                error: 'Please enter a valid email address'
              }));

            case 6:
              text = 'SELECT * FROM users WHERE email = $1';
              _context2.prev = 7;
              _context2.next = 10;
              return _dbconnect2.default.query(text, [req.body.email]);

            case 10:
              _ref4 = _context2.sent;
              rows = _ref4.rows;

              if (rows[0]) {
                _context2.next = 14;
                break;
              }

              return _context2.abrupt('return', res.status(400).send({
                status: 400,
                error: 'The credentials you provided is incorrect'
              }));

            case 14:
              if (_userAuth2.default.comparePassword(rows[0].password, req.body.password)) {
                _context2.next = 16;
                break;
              }

              return _context2.abrupt('return', res.status(400).send({
                status: 400,
                error: 'password is incorrect'
              }));

            case 16:
              userToken = {
                id: rows[0].id, isAdmin: rows[0].isadmin, userName: rows[0].firstname, lastName: rows[0].lastname
              };
              token = _userAuth2.default.generateToken(userToken);

              // console.log(token);

              return _context2.abrupt('return', res.status(201).send({
                status: 201,
                data: [{
                  token: token,
                  user: rows[0]
                }]
              }));

            case 21:
              _context2.prev = 21;
              _context2.t0 = _context2['catch'](7);
              return _context2.abrupt('return', res.status(404).send({
                status: 404,
                error: _context2.t0
              }));

            case 24:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[7, 21]]);
    }));

    function login(_x3, _x4) {
      return _ref3.apply(this, arguments);
    }

    return login;
  }(),

  /**
   * signout
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  signout: function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function signout(_x5, _x6) {
      return _ref5.apply(this, arguments);
    }

    return signout;
  }(),


  /**
   * Get all
   */
  getAllUsers: function () {
    var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
      var findAllQuery, _ref7, rows, rowCount;

      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              findAllQuery = 'SELECT * FROM users';
              _context4.prev = 1;
              _context4.next = 4;
              return _dbconnect2.default.query(findAllQuery);

            case 4:
              _ref7 = _context4.sent;
              rows = _ref7.rows;
              rowCount = _ref7.rowCount;
              return _context4.abrupt('return', res.status(200).send({
                status: 200,
                data: rows,
                rowCount: rowCount
              }));

            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4['catch'](1);
              return _context4.abrupt('return', res.status(400).send(_context4.t0));

            case 13:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this, [[1, 10]]);
    }));

    function getAllUsers(_x7, _x8) {
      return _ref6.apply(this, arguments);
    }

    return getAllUsers;
  }(),
  getAUser: function () {
    var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
      var id, text, _ref9, rows;

      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              id = req.params.id;

              if (_userAuth2.default.isUUID(id)) {
                _context5.next = 3;
                break;
              }

              return _context5.abrupt('return', res.status(400).send({
                status: 400,
                error: 'The user ID is invalid'
              }));

            case 3:
              text = 'SELECT * FROM users WHERE id = $1';
              _context5.prev = 4;
              _context5.next = 7;
              return _dbconnect2.default.query(text, [id]);

            case 7:
              _ref9 = _context5.sent;
              rows = _ref9.rows;

              if (rows[0]) {
                _context5.next = 11;
                break;
              }

              return _context5.abrupt('return', res.status(404).send({ error: 'User not found' }));

            case 11:
              return _context5.abrupt('return', res.status(200).send({
                status: 201,
                data: [{
                  order: rows[0]
                }]
              }));

            case 14:
              _context5.prev = 14;
              _context5.t0 = _context5['catch'](4);
              return _context5.abrupt('return', res.status(400).send(_context5.t0));

            case 17:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this, [[4, 14]]);
    }));

    function getAUser(_x9, _x10) {
      return _ref8.apply(this, arguments);
    }

    return getAUser;
  }()
};
exports.default = User;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy91c2VyQ3RyLmpzIl0sIm5hbWVzIjpbIlVzZXIiLCJjcmVhdGVVc2VyIiwicmVxIiwicmVzIiwiYm9keSIsImVtYWlsIiwicGFzc3dvcmQiLCJmaXJzdG5hbWUiLCJsYXN0bmFtZSIsInN0YXR1cyIsInNlbmQiLCJlcnJvciIsInVzZXJBdXRoSGVscGVyIiwiaXNXaGl0ZVNwYWNlIiwib3RoZXJuYW1lIiwicGhvbmVudW1iZXIiLCJpc1ZhbGlkRW1haWwiLCJwYXNzcG9ydFVybCIsImlzcGFzc3dvcmRWYWxpZCIsImlzTmFtZSIsImlzSW50IiwiaGFzaFBhc3N3b3JkIiwiY3JlYXRlUXVlcnkiLCJ2YWx1ZXMiLCJEYXRlIiwiZGIiLCJxdWVyeSIsInJvd3MiLCJ1c2VyVG9rZW4iLCJpZCIsImlzQWRtaW4iLCJpc2FkbWluIiwidXNlck5hbWUiLCJ0b2tlbiIsImdlbmVyYXRlVG9rZW4iLCJoZWFkZXIiLCJqc29uIiwiZGF0YSIsInVzZXIiLCJjb25zb2xlIiwibG9nIiwicm91dGluZSIsImxvZ2luIiwidGV4dCIsImNvbXBhcmVQYXNzd29yZCIsImxhc3ROYW1lIiwic2lnbm91dCIsImdldEFsbFVzZXJzIiwiZmluZEFsbFF1ZXJ5Iiwicm93Q291bnQiLCJnZXRBVXNlciIsInBhcmFtcyIsImlzVVVJRCIsIm9yZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxPQUFPO0FBQ1g7Ozs7OztBQU1NQyxZQVBLO0FBQUEseUdBT01DLEdBUE4sRUFPV0MsR0FQWDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsb0JBUUwsQ0FBQ0QsSUFBSUUsSUFBSixDQUFTQyxLQUFWLElBQW1CLENBQUNILElBQUlFLElBQUosQ0FBU0UsUUFBN0IsSUFBeUMsQ0FBQ0osSUFBSUUsSUFBSixDQUFTRyxTQUFuRCxJQUFnRSxDQUFDTCxJQUFJ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QUEscUJBaU5nQmxCLG9CQUFHQyxLQUFILENBQVNpQixJQUFULEVBQWUsQ0FBQ2QsRUFBRCxDQUFmLENBak5oQjs7QUFBQTtBQUFBO0FBaU5DRixrQkFqTkQsU0FpTkNBLElBak5EOztBQUFBLGtCQW1ORkEsS0FBSyxDQUFMLENBbk5FO0FBQUE7QUFBQTtBQUFBOztBQUFBLGdEQW9ORXhCLElBQUlNLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQixFQUFFQyxPQUFPLGdCQUFULEVBQXJCLENBcE5GOztBQUFBO0FBQUEsZ0RBeU5BUixJQUFJTSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDMUJELHdCQUFRLEdBRGtCO0FBRTFCNEIsc0JBQU0sQ0FBQztBQUNMZ0IseUJBQU8xQixLQUFLLENBQUw7QUFERixpQkFBRDtBQUZvQixlQUFyQixDQXpOQTs7QUFBQTtBQUFBO0FBQUE7QUFBQSxnREFnT0F4QixJQUFJTSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsY0FoT0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxDQUFiO2tCQW9PZVYsSSIsImZpbGUiOiJ1c2VyQ3RyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHV1aWR2NCBmcm9tICd1dWlkL3Y0JztcbmltcG9ydCBkYiBmcm9tICcuL2RhdGFiYXNlVGFibGVzL2RiY29ubmVjdCc7XG5pbXBvcnQgdXNlckF1dGhIZWxwZXIgZnJvbSAnLi4vaGVscGVyL3VzZXJBdXRoJztcblxuY29uc3QgVXNlciA9IHtcbiAgLyoqXG4gICAqIENyZWF0ZSBBIFVzZXJcbiAgICogQHBhcmFtIHtvYmplY3R9IHJlcVxuICAgKiBAcGFyYW0ge29iamVjdH0gcmVzXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IFVzZXIgT2JqZWN0XG4gICAqL1xuICBhc3luYyBjcmVhdGVVc2VyKHJlcSwgcmVzKSB7XG4gICAgaWYgKCFyZXEuYm9keS5lbWFpbCB8fCAhcmVxLmJvZHkucGFzc3dvcmQgfHwgIXJlcS5ib2R5LmZpcnN0bmFtZSB8fCAhcmVxLmJvZHkubGFzdG5hbWUpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBlcnJvcjogJ1NvbWUgdmFsdWVzIGFyZSBtaXNzaW5nJyxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoIXVzZXJBdXRoSGVscGVyLmlzV2hpdGVTcGFjZShyZXEuYm9keS5maXJzdG5hbWUsIHJlcS5ib2R5Lmxhc3RuYW1lLCByZXEuYm9keS5lbWFpbCwgcmVxLmJvZHkucGFzc3dvcmQsIHJlcS5ib2R5Lm90aGVybmFtZSwgcmVxLmJvZHkucGhvbmVudW1iZXIpKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgZXJyb3I6ICdXaGl0ZSBTcGFjZSBhcmUgbm90IGFsbG93ZWQgaW4gaW5wdXQgZmllbGRzJyxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghdXNlckF1dGhIZWxwZXIuaXNWYWxpZEVtYWlsKHJlcS5ib2R5LmVtYWlsKSkge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgIGVycm9yOiAnUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWwnLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICghcmVxLmJvZHkucGFzc3BvcnRVcmwpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBlcnJvcjogJ1VSTCBmaWVsZCBpcyBlbXB0eScsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXVzZXJBdXRoSGVscGVyLmlzcGFzc3dvcmRWYWxpZChyZXEuYm9keS5wYXNzd29yZCkpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBlcnJvcjogJ1Bhc3N3b3JkIG11c3QgYmUgbWluaW11bSBlaWdodCBjaGFyYWN0ZXJzLCBhdCBsZWFzdCBvbmUgbGV0dGVyIGFuZCBvbmUgbnVtYmVyOicsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXVzZXJBdXRoSGVscGVyLmlzTmFtZShyZXEuYm9keS5maXJzdG5hbWUsIHJlcS5ib2R5Lmxhc3RuYW1lLCByZXEuYm9keS5vdGhlcm5hbWUpKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgZXJyb3I6ICdOYW1lcyBtdXN0IG9ubHkgYmUgQWxwaGFiZXRzLCBzcGFjZXMgYXJlIGFsbG93ZWQnLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCF1c2VyQXV0aEhlbHBlci5pc0ludChyZXEuYm9keS5waG9uZW51bWJlcikpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBlcnJvcjogJ0ludmFsaWQgTmlnZXJpYW4gcGhvbmUtbnVtYmVyLiBTb3JyeSwgb25seSBOaWdlcmlhbnMgYXJlIGFsbG93ZWQgdG8gdm90ZScsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBpZiAoIXVzZXJBdXRoSGVscGVyLmlzVVJMKHJlcS5ib2R5LnBhc3Nwb3J0VXJsKSkge1xuICAgIC8vICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICAvLyAgICAgICBcInN0YXR1c1wiOiA0MDAsXG4gICAgLy8gICAgICAgXCJlcnJvclwiOiBcIkludmFsaWQgVVJMXCJcbiAgICAvLyAgIH0pO1xuICAgIC8vIH1cblxuXG4gICAgY29uc3QgaGFzaFBhc3N3b3JkID0gdXNlckF1dGhIZWxwZXIuaGFzaFBhc3N3b3JkKHJlcS5ib2R5LnBhc3N3b3JkKTtcblxuICAgIGNvbnN0IGNyZWF0ZVF1ZXJ5ID0gYElOU0VSVCBJTlRPXG4gICAgICB1c2VycyhpZCwgZmlyc3RuYW1lLCBsYXN0bmFtZSwgXG4gICAgICAgIG90aGVybmFtZSwgZW1haWwsIHBob25lbnVtYmVyLCBwYXNzcG9ydFVybCwgXG4gICAgICAgIHBhc3N3b3JkLCBjcmVhdGVkX2RhdGUpXG4gICAgICBWQUxVRVMoJDEsICQyLCAkMywgJDQsICQ1LCAkNiwgJDcsICQ4LCAkOSlcbiAgICAgIHJldHVybmluZyAqYDtcblxuICAgIGNvbnN0IHZhbHVlcyA9IFtcbiAgICAgIHV1aWR2NCgpLFxuICAgICAgcmVxLmJvZHkuZmlyc3RuYW1lLFxuICAgICAgcmVxLmJvZHkubGFzdG5hbWUsXG4gICAgICByZXEuYm9keS5vdGhlcm5hbWUsXG4gICAgICByZXEuYm9keS5lbWFpbCxcbiAgICAgIHJlcS5ib2R5LnBob25lbnVtYmVyLFxuICAgICAgcmVxLmJvZHkucGFzc3BvcnRVcmwsXG4gICAgICBoYXNoUGFzc3dvcmQsXG4gICAgICBtb21lbnQobmV3IERhdGUoKSksXG4gICAgXTtcbiAgICAvLyBjb25zb2xlLmxvZyh2YWx1ZXMpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgcm93cyB9ID0gYXdhaXQgZGIucXVlcnkoY3JlYXRlUXVlcnksIHZhbHVlcyk7XG4gICAgICBjb25zdCB1c2VyVG9rZW4gPSB7IGlkOiByb3dzWzBdLmlkLCBpc0FkbWluOiByb3dzWzBdLmlzYWRtaW4sIHVzZXJOYW1lOiByb3dzWzBdLmZpcnN0bmFtZSB9O1xuXG4gICAgICBjb25zdCB0b2tlbiA9IHVzZXJBdXRoSGVscGVyLmdlbmVyYXRlVG9rZW4odXNlclRva2VuKTtcblxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAxKS5oZWFkZXIoJ3gtYXV0aC10b2tlbicsIHRva2VuKS5qc29uKHtcbiAgICAgICAgc3RhdHVzOiAyMDEsXG4gICAgICAgIGRhdGE6IFt7XG4gICAgICAgICAgdG9rZW4sXG4gICAgICAgICAgdXNlcjogcm93c1swXSxcbiAgICAgICAgfV0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgaWYgKGVycm9yLnJvdXRpbmUgPT09ICdfYnRfY2hlY2tfdW5pcXVlJykge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDkpLnNlbmQoe1xuICAgICAgICAgIGRhdGE6IDQwOSxcbiAgICAgICAgICBlcnJvcjogJ1VzZXIgd2l0aCB0aGF0IEVNQUlMIGFscmVhZHkgZXhpc3QnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIGRhdGE6ICdPb3BzLCBzb21ldGhpbmcgd2VudCB3cm9uZywgY2hlY2sgYW5kIHRyeSBhZ2FpbicsXG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIC8qKlxuICAgKiBMb2dpblxuICAgKiBAcGFyYW0ge29iamVjdH0gcmVxXG4gICAqIEBwYXJhbSB7b2JqZWN0fSByZXNcbiAgICogQHJldHVybnMge29iamVjdH0gdXNlciBvYmplY3RcbiAgICovXG4gIGFzeW5jIGxvZ2luKHJlcSwgcmVzKSB7XG4gICAgaWYgKCFyZXEuYm9keS5lbWFpbCB8fCAhcmVxLmJvZHkucGFzc3dvcmQpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBlcnJvcjogJ1NvbWUgdmFsdWVzIGFyZSBtaXNzaW5nJyxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoIXVzZXJBdXRoSGVscGVyLmlzV2hpdGVTcGFjZShyZXEuYm9keS5lbWFpbCwgcmVxLmJvZHkucGFzc3dvcmQpKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgZXJyb3I6ICdXaGl0ZSBTcGFjZSBhcmUgbm90IGFsbG93ZWQgaW4gaW5wdXQgZmllbGRzJyxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoIXVzZXJBdXRoSGVscGVyLmlzVmFsaWRFbWFpbChyZXEuYm9keS5lbWFpbCkpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBlcnJvcjogJ1BsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsIGFkZHJlc3MnLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IHRleHQgPSAnU0VMRUNUICogRlJPTSB1c2VycyBXSEVSRSBlbWFpbCA9ICQxJztcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyByb3dzIH0gPSBhd2FpdCBkYi5xdWVyeSh0ZXh0LCBbcmVxLmJvZHkuZW1haWxdKTtcbiAgICAgIGlmICghcm93c1swXSkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICAgIGVycm9yOiAnVGhlIGNyZWRlbnRpYWxzIHlvdSBwcm92aWRlZCBpcyBpbmNvcnJlY3QnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmICghdXNlckF1dGhIZWxwZXIuY29tcGFyZVBhc3N3b3JkKHJvd3NbMF0ucGFzc3dvcmQsIHJlcS5ib2R5LnBhc3N3b3JkKSkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICAgIGVycm9yOiAncGFzc3dvcmQgaXMgaW5jb3JyZWN0JyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBjb25zdCB1c2VyVG9rZW4gPSB7XG4gICAgICAgIGlkOiByb3dzWzBdLmlkLCBpc0FkbWluOiByb3dzWzBdLmlzYWRtaW4sIHVzZXJOYW1lOiByb3dzWzBdLmZpcnN0bmFtZSwgbGFzdE5hbWU6IHJvd3NbMF0ubGFzdG5hbWUsXG4gICAgICB9O1xuXG4gICAgICBjb25zdCB0b2tlbiA9IHVzZXJBdXRoSGVscGVyLmdlbmVyYXRlVG9rZW4odXNlclRva2VuKTtcblxuICAgICAgLy8gY29uc29sZS5sb2codG9rZW4pO1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAxKS5zZW5kKHtcbiAgICAgICAgc3RhdHVzOiAyMDEsXG4gICAgICAgIGRhdGE6IFt7XG4gICAgICAgICAgdG9rZW4sXG4gICAgICAgICAgdXNlcjogcm93c1swXSxcbiAgICAgICAgfV0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgLy8gY29uc29sZS5sb2coZXJyb3IpXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IDQwNCxcbiAgICAgICAgZXJyb3IsXG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIC8qKlxuICAgKiBzaWdub3V0XG4gICAqIEBwYXJhbSB7b2JqZWN0fSByZXFcbiAgICogQHBhcmFtIHtvYmplY3R9IHJlc1xuICAgKiBAcmV0dXJucyB7b2JqZWN0fSB1c2VyIG9iamVjdFxuICAgKi9cbiAgYXN5bmMgc2lnbm91dChyZXEsIHJlcykge1xuICB9LFxuXG4gIC8qKlxuICAgKiBHZXQgYWxsXG4gICAqL1xuICBhc3luYyBnZXRBbGxVc2VycyhyZXEsIHJlcykge1xuICAgIGNvbnN0IGZpbmRBbGxRdWVyeSA9ICdTRUxFQ1QgKiBGUk9NIHVzZXJzJztcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyByb3dzLCByb3dDb3VudCB9ID0gYXdhaXQgZGIucXVlcnkoZmluZEFsbFF1ZXJ5KTtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogMjAwLFxuICAgICAgICBkYXRhOiByb3dzLFxuICAgICAgICByb3dDb3VudCxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhlcnJvcilcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZChlcnJvcik7XG4gICAgfVxuICB9LFxuICBhc3luYyBnZXRBVXNlcihyZXEsIHJlcykge1xuICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5wYXJhbXM7XG4gICAgaWYgKCF1c2VyQXV0aEhlbHBlci5pc1VVSUQoaWQpKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgZXJyb3I6ICdUaGUgdXNlciBJRCBpcyBpbnZhbGlkJyxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCB0ZXh0ID0gJ1NFTEVDVCAqIEZST00gdXNlcnMgV0hFUkUgaWQgPSAkMSc7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgcm93cyB9ID0gYXdhaXQgZGIucXVlcnkodGV4dCwgW2lkXSk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhwYXJ0eV9pZCk7XG4gICAgICBpZiAoIXJvd3NbMF0pIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5zZW5kKHsgZXJyb3I6ICdVc2VyIG5vdCBmb3VuZCcgfSk7XG4gICAgICB9XG4gICAgICAvLyBpZihyZXEuYm9keS5wYXJhbXMgIT09IHJvd3NbMF0uaWQpe1xuICAgICAgLy8gICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLnNlbmQoe1wiZXJyb3JcIjogXCJZb3VyIGlkIGlzIHdyb25nXCJ9KTtcbiAgICAgIC8vIH1cbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogMjAxLFxuICAgICAgICBkYXRhOiBbe1xuICAgICAgICAgIG9yZGVyOiByb3dzWzBdLFxuICAgICAgICB9XSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoZXJyb3IpO1xuICAgIH1cbiAgfSxcbn07XG5leHBvcnQgZGVmYXVsdCBVc2VyO1xuIl19