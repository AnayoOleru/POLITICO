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
                res.setHeader('Access-Control-Allow-Origin', '*');

                if (!(!req.body.office && !req.body.party)) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt('return', res.status(400).send({
                  status: 400,
                  error: 'Some values are missing'
                }));

              case 3:
                if (req.body.candidate) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt('return', res.status(400).send({
                  error: "candidate field can't be empty"
                }));

              case 5:
                createQuery = 'INSERT INTO\n      candidates(candidateId, office, officeName, party, partyName, candidate, candidateName)\n      VALUES($1, $2, $3, $4, $5, $6, $7)\n      returning *';
                values = [(0, _v2.default)(), req.body.office, req.body.officeName, req.body.party, req.body.partyName, req.body.candidate, req.body.candidateName];
                _context.prev = 7;
                _context.next = 10;
                return _dbconnect2.default.query(createQuery, values);

              case 10:
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

              case 15:
                _context.prev = 15;
                _context.t0 = _context['catch'](7);
                return _context.abrupt('return', res.status(400).send({
                  status: 400,
                  error: "You can't register this user as a candidate twice"
                }));

              case 18:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[7, 15]]);
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
                res.setHeader('Access-Control-Allow-Origin', '*');
                findAllQuery = 'SELECT * FROM candidates';
                _context2.prev = 2;
                _context2.next = 5;
                return _dbconnect2.default.query(findAllQuery);

              case 5:
                _ref4 = _context2.sent;
                rows = _ref4.rows;
                rowCount = _ref4.rowCount;
                return _context2.abrupt('return', res.status(200).send({
                  status: 200,
                  data: rows,
                  rowCount: rowCount
                }));

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2['catch'](2);
                return _context2.abrupt('return', res.status(400).send(_context2.t0));

              case 14:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 11]]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy9jYW5kaWRhdGVzQ3RyLmpzIl0sIm5hbWVzIjpbIkNhbmRpZGF0ZXMiLCJyZXEiLCJyZXMiLCJwYXJ0eSIsInN0YXR1cyIsImVycm9yIiwiY2FuZGlkYXRlIiwiY3JlYXRlUXVlcnkiLCJ2YWx1ZXMiLCJyb3dzIiwiZGIiLCJkYXRhIiwibWVzc2FnZSIsIm9mZmljZSIsInVzZXIiLCJmaW5kQWxsUXVlcnkiLCJyb3dDb3VudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUEsS0FBQSxRQUFBLFNBQUEsQ0FBQTs7OztBQUVBLElBQUEsYUFBQSxRQUFBLDRCQUFBLENBQUE7Ozs7Ozs7O0FBRUE7O0lBRU1BLGE7Ozs7Ozs7O0FBQ0o7Ozs7Ozs7MkdBTXNCQyxHLEVBQUtDLEc7Ozs7Ozs7QUFDekJBLG9CQUFBQSxTQUFBQSxDQUFBQSw2QkFBQUEsRUFBQUEsR0FBQUE7O3NCQUNJLENBQUNELElBQUFBLElBQUFBLENBQUQsTUFBQSxJQUFvQixDQUFDQSxJQUFBQSxJQUFBQSxDQUFTRSxLOzs7OztpREFDekIsSUFBQSxNQUFBLENBQUEsR0FBQSxFQUFBLElBQUEsQ0FBcUI7QUFDMUJDLDBCQUQwQixHQUFBO0FBRTFCQyx5QkFBTztBQUZtQixpQkFBckIsQzs7O29CQUtKSixJQUFBQSxJQUFBQSxDQUFTSyxTOzs7OztpREFDTCxJQUFBLE1BQUEsQ0FBQSxHQUFBLEVBQUEsSUFBQSxDQUFxQjtBQUMxQkQseUJBQU87QUFEbUIsaUJBQXJCLEM7OztBQUlIRSw4QkFBQUEseUtBQUFBO0FBSUFDLHlCQUFTLENBQ2IsQ0FBQSxHQUFBLElBRGEsT0FDYixHQURhLEVBRWJQLElBQUFBLElBQUFBLENBRmEsTUFBQSxFQUdiQSxJQUFBQSxJQUFBQSxDQUhhLFVBQUEsRUFJYkEsSUFBQUEsSUFBQUEsQ0FKYSxLQUFBLEVBS2JBLElBQUFBLElBQUFBLENBTGEsU0FBQSxFQU1iQSxJQUFBQSxJQUFBQSxDQU5hLFNBQUEsRUFPYkEsSUFBQUEsSUFBQUEsQ0FQSU8sYUFBUyxDQUFUQTs7O3VCQVdtQkUsWUFBQUEsT0FBQUEsQ0FBQUEsS0FBQUEsQ0FBQUEsV0FBQUEsRUFBQUEsTUFBQUEsQzs7OztBQUFmRCx1QixNQUFBQSxJQUFBQTtpREFDRCxJQUFBLE1BQUEsQ0FBQSxHQUFBLEVBQUEsSUFBQSxDQUFxQjtBQUMxQkwsMEJBRDBCLEdBQUE7QUFFMUJPLHdCQUFNLENBQUM7QUFDTEMsNkJBREssc0JBQUE7QUFFTCxvQ0FBZ0JILEtBQUFBLENBQUFBLEVBRlgsV0FBQTtBQUdMSSw0QkFBUUosS0FBQUEsQ0FBQUEsRUFISCxNQUFBO0FBSUxLLDBCQUFNTCxLQUFBQSxDQUFBQSxFQUFRSDs7QUFKVCxtQkFBRDtBQUZvQixpQkFBckIsQzs7Ozs7aURBV0EsSUFBQSxNQUFBLENBQUEsR0FBQSxFQUFBLElBQUEsQ0FBcUI7QUFDMUJGLDBCQUQwQixHQUFBO0FBRTFCQyx5QkFBTztBQUZtQixpQkFBckIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPWDs7Ozs7Ozs2R0FHOEJILEc7Ozs7Ozs7QUFDNUJBLG9CQUFBQSxTQUFBQSxDQUFBQSw2QkFBQUEsRUFBQUEsR0FBQUE7QUFDTWEsK0JBQUFBLDBCQUFBQTs7O3VCQUU2QkwsWUFBQUEsT0FBQUEsQ0FBQUEsS0FBQUEsQ0FBQUEsWUFBQUEsQzs7OztBQUF6QkQsdUIsTUFBQUEsSUFBQUE7QUFBTU8sMkIsTUFBQUEsUUFBQUE7a0RBQ1AsSUFBQSxNQUFBLENBQUEsR0FBQSxFQUFBLElBQUEsQ0FBcUI7QUFDMUJaLDBCQUQwQixHQUFBO0FBRTFCTyx3QkFGMEIsSUFBQTtBQUcxQkssNEJBQUFBO0FBSDBCLGlCQUFyQixDOzs7OztrREFNQWQsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsRUFBQUEsSUFBQUEsQ0FBQUEsVUFBQUEsRUFBQUEsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXpFYjs7O2tCQTZFZUYsVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB1dWlkdjQgZnJvbSAndXVpZC92NCc7XG4vLyBpbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgZGIgZnJvbSAnLi9kYXRhYmFzZVRhYmxlcy9kYmNvbm5lY3QnO1xuXG4vLyBjb25zdCBwYXJ0eU1vZGVsID0gbmV3IFBhcnR5TW9kZWwoKVxuXG5jbGFzcyBDYW5kaWRhdGVzIHtcbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7VmFsdWVzfSByZXEgLSByZXF1ZXN0IHZhbHVlcyBpbnRvIGtleXNcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlcyAtIHJlcXVlc3Qgb2JqZWN0XG4gICAqIEByZXR1cm5zIHthcnJheX0gLSByZXR1cm5zIGFsbCBrZXkgdmFsdWUgcGFpcnMgYXMgb2JqZWN0IGluIGFycmF5XG4gICAqL1xuICBzdGF0aWMgYXN5bmMgcmVnaXN0ZXIocmVxLCByZXMpIHtcbiAgICByZXMuc2V0SGVhZGVyKCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nLCAnKicpO1xuICAgIGlmICghcmVxLmJvZHkub2ZmaWNlICYmICFyZXEuYm9keS5wYXJ0eSkge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgIGVycm9yOiAnU29tZSB2YWx1ZXMgYXJlIG1pc3NpbmcnLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICghcmVxLmJvZHkuY2FuZGlkYXRlKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICBlcnJvcjogXCJjYW5kaWRhdGUgZmllbGQgY2FuJ3QgYmUgZW1wdHlcIixcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCBjcmVhdGVRdWVyeSA9IGBJTlNFUlQgSU5UT1xuICAgICAgY2FuZGlkYXRlcyhjYW5kaWRhdGVJZCwgb2ZmaWNlLCBvZmZpY2VOYW1lLCBwYXJ0eSwgcGFydHlOYW1lLCBjYW5kaWRhdGUsIGNhbmRpZGF0ZU5hbWUpXG4gICAgICBWQUxVRVMoJDEsICQyLCAkMywgJDQsICQ1LCAkNiwgJDcpXG4gICAgICByZXR1cm5pbmcgKmA7XG4gICAgY29uc3QgdmFsdWVzID0gW1xuICAgICAgdXVpZHY0KCksXG4gICAgICByZXEuYm9keS5vZmZpY2UsXG4gICAgICByZXEuYm9keS5vZmZpY2VOYW1lLFxuICAgICAgcmVxLmJvZHkucGFydHksXG4gICAgICByZXEuYm9keS5wYXJ0eU5hbWUsXG4gICAgICByZXEuYm9keS5jYW5kaWRhdGUsXG4gICAgICByZXEuYm9keS5jYW5kaWRhdGVOYW1lLFxuICAgIF07XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgeyByb3dzIH0gPSBhd2FpdCBkYi5xdWVyeShjcmVhdGVRdWVyeSwgdmFsdWVzKTtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMSkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogMjAxLFxuICAgICAgICBkYXRhOiBbe1xuICAgICAgICAgIG1lc3NhZ2U6ICdDYW5kaWRhdGUgUmVnaXN0ZXJlZCcsXG4gICAgICAgICAgJ0NhbmRpZGF0ZS1pZCc6IHJvd3NbMF0uY2FuZGlkYXRlSWQsXG4gICAgICAgICAgb2ZmaWNlOiByb3dzWzBdLm9mZmljZSxcbiAgICAgICAgICB1c2VyOiByb3dzWzBdLmNhbmRpZGF0ZSxcblxuICAgICAgICB9XSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgZXJyb3I6IFwiWW91IGNhbid0IHJlZ2lzdGVyIHRoaXMgdXNlciBhcyBhIGNhbmRpZGF0ZSB0d2ljZVwiLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbGwgQ2FuZGlkYXRlc1xuICAgKi9cbiAgc3RhdGljIGFzeW5jIGdldEFsbENhbmRpZGF0ZXMocmVzKSB7XG4gICAgcmVzLnNldEhlYWRlcignQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJywgJyonKTtcbiAgICBjb25zdCBmaW5kQWxsUXVlcnkgPSAnU0VMRUNUICogRlJPTSBjYW5kaWRhdGVzJztcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyByb3dzLCByb3dDb3VudCB9ID0gYXdhaXQgZGIucXVlcnkoZmluZEFsbFF1ZXJ5KTtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogMjAwLFxuICAgICAgICBkYXRhOiByb3dzLFxuICAgICAgICByb3dDb3VudCxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQ2FuZGlkYXRlcztcbiJdfQ==