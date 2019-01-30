'use strict';

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var User = {
  /**
   * Create A User
   * @param {object} req 
   * @param {object} res
   * @returns {object} User Object
   */
  createUser: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var hashPassword, createQuery, values, _ref2, rows, token;

      return regeneratorRuntime.wrap(function _callee$(_context) {
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
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var text, _ref4, rows, token;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy91c2VyQ3RyLmpzIl0sIm5hbWVzIjpbIlVzZXIiLCJjcmVhdGVVc2VyIiwicmVxIiwicmVzIiwiYm9keSIsImVtYWlsIiwicGFzc3dvcmQiLCJmdWxsbmFtZSIsImxhc3RuYW1lIiwicGFzc3BvcnRVcmwiLCJzdGF0dXMiLCJzZW5kIiwidXNlckF1dGhIZWxwZXIiLCJpc1doaXRlU3BhY2UiLCJIZWxwZXIiLCJpc1ZhbGlkRW1haWwiLCJpc3Bhc3N3b3JkVmFsaWQiLCJoYXNoUGFzc3dvcmQiLCJjcmVhdGVRdWVyeSIsInZhbHVlcyIsImZpcnN0bmFtZSIsIm90aGVybmFtZSIsInBob25lbnVtYmVyIiwiRGF0ZSIsImRiIiwicXVlcnkiLCJyb3dzIiwidG9rZW4iLCJnZW5lcmF0ZVRva2VuIiwiaWQiLCJoZWFkZXIiLCJqc29uIiwiZGF0YSIsInVzZXIiLCJyb3V0aW5lIiwibG9naW4iLCJ0ZXh0IiwiY29tcGFyZVBhc3N3b3JkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFNQSxPQUFPO0FBQ1g7Ozs7OztBQU1NQyxZQVBLO0FBQUEsd0ZBT01DLEdBUE4sRUFPV0MsR0FQWDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsb0JBUUwsQ0FBQ0QsSUFBSUUsSUFBSixDQUFTQyxLQUFWLElBQW1CLENBQUNILElBQUlFLElBQUosQ0FBU0UsUUFBN0IsSUFBeUMsQ0FBQ0osSUFBSUUsSUFBSixDQUFTRyxRQUFuRCxJQUErRCxDQUFDTCxJQUFJRSxJQUFKLENBQVNJLFFBQXpFLElBQXFGLENBQUNOLElBQUlFLElBQUosQ0FBU0ssV0FSMUY7QUFBQTtBQUFBO0FBQUE7O0FBQUEsK0NBU0VOLElBQUlPLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUN4QiwwQkFBVSxHQURjO0FBRXhCLHlCQUFTO0FBRmUsZUFBckIsQ0FURjs7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Q0FqSFA7QUFBQSxnREFrSEExQixJQUFJTyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDMUIsMEJBQVUsR0FEZ0I7QUFFMUIsd0JBQVEsQ0FBQztBQUNQLDJCQUFTZ0IsS0FERjtBQUVQLDBCQUFRRCxLQUFLLENBQUw7QUFGRCxpQkFBRDtBQUZrQixlQUFyQixDQWxIQTs7QUFBQTtBQUFBO0FBQUE7QUFBQSxnREEwSEF2QixJQUFJTyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDMUIsMEJBQVUsR0FEZ0I7QUFFMUI7QUFGMEIsZUFBckIsQ0ExSEE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxDQUFiO2tCQWlJZVgsSSIsImZpbGUiOiJ1c2VyQ3RyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5pbXBvcnQgdXVpZHY0IGZyb20gJ3V1aWQvdjQnO1xyXG5pbXBvcnQgZGIgZnJvbSAnLi4vLi4vZGF0YWJhc2VUYWJsZXMvZGJjb25uZWN0JztcclxuaW1wb3J0IHVzZXJBdXRoSGVscGVyIGZyb20gJy4uLy4uL2hlbHBlci91c2VyQXV0aCc7XHJcblxyXG5jb25zdCBVc2VyID0ge1xyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBBIFVzZXJcclxuICAgKiBAcGFyYW0ge29iamVjdH0gcmVxIFxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSByZXNcclxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSBVc2VyIE9iamVjdFxyXG4gICAqL1xyXG4gIGFzeW5jIGNyZWF0ZVVzZXIocmVxLCByZXMpIHtcclxuICAgIGlmICghcmVxLmJvZHkuZW1haWwgfHwgIXJlcS5ib2R5LnBhc3N3b3JkIHx8ICFyZXEuYm9keS5mdWxsbmFtZSB8fCAhcmVxLmJvZHkubGFzdG5hbWUgfHwgIXJlcS5ib2R5LnBhc3Nwb3J0VXJsKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHsgXHJcbiAgICAgICAgICAgIFwic3RhdHVzXCI6IDQwMCwgXHJcbiAgICAgICAgICAgIFwiZXJyb3JcIjogXCJTb21lIHZhbHVlcyBhcmUgbWlzc2luZ1wiIFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghdXNlckF1dGhIZWxwZXIuaXNXaGl0ZVNwYWNlKHJlcS5ib2R5LmVtYWlsLCByZXEuYm9keS5wYXNzd29yZCwgcmVxLCByZXEuYm9keS5wYXNzcG9ydFVybCkpIHtcclxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoeyBcclxuICAgICAgICAgICAgXCJzdGF0dXNcIjogNDAwLCBcclxuICAgICAgICAgICAgXCJlcnJvclwiOiBcIldoaXRlIFNwYWNlIGFyZSBub3QgYWxsb3dlZCBpbiBpbnB1dCBmaWVsZHNcIiBcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgIGlmICghSGVscGVyLmlzVmFsaWRFbWFpbChyZXEuYm9keS5lbWFpbCkpIHtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcclxuICAgICAgICBcInN0YXR1c1wiOiA0MDAsICBcclxuICAgICAgICBcImVycm9yXCI6IFwiUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWxcIlxyXG4gICAgfSk7XHJcbn1cclxuXHJcbiAgICBpZiAoIXVzZXJBdXRoSGVscGVyLmlzcGFzc3dvcmRWYWxpZChyZXEuYm9keS5wYXNzd29yZCkpIHtcclxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoeyBcclxuICAgICAgICAgICAgXCJzdGF0dXNcIjogNDAwLCBcclxuICAgICAgICAgICAgXCJlcnJvclwiOiBcIlBhc3N3b3JkIE11c3QgQmUgYXQgbGVhc3QgRml2ZSBDaGFyYWN0ZXJzIEFuZCBNdXN0IEJlIEEgc3RyaW5nXCIgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICBjb25zdCBoYXNoUGFzc3dvcmQgPSBIZWxwZXIuaGFzaFBhc3N3b3JkKHJlcS5ib2R5LnBhc3N3b3JkKTtcclxuXHJcbiAgICBjb25zdCBjcmVhdGVRdWVyeSA9IGBJTlNFUlQgSU5UT1xyXG4gICAgICB1c2VycyhpZCwgZmlyc3RuYW1lLCBsYXN0bmFtZSwgXHJcbiAgICAgICAgb3RoZXJuYW1lLCBlbWFpbCwgcGhvbmVudW1iZXIsIHBhc3Nwb3J0VXJsLCBcclxuICAgICAgICBwYXNzd29yZCwgY3JlYXRlZF9kYXRlKVxyXG4gICAgICBWQUxVRVMoJDEsICQyLCAkMywgJDQsICQ1LCAkNiwgJDcsICQ4LCAkOSlcclxuICAgICAgcmV0dXJuaW5nICpgO1xyXG5cclxuICAgIGNvbnN0IHZhbHVlcyA9IFtcclxuICAgICAgdXVpZHY0KCksXHJcbiAgICAgIHJlcS5ib2R5LmZpcnN0bmFtZSxcclxuICAgICAgcmVxLmJvZHkubGFzdG5hbWUsXHJcbiAgICAgIHJlcS5ib2R5Lm90aGVybmFtZSxcclxuICAgICAgcmVxLmJvZHkuZW1haWwsXHJcbiAgICAgIHJlcS5ib2R5LnBob25lbnVtYmVyLFxyXG4gICAgICByZXEuYm9keS5wYXNzcG9ydFVybCxcclxuICAgICAgaGFzaFBhc3N3b3JkLFxyXG4gICAgICBtb21lbnQobmV3IERhdGUoKSlcclxuICAgIF07XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyByb3dzIH0gPSBhd2FpdCBkYi5xdWVyeShjcmVhdGVRdWVyeSwgdmFsdWVzKTtcclxuICAgICAgY29uc3QgdG9rZW4gPSB1c2VyQXV0aEhlbHBlci5nZW5lcmF0ZVRva2VuKHJvd3NbMF0uaWQpO1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDEpLmhlYWRlcigneC1hdXRoLXRva2VuJywgdG9rZW4pLmpzb24oe1xyXG4gICAgICAgIHN0YXR1czogMjAxLFxyXG4gICAgICAgIGRhdGE6IFt7XHJcbiAgICAgICAgICB0b2tlbixcclxuICAgICAgICAgIHVzZXI6IHJvd3NbMF0sXHJcbiAgICAgICAgfV0sXHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaChlcnJvcikge1xyXG4gICAgICBpZiAoZXJyb3Iucm91dGluZSA9PT0gJ19idF9jaGVja191bmlxdWUnKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHsgXHJcbiAgICAgICAgICAgIFwiZGF0YVwiOiA0MDAsXHJcbiAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIlVzZXIgd2l0aCB0aGF0IEVNQUlMIGFscmVhZHkgZXhpc3RcIiBcclxuICAgIH0pXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcclxuICAgICAgICAgICAgXCJkYXRhXCI6XHJcbiAgICAgICAgICAgIGVycm9yXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogTG9naW5cclxuICAgKiBAcGFyYW0ge29iamVjdH0gcmVxIFxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSByZXNcclxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSB1c2VyIG9iamVjdCBcclxuICAgKi9cclxuICBhc3luYyBsb2dpbihyZXEsIHJlcykge1xyXG4gICAgaWYgKCFyZXEuYm9keS5lbWFpbCB8fCAhcmVxLmJvZHkucGFzc3dvcmQpIHtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcclxuICAgICAgICBcInN0YXR1c1wiOiA0MDAsXHJcbiAgICAgICAgXCJlcnJvclwiOiBcIlNvbWUgdmFsdWVzIGFyZSBtaXNzaW5nXCJcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoIUhlbHBlci5pc1ZhbGlkRW1haWwocmVxLmJvZHkuZW1haWwpKSB7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7IFxyXG4gICAgICAgIFwic3RhdHVzXCI6IDQwMCxcclxuICAgICAgICBcImVycm9yXCI6IFwiUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWwgYWRkcmVzc1wiIFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGNvbnN0IHRleHQgPSAnU0VMRUNUICogRlJPTSB1c2VycyBXSEVSRSBlbWFpbCA9ICQxJztcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHsgcm93cyB9ID0gYXdhaXQgZGIucXVlcnkodGV4dCwgW3JlcS5ib2R5LmVtYWlsXSk7XHJcbiAgICAgIGlmICghcm93c1swXSkge1xyXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XHJcbiAgICAgICAgICBcInN0YXR1c1wiOiA0MDAsXHJcbiAgICAgICAgICBcImVycm9yXCI6IFwiVGhlIGNyZWRlbnRpYWxzIHlvdSBwcm92aWRlZCBpcyBpbmNvcnJlY3RcIlxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKCFIZWxwZXIuY29tcGFyZVBhc3N3b3JkKHJvd3NbMF0ucGFzc3dvcmQsIHJlcS5ib2R5LnBhc3N3b3JkKSkge1xyXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XHJcbiAgICAgICAgICBcInN0YXR1c1wiOiA0MDAsIFxyXG4gICAgICAgICAgXCJlcnJvclwiOiBcIlRoZSBjcmVkZW50aWFscyB5b3UgcHJvdmlkZWQgaXMgaW5jb3JyZWN0XCIgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgdG9rZW4gPSBIZWxwZXIuZ2VuZXJhdGVUb2tlbihyb3dzWzBdLmlkKTtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHtcclxuICAgICAgICBcInN0YXR1c1wiOiAyMDEsXHJcbiAgICAgICAgXCJkYXRhXCI6IFt7XHJcbiAgICAgICAgICBcInRva2VuXCI6IHRva2VuLFxyXG4gICAgICAgICAgXCJ1c2VyXCI6IHJvd3NbMF0sXHJcbiAgICAgICAgfV0sIFxyXG4gICAgICB9KVxyXG4gICAgfSBjYXRjaChlcnJvcikge1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xyXG4gICAgICAgIFwic3RhdHVzXCI6IDQwNCxcclxuICAgICAgICBcImVycm9yXCI6IGVycm9yXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG4gIH1cclxuZXhwb3J0IGRlZmF1bHQgVXNlcjsiXX0=