'use strict';

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault2(_regenerator);

function _interopRequireDefault2(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _partydb = require('../db/partydb');

var _partydb2 = _interopRequireDefault(_partydb);

var _party = require('../models/party');

var _party2 = _interopRequireDefault(_party);

var _dbconnect = require('../../databaseTables/dbconnect');

var _dbconnect2 = _interopRequireDefault(_dbconnect);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _asyncToGenerator(fn) {
  return function () {
    var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);var value = info.value;
        } catch (error) {
          reject(error);return;
        }if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }return step("next");
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var partyModel = new _party2.default();

var Party = function () {
  function Party() {
    _classCallCheck(this, Party);
  }

  _createClass(Party, null, [{
    key: 'create',

    /**
     * 
     * @param {Values} req - request values into keys 
     * @param {Object} res - request object
     * @returns {array} - returns all key value pairs as object in array
     */
    // static createParty(req, res) {
    //   const {
    //     name,
    //     hqaddress,
    //     logoURL
    //   } = req.body;
    //   partyDb.push({
    //     id: uuid.v4(),
    //     name,
    //     hqaddress,
    //     logoURL
    //   });
    //   return res.status(201).json({
    //     "status": 201,
    //     "data": partyDb
    //   });
    // }

    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var isAdmin, createQuery, values, _ref2, rows;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                isAdmin = req.user.isAdmin;

                if (!isAdmin) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt('return', res.status(403).json({
                  status: 403,
                  message: "Access denied, you don't have the required credentials to access this route"
                }));

              case 3:
                createQuery = 'INSERT INTO\n      party(id, name, type, created_date)\n      VALUES($1, $2, $3, $4)\n      returning *';
                values = [uuidv4(), req.body.name, req.body.type, moment(new Date())];
                _context.prev = 5;
                _context.next = 8;
                return _dbconnect2.default.query(createQuery, values);

              case 8:
                _ref2 = _context.sent;
                rows = _ref2.rows;
                return _context.abrupt('return', res.status(201).send({
                  "status": 201,
                  "data": [{
                    "message": "party created",
                    "order": rows[0]
                  }]
                }));

              case 13:
                _context.prev = 13;
                _context.t0 = _context['catch'](5);
                return _context.abrupt('return', res.status(400).send({
                  "status": 400,
                  "data": _context.t0
                }));

              case 16:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[5, 13]]);
      }));

      function create(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return create;
    }()

    /**
     * 
     * @param {uuid} id
     * @param {Object} res - request object
     * @returns {array} - returns specific party
     */

  }, {
    key: 'getPartyById',
    value: function getPartyById(req, res) {
      var partyId = req.params.partyId;

      var partyObject = void 0;
      _partydb2.default.forEach(function (party) {

        if (party.id === Number(partyId)) {
          partyObject = party;
        }
      });
      return res.status(200).json({
        "status": 200,
        "data": partyObject
      });
    }
    /**
     * 
     * @param {uuid} id
     * @param {Object} res - request object
     * @returns {array} - returns all key value pairs as object in array
     */

  }, {
    key: 'getParties',
    value: function getParties(req, res) {
      return res.status(200).json({
        "status": 200,
        "data": _partydb2.default
      });
    }
    /**
       * 
       * @param {object} req 
       * @param {object} res 
       * @returns {object} updated party
       */
    // static update(req, res) {
    //   let partyObject;

    //   const party = partyModel.findOne(req.params.id);
    //   console.log(party);
    //   if (!party) {
    //     return res.status(404).send({
    //       "status": 404,
    //       "error": "party not found"
    //     });
    //   }
    //   party.name = req.body.name
    //   // const updatedParty = PartyModel.update(req.params.id, req.body)
    //   return res.status(200).send(party);
    // }

  }, {
    key: 'update',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
        var findOneQuery, updateOneQuery, _ref4, rows, values, response;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                findOneQuery = 'SELECT * FROM party WHERE id=$1';
                updateOneQuery = 'UPDATE party\n      SET name=$1,type=$2, modified_date=$3\n      WHERE id=$4 returning *';
                _context2.prev = 2;
                _context2.next = 5;
                return _dbconnect2.default.query(findOneQuery, [req.params.id, req.user.id]);

              case 5:
                _ref4 = _context2.sent;
                rows = _ref4.rows;

                if (rows[0]) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt('return', res.status(404).send({ 'message': 'Party not found' }));

              case 9:
                values = [req.body.name || rows[0].name, req.body.type || rows[0].type, moment(new Date()), req.params.id];
                _context2.next = 12;
                return _dbconnect2.default.query(updateOneQuery, values);

              case 12:
                response = _context2.sent;
                return _context2.abrupt('return', res.status(200).send(response.rows[0]));

              case 16:
                _context2.prev = 16;
                _context2.t0 = _context2['catch'](2);
                return _context2.abrupt('return', res.status(400).send(_context2.t0));

              case 19:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 16]]);
      }));

      function update(_x3, _x4) {
        return _ref3.apply(this, arguments);
      }

      return update;
    }()
    /**
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {void} return code 204 
     */
    // static delete(req, res) {
    //   const party = partyModel.findOne(req.params.id);
    //   if (!party) {
    //     return res.status(404).send({
    //       "status": 404,
    //       "error": "party not found"
    //     });
    //   }
    //   const ref = partyModel.delete(req.params.id);
    //   return res.status(200).send({
    //     "status": 200,
    //     "message": "Party had been deleted",
    //     "data": party
    //   });
    // }


  }, {
    key: 'delete',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
        var deleteQuery, _ref6, rows;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                deleteQuery = 'DELETE FROM party WHERE id=$1 returning *';
                _context3.prev = 1;
                _context3.next = 4;
                return _dbconnect2.default.query(deleteQuery, req.params.id);

              case 4:
                _ref6 = _context3.sent;
                rows = _ref6.rows;

                if (rows[0]) {
                  _context3.next = 8;
                  break;
                }

                return _context3.abrupt('return', res.status(404).send({ 'message': 'party not found' }));

              case 8:
                return _context3.abrupt('return', res.status(204).send({ 'message': 'deleted' }));

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3['catch'](1);
                return _context3.abrupt('return', res.status(400).send(_context3.t0));

              case 14:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 11]]);
      }));

      function _delete(_x5, _x6) {
        return _ref5.apply(this, arguments);
      }

      return _delete;
    }()
  }]);

  return Party;
}();

exports.default = Party;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy9wYXJ0eUN0ci5qcyJdLCJuYW1lcyI6WyJwYXJ0eU1vZGVsIiwiUGFydHlNb2RlbCIsIlBhcnR5IiwicmVxIiwicmVzIiwiaXNBZG1pbiIsInVzZXIiLCJzdGF0dXMiLCJtZXNzYWdlIiwiY3JlYXRlUXVlcnkiLCJ2YWx1ZXMiLCJtb21lbnQiLCJyb3dzIiwiZGIiLCJwYXJ0eU9iamVjdCIsInBhcnR5RGIiLCJwYXJ0eSIsIk51bWJlciIsImZpbmRPbmVRdWVyeSIsInVwZGF0ZU9uZVF1ZXJ5IiwicmVzcG9uc2UiLCJkZWxldGVRdWVyeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLElBQUEsUUFBQSxRQUFBLE1BQUEsQ0FBQTs7OztBQUNBLElBQUEsV0FBQSxRQUFBLGVBQUEsQ0FBQTs7OztBQUNBLElBQUEsU0FBQSxRQUFBLGlCQUFBLENBQUE7Ozs7QUFDQSxJQUFBLGFBQUEsUUFBQSxnQ0FBQSxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxhQUFhLElBQUlDLFFBQXZCLE9BQW1CLEVBQW5COztJQUVNQyxROzs7Ozs7OztBQUNKOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7NkZBRW9CQyxHLEVBQUtDLEc7Ozs7Ozs7QUFDZkMsMEJBQVlGLElBQUlHLElBQUpILENBQVpFLE9BQUFBOztxQkFDQUEsTzs7Ozs7aURBQ0ssSUFBQSxNQUFBLENBQUEsR0FBQSxFQUFBLElBQUEsQ0FBcUI7QUFDMUJFLDBCQUQwQixHQUFBO0FBRTFCQywyQkFBUztBQUZpQixpQkFBckIsQzs7O0FBS1BDLDhCLHlHQUFBQTtBQUlBQyx5QkFBUyxDQUFBLFFBQUEsRUFFYlAsSUFBQUEsSUFBQUEsQ0FGYSxJQUFBLEVBR2JBLElBQUFBLElBQUFB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Ozs7Ozs7K0ZBR29CRCxHLEVBQUtDLEc7Ozs7Ozs7QUFDakJpQiw4QkFBYywyQ0FBZEE7Ozt1QkFFbUJSLFlBQUFBLE9BQUFBLENBQUFBLEtBQUFBLENBQUFBLFdBQUFBLEVBQXNCVixJQUFBQSxNQUFBQSxDQUF0QlUsRUFBQUEsQzs7OztBQUFmRCx1QixNQUFBQSxJQUFBQTs7b0JBQ0pBLEtBQUFBLENBQUFBLEM7Ozs7O2tEQUNLUixJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxFQUFBQSxJQUFBQSxDQUFxQixFQUFDLFdBQXRCQSxpQkFBcUIsRUFBckJBLEM7OztrREFFRkEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsRUFBQUEsSUFBQUEsQ0FBcUIsRUFBRSxXQUF2QkEsU0FBcUIsRUFBckJBLEM7Ozs7O2tEQUVBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxFQUFBQSxJQUFBQSxDQUFBQSxVQUFBQSxFQUFBQSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBS0VGLEsiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XHJcbmltcG9ydCBwYXJ0eURiIGZyb20gJy4uL2RiL3BhcnR5ZGInO1xyXG5pbXBvcnQgUGFydHlNb2RlbCBmcm9tICcuLi9tb2RlbHMvcGFydHknO1xyXG5pbXBvcnQgZGIgZnJvbSAnLi4vLi4vZGF0YWJhc2VUYWJsZXMvZGJjb25uZWN0JztcclxuXHJcbmNvbnN0IHBhcnR5TW9kZWwgPSBuZXcgUGFydHlNb2RlbCgpXHJcblxyXG5jbGFzcyBQYXJ0eXtcclxuICAvKipcclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZhbHVlc30gcmVxIC0gcmVxdWVzdCB2YWx1ZXMgaW50byBrZXlzIFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXMgLSByZXF1ZXN0IG9iamVjdFxyXG4gICAqIEByZXR1cm5zIHthcnJheX0gLSByZXR1cm5zIGFsbCBrZXkgdmFsdWUgcGFpcnMgYXMgb2JqZWN0IGluIGFycmF5XHJcbiAgICovXHJcbiAgLy8gc3RhdGljIGNyZWF0ZVBhcnR5KHJlcSwgcmVzKSB7XHJcbiAgLy8gICBjb25zdCB7XHJcbiAgLy8gICAgIG5hbWUsXHJcbiAgLy8gICAgIGhxYWRkcmVzcyxcclxuICAvLyAgICAgbG9nb1VSTFxyXG4gIC8vICAgfSA9IHJlcS5ib2R5O1xyXG4gIC8vICAgcGFydHlEYi5wdXNoKHtcclxuICAvLyAgICAgaWQ6IHV1aWQudjQoKSxcclxuICAvLyAgICAgbmFtZSxcclxuICAvLyAgICAgaHFhZGRyZXNzLFxyXG4gIC8vICAgICBsb2dvVVJMXHJcbiAgLy8gICB9KTtcclxuICAvLyAgIHJldHVybiByZXMuc3RhdHVzKDIwMSkuanNvbih7XHJcbiAgLy8gICAgIFwic3RhdHVzXCI6IDIwMSxcclxuICAvLyAgICAgXCJkYXRhXCI6IHBhcnR5RGJcclxuICAvLyAgIH0pO1xyXG4gIC8vIH1cclxuXHJcbiAgc3RhdGljIGFzeW5jIGNyZWF0ZShyZXEsIHJlcykge1xyXG4gICAgY29uc3QgeyBpc0FkbWluIH0gPSByZXEudXNlcjtcclxuICAgICAgICBpZiAoaXNBZG1pbikge1xyXG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAzKS5qc29uKHtcclxuICAgICAgICAgICAgc3RhdHVzOiA0MDMsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiQWNjZXNzIGRlbmllZCwgeW91IGRvbid0IGhhdmUgdGhlIHJlcXVpcmVkIGNyZWRlbnRpYWxzIHRvIGFjY2VzcyB0aGlzIHJvdXRlXCIsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICBjb25zdCBjcmVhdGVRdWVyeSA9IGBJTlNFUlQgSU5UT1xyXG4gICAgICBwYXJ0eShpZCwgbmFtZSwgdHlwZSwgY3JlYXRlZF9kYXRlKVxyXG4gICAgICBWQUxVRVMoJDEsICQyLCAkMywgJDQpXHJcbiAgICAgIHJldHVybmluZyAqYDtcclxuICAgIGNvbnN0IHZhbHVlcyA9IFtcclxuICAgICAgdXVpZHY0KCksXHJcbiAgICAgIHJlcS5ib2R5Lm5hbWUsXHJcbiAgICAgIHJlcS5ib2R5LnR5cGUsXHJcbiAgICAgIG1vbWVudChuZXcgRGF0ZSgpKVxyXG4gICAgXTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IHJvd3MgfSA9IGF3YWl0IGRiLnF1ZXJ5KGNyZWF0ZVF1ZXJ5LCB2YWx1ZXMpO1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDEpLnNlbmQoe1xyXG4gICAgICAgIFwic3RhdHVzXCI6IDIwMSxcclxuICAgICAgICBcImRhdGFcIjogW3tcclxuICAgICAgICAgIFwibWVzc2FnZVwiOiBcInBhcnR5IGNyZWF0ZWRcIixcclxuICAgICAgICAgIFwib3JkZXJcIjogcm93c1swXSxcclxuICAgICAgICB9XSxcclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoKGVycm9yKSB7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XHJcbiAgICAgICAgXCJzdGF0dXNcIjogNDAwLFxyXG4gICAgICAgIFwiZGF0YVwiOiBlcnJvclxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7dXVpZH0gaWRcclxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVzIC0gcmVxdWVzdCBvYmplY3RcclxuICAgKiBAcmV0dXJucyB7YXJyYXl9IC0gcmV0dXJucyBzcGVjaWZpYyBwYXJ0eVxyXG4gICAqL1xyXG4gIHN0YXRpYyBnZXRQYXJ0eUJ5SWQocmVxLCByZXMpIHtcclxuICAgIGNvbnN0IHsgcGFydHlJZCB9ID0gcmVxLnBhcmFtcztcclxuICAgIGxldCBwYXJ0eU9iamVjdDtcclxuICAgIHBhcnR5RGIuZm9yRWFjaCgocGFydHkpID0+IHtcclxuICAgICAgXHJcbiAgICAgIGlmKHBhcnR5LmlkID09PSBOdW1iZXIocGFydHlJZCkpIHtcclxuICAgICAgICBwYXJ0eU9iamVjdCA9IHBhcnR5O1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgIFwic3RhdHVzXCI6IDIwMCxcclxuICAgICAgXCJkYXRhXCI6IHBhcnR5T2JqZWN0XHJcbiAgICB9KTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHt1dWlkfSBpZFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXMgLSByZXF1ZXN0IG9iamVjdFxyXG4gICAqIEByZXR1cm5zIHthcnJheX0gLSByZXR1cm5zIGFsbCBrZXkgdmFsdWUgcGFpcnMgYXMgb2JqZWN0IGluIGFycmF5XHJcbiAgICovXHJcbiAgc3RhdGljIGdldFBhcnRpZXMocmVxLCByZXMpICB7XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICBcInN0YXR1c1wiOiAyMDAsXHJcbiAgICAgIFwiZGF0YVwiOiBwYXJ0eURiXHJcbiAgICB9KTtcclxuICB9XHJcbi8qKlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSByZXEgXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IHJlcyBcclxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSB1cGRhdGVkIHBhcnR5XHJcbiAgICovXHJcbiAgLy8gc3RhdGljIHVwZGF0ZShyZXEsIHJlcykge1xyXG4gIC8vICAgbGV0IHBhcnR5T2JqZWN0O1xyXG5cclxuICAvLyAgIGNvbnN0IHBhcnR5ID0gcGFydHlNb2RlbC5maW5kT25lKHJlcS5wYXJhbXMuaWQpO1xyXG4gIC8vICAgY29uc29sZS5sb2cocGFydHkpO1xyXG4gIC8vICAgaWYgKCFwYXJ0eSkge1xyXG4gIC8vICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLnNlbmQoe1xyXG4gIC8vICAgICAgIFwic3RhdHVzXCI6IDQwNCxcclxuICAvLyAgICAgICBcImVycm9yXCI6IFwicGFydHkgbm90IGZvdW5kXCJcclxuICAvLyAgICAgfSk7XHJcbiAgLy8gICB9XHJcbiAgLy8gICBwYXJ0eS5uYW1lID0gcmVxLmJvZHkubmFtZVxyXG4gIC8vICAgLy8gY29uc3QgdXBkYXRlZFBhcnR5ID0gUGFydHlNb2RlbC51cGRhdGUocmVxLnBhcmFtcy5pZCwgcmVxLmJvZHkpXHJcbiAgLy8gICByZXR1cm4gcmVzLnN0YXR1cygyMDApLnNlbmQocGFydHkpO1xyXG4gIC8vIH1cclxuXHJcbiAgc3RhdGljIGFzeW5jIHVwZGF0ZShyZXEsIHJlcykge1xyXG4gICAgY29uc3QgZmluZE9uZVF1ZXJ5ID0gJ1NFTEVDVCAqIEZST00gcGFydHkgV0hFUkUgaWQ9JDEnO1xyXG4gICAgY29uc3QgdXBkYXRlT25lUXVlcnkgPWBVUERBVEUgcGFydHlcclxuICAgICAgU0VUIG5hbWU9JDEsdHlwZT0kMiwgbW9kaWZpZWRfZGF0ZT0kM1xyXG4gICAgICBXSEVSRSBpZD0kNCByZXR1cm5pbmcgKmA7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IHJvd3MgfSA9IGF3YWl0IGRiLnF1ZXJ5KGZpbmRPbmVRdWVyeSwgW3JlcS5wYXJhbXMuaWQsIHJlcS51c2VyLmlkXSk7XHJcbiAgICAgIGlmKCFyb3dzWzBdKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5zZW5kKHsnbWVzc2FnZSc6ICdQYXJ0eSBub3QgZm91bmQnfSk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgdmFsdWVzID0gW1xyXG4gICAgICAgIHJlcS5ib2R5Lm5hbWUgfHwgcm93c1swXS5uYW1lLFxyXG4gICAgICAgIHJlcS5ib2R5LnR5cGUgfHwgcm93c1swXS50eXBlLFxyXG4gICAgICAgIG1vbWVudChuZXcgRGF0ZSgpKSxcclxuICAgICAgICByZXEucGFyYW1zLmlkLFxyXG4gICAgICBdO1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRiLnF1ZXJ5KHVwZGF0ZU9uZVF1ZXJ5LCB2YWx1ZXMpO1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLnNlbmQocmVzcG9uc2Uucm93c1swXSk7XHJcbiAgICB9IGNhdGNoKGVycikge1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoZXJyKTtcclxuICAgIH1cclxuICB9XHJcbiAgLyoqXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IHJlcSBcclxuICAgKiBAcGFyYW0ge29iamVjdH0gcmVzIFxyXG4gICAqIEByZXR1cm5zIHt2b2lkfSByZXR1cm4gY29kZSAyMDQgXHJcbiAgICovXHJcbiAgLy8gc3RhdGljIGRlbGV0ZShyZXEsIHJlcykge1xyXG4gIC8vICAgY29uc3QgcGFydHkgPSBwYXJ0eU1vZGVsLmZpbmRPbmUocmVxLnBhcmFtcy5pZCk7XHJcbiAgLy8gICBpZiAoIXBhcnR5KSB7XHJcbiAgLy8gICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuc2VuZCh7XHJcbiAgLy8gICAgICAgXCJzdGF0dXNcIjogNDA0LFxyXG4gIC8vICAgICAgIFwiZXJyb3JcIjogXCJwYXJ0eSBub3QgZm91bmRcIlxyXG4gIC8vICAgICB9KTtcclxuICAvLyAgIH1cclxuICAvLyAgIGNvbnN0IHJlZiA9IHBhcnR5TW9kZWwuZGVsZXRlKHJlcS5wYXJhbXMuaWQpO1xyXG4gIC8vICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHtcclxuICAvLyAgICAgXCJzdGF0dXNcIjogMjAwLFxyXG4gIC8vICAgICBcIm1lc3NhZ2VcIjogXCJQYXJ0eSBoYWQgYmVlbiBkZWxldGVkXCIsXHJcbiAgLy8gICAgIFwiZGF0YVwiOiBwYXJ0eVxyXG4gIC8vICAgfSk7XHJcbiAgLy8gfVxyXG5cclxuXHJcbiAgc3RhdGljIGFzeW5jIGRlbGV0ZShyZXEsIHJlcykge1xyXG4gICAgY29uc3QgZGVsZXRlUXVlcnkgPSAnREVMRVRFIEZST00gcGFydHkgV0hFUkUgaWQ9JDEgcmV0dXJuaW5nIConO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyByb3dzIH0gPSBhd2FpdCBkYi5xdWVyeShkZWxldGVRdWVyeSwgcmVxLnBhcmFtcy5pZCk7XHJcbiAgICAgIGlmKCFyb3dzWzBdKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5zZW5kKHsnbWVzc2FnZSc6ICdwYXJ0eSBub3QgZm91bmQnfSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjA0KS5zZW5kKHsgJ21lc3NhZ2UnOiAnZGVsZXRlZCcgfSk7XHJcbiAgICB9IGNhdGNoKGVycm9yKSB7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZChlcnJvcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufSBcclxuZXhwb3J0IGRlZmF1bHQgUGFydHk7Il19