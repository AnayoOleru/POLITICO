'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _dbconnect = require('./databaseTables/dbconnect');

var _dbconnect2 = _interopRequireDefault(_dbconnect);

var _userAuth = require('../helper/userAuth');

var _userAuth2 = _interopRequireDefault(_userAuth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Query from '../../helper/query'
// import PartyModel from '../models/party';


var Office = function () {
  function Office() {
    (0, _classCallCheck3.default)(this, Office);
  }

  (0, _createClass3.default)(Office, [{
    key: 'catch',


    // eslint-disable-next-line class-methods-use-this
    value: function _catch(error, res) {
      return res.status(500).send({
        status: 500,
        error: error
      });
    }
  }], [{
    key: 'create',

    /**
     * Create office(admin)
     * @param {Values} req - request values into keys
     * @param {Object} res - request object
     * @returns {array} - returns all key value pairs as object in array
     */

    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var check, name, result, createQuery, values, _ref2, rows;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(!req.body.type && !req.body.name)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return', res.status(400).send({
                  status: 400,
                  error: "Inputs fields can't be left empty"
                }));

              case 2:
                if (req.body.type) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt('return', res.status(400).send({
                  status: 400,
                  error: 'Type field is empty'
                }));

              case 4:
                if (req.body.name) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt('return', res.status(400).send({
                  status: 400,
                  error: 'Name field is empty'
                }));

              case 6:
                if (_userAuth2.default.isName(req.body.name, req.body.type)) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt('return', res.status(400).send({
                  status: 400,
                  error: 'Alphabets only'
                }));

              case 8:
                // if (!userAuthHelper.isHigher(req.body.name, req.body.type)) {
                //   return res.status(400).send({
                //     "status": 400,
                //     "error": "Alphabets only"
                //   })
                //     };

                check = 'SELECT * FROM office WHERE name=$1';
                name = req.body.name;
                _context.next = 12;
                return _dbconnect2.default.query(check, [name]);

              case 12:
                result = _context.sent;

                if (!(result.rowCount !== 0)) {
                  _context.next = 15;
                  break;
                }

                return _context.abrupt('return', res.status(400).send({
                  status: 400,
                  error: 'Office already exist'
                }));

              case 15:
                createQuery = 'INSERT INTO\n      office(id, name, type, created_date)\n      VALUES($1, $2, $3, $4)\n      returning *';
                values = [(0, _v2.default)(), req.body.name, req.body.type, (0, _moment2.default)(new Date())];
                _context.prev = 17;
                _context.next = 20;
                return _dbconnect2.default.query(createQuery, values);

              case 20:
                _ref2 = _context.sent;
                rows = _ref2.rows;
                return _context.abrupt('return', res.status(201).send({
                  status: 201,
                  data: [{
                    message: 'office created',
                    order: rows[0]
                  }]
                }));

              case 25:
                _context.prev = 25;
                _context.t0 = _context['catch'](17);
                return _context.abrupt('return', res.status(500).send({
                  status: 400,
                  data: 'There was an error, please try again.'
                }));

              case 28:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[17, 25]]);
      }));

      function create(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return create;
    }()

    /**
     * get all political offices(users)
     * @param {uuid} id
     * @param {Object} res - request object
     * @returns {array} - returns all key value pairs as object in array
     */

  }, {
    key: 'getAllOffices',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
        var findAllQuery, _ref4, rows, rowCount;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                findAllQuery = 'SELECT * FROM office';
                _context2.prev = 1;
                _context2.next = 4;
                return _dbconnect2.default.query(findAllQuery);

              case 4:
                _ref4 = _context2.sent;
                rows = _ref4.rows;
                rowCount = _ref4.rowCount;
                return _context2.abrupt('return', res.status(200).json({
                  status: 200,
                  data: rows,
                  rowCount: rowCount
                }));

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2['catch'](1);
                return _context2.abrupt('return', res.status(400).send({
                  status: 400,
                  error: 'Bad Request'
                }));

              case 13:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 10]]);
      }));

      function getAllOffices(_x3, _x4) {
        return _ref3.apply(this, arguments);
      }

      return getAllOffices;
    }()

    /**
      * User fetch specific office
     * @param {uuid} id
     * @param {Object} res - request object
     * @returns {array} - returns specific party
     */

  }, {
    key: 'getOneOffice',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
        var text, _ref6, rows;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                text = 'SELECT * FROM office WHERE id = $1';
                _context3.prev = 1;
                _context3.next = 4;
                return _dbconnect2.default.query(text, [req.params.id]);

              case 4:
                _ref6 = _context3.sent;
                rows = _ref6.rows;

                if (rows[0]) {
                  _context3.next = 8;
                  break;
                }

                return _context3.abrupt('return', res.status(404).send({
                  status: 404,
                  error: 'Office not found'
                }));

              case 8:
                if (_userAuth2.default.isUUID(req.params)) {
                  _context3.next = 10;
                  break;
                }

                return _context3.abrupt('return', res.status(400).send({
                  status: 400,
                  error: 'The user ID used is invalid'
                }));

              case 10:
                return _context3.abrupt('return', res.status(200).send({
                  status: 200,
                  data: rows[0]
                }));

              case 13:
                _context3.prev = 13;
                _context3.t0 = _context3['catch'](1);
                return _context3.abrupt('return', res.status(400).send({
                  status: 400,
                  error: 'Bad request. Check and try again'
                }));

              case 16:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 13]]);
      }));

      function getOneOffice(_x5, _x6) {
        return _ref5.apply(this, arguments);
      }

      return getOneOffice;
    }()

    /**
     *
     * @param {*} request
     * @param {*} response
     * @return promise;
     */

  }, {
    key: 'officeResult',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
        var officeid, text, _ref8, rows, text2, row, pollResult, i, singleResult, response;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                officeid = req.params.officeid;

                if (_userAuth2.default.isUUID(officeid)) {
                  _context4.next = 3;
                  break;
                }

                return _context4.abrupt('return', res.status(400).send({
                  status: 400,
                  error: 'The user ID used is invalid'
                }));

              case 3:
                text = 'SELECT * FROM office WHERE id = $1';
                _context4.next = 6;
                return _dbconnect2.default.query(text, [officeid]);

              case 6:
                _ref8 = _context4.sent;
                rows = _ref8.rows;

                if (rows[0]) {
                  _context4.next = 10;
                  break;
                }

                return _context4.abrupt('return', res.status(404).send({
                  status: 404,
                  error: 'Office not found'
                }));

              case 10:
                text2 = 'SELECT candidate, COUNT(candidate) FROM votes WHERE office = $1 GROUP BY candidate';
                _context4.next = 13;
                return _dbconnect2.default.query(text2, [officeid]);

              case 13:
                row = _context4.sent;
                pollResult = [];

                for (i = 0; i < row.rows.length; i += 1) {
                  singleResult = {
                    office: officeid,
                    candidate: row.rows[i].candidate,
                    result: Number(row.rows[i].count)
                  };


                  pollResult.push(singleResult);
                }
                response = {
                  status: 200,
                  data: pollResult
                };
                // console.log(response);

                return _context4.abrupt('return', res.status(200).send(response));

              case 18:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function officeResult(_x7, _x8) {
        return _ref7.apply(this, arguments);
      }

      return officeResult;
    }()
  }]);
  return Office;
}();

exports.default = Office;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy9vZmZpY2VDdHIuanMiXSwibmFtZXMiOlsiT2ZmaWNlIiwiZXJyb3IiLCJyZXMiLCJzdGF0dXMiLCJzZW5kIiwicmVxIiwiYm9keSIsInR5cGUiLCJuYW1lIiwidXNlckF1dGhIZWxwZXIiLCJpc05hbWUiLCJjaGVjayIsImRiIiwicXVlcnkiLCJyZXN1bHQiLCJyb3dDb3VudCIsImNyZWF0ZVF1ZXJ5IiwidmFsdWVzIiwiRGF0ZSIsInJvd3MiLCJkYXRhIiwibWVzc2FnZSIsIm9yZGVyIiwiZmluZEFsbFF1ZXJ5IiwianNvbiIsInRleHQiLCJwYXJhbXMiLCJpZCIsImlzVVVJRCIsIm9mZmljZWlkIiwidGV4dDIiLCJyb3ciLCJwb2xsUmVzdWx0IiwiaSIsImxlbmd0aCIsInNpbmdsZVJlc3VsdCIsIm9mZmljZSIsImNhbmRpZGF0ZSIsIk51bWJlciIsImNvdW50IiwicHVzaCIsInJlc3BvbnNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUNBO0FBQ0E7OztJQUdNQSxNOzs7Ozs7Ozs7QUFnTUo7MkJBQ01DLEssRUFBT0MsRyxFQUFLO0FBQ2hCLGFBQU9BLElBQUlDLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUMxQkQsZ0JBQVEsR0FEa0I7QUFFMUJGO0FBRjBCLE9BQXJCLENBQVA7QUFJRDs7OztBQXJNRDs7Ozs7Ozs7MkdBUW9CSSxHLEVBQUtILEc7Ozs7Ozs7c0JBQ25CLENBQUNHLElBQUlDLElBQUosQ0FBU0MsSUFBVixJQUFrQixDQUFDRixJQUFJQyxJQUFKLENBQVNFLEk7Ozs7O2lEQUN2Qk4sSUFBSUMsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQzFCRCwwQkFBUSxHQURrQjtBQUUxQkYseUJBQU87QUFGbUIsaUJBQXJCLEM7OztvQkFNSkksSUFBSUMsSUFBSixDQUFTQyxJ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RixJQUFJWixJQUFKLENBQVNlLE1BQTdCLEVBQXFDRCxLQUFLLENBQTFDLEVBQTZDO0FBQ3JDRSw4QkFEcUMsR0FDdEI7QUFDbkJDLDRCQUFRUCxRQURXO0FBRW5CUSwrQkFBV04sSUFBSVosSUFBSixDQUFTYyxDQUFULEVBQVlJLFNBRko7QUFHbkJ2Qiw0QkFBUXdCLE9BQU9QLElBQUlaLElBQUosQ0FBU2MsQ0FBVCxFQUFZTSxLQUFuQjtBQUhXLG1CQURzQjs7O0FBTzNDUCw2QkFBV1EsSUFBWCxDQUFnQkwsWUFBaEI7QUFDRDtBQUNLTSx3QixHQUFXO0FBQ2Z0QywwQkFBUSxHQURPO0FBRWZpQix3QkFBTVk7QUFGUyxpQjtBQUlqQjs7a0RBQ085QixJQUFJQyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUJxQyxRQUFyQixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkFXSXpDLE0iLCJmaWxlIjoib2ZmaWNlQ3RyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHV1aWR2NCBmcm9tICd1dWlkL3Y0JztcbmltcG9ydCBkYiBmcm9tICcuL2RhdGFiYXNlVGFibGVzL2RiY29ubmVjdCc7XG5pbXBvcnQgdXNlckF1dGhIZWxwZXIgZnJvbSAnLi4vaGVscGVyL3VzZXJBdXRoJztcbi8vIGltcG9ydCBRdWVyeSBmcm9tICcuLi8uLi9oZWxwZXIvcXVlcnknXG4vLyBpbXBvcnQgUGFydHlNb2RlbCBmcm9tICcuLi9tb2RlbHMvcGFydHknO1xuXG5cbmNsYXNzIE9mZmljZSB7XG4gIC8qKlxuICAgKiBDcmVhdGUgb2ZmaWNlKGFkbWluKVxuICAgKiBAcGFyYW0ge1ZhbHVlc30gcmVxIC0gcmVxdWVzdCB2YWx1ZXMgaW50byBrZXlzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXMgLSByZXF1ZXN0IG9iamVjdFxuICAgKiBAcmV0dXJucyB7YXJyYXl9IC0gcmV0dXJucyBhbGwga2V5IHZhbHVlIHBhaXJzIGFzIG9iamVjdCBpbiBhcnJheVxuICAgKi9cblxuXG4gIHN0YXRpYyBhc3luYyBjcmVhdGUocmVxLCByZXMpIHtcbiAgICBpZiAoIXJlcS5ib2R5LnR5cGUgJiYgIXJlcS5ib2R5Lm5hbWUpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBlcnJvcjogXCJJbnB1dHMgZmllbGRzIGNhbid0IGJlIGxlZnQgZW1wdHlcIixcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghcmVxLmJvZHkudHlwZSkge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgIGVycm9yOiAnVHlwZSBmaWVsZCBpcyBlbXB0eScsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXJlcS5ib2R5Lm5hbWUpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBlcnJvcjogJ05hbWUgZmllbGQgaXMgZW1wdHknLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCF1c2VyQXV0aEhlbHBlci5pc05hbWUocmVxLmJvZHkubmFtZSwgcmVxLmJvZHkudHlwZSkpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBlcnJvcjogJ0FscGhhYmV0cyBvbmx5JyxcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBpZiAoIXVzZXJBdXRoSGVscGVyLmlzSGlnaGVyKHJlcS5ib2R5Lm5hbWUsIHJlcS5ib2R5LnR5cGUpKSB7XG4gICAgLy8gICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgIC8vICAgICBcInN0YXR1c1wiOiA0MDAsXG4gICAgLy8gICAgIFwiZXJyb3JcIjogXCJBbHBoYWJldHMgb25seVwiXG4gICAgLy8gICB9KVxuICAgIC8vICAgICB9O1xuXG4gICAgY29uc3QgY2hlY2sgPSAnU0VMRUNUICogRlJPTSBvZmZpY2UgV0hFUkUgbmFtZT0kMSc7XG4gICAgY29uc3QgeyBuYW1lIH0gPSByZXEuYm9keTtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBkYi5xdWVyeShjaGVjaywgW25hbWVdKTtcbiAgICBpZiAocmVzdWx0LnJvd0NvdW50ICE9PSAwKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgZXJyb3I6ICdPZmZpY2UgYWxyZWFkeSBleGlzdCcsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBjcmVhdGVRdWVyeSA9IGBJTlNFUlQgSU5UT1xuICAgICAgb2ZmaWNlKGlkLCBuYW1lLCB0eXBlLCBjcmVhdGVkX2RhdGUpXG4gICAgICBWQUxVRVMoJDEsICQyLCAkMywgJDQpXG4gICAgICByZXR1cm5pbmcgKmA7XG4gICAgY29uc3QgdmFsdWVzID0gW1xuICAgICAgdXVpZHY0KCksXG4gICAgICByZXEuYm9keS5uYW1lLFxuICAgICAgcmVxLmJvZHkudHlwZSxcbiAgICAgIG1vbWVudChuZXcgRGF0ZSgpKSxcbiAgICBdO1xuICAgIHRyeSB7XG4gICAgICAvLyBjb25zdCByZXN1bHQgPSBhd2FpdCBkYi5xdWVyeShxdWVyeSk7XG4gICAgICAvLyBpZiAocmVzdWx0LnJvdyAhPT0gMCkge1xuICAgICAgLy8gICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe1xuICAgICAgLy8gICAgIHN0YXR1czogNDAwLFxuICAgICAgLy8gICAgIGVycm9yOiAnQW4gb2ZmaWNlIHdpdGggdGhpcyBuYW1lIGFscmVhZHkgZXhpc3QnLFxuICAgICAgLy8gICB9KTtcbiAgICAgIC8vIH1cbiAgICAgIGNvbnN0IHsgcm93cyB9ID0gYXdhaXQgZGIucXVlcnkoY3JlYXRlUXVlcnksIHZhbHVlcyk7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDEpLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IDIwMSxcbiAgICAgICAgZGF0YTogW3tcbiAgICAgICAgICBtZXNzYWdlOiAnb2ZmaWNlIGNyZWF0ZWQnLFxuICAgICAgICAgIG9yZGVyOiByb3dzWzBdLFxuICAgICAgICB9XSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgZGF0YTogJ1RoZXJlIHdhcyBhbiBlcnJvciwgcGxlYXNlIHRyeSBhZ2Fpbi4nLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogZ2V0IGFsbCBwb2xpdGljYWwgb2ZmaWNlcyh1c2VycylcbiAgICogQHBhcmFtIHt1dWlkfSBpZFxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVzIC0gcmVxdWVzdCBvYmplY3RcbiAgICogQHJldHVybnMge2FycmF5fSAtIHJldHVybnMgYWxsIGtleSB2YWx1ZSBwYWlycyBhcyBvYmplY3QgaW4gYXJyYXlcbiAgICovXG4gIHN0YXRpYyBhc3luYyBnZXRBbGxPZmZpY2VzKHJlcSwgcmVzKSB7XG4gICAgY29uc3QgZmluZEFsbFF1ZXJ5ID0gJ1NFTEVDVCAqIEZST00gb2ZmaWNlJztcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyByb3dzLCByb3dDb3VudCB9ID0gYXdhaXQgZGIucXVlcnkoZmluZEFsbFF1ZXJ5KTtcbiAgICAgIC8vIHJldHVybiByb3dzO1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgc3RhdHVzOiAyMDAsXG4gICAgICAgIGRhdGE6IHJvd3MsXG4gICAgICAgIHJvd0NvdW50LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBlcnJvcjogJ0JhZCBSZXF1ZXN0JyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgICogVXNlciBmZXRjaCBzcGVjaWZpYyBvZmZpY2VcbiAgICogQHBhcmFtIHt1dWlkfSBpZFxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVzIC0gcmVxdWVzdCBvYmplY3RcbiAgICogQHJldHVybnMge2FycmF5fSAtIHJldHVybnMgc3BlY2lmaWMgcGFydHlcbiAgICovXG4gIHN0YXRpYyBhc3luYyBnZXRPbmVPZmZpY2UocmVxLCByZXMpIHtcbiAgICBjb25zdCB0ZXh0ID0gJ1NFTEVDVCAqIEZST00gb2ZmaWNlIFdIRVJFIGlkID0gJDEnO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IHJvd3MgfSA9IGF3YWl0IGRiLnF1ZXJ5KHRleHQsIFtyZXEucGFyYW1zLmlkXSk7XG4gICAgICBpZiAoIXJvd3NbMF0pIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5zZW5kKHtcbiAgICAgICAgICBzdGF0dXM6IDQwNCxcbiAgICAgICAgICBlcnJvcjogJ09mZmljZSBub3QgZm91bmQnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmICghdXNlckF1dGhIZWxwZXIuaXNVVUlEKHJlcS5wYXJhbXMpKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgICAgZXJyb3I6ICdUaGUgdXNlciBJRCB1c2VkIGlzIGludmFsaWQnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogMjAwLFxuICAgICAgICBkYXRhOiByb3dzWzBdLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBlcnJvcjogJ0JhZCByZXF1ZXN0LiBDaGVjayBhbmQgdHJ5IGFnYWluJyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0geyp9IHJlcXVlc3RcbiAgICogQHBhcmFtIHsqfSByZXNwb25zZVxuICAgKiBAcmV0dXJuIHByb21pc2U7XG4gICAqL1xuICBzdGF0aWMgYXN5bmMgb2ZmaWNlUmVzdWx0KHJlcSwgcmVzKSB7XG4gICAgY29uc3QgeyBvZmZpY2VpZCB9ID0gcmVxLnBhcmFtcztcblxuICAgIGlmICghdXNlckF1dGhIZWxwZXIuaXNVVUlEKG9mZmljZWlkKSkge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgIGVycm9yOiAnVGhlIHVzZXIgSUQgdXNlZCBpcyBpbnZhbGlkJyxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCB0ZXh0ID0gJ1NFTEVDVCAqIEZST00gb2ZmaWNlIFdIRVJFIGlkID0gJDEnO1xuICAgIGNvbnN0IHsgcm93cyB9ID0gYXdhaXQgZGIucXVlcnkodGV4dCwgW29mZmljZWlkXSk7XG5cbiAgICBpZiAoIXJvd3NbMF0pIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogNDA0LFxuICAgICAgICBlcnJvcjogJ09mZmljZSBub3QgZm91bmQnLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgdGV4dDIgPSAnU0VMRUNUIGNhbmRpZGF0ZSwgQ09VTlQoY2FuZGlkYXRlKSBGUk9NIHZvdGVzIFdIRVJFIG9mZmljZSA9ICQxIEdST1VQIEJZIGNhbmRpZGF0ZSc7XG4gICAgY29uc3Qgcm93ID0gYXdhaXQgZGIucXVlcnkodGV4dDIsIFtvZmZpY2VpZF0pO1xuICAgIGNvbnN0IHBvbGxSZXN1bHQgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvdy5yb3dzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBzaW5nbGVSZXN1bHQgPSB7XG4gICAgICAgIG9mZmljZTogb2ZmaWNlaWQsXG4gICAgICAgIGNhbmRpZGF0ZTogcm93LnJvd3NbaV0uY2FuZGlkYXRlLFxuICAgICAgICByZXN1bHQ6IE51bWJlcihyb3cucm93c1tpXS5jb3VudCksXG4gICAgICB9O1xuXG4gICAgICBwb2xsUmVzdWx0LnB1c2goc2luZ2xlUmVzdWx0KTtcbiAgICB9XG4gICAgY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgICBzdGF0dXM6IDIwMCxcbiAgICAgIGRhdGE6IHBvbGxSZXN1bHQsXG4gICAgfTtcbiAgICAvLyBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHJlc3BvbnNlKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG4gIGNhdGNoKGVycm9yLCByZXMpIHtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLnNlbmQoe1xuICAgICAgc3RhdHVzOiA1MDAsXG4gICAgICBlcnJvcixcbiAgICB9KTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgT2ZmaWNlO1xuIl19