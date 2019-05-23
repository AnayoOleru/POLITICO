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

var _dbconnect = require('./databaseTables/dbconnect');

var _dbconnect2 = _interopRequireDefault(_dbconnect);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// const partyModel = new PartyModel()

var Candidates = function () {
  function Candidates() {
    (0, _classCallCheck3.default)(this, Candidates);
  }

  (0, _createClass3.default)(Candidates, null, [{
    key: 'register',

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
                if (!(!req.body.office && !req.body.party)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return', res.status(400).send({
                  status: 400,
                  error: 'Some values are missing'
                }));

              case 2:
                if (req.body.candidate) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt('return', res.status(400).send({
                  error: "candidate field can't be empty"
                }));

              case 4:
                createQuery = 'INSERT INTO\n      candidates(candidateId, office, officeName, party, partyName, candidate, candidateName)\n      VALUES($1, $2, $3, $4, $5, $6, $7)\n      returning *';
                values = [(0, _v2.default)(), req.body.office, req.body.officeName, req.body.party, req.body.partyName, req.body.candidate, req.body.candidateName];
                _context.prev = 6;
                _context.next = 9;
                return _dbconnect2.default.query(createQuery, values);

              case 9:
                _ref2 = _context.sent;
                rows = _ref2.rows;
                return _context.abrupt('return', res.status(201).send({
                  status: 201,
                  data: [{
                    message: 'Candidate Registered',
                    'Candidate-id': rows[0].candidateId,
                    office: rows[0].office,
                    user: rows[0].candidate

                  }]
                }));

              case 14:
                _context.prev = 14;
                _context.t0 = _context['catch'](6);
                return _context.abrupt('return', res.status(400).send({
                  status: 400,
                  error: "You can't register this user as a candidate twice"
                }));

              case 17:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[6, 14]]);
      }));

      function register(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return register;
    }()

    /**
     * Get all Candidates
     */

  }, {
    key: 'getAllCandidates',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(res) {
        var findAllQuery, _ref4, rows, rowCount;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                findAllQuery = 'SELECT * FROM candidates';
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
                return _context2.abrupt('return', res.status(400).send(_context2.t0));

              case 13:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 10]]);
      }));

      function getAllCandidates(_x3) {
        return _ref3.apply(this, arguments);
      }

      return getAllCandidates;
    }()
  }]);
  return Candidates;
}();
// import moment from 'moment';


exports.default = Candidates;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy9jYW5kaWRhdGVzQ3RyLmpzIl0sIm5hbWVzIjpbIkNhbmRpZGF0ZXMiLCJyZXEiLCJyZXMiLCJwYXJ0eSIsInN0YXR1cyIsImVycm9yIiwiY2FuZGlkYXRlIiwiY3JlYXRlUXVlcnkiLCJ2YWx1ZXMiLCJyb3dzIiwiZGIiLCJkYXRhIiwibWVzc2FnZSIsIm9mZmljZSIsInVzZXIiLCJmaW5kQWxsUXVlcnkiLCJyb3dDb3VudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUEsS0FBQSxRQUFBLFNBQUEsQ0FBQTs7OztBQUVBLElBQUEsYUFBQSxRQUFBLDRCQUFBLENBQUE7Ozs7Ozs7O0FBRUE7O0lBRU1BLGE7Ozs7Ozs7O0FBQ0o7Ozs7Ozs7MkdBTXNCQyxHLEVBQUtDLEc7Ozs7Ozs7c0JBQ3JCLENBQUNELElBQUFBLElBQUFBLENBQUQsTUFBQSxJQUFvQixDQUFDQSxJQUFBQSxJQUFBQSxDQUFTRSxLOzs7OztpREFDekIsSUFBQSxNQUFBLENBQUEsR0FBQSxFQUFBLElBQUEsQ0FBcUI7QUFDMUJDLDBCQUQwQixHQUFBO0FBRTFCQyx5QkFBTztBQUZtQixpQkFBckIsQzs7O29CQUtKSixJQUFBQSxJQUFBQSxDQUFTSyxTOzs7OztpREFDTCxJQUFBLE1BQUEsQ0FBQSxHQUFBLEVBQUEsSUFBQSxDQUFxQjtBQUMxQkQseUJBQU87QUFEbUIsaUJBQXJCLEM7OztBQUlIRSw4QkFBQUEseUtBQUFBO0FBSUFDLHlCQUFTLENBQ2IsQ0FBQSxHQUFBLElBRGEsT0FDYixHQURhLEVBRWJQLElBQUFBLElBQUFBLENBRmEsTUFBQSxFQUdiQSxJQUFBQSxJQUFBQSxDQUhhLFVBQUEsRUFJYkEsSUFBQUEsSUFBQUEsQ0FKYSxLQUFBLEVBS2JBLElBQUFBLElBQUFBLENBTGEsU0FBQSxFQU1iQSxJQUFBQSxJQUFBQSxDQU5hLFNBQUEsRUFPYkEsSUFBQUEsSUFBQUEsQ0FQSU8sYUFBUyxDQUFUQTs7O3VCQVdtQkUsWUFBQUEsT0FBQUEsQ0FBQUEsS0FBQUEsQ0FBQUEsV0FBQUEsRUFBQUEsTUFBQUEsQzs7OztBQUFmRCx1QixNQUFBQSxJQUFBQTtpREFDRCxJQUFBLE1BQUEsQ0FBQSxHQUFBLEVBQUEsSUFBQSxDQUFxQjtBQUMxQkwsMEJBRDBCLEdBQUE7QUFFMUJPLHdCQUFNLENBQUM7QUFDTEMsNkJBREssc0JBQUE7QUFFTCxvQ0FBZ0JILEtBQUFBLENBQUFBLEVBRlgsV0FBQTtBQUdMSSw0QkFBUUosS0FBQUEsQ0FBQUEsRUFISCxNQUFBO0FBSUxLLDBCQUFNTCxLQUFBQSxDQUFBQSxFQUFRSDs7QUFKVCxtQkFBRDtBQUZvQixpQkFBckIsQzs7Ozs7aURBV0EsSUFBQSxNQUFBLENBQUEsR0FBQSxFQUFBLElBQUEsQ0FBcUI7QUFDMUJGLDBCQUQwQixHQUFBO0FBRTFCQyx5QkFBTztBQUZtQixpQkFBckIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPWDs7Ozs7Ozs2R0FHOEJILEc7Ozs7Ozs7QUFDdEJhLCtCQUFBQSwwQkFBQUE7Ozt1QkFFNkJMLFlBQUFBLE9BQUFBLENBQUFBLEtBQUFBLENBQUFBLFlBQUFBLEM7Ozs7QUFBekJELHVCLE1BQUFBLElBQUFBO0FBQU1PLDJCLE1BQUFBLFFBQUFBO2tEQUNQLElBQUEsTUFBQSxDQUFBLEdBQUEsRUFBQSxJQUFBLENBQXFCO0FBQzFCWiwwQkFEMEIsR0FBQTtBQUUxQk8sd0JBRjBCLElBQUE7QUFHMUJLLDRCQUFBQTtBQUgwQixpQkFBckIsQzs7Ozs7a0RBTUFkLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLEVBQUFBLElBQUFBLENBQUFBLFVBQUFBLEVBQUFBLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF2RWI7OztrQkEyRWVGLFUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXVpZHY0IGZyb20gJ3V1aWQvdjQnO1xuLy8gaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IGRiIGZyb20gJy4vZGF0YWJhc2VUYWJsZXMvZGJjb25uZWN0JztcblxuLy8gY29uc3QgcGFydHlNb2RlbCA9IG5ldyBQYXJ0eU1vZGVsKClcblxuY2xhc3MgQ2FuZGlkYXRlcyB7XG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge1ZhbHVlc30gcmVxIC0gcmVxdWVzdCB2YWx1ZXMgaW50byBrZXlzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXMgLSByZXF1ZXN0IG9iamVjdFxuICAgKiBAcmV0dXJucyB7YXJyYXl9IC0gcmV0dXJucyBhbGwga2V5IHZhbHVlIHBhaXJzIGFzIG9iamVjdCBpbiBhcnJheVxuICAgKi9cbiAgc3RhdGljIGFzeW5jIHJlZ2lzdGVyKHJlcSwgcmVzKSB7XG4gICAgaWYgKCFyZXEuYm9keS5vZmZpY2UgJiYgIXJlcS5ib2R5LnBhcnR5KSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgZXJyb3I6ICdTb21lIHZhbHVlcyBhcmUgbWlzc2luZycsXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKCFyZXEuYm9keS5jYW5kaWRhdGUpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIGVycm9yOiBcImNhbmRpZGF0ZSBmaWVsZCBjYW4ndCBiZSBlbXB0eVwiLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IGNyZWF0ZVF1ZXJ5ID0gYElOU0VSVCBJTlRPXG4gICAgICBjYW5kaWRhdGVzKGNhbmRpZGF0ZUlkLCBvZmZpY2UsIG9mZmljZU5hbWUsIHBhcnR5LCBwYXJ0eU5hbWUsIGNhbmRpZGF0ZSwgY2FuZGlkYXRlTmFtZSlcbiAgICAgIFZBTFVFUygkMSwgJDIsICQzLCAkNCwgJDUsICQ2LCAkNylcbiAgICAgIHJldHVybmluZyAqYDtcbiAgICBjb25zdCB2YWx1ZXMgPSBbXG4gICAgICB1dWlkdjQoKSxcbiAgICAgIHJlcS5ib2R5Lm9mZmljZSxcbiAgICAgIHJlcS5ib2R5Lm9mZmljZU5hbWUsXG4gICAgICByZXEuYm9keS5wYXJ0eSxcbiAgICAgIHJlcS5ib2R5LnBhcnR5TmFtZSxcbiAgICAgIHJlcS5ib2R5LmNhbmRpZGF0ZSxcbiAgICAgIHJlcS5ib2R5LmNhbmRpZGF0ZU5hbWUsXG4gICAgXTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IHJvd3MgfSA9IGF3YWl0IGRiLnF1ZXJ5KGNyZWF0ZVF1ZXJ5LCB2YWx1ZXMpO1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAxKS5zZW5kKHtcbiAgICAgICAgc3RhdHVzOiAyMDEsXG4gICAgICAgIGRhdGE6IFt7XG4gICAgICAgICAgbWVzc2FnZTogJ0NhbmRpZGF0ZSBSZWdpc3RlcmVkJyxcbiAgICAgICAgICAnQ2FuZGlkYXRlLWlkJzogcm93c1swXS5jYW5kaWRhdGVJZCxcbiAgICAgICAgICBvZmZpY2U6IHJvd3NbMF0ub2ZmaWNlLFxuICAgICAgICAgIHVzZXI6IHJvd3NbMF0uY2FuZGlkYXRlLFxuXG4gICAgICAgIH1dLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBlcnJvcjogXCJZb3UgY2FuJ3QgcmVnaXN0ZXIgdGhpcyB1c2VyIGFzIGEgY2FuZGlkYXRlIHR3aWNlXCIsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFsbCBDYW5kaWRhdGVzXG4gICAqL1xuICBzdGF0aWMgYXN5bmMgZ2V0QWxsQ2FuZGlkYXRlcyhyZXMpIHtcbiAgICBjb25zdCBmaW5kQWxsUXVlcnkgPSAnU0VMRUNUICogRlJPTSBjYW5kaWRhdGVzJztcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyByb3dzLCByb3dDb3VudCB9ID0gYXdhaXQgZGIucXVlcnkoZmluZEFsbFF1ZXJ5KTtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogMjAwLFxuICAgICAgICBkYXRhOiByb3dzLFxuICAgICAgICByb3dDb3VudCxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQ2FuZGlkYXRlcztcbiJdfQ==