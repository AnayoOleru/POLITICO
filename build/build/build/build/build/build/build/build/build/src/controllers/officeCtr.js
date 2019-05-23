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

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(res) {
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
                return _context2.abrupt('return', res.status(200).send({
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

      function getAllOffices(_x3) {
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

      function getOneOffice(_x4, _x5) {
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

      function officeResult(_x6, _x7) {
        return _ref7.apply(this, arguments);
      }

      return officeResult;
    }()
  }]);
  return Office;
}();

exports.default = Office;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy9vZmZpY2VDdHIuanMiXSwibmFtZXMiOlsiT2ZmaWNlIiwicmVxIiwicmVzIiwibmFtZSIsInN0YXR1cyIsImVycm9yIiwidHlwZSIsInVzZXJBdXRoSGVscGVyIiwiY2hlY2siLCJyZXN1bHQiLCJkYiIsImNyZWF0ZVF1ZXJ5IiwidmFsdWVzIiwicm93cyIsImRhdGEiLCJtZXNzYWdlIiwib3JkZXIiLCJmaW5kQWxsUXVlcnkiLCJyb3dDb3VudCIsInRleHQiLCJvZmZpY2VpZCIsInRleHQyIiwicm93IiwicG9sbFJlc3VsdCIsImkiLCJvZmZpY2UiLCJjYW5kaWRhdGUiLCJOdW1iZXIiLCJyZXNwb25zZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUEsVUFBQSxRQUFBLFFBQUEsQ0FBQTs7OztBQUNBLElBQUEsS0FBQSxRQUFBLFNBQUEsQ0FBQTs7OztBQUNBLElBQUEsYUFBQSxRQUFBLDRCQUFBLENBQUE7Ozs7QUFDQSxJQUFBLFlBQUEsUUFBQSxvQkFBQSxDQUFBOzs7Ozs7OztBQUNBO0FBQ0E7OztJQUdNQSxTOzs7Ozs7OztBQStMSjsyQkFDTUssSyxFQUFPSCxHLEVBQUs7QUFDaEIsYUFBTyxJQUFBLE1BQUEsQ0FBQSxHQUFBLEVBQUEsSUFBQSxDQUFxQjtBQUMxQkUsZ0JBRDBCLEdBQUE7QUFFMUJDLGVBQUFBO0FBRjBCLE9BQXJCLENBQVA7QUFJRDs7OztBQXBNRDs7Ozs7Ozs7MkdBUW9CSixHLEVBQUtDLEc7Ozs7Ozs7c0JBQ25CLENBQUNELElBQUFBLElBQUFBLENBQUQsSUFBQSxJQUFrQixDQUFDQSxJQUFBQSxJQUFBQSxDQUFTRSxJOzs7OztpREFDdkIsSUFBQSxNQUFBLENBQUEsR0FBQSxFQUFBLElBQUEsQ0FBcUI7QUFDMUJDLDBCQUQwQixHQUFBO0FBRTFCQyx5QkFBTztBQUZtQixpQkFBckIsQzs7O29CQU1KSixJQUFBQSxJQUFBQSxDQUFTSyxJOzs7Oztp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QSxvRkFBQUE7O3VCQUNZWCxZQUFBQSxPQUFBQSxDQUFBQSxLQUFBQSxDQUFBQSxLQUFBQSxFQUFnQixDQUFoQkEsUUFBZ0IsQ0FBaEJBLEM7OztBQUFaWSxzQixVQUFBQSxJQUFBQTtBQUNBQyw2QkFBQUEsRUFBQUE7O0FBQ04scUJBQUEsSUFBQSxDQUFBLEVBQWdCQyxJQUFJRixJQUFBQSxJQUFBQSxDQUFwQixNQUFBLEVBQXFDRSxLQUFyQyxDQUFBLEVBQTZDO0FBQUEsaUNBQ3RCO0FBQ25CQyw0QkFEbUIsUUFBQTtBQUVuQkMsK0JBQVdKLElBQUFBLElBQUFBLENBQUFBLENBQUFBLEVBRlEsU0FBQTtBQUduQmIsNEJBQVFrQixPQUFPTCxJQUFBQSxJQUFBQSxDQUFBQSxDQUFBQSxFQUFQSyxLQUFBQTtBQUhXLG1CQURzQjs7QUFPM0NKLDZCQUFBQSxJQUFBQSxDQUFBQSxZQUFBQTtBQUNEO0FBQ0tLLDJCQUFXO0FBQ2Z4QiwwQkFEZSxHQUFBO0FBRWZVLHdCQUFNUztBQUZTLGlCQUFYSztBQUlOOztrREFDTzFCLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLEVBQUFBLElBQUFBLENBQUFBLFFBQUFBLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQVdJRixNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHV1aWR2NCBmcm9tICd1dWlkL3Y0JztcbmltcG9ydCBkYiBmcm9tICcuL2RhdGFiYXNlVGFibGVzL2RiY29ubmVjdCc7XG5pbXBvcnQgdXNlckF1dGhIZWxwZXIgZnJvbSAnLi4vaGVscGVyL3VzZXJBdXRoJztcbi8vIGltcG9ydCBRdWVyeSBmcm9tICcuLi8uLi9oZWxwZXIvcXVlcnknXG4vLyBpbXBvcnQgUGFydHlNb2RlbCBmcm9tICcuLi9tb2RlbHMvcGFydHknO1xuXG5cbmNsYXNzIE9mZmljZSB7XG4gIC8qKlxuICAgKiBDcmVhdGUgb2ZmaWNlKGFkbWluKVxuICAgKiBAcGFyYW0ge1ZhbHVlc30gcmVxIC0gcmVxdWVzdCB2YWx1ZXMgaW50byBrZXlzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXMgLSByZXF1ZXN0IG9iamVjdFxuICAgKiBAcmV0dXJucyB7YXJyYXl9IC0gcmV0dXJucyBhbGwga2V5IHZhbHVlIHBhaXJzIGFzIG9iamVjdCBpbiBhcnJheVxuICAgKi9cblxuXG4gIHN0YXRpYyBhc3luYyBjcmVhdGUocmVxLCByZXMpIHtcbiAgICBpZiAoIXJlcS5ib2R5LnR5cGUgJiYgIXJlcS5ib2R5Lm5hbWUpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBlcnJvcjogXCJJbnB1dHMgZmllbGRzIGNhbid0IGJlIGxlZnQgZW1wdHlcIixcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghcmVxLmJvZHkudHlwZSkge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgIGVycm9yOiAnVHlwZSBmaWVsZCBpcyBlbXB0eScsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXJlcS5ib2R5Lm5hbWUpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBlcnJvcjogJ05hbWUgZmllbGQgaXMgZW1wdHknLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCF1c2VyQXV0aEhlbHBlci5pc05hbWUocmVxLmJvZHkubmFtZSwgcmVxLmJvZHkudHlwZSkpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBlcnJvcjogJ0FscGhhYmV0cyBvbmx5JyxcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBpZiAoIXVzZXJBdXRoSGVscGVyLmlzSGlnaGVyKHJlcS5ib2R5Lm5hbWUsIHJlcS5ib2R5LnR5cGUpKSB7XG4gICAgLy8gICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgIC8vICAgICBcInN0YXR1c1wiOiA0MDAsXG4gICAgLy8gICAgIFwiZXJyb3JcIjogXCJBbHBoYWJldHMgb25seVwiXG4gICAgLy8gICB9KVxuICAgIC8vICAgICB9O1xuXG4gICAgY29uc3QgY2hlY2sgPSAnU0VMRUNUICogRlJPTSBvZmZpY2UgV0hFUkUgbmFtZT0kMSc7XG4gICAgY29uc3QgeyBuYW1lIH0gPSByZXEuYm9keTtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBkYi5xdWVyeShjaGVjaywgW25hbWVdKTtcbiAgICBpZiAocmVzdWx0LnJvd0NvdW50ICE9PSAwKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgZXJyb3I6ICdPZmZpY2UgYWxyZWFkeSBleGlzdCcsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBjcmVhdGVRdWVyeSA9IGBJTlNFUlQgSU5UT1xuICAgICAgb2ZmaWNlKGlkLCBuYW1lLCB0eXBlLCBjcmVhdGVkX2RhdGUpXG4gICAgICBWQUxVRVMoJDEsICQyLCAkMywgJDQpXG4gICAgICByZXR1cm5pbmcgKmA7XG4gICAgY29uc3QgdmFsdWVzID0gW1xuICAgICAgdXVpZHY0KCksXG4gICAgICByZXEuYm9keS5uYW1lLFxuICAgICAgcmVxLmJvZHkudHlwZSxcbiAgICAgIG1vbWVudChuZXcgRGF0ZSgpKSxcbiAgICBdO1xuICAgIHRyeSB7XG4gICAgICAvLyBjb25zdCByZXN1bHQgPSBhd2FpdCBkYi5xdWVyeShxdWVyeSk7XG4gICAgICAvLyBpZiAocmVzdWx0LnJvdyAhPT0gMCkge1xuICAgICAgLy8gICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe1xuICAgICAgLy8gICAgIHN0YXR1czogNDAwLFxuICAgICAgLy8gICAgIGVycm9yOiAnQW4gb2ZmaWNlIHdpdGggdGhpcyBuYW1lIGFscmVhZHkgZXhpc3QnLFxuICAgICAgLy8gICB9KTtcbiAgICAgIC8vIH1cbiAgICAgIGNvbnN0IHsgcm93cyB9ID0gYXdhaXQgZGIucXVlcnkoY3JlYXRlUXVlcnksIHZhbHVlcyk7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDEpLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IDIwMSxcbiAgICAgICAgZGF0YTogW3tcbiAgICAgICAgICBtZXNzYWdlOiAnb2ZmaWNlIGNyZWF0ZWQnLFxuICAgICAgICAgIG9yZGVyOiByb3dzWzBdLFxuICAgICAgICB9XSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgZGF0YTogJ1RoZXJlIHdhcyBhbiBlcnJvciwgcGxlYXNlIHRyeSBhZ2Fpbi4nLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogZ2V0IGFsbCBwb2xpdGljYWwgb2ZmaWNlcyh1c2VycylcbiAgICogQHBhcmFtIHt1dWlkfSBpZFxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVzIC0gcmVxdWVzdCBvYmplY3RcbiAgICogQHJldHVybnMge2FycmF5fSAtIHJldHVybnMgYWxsIGtleSB2YWx1ZSBwYWlycyBhcyBvYmplY3QgaW4gYXJyYXlcbiAgICovXG4gIHN0YXRpYyBhc3luYyBnZXRBbGxPZmZpY2VzKHJlcykge1xuICAgIGNvbnN0IGZpbmRBbGxRdWVyeSA9ICdTRUxFQ1QgKiBGUk9NIG9mZmljZSc7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgcm93cywgcm93Q291bnQgfSA9IGF3YWl0IGRiLnF1ZXJ5KGZpbmRBbGxRdWVyeSk7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IDIwMCxcbiAgICAgICAgZGF0YTogcm93cyxcbiAgICAgICAgcm93Q291bnQsXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgIGVycm9yOiAnQmFkIFJlcXVlc3QnLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAgKiBVc2VyIGZldGNoIHNwZWNpZmljIG9mZmljZVxuICAgKiBAcGFyYW0ge3V1aWR9IGlkXG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXMgLSByZXF1ZXN0IG9iamVjdFxuICAgKiBAcmV0dXJucyB7YXJyYXl9IC0gcmV0dXJucyBzcGVjaWZpYyBwYXJ0eVxuICAgKi9cbiAgc3RhdGljIGFzeW5jIGdldE9uZU9mZmljZShyZXEsIHJlcykge1xuICAgIGNvbnN0IHRleHQgPSAnU0VMRUNUICogRlJPTSBvZmZpY2UgV0hFUkUgaWQgPSAkMSc7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgcm93cyB9ID0gYXdhaXQgZGIucXVlcnkodGV4dCwgW3JlcS5wYXJhbXMuaWRdKTtcbiAgICAgIGlmICghcm93c1swXSkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLnNlbmQoe1xuICAgICAgICAgIHN0YXR1czogNDA0LFxuICAgICAgICAgIGVycm9yOiAnT2ZmaWNlIG5vdCBmb3VuZCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKCF1c2VyQXV0aEhlbHBlci5pc1VVSUQocmVxLnBhcmFtcykpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgICBlcnJvcjogJ1RoZSB1c2VyIElEIHVzZWQgaXMgaW52YWxpZCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHtcbiAgICAgICAgc3RhdHVzOiAyMDAsXG4gICAgICAgIGRhdGE6IHJvd3NbMF0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgIGVycm9yOiAnQmFkIHJlcXVlc3QuIENoZWNrIGFuZCB0cnkgYWdhaW4nLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gcmVxdWVzdFxuICAgKiBAcGFyYW0geyp9IHJlc3BvbnNlXG4gICAqIEByZXR1cm4gcHJvbWlzZTtcbiAgICovXG4gIHN0YXRpYyBhc3luYyBvZmZpY2VSZXN1bHQocmVxLCByZXMpIHtcbiAgICBjb25zdCB7IG9mZmljZWlkIH0gPSByZXEucGFyYW1zO1xuXG4gICAgaWYgKCF1c2VyQXV0aEhlbHBlci5pc1VVSUQob2ZmaWNlaWQpKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgZXJyb3I6ICdUaGUgdXNlciBJRCB1c2VkIGlzIGludmFsaWQnLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IHRleHQgPSAnU0VMRUNUICogRlJPTSBvZmZpY2UgV0hFUkUgaWQgPSAkMSc7XG4gICAgY29uc3QgeyByb3dzIH0gPSBhd2FpdCBkYi5xdWVyeSh0ZXh0LCBbb2ZmaWNlaWRdKTtcblxuICAgIGlmICghcm93c1swXSkge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5zZW5kKHtcbiAgICAgICAgc3RhdHVzOiA0MDQsXG4gICAgICAgIGVycm9yOiAnT2ZmaWNlIG5vdCBmb3VuZCcsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCB0ZXh0MiA9ICdTRUxFQ1QgY2FuZGlkYXRlLCBDT1VOVChjYW5kaWRhdGUpIEZST00gdm90ZXMgV0hFUkUgb2ZmaWNlID0gJDEgR1JPVVAgQlkgY2FuZGlkYXRlJztcbiAgICBjb25zdCByb3cgPSBhd2FpdCBkYi5xdWVyeSh0ZXh0MiwgW29mZmljZWlkXSk7XG4gICAgY29uc3QgcG9sbFJlc3VsdCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93LnJvd3MubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IHNpbmdsZVJlc3VsdCA9IHtcbiAgICAgICAgb2ZmaWNlOiBvZmZpY2VpZCxcbiAgICAgICAgY2FuZGlkYXRlOiByb3cucm93c1tpXS5jYW5kaWRhdGUsXG4gICAgICAgIHJlc3VsdDogTnVtYmVyKHJvdy5yb3dzW2ldLmNvdW50KSxcbiAgICAgIH07XG5cbiAgICAgIHBvbGxSZXN1bHQucHVzaChzaW5nbGVSZXN1bHQpO1xuICAgIH1cbiAgICBjb25zdCByZXNwb25zZSA9IHtcbiAgICAgIHN0YXR1czogMjAwLFxuICAgICAgZGF0YTogcG9sbFJlc3VsdCxcbiAgICB9O1xuICAgIC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLnNlbmQocmVzcG9uc2UpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcbiAgY2F0Y2goZXJyb3IsIHJlcykge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuc2VuZCh7XG4gICAgICBzdGF0dXM6IDUwMCxcbiAgICAgIGVycm9yLFxuICAgIH0pO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBPZmZpY2U7XG4iXX0=