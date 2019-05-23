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

var _dbconnect = require('../controllers/databaseTables/dbconnect');

var _dbconnect2 = _interopRequireDefault(_dbconnect);

var _userAuth = require('../helper/userAuth');

var _userAuth2 = _interopRequireDefault(_userAuth);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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
              if (!(!req.body.email || !req.body.password || !req.body.firstname || !req.body.lastname || !req.body.passportUrl)) {
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
              if (_userAuth2.default.isValidEmail(req.body.email)) {
                _context.next = 6;
                break;
              }

              return _context.abrupt('return', res.status(400).send({
                "status": 400,
                "error": "Please enter a valid email"
              }));

            case 6:
              if (req.body.passportUrl) {
                _context.next = 8;
                break;
              }

              return _context.abrupt('return', res.status(400).send({
                "status": 400,
                "error": "URL field is empty"
              }));

            case 8:
              if (_userAuth2.default.ispasswordValid(req.body.password)) {
                _context.next = 10;
                break;
              }

              return _context.abrupt('return', res.status(400).send({
                "status": 400,
                "error": "Password must be minimum eight characters, at least one letter and one number:"
              }));

            case 10:
              if (_userAuth2.default.isName(req.body.firstname, req.body.lastname, req.body.othername)) {
                _context.next = 12;
                break;
              }

              return _context.abrupt('return', res.status(400).send({
                "status": 400,
                "error": "Names must only be Alphabets, spaces are allowed"
              }));

            case 12:
              if (_userAuth2.default.isInt(req.body.phonenumber)) {
                _context.next = 14;
                break;
              }

              return _context.abrupt('return', res.status(400).send({
                "status": 400,
                "error": "Invalid Nigerian phone-number"
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
                  "token": token,
                  "user": rows[0]
                }]
              }));

            case 27:
              _context.prev = 27;
              _context.t0 = _context['catch'](17);

              if (!(_context.t0.routine === '_bt_check_unique')) {
                _context.next = 31;
                break;
              }

              return _context.abrupt('return', res.status(409).send({
                "data": 409,
                "error": "User with that EMAIL already exist"
              }));

            case 31:
              return _context.abrupt('return', res.status(400).send({
                "data": "Oops, something went wrong, check and try again"
              }));

            case 32:
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
                "status": 400,
                "error": "Some values are missing"
              }));

            case 2:
              if (_userAuth2.default.isWhiteSpace(req.body.email, req.body.password)) {
                _context2.next = 4;
                break;
              }

              return _context2.abrupt('return', res.status(400).send({
                "status": 400,
                "error": "White Space are not allowed in input fields"
              }));

            case 4:
              if (_userAuth2.default.isValidEmail(req.body.email)) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt('return', res.status(400).send({
                "status": 400,
                "error": "Please enter a valid email address"
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
                "status": 400,
                "error": "The credentials you provided is incorrect"
              }));

            case 14:
              if (_userAuth2.default.comparePassword(rows[0].password, req.body.password)) {
                _context2.next = 16;
                break;
              }

              return _context2.abrupt('return', res.status(400).send({
                "status": 400,
                "error": "password is incorrect"
              }));

            case 16:
              userToken = { id: rows[0].id, isAdmin: rows[0].isadmin, userName: rows[0].firstname, lastName: rows[0].lastname };
              token = _userAuth2.default.generateToken(userToken);

              // console.log(token);

              return _context2.abrupt('return', res.status(201).send({
                "status": 201,
                "data": [{
                  "token": token,
                  "user": rows[0]
                }]
              }));

            case 21:
              _context2.prev = 21;
              _context2.t0 = _context2['catch'](7);
              return _context2.abrupt('return', res.status(404).send({
                "status": 404,
                "error": _context2.t0
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
                "status": 200,
                "data": rows, rowCount: rowCount
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
  }()
};
exports.default = User;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy91c2VyQ3RyLmpzIl0sIm5hbWVzIjpbIlVzZXIiLCJyZXEiLCJ1c2VyQXV0aEhlbHBlciIsImRiIiwiaWQiLCJyb3dzIiwiaXNBZG1pbiIsInVzZXJOYW1lIiwic3RhdHVzIiwiZGF0YSIsImxhc3ROYW1lIiwicm93Q291bnQiLCJyZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQSxVQUFBLFFBQUEsUUFBQSxDQUFBOzs7O0FBQ0EsSUFBQSxLQUFBLFFBQUEsU0FBQSxDQUFBOzs7O0FBQ0EsSUFBQSxhQUFBLFFBQUEseUNBQUEsQ0FBQTs7OztBQUNBLElBQUEsWUFBQSxRQUFBLG9CQUFBLENBQUE7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBTztBQUNYOzs7Ozs7QUFEVyxjQUFBLFlBQUE7QUFBQSxRQUFBLE9BQUEsQ0FBQSxHQUFBLG1CQUFBLE9BQUEsR0FBQSxhQUFBLGNBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxTQUFBLE9BQUEsQ0FBQSxHQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsVUFBQSxZQUFBLEVBQUEsV0FBQSxFQUFBLE1BQUEsRUFBQSxLQUFBLEVBQUEsSUFBQSxFQUFBLFNBQUEsRUFBQSxLQUFBOztBQUFBLGFBQUEsY0FBQSxPQUFBLENBQUEsSUFBQSxDQUFBLFNBQUEsUUFBQSxDQUFBLFFBQUEsRUFBQTtBQUFBLGVBQUEsQ0FBQSxFQUFBO0FBQUEsa0JBQUEsU0FBQSxJQUFBLEdBQUEsU0FBQSxJQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGtCQUFBLEVBUUwsQ0FBQ0MsSUFBQUEsSUFBQUEsQ0FBRCxLQUFBLElBQW9CLENBQUNBLElBQUFBLElBQUFBLENBQXJCLFFBQUEsSUFBMEMsQ0FBQ0EsSUFBQUEsSUFBQUEsQ0FBM0MsU0FBQSxJQUFpRSxDQUFDQSxJQUFBQSxJQUFBQSxDQUFsRSxRQUFBLElBQXVGLENBQUNBLElBQUFBLElBQUFBLENBUm5GLFdBQUEsQ0FBQSxFQUFBO0FB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QSxJQUFBLEdBQUEsQ0FBQTtBQUFBLHFCQTRMMEJGLFlBQUFBLE9BQUFBLENBQUFBLEtBQUFBLENBNUwxQixZQTRMMEJBLENBNUwxQjs7QUFBQSxpQkFBQSxDQUFBO0FBQUEsc0JBQUEsVUFBQSxJQUFBO0FBQUEscUJBQUEsTUFBQSxJQUFBO0FBQUEseUJBQUEsTUFBQSxRQUFBO0FBQUEscUJBQUEsVUFBQSxNQUFBLENBQUEsUUFBQSxFQTZMQSxJQUFBLE1BQUEsQ0FBQSxHQUFBLEVBQUEsSUFBQSxDQUFxQjtBQUMxQiwwQkFEMEIsR0FBQTtBQUUzQix3QkFGMkIsSUFBQSxFQUViUSxVQUFBQTtBQUZhLGVBQXJCLENBN0xBLENBQUE7O0FBQUEsaUJBQUEsRUFBQTtBQUFBLHdCQUFBLElBQUEsR0FBQSxFQUFBO0FBQUEsd0JBQUEsRUFBQSxHQUFBLFVBQUEsT0FBQSxFQUFBLENBQUEsQ0FBQTtBQUFBLHFCQUFBLFVBQUEsTUFBQSxDQUFBLFFBQUEsRUFtTUFDLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLEVBQUFBLElBQUFBLENBQUFBLFVBbk1BLEVBbU1BQSxDQW5NQSxDQUFBOztBQUFBLGlCQUFBLEVBQUE7QUFBQSxpQkFBQSxLQUFBO0FBQUEscUJBQUEsVUFBQSxJQUFBLEVBQUE7QUFBQTtBQUFBO0FBQUEsT0FBQSxFQUFBLFFBQUEsRUFBQSxJQUFBLEVBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxFQUFBLENBQUEsQ0FBQSxDQUFBO0FBQUEsS0FBQSxDQUFBLENBQUE7O0FBQUEsYUFBQSxXQUFBLENBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQTtBQUFBLGFBQUEsTUFBQSxLQUFBLENBQUEsSUFBQSxFQUFBLFNBQUEsQ0FBQTtBQUFBOztBQUFBLFdBQUEsV0FBQTtBQUFBLEdBQUE7QUFBQSxDQUFiO2tCQXVNZVosSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB1dWlkdjQgZnJvbSAndXVpZC92NCc7XG5pbXBvcnQgZGIgZnJvbSAnLi4vY29udHJvbGxlcnMvZGF0YWJhc2VUYWJsZXMvZGJjb25uZWN0JztcbmltcG9ydCB1c2VyQXV0aEhlbHBlciBmcm9tICcuLi9oZWxwZXIvdXNlckF1dGgnO1xuXG5jb25zdCBVc2VyID0ge1xuICAvKipcbiAgICogQ3JlYXRlIEEgVXNlclxuICAgKiBAcGFyYW0ge29iamVjdH0gcmVxIFxuICAgKiBAcGFyYW0ge29iamVjdH0gcmVzXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IFVzZXIgT2JqZWN0XG4gICAqL1xuICBhc3luYyBjcmVhdGVVc2VyKHJlcSwgcmVzKSB7XG4gICAgaWYgKCFyZXEuYm9keS5lbWFpbCAgfHwgIXJlcS5ib2R5LnBhc3N3b3JkIHx8ICFyZXEuYm9keS5maXJzdG5hbWUgfHwgIXJlcS5ib2R5Lmxhc3RuYW1lIHx8ICFyZXEuYm9keS5wYXNzcG9ydFVybCkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoeyBcbiAgICAgICAgICAgIFwic3RhdHVzXCI6IDQwMCwgXG4gICAgICAgICAgICBcImVycm9yXCI6IFwiU29tZSB2YWx1ZXMgYXJlIG1pc3NpbmdcIiBcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoIXVzZXJBdXRoSGVscGVyLmlzV2hpdGVTcGFjZShyZXEuYm9keS5lbWFpbCwgcmVxLmJvZHkucGFzc3dvcmQsIHJlcSwgcmVxLmJvZHkucGFzc3BvcnRVcmwpKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7IFxuICAgICAgICAgICAgXCJzdGF0dXNcIjogNDAwLCBcbiAgICAgICAgICAgIFwiZXJyb3JcIjogXCJXaGl0ZSBTcGFjZSBhcmUgbm90IGFsbG93ZWQgaW4gaW5wdXQgZmllbGRzXCIgXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgaWYgKCF1c2VyQXV0aEhlbHBlci5pc1ZhbGlkRW1haWwocmVxLmJvZHkuZW1haWwpKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICBcInN0YXR1c1wiOiA0MDAsICBcbiAgICAgICAgXCJlcnJvclwiOiBcIlBsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsXCJcbiAgICB9KTtcbn1cbmlmKCFyZXEuYm9keS5wYXNzcG9ydFVybCl7XG4gIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7IFxuICAgIFwic3RhdHVzXCI6IDQwMCwgXG4gICAgXCJlcnJvclwiOiBcIlVSTCBmaWVsZCBpcyBlbXB0eVwiIFxufSk7XG59XG5cbiAgICBpZiAoIXVzZXJBdXRoSGVscGVyLmlzcGFzc3dvcmRWYWxpZChyZXEuYm9keS5wYXNzd29yZCkpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHsgXG4gICAgICAgICAgICBcInN0YXR1c1wiOiA0MDAsIFxuICAgICAgICAgICAgXCJlcnJvclwiOiBcIlBhc3N3b3JkIG11c3QgYmUgbWluaW11bSBlaWdodCBjaGFyYWN0ZXJzLCBhdCBsZWFzdCBvbmUgbGV0dGVyIGFuZCBvbmUgbnVtYmVyOlwiIFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCF1c2VyQXV0aEhlbHBlci5pc05hbWUocmVxLmJvZHkuZmlyc3RuYW1lLCByZXEuYm9keS5sYXN0bmFtZSwgcmVxLmJvZHkub3RoZXJuYW1lKSkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoeyBcbiAgICAgICAgICAgIFwic3RhdHVzXCI6IDQwMCwgXG4gICAgICAgICAgICBcImVycm9yXCI6IFwiTmFtZXMgbXVzdCBvbmx5IGJlIEFscGhhYmV0cywgc3BhY2VzIGFyZSBhbGxvd2VkXCIgXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXVzZXJBdXRoSGVscGVyLmlzSW50KHJlcS5ib2R5LnBob25lbnVtYmVyKSkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoeyBcbiAgICAgICAgICAgIFwic3RhdHVzXCI6IDQwMCwgXG4gICAgICAgICAgICBcImVycm9yXCI6IFwiSW52YWxpZCBOaWdlcmlhbiBwaG9uZS1udW1iZXJcIiBcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIGlmICghdXNlckF1dGhIZWxwZXIuaXNVUkwocmVxLmJvZHkucGFzc3BvcnRVcmwpKSB7XG4gICAgICAvLyAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7IFxuICAgICAgLy8gICAgICAgXCJzdGF0dXNcIjogNDAwLCBcbiAgICAgIC8vICAgICAgIFwiZXJyb3JcIjogXCJJbnZhbGlkIFVSTFwiIFxuICAgICAgLy8gICB9KTtcbiAgICAgIC8vIH1cblxuXG5cbiAgICBjb25zdCBoYXNoUGFzc3dvcmQgPSB1c2VyQXV0aEhlbHBlci5oYXNoUGFzc3dvcmQocmVxLmJvZHkucGFzc3dvcmQpO1xuXG4gICAgY29uc3QgY3JlYXRlUXVlcnkgPSBgSU5TRVJUIElOVE9cbiAgICAgIHVzZXJzKGlkLCBmaXJzdG5hbWUsIGxhc3RuYW1lLCBcbiAgICAgICAgb3RoZXJuYW1lLCBlbWFpbCwgcGhvbmVudW1iZXIsIHBhc3Nwb3J0VXJsLCBcbiAgICAgICAgcGFzc3dvcmQsIGNyZWF0ZWRfZGF0ZSlcbiAgICAgIFZBTFVFUygkMSwgJDIsICQzLCAkNCwgJDUsICQ2LCAkNywgJDgsICQ5KVxuICAgICAgcmV0dXJuaW5nICpgO1xuXG4gICAgY29uc3QgdmFsdWVzID0gW1xuICAgICAgdXVpZHY0KCksXG4gICAgICByZXEuYm9keS5maXJzdG5hbWUsXG4gICAgICByZXEuYm9keS5sYXN0bmFtZSxcbiAgICAgIHJlcS5ib2R5Lm90aGVybmFtZSxcbiAgICAgIHJlcS5ib2R5LmVtYWlsLFxuICAgICAgcmVxLmJvZHkucGhvbmVudW1iZXIsXG4gICAgICByZXEuYm9keS5wYXNzcG9ydFVybCxcbiAgICAgIGhhc2hQYXNzd29yZCxcbiAgICAgIG1vbWVudChuZXcgRGF0ZSgpKVxuICAgIF07XG4gICAgLy8gY29uc29sZS5sb2codmFsdWVzKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IHJvd3MgfSA9IGF3YWl0IGRiLnF1ZXJ5KGNyZWF0ZVF1ZXJ5LCB2YWx1ZXMpO1xuICAgICAgY29uc3QgdXNlclRva2VuID0geyBpZDogcm93c1swXS5pZCwgIGlzQWRtaW46IHJvd3NbMF0uaXNhZG1pbiwgdXNlck5hbWU6IHJvd3NbMF0uZmlyc3RuYW1lIH1cbiAgICAgIFxuICAgICAgY29uc3QgdG9rZW4gPSB1c2VyQXV0aEhlbHBlci5nZW5lcmF0ZVRva2VuKHVzZXJUb2tlbik7XG4gICAgIFxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAxKS5oZWFkZXIoJ3gtYXV0aC10b2tlbicsIHRva2VuKS5qc29uKHtcbiAgICAgICAgc3RhdHVzOiAyMDEsXG4gICAgICAgIGRhdGE6IFt7XG4gICAgICAgICAgXCJ0b2tlblwiOiB0b2tlbixcbiAgICAgICAgICBcInVzZXJcIjogcm93c1swXVxuICAgICAgICB9XSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2goZXJyb3IpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIGlmIChlcnJvci5yb3V0aW5lID09PSAnX2J0X2NoZWNrX3VuaXF1ZScpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwOSkuc2VuZCh7IFxuICAgICAgICAgICAgXCJkYXRhXCI6IDQwOSxcbiAgICAgICAgICAgIFwiZXJyb3JcIjogXCJVc2VyIHdpdGggdGhhdCBFTUFJTCBhbHJlYWR5IGV4aXN0XCIgXG4gICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICAgICAgXCJkYXRhXCI6IFwiT29wcywgc29tZXRoaW5nIHdlbnQgd3JvbmcsIGNoZWNrIGFuZCB0cnkgYWdhaW5cIlxuICAgICAgfSk7XG4gICAgfVxuICB9LFxuICAvKipcbiAgICogTG9naW5cbiAgICogQHBhcmFtIHtvYmplY3R9IHJlcSBcbiAgICogQHBhcmFtIHtvYmplY3R9IHJlc1xuICAgKiBAcmV0dXJucyB7b2JqZWN0fSB1c2VyIG9iamVjdCBcbiAgICovXG4gIGFzeW5jIGxvZ2luKHJlcSwgcmVzKSB7XG4gICAgaWYgKCFyZXEuYm9keS5lbWFpbCB8fCAhcmVxLmJvZHkucGFzc3dvcmQpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIFwic3RhdHVzXCI6IDQwMCxcbiAgICAgICAgXCJlcnJvclwiOiBcIlNvbWUgdmFsdWVzIGFyZSBtaXNzaW5nXCJcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoIXVzZXJBdXRoSGVscGVyLmlzV2hpdGVTcGFjZShyZXEuYm9keS5lbWFpbCwgcmVxLmJvZHkucGFzc3dvcmQpKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoeyBcbiAgICAgICAgICBcInN0YXR1c1wiOiA0MDAsIFxuICAgICAgICAgIFwiZXJyb3JcIjogXCJXaGl0ZSBTcGFjZSBhcmUgbm90IGFsbG93ZWQgaW4gaW5wdXQgZmllbGRzXCIgXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKCF1c2VyQXV0aEhlbHBlci5pc1ZhbGlkRW1haWwocmVxLmJvZHkuZW1haWwpKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoeyBcbiAgICAgICAgXCJzdGF0dXNcIjogNDAwLFxuICAgICAgICBcImVycm9yXCI6IFwiUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWwgYWRkcmVzc1wiIFxuICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IHRleHQgPSAnU0VMRUNUICogRlJPTSB1c2VycyBXSEVSRSBlbWFpbCA9ICQxJztcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyByb3dzIH0gPSBhd2FpdCBkYi5xdWVyeSh0ZXh0LCBbcmVxLmJvZHkuZW1haWxdKTtcbiAgICAgIGlmICghcm93c1swXSkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICAgIFwic3RhdHVzXCI6IDQwMCxcbiAgICAgICAgICBcImVycm9yXCI6IFwiVGhlIGNyZWRlbnRpYWxzIHlvdSBwcm92aWRlZCBpcyBpbmNvcnJlY3RcIlxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmKCF1c2VyQXV0aEhlbHBlci5jb21wYXJlUGFzc3dvcmQocm93c1swXS5wYXNzd29yZCwgcmVxLmJvZHkucGFzc3dvcmQpKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgICAgXCJzdGF0dXNcIjogNDAwLCBcbiAgICAgICAgICBcImVycm9yXCI6IFwicGFzc3dvcmQgaXMgaW5jb3JyZWN0XCIgXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgY29uc3QgdXNlclRva2VuID0geyBpZDogcm93c1swXS5pZCwgIGlzQWRtaW46IHJvd3NbMF0uaXNhZG1pbiwgdXNlck5hbWU6IHJvd3NbMF0uZmlyc3RuYW1lLCBsYXN0TmFtZTogcm93c1swXS5sYXN0bmFtZX1cblxuICAgICAgY29uc3QgdG9rZW4gPSB1c2VyQXV0aEhlbHBlci5nZW5lcmF0ZVRva2VuKHVzZXJUb2tlbik7XG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKHRva2VuKTtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMSkuc2VuZCh7XG4gICAgICAgIFwic3RhdHVzXCI6IDIwMSxcbiAgICAgICAgXCJkYXRhXCI6IFt7XG4gICAgICAgICAgXCJ0b2tlblwiOiB0b2tlbixcbiAgICAgICAgICBcInVzZXJcIjogcm93c1swXSxcbiAgICAgICAgfV0sIFxuICAgICAgfSlcbiAgICB9IGNhdGNoKGVycm9yKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhlcnJvcilcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuc2VuZCh7XG4gICAgICAgIFwic3RhdHVzXCI6IDQwNCxcbiAgICAgICAgXCJlcnJvclwiOiBlcnJvclxuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIC8qKlxuICAgKiBzaWdub3V0XG4gICAqIEBwYXJhbSB7b2JqZWN0fSByZXEgXG4gICAqIEBwYXJhbSB7b2JqZWN0fSByZXNcbiAgICogQHJldHVybnMge29iamVjdH0gdXNlciBvYmplY3QgXG4gICAqL1xuICBhc3luYyBzaWdub3V0KHJlcSwgcmVzKSB7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEdldCBhbGxcbiAgICovXG4gIGFzeW5jIGdldEFsbFVzZXJzKHJlcSwgcmVzKSB7XG4gICAgY29uc3QgZmluZEFsbFF1ZXJ5ID0gJ1NFTEVDVCAqIEZST00gdXNlcnMnO1xuICAgIHRyeXtcbiAgICAgIGNvbnN0IHsgcm93cywgcm93Q291bnQgfSA9IGF3YWl0IGRiLnF1ZXJ5KGZpbmRBbGxRdWVyeSk7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLnNlbmQoe1xuICAgICAgICBcInN0YXR1c1wiOiAyMDAsXG4gICAgICAgXCJkYXRhXCI6IHJvd3MsIHJvd0NvdW50IFxuICAgICAgfSk7XG4gICAgfSBjYXRjaChlcnJvcikge1xuICAgICAgLy8gY29uc29sZS5sb2coZXJyb3IpXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoZXJyb3IpO1xuICAgIH1cbiAgfVxuICB9XG5leHBvcnQgZGVmYXVsdCBVc2VyOyJdfQ==