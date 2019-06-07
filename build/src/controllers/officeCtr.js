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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy9vZmZpY2VDdHIuanMiXSwibmFtZXMiOlsiT2ZmaWNlIiwiZXJyb3IiLCJyZXMiLCJzdGF0dXMiLCJzZW5kIiwicmVxIiwiYm9keSIsInR5cGUiLCJuYW1lIiwidXNlckF1dGhIZWxwZXIiLCJpc05hbWUiLCJjaGVjayIsImRiIiwicXVlcnkiLCJyZXN1bHQiLCJyb3dDb3VudCIsImNyZWF0ZVF1ZXJ5IiwidmFsdWVzIiwiRGF0ZSIsInJvd3MiLCJkYXRhIiwibWVzc2FnZSIsIm9yZGVyIiwiZmluZEFsbFF1ZXJ5IiwianNvbiIsInRleHQiLCJwYXJhbXMiLCJpZCIsImlzVVVJRCIsIm9mZmljZWlkIiwidGV4dDIiLCJyb3ciLCJwb2xsUmVzdWx0IiwiaSIsImxlbmd0aCIsInNpbmdsZVJlc3VsdCIsIm9mZmljZSIsImNhbmRpZGF0ZSIsIk51bWJlciIsImNvdW50IiwicHVzaCIsInJlc3BvbnNlIiwiZGVsZXRlUXVlcnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBQ0E7QUFDQTs7O0lBR01BLE07Ozs7Ozs7OztBQWdNSjsyQkFDTUMsSyxFQUFPQyxHLEVBQUs7QUFDaEIsYUFBT0EsSUFBSUMsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQzFCRCxnQkFBUSxHQURrQjtBQUUxQkY7QUFGMEIsT0FBckIsQ0FBUDtBQUlEOzs7O0FBck1EOzs7Ozs7OzsyR0FRb0JJLEcsRUFBS0gsRzs7Ozs7OztzQkFDbkIsQ0FBQ0csSUFBSUMsSUFBSixDQUFTQyxJQUFWLElBQWtCLENBQUNGLElBQUlDLElBQUosQ0FBU0UsSTs7Ozs7aURBQ3ZCTixJQUFJQyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDMUJELDBCQUFRLEdBRGtCO0FBRTFCRix5QkFBTztBQUZtQixpQkFBckIsQzs7O29CQU1KSSxJQUFJ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bSAnbW9tZW50JztcbmltcG9ydCB1dWlkdjQgZnJvbSAndXVpZC92NCc7XG5pbXBvcnQgZGIgZnJvbSAnLi9kYXRhYmFzZVRhYmxlcy9kYmNvbm5lY3QnO1xuaW1wb3J0IHVzZXJBdXRoSGVscGVyIGZyb20gJy4uL2hlbHBlci91c2VyQXV0aCc7XG4vLyBpbXBvcnQgUXVlcnkgZnJvbSAnLi4vLi4vaGVscGVyL3F1ZXJ5J1xuLy8gaW1wb3J0IFBhcnR5TW9kZWwgZnJvbSAnLi4vbW9kZWxzL3BhcnR5JztcblxuXG5jbGFzcyBPZmZpY2Uge1xuICAvKipcbiAgICogQ3JlYXRlIG9mZmljZShhZG1pbilcbiAgICogQHBhcmFtIHtWYWx1ZXN9IHJlcSAtIHJlcXVlc3QgdmFsdWVzIGludG8ga2V5c1xuICAgKiBAcGFyYW0ge09iamVjdH0gcmVzIC0gcmVxdWVzdCBvYmplY3RcbiAgICogQHJldHVybnMge2FycmF5fSAtIHJldHVybnMgYWxsIGtleSB2YWx1ZSBwYWlycyBhcyBvYmplY3QgaW4gYXJyYXlcbiAgICovXG5cblxuICBzdGF0aWMgYXN5bmMgY3JlYXRlKHJlcSwgcmVzKSB7XG4gICAgaWYgKCFyZXEuYm9keS50eXBlICYmICFyZXEuYm9keS5uYW1lKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgZXJyb3I6IFwiSW5wdXRzIGZpZWxkcyBjYW4ndCBiZSBsZWZ0IGVtcHR5XCIsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXJlcS5ib2R5LnR5cGUpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBlcnJvcjogJ1R5cGUgZmllbGQgaXMgZW1wdHknLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCFyZXEuYm9keS5uYW1lKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgZXJyb3I6ICdOYW1lIGZpZWxkIGlzIGVtcHR5JyxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghdXNlckF1dGhIZWxwZXIuaXNOYW1lKHJlcS5ib2R5Lm5hbWUsIHJlcS5ib2R5LnR5cGUpKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgZXJyb3I6ICdBbHBoYWJldHMgb25seScsXG4gICAgICB9KTtcbiAgICB9XG4gICAgLy8gaWYgKCF1c2VyQXV0aEhlbHBlci5pc0hpZ2hlcihyZXEuYm9keS5uYW1lLCByZXEuYm9keS50eXBlKSkge1xuICAgIC8vICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICAvLyAgICAgXCJzdGF0dXNcIjogNDAwLFxuICAgIC8vICAgICBcImVycm9yXCI6IFwiQWxwaGFiZXRzIG9ubHlcIlxuICAgIC8vICAgfSlcbiAgICAvLyAgICAgfTtcblxuICAgIGNvbnN0IGNoZWNrID0gJ1NFTEVDVCAqIEZST00gb2ZmaWNlIFdIRVJFIG5hbWU9JDEnO1xuICAgIGNvbnN0IHsgbmFtZSB9ID0gcmVxLmJvZHk7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZGIucXVlcnkoY2hlY2ssIFtuYW1lXSk7XG4gICAgaWYgKHJlc3VsdC5yb3dDb3VudCAhPT0gMCkge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgIGVycm9yOiAnT2ZmaWNlIGFscmVhZHkgZXhpc3QnLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgY3JlYXRlUXVlcnkgPSBgSU5TRVJUIElOVE9cbiAgICAgIG9mZmljZShpZCwgbmFtZSwgdHlwZSwgY3JlYXRlZF9kYXRlKVxuICAgICAgVkFMVUVTKCQxLCAkMiwgJDMsICQ0KVxuICAgICAgcmV0dXJuaW5nICpgO1xuICAgIGNvbnN0IHZhbHVlcyA9IFtcbiAgICAgIHV1aWR2NCgpLFxuICAgICAgcmVxLmJvZHkubmFtZSxcbiAgICAgIHJlcS5ib2R5LnR5cGUsXG4gICAgICBtb21lbnQobmV3IERhdGUoKSksXG4gICAgXTtcbiAgICB0cnkge1xuICAgICAgLy8gY29uc3QgcmVzdWx0ID0gYXdhaXQgZGIucXVlcnkocXVlcnkpO1xuICAgICAgLy8gaWYgKHJlc3VsdC5yb3cgIT09IDApIHtcbiAgICAgIC8vICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtcbiAgICAgIC8vICAgICBzdGF0dXM6IDQwMCxcbiAgICAgIC8vICAgICBlcnJvcjogJ0FuIG9mZmljZSB3aXRoIHRoaXMgbmFtZSBhbHJlYWR5IGV4aXN0JyxcbiAgICAgIC8vICAgfSk7XG4gICAgICAvLyB9XG4gICAgICBjb25zdCB7IHJvd3MgfSA9IGF3YWl0IGRiLnF1ZXJ5KGNyZWF0ZVF1ZXJ5LCB2YWx1ZXMpO1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAxKS5zZW5kKHtcbiAgICAgICAgc3RhdHVzOiAyMDEsXG4gICAgICAgIGRhdGE6IFt7XG4gICAgICAgICAgbWVzc2FnZTogJ29mZmljZSBjcmVhdGVkJyxcbiAgICAgICAgICBvcmRlcjogcm93c1swXSxcbiAgICAgICAgfV0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5zZW5kKHtcbiAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgIGRhdGE6ICdUaGVyZSB3YXMgYW4gZXJyb3IsIHBsZWFzZSB0cnkgYWdhaW4uJyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIGdldCBhbGwgcG9saXRpY2FsIG9mZmljZXModXNlcnMpXG4gICAqIEBwYXJhbSB7dXVpZH0gaWRcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlcyAtIHJlcXVlc3Qgb2JqZWN0XG4gICAqIEByZXR1cm5zIHthcnJheX0gLSByZXR1cm5zIGFsbCBrZXkgdmFsdWUgcGFpcnMgYXMgb2JqZWN0IGluIGFycmF5XG4gICAqL1xuICBzdGF0aWMgYXN5bmMgZ2V0QWxsT2ZmaWNlcyhyZXEsIHJlcykge1xuICAgIGNvbnN0IGZpbmRBbGxRdWVyeSA9ICdTRUxFQ1QgKiBGUk9NIG9mZmljZSc7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgcm93cywgcm93Q291bnQgfSA9IGF3YWl0IGRiLnF1ZXJ5KGZpbmRBbGxRdWVyeSk7XG4gICAgICAvLyByZXR1cm4gcm93cztcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICAgIHN0YXR1czogMjAwLFxuICAgICAgICBkYXRhOiByb3dzLFxuICAgICAgICByb3dDb3VudCxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgZXJyb3I6ICdCYWQgUmVxdWVzdCcsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICAqIFVzZXIgZmV0Y2ggc3BlY2lmaWMgb2ZmaWNlXG4gICAqIEBwYXJhbSB7dXVpZH0gaWRcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlcyAtIHJlcXVlc3Qgb2JqZWN0XG4gICAqIEByZXR1cm5zIHthcnJheX0gLSByZXR1cm5zIHNwZWNpZmljIHBhcnR5XG4gICAqL1xuICBzdGF0aWMgYXN5bmMgZ2V0T25lT2ZmaWNlKHJlcSwgcmVzKSB7XG4gICAgY29uc3QgdGV4dCA9ICdTRUxFQ1QgKiBGUk9NIG9mZmljZSBXSEVSRSBpZCA9ICQxJztcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyByb3dzIH0gPSBhd2FpdCBkYi5xdWVyeSh0ZXh0LCBbcmVxLnBhcmFtcy5pZF0pO1xuICAgICAgaWYgKCFyb3dzWzBdKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuc2VuZCh7XG4gICAgICAgICAgc3RhdHVzOiA0MDQsXG4gICAgICAgICAgZXJyb3I6ICdPZmZpY2Ugbm90IGZvdW5kJyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoIXVzZXJBdXRoSGVscGVyLmlzVVVJRChyZXEucGFyYW1zKSkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICAgIGVycm9yOiAnVGhlIHVzZXIgSUQgdXNlZCBpcyBpbnZhbGlkJyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IDIwMCxcbiAgICAgICAgZGF0YTogcm93c1swXSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgZXJyb3I6ICdCYWQgcmVxdWVzdC4gQ2hlY2sgYW5kIHRyeSBhZ2FpbicsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHsqfSByZXF1ZXN0XG4gICAqIEBwYXJhbSB7Kn0gcmVzcG9uc2VcbiAgICogQHJldHVybiBwcm9taXNlO1xuICAgKi9cbiAgc3RhdGljIGFzeW5jIG9mZmljZVJlc3VsdChyZXEsIHJlcykge1xuICAgIGNvbnN0IHsgb2ZmaWNlaWQgfSA9IHJlcS5wYXJhbXM7XG5cbiAgICBpZiAoIXVzZXJBdXRoSGVscGVyLmlzVVVJRChvZmZpY2VpZCkpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBlcnJvcjogJ1RoZSB1c2VyIElEIHVzZWQgaXMgaW52YWxpZCcsXG4gICAgICB9KTtcbiAgICB9XG4gICAgY29uc3QgdGV4dCA9ICdTRUxFQ1QgKiBGUk9NIG9mZmljZSBXSEVSRSBpZCA9ICQxJztcbiAgICBjb25zdCB7IHJvd3MgfSA9IGF3YWl0IGRiLnF1ZXJ5KHRleHQsIFtvZmZpY2VpZF0pO1xuXG4gICAgaWYgKCFyb3dzWzBdKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IDQwNCxcbiAgICAgICAgZXJyb3I6ICdPZmZpY2Ugbm90IGZvdW5kJyxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHRleHQyID0gJ1NFTEVDVCBjYW5kaWRhdGUsIENPVU5UKGNhbmRpZGF0ZSkgRlJPTSB2b3RlcyBXSEVSRSBvZmZpY2UgPSAkMSBHUk9VUCBCWSBjYW5kaWRhdGUnO1xuICAgIGNvbnN0IHJvdyA9IGF3YWl0IGRiLnF1ZXJ5KHRleHQyLCBbb2ZmaWNlaWRdKTtcbiAgICBjb25zdCBwb2xsUmVzdWx0ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3cucm93cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3Qgc2luZ2xlUmVzdWx0ID0ge1xuICAgICAgICBvZmZpY2U6IG9mZmljZWlkLFxuICAgICAgICBjYW5kaWRhdGU6IHJvdy5yb3dzW2ldLmNhbmRpZGF0ZSxcbiAgICAgICAgcmVzdWx0OiBOdW1iZXIocm93LnJvd3NbaV0uY291bnQpLFxuICAgICAgfTtcblxuICAgICAgcG9sbFJlc3VsdC5wdXNoKHNpbmdsZVJlc3VsdCk7XG4gICAgfVxuICAgIGNvbnN0IHJlc3BvbnNlID0ge1xuICAgICAgc3RhdHVzOiAyMDAsXG4gICAgICBkYXRhOiBwb2xsUmVzdWx0LFxuICAgIH07XG4gICAgLy8gY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuc2VuZChyZXNwb25zZSk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2xhc3MtbWV0aG9kcy11c2UtdGhpc1xuICBjYXRjaChlcnJvciwgcmVzKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5zZW5kKHtcbiAgICAgIHN0YXR1czogNTAwLFxuICAgICAgZXJyb3IsXG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZGVsZXRlKHJlcSwgcmVzKSB7XG4gICAgY29uc3QgZGVsZXRlUXVlcnkgPSAnREVMRVRFIEZST00gb2ZmaWNlIFdIRVJFIGlkPSQxIHJldHVybmluZyAqJztcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyByb3dzIH0gPSBhd2FpdCBkYi5xdWVyeShkZWxldGVRdWVyeSwgW3JlcS5wYXJhbXMuaWRdKTtcblxuICAgICAgaWYgKCFyb3dzWzBdKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuc2VuZCh7XG4gICAgICAgICAgZXJyb3I6IDQwNCxcbiAgICAgICAgICBtZXNzYWdlOiAnb2ZmaWNlIG5vdCBmb3VuZCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDEwKS5zZW5kKHtcbiAgICAgICAgZGF0YTogJ2RlbGV0ZWQnLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIGVycm9yOiAnT29wcywgc29tZXRoaW5nIHdyb25nIGhhcHBlbmVkLiBDaGVjayBhbmQgdHJ5IGFnYWluJyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgT2ZmaWNlO1xuIl19