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

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _dbconnect = require('../controllers/databaseTables/dbconnect');

var _dbconnect2 = _interopRequireDefault(_dbconnect);

var _userAuth = require('../helper/userAuth');

var _userAuth2 = _interopRequireDefault(_userAuth);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// import userAuth from '../helper/userAuth';
// import { request } from 'http';

// const partyModel = new PartyModel()

// import moment from 'moment';
var Votes = function () {
  function Votes() {
    (0, _classCallCheck3.default)(this, Votes);
  }

  (0, _createClass3.default)(Votes, null, [{
    key: 'votes',

    /**
     * 
     * @param {Values} req - request values into keys 
     * @param {Object} res - request object
     * @returns {array} - returns all key value pairs as object in array
     */
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var createQuery, values, _ref2, rows;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(!req.body.created_by && !req.body.office && !req.body.candidate)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return', res.status(400).send({
                  "status": 400,
                  "error": "Some values are missing"
                }));

              case 2:
                if (_userAuth2.default.isWhiteSpace(req.body.created_by, req.body.office, req, req.body.candidate)) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt('return', res.status(400).send({
                  "status": 400,
                  "error": "White Space are not allowed in input fields"
                }));

              case 4:
                createQuery = 'INSERT INTO\n      votes(id, created_on, created_by, userName, office, officeName, candidate, candidateName)\n      VALUES($1, $2, $3, $4, $5, $6, $7, $8)\n      returning *';
                values = [(0, _v2.default)(), (0, _moment2.default)(new Date()), req.body.created_by, req.body.userName, req.body.office, req.body.officeName, req.body.candidate, req.body.candidateName];
                // console.log(values)

                _context.prev = 6;
                _context.next = 9;
                return _dbconnect2.default.query(createQuery, values);

              case 9:
                _ref2 = _context.sent;
                rows = _ref2.rows;
                return _context.abrupt('return', res.status(201).send({
                  "status": 201,
                  "data": [{
                    "message": "Vote complete",
                    "data": {
                      "office": rows[0].office,
                      "candidate": rows[0].candidate,
                      "voter": rows[0].created_by
                    }
                  }]
                }));

              case 14:
                _context.prev = 14;
                _context.t0 = _context['catch'](6);
                return _context.abrupt('return', res.status(400).send({
                  "status": 400,
                  "error": [{
                    "message": "You have already voted for this office or there was an error with your inputs",
                    "Created_by": "should be your id",
                    "office": "should be your office id",
                    "candidate": "should be your candidate id"
                  }]
                }));

              case 17:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[6, 14]]);
      }));

      function votes(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return votes;
    }()
  }]);
  return Votes;
}();

exports.default = Votes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy92b3Rlc0N0ci5qcyJdLCJuYW1lcyI6WyJWb3RlcyIsInJlcSIsInJlcyIsImNhbmRpZGF0ZSIsInVzZXJBdXRoSGVscGVyIiwiY3JlYXRlUXVlcnkiLCJ2YWx1ZXMiLCJyb3dzIiwiZGIiLCJjcmVhdGVkX2J5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQSxLQUFBLFFBQUEsU0FBQSxDQUFBOzs7O0FBQ0EsSUFBQSxVQUFBLFFBQUEsUUFBQSxDQUFBOzs7O0FBRUEsSUFBQSxhQUFBLFFBQUEseUNBQUEsQ0FBQTs7OztBQUNBLElBQUEsWUFBQSxRQUFBLG9CQUFBLENBQUE7Ozs7Ozs7O0FBQ0E7QUFDQTs7QUFFQTs7QUFOQTtJQVFNQSxROzs7Ozs7OztBQUNKOzs7Ozs7OzJHQU1tQkMsRyxFQUFLQyxHOzs7Ozs7O3NCQUdsQixDQUFDRCxJQUFBQSxJQUFBQSxDQUFELFVBQUEsSUFBeUIsQ0FBQ0EsSUFBQUEsSUFBQUEsQ0FBMUIsTUFBQSxJQUE2QyxDQUFDQSxJQUFBQSxJQUFBQSxDQUFTRSxTOzs7OztpREFDbEQsSUFBQSxNQUFBLENBQUEsR0FBQSxFQUFBLElBQUEsQ0FBcUI7QUFDeEIsNEJBRHdCLEdBQUE7QUFFeEIsMkJBQVM7QUFGZSxpQkFBckIsQzs7O29CQUtKQyxXQUFBQSxPQUFBQSxDQUFBQSxZQUFBQSxDQUE0QkgsSUFBQUEsSUFBQUEsQ0FBNUJHLFVBQUFBLEVBQWlESCxJQUFBQSxJQUFBQSxDQUFqREcsTUFBQUEsRUFBQUEsR0FBQUEsRUFBdUVILElBQUFBLElBQUFBLENBQXZFRyxTQUFBQSxDOzs7OztpREFDSSxJQUFBLE1BQUEsQ0FBQSxHQUFBLEVBQUEsSUFBQSxDQUFxQjtBQUN4Qiw0QkFEd0IsR0FBQTtBQUV4QiwyQkFBUztBQUZlLGlCQUFyQixDOzs7QUFNSEMsOEIsK0tBQUFBO0FBSUFDLHlCQUFTLENBQ2IsQ0FBQSxHQUFBLElBRGEsT0FDYixHQURhLEVBRWIsQ0FBQSxHQUFBLFNBQUEsT0FBQSxFQUFPLElBRk0sSUFFTixFQUFQLENBRmEsRUFHYkwsSUFBQUEsSUFBQUEsQ0FIYSxVQUFBLEVBSWJBLElBQUFBLElBQUFBLENBSmEsUUFBQSxFQUtiQSxJQUFBQSxJQUFBQSxDQUxhLE1BQUEsRUFNYkEsSUFBQUEsSUFBQUEsQ0FOYSxVQUFBLEVBT2JBLElBQUFBLElBQUFBLENBUGEsU0FBQSxFQVFiQSxJQUFBQSxJQUFBQSxDQVJhLGFBQUEsQ0FBVEs7QUFVTjs7Ozt1QkFHeUJFLFlBQUFBLE9BQUFBLENBQUFBLEtBQUFBLENBQUFBLFdBQUFBLEVBQUFBLE1BQUFBLEM7Ozs7QUFBZkQsdUIsTUFBQUEsSUFBQUE7aURBQ0QsSUFBQSxNQUFBLENBQUEsR0FBQSxFQUFBLElBQUEsQ0FBcUI7QUFDMUIsNEJBRDBCLEdBQUE7QUFFMUIsMEJBQVEsQ0FBQztBQUNQLCtCQURPLGVBQUE7QUFFUCw0QkFBUTtBQUNQLGdDQUFTQSxLQUFBQSxDQUFBQSxFQURGLE1BQUE7QUFFUCxtQ0FBWUEsS0FBQUEsQ0FBQUEsRUFGTCxTQUFBO0FBR1AsK0JBQVFBLEtBQUFBLENBQUFBLEVBQVFFO0FBSFQ7QUFGRCxtQkFBRDtBQUZrQixpQkFBckIsQzs7Ozs7aURBYUEsSUFBQSxNQUFBLENBQUEsR0FBQSxFQUFBLElBQUEsQ0FBcUI7QUFDMUIsNEJBRDBCLEdBQUE7QUFFMUIsMkJBQVMsQ0FBQztBQUNSLCtCQURRLCtFQUFBO0FBRVIsa0NBRlEsbUJBQUE7QUFHUiw4QkFIUSwwQkFBQTtBQUlSLGlDQUFhO0FBSkwsbUJBQUQ7QUFGaUIsaUJBQXJCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQVlFVCxLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHV1aWR2NCBmcm9tICd1dWlkL3Y0JztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50Jztcbi8vIGltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCBkYiBmcm9tICcuLi9jb250cm9sbGVycy9kYXRhYmFzZVRhYmxlcy9kYmNvbm5lY3QnO1xuaW1wb3J0IHVzZXJBdXRoSGVscGVyIGZyb20gJy4uL2hlbHBlci91c2VyQXV0aCc7XG4vLyBpbXBvcnQgdXNlckF1dGggZnJvbSAnLi4vaGVscGVyL3VzZXJBdXRoJztcbi8vIGltcG9ydCB7IHJlcXVlc3QgfSBmcm9tICdodHRwJztcblxuLy8gY29uc3QgcGFydHlNb2RlbCA9IG5ldyBQYXJ0eU1vZGVsKClcblxuY2xhc3MgVm90ZXN7XG4gIC8qKlxuICAgKiBcbiAgICogQHBhcmFtIHtWYWx1ZXN9IHJlcSAtIHJlcXVlc3QgdmFsdWVzIGludG8ga2V5cyBcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlcyAtIHJlcXVlc3Qgb2JqZWN0XG4gICAqIEByZXR1cm5zIHthcnJheX0gLSByZXR1cm5zIGFsbCBrZXkgdmFsdWUgcGFpcnMgYXMgb2JqZWN0IGluIGFycmF5XG4gICAqL1xuICBzdGF0aWMgYXN5bmMgdm90ZXMocmVxLCByZXMpIHtcblxuICAgIC8vIGNvbnN0IHsgY3JlYXRlZF9ieSwgb2ZmaWNlLCBjYW5kaWRhdGUgfSA9IHJlcS5ib2R5O1xuICAgIGlmICghcmVxLmJvZHkuY3JlYXRlZF9ieSAgJiYgIXJlcS5ib2R5Lm9mZmljZSAmJiAhcmVxLmJvZHkuY2FuZGlkYXRlKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoeyBcbiAgICAgICAgICBcInN0YXR1c1wiOiA0MDAsIFxuICAgICAgICAgIFwiZXJyb3JcIjogXCJTb21lIHZhbHVlcyBhcmUgbWlzc2luZ1wiIFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICghdXNlckF1dGhIZWxwZXIuaXNXaGl0ZVNwYWNlKHJlcS5ib2R5LmNyZWF0ZWRfYnksIHJlcS5ib2R5Lm9mZmljZSwgcmVxLCByZXEuYm9keS5jYW5kaWRhdGUpKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoeyBcbiAgICAgICAgICBcInN0YXR1c1wiOiA0MDAsIFxuICAgICAgICAgIFwiZXJyb3JcIjogXCJXaGl0ZSBTcGFjZSBhcmUgbm90IGFsbG93ZWQgaW4gaW5wdXQgZmllbGRzXCIgXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBjcmVhdGVRdWVyeSA9IGBJTlNFUlQgSU5UT1xuICAgICAgdm90ZXMoaWQsIGNyZWF0ZWRfb24sIGNyZWF0ZWRfYnksIHVzZXJOYW1lLCBvZmZpY2UsIG9mZmljZU5hbWUsIGNhbmRpZGF0ZSwgY2FuZGlkYXRlTmFtZSlcbiAgICAgIFZBTFVFUygkMSwgJDIsICQzLCAkNCwgJDUsICQ2LCAkNywgJDgpXG4gICAgICByZXR1cm5pbmcgKmA7XG4gICAgY29uc3QgdmFsdWVzID0gW1xuICAgICAgdXVpZHY0KCksXG4gICAgICBtb21lbnQobmV3IERhdGUoKSksXG4gICAgICByZXEuYm9keS5jcmVhdGVkX2J5LFxuICAgICAgcmVxLmJvZHkudXNlck5hbWUsXG4gICAgICByZXEuYm9keS5vZmZpY2UsXG4gICAgICByZXEuYm9keS5vZmZpY2VOYW1lLFxuICAgICAgcmVxLmJvZHkuY2FuZGlkYXRlLFxuICAgICAgcmVxLmJvZHkuY2FuZGlkYXRlTmFtZVxuICAgIF07XG4gICAgLy8gY29uc29sZS5sb2codmFsdWVzKVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgcm93cyB9ID0gYXdhaXQgZGIucXVlcnkoY3JlYXRlUXVlcnksIHZhbHVlcyk7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDEpLnNlbmQoe1xuICAgICAgICBcInN0YXR1c1wiOiAyMDEsXG4gICAgICAgIFwiZGF0YVwiOiBbe1xuICAgICAgICAgIFwibWVzc2FnZVwiOiBcIlZvdGUgY29tcGxldGVcIixcbiAgICAgICAgICBcImRhdGFcIjoge1xuICAgICAgICAgICBcIm9mZmljZVwiOnJvd3NbMF0ub2ZmaWNlLFxuICAgICAgICAgICBcImNhbmRpZGF0ZVwiOnJvd3NbMF0uY2FuZGlkYXRlLFxuICAgICAgICAgICBcInZvdGVyXCI6cm93c1swXS5jcmVhdGVkX2J5XG4gICAgICAgICAgfVxuICAgICAgICB9XSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2goZXJyb3IpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZXJyb3IpXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICBcInN0YXR1c1wiOiA0MDAsXG4gICAgICAgIFwiZXJyb3JcIjogW3tcbiAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJZb3UgaGF2ZSBhbHJlYWR5IHZvdGVkIGZvciB0aGlzIG9mZmljZSBvciB0aGVyZSB3YXMgYW4gZXJyb3Igd2l0aCB5b3VyIGlucHV0c1wiLFxuICAgICAgICAgIFwiQ3JlYXRlZF9ieVwiOiBcInNob3VsZCBiZSB5b3VyIGlkXCIsXG4gICAgICAgICAgXCJvZmZpY2VcIjogXCJzaG91bGQgYmUgeW91ciBvZmZpY2UgaWRcIixcbiAgICAgICAgICBcImNhbmRpZGF0ZVwiOiBcInNob3VsZCBiZSB5b3VyIGNhbmRpZGF0ZSBpZFwiXG4gICAgICAgIH1dXG4gICAgICB9KVxuICAgICB9XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFZvdGVzOyBcbiJdfQ==