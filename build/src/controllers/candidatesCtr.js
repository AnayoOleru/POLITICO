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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy9jYW5kaWRhdGVzQ3RyLmpzIl0sIm5hbWVzIjpbIkNhbmRpZGF0ZXMiLCJyZXEiLCJyZXMiLCJzZXRIZWFkZXIiLCJib2R5Iiwib2ZmaWNlIiwicGFydHkiLCJzdGF0dXMiLCJzZW5kIiwiZXJyb3IiLCJjYW5kaWRhdGUiLCJjcmVhdGVRdWVyeSIsInZhbHVlcyIsIm9mZmljZU5hbWUiLCJwYXJ0eU5hbWUiLCJjYW5kaWRhdGVOYW1lIiwiZGIiLCJxdWVyeSIsInJvd3MiLCJkYXRhIiwibWVzc2FnZSIsImNhbmRpZGF0ZUlkIiwidXNlciIsImZpbmRBbGxRdWVyeSIsInJvd0NvdW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7Ozs7O0FBRUE7O0lBRU1BLFU7Ozs7Ozs7O0FBQ0o7Ozs7Ozs7MkdBTXNCQyxHLEVBQUtDLEc7Ozs7Ozs7QUFDekJBLG9CQUFJQyxTQUFKLENBQWMsNkJBQWQsRUFBNkMsR0FBN0M7O3NCQUNJLENBQUNGLElBQUlHLElBQUosQ0FBU0MsTUFBVixJQUFvQixDQUFDSixJQUFJRyxJQUFKLENBQVNFLEs7Ozs7O2lEQUN6QkosSUFBSUssTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQzFCRCwwQkFBUSxHQURrQjtBQUUxQkUseUJBQU87QUFGbUIsaUJBQXJCLEM7OztvQkFLSlIsSUFBSUcsSUFBSixDQUFTTSxTOzs7OztpREFDTFIsSUFBSUssTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQzFCQyx5QkFBTztBQURtQixpQkFBckIsQzs7O0FBSUhFLDJCO0FBSUFDLHNCLEdBQVMsQ0FDYixrQkFEYSxFQUViWCxJQUFJRyxJQUFKLENBQVNDLE1BRkksRUFHYkosSUFBSUcsSUFBSixDQUFTUyxVQUhJLEVBSWJaLElBQUlHLElBQUosQ0FBU0UsS0FKSSxFQUtiTCxJQUFJRyxJQUFKLENBQVNVLFNBTEksRUFNYmIsSUFBSUcsSUFBSixDQUFTTSxTQU5JLEVBT2JULElBQUlHLElBQUosQ0FBU1csYUFQSSxDOzs7dUJBV1VDLG9CQUFHQyxLQUFILENBQVNOLFdBQVQsRUFBc0JDLE1BQXRCLEM7Ozs7QUFBZk0sb0IsU0FBQUEsSTtpREFDRGhCLElBQUlLLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUMxQkQsMEJBQVEsR0FEa0I7QUFFMUJZLHdCQUFNLENBQUM7QUFDTEMsNkJBQVMsc0JBREo7QUFFTCxvQ0FBZ0JGLEtBQUssQ0FBTCxFQUFRRyxXQUZuQjtBQUdMaEIsNEJBQVFhLEtBQUssQ0FBTCxFQUFRYixNQUhYO0FBSUxpQiwwQkFBTUosS0FBSyxDQUFMLEVBQVFSOztBQUpULG1CQUFEO0FBRm9CLGlCQUFyQixDOzs7OztpREFXQVIsSUFBSUssTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQzFCRCwwQkFBUSxHQURrQjtBQUUxQkUseUJBQU87QUFGbUIsaUJBQXJCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT1g7Ozs7Ozs7NkdBRzhCUCxHOzs7Ozs7O0FBQzVCQSxvQkFBSUMsU0FBSixDQUFjLDZCQUFkLEVBQTZDLEdBQTdDO0FBQ01vQiw0QixHQUFlLDBCOzs7dUJBRWNQLG9CQUFHQyxLQUFILENBQVNNLFlBQVQsQzs7OztBQUF6Qkwsb0IsU0FBQUEsSTtBQUFNTSx3QixTQUFBQSxRO2tEQUNQdEIsSUFBSUssTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQzFCRCwwQkFBUSxHQURrQjtBQUUxQlksd0JBQU1ELElBRm9CO0FBRzFCTTtBQUgwQixpQkFBckIsQzs7Ozs7a0RBTUF0QixJQUFJSyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsYzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXpFYjs7O2tCQTZFZVIsVSIsImZpbGUiOiJjYW5kaWRhdGVzQ3RyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHV1aWR2NCBmcm9tICd1dWlkL3Y0Jztcbi8vIGltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCBkYiBmcm9tICcuL2RhdGFiYXNlVGFibGVzL2RiY29ubmVjdCc7XG5cbi8vIGNvbnN0IHBhcnR5TW9kZWwgPSBuZXcgUGFydHlNb2RlbCgpXG5cbmNsYXNzIENhbmRpZGF0ZXMge1xuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtWYWx1ZXN9IHJlcSAtIHJlcXVlc3QgdmFsdWVzIGludG8ga2V5c1xuICAgKiBAcGFyYW0ge09iamVjdH0gcmVzIC0gcmVxdWVzdCBvYmplY3RcbiAgICogQHJldHVybnMge2FycmF5fSAtIHJldHVybnMgYWxsIGtleSB2YWx1ZSBwYWlycyBhcyBvYmplY3QgaW4gYXJyYXlcbiAgICovXG4gIHN0YXRpYyBhc3luYyByZWdpc3RlcihyZXEsIHJlcykge1xuICAgIHJlcy5zZXRIZWFkZXIoJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbicsICcqJyk7XG4gICAgaWYgKCFyZXEuYm9keS5vZmZpY2UgJiYgIXJlcS5ib2R5LnBhcnR5KSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgZXJyb3I6ICdTb21lIHZhbHVlcyBhcmUgbWlzc2luZycsXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKCFyZXEuYm9keS5jYW5kaWRhdGUpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIGVycm9yOiBcImNhbmRpZGF0ZSBmaWVsZCBjYW4ndCBiZSBlbXB0eVwiLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IGNyZWF0ZVF1ZXJ5ID0gYElOU0VSVCBJTlRPXG4gICAgICBjYW5kaWRhdGVzKGNhbmRpZGF0ZUlkLCBvZmZpY2UsIG9mZmljZU5hbWUsIHBhcnR5LCBwYXJ0eU5hbWUsIGNhbmRpZGF0ZSwgY2FuZGlkYXRlTmFtZSlcbiAgICAgIFZBTFVFUygkMSwgJDIsICQzLCAkNCwgJDUsICQ2LCAkNylcbiAgICAgIHJldHVybmluZyAqYDtcbiAgICBjb25zdCB2YWx1ZXMgPSBbXG4gICAgICB1dWlkdjQoKSxcbiAgICAgIHJlcS5ib2R5Lm9mZmljZSxcbiAgICAgIHJlcS5ib2R5Lm9mZmljZU5hbWUsXG4gICAgICByZXEuYm9keS5wYXJ0eSxcbiAgICAgIHJlcS5ib2R5LnBhcnR5TmFtZSxcbiAgICAgIHJlcS5ib2R5LmNhbmRpZGF0ZSxcbiAgICAgIHJlcS5ib2R5LmNhbmRpZGF0ZU5hbWUsXG4gICAgXTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IHJvd3MgfSA9IGF3YWl0IGRiLnF1ZXJ5KGNyZWF0ZVF1ZXJ5LCB2YWx1ZXMpO1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAxKS5zZW5kKHtcbiAgICAgICAgc3RhdHVzOiAyMDEsXG4gICAgICAgIGRhdGE6IFt7XG4gICAgICAgICAgbWVzc2FnZTogJ0NhbmRpZGF0ZSBSZWdpc3RlcmVkJyxcbiAgICAgICAgICAnQ2FuZGlkYXRlLWlkJzogcm93c1swXS5jYW5kaWRhdGVJZCxcbiAgICAgICAgICBvZmZpY2U6IHJvd3NbMF0ub2ZmaWNlLFxuICAgICAgICAgIHVzZXI6IHJvd3NbMF0uY2FuZGlkYXRlLFxuXG4gICAgICAgIH1dLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBlcnJvcjogXCJZb3UgY2FuJ3QgcmVnaXN0ZXIgdGhpcyB1c2VyIGFzIGEgY2FuZGlkYXRlIHR3aWNlXCIsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFsbCBDYW5kaWRhdGVzXG4gICAqL1xuICBzdGF0aWMgYXN5bmMgZ2V0QWxsQ2FuZGlkYXRlcyhyZXMpIHtcbiAgICByZXMuc2V0SGVhZGVyKCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nLCAnKicpO1xuICAgIGNvbnN0IGZpbmRBbGxRdWVyeSA9ICdTRUxFQ1QgKiBGUk9NIGNhbmRpZGF0ZXMnO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IHJvd3MsIHJvd0NvdW50IH0gPSBhd2FpdCBkYi5xdWVyeShmaW5kQWxsUXVlcnkpO1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHtcbiAgICAgICAgc3RhdHVzOiAyMDAsXG4gICAgICAgIGRhdGE6IHJvd3MsXG4gICAgICAgIHJvd0NvdW50LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZChlcnJvcik7XG4gICAgfVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBDYW5kaWRhdGVzO1xuIl19