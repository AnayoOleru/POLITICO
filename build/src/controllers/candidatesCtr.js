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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy9jYW5kaWRhdGVzQ3RyLmpzIl0sIm5hbWVzIjpbIkNhbmRpZGF0ZXMiLCJyZXEiLCJyZXMiLCJib2R5Iiwib2ZmaWNlIiwicGFydHkiLCJzdGF0dXMiLCJzZW5kIiwiZXJyb3IiLCJjYW5kaWRhdGUiLCJjcmVhdGVRdWVyeSIsInZhbHVlcyIsIm9mZmljZU5hbWUiLCJwYXJ0eU5hbWUiLCJjYW5kaWRhdGVOYW1lIiwiZGIiLCJxdWVyeSIsInJvd3MiLCJkYXRhIiwibWVzc2FnZSIsImNhbmRpZGF0ZUlkIiwidXNlciIsImZpbmRBbGxRdWVyeSIsInJvd0NvdW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7Ozs7O0FBRUE7O0lBRU1BLFU7Ozs7Ozs7O0FBQ0o7Ozs7Ozs7MkdBTXNCQyxHLEVBQUtDLEc7Ozs7Ozs7c0JBQ3JCLENBQUNELElBQUlFLElBQUosQ0FBU0MsTUFBVixJQUFvQixDQUFDSCxJQUFJRSxJQUFKLENBQVNFLEs7Ozs7O2lEQUN6QkgsSUFBSUksTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQzFCRCwwQkFBUSxHQURrQjtBQUUxQkUseUJBQU87QUFGbUIsaUJBQXJCLEM7OztvQkFLSlAsSUFBSUUsSUFBSixDQUFTTSxTOzs7OztpREFDTFAsSUFBSUksTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQzFCQyx5QkFBTztBQURtQixpQkFBckIsQzs7O0FBSUhFLDJCO0FBSUFDLHNCLEdBQVMsQ0FDYixrQkFEYSxFQUViVixJQUFJRSxJQUFKLENBQVNDLE1BRkksRUFHYkgsSUFBSUUsSUFBSixDQUFTUyxVQUhJLEVBSWJYLElBQUlFLElBQUosQ0FBU0UsS0FKSSxFQUtiSixJQUFJRSxJQUFKLENBQVNVLFNBTEksRUFNYlosSUFBSUUsSUFBSixDQUFTTSxTQU5JLEVBT2JSLElBQUlFLElBQUosQ0FBU1csYUFQSSxDOzs7dUJBV1VDLG9CQUFHQyxLQUFILENBQVNOLFdBQVQsRUFBc0JDLE1BQXRCLEM7Ozs7QUFBZk0sb0IsU0FBQUEsSTtpREFDRGYsSUFBSUksTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQzFCRCwwQkFBUSxHQURrQjtBQUUxQlksd0JBQU0sQ0FBQztBQUNMQyw2QkFBUyxzQkFESjtBQUVMLG9DQUFnQkYsS0FBSyxDQUFMLEVBQVFHLFdBRm5CO0FBR0xoQiw0QkFBUWEsS0FBSyxDQUFMLEVBQVFiLE1BSFg7QUFJTGlCLDBCQUFNSixLQUFLLENBQUwsRUFBUVI7O0FBSlQsbUJBQUQ7QUFGb0IsaUJBQXJCLEM7Ozs7O2lEQVdBUCxJQUFJSSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDMUJELDBCQUFRLEdBRGtCO0FBRTFCRSx5QkFBTztBQUZtQixpQkFBckIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPWDs7Ozs7Ozs2R0FHOEJOLEc7Ozs7Ozs7QUFDdEJvQiw0QixHQUFlLDBCOzs7dUJBRWNQLG9CQUFHQyxLQUFILENBQVNNLFlBQVQsQzs7OztBQUF6Qkwsb0IsU0FBQUEsSTtBQUFNTSx3QixTQUFBQSxRO2tEQUNQckIsSUFBSUksTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQzFCRCwwQkFBUSxHQURrQjtBQUUxQlksd0JBQU1ELElBRm9CO0FBRzFCTTtBQUgwQixpQkFBckIsQzs7Ozs7a0RBTUFyQixJQUFJSSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsYzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXZFYjs7O2tCQTJFZVAsVSIsImZpbGUiOiJjYW5kaWRhdGVzQ3RyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHV1aWR2NCBmcm9tICd1dWlkL3Y0Jztcbi8vIGltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCBkYiBmcm9tICcuL2RhdGFiYXNlVGFibGVzL2RiY29ubmVjdCc7XG5cbi8vIGNvbnN0IHBhcnR5TW9kZWwgPSBuZXcgUGFydHlNb2RlbCgpXG5cbmNsYXNzIENhbmRpZGF0ZXMge1xuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtWYWx1ZXN9IHJlcSAtIHJlcXVlc3QgdmFsdWVzIGludG8ga2V5c1xuICAgKiBAcGFyYW0ge09iamVjdH0gcmVzIC0gcmVxdWVzdCBvYmplY3RcbiAgICogQHJldHVybnMge2FycmF5fSAtIHJldHVybnMgYWxsIGtleSB2YWx1ZSBwYWlycyBhcyBvYmplY3QgaW4gYXJyYXlcbiAgICovXG4gIHN0YXRpYyBhc3luYyByZWdpc3RlcihyZXEsIHJlcykge1xuICAgIGlmICghcmVxLmJvZHkub2ZmaWNlICYmICFyZXEuYm9keS5wYXJ0eSkge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgIGVycm9yOiAnU29tZSB2YWx1ZXMgYXJlIG1pc3NpbmcnLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICghcmVxLmJvZHkuY2FuZGlkYXRlKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICBlcnJvcjogXCJjYW5kaWRhdGUgZmllbGQgY2FuJ3QgYmUgZW1wdHlcIixcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCBjcmVhdGVRdWVyeSA9IGBJTlNFUlQgSU5UT1xuICAgICAgY2FuZGlkYXRlcyhjYW5kaWRhdGVJZCwgb2ZmaWNlLCBvZmZpY2VOYW1lLCBwYXJ0eSwgcGFydHlOYW1lLCBjYW5kaWRhdGUsIGNhbmRpZGF0ZU5hbWUpXG4gICAgICBWQUxVRVMoJDEsICQyLCAkMywgJDQsICQ1LCAkNiwgJDcpXG4gICAgICByZXR1cm5pbmcgKmA7XG4gICAgY29uc3QgdmFsdWVzID0gW1xuICAgICAgdXVpZHY0KCksXG4gICAgICByZXEuYm9keS5vZmZpY2UsXG4gICAgICByZXEuYm9keS5vZmZpY2VOYW1lLFxuICAgICAgcmVxLmJvZHkucGFydHksXG4gICAgICByZXEuYm9keS5wYXJ0eU5hbWUsXG4gICAgICByZXEuYm9keS5jYW5kaWRhdGUsXG4gICAgICByZXEuYm9keS5jYW5kaWRhdGVOYW1lLFxuICAgIF07XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgeyByb3dzIH0gPSBhd2FpdCBkYi5xdWVyeShjcmVhdGVRdWVyeSwgdmFsdWVzKTtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMSkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogMjAxLFxuICAgICAgICBkYXRhOiBbe1xuICAgICAgICAgIG1lc3NhZ2U6ICdDYW5kaWRhdGUgUmVnaXN0ZXJlZCcsXG4gICAgICAgICAgJ0NhbmRpZGF0ZS1pZCc6IHJvd3NbMF0uY2FuZGlkYXRlSWQsXG4gICAgICAgICAgb2ZmaWNlOiByb3dzWzBdLm9mZmljZSxcbiAgICAgICAgICB1c2VyOiByb3dzWzBdLmNhbmRpZGF0ZSxcblxuICAgICAgICB9XSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgZXJyb3I6IFwiWW91IGNhbid0IHJlZ2lzdGVyIHRoaXMgdXNlciBhcyBhIGNhbmRpZGF0ZSB0d2ljZVwiLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbGwgQ2FuZGlkYXRlc1xuICAgKi9cbiAgc3RhdGljIGFzeW5jIGdldEFsbENhbmRpZGF0ZXMocmVzKSB7XG4gICAgY29uc3QgZmluZEFsbFF1ZXJ5ID0gJ1NFTEVDVCAqIEZST00gY2FuZGlkYXRlcyc7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgcm93cywgcm93Q291bnQgfSA9IGF3YWl0IGRiLnF1ZXJ5KGZpbmRBbGxRdWVyeSk7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IDIwMCxcbiAgICAgICAgZGF0YTogcm93cyxcbiAgICAgICAgcm93Q291bnQsXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKGVycm9yKTtcbiAgICB9XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IENhbmRpZGF0ZXM7XG4iXX0=