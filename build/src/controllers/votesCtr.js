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

var _dbconnect = require('./databaseTables/dbconnect');

var _dbconnect2 = _interopRequireDefault(_dbconnect);

var _userAuth = require('../helper/userAuth');

var _userAuth2 = _interopRequireDefault(_userAuth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
                  status: 400,
                  error: 'Some values are missing'
                }));

              case 2:
                if (_userAuth2.default.isWhiteSpace(req.body.created_by, req.body.office, req, req.body.candidate)) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt('return', res.status(400).send({
                  status: 400,
                  error: 'White Space are not allowed in input fields'
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
                  status: 201,
                  data: [{
                    message: 'Vote complete',
                    data: {
                      office: rows[0].office,
                      candidate: rows[0].candidate,
                      voter: rows[0].created_by
                    }
                  }]
                }));

              case 14:
                _context.prev = 14;
                _context.t0 = _context['catch'](6);

                console.log(_context.t0);
                return _context.abrupt('return', res.status(400).send({
                  status: 400,
                  error: [{
                    message: 'Sorry, you have already voted for this user',
                    Created_by: 'should be your id',
                    office: 'should be your office id',
                    candidate: 'should be your candidate id'
                  }]
                }));

              case 18:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy92b3Rlc0N0ci5qcyJdLCJuYW1lcyI6WyJWb3RlcyIsInJlcSIsInJlcyIsImJvZHkiLCJjcmVhdGVkX2J5Iiwib2ZmaWNlIiwiY2FuZGlkYXRlIiwic3RhdHVzIiwic2VuZCIsImVycm9yIiwidXNlckF1dGhIZWxwZXIiLCJpc1doaXRlU3BhY2UiLCJjcmVhdGVRdWVyeSIsInZhbHVlcyIsIkRhdGUiLCJ1c2VyTmFtZSIsIm9mZmljZU5hbWUiLCJjYW5kaWRhdGVOYW1lIiwiZGIiLCJxdWVyeSIsInJvd3MiLCJkYXRhIiwibWVzc2FnZSIsInZvdGVyIiwiY29uc29sZSIsImxvZyIsIkNyZWF0ZWRfYnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7O0FBQ0E7QUFDQTs7QUFFQTs7QUFOQTtJQVFNQSxLOzs7Ozs7OztBQUNKOzs7Ozs7OzJHQU1tQkMsRyxFQUFLQyxHOzs7Ozs7O3NCQUVsQixDQUFDRCxJQUFJRSxJQUFKLENBQVNDLFVBQVYsSUFBd0IsQ0FBQ0gsSUFBSUUsSUFBSixDQUFTRSxNQUFsQyxJQUE0QyxDQUFDSixJQUFJRSxJQUFKLENBQVNHLFM7Ozs7O2lEQUNqREosSUFBSUssTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQzFCRCwwQkFBUSxHQURrQjtBQUUxQkUseUJBQU87QUFGbUIsaUJBQXJCLEM7OztvQkFLSkMsbUJBQWVDLFlBQWYsQ0FBNEJWLElBQUlFLElBQUosQ0FBU0MsVUFBckMsRUFBaURILElBQUlFLElBQUosQ0FBU0UsTUFBMUQsRUFBa0VKLEdBQWxFLEVBQXVFQSxJQUFJRSxJQUFKLENBQVNHLFNBQWhGLEM7Ozs7O2lEQUNJSixJQUFJSyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDMUJELDBCQUFRLEdBRGtCO0FBRTFCRSx5QkFBTztBQUZtQixpQkFBckIsQzs7O0FBTUhHLDJCO0FBSUFDLHNCLEdBQVMsQ0FDYixrQkFEYSxFQUViLHNCQUFPLElBQUlDLElBQUosRUFBUCxDQUZhLEVBR2JiLElBQUlFLElBQUosQ0FBU0MsVUFISSxFQUliSCxJQUFJRSxJQUFKLENBQVNZLFFBSkksRUFLYmQsSUFBSUUsSUFBSixDQUFTRSxNQUxJLEVBTWJKLElBQUlFLElBQUosQ0FBU2EsVUFOSSxFQU9iZixJQUFJRSxJQUFKLENBQVNHLFNBUEksRUFRYkwsSUFBSUUsSUFBSixDQUFTYyxhQVJJLEM7QUFVZjs7Ozt1QkFHeUJDLG9CQUFHQyxLQUFILENBQVNQLFdBQVQsRUFBc0JDLE1BQXRCLEM7Ozs7QUFBZk8sb0IsU0FBQUEsSTtpREFDRGxCLElBQUlLLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUMxQkQsMEJBQVEsR0FEa0I7QUFFMUJjLHdCQUFNLENBQUM7QUFDTEMsNkJBQVMsZUFESjtBQUVMRCwwQkFBTTtBQUNKaEIsOEJBQVFlLEtBQUssQ0FBTCxFQUFRZixNQURaO0FBRUpDLGlDQUFXYyxLQUFLLENBQUwsRUFBUWQsU0FGZjtBQUdKaUIsNkJBQU9ILEtBQUssQ0FBTCxFQUFRaEI7QUFIWDtBQUZELG1CQUFEO0FBRm9CLGlCQUFyQixDOzs7Ozs7QUFZUG9CLHdCQUFRQyxHQUFSO2lEQUNPdkIsSUFBSUssTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQzFCRCwwQkFBUSxHQURrQjtBQUUxQkUseUJBQU8sQ0FBQztBQUNOYSw2QkFBUyw2Q0FESDtBQUVOSSxnQ0FBWSxtQkFGTjtBQUdOckIsNEJBQVEsMEJBSEY7QUFJTkMsK0JBQVc7QUFKTCxtQkFBRDtBQUZtQixpQkFBckIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBWUVOLEsiLCJmaWxlIjoidm90ZXNDdHIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXVpZHY0IGZyb20gJ3V1aWQvdjQnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuLy8gaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IGRiIGZyb20gJy4vZGF0YWJhc2VUYWJsZXMvZGJjb25uZWN0JztcbmltcG9ydCB1c2VyQXV0aEhlbHBlciBmcm9tICcuLi9oZWxwZXIvdXNlckF1dGgnO1xuLy8gaW1wb3J0IHVzZXJBdXRoIGZyb20gJy4uL2hlbHBlci91c2VyQXV0aCc7XG4vLyBpbXBvcnQgeyByZXF1ZXN0IH0gZnJvbSAnaHR0cCc7XG5cbi8vIGNvbnN0IHBhcnR5TW9kZWwgPSBuZXcgUGFydHlNb2RlbCgpXG5cbmNsYXNzIFZvdGVzIHtcbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7VmFsdWVzfSByZXEgLSByZXF1ZXN0IHZhbHVlcyBpbnRvIGtleXNcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlcyAtIHJlcXVlc3Qgb2JqZWN0XG4gICAqIEByZXR1cm5zIHthcnJheX0gLSByZXR1cm5zIGFsbCBrZXkgdmFsdWUgcGFpcnMgYXMgb2JqZWN0IGluIGFycmF5XG4gICAqL1xuICBzdGF0aWMgYXN5bmMgdm90ZXMocmVxLCByZXMpIHtcbiAgICAvLyBjb25zdCB7IGNyZWF0ZWRfYnksIG9mZmljZSwgY2FuZGlkYXRlIH0gPSByZXEuYm9keTtcbiAgICBpZiAoIXJlcS5ib2R5LmNyZWF0ZWRfYnkgJiYgIXJlcS5ib2R5Lm9mZmljZSAmJiAhcmVxLmJvZHkuY2FuZGlkYXRlKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgZXJyb3I6ICdTb21lIHZhbHVlcyBhcmUgbWlzc2luZycsXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKCF1c2VyQXV0aEhlbHBlci5pc1doaXRlU3BhY2UocmVxLmJvZHkuY3JlYXRlZF9ieSwgcmVxLmJvZHkub2ZmaWNlLCByZXEsIHJlcS5ib2R5LmNhbmRpZGF0ZSkpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBlcnJvcjogJ1doaXRlIFNwYWNlIGFyZSBub3QgYWxsb3dlZCBpbiBpbnB1dCBmaWVsZHMnLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgY3JlYXRlUXVlcnkgPSBgSU5TRVJUIElOVE9cbiAgICAgIHZvdGVzKGlkLCBjcmVhdGVkX29uLCBjcmVhdGVkX2J5LCB1c2VyTmFtZSwgb2ZmaWNlLCBvZmZpY2VOYW1lLCBjYW5kaWRhdGUsIGNhbmRpZGF0ZU5hbWUpXG4gICAgICBWQUxVRVMoJDEsICQyLCAkMywgJDQsICQ1LCAkNiwgJDcsICQ4KVxuICAgICAgcmV0dXJuaW5nICpgO1xuICAgIGNvbnN0IHZhbHVlcyA9IFtcbiAgICAgIHV1aWR2NCgpLFxuICAgICAgbW9tZW50KG5ldyBEYXRlKCkpLFxuICAgICAgcmVxLmJvZHkuY3JlYXRlZF9ieSxcbiAgICAgIHJlcS5ib2R5LnVzZXJOYW1lLFxuICAgICAgcmVxLmJvZHkub2ZmaWNlLFxuICAgICAgcmVxLmJvZHkub2ZmaWNlTmFtZSxcbiAgICAgIHJlcS5ib2R5LmNhbmRpZGF0ZSxcbiAgICAgIHJlcS5ib2R5LmNhbmRpZGF0ZU5hbWUsXG4gICAgXTtcbiAgICAvLyBjb25zb2xlLmxvZyh2YWx1ZXMpXG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgeyByb3dzIH0gPSBhd2FpdCBkYi5xdWVyeShjcmVhdGVRdWVyeSwgdmFsdWVzKTtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMSkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogMjAxLFxuICAgICAgICBkYXRhOiBbe1xuICAgICAgICAgIG1lc3NhZ2U6ICdWb3RlIGNvbXBsZXRlJyxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBvZmZpY2U6IHJvd3NbMF0ub2ZmaWNlLFxuICAgICAgICAgICAgY2FuZGlkYXRlOiByb3dzWzBdLmNhbmRpZGF0ZSxcbiAgICAgICAgICAgIHZvdGVyOiByb3dzWzBdLmNyZWF0ZWRfYnksXG4gICAgICAgICAgfSxcbiAgICAgICAgfV0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgIGVycm9yOiBbe1xuICAgICAgICAgIG1lc3NhZ2U6ICdTb3JyeSwgeW91IGhhdmUgYWxyZWFkeSB2b3RlZCBmb3IgdGhpcyB1c2VyJyxcbiAgICAgICAgICBDcmVhdGVkX2J5OiAnc2hvdWxkIGJlIHlvdXIgaWQnLFxuICAgICAgICAgIG9mZmljZTogJ3Nob3VsZCBiZSB5b3VyIG9mZmljZSBpZCcsXG4gICAgICAgICAgY2FuZGlkYXRlOiAnc2hvdWxkIGJlIHlvdXIgY2FuZGlkYXRlIGlkJyxcbiAgICAgICAgfV0sXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFZvdGVzO1xuIl19