'use strict';

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault2(_regenerator);

function _interopRequireDefault2(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy9wYXJ0eUN0ci5qcyJdLCJuYW1lcyI6WyJwYXJ0eU1vZGVsIiwiUGFydHlNb2RlbCIsIlBhcnR5IiwicmVxIiwicmVzIiwiaXNBZG1pbiIsInN0YXR1cyIsIm1lc3NhZ2UiLCJjcmVhdGVRdWVyeSIsInZhbHVlcyIsIm1vbWVudCIsInJvd3MiLCJkYiIsInBhcnR5T2JqZWN0IiwicGFydHlEYiIsInBhcnR5IiwiTnVtYmVyIiwiZmluZE9uZVF1ZXJ5IiwidXBkYXRlT25lUXVlcnkiLCJyZXNwb25zZSIsImRlbGV0ZVF1ZXJ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxJQUFBLFFBQUEsUUFBQSxNQUFBLENBQUE7Ozs7QUFDQSxJQUFBLFdBQUEsUUFBQSxlQUFBLENBQUE7Ozs7QUFDQSxJQUFBLFNBQUEsUUFBQSxpQkFBQSxDQUFBOzs7O0FBQ0EsSUFBQSxhQUFBLFFBQUEsZ0NBQUEsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsYUFBYSxJQUFJQyxRQUF2QixPQUFtQixFQUFuQjs7SUFFTUMsUTs7Ozs7Ozs7QUFDSjs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzZGQUVvQkMsRyxFQUFLQyxHOzs7Ozs7O0FBQ2ZDLDBCQUFZRixJQUFBQSxJQUFBQSxDQUFaRSxPQUFBQTs7cUJBQ0FBLE87Ozs7O2lEQUNLLElBQUEsTUFBQSxDQUFBLEdBQUEsRUFBQSxJQUFBLENBQXFCO0FBQzFCQywwQkFEMEIsR0FBQTtBQUUxQkMsMkJBQVM7QUFGaUIsaUJBQXJCLEM7OztBQUtQQyw4QkFBQUEseUdBQUFBO0FBSUFDLHlCQUFTLENBQUEsUUFBQSxFQUViTixJQUFBQSxJQUFBQSxDQUZhLElBQUEsRUFHYkEsSUFBQUEsSUFBQUEs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Q0E7QUFDQTs7Ozs7OytGQUdvQkQsRyxFQUFLQyxHOzs7Ozs7O0FBQ2pCZ0IsOEJBQUFBLDJDQUFBQTs7O3VCQUVtQlIsWUFBQUEsT0FBQUEsQ0FBQUEsS0FBQUEsQ0FBQUEsV0FBQUEsRUFBc0JULElBQUFBLE1BQUFBLENBQXRCUyxFQUFBQSxDOzs7O0FBQWZELHVCLE1BQUFBLElBQUFBOztvQkFDSkEsS0FBQUEsQ0FBQUEsQzs7Ozs7a0RBQ0tQLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLEVBQUFBLElBQUFBLENBQXFCLEVBQUMsV0FBdEJBLGlCQUFxQixFQUFyQkEsQzs7O2tEQUVGQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxFQUFBQSxJQUFBQSxDQUFxQixFQUFFLFdBQXZCQSxTQUFxQixFQUFyQkEsQzs7Ozs7a0RBRUFBLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLEVBQUFBLElBQUFBLENBQUFBLFVBQUFBLEVBQUFBLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkFLRUYsSyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgdXVpZCBmcm9tICd1dWlkJztcclxuaW1wb3J0IHBhcnR5RGIgZnJvbSAnLi4vZGIvcGFydHlkYic7XHJcbmltcG9ydCBQYXJ0eU1vZGVsIGZyb20gJy4uL21vZGVscy9wYXJ0eSc7XHJcbmltcG9ydCBkYiBmcm9tICcuLi8uLi9kYXRhYmFzZVRhYmxlcy9kYmNvbm5lY3QnO1xyXG5cclxuY29uc3QgcGFydHlNb2RlbCA9IG5ldyBQYXJ0eU1vZGVsKClcclxuXHJcbmNsYXNzIFBhcnR5e1xyXG4gIC8qKlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmFsdWVzfSByZXEgLSByZXF1ZXN0IHZhbHVlcyBpbnRvIGtleXMgXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlcyAtIHJlcXVlc3Qgb2JqZWN0XHJcbiAgICogQHJldHVybnMge2FycmF5fSAtIHJldHVybnMgYWxsIGtleSB2YWx1ZSBwYWlycyBhcyBvYmplY3QgaW4gYXJyYXlcclxuICAgKi9cclxuICAvLyBzdGF0aWMgY3JlYXRlUGFydHkocmVxLCByZXMpIHtcclxuICAvLyAgIGNvbnN0IHtcclxuICAvLyAgICAgbmFtZSxcclxuICAvLyAgICAgaHFhZGRyZXNzLFxyXG4gIC8vICAgICBsb2dvVVJMXHJcbiAgLy8gICB9ID0gcmVxLmJvZHk7XHJcbiAgLy8gICBwYXJ0eURiLnB1c2goe1xyXG4gIC8vICAgICBpZDogdXVpZC52NCgpLFxyXG4gIC8vICAgICBuYW1lLFxyXG4gIC8vICAgICBocWFkZHJlc3MsXHJcbiAgLy8gICAgIGxvZ29VUkxcclxuICAvLyAgIH0pO1xyXG4gIC8vICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAxKS5qc29uKHtcclxuICAvLyAgICAgXCJzdGF0dXNcIjogMjAxLFxyXG4gIC8vICAgICBcImRhdGFcIjogcGFydHlEYlxyXG4gIC8vICAgfSk7XHJcbiAgLy8gfVxyXG5cclxuICBzdGF0aWMgYXN5bmMgY3JlYXRlKHJlcSwgcmVzKSB7XHJcbiAgICBjb25zdCB7IGlzQWRtaW4gfSA9IHJlcS51c2VyO1xyXG4gICAgICAgIGlmIChpc0FkbWluKSB7XHJcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDMpLmpzb24oe1xyXG4gICAgICAgICAgICBzdGF0dXM6IDQwMyxcclxuICAgICAgICAgICAgbWVzc2FnZTogXCJBY2Nlc3MgZGVuaWVkLCB5b3UgZG9uJ3QgaGF2ZSB0aGUgcmVxdWlyZWQgY3JlZGVudGlhbHMgdG8gYWNjZXNzIHRoaXMgcm91dGVcIixcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIGNvbnN0IGNyZWF0ZVF1ZXJ5ID0gYElOU0VSVCBJTlRPXHJcbiAgICAgIHBhcnR5KGlkLCBuYW1lLCB0eXBlLCBjcmVhdGVkX2RhdGUpXHJcbiAgICAgIFZBTFVFUygkMSwgJDIsICQzLCAkNClcclxuICAgICAgcmV0dXJuaW5nICpgO1xyXG4gICAgY29uc3QgdmFsdWVzID0gW1xyXG4gICAgICB1dWlkdjQoKSxcclxuICAgICAgcmVxLmJvZHkubmFtZSxcclxuICAgICAgcmVxLmJvZHkudHlwZSxcclxuICAgICAgbW9tZW50KG5ldyBEYXRlKCkpXHJcbiAgICBdO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHsgcm93cyB9ID0gYXdhaXQgZGIucXVlcnkoY3JlYXRlUXVlcnksIHZhbHVlcyk7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMSkuc2VuZCh7XHJcbiAgICAgICAgXCJzdGF0dXNcIjogMjAxLFxyXG4gICAgICAgIFwiZGF0YVwiOiBbe1xyXG4gICAgICAgICAgXCJtZXNzYWdlXCI6IFwicGFydHkgY3JlYXRlZFwiLFxyXG4gICAgICAgICAgXCJvcmRlclwiOiByb3dzWzBdLFxyXG4gICAgICAgIH1dLFxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2goZXJyb3IpIHtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcclxuICAgICAgICBcInN0YXR1c1wiOiA0MDAsXHJcbiAgICAgICAgXCJkYXRhXCI6IGVycm9yXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHt1dWlkfSBpZFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXMgLSByZXF1ZXN0IG9iamVjdFxyXG4gICAqIEByZXR1cm5zIHthcnJheX0gLSByZXR1cm5zIHNwZWNpZmljIHBhcnR5XHJcbiAgICovXHJcbiAgc3RhdGljIGdldFBhcnR5QnlJZChyZXEsIHJlcykge1xyXG4gICAgY29uc3QgeyBwYXJ0eUlkIH0gPSByZXEucGFyYW1zO1xyXG4gICAgbGV0IHBhcnR5T2JqZWN0O1xyXG4gICAgcGFydHlEYi5mb3JFYWNoKChwYXJ0eSkgPT4ge1xyXG4gICAgICBcclxuICAgICAgaWYocGFydHkuaWQgPT09IE51bWJlcihwYXJ0eUlkKSkge1xyXG4gICAgICAgIHBhcnR5T2JqZWN0ID0gcGFydHk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcclxuICAgICAgXCJzdGF0dXNcIjogMjAwLFxyXG4gICAgICBcImRhdGFcIjogcGFydHlPYmplY3RcclxuICAgIH0pO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBcclxuICAgKiBAcGFyYW0ge3V1aWR9IGlkXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlcyAtIHJlcXVlc3Qgb2JqZWN0XHJcbiAgICogQHJldHVybnMge2FycmF5fSAtIHJldHVybnMgYWxsIGtleSB2YWx1ZSBwYWlycyBhcyBvYmplY3QgaW4gYXJyYXlcclxuICAgKi9cclxuICBzdGF0aWMgZ2V0UGFydGllcyhyZXEsIHJlcykgIHtcclxuICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgIFwic3RhdHVzXCI6IDIwMCxcclxuICAgICAgXCJkYXRhXCI6IHBhcnR5RGJcclxuICAgIH0pO1xyXG4gIH1cclxuLyoqXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IHJlcSBcclxuICAgKiBAcGFyYW0ge29iamVjdH0gcmVzIFxyXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IHVwZGF0ZWQgcGFydHlcclxuICAgKi9cclxuICAvLyBzdGF0aWMgdXBkYXRlKHJlcSwgcmVzKSB7XHJcbiAgLy8gICBsZXQgcGFydHlPYmplY3Q7XHJcblxyXG4gIC8vICAgY29uc3QgcGFydHkgPSBwYXJ0eU1vZGVsLmZpbmRPbmUocmVxLnBhcmFtcy5pZCk7XHJcbiAgLy8gICBjb25zb2xlLmxvZyhwYXJ0eSk7XHJcbiAgLy8gICBpZiAoIXBhcnR5KSB7XHJcbiAgLy8gICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuc2VuZCh7XHJcbiAgLy8gICAgICAgXCJzdGF0dXNcIjogNDA0LFxyXG4gIC8vICAgICAgIFwiZXJyb3JcIjogXCJwYXJ0eSBub3QgZm91bmRcIlxyXG4gIC8vICAgICB9KTtcclxuICAvLyAgIH1cclxuICAvLyAgIHBhcnR5Lm5hbWUgPSByZXEuYm9keS5uYW1lXHJcbiAgLy8gICAvLyBjb25zdCB1cGRhdGVkUGFydHkgPSBQYXJ0eU1vZGVsLnVwZGF0ZShyZXEucGFyYW1zLmlkLCByZXEuYm9keSlcclxuICAvLyAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuc2VuZChwYXJ0eSk7XHJcbiAgLy8gfVxyXG5cclxuICBzdGF0aWMgYXN5bmMgdXBkYXRlKHJlcSwgcmVzKSB7XHJcbiAgICBjb25zdCBmaW5kT25lUXVlcnkgPSAnU0VMRUNUICogRlJPTSBwYXJ0eSBXSEVSRSBpZD0kMSc7XHJcbiAgICBjb25zdCB1cGRhdGVPbmVRdWVyeSA9YFVQREFURSBwYXJ0eVxyXG4gICAgICBTRVQgbmFtZT0kMSx0eXBlPSQyLCBtb2RpZmllZF9kYXRlPSQzXHJcbiAgICAgIFdIRVJFIGlkPSQ0IHJldHVybmluZyAqYDtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHsgcm93cyB9ID0gYXdhaXQgZGIucXVlcnkoZmluZE9uZVF1ZXJ5LCBbcmVxLnBhcmFtcy5pZCwgcmVxLnVzZXIuaWRdKTtcclxuICAgICAgaWYoIXJvd3NbMF0pIHtcclxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLnNlbmQoeydtZXNzYWdlJzogJ1BhcnR5IG5vdCBmb3VuZCd9KTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCB2YWx1ZXMgPSBbXHJcbiAgICAgICAgcmVxLmJvZHkubmFtZSB8fCByb3dzWzBdLm5hbWUsXHJcbiAgICAgICAgcmVxLmJvZHkudHlwZSB8fCByb3dzWzBdLnR5cGUsXHJcbiAgICAgICAgbW9tZW50KG5ldyBEYXRlKCkpLFxyXG4gICAgICAgIHJlcS5wYXJhbXMuaWQsXHJcbiAgICAgIF07XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGIucXVlcnkodXBkYXRlT25lUXVlcnksIHZhbHVlcyk7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuc2VuZChyZXNwb25zZS5yb3dzWzBdKTtcclxuICAgIH0gY2F0Y2goZXJyKSB7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZChlcnIpO1xyXG4gICAgfVxyXG4gIH1cclxuICAvKipcclxuICAgKiBcclxuICAgKiBAcGFyYW0ge29iamVjdH0gcmVxIFxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSByZXMgXHJcbiAgICogQHJldHVybnMge3ZvaWR9IHJldHVybiBjb2RlIDIwNCBcclxuICAgKi9cclxuICAvLyBzdGF0aWMgZGVsZXRlKHJlcSwgcmVzKSB7XHJcbiAgLy8gICBjb25zdCBwYXJ0eSA9IHBhcnR5TW9kZWwuZmluZE9uZShyZXEucGFyYW1zLmlkKTtcclxuICAvLyAgIGlmICghcGFydHkpIHtcclxuICAvLyAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5zZW5kKHtcclxuICAvLyAgICAgICBcInN0YXR1c1wiOiA0MDQsXHJcbiAgLy8gICAgICAgXCJlcnJvclwiOiBcInBhcnR5IG5vdCBmb3VuZFwiXHJcbiAgLy8gICAgIH0pO1xyXG4gIC8vICAgfVxyXG4gIC8vICAgY29uc3QgcmVmID0gcGFydHlNb2RlbC5kZWxldGUocmVxLnBhcmFtcy5pZCk7XHJcbiAgLy8gICByZXR1cm4gcmVzLnN0YXR1cygyMDApLnNlbmQoe1xyXG4gIC8vICAgICBcInN0YXR1c1wiOiAyMDAsXHJcbiAgLy8gICAgIFwibWVzc2FnZVwiOiBcIlBhcnR5IGhhZCBiZWVuIGRlbGV0ZWRcIixcclxuICAvLyAgICAgXCJkYXRhXCI6IHBhcnR5XHJcbiAgLy8gICB9KTtcclxuICAvLyB9XHJcblxyXG5cclxuICBzdGF0aWMgYXN5bmMgZGVsZXRlKHJlcSwgcmVzKSB7XHJcbiAgICBjb25zdCBkZWxldGVRdWVyeSA9ICdERUxFVEUgRlJPTSBwYXJ0eSBXSEVSRSBpZD0kMSByZXR1cm5pbmcgKic7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IHJvd3MgfSA9IGF3YWl0IGRiLnF1ZXJ5KGRlbGV0ZVF1ZXJ5LCByZXEucGFyYW1zLmlkKTtcclxuICAgICAgaWYoIXJvd3NbMF0pIHtcclxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLnNlbmQoeydtZXNzYWdlJzogJ3BhcnR5IG5vdCBmb3VuZCd9KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDQpLnNlbmQoeyAnbWVzc2FnZSc6ICdkZWxldGVkJyB9KTtcclxuICAgIH0gY2F0Y2goZXJyb3IpIHtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKGVycm9yKTtcclxuICAgIH1cclxuICB9XHJcblxyXG59IFxyXG5leHBvcnQgZGVmYXVsdCBQYXJ0eTsiXX0=