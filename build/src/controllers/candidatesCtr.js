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

                console.log(_context2.t0);
                return _context2.abrupt('return', res.status(400).send(_context2.t0));

              case 15:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy9jYW5kaWRhdGVzQ3RyLmpzIl0sIm5hbWVzIjpbIkNhbmRpZGF0ZXMiLCJyZXEiLCJyZXMiLCJzZXRIZWFkZXIiLCJib2R5Iiwib2ZmaWNlIiwicGFydHkiLCJzdGF0dXMiLCJzZW5kIiwiZXJyb3IiLCJjYW5kaWRhdGUiLCJjcmVhdGVRdWVyeSIsInZhbHVlcyIsIm9mZmljZU5hbWUiLCJwYXJ0eU5hbWUiLCJjYW5kaWRhdGVOYW1lIiwiZGIiLCJxdWVyeSIsInJvd3MiLCJkYXRhIiwibWVzc2FnZSIsImNhbmRpZGF0ZUlkIiwidXNlciIsImZpbmRBbGxRdWVyeSIsInJvd0NvdW50IiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7OztBQUVBOztJQUVNQSxVOzs7Ozs7OztBQUNKOzs7Ozs7OzJHQU1zQkMsRyxFQUFLQyxHOzs7Ozs7O0FBQ3pCQSxvQkFBSUMsU0FBSixDQUFjLDZCQUFkLEVBQTZDLEdBQTdDOztzQkFDSSxDQUFDRixJQUFJRyxJQUFKLENBQVNDLE1BQVYsSUFBb0IsQ0FBQ0osSUFBSUcsSUFBSixDQUFTRSxLOzs7OztpREFDekJKLElBQUlLLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUMxQkQsMEJBQVEsR0FEa0I7QUFFMUJFLHlCQUFPO0FBRm1CLGlCQUFyQixDOzs7b0JBS0pSLElBQUlHLElBQUosQ0FBU00sUzs7Ozs7aURBQ0xSLElBQUlLLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUMxQkMseUJBQU87QUFEbUIsaUJBQXJCLEM7OztBQUlIRSwyQjtBQUlBQyxzQixHQUFTLENBQ2Isa0JBRGEsRUFFYlgsSUFBSUcsSUFBSixDQUFTQyxNQUZJLEVBR2JKLElBQUlHLElBQUosQ0FBU1MsVUFISSxFQUliWixJQUFJRyxJQUFKLENBQVNFLEtBSkksRUFLYkwsSUFBSUcsSUFBSixDQUFTVSxTQUxJLEVBTWJiLElBQUlHLElBQUosQ0FBU00sU0FOSSxFQU9iVCxJQUFJRyxJQUFKLENBQVNXLGFBUEksQzs7O3VCQVdVQyxvQkFBR0MsS0FBSCxDQUFTTixXQUFULEVBQXNCQyxNQUF0QixDOzs7O0FBQWZNLG9CLFNBQUFBLEk7aURBQ0RoQixJQUFJSyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDMUJELDBCQUFRLEdBRGtCO0FBRTFCWSx3QkFBTSxDQUFDO0FBQ0xDLDZCQUFTLHNCQURKO0FBRUwsb0NBQWdCRixLQUFLLENBQUwsRUFBUUcsV0FGbkI7QUFHTGhCLDRCQUFRYSxLQUFLLENBQUwsRUFBUWIsTUFIWDtBQUlMaUIsMEJBQU1KLEtBQUssQ0FBTCxFQUFRUjs7QUFKVCxtQkFBRDtBQUZvQixpQkFBckIsQzs7Ozs7aURBV0FSLElBQUlLLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUMxQkQsMEJBQVEsR0FEa0I7QUFFMUJFLHlCQUFPO0FBRm1CLGlCQUFyQixDOzs7Ozs7Ozs7Ozs7Ozs7OztBQU9YOzs7Ozs7OzZHQUc4QlAsRzs7Ozs7OztBQUM1QkEsb0JBQUlDLFNBQUosQ0FBYyw2QkFBZCxFQUE2QyxHQUE3QztBQUNNb0IsNEIsR0FBZSwwQjs7O3VCQUVjUCxvQkFBR0MsS0FBSCxDQUFTTSxZQUFULEM7Ozs7QUFBekJMLG9CLFNBQUFBLEk7QUFBTU0sd0IsU0FBQUEsUTtrREFDUHRCLElBQUlLLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUMxQkQsMEJBQVEsR0FEa0I7QUFFMUJZLHdCQUFNRCxJQUZvQjtBQUcxQk07QUFIMEIsaUJBQXJCLEM7Ozs7OztBQU1QQyx3QkFBUUMsR0FBUjtrREFDT3hCLElBQUlLLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMUViOzs7a0JBOEVlUixVIiwiZmlsZSI6ImNhbmRpZGF0ZXNDdHIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXVpZHY0IGZyb20gJ3V1aWQvdjQnO1xuLy8gaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IGRiIGZyb20gJy4vZGF0YWJhc2VUYWJsZXMvZGJjb25uZWN0JztcblxuLy8gY29uc3QgcGFydHlNb2RlbCA9IG5ldyBQYXJ0eU1vZGVsKClcblxuY2xhc3MgQ2FuZGlkYXRlcyB7XG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge1ZhbHVlc30gcmVxIC0gcmVxdWVzdCB2YWx1ZXMgaW50byBrZXlzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXMgLSByZXF1ZXN0IG9iamVjdFxuICAgKiBAcmV0dXJucyB7YXJyYXl9IC0gcmV0dXJucyBhbGwga2V5IHZhbHVlIHBhaXJzIGFzIG9iamVjdCBpbiBhcnJheVxuICAgKi9cbiAgc3RhdGljIGFzeW5jIHJlZ2lzdGVyKHJlcSwgcmVzKSB7XG4gICAgcmVzLnNldEhlYWRlcignQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJywgJyonKTtcbiAgICBpZiAoIXJlcS5ib2R5Lm9mZmljZSAmJiAhcmVxLmJvZHkucGFydHkpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBlcnJvcjogJ1NvbWUgdmFsdWVzIGFyZSBtaXNzaW5nJyxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoIXJlcS5ib2R5LmNhbmRpZGF0ZSkge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICAgICAgZXJyb3I6IFwiY2FuZGlkYXRlIGZpZWxkIGNhbid0IGJlIGVtcHR5XCIsXG4gICAgICB9KTtcbiAgICB9XG4gICAgY29uc3QgY3JlYXRlUXVlcnkgPSBgSU5TRVJUIElOVE9cbiAgICAgIGNhbmRpZGF0ZXMoY2FuZGlkYXRlSWQsIG9mZmljZSwgb2ZmaWNlTmFtZSwgcGFydHksIHBhcnR5TmFtZSwgY2FuZGlkYXRlLCBjYW5kaWRhdGVOYW1lKVxuICAgICAgVkFMVUVTKCQxLCAkMiwgJDMsICQ0LCAkNSwgJDYsICQ3KVxuICAgICAgcmV0dXJuaW5nICpgO1xuICAgIGNvbnN0IHZhbHVlcyA9IFtcbiAgICAgIHV1aWR2NCgpLFxuICAgICAgcmVxLmJvZHkub2ZmaWNlLFxuICAgICAgcmVxLmJvZHkub2ZmaWNlTmFtZSxcbiAgICAgIHJlcS5ib2R5LnBhcnR5LFxuICAgICAgcmVxLmJvZHkucGFydHlOYW1lLFxuICAgICAgcmVxLmJvZHkuY2FuZGlkYXRlLFxuICAgICAgcmVxLmJvZHkuY2FuZGlkYXRlTmFtZSxcbiAgICBdO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgcm93cyB9ID0gYXdhaXQgZGIucXVlcnkoY3JlYXRlUXVlcnksIHZhbHVlcyk7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDEpLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IDIwMSxcbiAgICAgICAgZGF0YTogW3tcbiAgICAgICAgICBtZXNzYWdlOiAnQ2FuZGlkYXRlIFJlZ2lzdGVyZWQnLFxuICAgICAgICAgICdDYW5kaWRhdGUtaWQnOiByb3dzWzBdLmNhbmRpZGF0ZUlkLFxuICAgICAgICAgIG9mZmljZTogcm93c1swXS5vZmZpY2UsXG4gICAgICAgICAgdXNlcjogcm93c1swXS5jYW5kaWRhdGUsXG5cbiAgICAgICAgfV0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgIGVycm9yOiBcIllvdSBjYW4ndCByZWdpc3RlciB0aGlzIHVzZXIgYXMgYSBjYW5kaWRhdGUgdHdpY2VcIixcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYWxsIENhbmRpZGF0ZXNcbiAgICovXG4gIHN0YXRpYyBhc3luYyBnZXRBbGxDYW5kaWRhdGVzKHJlcykge1xuICAgIHJlcy5zZXRIZWFkZXIoJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbicsICcqJyk7XG4gICAgY29uc3QgZmluZEFsbFF1ZXJ5ID0gJ1NFTEVDVCAqIEZST00gY2FuZGlkYXRlcyc7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgcm93cywgcm93Q291bnQgfSA9IGF3YWl0IGRiLnF1ZXJ5KGZpbmRBbGxRdWVyeSk7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IDIwMCxcbiAgICAgICAgZGF0YTogcm93cyxcbiAgICAgICAgcm93Q291bnQsXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKGVycm9yKTtcbiAgICB9XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IENhbmRpZGF0ZXM7XG4iXX0=