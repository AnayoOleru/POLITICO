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

var _dbconnect = require('../controllers/databaseTables/dbconnect');

var _dbconnect2 = _interopRequireDefault(_dbconnect);

var _userAuth = require('../helper/userAuth');

var _userAuth2 = _interopRequireDefault(_userAuth);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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
                  "status": 400,
                  "error": "Inputs fields can't be left empty"
                }));

              case 2:
                if (req.body.logoUrl) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt('return', res.status(400).send({
                  "status": 400,
                  "error": "Logo field is empty"
                }));

              case 4:
                if (req.body.name) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt('return', res.status(400).send({
                  "status": 400,
                  "error": "Party field is empty"
                }));

              case 6:
                if (req.body.hqaddress) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt('return', res.status(400).send({
                  "status": 400,
                  "error": "Address field is empty"
                }));

              case 8:
                if (_userAuth2.default.isAddress(req.body.hqaddress)) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt('return', res.status(400).send({
                  "status": 400,
                  "error": "Please enter a valid address"
                }));

              case 10:
                if (_userAuth2.default.isName(req.body.name)) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt('return', res.status(400).send({
                  "status": 400,
                  "error": "Alphabets only"
                }));

              case 12:
                if (_userAuth2.default.isURL(req.body.logoUrl)) {
                  _context.next = 14;
                  break;
                }

                return _context.abrupt('return', res.status(400).send({
                  "status": 400,
                  "error": "Incorrect URL. Use https://"
                }));

              case 14:
                ;
                check = 'SELECT * FROM party WHERE name=$1';
                name = req.body.name;
                _context.next = 19;
                return _dbconnect2.default.query(check, [name]);

              case 19:
                result = _context.sent;

                if (!(result.rowCount !== 0)) {
                  _context.next = 22;
                  break;
                }

                return _context.abrupt('return', res.status(400).send({
                  "status": 400,
                  "error": "Party already exist"
                }));

              case 22:
                createQuery = 'INSERT INTO\n      party(id, name, hqaddress, logoUrl, created_date)\n      VALUES($1, $2, $3, $4, $5)\n      returning *';
                values = [(0, _v2.default)(), req.body.name, req.body.hqaddress, req.body.logoUrl, (0, _moment2.default)(new Date())];
                _context.prev = 24;
                _context.next = 27;
                return _dbconnect2.default.query(createQuery, values);

              case 27:
                _ref2 = _context.sent;
                rows = _ref2.rows;
                return _context.abrupt('return', res.status(201).send({
                  "status": 201,
                  "data": [{
                    "message": "party created",
                    "order": rows[0]
                  }]
                }));

              case 32:
                _context.prev = 32;
                _context.t0 = _context['catch'](24);
                return _context.abrupt('return', res.status(400).send({
                  "status": 400,
                  "data": _context.t0
                }));

              case 35:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[24, 32]]);
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
                  "status": 400,
                  "error": "The user ID used is invalid"
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

                return _context2.abrupt('return', res.status(404).send({ "error": "Party not found" }));

              case 11:
                return _context2.abrupt('return', res.status(200).send({
                  "status": 201,
                  "data": [{
                    "order": rows[0]
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
                  "status": 200,
                  "data": rows, rowCount: rowCount
                }));

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3['catch'](1);
                return _context3.abrupt('return', res.status(400).send(_context3.t0));

              case 13:
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
                  "status": 400,
                  "error": "Input field can't be left empty"
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
                  "status": 404,
                  "error": "Party not found"
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
                  "error": "Oops, something wrong happened. Check and try again"
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
                  "error": 404,
                  "message": "party not found"
                }));

              case 8:
                return _context5.abrupt('return', res.status(410).send({
                  "data": "deleted"
                }));

              case 11:
                _context5.prev = 11;
                _context5.t0 = _context5['catch'](1);
                return _context5.abrupt('return', res.status(400).send({
                  "error": "Oops, something wrong happened. Check and try again"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy9wYXJ0eUN0ci5qcyJdLCJuYW1lcyI6WyJQYXJ0eSIsInJlcSIsInJlcyIsImxvZ29VcmwiLCJuYW1lIiwiaHFhZGRyZXNzIiwidXNlckF1dGhIZWxwZXIiLCJjaGVjayIsInJlc3VsdCIsImRiIiwiY3JlYXRlUXVlcnkiLCJ2YWx1ZXMiLCJyb3dzIiwiaWQiLCJ0ZXh0IiwiZmluZEFsbFF1ZXJ5Iiwicm93Q291bnQiLCJmaW5kT25lUXVlcnkiLCJ1cGRhdGVPbmVRdWVyeSIsInJlc3BvbnNlIiwiZGVsZXRlUXVlcnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxJQUFBLEtBQUEsUUFBQSxTQUFBLENBQUE7Ozs7QUFDQSxJQUFBLFVBQUEsUUFBQSxRQUFBLENBQUE7Ozs7QUFDQSxJQUFBLFdBQUEsUUFBQSxlQUFBLENBQUE7Ozs7QUFFQSxJQUFBLGFBQUEsUUFBQSx5Q0FBQSxDQUFBOzs7O0FBQ0EsSUFBQSxZQUFBLFFBQUEsb0JBQUEsQ0FBQTs7Ozs7Ozs7QUFFQTs7QUFKQTtJQU1NQSxROzs7Ozs7OztBQUNKOzs7Ozs7OzJHQU1vQkMsRyxFQUFLQyxHOzs7Ozs7O3NCQUNwQixDQUFDRCxJQUFBQSxJQUFBQSxDQUFELElBQUEsSUFBa0IsQ0FBQ0EsSUFBQUEsSUFBQUEsQ0FBbkIsU0FBQSxJQUF5QyxDQUFDQSxJQUFBQSxJQUFBQSxDQUFTRSxPOzs7OztpREFDN0MsSUFBQSxNQUFBLENBQUEsR0FBQSxFQUFBLElBQUEsQ0FBcUI7QUFDMUIsNEJBRDBCLEdBQUE7QUFFMUIsMkJBQVM7QUFGaUIsaUJBQXJCLEM7OztvQkFLTEYsSUFBQUEsSUFBQUEsQ0FBU0UsTzs7Ozs7aURBQ0osSUFBQSxNQUFBLENBQUEsR0FBQSxFQUFBLElBQUEsQ0FBcUI7QUFDMUIsNEJBRDBCLEdBQUE7QUFFMUIsMkJBQVM7QUFGaUIsaUJBQXJCLEM7OztvQkFLTEYsSUFBQUEsSUFBQUEsQ0FBU0csSTs7Ozs7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OztrREFLRixJQUFBLE1BQUEsQ0FBQSxHQUFBLEVBQUEsSUFBQSxDQUFxQjtBQUMxQiwwQkFBUTtBQURrQixpQkFBckIsQzs7Ozs7a0RBS0EsSUFBQSxNQUFBLENBQUEsR0FBQSxFQUFBLElBQUEsQ0FBcUI7QUFDMUIsMkJBQVM7QUFEaUIsaUJBQXJCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQU9FWixLIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgdXVpZHY0IGZyb20gJ3V1aWQvdjQnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHBhcnR5RGIgZnJvbSAnLi4vZGIvcGFydHlkYic7XG4vLyBpbXBvcnQgUGFydHlNb2RlbCBmcm9tICcuLi9tb2RlbHMvcGFydHknO1xuaW1wb3J0IGRiIGZyb20gJy4uL2NvbnRyb2xsZXJzL2RhdGFiYXNlVGFibGVzL2RiY29ubmVjdCc7XG5pbXBvcnQgdXNlckF1dGhIZWxwZXIgZnJvbSAnLi4vaGVscGVyL3VzZXJBdXRoJztcblxuLy8gY29uc3QgcGFydHlNb2RlbCA9IG5ldyBQYXJ0eU1vZGVsKClcblxuY2xhc3MgUGFydHl7XG4gIC8qKlxuICAgKiBcbiAgICogQHBhcmFtIHtWYWx1ZXN9IHJlcSAtIHJlcXVlc3QgdmFsdWVzIGludG8ga2V5cyBcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlcyAtIHJlcXVlc3Qgb2JqZWN0XG4gICAqIEByZXR1cm5zIHthcnJheX0gLSByZXR1cm5zIGFsbCBrZXkgdmFsdWUgcGFpcnMgYXMgb2JqZWN0IGluIGFycmF5XG4gICAqL1xuICBzdGF0aWMgYXN5bmMgY3JlYXRlKHJlcSwgcmVzKSB7XG4gICAgaWYoIXJlcS5ib2R5Lm5hbWUgJiYgIXJlcS5ib2R5LmhxYWRkcmVzcyAmJiAhcmVxLmJvZHkubG9nb1VybCl7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICBcInN0YXR1c1wiOiA0MDAsXG4gICAgICAgIFwiZXJyb3JcIjogXCJJbnB1dHMgZmllbGRzIGNhbid0IGJlIGxlZnQgZW1wdHlcIlxuICAgICAgfSlcbiAgICB9XG4gICAgaWYoIXJlcS5ib2R5LmxvZ29Vcmwpe1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHsgXG4gICAgICAgIFwic3RhdHVzXCI6IDQwMCwgXG4gICAgICAgIFwiZXJyb3JcIjogXCJMb2dvIGZpZWxkIGlzIGVtcHR5XCIgXG4gICAgfSk7XG4gICAgfVxuICAgIGlmKCFyZXEuYm9keS5uYW1lKXtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIFwic3RhdHVzXCI6IDQwMCxcbiAgICAgICAgXCJlcnJvclwiOiBcIlBhcnR5IGZpZWxkIGlzIGVtcHR5XCJcbiAgICAgIH0pXG4gICAgfVxuICAgIGlmKCFyZXEuYm9keS5ocWFkZHJlc3Mpe1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICAgICAgXCJzdGF0dXNcIjogNDAwLFxuICAgICAgICBcImVycm9yXCI6IFwiQWRkcmVzcyBmaWVsZCBpcyBlbXB0eVwiXG4gICAgICB9KVxuICAgIH1cbiAgICBpZiAoIXVzZXJBdXRoSGVscGVyLmlzQWRkcmVzcyhyZXEuYm9keS5ocWFkZHJlc3MpKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICBcInN0YXR1c1wiOiA0MDAsICBcbiAgICAgICAgXCJlcnJvclwiOiBcIlBsZWFzZSBlbnRlciBhIHZhbGlkIGFkZHJlc3NcIlxuICAgIH0pO1xufVxuaWYgKCF1c2VyQXV0aEhlbHBlci5pc05hbWUocmVxLmJvZHkubmFtZSkpIHtcbiAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICBcInN0YXR1c1wiOiA0MDAsICBcbiAgICBcImVycm9yXCI6IFwiQWxwaGFiZXRzIG9ubHlcIlxufSk7XG59XG4vLyBpZiAoIXVzZXJBdXRoSGVscGVyLmlzSGlnaGVyKHJlcS5ib2R5Lm5hbWUsIHJlcS5ib2R5LmhxYWRkcmVzcykpIHtcbi8vICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbi8vICAgICBcInN0YXR1c1wiOiA0MDAsICBcbi8vICAgICBcImVycm9yXCI6IFwiQWxwaGFiZXRzIG9ubHlcIlxuLy8gICB9KVxuLy8gICAgIH07XG4gICAgaWYgKCF1c2VyQXV0aEhlbHBlci5pc1VSTChyZXEuYm9keS5sb2dvVXJsKSkge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICAgICAgXCJzdGF0dXNcIjogNDAwLCAgXG4gICAgICAgIFwiZXJyb3JcIjogXCJJbmNvcnJlY3QgVVJMLiBVc2UgaHR0cHM6Ly9cIlxuICAgICAgfSlcbiAgICAgICAgfTtcbiAgICAgIGNvbnN0IGNoZWNrID0gYFNFTEVDVCAqIEZST00gcGFydHkgV0hFUkUgbmFtZT0kMWBcbiAgICAgIGNvbnN0IHsgbmFtZSB9ID0gcmVxLmJvZHk7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBkYi5xdWVyeShjaGVjaywgW25hbWVdKTtcbiAgICAgIGlmKHJlc3VsdC5yb3dDb3VudCAhPT0gMCl7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgICAgXCJzdGF0dXNcIjo0MDAsXG4gICAgICAgICAgXCJlcnJvclwiOiBcIlBhcnR5IGFscmVhZHkgZXhpc3RcIlxuICAgICAgICB9KVxuICAgICAgfVxuICBcbiAgICBjb25zdCBjcmVhdGVRdWVyeSA9IGBJTlNFUlQgSU5UT1xuICAgICAgcGFydHkoaWQsIG5hbWUsIGhxYWRkcmVzcywgbG9nb1VybCwgY3JlYXRlZF9kYXRlKVxuICAgICAgVkFMVUVTKCQxLCAkMiwgJDMsICQ0LCAkNSlcbiAgICAgIHJldHVybmluZyAqYDtcbiAgICBjb25zdCB2YWx1ZXMgPSBbXG4gICAgICB1dWlkdjQoKSxcbiAgICAgIHJlcS5ib2R5Lm5hbWUsXG4gICAgICByZXEuYm9keS5ocWFkZHJlc3MsXG4gICAgICByZXEuYm9keS5sb2dvVXJsLFxuICAgICAgbW9tZW50KG5ldyBEYXRlKCkpXG4gICAgXTtcbiAgICBcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IHJvd3MgfSA9IGF3YWl0IGRiLnF1ZXJ5KGNyZWF0ZVF1ZXJ5LCB2YWx1ZXMpO1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAxKS5zZW5kKHtcbiAgICAgICAgXCJzdGF0dXNcIjogMjAxLFxuICAgICAgICBcImRhdGFcIjogW3tcbiAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJwYXJ0eSBjcmVhdGVkXCIsXG4gICAgICAgICAgXCJvcmRlclwiOiByb3dzWzBdLFxuICAgICAgICB9XSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2goZXJyb3IpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIFwic3RhdHVzXCI6IDQwMCxcbiAgICAgICAgXCJkYXRhXCI6IGVycm9yXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgc3BlY2lmaWMgcGFydHkodXNlcnMpXG4gICAqIEBwYXJhbSB7dXVpZH0gaWRcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlcyAtIHJlcXVlc3Qgb2JqZWN0XG4gICAqIEByZXR1cm5zIHthcnJheX0gLSByZXR1cm5zIHNwZWNpZmljIHBhcnR5XG4gICAqL1xuICBzdGF0aWMgYXN5bmMgZ2V0QVBhcnR5KHJlcSwgcmVzKSB7XG4gICAgY29uc3QgeyBpZCB9ID0gcmVxLnBhcmFtcztcbiAgICBpZiAoIXVzZXJBdXRoSGVscGVyLmlzVVVJRChpZCkpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIFwic3RhdHVzXCI6IDQwMCwgIFxuICAgICAgICBcImVycm9yXCI6IFwiVGhlIHVzZXIgSUQgdXNlZCBpcyBpbnZhbGlkXCJcbiAgICB9KTtcbiAgICB9XG4gICAgY29uc3QgdGV4dCA9ICdTRUxFQ1QgKiBGUk9NIHBhcnR5IFdIRVJFIGlkID0gJDEnO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IHJvd3MgfSA9IGF3YWl0IGRiLnF1ZXJ5KHRleHQsIFtpZF0pO1xuICAgICAgLy8gY29uc29sZS5sb2cocGFydHlfaWQpO1xuICAgICAgaWYoIXJvd3NbMF0pIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5zZW5kKHtcImVycm9yXCI6IFwiUGFydHkgbm90IGZvdW5kXCJ9KTtcbiAgICAgIH1cbiAgICAgIC8vIGlmKHJlcS5ib2R5LnBhcmFtcyAhPT0gcm93c1swXS5pZCl7XG4gICAgICAvLyAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuc2VuZCh7XCJlcnJvclwiOiBcIllvdXIgaWQgaXMgd3JvbmdcIn0pO1xuICAgICAgLy8gfVxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHtcbiAgICAgICAgXCJzdGF0dXNcIjogMjAxLFxuICAgICAgICBcImRhdGFcIjogW3tcbiAgICAgICAgICBcIm9yZGVyXCI6IHJvd3NbMF0sXG4gICAgICAgIH1dLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaChlcnJvcikge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKGVycm9yKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEdldCBBbGwgcGFydGllcyh1c2VycylcbiAgICogQHBhcmFtIHt1dWlkfSBpZFxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVzIC0gcmVxdWVzdCBvYmplY3RcbiAgICogQHJldHVybnMge2FycmF5fSAtIHJldHVybnMgYWxsIGtleSB2YWx1ZSBwYWlycyBhcyBvYmplY3QgaW4gYXJyYXlcbiAgICovXG4gIC8vIHN0YXRpYyBnZXRQYXJ0aWVzKHJlcSwgcmVzKSAge1xuICAvLyAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gIC8vICAgICBcInN0YXR1c1wiOiAyMDAsXG4gIC8vICAgICBcImRhdGFcIjogcGFydHlEYlxuICAvLyAgIH0pO1xuICAvLyB9XG4gIHN0YXRpYyBhc3luYyBnZXRQYXJ0aWVzKHJlcSwgcmVzKSB7XG4gICAgY29uc3QgZmluZEFsbFF1ZXJ5ID0gJ1NFTEVDVCAqIEZST00gcGFydHknO1xuICAgIHRyeXtcbiAgICAgIGNvbnN0IHsgcm93cywgcm93Q291bnQgfSA9IGF3YWl0IGRiLnF1ZXJ5KGZpbmRBbGxRdWVyeSk7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLnNlbmQoe1xuICAgICAgICBcInN0YXR1c1wiOiAyMDAsXG4gICAgICAgXCJkYXRhXCI6IHJvd3MsIHJvd0NvdW50IFxuICAgICAgfSk7XG4gICAgfSBjYXRjaChlcnJvcikge1xuICAgICAgLy8gY29uc29sZS5sb2coZXJyb3IpXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoZXJyb3IpO1xuICAgIH1cbiAgfVxuLyoqXG4gICAqIEVkaXQgYSBzcGVjaWZpYyBwYXJ0eShhZG1pbilcbiAgICogQHBhcmFtIHtvYmplY3R9IHJlcSBcbiAgICogQHBhcmFtIHtvYmplY3R9IHJlcyBcbiAgICogQHJldHVybnMge29iamVjdH0gdXBkYXRlZCBwYXJ0eVxuICAgKi9cbiAgc3RhdGljIGFzeW5jIHVwZGF0ZShyZXEsIHJlcykge1xuICAgIGlmKCFyZXEuYm9keS5uYW1lKXtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIFwic3RhdHVzXCI6IDQwMCxcbiAgICAgICAgXCJlcnJvclwiOiBcIklucHV0IGZpZWxkIGNhbid0IGJlIGxlZnQgZW1wdHlcIlxuICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBmaW5kT25lUXVlcnkgPSAnU0VMRUNUICogRlJPTSBwYXJ0eSBXSEVSRSBpZD0kMSc7XG4gICAgY29uc3QgdXBkYXRlT25lUXVlcnkgPWBVUERBVEUgcGFydHlcbiAgICAgIFNFVCBuYW1lPSQxIFxuICAgICAgV0hFUkUgaWQ9JDIgcmV0dXJuaW5nICpgO1xuICAgICAgXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgcm93cyB9ID0gYXdhaXQgZGIucXVlcnkoZmluZE9uZVF1ZXJ5LCBbcmVxLnBhcmFtcy5pZF0pO1xuICAgICAgaWYoIXJvd3NbMF0pIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5zZW5kKHtcbiAgICAgICAgICBcInN0YXR1c1wiOiA0MDQsXG4gICAgICAgICAgXCJlcnJvclwiOiBcIlBhcnR5IG5vdCBmb3VuZFwiXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgY29uc3QgdmFsdWVzID0gW1xuICAgICAgICByZXEuYm9keS5uYW1lIHx8IHJvd3NbMF0ubmFtZSxcbiAgICAgICAgcmVxLnBhcmFtcy5pZCxcbiAgICAgIF07XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRiLnF1ZXJ5KHVwZGF0ZU9uZVF1ZXJ5LCB2YWx1ZXMpO1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHJlc3BvbnNlLnJvd3NbMF0pO1xuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICBcImVycm9yXCI6IFwiT29wcywgc29tZXRoaW5nIHdyb25nIGhhcHBlbmVkLiBDaGVjayBhbmQgdHJ5IGFnYWluXCJcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogRGVsZXRlIHBhcnR5KGFkbWluKVxuICAgKiBAcGFyYW0ge29iamVjdH0gcmVxIFxuICAgKiBAcGFyYW0ge29iamVjdH0gcmVzIFxuICAgKiBAcmV0dXJucyB7dm9pZH0gcmV0dXJuIGNvZGUgMjA0IFxuICAgKi9cbiAgc3RhdGljIGFzeW5jIGRlbGV0ZShyZXEsIHJlcykge1xuICAgIGNvbnN0IGRlbGV0ZVF1ZXJ5ID0gJ0RFTEVURSBGUk9NIHBhcnR5IFdIRVJFIGlkPSQxIHJldHVybmluZyAqJztcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyByb3dzIH0gPSBhd2FpdCBkYi5xdWVyeShkZWxldGVRdWVyeSwgW3JlcS5wYXJhbXMuaWRdKTtcbiAgICAgIFxuICAgICAgaWYoIXJvd3NbMF0pIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5zZW5kKHtcbiAgICAgICAgICBcImVycm9yXCI6IDQwNCxcbiAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJwYXJ0eSBub3QgZm91bmRcIlxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQxMCkuc2VuZCh7IFxuICAgICAgICBcImRhdGFcIjogXCJkZWxldGVkXCIgXG4gICAgICB9KTtcbiAgICB9IGNhdGNoKGVycm9yKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICBcImVycm9yXCI6IFwiT29wcywgc29tZXRoaW5nIHdyb25nIGhhcHBlbmVkLiBDaGVjayBhbmQgdHJ5IGFnYWluXCJcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG59IFxuZXhwb3J0IGRlZmF1bHQgUGFydHk7Il19