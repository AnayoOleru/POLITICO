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
              if (_userAuth2.default.isWhiteSpace(req.body.email, req.body.password, req.body.othername, req.body.phonenumber)) {
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
                error: 'Invalid Nigerian phone-number'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy91c2VyQ3RyLmpzIl0sIm5hbWVzIjpbIlVzZXIiLCJjcmVhdGVVc2VyIiwicmVxIiwicmVzIiwiYm9keSIsImVtYWlsIiwicGFzc3dvcmQiLCJmaXJzdG5hbWUiLCJsYXN0bmFtZSIsInN0YXR1cyIsInNlbmQiLCJlcnJvciIsInVzZXJBdXRoSGVscGVyIiwiaXNXaGl0ZVNwYWNlIiwib3RoZXJuYW1lIiwicGhvbmVudW1iZXIiLCJpc1ZhbGlkRW1haWwiLCJwYXNzcG9ydFVybCIsImlzcGFzc3dvcmRWYWxpZCIsImlzTmFtZSIsImlzSW50IiwiaGFzaFBhc3N3b3JkIiwiY3JlYXRlUXVlcnkiLCJ2YWx1ZXMiLCJEYXRlIiwiZGIiLCJxdWVyeSIsInJvd3MiLCJ1c2VyVG9rZW4iLCJpZCIsImlzQWRtaW4iLCJpc2FkbWluIiwidXNlck5hbWUiLCJ0b2tlbiIsImdlbmVyYXRlVG9rZW4iLCJoZWFkZXIiLCJqc29uIiwiZGF0YSIsInVzZXIiLCJjb25zb2xlIiwibG9nIiwicm91dGluZSIsImxvZ2luIiwidGV4dCIsImNvbXBhcmVQYXNzd29yZCIsImxhc3ROYW1lIiwic2lnbm91dCIsImdldEFsbFVzZXJzIiwiZmluZEFsbFF1ZXJ5Iiwicm93Q291bnQiLCJnZXRBVXNlciIsInBhcmFtcyIsImlzVVVJRCIsIm9yZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxPQUFPO0FBQ1g7Ozs7OztBQU1NQyxZQVBLO0FBQUEseUdBT01DLEdBUE4sRUFPV0MsR0FQWDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsb0JBUUwsQ0FBQ0QsSUFBSUUsSUFBSixDQUFTQyxLQUFWLElBQW1CLENBQUNILElBQUlFLElBQUosQ0FBU0UsUUFBN0IsSUFBeUMsQ0FBQ0osSUFBSUUsSUFBSixDQUFTRyxTQUFuRCxJQUFnRSxDQUFDTCxJQUFJRSxJQUFKLENBQVNJLFFBUnJFO0FBQUE7QUFBQTtBQUFBOztBQUFBLCtDQVNBTCxJQUFJTSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDMUJELHdCQUFRLEdBRGtCO0FBRTFCRSx1QkFBTztBQUZtQixlQUFyQixDQVRBOztBQUFBO0FBQUEsa0JBY0pDLG1CQUFlQyxZQUFmLENBQTRCWCxJQUFJRSxJQUFKLENBQVNDLEtBQXJDLEVBQTRDSCxJQUFJRSxJQUFKLENBQVNFLFFBQXJELEVBQStESixJQUFJRSxJQUFKLENBQVNVLFNBQXhFLEVBQW1GWixJQUFJRSxJQUFKLENBQVNXLFdBQTVGLENBZEk7QUFBQTtBQUFBO0FBQUE7O0FBQUEsK0NBZUFaLElBQUlNLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUMxQkQsd0JBQVEsR0FEa0I7QUFFMUJFLHVCQUFPO0FBRm1CLGVBQXJCLENBZkE7O0FBQUE7QUFBQSxrQkFxQkpDLG1CQUFlSSxZQUFmLENBQTRCZCxJQUFJRSxJQUFKLENBQVNDLEtBQXJDLENBckJJO0FBQUE7QUFBQTtBQUFBOztBQUFBLCtDQXNCQUYsSUFBSU0sTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQzFCRCx3QkFBUSxHQURrQjtBQUUxQkUsdUJBQU87QUFGbUIsZUFBckIsQ0F0QkE7O0FBQUE7QUFBQSxrQkEyQkpULElBQUlFLElBQUosQ0FBU2EsV0EzQkw7QUFBQTtBQUFBO0FBQUE7O0FBQUEsK0NBNEJBZCxJQUFJTSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDMUJELHdCQUFRLEdBRGtCO0FBRTFCRSx1QkFBTztBQUZtQixlQUFyQixDQTVCQTs7QUFBQTtBQUFBLGtCQWtDSkMsbUJBQWVNLGVBQWYsQ0FBK0JoQixJQUFJRSxJQUFKLENBQVNFLFFBQXhDLENBbENJO0FBQUE7QUFBQTtBQUFBOztBQUFBLCtDQW1DQUgsSUFBSU0sTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQzFCRCx3QkFBUSxHQURrQjtBQUUxQkUsdUJBQU87QUFGbUIsZUFBckIsQ0FuQ0E7O0FBQUE7QUFBQSxrQkF5Q0pDLG1CQUFlTyxNQUFmLENBQXNCakIsSUFBSUUsSUFBSixDQUFTRyxTQUEvQixFQUEwQ0wsSUFBSUUsSUFBSixDQUFTSSxRQUFuRCxFQUE2RE4sSUFBSUUsSUFBSixDQUFTVSxTQUF0RSxDQXpDSTtBQUFBO0FBQUE7QUFBQTs7QUFBQSwrQ0EwQ0FYLElBQUlNLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUMxQkQsd0JBQVEsR0FEa0I7QUFFMUJFLHVCQUFPO0FBRm1CLGVBQXJCLENBMUNBOztBQUFBO0FBQUEsa0JBZ0RKQyxtQkFBZVEsS0FBZixDQUFxQmxCLElBQUlFLElBQUosQ0FBU1csV0FBOUIsQ0FoREk7QUFBQTtBQUFBO0FBQUE7O0FBQUEsK0NBaURBWixJQUFJTSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDMUJELHdCQUFRLEdBRGtCO0FBRTFCRSx1QkFBTztBQUZtQixlQUFyQixDQWpEQTs7QUFBQTs7QUF1RFQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHTVUsMEJBL0RHLEdBK0RZVCxtQkFBZVMsWUFBZixDQUE0Qm5CLElBQUlFLElBQUosQ0FBU0UsUUFBckMsQ0EvRFo7QUFpRUhnQix5QkFqRUc7QUF3RUhDLG9CQXhFRyxHQXdFTSxDQUNiLGtCQURhLEVBRWJyQixJQUFJRSxJQUFKLENBQVNHLFNBRkksRUFHYkwsSUFBSUUsSUFBSixDQUFTSSxRQUhJLEVBSWJOLElBQUlFLElBQUosQ0FBU1UsU0FKSSxFQUtiWixJQUFJRSxJQUFKLENBQVNDLEtBTEksRUFNYkgsSUFBSUUsSUFBSixDQUFTVyxXQU5JLEVBT2JiLElBQUlFLElBQUosQ0FBU2EsV0FQSSxFQVFiSSxZQVJhLEVBU2Isc0JBQU8sSUFBSUcsSUFBSixFQUFQLENBVGEsQ0F4RU47QUFtRlQ7O0FBbkZTO0FBQUE7QUFBQSxxQkFzRmdCQyxvQkFBR0MsS0FBSCxDQUFTSixXQUFULEVBQXNCQyxNQUF0QixDQXRGaEI7O0FBQUE7QUFBQTtBQXNGQ0ksa0JBdEZELFNBc0ZDQSxJQXRGRDtBQXVGREMsdUJBdkZDLEdBdUZXLEVBQUVDLElBQUlGLEtBQUssQ0FBTCxFQUFRRSxFQUFkLEVBQWtCQyxTQUFTSCxLQUFLLENBQUwsRUFBUUksT0FBbkMsRUFBNENDLFVBQVVMLEtBQUssQ0FBTCxFQUFRcEIsU0FBOUQsRUF2Rlg7QUF5RkQwQixtQkF6RkMsR0F5Rk9yQixtQkFBZXNCLGFBQWYsQ0FBNkJOLFNBQTdCLENBekZQO0FBQUEsK0NBMkZBekIsSUFBSU0sTUFBSixDQUFXLEdBQVgsRUFBZ0IwQixNQUFoQixDQUF1QixjQUF2QixFQUF1Q0YsS0FBdkMsRUFBOENHLElBQTlDLENBQW1EO0FBQ3hEM0Isd0JBQVEsR0FEZ0Q7QUFFeEQ0QixzQkFBTSxDQUFDO0FBQ0xKLDhCQURLO0FBRUxLLHdCQUFNWCxLQUFLLENBQUw7QUFGRCxpQkFBRDtBQUZrRCxlQUFuRCxDQTNGQTs7QUFBQTtBQUFBO0FBQUE7O0FBbUdQWSxzQkFBUUMsR0FBUjs7QUFuR08sb0JBb0dILFlBQU1DLE9BQU4sS0FBa0Isa0JBcEdmO0FBQUE7QUFBQTtBQUFBOztBQUFBLCtDQXFHRXRDLElBQUlNLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUMxQjJCLHNCQUFNLEdBRG9CO0FBRTFCMUIsdUJBQU87QUFGbUIsZUFBckIsQ0FyR0Y7O0FBQUE7QUFBQSwrQ0EwR0FSLElBQUlNLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUMxQjJCLHNCQUFNO0FBRG9CLGVBQXJCLENBMUdBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQStHWDs7Ozs7O0FBTU1LLE9BckhLO0FBQUEsMkdBcUhDeEMsR0FySEQsRUFxSE1DLEdBckhOO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxvQkFzSEwsQ0FBQ0QsSUFBSUUsSUFBSixDQUFTQyxLQUFWLElBQW1CLENBQUNILElBQUlFLElBQUosQ0FBU0UsUUF0SHhCO0FBQUE7QUFBQTtBQUFBOztBQUFBLGdEQXVIQUgsSUFBSU0sTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQzFCRCx3QkFBUSxHQURrQjtBQUUxQkUsdUJBQU87QUFGbUIsZUFBckIsQ0F2SEE7O0FBQUE7QUFBQSxrQkE0SEpDLG1CQUFlQyxZQUFmLENBQTRCWCxJQUFJRSxJQUFKLENBQVNDLEtBQXJDLEVBQTRDSCxJQUFJRSxJQUFKLENBQVNFLFFBQXJELENBNUhJO0FBQUE7QUFBQTtBQUFBOztBQUFBLGdEQTZIQUgsSUFBSU0sTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQzFCRCx3QkFBUSxHQURrQjtBQUUxQkUsdUJBQU87QUFGbUIsZUFBckIsQ0E3SEE7O0FBQUE7QUFBQSxrQkFrSUpDLG1CQUFlSSxZQUFmLENBQTRCZCxJQUFJRSxJQUFKLENBQVNDLEtBQXJDLENBbElJO0FBQUE7QUFBQTtBQUFBOztBQUFBLGdEQW1JQUYsSUFBSU0sTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQzFCRCx3QkFBUSxHQURrQjtBQUUxQkUsdUJBQU87QUFGbUIsZUFBckIsQ0FuSUE7O0FBQUE7QUF3SUhnQyxrQkF4SUcsR0F3SUksc0NBeElKO0FBQUE7QUFBQTtBQUFBLHFCQTBJZ0JsQixvQkFBR0MsS0FBSCxDQUFTaUIsSUFBVCxFQUFlLENBQUN6QyxJQUFJRSxJQUFKLENBQVNDLEtBQVYsQ0FBZixDQTFJaEI7O0FBQUE7QUFBQTtBQTBJQ3NCLGtCQTFJRCxTQTBJQ0EsSUExSUQ7O0FBQUEsa0JBMklGQSxLQUFLLENBQUwsQ0EzSUU7QUFBQTtBQUFBO0FBQUE7O0FBQUEsZ0RBNElFeEIsSUFBSU0sTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQzFCRCx3QkFBUSxHQURrQjtBQUUxQkUsdUJBQU87QUFGbUIsZUFBckIsQ0E1SUY7O0FBQUE7QUFBQSxrQkFpSkZDLG1CQUFlZ0MsZUFBZixDQUErQmpCLEtBQUssQ0FBTCxFQUFRckIsUUFBdkMsRUFBaURKLElBQUlFLElBQUosQ0FBU0UsUUFBMUQsQ0FqSkU7QUFBQTtBQUFBO0FBQUE7O0FBQUEsZ0RBa0pFSCxJQUFJTSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDMUJELHdCQUFRLEdBRGtCO0FBRTFCRSx1QkFBTztBQUZtQixlQUFyQixDQWxKRjs7QUFBQTtBQXVKRGlCLHVCQXZKQyxHQXVKVztBQUNoQkMsb0JBQUlGLEtBQUssQ0FBTCxFQUFRRSxFQURJLEVBQ0FDLFNBQVNILEtBQUssQ0FBTCxFQUFRSSxPQURqQixFQUMwQkMsVUFBVUwsS0FBSyxDQUFMLEVBQVFwQixTQUQ1QyxFQUN1RHNDLFVBQVVsQixLQUFLLENBQUwsRUFBUW5CO0FBRHpFLGVBdkpYO0FBMkpEeUIsbUJBM0pDLEdBMkpPckIsbUJBQWVzQixhQUFmLENBQTZCTixTQUE3QixDQTNKUDs7QUE2SlA7O0FBN0pPLGdEQThKQXpCLElBQUlNLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUMxQkQsd0JBQVEsR0FEa0I7QUFFMUI0QixzQkFBTSxDQUFDO0FBQ0xKLDhCQURLO0FBRUxLLHdCQUFNWCxLQUFLLENBQUw7QUFGRCxpQkFBRDtBQUZvQixlQUFyQixDQTlKQTs7QUFBQTtBQUFBO0FBQUE7QUFBQSxnREF1S0F4QixJQUFJTSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDMUJELHdCQUFRLEdBRGtCO0FBRTFCRTtBQUYwQixlQUFyQixDQXZLQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUE2S1g7Ozs7OztBQU1NbUMsU0FuTEs7QUFBQSwyR0FtTEc1QyxHQW5MSCxFQW1MUUMsR0FuTFI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTs7O0FBc0xYOzs7QUFHTTRDLGFBekxLO0FBQUEsMkdBeUxPN0MsR0F6TFAsRUF5TFlDLEdBekxaO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUEwTEg2QywwQkExTEcsR0EwTFkscUJBMUxaO0FBQUE7QUFBQTtBQUFBLHFCQTRMMEJ2QixvQkFBR0MsS0FBSCxDQUFTc0IsWUFBVCxDQTVMMUI7O0FBQUE7QUFBQTtBQTRMQ3JCLGtCQTVMRCxTQTRMQ0EsSUE1TEQ7QUE0TE9zQixzQkE1TFAsU0E0TE9BLFFBNUxQO0FBQUEsZ0RBNkxBOUMsSUFBSU0sTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQzFCRCx3QkFBUSxHQURrQjtBQUUxQjRCLHNCQUFNVixJQUZvQjtBQUcxQnNCO0FBSDBCLGVBQXJCLENBN0xBOztBQUFBO0FBQUE7QUFBQTtBQUFBLGdEQW9NQTlDLElBQUlNLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixjQXBNQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQXVNTHdDLFVBdk1LO0FBQUEsMkdBdU1JaEQsR0F2TUosRUF1TVNDLEdBdk1UO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUF3TUQwQixnQkF4TUMsR0F3TU0zQixJQUFJaUQsTUF4TVYsQ0F3TUR0QixFQXhNQzs7QUFBQSxrQkF5TUpqQixtQkFBZXdDLE1BQWYsQ0FBc0J2QixFQUF0QixDQXpNSTtBQUFBO0FBQUE7QUFBQTs7QUFBQSxnREEwTUExQixJQUFJTSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDMUJELHdCQUFRLEdBRGtCO0FBRTFCRSx1QkFBTztBQUZtQixlQUFyQixDQTFNQTs7QUFBQTtBQStNSGdDLGtCQS9NRyxHQStNSSxtQ0EvTUo7QUFBQTtBQUFBO0FBQUEscUJBaU5nQmxCLG9CQUFHQyxLQUFILENBQVNpQixJQUFULEVBQWUsQ0FBQ2QsRUFBRCxDQUFmLENBak5oQjs7QUFBQTtBQUFBO0FBaU5DRixrQkFqTkQsU0FpTkNBLElBak5EOztBQUFBLGtCQW1ORkEsS0FBSyxDQUFMLENBbk5FO0FBQUE7QUFBQTtBQUFBOztBQUFBLGdEQW9ORXhCLElBQUlNLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQixFQUFFQyxPQUFPLGdCQUFULEVBQXJCLENBcE5GOztBQUFBO0FBQUEsZ0RBeU5BUixJQUFJTSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDMUJELHdCQUFRLEdBRGtCO0FBRTFCNEIsc0JBQU0sQ0FBQztBQUNMZ0IseUJBQU8xQixLQUFLLENBQUw7QUFERixpQkFBRDtBQUZvQixlQUFyQixDQXpOQTs7QUFBQTtBQUFBO0FBQUE7QUFBQSxnREFnT0F4QixJQUFJTSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsY0FoT0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxDQUFiO2tCQW9PZVYsSSIsImZpbGUiOiJ1c2VyQ3RyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHV1aWR2NCBmcm9tICd1dWlkL3Y0JztcbmltcG9ydCBkYiBmcm9tICcuL2RhdGFiYXNlVGFibGVzL2RiY29ubmVjdCc7XG5pbXBvcnQgdXNlckF1dGhIZWxwZXIgZnJvbSAnLi4vaGVscGVyL3VzZXJBdXRoJztcblxuY29uc3QgVXNlciA9IHtcbiAgLyoqXG4gICAqIENyZWF0ZSBBIFVzZXJcbiAgICogQHBhcmFtIHtvYmplY3R9IHJlcVxuICAgKiBAcGFyYW0ge29iamVjdH0gcmVzXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IFVzZXIgT2JqZWN0XG4gICAqL1xuICBhc3luYyBjcmVhdGVVc2VyKHJlcSwgcmVzKSB7XG4gICAgaWYgKCFyZXEuYm9keS5lbWFpbCB8fCAhcmVxLmJvZHkucGFzc3dvcmQgfHwgIXJlcS5ib2R5LmZpcnN0bmFtZSB8fCAhcmVxLmJvZHkubGFzdG5hbWUpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBlcnJvcjogJ1NvbWUgdmFsdWVzIGFyZSBtaXNzaW5nJyxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoIXVzZXJBdXRoSGVscGVyLmlzV2hpdGVTcGFjZShyZXEuYm9keS5lbWFpbCwgcmVxLmJvZHkucGFzc3dvcmQsIHJlcS5ib2R5Lm90aGVybmFtZSwgcmVxLmJvZHkucGhvbmVudW1iZXIpKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgZXJyb3I6ICdXaGl0ZSBTcGFjZSBhcmUgbm90IGFsbG93ZWQgaW4gaW5wdXQgZmllbGRzJyxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghdXNlckF1dGhIZWxwZXIuaXNWYWxpZEVtYWlsKHJlcS5ib2R5LmVtYWlsKSkge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgIGVycm9yOiAnUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWwnLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICghcmVxLmJvZHkucGFzc3BvcnRVcmwpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBlcnJvcjogJ1VSTCBmaWVsZCBpcyBlbXB0eScsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXVzZXJBdXRoSGVscGVyLmlzcGFzc3dvcmRWYWxpZChyZXEuYm9keS5wYXNzd29yZCkpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBlcnJvcjogJ1Bhc3N3b3JkIG11c3QgYmUgbWluaW11bSBlaWdodCBjaGFyYWN0ZXJzLCBhdCBsZWFzdCBvbmUgbGV0dGVyIGFuZCBvbmUgbnVtYmVyOicsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXVzZXJBdXRoSGVscGVyLmlzTmFtZShyZXEuYm9keS5maXJzdG5hbWUsIHJlcS5ib2R5Lmxhc3RuYW1lLCByZXEuYm9keS5vdGhlcm5hbWUpKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgZXJyb3I6ICdOYW1lcyBtdXN0IG9ubHkgYmUgQWxwaGFiZXRzLCBzcGFjZXMgYXJlIGFsbG93ZWQnLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCF1c2VyQXV0aEhlbHBlci5pc0ludChyZXEuYm9keS5waG9uZW51bWJlcikpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBlcnJvcjogJ0ludmFsaWQgTmlnZXJpYW4gcGhvbmUtbnVtYmVyJyxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGlmICghdXNlckF1dGhIZWxwZXIuaXNVUkwocmVxLmJvZHkucGFzc3BvcnRVcmwpKSB7XG4gICAgLy8gICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgIC8vICAgICAgIFwic3RhdHVzXCI6IDQwMCxcbiAgICAvLyAgICAgICBcImVycm9yXCI6IFwiSW52YWxpZCBVUkxcIlxuICAgIC8vICAgfSk7XG4gICAgLy8gfVxuXG5cbiAgICBjb25zdCBoYXNoUGFzc3dvcmQgPSB1c2VyQXV0aEhlbHBlci5oYXNoUGFzc3dvcmQocmVxLmJvZHkucGFzc3dvcmQpO1xuXG4gICAgY29uc3QgY3JlYXRlUXVlcnkgPSBgSU5TRVJUIElOVE9cbiAgICAgIHVzZXJzKGlkLCBmaXJzdG5hbWUsIGxhc3RuYW1lLCBcbiAgICAgICAgb3RoZXJuYW1lLCBlbWFpbCwgcGhvbmVudW1iZXIsIHBhc3Nwb3J0VXJsLCBcbiAgICAgICAgcGFzc3dvcmQsIGNyZWF0ZWRfZGF0ZSlcbiAgICAgIFZBTFVFUygkMSwgJDIsICQzLCAkNCwgJDUsICQ2LCAkNywgJDgsICQ5KVxuICAgICAgcmV0dXJuaW5nICpgO1xuXG4gICAgY29uc3QgdmFsdWVzID0gW1xuICAgICAgdXVpZHY0KCksXG4gICAgICByZXEuYm9keS5maXJzdG5hbWUsXG4gICAgICByZXEuYm9keS5sYXN0bmFtZSxcbiAgICAgIHJlcS5ib2R5Lm90aGVybmFtZSxcbiAgICAgIHJlcS5ib2R5LmVtYWlsLFxuICAgICAgcmVxLmJvZHkucGhvbmVudW1iZXIsXG4gICAgICByZXEuYm9keS5wYXNzcG9ydFVybCxcbiAgICAgIGhhc2hQYXNzd29yZCxcbiAgICAgIG1vbWVudChuZXcgRGF0ZSgpKSxcbiAgICBdO1xuICAgIC8vIGNvbnNvbGUubG9nKHZhbHVlcyk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgeyByb3dzIH0gPSBhd2FpdCBkYi5xdWVyeShjcmVhdGVRdWVyeSwgdmFsdWVzKTtcbiAgICAgIGNvbnN0IHVzZXJUb2tlbiA9IHsgaWQ6IHJvd3NbMF0uaWQsIGlzQWRtaW46IHJvd3NbMF0uaXNhZG1pbiwgdXNlck5hbWU6IHJvd3NbMF0uZmlyc3RuYW1lIH07XG5cbiAgICAgIGNvbnN0IHRva2VuID0gdXNlckF1dGhIZWxwZXIuZ2VuZXJhdGVUb2tlbih1c2VyVG9rZW4pO1xuXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDEpLmhlYWRlcigneC1hdXRoLXRva2VuJywgdG9rZW4pLmpzb24oe1xuICAgICAgICBzdGF0dXM6IDIwMSxcbiAgICAgICAgZGF0YTogW3tcbiAgICAgICAgICB0b2tlbixcbiAgICAgICAgICB1c2VyOiByb3dzWzBdLFxuICAgICAgICB9XSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICBpZiAoZXJyb3Iucm91dGluZSA9PT0gJ19idF9jaGVja191bmlxdWUnKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwOSkuc2VuZCh7XG4gICAgICAgICAgZGF0YTogNDA5LFxuICAgICAgICAgIGVycm9yOiAnVXNlciB3aXRoIHRoYXQgRU1BSUwgYWxyZWFkeSBleGlzdCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICAgICAgZGF0YTogJ09vcHMsIHNvbWV0aGluZyB3ZW50IHdyb25nLCBjaGVjayBhbmQgdHJ5IGFnYWluJyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgLyoqXG4gICAqIExvZ2luXG4gICAqIEBwYXJhbSB7b2JqZWN0fSByZXFcbiAgICogQHBhcmFtIHtvYmplY3R9IHJlc1xuICAgKiBAcmV0dXJucyB7b2JqZWN0fSB1c2VyIG9iamVjdFxuICAgKi9cbiAgYXN5bmMgbG9naW4ocmVxLCByZXMpIHtcbiAgICBpZiAoIXJlcS5ib2R5LmVtYWlsIHx8ICFyZXEuYm9keS5wYXNzd29yZCkge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgIGVycm9yOiAnU29tZSB2YWx1ZXMgYXJlIG1pc3NpbmcnLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICghdXNlckF1dGhIZWxwZXIuaXNXaGl0ZVNwYWNlKHJlcS5ib2R5LmVtYWlsLCByZXEuYm9keS5wYXNzd29yZCkpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBlcnJvcjogJ1doaXRlIFNwYWNlIGFyZSBub3QgYWxsb3dlZCBpbiBpbnB1dCBmaWVsZHMnLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICghdXNlckF1dGhIZWxwZXIuaXNWYWxpZEVtYWlsKHJlcS5ib2R5LmVtYWlsKSkge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgIGVycm9yOiAnUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWwgYWRkcmVzcycsXG4gICAgICB9KTtcbiAgICB9XG4gICAgY29uc3QgdGV4dCA9ICdTRUxFQ1QgKiBGUk9NIHVzZXJzIFdIRVJFIGVtYWlsID0gJDEnO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IHJvd3MgfSA9IGF3YWl0IGRiLnF1ZXJ5KHRleHQsIFtyZXEuYm9keS5lbWFpbF0pO1xuICAgICAgaWYgKCFyb3dzWzBdKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgICAgZXJyb3I6ICdUaGUgY3JlZGVudGlhbHMgeW91IHByb3ZpZGVkIGlzIGluY29ycmVjdCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKCF1c2VyQXV0aEhlbHBlci5jb21wYXJlUGFzc3dvcmQocm93c1swXS5wYXNzd29yZCwgcmVxLmJvZHkucGFzc3dvcmQpKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgICAgZXJyb3I6ICdwYXNzd29yZCBpcyBpbmNvcnJlY3QnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHVzZXJUb2tlbiA9IHtcbiAgICAgICAgaWQ6IHJvd3NbMF0uaWQsIGlzQWRtaW46IHJvd3NbMF0uaXNhZG1pbiwgdXNlck5hbWU6IHJvd3NbMF0uZmlyc3RuYW1lLCBsYXN0TmFtZTogcm93c1swXS5sYXN0bmFtZSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHRva2VuID0gdXNlckF1dGhIZWxwZXIuZ2VuZXJhdGVUb2tlbih1c2VyVG9rZW4pO1xuXG4gICAgICAvLyBjb25zb2xlLmxvZyh0b2tlbik7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDEpLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IDIwMSxcbiAgICAgICAgZGF0YTogW3tcbiAgICAgICAgICB0b2tlbixcbiAgICAgICAgICB1c2VyOiByb3dzWzBdLFxuICAgICAgICB9XSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhlcnJvcilcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogNDA0LFxuICAgICAgICBlcnJvcixcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgLyoqXG4gICAqIHNpZ25vdXRcbiAgICogQHBhcmFtIHtvYmplY3R9IHJlcVxuICAgKiBAcGFyYW0ge29iamVjdH0gcmVzXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IHVzZXIgb2JqZWN0XG4gICAqL1xuICBhc3luYyBzaWdub3V0KHJlcSwgcmVzKSB7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEdldCBhbGxcbiAgICovXG4gIGFzeW5jIGdldEFsbFVzZXJzKHJlcSwgcmVzKSB7XG4gICAgY29uc3QgZmluZEFsbFF1ZXJ5ID0gJ1NFTEVDVCAqIEZST00gdXNlcnMnO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IHJvd3MsIHJvd0NvdW50IH0gPSBhd2FpdCBkYi5xdWVyeShmaW5kQWxsUXVlcnkpO1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHtcbiAgICAgICAgc3RhdHVzOiAyMDAsXG4gICAgICAgIGRhdGE6IHJvd3MsXG4gICAgICAgIHJvd0NvdW50LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGVycm9yKVxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKGVycm9yKTtcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGdldEFVc2VyKHJlcSwgcmVzKSB7XG4gICAgY29uc3QgeyBpZCB9ID0gcmVxLnBhcmFtcztcbiAgICBpZiAoIXVzZXJBdXRoSGVscGVyLmlzVVVJRChpZCkpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBlcnJvcjogJ1RoZSB1c2VyIElEIGlzIGludmFsaWQnLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IHRleHQgPSAnU0VMRUNUICogRlJPTSB1c2VycyBXSEVSRSBpZCA9ICQxJztcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyByb3dzIH0gPSBhd2FpdCBkYi5xdWVyeSh0ZXh0LCBbaWRdKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHBhcnR5X2lkKTtcbiAgICAgIGlmICghcm93c1swXSkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLnNlbmQoeyBlcnJvcjogJ1VzZXIgbm90IGZvdW5kJyB9KTtcbiAgICAgIH1cbiAgICAgIC8vIGlmKHJlcS5ib2R5LnBhcmFtcyAhPT0gcm93c1swXS5pZCl7XG4gICAgICAvLyAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuc2VuZCh7XCJlcnJvclwiOiBcIllvdXIgaWQgaXMgd3JvbmdcIn0pO1xuICAgICAgLy8gfVxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHtcbiAgICAgICAgc3RhdHVzOiAyMDEsXG4gICAgICAgIGRhdGE6IFt7XG4gICAgICAgICAgb3JkZXI6IHJvd3NbMF0sXG4gICAgICAgIH1dLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZChlcnJvcik7XG4gICAgfVxuICB9LFxufTtcbmV4cG9ydCBkZWZhdWx0IFVzZXI7XG4iXX0=