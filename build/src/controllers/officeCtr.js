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
                text2 = 'SELECT *, COUNT(candidate) FROM votes WHERE office = $1 GROUP BY id, created_on, created_by, officename, office, candidatename, username, candidate';
                _context4.next = 13;
                return _dbconnect2.default.query(text2, [officeid]);

              case 13:
                row = _context4.sent;

                console.log(row, '>>>>>>><<<<<<<<');
                pollResult = [];

                for (i = 0; i < row.rows.length; i += 1) {
                  singleResult = {
                    office: officeid,
                    candidate: row.rows[0].candidate,
                    username: row.rows[0].username,
                    candidatename: row.rows[0].candidatename,
                    officename: row.rows[0].officename,
                    result: Number(row.rows[i].count)
                  };

                  console.log(singleResult, '>>>>>>><<<<<<<<');

                  pollResult.push(singleResult);
                }
                response = {
                  status: 200,
                  data: pollResult
                };
                // console.log(response);

                return _context4.abrupt('return', res.status(200).send(response));

              case 19:
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
  }, {
    key: 'delete',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
        var deleteQuery, _ref10, rows;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                deleteQuery = 'DELETE FROM office WHERE id=$1 returning *';
                _context5.prev = 1;
                _context5.next = 4;
                return _dbconnect2.default.query(deleteQuery, [req.params.id]);

              case 4:
                _ref10 = _context5.sent;
                rows = _ref10.rows;

                if (rows[0]) {
                  _context5.next = 8;
                  break;
                }

                return _context5.abrupt('return', res.status(404).send({
                  error: 404,
                  message: 'office not found'
                }));

              case 8:
                return _context5.abrupt('return', res.status(410).send({
                  data: 'deleted'
                }));

              case 11:
                _context5.prev = 11;
                _context5.t0 = _context5['catch'](1);
                return _context5.abrupt('return', res.status(400).send({
                  error: 'Oops, something wrong happened. Check and try again'
                }));

              case 14:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[1, 11]]);
      }));

      function _delete(_x9, _x10) {
        return _ref9.apply(this, arguments);
      }

      return _delete;
    }()
  }]);
  return Office;
}();

exports.default = Office;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy9vZmZpY2VDdHIuanMiXSwibmFtZXMiOlsiT2ZmaWNlIiwiZXJyb3IiLCJyZXMiLCJzdGF0dXMiLCJzZW5kIiwicmVxIiwiYm9keSIsInR5cGUiLCJuYW1lIiwidXNlckF1dGhIZWxwZXIiLCJpc05hbWUiLCJjaGVjayIsImRiIiwicXVlcnkiLCJyZXN1bHQiLCJyb3dDb3VudCIsImNyZWF0ZVF1ZXJ5IiwidmFsdWVzIiwiRGF0ZSIsInJvd3MiLCJkYXRhIiwibWVzc2FnZSIsIm9yZGVyIiwiZmluZEFsbFF1ZXJ5IiwianNvbiIsInRleHQiLCJwYXJhbXMiLCJpZCIsImlzVVVJRCIsIm9mZmljZWlkIiwidGV4dDIiLCJyb3ciLCJjb25zb2xlIiwibG9nIiwicG9sbFJlc3VsdCIsImkiLCJsZW5ndGgiLCJzaW5nbGVSZXN1bHQiLCJvZmZpY2UiLCJjYW5kaWRhdGUiLCJ1c2VybmFtZSIsImNhbmRpZGF0ZW5hbWUiLCJvZmZpY2VuYW1lIiwiTnVtYmVyIiwiY291bnQiLCJwdXNoIiwicmVzcG9uc2UiLCJkZWxldGVRdWVyeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFDQTtBQUNBOzs7SUFHTUEsTTs7Ozs7Ozs7O0FBcU1KOzJCQUNNQyxLLEVBQU9DLEcsRUFBSztBQUNoQixhQUFPQSxJQUFJQyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDMUJELGdCQUFRLEdBRGtCO0FBRTFCRjtBQUYwQixPQUFyQixDQUFQO0FBSUQ7Ozs7QUExTUQ7Ozs7Ozs7OzJHQVFvQkksRyxFQUFLSCxHOzs7Ozs7O3NCQUNuQixDQUFDRyxJQUFJQyxJQUFKLENBQVNDLElBQVYsSUFBa0IsQ0FBQ0YsSUFBSUMsSUFBSixDQUFTRSxJOzs7OztpREFDdkJOLElBQUlDLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUMx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QU8sR0FEbUI7QUFFMUJvQiwyQkFBUztBQUZpQixpQkFBckIsQzs7O2tEQUtGbkIsSUFBSUMsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQzFCZ0Isd0JBQU07QUFEb0IsaUJBQXJCLEM7Ozs7O2tEQUtBbEIsSUFBSUMsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQzFCSCx5QkFBTztBQURtQixpQkFBckIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBTUVELE0iLCJmaWxlIjoib2ZmaWNlQ3RyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHV1aWR2NCBmcm9tICd1dWlkL3Y0JztcbmltcG9ydCBkYiBmcm9tICcuL2RhdGFiYXNlVGFibGVzL2RiY29ubmVjdCc7XG5pbXBvcnQgdXNlckF1dGhIZWxwZXIgZnJvbSAnLi4vaGVscGVyL3VzZXJBdXRoJztcbi8vIGltcG9ydCBRdWVyeSBmcm9tICcuLi8uLi9oZWxwZXIvcXVlcnknXG4vLyBpbXBvcnQgUGFydHlNb2RlbCBmcm9tICcuLi9tb2RlbHMvcGFydHknO1xuXG5cbmNsYXNzIE9mZmljZSB7XG4gIC8qKlxuICAgKiBDcmVhdGUgb2ZmaWNlKGFkbWluKVxuICAgKiBAcGFyYW0ge1ZhbHVlc30gcmVxIC0gcmVxdWVzdCB2YWx1ZXMgaW50byBrZXlzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXMgLSByZXF1ZXN0IG9iamVjdFxuICAgKiBAcmV0dXJucyB7YXJyYXl9IC0gcmV0dXJucyBhbGwga2V5IHZhbHVlIHBhaXJzIGFzIG9iamVjdCBpbiBhcnJheVxuICAgKi9cblxuXG4gIHN0YXRpYyBhc3luYyBjcmVhdGUocmVxLCByZXMpIHtcbiAgICBpZiAoIXJlcS5ib2R5LnR5cGUgJiYgIXJlcS5ib2R5Lm5hbWUpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBlcnJvcjogXCJJbnB1dHMgZmllbGRzIGNhbid0IGJlIGxlZnQgZW1wdHlcIixcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghcmVxLmJvZHkudHlwZSkge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgIGVycm9yOiAnVHlwZSBmaWVsZCBpcyBlbXB0eScsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXJlcS5ib2R5Lm5hbWUpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBlcnJvcjogJ05hbWUgZmllbGQgaXMgZW1wdHknLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCF1c2VyQXV0aEhlbHBlci5pc05hbWUocmVxLmJvZHkubmFtZSwgcmVxLmJvZHkudHlwZSkpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBlcnJvcjogJ0FscGhhYmV0cyBvbmx5JyxcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBpZiAoIXVzZXJBdXRoSGVscGVyLmlzSGlnaGVyKHJlcS5ib2R5Lm5hbWUsIHJlcS5ib2R5LnR5cGUpKSB7XG4gICAgLy8gICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgIC8vICAgICBcInN0YXR1c1wiOiA0MDAsXG4gICAgLy8gICAgIFwiZXJyb3JcIjogXCJBbHBoYWJldHMgb25seVwiXG4gICAgLy8gICB9KVxuICAgIC8vICAgICB9O1xuXG4gICAgY29uc3QgY2hlY2sgPSAnU0VMRUNUICogRlJPTSBvZmZpY2UgV0hFUkUgbmFtZT0kMSc7XG4gICAgY29uc3QgeyBuYW1lIH0gPSByZXEuYm9keTtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBkYi5xdWVyeShjaGVjaywgW25hbWVdKTtcbiAgICBpZiAocmVzdWx0LnJvd0NvdW50ICE9PSAwKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgZXJyb3I6ICdPZmZpY2UgYWxyZWFkeSBleGlzdCcsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBjcmVhdGVRdWVyeSA9IGBJTlNFUlQgSU5UT1xuICAgICAgb2ZmaWNlKGlkLCBuYW1lLCB0eXBlLCBjcmVhdGVkX2RhdGUpXG4gICAgICBWQUxVRVMoJDEsICQyLCAkMywgJDQpXG4gICAgICByZXR1cm5pbmcgKmA7XG4gICAgY29uc3QgdmFsdWVzID0gW1xuICAgICAgdXVpZHY0KCksXG4gICAgICByZXEuYm9keS5uYW1lLFxuICAgICAgcmVxLmJvZHkudHlwZSxcbiAgICAgIG1vbWVudChuZXcgRGF0ZSgpKSxcbiAgICBdO1xuICAgIHRyeSB7XG4gICAgICAvLyBjb25zdCByZXN1bHQgPSBhd2FpdCBkYi5xdWVyeShxdWVyeSk7XG4gICAgICAvLyBpZiAocmVzdWx0LnJvdyAhPT0gMCkge1xuICAgICAgLy8gICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe1xuICAgICAgLy8gICAgIHN0YXR1czogNDAwLFxuICAgICAgLy8gICAgIGVycm9yOiAnQW4gb2ZmaWNlIHdpdGggdGhpcyBuYW1lIGFscmVhZHkgZXhpc3QnLFxuICAgICAgLy8gICB9KTtcbiAgICAgIC8vIH1cbiAgICAgIGNvbnN0IHsgcm93cyB9ID0gYXdhaXQgZGIucXVlcnkoY3JlYXRlUXVlcnksIHZhbHVlcyk7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDEpLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IDIwMSxcbiAgICAgICAgZGF0YTogW3tcbiAgICAgICAgICBtZXNzYWdlOiAnb2ZmaWNlIGNyZWF0ZWQnLFxuICAgICAgICAgIG9yZGVyOiByb3dzWzBdLFxuICAgICAgICB9XSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgZGF0YTogJ1RoZXJlIHdhcyBhbiBlcnJvciwgcGxlYXNlIHRyeSBhZ2Fpbi4nLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogZ2V0IGFsbCBwb2xpdGljYWwgb2ZmaWNlcyh1c2VycylcbiAgICogQHBhcmFtIHt1dWlkfSBpZFxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVzIC0gcmVxdWVzdCBvYmplY3RcbiAgICogQHJldHVybnMge2FycmF5fSAtIHJldHVybnMgYWxsIGtleSB2YWx1ZSBwYWlycyBhcyBvYmplY3QgaW4gYXJyYXlcbiAgICovXG4gIHN0YXRpYyBhc3luYyBnZXRBbGxPZmZpY2VzKHJlcSwgcmVzKSB7XG4gICAgY29uc3QgZmluZEFsbFF1ZXJ5ID0gJ1NFTEVDVCAqIEZST00gb2ZmaWNlJztcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyByb3dzLCByb3dDb3VudCB9ID0gYXdhaXQgZGIucXVlcnkoZmluZEFsbFF1ZXJ5KTtcbiAgICAgIC8vIHJldHVybiByb3dzO1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgc3RhdHVzOiAyMDAsXG4gICAgICAgIGRhdGE6IHJvd3MsXG4gICAgICAgIHJvd0NvdW50LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBlcnJvcjogJ0JhZCBSZXF1ZXN0JyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgICogVXNlciBmZXRjaCBzcGVjaWZpYyBvZmZpY2VcbiAgICogQHBhcmFtIHt1dWlkfSBpZFxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVzIC0gcmVxdWVzdCBvYmplY3RcbiAgICogQHJldHVybnMge2FycmF5fSAtIHJldHVybnMgc3BlY2lmaWMgcGFydHlcbiAgICovXG4gIHN0YXRpYyBhc3luYyBnZXRPbmVPZmZpY2UocmVxLCByZXMpIHtcbiAgICBjb25zdCB0ZXh0ID0gJ1NFTEVDVCAqIEZST00gb2ZmaWNlIFdIRVJFIGlkID0gJDEnO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IHJvd3MgfSA9IGF3YWl0IGRiLnF1ZXJ5KHRleHQsIFtyZXEucGFyYW1zLmlkXSk7XG4gICAgICBpZiAoIXJvd3NbMF0pIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5zZW5kKHtcbiAgICAgICAgICBzdGF0dXM6IDQwNCxcbiAgICAgICAgICBlcnJvcjogJ09mZmljZSBub3QgZm91bmQnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmICghdXNlckF1dGhIZWxwZXIuaXNVVUlEKHJlcS5wYXJhbXMpKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgICAgZXJyb3I6ICdUaGUgdXNlciBJRCB1c2VkIGlzIGludmFsaWQnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogMjAwLFxuICAgICAgICBkYXRhOiByb3dzWzBdLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBlcnJvcjogJ0JhZCByZXF1ZXN0LiBDaGVjayBhbmQgdHJ5IGFnYWluJyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0geyp9IHJlcXVlc3RcbiAgICogQHBhcmFtIHsqfSByZXNwb25zZVxuICAgKiBAcmV0dXJuIHByb21pc2U7XG4gICAqL1xuICBzdGF0aWMgYXN5bmMgb2ZmaWNlUmVzdWx0KHJlcSwgcmVzKSB7XG4gICAgY29uc3QgeyBvZmZpY2VpZCB9ID0gcmVxLnBhcmFtcztcblxuICAgIGlmICghdXNlckF1dGhIZWxwZXIuaXNVVUlEKG9mZmljZWlkKSkge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgIGVycm9yOiAnVGhlIHVzZXIgSUQgdXNlZCBpcyBpbnZhbGlkJyxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCB0ZXh0ID0gJ1NFTEVDVCAqIEZST00gb2ZmaWNlIFdIRVJFIGlkID0gJDEnO1xuICAgIGNvbnN0IHsgcm93cyB9ID0gYXdhaXQgZGIucXVlcnkodGV4dCwgW29mZmljZWlkXSk7XG5cbiAgICBpZiAoIXJvd3NbMF0pIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogNDA0LFxuICAgICAgICBlcnJvcjogJ09mZmljZSBub3QgZm91bmQnLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgdGV4dDIgPSAnU0VMRUNUICosIENPVU5UKGNhbmRpZGF0ZSkgRlJPTSB2b3RlcyBXSEVSRSBvZmZpY2UgPSAkMSBHUk9VUCBCWSBpZCwgY3JlYXRlZF9vbiwgY3JlYXRlZF9ieSwgb2ZmaWNlbmFtZSwgb2ZmaWNlLCBjYW5kaWRhdGVuYW1lLCB1c2VybmFtZSwgY2FuZGlkYXRlJztcbiAgICBjb25zdCByb3cgPSBhd2FpdCBkYi5xdWVyeSh0ZXh0MiwgW29mZmljZWlkXSk7XG4gICAgY29uc29sZS5sb2cocm93LCAnPj4+Pj4+Pjw8PDw8PDw8Jyk7XG4gICAgY29uc3QgcG9sbFJlc3VsdCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93LnJvd3MubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IHNpbmdsZVJlc3VsdCA9IHtcbiAgICAgICAgb2ZmaWNlOiBvZmZpY2VpZCxcbiAgICAgICAgY2FuZGlkYXRlOiByb3cucm93c1swXS5jYW5kaWRhdGUsXG4gICAgICAgIHVzZXJuYW1lOiByb3cucm93c1swXS51c2VybmFtZSxcbiAgICAgICAgY2FuZGlkYXRlbmFtZTogcm93LnJvd3NbMF0uY2FuZGlkYXRlbmFtZSxcbiAgICAgICAgb2ZmaWNlbmFtZTogcm93LnJvd3NbMF0ub2ZmaWNlbmFtZSxcbiAgICAgICAgcmVzdWx0OiBOdW1iZXIocm93LnJvd3NbaV0uY291bnQpLFxuICAgICAgfTtcbiAgICAgIGNvbnNvbGUubG9nKHNpbmdsZVJlc3VsdCwgJz4+Pj4+Pj48PDw8PDw8PCcpO1xuXG4gICAgICBwb2xsUmVzdWx0LnB1c2goc2luZ2xlUmVzdWx0KTtcbiAgICB9XG4gICAgY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgICBzdGF0dXM6IDIwMCxcbiAgICAgIGRhdGE6IHBvbGxSZXN1bHQsXG4gICAgfTtcbiAgICAvLyBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHJlc3BvbnNlKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG4gIGNhdGNoKGVycm9yLCByZXMpIHtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLnNlbmQoe1xuICAgICAgc3RhdHVzOiA1MDAsXG4gICAgICBlcnJvcixcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBkZWxldGUocmVxLCByZXMpIHtcbiAgICBjb25zdCBkZWxldGVRdWVyeSA9ICdERUxFVEUgRlJPTSBvZmZpY2UgV0hFUkUgaWQ9JDEgcmV0dXJuaW5nIConO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IHJvd3MgfSA9IGF3YWl0IGRiLnF1ZXJ5KGRlbGV0ZVF1ZXJ5LCBbcmVxLnBhcmFtcy5pZF0pO1xuXG4gICAgICBpZiAoIXJvd3NbMF0pIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5zZW5kKHtcbiAgICAgICAgICBlcnJvcjogNDA0LFxuICAgICAgICAgIG1lc3NhZ2U6ICdvZmZpY2Ugbm90IGZvdW5kJyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MTApLnNlbmQoe1xuICAgICAgICBkYXRhOiAnZGVsZXRlZCcsXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgLy8gY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICAgICAgZXJyb3I6ICdPb3BzLCBzb21ldGhpbmcgd3JvbmcgaGFwcGVuZWQuIENoZWNrIGFuZCB0cnkgYWdhaW4nLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBPZmZpY2U7XG4iXX0=