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

var _partydb = require('../db/partydb');

var _partydb2 = _interopRequireDefault(_partydb);

var _dbconnect = require('./databaseTables/dbconnect');

var _dbconnect2 = _interopRequireDefault(_dbconnect);

var _userAuth = require('../helper/userAuth');

var _userAuth2 = _interopRequireDefault(_userAuth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const partyModel = new PartyModel()

// import PartyModel from '../models/party';
var Party = function () {
  function Party() {
    (0, _classCallCheck3.default)(this, Party);
  }

  (0, _createClass3.default)(Party, null, [{
    key: 'create',

    /**
     *
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
                if (!(!req.body.name && !req.body.hqaddress && !req.body.logoUrl)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return', res.status(400).send({
                  status: 400,
                  error: "Inputs fields can't be left empty"
                }));

              case 2:
                if (req.body.logoUrl) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt('return', res.status(400).send({
                  status: 400,
                  error: 'Logo field is empty'
                }));

              case 4:
                if (req.body.name) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt('return', res.status(400).send({
                  status: 400,
                  error: 'Party field is empty'
                }));

              case 6:
                if (req.body.hqaddress) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt('return', res.status(400).send({
                  status: 400,
                  error: 'Address field is empty'
                }));

              case 8:
                if (_userAuth2.default.isAddress(req.body.hqaddress)) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt('return', res.status(400).send({
                  status: 400,
                  error: 'Please enter a valid address'
                }));

              case 10:
                if (_userAuth2.default.isName(req.body.name)) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt('return', res.status(400).send({
                  status: 400,
                  error: 'Alphabets only'
                }));

              case 12:
                if (_userAuth2.default.isURL(req.body.logoUrl)) {
                  _context.next = 14;
                  break;
                }

                return _context.abrupt('return', res.status(400).send({
                  status: 400,
                  error: 'Incorrect URL. Use https://'
                }));

              case 14:
                check = 'SELECT * FROM party WHERE name=$1';
                name = req.body.name;
                _context.next = 18;
                return _dbconnect2.default.query(check, [name]);

              case 18:
                result = _context.sent;

                if (!(result.rowCount !== 0)) {
                  _context.next = 21;
                  break;
                }

                return _context.abrupt('return', res.status(400).send({
                  status: 400,
                  error: 'Party already exist'
                }));

              case 21:
                createQuery = 'INSERT INTO\n      party(id, name, hqaddress, logoUrl, created_date)\n      VALUES($1, $2, $3, $4, $5)\n      returning *';
                values = [(0, _v2.default)(), req.body.name, req.body.hqaddress, req.body.logoUrl, (0, _moment2.default)(new Date())];
                _context.prev = 23;
                _context.next = 26;
                return _dbconnect2.default.query(createQuery, values);

              case 26:
                _ref2 = _context.sent;
                rows = _ref2.rows;
                return _context.abrupt('return', res.status(201).send({
                  status: 201,
                  data: [{
                    message: 'party created',
                    order: rows[0]
                  }]
                }));

              case 31:
                _context.prev = 31;
                _context.t0 = _context['catch'](23);
                return _context.abrupt('return', res.status(400).send({
                  status: 400,
                  data: _context.t0
                }));

              case 34:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[23, 31]]);
      }));

      function create(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return create;
    }()

    /**
     * Get a specific party(users)
     * @param {uuid} id
     * @param {Object} res - request object
     * @returns {array} - returns specific party
     */

  }, {
    key: 'getAParty',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
        var id, text, _ref4, rows;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = req.params.id;

                if (_userAuth2.default.isUUID(id)) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt('return', res.status(400).send({
                  status: 400,
                  error: 'The user ID used is invalid'
                }));

              case 3:
                text = 'SELECT * FROM party WHERE id = $1';
                _context2.prev = 4;
                _context2.next = 7;
                return _dbconnect2.default.query(text, [id]);

              case 7:
                _ref4 = _context2.sent;
                rows = _ref4.rows;

                if (rows[0]) {
                  _context2.next = 11;
                  break;
                }

                return _context2.abrupt('return', res.status(404).send({ error: 'Party not found' }));

              case 11:
                return _context2.abrupt('return', res.status(200).send({
                  status: 201,
                  data: [{
                    order: rows[0]
                  }]
                }));

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2['catch'](4);
                return _context2.abrupt('return', res.status(400).send(_context2.t0));

              case 17:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 14]]);
      }));

      function getAParty(_x3, _x4) {
        return _ref3.apply(this, arguments);
      }

      return getAParty;
    }()

    /**
     * Get All parties(users)
     * @param {uuid} id
     * @param {Object} res - request object
     * @returns {array} - returns all key value pairs as object in array
     */
    // static getParties(req, res)  {
    //   return res.status(200).json({
    //     "status": 200,
    //     "data": partyDb
    //   });
    // }

  }, {
    key: 'getParties',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
        var findAllQuery, _ref6, rows, rowCount;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                findAllQuery = 'SELECT * FROM party';
                _context3.prev = 1;
                _context3.next = 4;
                return _dbconnect2.default.query(findAllQuery);

              case 4:
                _ref6 = _context3.sent;
                rows = _ref6.rows;
                rowCount = _ref6.rowCount;
                return _context3.abrupt('return', res.status(200).send({
                  status: 200,
                  data: rows,
                  rowCount: rowCount
                }));

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3['catch'](1);

                console.log(_context3.t0);
                return _context3.abrupt('return', res.status(400).send(_context3.t0));

              case 14:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 10]]);
      }));

      function getParties(_x5, _x6) {
        return _ref5.apply(this, arguments);
      }

      return getParties;
    }()

    /**
     * Edit a specific party(admin)
     * @param {object} req
     * @param {object} res
     * @returns {object} updated party
     */

  }, {
    key: 'update',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
        var findOneQuery, updateOneQuery, _ref8, rows, values, response;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (req.body.name) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt('return', res.status(400).send({
                  status: 400,
                  error: "Input field can't be left empty"
                }));

              case 2:
                findOneQuery = 'SELECT * FROM party WHERE id=$1';
                updateOneQuery = 'UPDATE party\n      SET name=$1 \n      WHERE id=$2 returning *';
                _context4.prev = 4;
                _context4.next = 7;
                return _dbconnect2.default.query(findOneQuery, [req.params.id]);

              case 7:
                _ref8 = _context4.sent;
                rows = _ref8.rows;

                if (rows[0]) {
                  _context4.next = 11;
                  break;
                }

                return _context4.abrupt('return', res.status(404).send({
                  status: 404,
                  error: 'Party not found'
                }));

              case 11:
                values = [req.body.name || rows[0].name, req.params.id];
                _context4.next = 14;
                return _dbconnect2.default.query(updateOneQuery, values);

              case 14:
                response = _context4.sent;
                return _context4.abrupt('return', res.status(200).send(response.rows[0]));

              case 18:
                _context4.prev = 18;
                _context4.t0 = _context4['catch'](4);
                return _context4.abrupt('return', res.status(400).send({
                  error: 'Oops, something wrong happened. Check and try again'
                }));

              case 21:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[4, 18]]);
      }));

      function update(_x7, _x8) {
        return _ref7.apply(this, arguments);
      }

      return update;
    }()

    /**
     * Delete party(admin)
     * @param {object} req
     * @param {object} res
     * @returns {void} return code 204
     */

  }, {
    key: 'delete',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
        var deleteQuery, _ref10, rows;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                deleteQuery = 'DELETE FROM party WHERE id=$1 returning *';
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
                  message: 'party not found'
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
  return Party;
}();

exports.default = Party;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy9wYXJ0eUN0ci5qcyJdLCJuYW1lcyI6WyJQYXJ0eSIsInJlcSIsInJlcyIsImJvZHkiLCJuYW1lIiwiaHFhZGRyZXNzIiwibG9nb1VybCIsInN0YXR1cyIsInNlbmQiLCJlcnJvciIsInVzZXJBdXRoSGVscGVyIiwiaXNBZGRyZXNzIiwiaXNOYW1lIiwiaXNVUkwiLCJjaGVjayIsImRiIiwicXVlcnkiLCJyZXN1bHQiLCJyb3dDb3VudCIsImNyZWF0ZVF1ZXJ5IiwidmFsdWVzIiwiRGF0ZSIsInJvd3MiLCJkYXRhIiwibWVzc2FnZSIsIm9yZGVyIiwiaWQiLCJwYXJhbXMiLCJpc1VVSUQiLCJ0ZXh0IiwiZmluZEFsbFF1ZXJ5IiwiY29uc29sZSIsImxvZyIsImZpbmRPbmVRdWVyeSIsInVwZGF0ZU9uZVF1ZXJ5IiwicmVzcG9uc2UiLCJkZWxldGVRdWVyeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7OztBQUVBOztBQUpBO0lBTU1BLEs7Ozs7Ozs7O0FBQ0o7Ozs7Ozs7MkdBTW9CQyxHLEVBQUtDLEc7Ozs7Ozs7c0JBQ25CLENBQUNELElBQUlFLElBQUosQ0FBU0MsSUFBVixJQUFrQixDQUFDSCxJQUFJRSxJQUFKLENBQVNFLFNBQTVCLElBQXlDLENBQUNKLElBQUlFLElBQUosQ0FBU0csTzs7Ozs7aURBQzlDSixJQUFJSyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDMUJELDBCQUFRLEdBRGtCO0FBRTFCRSx5QkFBTztBQUZtQixpQkFBckIsQzs7O29CQUtKUixJQUFJRSxJQUFKLENBQVNHLE87Ozs7O2lEQUNMSixJQUFJSyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDMUJELDBCQUFRLEdBRGtCO0FBRTFCRSx5QkFBTztBQUZtQixpQkFBckIsQzs7O29CQUtKUixJQUFJRSxJQUFKLENBQVNDLEk7Ozs7O2lEQUNMRixJQUFJSyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDMUJELDBCQUFRLEdBRGtCO0FBRTFCRSx5QkFBTztBQUZtQixpQkFBckIsQzs7O29CQUtKUixJQUFJRSxJQUFKLENBQVNFLFM7Ozs7O2lEQUNMSCxJQUFJSyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDMUJELDBCQUFRLEdBRGtCO0FBRTFCRSx5QkFBTztBQUZtQixpQkFBckIsQzs7O29CQUtKQyxtQkFBZUMsU0FBZixDQUF5QlYsSUFBSUUsSUFBSixDQUFTRSxTQUFsQyxDOzs7OztpREFDSUgsSUFBSUssTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQzFCRCwwQkFBUSxHQURrQjtBQUUxQkUseUJBQU87QUFGbUIsaUJBQXJCLEM7OztvQkFLSkMsbUJBQWVFLE1BQWYsQ0FBc0JYLElBQUlFLElBQUosQ0FBU0MsSUFBL0IsQzs7Ozs7aURBQ0lGLElBQUlLLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUMxQkQsMEJBQVEsR0FEa0I7QUFFMUJFLHlCQUFPO0FBRm1CLGlCQUFyQixDOzs7b0JBV0pDLG1CQUFlRyxLQUFmLENBQXFCWixJQUFJRSxJQUFKLENBQVNHLE9BQTlCLEM7Ozs7O2lEQUNJSixJQUFJSyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDMUJELDBCQUFRLEdBRGtCO0FBRTFCRSx5QkFBTztBQUZtQixpQkFBckIsQzs7O0FBS0RLLHFCLEdBQVEsbUM7QUFDUlYsb0IsR0FBU0gsSUFBSUUsSSxDQUFiQyxJOzt1QkFDYVcsb0JBQUdDLEtBQUgsQ0FBU0YsS0FBVCxFQUFnQixDQUFDVixJQUFELENBQWhCLEM7OztBQUFmYSxzQjs7c0JBQ0ZBLE9BQU9DLFFBQVAsS0FBb0IsQzs7Ozs7aURBQ2ZoQixJQUFJSyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDMUJELDBCQUFRLEdBRGtCO0FBRTFCRSx5QkFBTztBQUZtQixpQkFBckIsQzs7O0FBTUhVLDJCO0FBSUFDLHNCLEdBQVMsQ0FDYixrQkFEYSxFQUVibkIsSUFBSUUsSUFBSixDQUFTQyxJQUZJLEVBR2JILElBQUlFLElBQUosQ0FBU0UsU0FISSxFQUliSixJQUFJRSxJQUFKLENBQVNHLE9BSkksRUFLYixzQkFBTyxJQUFJZSxJQUFKLEVBQVAsQ0FMYSxDOzs7dUJBVVVOLG9CQUFHQyxLQUFILENBQVNHLFdBQVQsRUFBc0JDLE1BQXRCLEM7Ozs7QUFBZkUsb0IsU0FBQUEsSTtpREFDRHBCLElBQUlLLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUMxQkQsMEJBQVEsR0FEa0I7QUFFMUJnQix3QkFBTSxDQUFDO0FBQ0xDLDZCQUFTLGVBREo7QUFFTEMsMkJBQU9ILEtBQUssQ0FBTDtBQUZGLG1CQUFEO0FBRm9CLGlCQUFyQixDOzs7OztpREFRQXBCLElBQUlLLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUMxQkQsMEJBQVEsR0FEa0I7QUFFMUJnQjtBQUYwQixpQkFBckIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPWDs7Ozs7Ozs7Ozs2R0FNdUJ0QixHLEVBQUtDLEc7Ozs7Ozs7QUFDbEJ3QixrQixHQUFPekIsSUFBSTBCLE0sQ0FBWEQsRTs7b0JBQ0hoQixtQkFBZWtCLE1BQWYsQ0FBc0JGLEVBQXRCLEM7Ozs7O2tEQUNJeEIsSUFBSUssTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQzFCRCwwQkFBUSxHQURrQjtBQUUxQkUseUJBQU87QUFGbUIsaUJBQXJCLEM7OztBQUtIb0Isb0IsR0FBTyxtQzs7O3VCQUVZZCxvQkFBR0MsS0FBSCxDQUFTYSxJQUFULEVBQWUsQ0FBQ0gsRUFBRCxDQUFmLEM7Ozs7QUFBZkosb0IsU0FBQUEsSTs7b0JBRUhBLEtBQUssQ0FBTCxDOzs7OztrREFDSXBCLElBQUlLLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQixFQUFFQyxPQUFPLGlCQUFULEVBQXJCLEM7OztrREFLRlAsSUFBSUssTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQzFCRCwwQkFBUSxHQURrQjtBQUUxQmdCLHdCQUFNLENBQUM7QUFDTEUsMkJBQU9ILEtBQUssQ0FBTDtBQURGLG1CQUFEO0FBRm9CLGlCQUFyQixDOzs7OztrREFPQXBCLElBQUlLLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixjOzs7Ozs7Ozs7Ozs7Ozs7OztBQUlYOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OzZHQUN3QlAsRyxFQUFLQyxHOzs7Ozs7O0FBQ3JCNEIsNEIsR0FBZSxxQjs7O3VCQUVjZixvQkFBR0MsS0FBSCxDQUFTYyxZQUFULEM7Ozs7QUFBekJSLG9CLFNBQUFBLEk7QUFBTUosd0IsU0FBQUEsUTtrREFDUGhCLElBQUlLLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUMxQkQsMEJBQVEsR0FEa0I7QUFFMUJnQix3QkFBTUQsSUFGb0I7QUFHMUJKO0FBSDBCLGlCQUFyQixDOzs7Ozs7QUFNUGEsd0JBQVFDLEdBQVI7a0RBQ085QixJQUFJSyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsYzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJWDs7Ozs7Ozs7Ozs2R0FNb0JQLEcsRUFBS0MsRzs7Ozs7OztvQkFDbEJELElBQUlFLElBQUosQ0FBU0MsSTs7Ozs7a0RBQ0xGLElBQUlLLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUMxQkQsMEJBQVEsR0FEa0I7QUFFMUJFLHlCQUFPO0FBRm1CLGlCQUFyQixDOzs7QUFNSHdCLDRCLEdBQWUsaUM7QUFDZkMsOEI7Ozt1QkFLbUJuQixvQkFBR0MsS0FBSCxDQUFTaUIsWUFBVCxFQUF1QixDQUFDaEMsSUFBSTBCLE1BQUosQ0FBV0QsRUFBWixDQUF2QixDOzs7O0FBQWZKLG9CLFNBQUFBLEk7O29CQUNIQSxLQUFLLENBQUwsQzs7Ozs7a0RBQ0lwQixJQUFJSyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDMUJELDBCQUFRLEdBRGtCO0FBRTFCRSx5QkFBTztBQUZtQixpQkFBckIsQzs7O0FBS0hXLHNCLEdBQVMsQ0FDYm5CLElBQUlFLElBQUosQ0FBU0MsSUFBVCxJQUFpQmtCLEtBQUssQ0FBTCxFQUFRbEIsSUFEWixFQUViSCxJQUFJMEIsTUFBSixDQUFXRCxFQUZFLEM7O3VCQUlRWCxvQkFBR0MsS0FBSCxDQUFTa0IsY0FBVCxFQUF5QmQsTUFBekIsQzs7O0FBQWpCZSx3QjtrREFDQ2pDLElBQUlLLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjJCLFNBQVNiLElBQVQsQ0FBYyxDQUFkLENBQXJCLEM7Ozs7O2tEQUVBcEIsSUFBSUssTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQzFCQyx5QkFBTztBQURtQixpQkFBckIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNWDs7Ozs7Ozs7Ozs2R0FNb0JSLEcsRUFBS0MsRzs7Ozs7OztBQUNqQmtDLDJCLEdBQWMsMkM7Ozt1QkFFS3JCLG9CQUFHQyxLQUFILENBQVNvQixXQUFULEVBQXNCLENBQUNuQyxJQUFJMEIsTUFBSixDQUFXRCxFQUFaLENBQXRCLEM7Ozs7QUFBZkosb0IsVUFBQUEsSTs7b0JBRUhBLEtBQUssQ0FBTCxDOzs7OztrREFDSXBCLElBQUlLLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUMxQkMseUJBQU8sR0FEbUI7QUFFMUJlLDJCQUFTO0FBRmlCLGlCQUFyQixDOzs7a0RBS0Z0QixJQUFJSyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDMUJlLHdCQUFNO0FBRG9CLGlCQUFyQixDOzs7OztrREFLQXJCLElBQUlLLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUMxQkMseUJBQU87QUFEbUIsaUJBQXJCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQU1FVCxLIiwiZmlsZSI6InBhcnR5Q3RyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgdXVpZHY0IGZyb20gJ3V1aWQvdjQnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHBhcnR5RGIgZnJvbSAnLi4vZGIvcGFydHlkYic7XG4vLyBpbXBvcnQgUGFydHlNb2RlbCBmcm9tICcuLi9tb2RlbHMvcGFydHknO1xuaW1wb3J0IGRiIGZyb20gXCIuL2RhdGFiYXNlVGFibGVzL2RiY29ubmVjdFwiO1xuaW1wb3J0IHVzZXJBdXRoSGVscGVyIGZyb20gJy4uL2hlbHBlci91c2VyQXV0aCc7XG5cbi8vIGNvbnN0IHBhcnR5TW9kZWwgPSBuZXcgUGFydHlNb2RlbCgpXG5cbmNsYXNzIFBhcnR5IHtcbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7VmFsdWVzfSByZXEgLSByZXF1ZXN0IHZhbHVlcyBpbnRvIGtleXNcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlcyAtIHJlcXVlc3Qgb2JqZWN0XG4gICAqIEByZXR1cm5zIHthcnJheX0gLSByZXR1cm5zIGFsbCBrZXkgdmFsdWUgcGFpcnMgYXMgb2JqZWN0IGluIGFycmF5XG4gICAqL1xuICBzdGF0aWMgYXN5bmMgY3JlYXRlKHJlcSwgcmVzKSB7XG4gICAgaWYgKCFyZXEuYm9keS5uYW1lICYmICFyZXEuYm9keS5ocWFkZHJlc3MgJiYgIXJlcS5ib2R5LmxvZ29VcmwpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBlcnJvcjogXCJJbnB1dHMgZmllbGRzIGNhbid0IGJlIGxlZnQgZW1wdHlcIixcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoIXJlcS5ib2R5LmxvZ29VcmwpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBlcnJvcjogJ0xvZ28gZmllbGQgaXMgZW1wdHknLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICghcmVxLmJvZHkubmFtZSkge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgIGVycm9yOiAnUGFydHkgZmllbGQgaXMgZW1wdHknLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICghcmVxLmJvZHkuaHFhZGRyZXNzKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgZXJyb3I6ICdBZGRyZXNzIGZpZWxkIGlzIGVtcHR5JyxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoIXVzZXJBdXRoSGVscGVyLmlzQWRkcmVzcyhyZXEuYm9keS5ocWFkZHJlc3MpKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgZXJyb3I6ICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBhZGRyZXNzJyxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoIXVzZXJBdXRoSGVscGVyLmlzTmFtZShyZXEuYm9keS5uYW1lKSkge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgIGVycm9yOiAnQWxwaGFiZXRzIG9ubHknLFxuICAgICAgfSk7XG4gICAgfVxuICAgIC8vIGlmICghdXNlckF1dGhIZWxwZXIuaXNIaWdoZXIocmVxLmJvZHkubmFtZSwgcmVxLmJvZHkuaHFhZGRyZXNzKSkge1xuICAgIC8vICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICAvLyAgICAgXCJzdGF0dXNcIjogNDAwLFxuICAgIC8vICAgICBcImVycm9yXCI6IFwiQWxwaGFiZXRzIG9ubHlcIlxuICAgIC8vICAgfSlcbiAgICAvLyAgICAgfTtcbiAgICBpZiAoIXVzZXJBdXRoSGVscGVyLmlzVVJMKHJlcS5ib2R5LmxvZ29VcmwpKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgZXJyb3I6ICdJbmNvcnJlY3QgVVJMLiBVc2UgaHR0cHM6Ly8nLFxuICAgICAgfSk7XG4gICAgfVxuICAgICAgY29uc3QgY2hlY2sgPSAnU0VMRUNUICogRlJPTSBwYXJ0eSBXSEVSRSBuYW1lPSQxJztcbiAgICBjb25zdCB7IG5hbWUgfSA9IHJlcS5ib2R5O1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGRiLnF1ZXJ5KGNoZWNrLCBbbmFtZV0pO1xuICAgIGlmIChyZXN1bHQucm93Q291bnQgIT09IDApIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBlcnJvcjogJ1BhcnR5IGFscmVhZHkgZXhpc3QnLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgY3JlYXRlUXVlcnkgPSBgSU5TRVJUIElOVE9cbiAgICAgIHBhcnR5KGlkLCBuYW1lLCBocWFkZHJlc3MsIGxvZ29VcmwsIGNyZWF0ZWRfZGF0ZSlcbiAgICAgIFZBTFVFUygkMSwgJDIsICQzLCAkNCwgJDUpXG4gICAgICByZXR1cm5pbmcgKmA7XG4gICAgY29uc3QgdmFsdWVzID0gW1xuICAgICAgdXVpZHY0KCksXG4gICAgICByZXEuYm9keS5uYW1lLFxuICAgICAgcmVxLmJvZHkuaHFhZGRyZXNzLFxuICAgICAgcmVxLmJvZHkubG9nb1VybCxcbiAgICAgIG1vbWVudChuZXcgRGF0ZSgpKSxcbiAgICBdO1xuXG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgeyByb3dzIH0gPSBhd2FpdCBkYi5xdWVyeShjcmVhdGVRdWVyeSwgdmFsdWVzKTtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMSkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogMjAxLFxuICAgICAgICBkYXRhOiBbe1xuICAgICAgICAgIG1lc3NhZ2U6ICdwYXJ0eSBjcmVhdGVkJyxcbiAgICAgICAgICBvcmRlcjogcm93c1swXSxcbiAgICAgICAgfV0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgIGRhdGE6IGVycm9yLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIHNwZWNpZmljIHBhcnR5KHVzZXJzKVxuICAgKiBAcGFyYW0ge3V1aWR9IGlkXG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXMgLSByZXF1ZXN0IG9iamVjdFxuICAgKiBAcmV0dXJucyB7YXJyYXl9IC0gcmV0dXJucyBzcGVjaWZpYyBwYXJ0eVxuICAgKi9cbiAgc3RhdGljIGFzeW5jIGdldEFQYXJ0eShyZXEsIHJlcykge1xuICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5wYXJhbXM7XG4gICAgaWYgKCF1c2VyQXV0aEhlbHBlci5pc1VVSUQoaWQpKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgZXJyb3I6ICdUaGUgdXNlciBJRCB1c2VkIGlzIGludmFsaWQnLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IHRleHQgPSAnU0VMRUNUICogRlJPTSBwYXJ0eSBXSEVSRSBpZCA9ICQxJztcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyByb3dzIH0gPSBhd2FpdCBkYi5xdWVyeSh0ZXh0LCBbaWRdKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHBhcnR5X2lkKTtcbiAgICAgIGlmICghcm93c1swXSkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLnNlbmQoeyBlcnJvcjogJ1BhcnR5IG5vdCBmb3VuZCcgfSk7XG4gICAgICB9XG4gICAgICAvLyBpZihyZXEuYm9keS5wYXJhbXMgIT09IHJvd3NbMF0uaWQpe1xuICAgICAgLy8gICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLnNlbmQoe1wiZXJyb3JcIjogXCJZb3VyIGlkIGlzIHdyb25nXCJ9KTtcbiAgICAgIC8vIH1cbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogMjAxLFxuICAgICAgICBkYXRhOiBbe1xuICAgICAgICAgIG9yZGVyOiByb3dzWzBdLFxuICAgICAgICB9XSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgQWxsIHBhcnRpZXModXNlcnMpXG4gICAqIEBwYXJhbSB7dXVpZH0gaWRcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlcyAtIHJlcXVlc3Qgb2JqZWN0XG4gICAqIEByZXR1cm5zIHthcnJheX0gLSByZXR1cm5zIGFsbCBrZXkgdmFsdWUgcGFpcnMgYXMgb2JqZWN0IGluIGFycmF5XG4gICAqL1xuICAvLyBzdGF0aWMgZ2V0UGFydGllcyhyZXEsIHJlcykgIHtcbiAgLy8gICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAvLyAgICAgXCJzdGF0dXNcIjogMjAwLFxuICAvLyAgICAgXCJkYXRhXCI6IHBhcnR5RGJcbiAgLy8gICB9KTtcbiAgLy8gfVxuICBzdGF0aWMgYXN5bmMgZ2V0UGFydGllcyhyZXEsIHJlcykge1xuICAgIGNvbnN0IGZpbmRBbGxRdWVyeSA9ICdTRUxFQ1QgKiBGUk9NIHBhcnR5JztcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyByb3dzLCByb3dDb3VudCB9ID0gYXdhaXQgZGIucXVlcnkoZmluZEFsbFF1ZXJ5KTtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuc2VuZCh7XG4gICAgICAgIHN0YXR1czogMjAwLFxuICAgICAgICBkYXRhOiByb3dzLFxuICAgICAgICByb3dDb3VudCxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFZGl0IGEgc3BlY2lmaWMgcGFydHkoYWRtaW4pXG4gICAqIEBwYXJhbSB7b2JqZWN0fSByZXFcbiAgICogQHBhcmFtIHtvYmplY3R9IHJlc1xuICAgKiBAcmV0dXJucyB7b2JqZWN0fSB1cGRhdGVkIHBhcnR5XG4gICAqL1xuICBzdGF0aWMgYXN5bmMgdXBkYXRlKHJlcSwgcmVzKSB7XG4gICAgaWYgKCFyZXEuYm9keS5uYW1lKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgZXJyb3I6IFwiSW5wdXQgZmllbGQgY2FuJ3QgYmUgbGVmdCBlbXB0eVwiLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgZmluZE9uZVF1ZXJ5ID0gJ1NFTEVDVCAqIEZST00gcGFydHkgV0hFUkUgaWQ9JDEnO1xuICAgIGNvbnN0IHVwZGF0ZU9uZVF1ZXJ5ID0gYFVQREFURSBwYXJ0eVxuICAgICAgU0VUIG5hbWU9JDEgXG4gICAgICBXSEVSRSBpZD0kMiByZXR1cm5pbmcgKmA7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgeyByb3dzIH0gPSBhd2FpdCBkYi5xdWVyeShmaW5kT25lUXVlcnksIFtyZXEucGFyYW1zLmlkXSk7XG4gICAgICBpZiAoIXJvd3NbMF0pIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5zZW5kKHtcbiAgICAgICAgICBzdGF0dXM6IDQwNCxcbiAgICAgICAgICBlcnJvcjogJ1BhcnR5IG5vdCBmb3VuZCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgY29uc3QgdmFsdWVzID0gW1xuICAgICAgICByZXEuYm9keS5uYW1lIHx8IHJvd3NbMF0ubmFtZSxcbiAgICAgICAgcmVxLnBhcmFtcy5pZCxcbiAgICAgIF07XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRiLnF1ZXJ5KHVwZGF0ZU9uZVF1ZXJ5LCB2YWx1ZXMpO1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHJlc3BvbnNlLnJvd3NbMF0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICAgICAgZXJyb3I6ICdPb3BzLCBzb21ldGhpbmcgd3JvbmcgaGFwcGVuZWQuIENoZWNrIGFuZCB0cnkgYWdhaW4nLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBwYXJ0eShhZG1pbilcbiAgICogQHBhcmFtIHtvYmplY3R9IHJlcVxuICAgKiBAcGFyYW0ge29iamVjdH0gcmVzXG4gICAqIEByZXR1cm5zIHt2b2lkfSByZXR1cm4gY29kZSAyMDRcbiAgICovXG4gIHN0YXRpYyBhc3luYyBkZWxldGUocmVxLCByZXMpIHtcbiAgICBjb25zdCBkZWxldGVRdWVyeSA9ICdERUxFVEUgRlJPTSBwYXJ0eSBXSEVSRSBpZD0kMSByZXR1cm5pbmcgKic7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgcm93cyB9ID0gYXdhaXQgZGIucXVlcnkoZGVsZXRlUXVlcnksIFtyZXEucGFyYW1zLmlkXSk7XG5cbiAgICAgIGlmICghcm93c1swXSkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLnNlbmQoe1xuICAgICAgICAgIGVycm9yOiA0MDQsXG4gICAgICAgICAgbWVzc2FnZTogJ3BhcnR5IG5vdCBmb3VuZCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDEwKS5zZW5kKHtcbiAgICAgICAgZGF0YTogJ2RlbGV0ZWQnLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIGVycm9yOiAnT29wcywgc29tZXRoaW5nIHdyb25nIGhhcHBlbmVkLiBDaGVjayBhbmQgdHJ5IGFnYWluJyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgUGFydHk7XG4iXX0=