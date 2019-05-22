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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy9wYXJ0eUN0ci5qcyJdLCJuYW1lcyI6WyJQYXJ0eSIsInJlcSIsInJlcyIsImxvZ29VcmwiLCJuYW1lIiwiaHFhZGRyZXNzIiwidXNlckF1dGhIZWxwZXIiLCJjaGVjayIsImJvZHkiLCJyZXN1bHQiLCJkYiIsImNyZWF0ZVF1ZXJ5IiwidmFsdWVzIiwicm93cyIsImlkIiwicGFyYW1zIiwidGV4dCIsImZpbmRBbGxRdWVyeSIsInJvd0NvdW50IiwiZmluZE9uZVF1ZXJ5IiwidXBkYXRlT25lUXVlcnkiLCJyZXNwb25zZSIsImRlbGV0ZVF1ZXJ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBQSxLQUFBLFFBQUEsU0FBQSxDQUFBOzs7O0FBQ0EsSUFBQSxVQUFBLFFBQUEsUUFBQSxDQUFBOzs7O0FBQ0EsSUFBQSxXQUFBLFFBQUEsZUFBQSxDQUFBOzs7O0FBRUEsSUFBQSxhQUFBLFFBQUEseUNBQUEsQ0FBQTs7OztBQUNBLElBQUEsWUFBQSxRQUFBLG9CQUFBLENBQUE7Ozs7Ozs7O0FBRUE7O0FBSkE7SUFNTUEsUTs7Ozs7Ozs7QUFDSjs7Ozs7OzsyR0FNb0JDLEcsRUFBS0MsRzs7Ozs7OztzQkFDcEIsQ0FBQ0QsSUFBQUEsSUFBQUEsQ0FBRCxJQUFBLElBQWtCLENBQUNBLElBQUFBLElBQUFBLENBQW5CLFNBQUEsSUFBeUMsQ0FBQ0EsSUFBQUEsSUFBQUEsQ0FBU0UsTzs7Ozs7aURBQzdDLElBQUEsTUFBQSxDQUFBLEdBQUEsRUFBQSxJQUFBLENBQXFCO0FBQzFCLDRCQUQwQixHQUFBO0FBRTFCLDJCQUFTO0FBRmlCLGlCQUFyQixDOzs7b0JBS0xGLElBQUFBLElBQUFBLENBQVNFLE87Ozs7O2lEQUNKLElBQUEsTUFBQSxDQUFBLEdBQUEsRUFBQSxJQUFBLENBQXFCO0FBQzFCLDRCQUQwQixHQUFBO0FBRTFCLDJCQUFTO0FBRmlCLGlCQUFyQixDOzs7b0JBS0xGLElBQUFBLElB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TUFBQSxDQUFBLEdBQUEsRUFBQSxJQUFBLENBQXFCO0FBQzFCLDBCQUFRO0FBRGtCLGlCQUFyQixDOzs7OztrREFLQSxJQUFBLE1BQUEsQ0FBQSxHQUFBLEVBQUEsSUFBQSxDQUFxQjtBQUMxQiwyQkFBUztBQURpQixpQkFBckIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBT0ViLEsiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB1dWlkdjQgZnJvbSAndXVpZC92NCc7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgcGFydHlEYiBmcm9tICcuLi9kYi9wYXJ0eWRiJztcbi8vIGltcG9ydCBQYXJ0eU1vZGVsIGZyb20gJy4uL21vZGVscy9wYXJ0eSc7XG5pbXBvcnQgZGIgZnJvbSAnLi4vY29udHJvbGxlcnMvZGF0YWJhc2VUYWJsZXMvZGJjb25uZWN0JztcbmltcG9ydCB1c2VyQXV0aEhlbHBlciBmcm9tICcuLi9oZWxwZXIvdXNlckF1dGgnO1xuXG4vLyBjb25zdCBwYXJ0eU1vZGVsID0gbmV3IFBhcnR5TW9kZWwoKVxuXG5jbGFzcyBQYXJ0eXtcbiAgLyoqXG4gICAqIFxuICAgKiBAcGFyYW0ge1ZhbHVlc30gcmVxIC0gcmVxdWVzdCB2YWx1ZXMgaW50byBrZXlzIFxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVzIC0gcmVxdWVzdCBvYmplY3RcbiAgICogQHJldHVybnMge2FycmF5fSAtIHJldHVybnMgYWxsIGtleSB2YWx1ZSBwYWlycyBhcyBvYmplY3QgaW4gYXJyYXlcbiAgICovXG4gIHN0YXRpYyBhc3luYyBjcmVhdGUocmVxLCByZXMpIHtcbiAgICBpZighcmVxLmJvZHkubmFtZSAmJiAhcmVxLmJvZHkuaHFhZGRyZXNzICYmICFyZXEuYm9keS5sb2dvVXJsKXtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIFwic3RhdHVzXCI6IDQwMCxcbiAgICAgICAgXCJlcnJvclwiOiBcIklucHV0cyBmaWVsZHMgY2FuJ3QgYmUgbGVmdCBlbXB0eVwiXG4gICAgICB9KVxuICAgIH1cbiAgICBpZighcmVxLmJvZHkubG9nb1VybCl7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoeyBcbiAgICAgICAgXCJzdGF0dXNcIjogNDAwLCBcbiAgICAgICAgXCJlcnJvclwiOiBcIkxvZ28gZmllbGQgaXMgZW1wdHlcIiBcbiAgICB9KTtcbiAgICB9XG4gICAgaWYoIXJlcS5ib2R5Lm5hbWUpe1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICAgICAgXCJzdGF0dXNcIjogNDAwLFxuICAgICAgICBcImVycm9yXCI6IFwiUGFydHkgZmllbGQgaXMgZW1wdHlcIlxuICAgICAgfSlcbiAgICB9XG4gICAgaWYoIXJlcS5ib2R5LmhxYWRkcmVzcyl7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICBcInN0YXR1c1wiOiA0MDAsXG4gICAgICAgIFwiZXJyb3JcIjogXCJBZGRyZXNzIGZpZWxkIGlzIGVtcHR5XCJcbiAgICAgIH0pXG4gICAgfVxuICAgIGlmICghdXNlckF1dGhIZWxwZXIuaXNBZGRyZXNzKHJlcS5ib2R5LmhxYWRkcmVzcykpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIFwic3RhdHVzXCI6IDQwMCwgIFxuICAgICAgICBcImVycm9yXCI6IFwiUGxlYXNlIGVudGVyIGEgdmFsaWQgYWRkcmVzc1wiXG4gICAgfSk7XG59XG5pZiAoIXVzZXJBdXRoSGVscGVyLmlzTmFtZShyZXEuYm9keS5uYW1lKSkge1xuICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgIFwic3RhdHVzXCI6IDQwMCwgIFxuICAgIFwiZXJyb3JcIjogXCJBbHBoYWJldHMgb25seVwiXG59KTtcbn1cbi8vIGlmICghdXNlckF1dGhIZWxwZXIuaXNIaWdoZXIocmVxLmJvZHkubmFtZSwgcmVxLmJvZHkuaHFhZGRyZXNzKSkge1xuLy8gICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuLy8gICAgIFwic3RhdHVzXCI6IDQwMCwgIFxuLy8gICAgIFwiZXJyb3JcIjogXCJBbHBoYWJldHMgb25seVwiXG4vLyAgIH0pXG4vLyAgICAgfTtcbiAgICBpZiAoIXVzZXJBdXRoSGVscGVyLmlzVVJMKHJlcS5ib2R5LmxvZ29VcmwpKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICBcInN0YXR1c1wiOiA0MDAsICBcbiAgICAgICAgXCJlcnJvclwiOiBcIkluY29ycmVjdCBVUkwuIFVzZSBodHRwczovL1wiXG4gICAgICB9KVxuICAgICAgICB9O1xuICAgICAgY29uc3QgY2hlY2sgPSBgU0VMRUNUICogRlJPTSBwYXJ0eSBXSEVSRSBuYW1lPSQxYFxuICAgICAgY29uc3QgeyBuYW1lIH0gPSByZXEuYm9keTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGRiLnF1ZXJ5KGNoZWNrLCBbbmFtZV0pO1xuICAgICAgaWYocmVzdWx0LnJvd0NvdW50ICE9PSAwKXtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICAgICAgICBcInN0YXR1c1wiOjQwMCxcbiAgICAgICAgICBcImVycm9yXCI6IFwiUGFydHkgYWxyZWFkeSBleGlzdFwiXG4gICAgICAgIH0pXG4gICAgICB9XG4gIFxuICAgIGNvbnN0IGNyZWF0ZVF1ZXJ5ID0gYElOU0VSVCBJTlRPXG4gICAgICBwYXJ0eShpZCwgbmFtZSwgaHFhZGRyZXNzLCBsb2dvVXJsLCBjcmVhdGVkX2RhdGUpXG4gICAgICBWQUxVRVMoJDEsICQyLCAkMywgJDQsICQ1KVxuICAgICAgcmV0dXJuaW5nICpgO1xuICAgIGNvbnN0IHZhbHVlcyA9IFtcbiAgICAgIHV1aWR2NCgpLFxuICAgICAgcmVxLmJvZHkubmFtZSxcbiAgICAgIHJlcS5ib2R5LmhxYWRkcmVzcyxcbiAgICAgIHJlcS5ib2R5LmxvZ29VcmwsXG4gICAgICBtb21lbnQobmV3IERhdGUoKSlcbiAgICBdO1xuICAgIFxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgcm93cyB9ID0gYXdhaXQgZGIucXVlcnkoY3JlYXRlUXVlcnksIHZhbHVlcyk7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDEpLnNlbmQoe1xuICAgICAgICBcInN0YXR1c1wiOiAyMDEsXG4gICAgICAgIFwiZGF0YVwiOiBbe1xuICAgICAgICAgIFwibWVzc2FnZVwiOiBcInBhcnR5IGNyZWF0ZWRcIixcbiAgICAgICAgICBcIm9yZGVyXCI6IHJvd3NbMF0sXG4gICAgICAgIH1dLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaChlcnJvcikge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICAgICAgXCJzdGF0dXNcIjogNDAwLFxuICAgICAgICBcImRhdGFcIjogZXJyb3JcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBzcGVjaWZpYyBwYXJ0eSh1c2VycylcbiAgICogQHBhcmFtIHt1dWlkfSBpZFxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVzIC0gcmVxdWVzdCBvYmplY3RcbiAgICogQHJldHVybnMge2FycmF5fSAtIHJldHVybnMgc3BlY2lmaWMgcGFydHlcbiAgICovXG4gIHN0YXRpYyBhc3luYyBnZXRBUGFydHkocmVxLCByZXMpIHtcbiAgICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xuICAgIGlmICghdXNlckF1dGhIZWxwZXIuaXNVVUlEKGlkKSkge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICAgICAgXCJzdGF0dXNcIjogNDAwLCAgXG4gICAgICAgIFwiZXJyb3JcIjogXCJUaGUgdXNlciBJRCB1c2VkIGlzIGludmFsaWRcIlxuICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCB0ZXh0ID0gJ1NFTEVDVCAqIEZST00gcGFydHkgV0hFUkUgaWQgPSAkMSc7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgcm93cyB9ID0gYXdhaXQgZGIucXVlcnkodGV4dCwgW2lkXSk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhwYXJ0eV9pZCk7XG4gICAgICBpZighcm93c1swXSkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLnNlbmQoe1wiZXJyb3JcIjogXCJQYXJ0eSBub3QgZm91bmRcIn0pO1xuICAgICAgfVxuICAgICAgLy8gaWYocmVxLmJvZHkucGFyYW1zICE9PSByb3dzWzBdLmlkKXtcbiAgICAgIC8vICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5zZW5kKHtcImVycm9yXCI6IFwiWW91ciBpZCBpcyB3cm9uZ1wifSk7XG4gICAgICAvLyB9XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLnNlbmQoe1xuICAgICAgICBcInN0YXR1c1wiOiAyMDEsXG4gICAgICAgIFwiZGF0YVwiOiBbe1xuICAgICAgICAgIFwib3JkZXJcIjogcm93c1swXSxcbiAgICAgICAgfV0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoKGVycm9yKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoZXJyb3IpO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogR2V0IEFsbCBwYXJ0aWVzKHVzZXJzKVxuICAgKiBAcGFyYW0ge3V1aWR9IGlkXG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXMgLSByZXF1ZXN0IG9iamVjdFxuICAgKiBAcmV0dXJucyB7YXJyYXl9IC0gcmV0dXJucyBhbGwga2V5IHZhbHVlIHBhaXJzIGFzIG9iamVjdCBpbiBhcnJheVxuICAgKi9cbiAgLy8gc3RhdGljIGdldFBhcnRpZXMocmVxLCByZXMpICB7XG4gIC8vICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgLy8gICAgIFwic3RhdHVzXCI6IDIwMCxcbiAgLy8gICAgIFwiZGF0YVwiOiBwYXJ0eURiXG4gIC8vICAgfSk7XG4gIC8vIH1cbiAgc3RhdGljIGFzeW5jIGdldFBhcnRpZXMocmVxLCByZXMpIHtcbiAgICBjb25zdCBmaW5kQWxsUXVlcnkgPSAnU0VMRUNUICogRlJPTSBwYXJ0eSc7XG4gICAgdHJ5e1xuICAgICAgY29uc3QgeyByb3dzLCByb3dDb3VudCB9ID0gYXdhaXQgZGIucXVlcnkoZmluZEFsbFF1ZXJ5KTtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuc2VuZCh7XG4gICAgICAgIFwic3RhdHVzXCI6IDIwMCxcbiAgICAgICBcImRhdGFcIjogcm93cywgcm93Q291bnQgXG4gICAgICB9KTtcbiAgICB9IGNhdGNoKGVycm9yKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhlcnJvcilcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZChlcnJvcik7XG4gICAgfVxuICB9XG4vKipcbiAgICogRWRpdCBhIHNwZWNpZmljIHBhcnR5KGFkbWluKVxuICAgKiBAcGFyYW0ge29iamVjdH0gcmVxIFxuICAgKiBAcGFyYW0ge29iamVjdH0gcmVzIFxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSB1cGRhdGVkIHBhcnR5XG4gICAqL1xuICBzdGF0aWMgYXN5bmMgdXBkYXRlKHJlcSwgcmVzKSB7XG4gICAgaWYoIXJlcS5ib2R5Lm5hbWUpe1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICAgICAgXCJzdGF0dXNcIjogNDAwLFxuICAgICAgICBcImVycm9yXCI6IFwiSW5wdXQgZmllbGQgY2FuJ3QgYmUgbGVmdCBlbXB0eVwiXG4gICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IGZpbmRPbmVRdWVyeSA9ICdTRUxFQ1QgKiBGUk9NIHBhcnR5IFdIRVJFIGlkPSQxJztcbiAgICBjb25zdCB1cGRhdGVPbmVRdWVyeSA9YFVQREFURSBwYXJ0eVxuICAgICAgU0VUIG5hbWU9JDEgXG4gICAgICBXSEVSRSBpZD0kMiByZXR1cm5pbmcgKmA7XG4gICAgICBcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyByb3dzIH0gPSBhd2FpdCBkYi5xdWVyeShmaW5kT25lUXVlcnksIFtyZXEucGFyYW1zLmlkXSk7XG4gICAgICBpZighcm93c1swXSkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLnNlbmQoe1xuICAgICAgICAgIFwic3RhdHVzXCI6IDQwNCxcbiAgICAgICAgICBcImVycm9yXCI6IFwiUGFydHkgbm90IGZvdW5kXCJcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBjb25zdCB2YWx1ZXMgPSBbXG4gICAgICAgIHJlcS5ib2R5Lm5hbWUgfHwgcm93c1swXS5uYW1lLFxuICAgICAgICByZXEucGFyYW1zLmlkLFxuICAgICAgXTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGIucXVlcnkodXBkYXRlT25lUXVlcnksIHZhbHVlcyk7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLnNlbmQocmVzcG9uc2Uucm93c1swXSk7XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIFwiZXJyb3JcIjogXCJPb3BzLCBzb21ldGhpbmcgd3JvbmcgaGFwcGVuZWQuIENoZWNrIGFuZCB0cnkgYWdhaW5cIlxuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBEZWxldGUgcGFydHkoYWRtaW4pXG4gICAqIEBwYXJhbSB7b2JqZWN0fSByZXEgXG4gICAqIEBwYXJhbSB7b2JqZWN0fSByZXMgXG4gICAqIEByZXR1cm5zIHt2b2lkfSByZXR1cm4gY29kZSAyMDQgXG4gICAqL1xuICBzdGF0aWMgYXN5bmMgZGVsZXRlKHJlcSwgcmVzKSB7XG4gICAgY29uc3QgZGVsZXRlUXVlcnkgPSAnREVMRVRFIEZST00gcGFydHkgV0hFUkUgaWQ9JDEgcmV0dXJuaW5nIConO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IHJvd3MgfSA9IGF3YWl0IGRiLnF1ZXJ5KGRlbGV0ZVF1ZXJ5LCBbcmVxLnBhcmFtcy5pZF0pO1xuICAgICAgXG4gICAgICBpZighcm93c1swXSkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLnNlbmQoe1xuICAgICAgICAgIFwiZXJyb3JcIjogNDA0LFxuICAgICAgICAgIFwibWVzc2FnZVwiOiBcInBhcnR5IG5vdCBmb3VuZFwiXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDEwKS5zZW5kKHsgXG4gICAgICAgIFwiZGF0YVwiOiBcImRlbGV0ZWRcIiBcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2goZXJyb3IpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIFwiZXJyb3JcIjogXCJPb3BzLCBzb21ldGhpbmcgd3JvbmcgaGFwcGVuZWQuIENoZWNrIGFuZCB0cnkgYWdhaW5cIlxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbn0gXG5leHBvcnQgZGVmYXVsdCBQYXJ0eTsiXX0=