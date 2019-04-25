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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy92b3Rlc0N0ci5qcyJdLCJuYW1lcyI6WyJWb3RlcyIsInJlcSIsInJlcyIsImJvZHkiLCJjcmVhdGVkX2J5Iiwib2ZmaWNlIiwiY2FuZGlkYXRlIiwic3RhdHVzIiwic2VuZCIsInVzZXJBdXRoSGVscGVyIiwiaXNXaGl0ZVNwYWNlIiwiY3JlYXRlUXVlcnkiLCJ2YWx1ZXMiLCJEYXRlIiwidXNlck5hbWUiLCJvZmZpY2VOYW1lIiwiY2FuZGlkYXRlTmFtZSIsImRiIiwicXVlcnkiLCJyb3dzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7OztBQUNBO0FBQ0E7O0FBRUE7O0FBTkE7SUFRTUEsSzs7Ozs7Ozs7QUFDSjs7Ozs7OzsyR0FNbUJDLEcsRUFBS0MsRzs7Ozs7OztzQkFHbEIsQ0FBQ0QsSUFBSUUsSUFBSixDQUFTQyxVQUFWLElBQXlCLENBQUNILElBQUlFLElBQUosQ0FBU0UsTUFBbkMsSUFBNkMsQ0FBQ0osSUFBSUUsSUFBSixDQUFTRyxTOzs7OztpREFDbERKLElBQUlLLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUN4Qiw0QkFBVSxHQURjO0FBRXhCLDJCQUFTO0FBRmUsaUJBQXJCLEM7OztvQkFLSkMsbUJBQWVDLFlBQWYsQ0FBNEJULElBQUlFLElBQUosQ0FBU0MsVUFBckMsRUFBaURILElBQUlFLElBQUosQ0FBU0UsTUFBMUQsRUFBa0VKLEdBQWxFLEVBQXVFQSxJQUFJRSxJQUFKLENBQVNHLFNBQWhGLEM7Ozs7O2lEQUNJSixJQUFJSyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDeEIsNEJBQVUsR0FEYztBQUV4QiwyQkFBUztBQUZlLGlCQUFyQixDOzs7QUFNSEcsMkI7QUFJQUMsc0IsR0FBUyxDQUNiLGtCQURhLEVBRWIsc0JBQU8sSUFBSUMsSUFBSixFQUFQLENBRmEsRUFHYlosSUFBSUUsSUFBSixDQUFTQyxVQUhJLEVBSWJILElBQUlFLElBQUosQ0FBU1csUUFKSSxFQUtiYixJQUFJRSxJQUFKLENBQVNFLE1BTEksRUFNYkosSUFBSUUsSUFBSixDQUFTWSxVQU5JLEVBT2JkLElBQUlFLElBQUosQ0FBU0csU0FQSSxFQVFiTCxJQUFJRSxJQUFKLENBQVNhLGFBUkksQztBQVVmOzs7O3VCQUd5QkMsb0JBQUdDLEtBQUgsQ0FBU1AsV0FBVCxFQUFzQkMsTUFBdEIsQzs7OztBQUFmTyxvQixTQUFBQSxJO2lEQUNEakIsSUFBSUssTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQzFCLDRCQUFVLEdBRGdCO0FBRTFCLDBCQUFRLENBQUM7QUFDUCwrQkFBVyxlQURKO0FBRVAsNEJBQVE7QUFDUCxnQ0FBU1csS0FBSyxDQUFMLEVBQVFkLE1BRFY7QUFFUCxtQ0FBWWMsS0FBSyxDQUFMLEVBQVFiLFNBRmI7QUFHUCwrQkFBUWEsS0FBSyxDQUFMLEVBQVFmO0FBSFQ7QUFGRCxtQkFBRDtBQUZrQixpQkFBckIsQzs7Ozs7aURBYUFGLElBQUlLLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUMxQiw0QkFBVSxHQURnQjtBQUUxQiwyQkFBUyxDQUFDO0FBQ1IsK0JBQVcsK0VBREg7QUFFUixrQ0FBYyxtQkFGTjtBQUdSLDhCQUFVLDBCQUhGO0FBSVIsaUNBQWE7QUFKTCxtQkFBRDtBQUZpQixpQkFBckIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBWUVSLEsiLCJmaWxlIjoidm90ZXNDdHIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXVpZHY0IGZyb20gJ3V1aWQvdjQnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuLy8gaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IGRiIGZyb20gJy4uL2NvbnRyb2xsZXJzL2RhdGFiYXNlVGFibGVzL2RiY29ubmVjdCc7XG5pbXBvcnQgdXNlckF1dGhIZWxwZXIgZnJvbSAnLi4vaGVscGVyL3VzZXJBdXRoJztcbi8vIGltcG9ydCB1c2VyQXV0aCBmcm9tICcuLi9oZWxwZXIvdXNlckF1dGgnO1xuLy8gaW1wb3J0IHsgcmVxdWVzdCB9IGZyb20gJ2h0dHAnO1xuXG4vLyBjb25zdCBwYXJ0eU1vZGVsID0gbmV3IFBhcnR5TW9kZWwoKVxuXG5jbGFzcyBWb3Rlc3tcbiAgLyoqXG4gICAqIFxuICAgKiBAcGFyYW0ge1ZhbHVlc30gcmVxIC0gcmVxdWVzdCB2YWx1ZXMgaW50byBrZXlzIFxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVzIC0gcmVxdWVzdCBvYmplY3RcbiAgICogQHJldHVybnMge2FycmF5fSAtIHJldHVybnMgYWxsIGtleSB2YWx1ZSBwYWlycyBhcyBvYmplY3QgaW4gYXJyYXlcbiAgICovXG4gIHN0YXRpYyBhc3luYyB2b3RlcyhyZXEsIHJlcykge1xuXG4gICAgLy8gY29uc3QgeyBjcmVhdGVkX2J5LCBvZmZpY2UsIGNhbmRpZGF0ZSB9ID0gcmVxLmJvZHk7XG4gICAgaWYgKCFyZXEuYm9keS5jcmVhdGVkX2J5ICAmJiAhcmVxLmJvZHkub2ZmaWNlICYmICFyZXEuYm9keS5jYW5kaWRhdGUpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7IFxuICAgICAgICAgIFwic3RhdHVzXCI6IDQwMCwgXG4gICAgICAgICAgXCJlcnJvclwiOiBcIlNvbWUgdmFsdWVzIGFyZSBtaXNzaW5nXCIgXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKCF1c2VyQXV0aEhlbHBlci5pc1doaXRlU3BhY2UocmVxLmJvZHkuY3JlYXRlZF9ieSwgcmVxLmJvZHkub2ZmaWNlLCByZXEsIHJlcS5ib2R5LmNhbmRpZGF0ZSkpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7IFxuICAgICAgICAgIFwic3RhdHVzXCI6IDQwMCwgXG4gICAgICAgICAgXCJlcnJvclwiOiBcIldoaXRlIFNwYWNlIGFyZSBub3QgYWxsb3dlZCBpbiBpbnB1dCBmaWVsZHNcIiBcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IGNyZWF0ZVF1ZXJ5ID0gYElOU0VSVCBJTlRPXG4gICAgICB2b3RlcyhpZCwgY3JlYXRlZF9vbiwgY3JlYXRlZF9ieSwgdXNlck5hbWUsIG9mZmljZSwgb2ZmaWNlTmFtZSwgY2FuZGlkYXRlLCBjYW5kaWRhdGVOYW1lKVxuICAgICAgVkFMVUVTKCQxLCAkMiwgJDMsICQ0LCAkNSwgJDYsICQ3LCAkOClcbiAgICAgIHJldHVybmluZyAqYDtcbiAgICBjb25zdCB2YWx1ZXMgPSBbXG4gICAgICB1dWlkdjQoKSxcbiAgICAgIG1vbWVudChuZXcgRGF0ZSgpKSxcbiAgICAgIHJlcS5ib2R5LmNyZWF0ZWRfYnksXG4gICAgICByZXEuYm9keS51c2VyTmFtZSxcbiAgICAgIHJlcS5ib2R5Lm9mZmljZSxcbiAgICAgIHJlcS5ib2R5Lm9mZmljZU5hbWUsXG4gICAgICByZXEuYm9keS5jYW5kaWRhdGUsXG4gICAgICByZXEuYm9keS5jYW5kaWRhdGVOYW1lXG4gICAgXTtcbiAgICAvLyBjb25zb2xlLmxvZyh2YWx1ZXMpXG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgeyByb3dzIH0gPSBhd2FpdCBkYi5xdWVyeShjcmVhdGVRdWVyeSwgdmFsdWVzKTtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMSkuc2VuZCh7XG4gICAgICAgIFwic3RhdHVzXCI6IDIwMSxcbiAgICAgICAgXCJkYXRhXCI6IFt7XG4gICAgICAgICAgXCJtZXNzYWdlXCI6IFwiVm90ZSBjb21wbGV0ZVwiLFxuICAgICAgICAgIFwiZGF0YVwiOiB7XG4gICAgICAgICAgIFwib2ZmaWNlXCI6cm93c1swXS5vZmZpY2UsXG4gICAgICAgICAgIFwiY2FuZGlkYXRlXCI6cm93c1swXS5jYW5kaWRhdGUsXG4gICAgICAgICAgIFwidm90ZXJcIjpyb3dzWzBdLmNyZWF0ZWRfYnlcbiAgICAgICAgICB9XG4gICAgICAgIH1dLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaChlcnJvcikge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhlcnJvcilcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIFwic3RhdHVzXCI6IDQwMCxcbiAgICAgICAgXCJlcnJvclwiOiBbe1xuICAgICAgICAgIFwibWVzc2FnZVwiOiBcIllvdSBoYXZlIGFscmVhZHkgdm90ZWQgZm9yIHRoaXMgb2ZmaWNlIG9yIHRoZXJlIHdhcyBhbiBlcnJvciB3aXRoIHlvdXIgaW5wdXRzXCIsXG4gICAgICAgICAgXCJDcmVhdGVkX2J5XCI6IFwic2hvdWxkIGJlIHlvdXIgaWRcIixcbiAgICAgICAgICBcIm9mZmljZVwiOiBcInNob3VsZCBiZSB5b3VyIG9mZmljZSBpZFwiLFxuICAgICAgICAgIFwiY2FuZGlkYXRlXCI6IFwic2hvdWxkIGJlIHlvdXIgY2FuZGlkYXRlIGlkXCJcbiAgICAgICAgfV1cbiAgICAgIH0pXG4gICAgIH1cbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgVm90ZXM7IFxuIl19