'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _partydb = require('../db/partydb');

var _partydb2 = _interopRequireDefault(_partydb);

var _party = require('../models/party');

var _party2 = _interopRequireDefault(_party);

var _dbconnect = require('../../databaseTables/dbconnect');

var _dbconnect2 = _interopRequireDefault(_dbconnect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var isAdmin, createQuery, values, _ref2, rows;

        return regeneratorRuntime.wrap(function _callee$(_context) {
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
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var findOneQuery, updateOneQuery, _ref4, rows, values, response;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
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
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var deleteQuery, _ref6, rows;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy9wYXJ0eUN0ci5qcyJdLCJuYW1lcyI6WyJwYXJ0eU1vZGVsIiwiUGFydHlNb2RlbCIsIlBhcnR5IiwicmVxIiwicmVzIiwiaXNBZG1pbiIsInVzZXIiLCJzdGF0dXMiLCJqc29uIiwibWVzc2FnZSIsImNyZWF0ZVF1ZXJ5IiwidmFsdWVzIiwidXVpZHY0IiwiYm9keSIsIm5hbWUiLCJ0eXBlIiwibW9tZW50IiwiRGF0ZSIsImRiIiwicXVlcnkiLCJyb3dzIiwic2VuZCIsInBhcnR5SWQiLCJwYXJhbXMiLCJwYXJ0eU9iamVjdCIsInBhcnR5RGIiLCJmb3JFYWNoIiwicGFydHkiLCJpZCIsIk51bWJlciIsImZpbmRPbmVRdWVyeSIsInVwZGF0ZU9uZVF1ZXJ5IiwicmVzcG9uc2UiLCJkZWxldGVRdWVyeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztBQUVBLElBQU1BLGFBQWEsSUFBSUMsZUFBSixFQUFuQjs7SUFFTUMsSzs7Ozs7Ozs7QUFDSjs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzBGQUVvQkMsRyxFQUFLQyxHOzs7Ozs7O0FBQ2ZDLHVCLEdBQVlGLElBQUlHLEksQ0FBaEJELE87O3FCQUNBQSxPOzs7OztpREFDS0QsSUFBSUcsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQzFCRCwwQkFBUSxHQURrQjtBQUUxQkUsMkJBQVM7QUFGaUIsaUJBQXJCLEM7OztBQUtQQywyQjtBQUlBQyxzQixHQUFTLENBQ2JDLFFBRGEsRUFFYlQsSUFBSVUsSUFBSixDQUFTQyxJQUZJLEVBR2JYLElBQUlVLElBQUosQ0FBU0UsSUFISSxFQUliQyxPQUFPLElBQUlDLElBQUosRUFBUCxDQUphLEM7Ozt1QkFRVUMsb0JBQUdD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RyxNQUFKLENBQVcsR0FBWCxFQUFnQmMsSUFBaEIsQ0FBcUIsRUFBQyxXQUFXLGlCQUFaLEVBQXJCLEM7OztrREFFRmpCLElBQUlHLE1BQUosQ0FBVyxHQUFYLEVBQWdCYyxJQUFoQixDQUFxQixFQUFFLFdBQVcsU0FBYixFQUFyQixDOzs7OztrREFFQWpCLElBQUlHLE1BQUosQ0FBVyxHQUFYLEVBQWdCYyxJQUFoQixjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBS0VuQixLIiwiZmlsZSI6InBhcnR5Q3RyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB1dWlkIGZyb20gJ3V1aWQnO1xyXG5pbXBvcnQgcGFydHlEYiBmcm9tICcuLi9kYi9wYXJ0eWRiJztcclxuaW1wb3J0IFBhcnR5TW9kZWwgZnJvbSAnLi4vbW9kZWxzL3BhcnR5JztcclxuaW1wb3J0IGRiIGZyb20gJy4uLy4uL2RhdGFiYXNlVGFibGVzL2RiY29ubmVjdCc7XHJcblxyXG5jb25zdCBwYXJ0eU1vZGVsID0gbmV3IFBhcnR5TW9kZWwoKVxyXG5cclxuY2xhc3MgUGFydHl7XHJcbiAgLyoqXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWYWx1ZXN9IHJlcSAtIHJlcXVlc3QgdmFsdWVzIGludG8ga2V5cyBcclxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVzIC0gcmVxdWVzdCBvYmplY3RcclxuICAgKiBAcmV0dXJucyB7YXJyYXl9IC0gcmV0dXJucyBhbGwga2V5IHZhbHVlIHBhaXJzIGFzIG9iamVjdCBpbiBhcnJheVxyXG4gICAqL1xyXG4gIC8vIHN0YXRpYyBjcmVhdGVQYXJ0eShyZXEsIHJlcykge1xyXG4gIC8vICAgY29uc3Qge1xyXG4gIC8vICAgICBuYW1lLFxyXG4gIC8vICAgICBocWFkZHJlc3MsXHJcbiAgLy8gICAgIGxvZ29VUkxcclxuICAvLyAgIH0gPSByZXEuYm9keTtcclxuICAvLyAgIHBhcnR5RGIucHVzaCh7XHJcbiAgLy8gICAgIGlkOiB1dWlkLnY0KCksXHJcbiAgLy8gICAgIG5hbWUsXHJcbiAgLy8gICAgIGhxYWRkcmVzcyxcclxuICAvLyAgICAgbG9nb1VSTFxyXG4gIC8vICAgfSk7XHJcbiAgLy8gICByZXR1cm4gcmVzLnN0YXR1cygyMDEpLmpzb24oe1xyXG4gIC8vICAgICBcInN0YXR1c1wiOiAyMDEsXHJcbiAgLy8gICAgIFwiZGF0YVwiOiBwYXJ0eURiXHJcbiAgLy8gICB9KTtcclxuICAvLyB9XHJcblxyXG4gIHN0YXRpYyBhc3luYyBjcmVhdGUocmVxLCByZXMpIHtcclxuICAgIGNvbnN0IHsgaXNBZG1pbiB9ID0gcmVxLnVzZXI7XHJcbiAgICAgICAgaWYgKGlzQWRtaW4pIHtcclxuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMykuanNvbih7XHJcbiAgICAgICAgICAgIHN0YXR1czogNDAzLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBcIkFjY2VzcyBkZW5pZWQsIHlvdSBkb24ndCBoYXZlIHRoZSByZXF1aXJlZCBjcmVkZW50aWFscyB0byBhY2Nlc3MgdGhpcyByb3V0ZVwiLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgY29uc3QgY3JlYXRlUXVlcnkgPSBgSU5TRVJUIElOVE9cclxuICAgICAgcGFydHkoaWQsIG5hbWUsIHR5cGUsIGNyZWF0ZWRfZGF0ZSlcclxuICAgICAgVkFMVUVTKCQxLCAkMiwgJDMsICQ0KVxyXG4gICAgICByZXR1cm5pbmcgKmA7XHJcbiAgICBjb25zdCB2YWx1ZXMgPSBbXHJcbiAgICAgIHV1aWR2NCgpLFxyXG4gICAgICByZXEuYm9keS5uYW1lLFxyXG4gICAgICByZXEuYm9keS50eXBlLFxyXG4gICAgICBtb21lbnQobmV3IERhdGUoKSlcclxuICAgIF07XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyByb3dzIH0gPSBhd2FpdCBkYi5xdWVyeShjcmVhdGVRdWVyeSwgdmFsdWVzKTtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAxKS5zZW5kKHtcclxuICAgICAgICBcInN0YXR1c1wiOiAyMDEsXHJcbiAgICAgICAgXCJkYXRhXCI6IFt7XHJcbiAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJwYXJ0eSBjcmVhdGVkXCIsXHJcbiAgICAgICAgICBcIm9yZGVyXCI6IHJvd3NbMF0sXHJcbiAgICAgICAgfV0sXHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaChlcnJvcikge1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xyXG4gICAgICAgIFwic3RhdHVzXCI6IDQwMCxcclxuICAgICAgICBcImRhdGFcIjogZXJyb3JcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBcclxuICAgKiBAcGFyYW0ge3V1aWR9IGlkXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlcyAtIHJlcXVlc3Qgb2JqZWN0XHJcbiAgICogQHJldHVybnMge2FycmF5fSAtIHJldHVybnMgc3BlY2lmaWMgcGFydHlcclxuICAgKi9cclxuICBzdGF0aWMgZ2V0UGFydHlCeUlkKHJlcSwgcmVzKSB7XHJcbiAgICBjb25zdCB7IHBhcnR5SWQgfSA9IHJlcS5wYXJhbXM7XHJcbiAgICBsZXQgcGFydHlPYmplY3Q7XHJcbiAgICBwYXJ0eURiLmZvckVhY2goKHBhcnR5KSA9PiB7XHJcbiAgICAgIFxyXG4gICAgICBpZihwYXJ0eS5pZCA9PT0gTnVtYmVyKHBhcnR5SWQpKSB7XHJcbiAgICAgICAgcGFydHlPYmplY3QgPSBwYXJ0eTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICBcInN0YXR1c1wiOiAyMDAsXHJcbiAgICAgIFwiZGF0YVwiOiBwYXJ0eU9iamVjdFxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7dXVpZH0gaWRcclxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVzIC0gcmVxdWVzdCBvYmplY3RcclxuICAgKiBAcmV0dXJucyB7YXJyYXl9IC0gcmV0dXJucyBhbGwga2V5IHZhbHVlIHBhaXJzIGFzIG9iamVjdCBpbiBhcnJheVxyXG4gICAqL1xyXG4gIHN0YXRpYyBnZXRQYXJ0aWVzKHJlcSwgcmVzKSAge1xyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcclxuICAgICAgXCJzdGF0dXNcIjogMjAwLFxyXG4gICAgICBcImRhdGFcIjogcGFydHlEYlxyXG4gICAgfSk7XHJcbiAgfVxyXG4vKipcclxuICAgKiBcclxuICAgKiBAcGFyYW0ge29iamVjdH0gcmVxIFxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSByZXMgXHJcbiAgICogQHJldHVybnMge29iamVjdH0gdXBkYXRlZCBwYXJ0eVxyXG4gICAqL1xyXG4gIC8vIHN0YXRpYyB1cGRhdGUocmVxLCByZXMpIHtcclxuICAvLyAgIGxldCBwYXJ0eU9iamVjdDtcclxuXHJcbiAgLy8gICBjb25zdCBwYXJ0eSA9IHBhcnR5TW9kZWwuZmluZE9uZShyZXEucGFyYW1zLmlkKTtcclxuICAvLyAgIGNvbnNvbGUubG9nKHBhcnR5KTtcclxuICAvLyAgIGlmICghcGFydHkpIHtcclxuICAvLyAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5zZW5kKHtcclxuICAvLyAgICAgICBcInN0YXR1c1wiOiA0MDQsXHJcbiAgLy8gICAgICAgXCJlcnJvclwiOiBcInBhcnR5IG5vdCBmb3VuZFwiXHJcbiAgLy8gICAgIH0pO1xyXG4gIC8vICAgfVxyXG4gIC8vICAgcGFydHkubmFtZSA9IHJlcS5ib2R5Lm5hbWVcclxuICAvLyAgIC8vIGNvbnN0IHVwZGF0ZWRQYXJ0eSA9IFBhcnR5TW9kZWwudXBkYXRlKHJlcS5wYXJhbXMuaWQsIHJlcS5ib2R5KVxyXG4gIC8vICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHBhcnR5KTtcclxuICAvLyB9XHJcblxyXG4gIHN0YXRpYyBhc3luYyB1cGRhdGUocmVxLCByZXMpIHtcclxuICAgIGNvbnN0IGZpbmRPbmVRdWVyeSA9ICdTRUxFQ1QgKiBGUk9NIHBhcnR5IFdIRVJFIGlkPSQxJztcclxuICAgIGNvbnN0IHVwZGF0ZU9uZVF1ZXJ5ID1gVVBEQVRFIHBhcnR5XHJcbiAgICAgIFNFVCBuYW1lPSQxLHR5cGU9JDIsIG1vZGlmaWVkX2RhdGU9JDNcclxuICAgICAgV0hFUkUgaWQ9JDQgcmV0dXJuaW5nICpgO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyByb3dzIH0gPSBhd2FpdCBkYi5xdWVyeShmaW5kT25lUXVlcnksIFtyZXEucGFyYW1zLmlkLCByZXEudXNlci5pZF0pO1xyXG4gICAgICBpZighcm93c1swXSkge1xyXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuc2VuZCh7J21lc3NhZ2UnOiAnUGFydHkgbm90IGZvdW5kJ30pO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHZhbHVlcyA9IFtcclxuICAgICAgICByZXEuYm9keS5uYW1lIHx8IHJvd3NbMF0ubmFtZSxcclxuICAgICAgICByZXEuYm9keS50eXBlIHx8IHJvd3NbMF0udHlwZSxcclxuICAgICAgICBtb21lbnQobmV3IERhdGUoKSksXHJcbiAgICAgICAgcmVxLnBhcmFtcy5pZCxcclxuICAgICAgXTtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkYi5xdWVyeSh1cGRhdGVPbmVRdWVyeSwgdmFsdWVzKTtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHJlc3BvbnNlLnJvd3NbMF0pO1xyXG4gICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKGVycik7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSByZXEgXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IHJlcyBcclxuICAgKiBAcmV0dXJucyB7dm9pZH0gcmV0dXJuIGNvZGUgMjA0IFxyXG4gICAqL1xyXG4gIC8vIHN0YXRpYyBkZWxldGUocmVxLCByZXMpIHtcclxuICAvLyAgIGNvbnN0IHBhcnR5ID0gcGFydHlNb2RlbC5maW5kT25lKHJlcS5wYXJhbXMuaWQpO1xyXG4gIC8vICAgaWYgKCFwYXJ0eSkge1xyXG4gIC8vICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLnNlbmQoe1xyXG4gIC8vICAgICAgIFwic3RhdHVzXCI6IDQwNCxcclxuICAvLyAgICAgICBcImVycm9yXCI6IFwicGFydHkgbm90IGZvdW5kXCJcclxuICAvLyAgICAgfSk7XHJcbiAgLy8gICB9XHJcbiAgLy8gICBjb25zdCByZWYgPSBwYXJ0eU1vZGVsLmRlbGV0ZShyZXEucGFyYW1zLmlkKTtcclxuICAvLyAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuc2VuZCh7XHJcbiAgLy8gICAgIFwic3RhdHVzXCI6IDIwMCxcclxuICAvLyAgICAgXCJtZXNzYWdlXCI6IFwiUGFydHkgaGFkIGJlZW4gZGVsZXRlZFwiLFxyXG4gIC8vICAgICBcImRhdGFcIjogcGFydHlcclxuICAvLyAgIH0pO1xyXG4gIC8vIH1cclxuXHJcblxyXG4gIHN0YXRpYyBhc3luYyBkZWxldGUocmVxLCByZXMpIHtcclxuICAgIGNvbnN0IGRlbGV0ZVF1ZXJ5ID0gJ0RFTEVURSBGUk9NIHBhcnR5IFdIRVJFIGlkPSQxIHJldHVybmluZyAqJztcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHsgcm93cyB9ID0gYXdhaXQgZGIucXVlcnkoZGVsZXRlUXVlcnksIHJlcS5wYXJhbXMuaWQpO1xyXG4gICAgICBpZighcm93c1swXSkge1xyXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuc2VuZCh7J21lc3NhZ2UnOiAncGFydHkgbm90IGZvdW5kJ30pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwNCkuc2VuZCh7ICdtZXNzYWdlJzogJ2RlbGV0ZWQnIH0pO1xyXG4gICAgfSBjYXRjaChlcnJvcikge1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoZXJyb3IpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn0gXHJcbmV4cG9ydCBkZWZhdWx0IFBhcnR5OyJdfQ==