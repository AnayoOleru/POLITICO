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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy91c2VyQ3RyLmpzIl0sIm5hbWVzIjpbIlVzZXIiLCJjcmVhdGVVc2VyIiwicmVxIiwicmVzIiwiYm9keSIsImVtYWlsIiwicGFzc3dvcmQiLCJmaXJzdG5hbWUiLCJsYXN0bmFtZSIsInBhc3Nwb3J0VXJsIiwic3RhdHVzIiwic2VuZCIsInVzZXJBdXRoSGVscGVyIiwiaXNXaGl0ZVNwYWNlIiwiaXNWYWxpZEVtYWlsIiwiaXNwYXNzd29yZFZhbGlkIiwiaXNOYW1lIiwib3RoZXJuYW1lIiwiaXNJbnQiLCJwaG9uZW51bWJlciIsImhhc2hQYXNzd29yZCIsImNyZWF0ZVF1ZXJ5IiwidmFsdWVzIiwiRGF0ZSIsImRiIiwicXVlcnkiLCJyb3dzIiwidXNlclRva2VuIiwiaWQiLCJpc0FkbWluIiwiaXNhZG1pbiIsInVzZXJOYW1lIiwidG9rZW4iLCJnZW5lcmF0ZVRva2VuIiwiaGVhZGVyIiwianNvbiIsImRhdGEiLCJyb3V0aW5lIiwibG9naW4iLCJ0ZXh0IiwiY29tcGFyZVBhc3N3b3JkIiwibGFzdE5hbWUiLCJzaWdub3V0IiwiZ2V0QWxsVXNlcnMiLCJmaW5kQWxsUXVlcnkiLCJyb3dDb3VudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsT0FBTztBQUNYOzs7Ozs7QUFNTUMsWUFQSztBQUFBLHlHQU9NQyxHQVBOLEVBT1dDLEdBUFg7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG9CQVFMLENBQUNELElBQUlFLElBQUosQ0FBU0MsS0FBVixJQUFvQixDQUFDSCxJQUFJRSxJQUFKLENBQVNFLFFBQTlCLElBQTBDLENBQUNKLElBQUlFLElBQUosQ0FBU0csU0FBcEQsSUFBaUUsQ0FBQ0wsSUFBSUUsSUFBSixDQUFTSSxRQUEzRSxJQUF1RixDQUFDTixJQUFJRSxJQUFKLENBQVNLLFdBUjVGO0FBQUE7QUFBQTtBQUFB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MExZLHFCQTFMWjtBQUFBO0FBQUE7QUFBQSxxQkE0TDBCcEIsb0JBQUdDLEtBQUgsQ0FBU21CLFlBQVQsQ0E1TDFCOztBQUFBO0FBQUE7QUE0TENsQixrQkE1TEQsU0E0TENBLElBNUxEO0FBNExPbUIsc0JBNUxQLFNBNExPQSxRQTVMUDtBQUFBLGdEQTZMQTFDLElBQUlPLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUMxQiwwQkFBVSxHQURnQjtBQUUzQix3QkFBUWUsSUFGbUIsRUFFYm1CO0FBRmEsZUFBckIsQ0E3TEE7O0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0RBbU1BMUMsSUFBSU8sTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLGNBbk1BOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsQ0FBYjtrQkF1TWVYLEkiLCJmaWxlIjoidXNlckN0ci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB1dWlkdjQgZnJvbSAndXVpZC92NCc7XG5pbXBvcnQgZGIgZnJvbSAnLi4vY29udHJvbGxlcnMvZGF0YWJhc2VUYWJsZXMvZGJjb25uZWN0JztcbmltcG9ydCB1c2VyQXV0aEhlbHBlciBmcm9tICcuLi9oZWxwZXIvdXNlckF1dGgnO1xuXG5jb25zdCBVc2VyID0ge1xuICAvKipcbiAgICogQ3JlYXRlIEEgVXNlclxuICAgKiBAcGFyYW0ge29iamVjdH0gcmVxIFxuICAgKiBAcGFyYW0ge29iamVjdH0gcmVzXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IFVzZXIgT2JqZWN0XG4gICAqL1xuICBhc3luYyBjcmVhdGVVc2VyKHJlcSwgcmVzKSB7XG4gICAgaWYgKCFyZXEuYm9keS5lbWFpbCAgfHwgIXJlcS5ib2R5LnBhc3N3b3JkIHx8ICFyZXEuYm9keS5maXJzdG5hbWUgfHwgIXJlcS5ib2R5Lmxhc3RuYW1lIHx8ICFyZXEuYm9keS5wYXNzcG9ydFVybCkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoeyBcbiAgICAgICAgICAgIFwic3RhdHVzXCI6IDQwMCwgXG4gICAgICAgICAgICBcImVycm9yXCI6IFwiU29tZSB2YWx1ZXMgYXJlIG1pc3NpbmdcIiBcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoIXVzZXJBdXRoSGVscGVyLmlzV2hpdGVTcGFjZShyZXEuYm9keS5lbWFpbCwgcmVxLmJvZHkucGFzc3dvcmQsIHJlcSwgcmVxLmJvZHkucGFzc3BvcnRVcmwpKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7IFxuICAgICAgICAgICAgXCJzdGF0dXNcIjogNDAwLCBcbiAgICAgICAgICAgIFwiZXJyb3JcIjogXCJXaGl0ZSBTcGFjZSBhcmUgbm90IGFsbG93ZWQgaW4gaW5wdXQgZmllbGRzXCIgXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgaWYgKCF1c2VyQXV0aEhlbHBlci5pc1ZhbGlkRW1haWwocmVxLmJvZHkuZW1haWwpKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICBcInN0YXR1c1wiOiA0MDAsICBcbiAgICAgICAgXCJlcnJvclwiOiBcIlBsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsXCJcbiAgICB9KTtcbn1cbmlmKCFyZXEuYm9keS5wYXNzcG9ydFVybCl7XG4gIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7IFxuICAgIFwic3RhdHVzXCI6IDQwMCwgXG4gICAgXCJlcnJvclwiOiBcIlVSTCBmaWVsZCBpcyBlbXB0eVwiIFxufSk7XG59XG5cbiAgICBpZiAoIXVzZXJBdXRoSGVscGVyLmlzcGFzc3dvcmRWYWxpZChyZXEuYm9keS5wYXNzd29yZCkpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHsgXG4gICAgICAgICAgICBcInN0YXR1c1wiOiA0MDAsIFxuICAgICAgICAgICAgXCJlcnJvclwiOiBcIlBhc3N3b3JkIG11c3QgYmUgbWluaW11bSBlaWdodCBjaGFyYWN0ZXJzLCBhdCBsZWFzdCBvbmUgbGV0dGVyIGFuZCBvbmUgbnVtYmVyOlwiIFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCF1c2VyQXV0aEhlbHBlci5pc05hbWUocmVxLmJvZHkuZmlyc3RuYW1lLCByZXEuYm9keS5sYXN0bmFtZSwgcmVxLmJvZHkub3RoZXJuYW1lKSkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoeyBcbiAgICAgICAgICAgIFwic3RhdHVzXCI6IDQwMCwgXG4gICAgICAgICAgICBcImVycm9yXCI6IFwiTmFtZXMgbXVzdCBvbmx5IGJlIEFscGhhYmV0cywgc3BhY2VzIGFyZSBhbGxvd2VkXCIgXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXVzZXJBdXRoSGVscGVyLmlzSW50KHJlcS5ib2R5LnBob25lbnVtYmVyKSkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoeyBcbiAgICAgICAgICAgIFwic3RhdHVzXCI6IDQwMCwgXG4gICAgICAgICAgICBcImVycm9yXCI6IFwiSW52YWxpZCBOaWdlcmlhbiBwaG9uZS1udW1iZXJcIiBcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIGlmICghdXNlckF1dGhIZWxwZXIuaXNVUkwocmVxLmJvZHkucGFzc3BvcnRVcmwpKSB7XG4gICAgICAvLyAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7IFxuICAgICAgLy8gICAgICAgXCJzdGF0dXNcIjogNDAwLCBcbiAgICAgIC8vICAgICAgIFwiZXJyb3JcIjogXCJJbnZhbGlkIFVSTFwiIFxuICAgICAgLy8gICB9KTtcbiAgICAgIC8vIH1cblxuXG5cbiAgICBjb25zdCBoYXNoUGFzc3dvcmQgPSB1c2VyQXV0aEhlbHBlci5oYXNoUGFzc3dvcmQocmVxLmJvZHkucGFzc3dvcmQpO1xuXG4gICAgY29uc3QgY3JlYXRlUXVlcnkgPSBgSU5TRVJUIElOVE9cbiAgICAgIHVzZXJzKGlkLCBmaXJzdG5hbWUsIGxhc3RuYW1lLCBcbiAgICAgICAgb3RoZXJuYW1lLCBlbWFpbCwgcGhvbmVudW1iZXIsIHBhc3Nwb3J0VXJsLCBcbiAgICAgICAgcGFzc3dvcmQsIGNyZWF0ZWRfZGF0ZSlcbiAgICAgIFZBTFVFUygkMSwgJDIsICQzLCAkNCwgJDUsICQ2LCAkNywgJDgsICQ5KVxuICAgICAgcmV0dXJuaW5nICpgO1xuXG4gICAgY29uc3QgdmFsdWVzID0gW1xuICAgICAgdXVpZHY0KCksXG4gICAgICByZXEuYm9keS5maXJzdG5hbWUsXG4gICAgICByZXEuYm9keS5sYXN0bmFtZSxcbiAgICAgIHJlcS5ib2R5Lm90aGVybmFtZSxcbiAgICAgIHJlcS5ib2R5LmVtYWlsLFxuICAgICAgcmVxLmJvZHkucGhvbmVudW1iZXIsXG4gICAgICByZXEuYm9keS5wYXNzcG9ydFVybCxcbiAgICAgIGhhc2hQYXNzd29yZCxcbiAgICAgIG1vbWVudChuZXcgRGF0ZSgpKVxuICAgIF07XG4gICAgLy8gY29uc29sZS5sb2codmFsdWVzKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IHJvd3MgfSA9IGF3YWl0IGRiLnF1ZXJ5KGNyZWF0ZVF1ZXJ5LCB2YWx1ZXMpO1xuICAgICAgY29uc3QgdXNlclRva2VuID0geyBpZDogcm93c1swXS5pZCwgIGlzQWRtaW46IHJvd3NbMF0uaXNhZG1pbiwgdXNlck5hbWU6IHJvd3NbMF0uZmlyc3RuYW1lIH1cbiAgICAgIFxuICAgICAgY29uc3QgdG9rZW4gPSB1c2VyQXV0aEhlbHBlci5nZW5lcmF0ZVRva2VuKHVzZXJUb2tlbik7XG4gICAgIFxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAxKS5oZWFkZXIoJ3gtYXV0aC10b2tlbicsIHRva2VuKS5qc29uKHtcbiAgICAgICAgc3RhdHVzOiAyMDEsXG4gICAgICAgIGRhdGE6IFt7XG4gICAgICAgICAgXCJ0b2tlblwiOiB0b2tlbixcbiAgICAgICAgICBcInVzZXJcIjogcm93c1swXVxuICAgICAgICB9XSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2goZXJyb3IpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIGlmIChlcnJvci5yb3V0aW5lID09PSAnX2J0X2NoZWNrX3VuaXF1ZScpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwOSkuc2VuZCh7IFxuICAgICAgICAgICAgXCJkYXRhXCI6IDQwOSxcbiAgICAgICAgICAgIFwiZXJyb3JcIjogXCJVc2VyIHdpdGggdGhhdCBFTUFJTCBhbHJlYWR5IGV4aXN0XCIgXG4gICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICAgICAgXCJkYXRhXCI6IFwiT29wcywgc29tZXRoaW5nIHdlbnQgd3JvbmcsIGNoZWNrIGFuZCB0cnkgYWdhaW5cIlxuICAgICAgfSk7XG4gICAgfVxuICB9LFxuICAvKipcbiAgICogTG9naW5cbiAgICogQHBhcmFtIHtvYmplY3R9IHJlcSBcbiAgICogQHBhcmFtIHtvYmplY3R9IHJlc1xuICAgKiBAcmV0dXJucyB7b2JqZWN0fSB1c2VyIG9iamVjdCBcbiAgICovXG4gIGFzeW5jIGxvZ2luKHJlcSwgcmVzKSB7XG4gICAgaWYgKCFyZXEuYm9keS5lbWFpbCB8fCAhcmVxLmJvZHkucGFzc3dvcmQpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIFwic3RhdHVzXCI6IDQwMCxcbiAgICAgICAgXCJlcnJvclwiOiBcIlNvbWUgdmFsdWVzIGFyZSBtaXNzaW5nXCJcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoIXVzZXJBdXRoSGVscGVyLmlzV2hpdGVTcGFjZShyZXEuYm9keS5lbWFpbCwgcmVxLmJvZHkucGFzc3dvcmQpKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoeyBcbiAgICAgICAgICBcInN0YXR1c1wiOiA0MDAsIFxuICAgICAgICAgIFwiZXJyb3JcIjogXCJXaGl0ZSBTcGFjZSBhcmUgbm90IGFsbG93ZWQgaW4gaW5wdXQgZmllbGRzXCIgXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKCF1c2VyQXV0aEhlbHBlci5pc1ZhbGlkRW1haWwocmVxLmJvZHkuZW1haWwpKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoeyBcbiAgICAgICAgXCJzdGF0dXNcIjogNDAwLFxuICAgICAgICBcImVycm9yXCI6IFwiUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWwgYWRkcmVzc1wiIFxuICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IHRleHQgPSAnU0VMRUNUICogRlJPTSB1c2VycyBXSEVSRSBlbWFpbCA9ICQxJztcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyByb3dzIH0gPSBhd2FpdCBkYi5xdWVyeSh0ZXh0LCBbcmVxLmJvZHkuZW1haWxdKTtcbiAgICAgIGlmICghcm93c1swXSkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICAgIFwic3RhdHVzXCI6IDQwMCxcbiAgICAgICAgICBcImVycm9yXCI6IFwiVGhlIGNyZWRlbnRpYWxzIHlvdSBwcm92aWRlZCBpcyBpbmNvcnJlY3RcIlxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmKCF1c2VyQXV0aEhlbHBlci5jb21wYXJlUGFzc3dvcmQocm93c1swXS5wYXNzd29yZCwgcmVxLmJvZHkucGFzc3dvcmQpKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgICAgXCJzdGF0dXNcIjogNDAwLCBcbiAgICAgICAgICBcImVycm9yXCI6IFwicGFzc3dvcmQgaXMgaW5jb3JyZWN0XCIgXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgY29uc3QgdXNlclRva2VuID0geyBpZDogcm93c1swXS5pZCwgIGlzQWRtaW46IHJvd3NbMF0uaXNhZG1pbiwgdXNlck5hbWU6IHJvd3NbMF0uZmlyc3RuYW1lLCBsYXN0TmFtZTogcm93c1swXS5sYXN0bmFtZX1cblxuICAgICAgY29uc3QgdG9rZW4gPSB1c2VyQXV0aEhlbHBlci5nZW5lcmF0ZVRva2VuKHVzZXJUb2tlbik7XG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKHRva2VuKTtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMSkuc2VuZCh7XG4gICAgICAgIFwic3RhdHVzXCI6IDIwMSxcbiAgICAgICAgXCJkYXRhXCI6IFt7XG4gICAgICAgICAgXCJ0b2tlblwiOiB0b2tlbixcbiAgICAgICAgICBcInVzZXJcIjogcm93c1swXSxcbiAgICAgICAgfV0sIFxuICAgICAgfSlcbiAgICB9IGNhdGNoKGVycm9yKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhlcnJvcilcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuc2VuZCh7XG4gICAgICAgIFwic3RhdHVzXCI6IDQwNCxcbiAgICAgICAgXCJlcnJvclwiOiBlcnJvclxuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIC8qKlxuICAgKiBzaWdub3V0XG4gICAqIEBwYXJhbSB7b2JqZWN0fSByZXEgXG4gICAqIEBwYXJhbSB7b2JqZWN0fSByZXNcbiAgICogQHJldHVybnMge29iamVjdH0gdXNlciBvYmplY3QgXG4gICAqL1xuICBhc3luYyBzaWdub3V0KHJlcSwgcmVzKSB7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEdldCBhbGxcbiAgICovXG4gIGFzeW5jIGdldEFsbFVzZXJzKHJlcSwgcmVzKSB7XG4gICAgY29uc3QgZmluZEFsbFF1ZXJ5ID0gJ1NFTEVDVCAqIEZST00gdXNlcnMnO1xuICAgIHRyeXtcbiAgICAgIGNvbnN0IHsgcm93cywgcm93Q291bnQgfSA9IGF3YWl0IGRiLnF1ZXJ5KGZpbmRBbGxRdWVyeSk7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLnNlbmQoe1xuICAgICAgICBcInN0YXR1c1wiOiAyMDAsXG4gICAgICAgXCJkYXRhXCI6IHJvd3MsIHJvd0NvdW50IFxuICAgICAgfSk7XG4gICAgfSBjYXRjaChlcnJvcikge1xuICAgICAgLy8gY29uc29sZS5sb2coZXJyb3IpXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoZXJyb3IpO1xuICAgIH1cbiAgfVxuICB9XG5leHBvcnQgZGVmYXVsdCBVc2VyOyJdfQ==