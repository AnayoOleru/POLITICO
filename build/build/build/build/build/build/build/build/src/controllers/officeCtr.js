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

var _officedb = require('../db/officedb');

var _officedb2 = _interopRequireDefault(_officedb);

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

// import PartyModel from '../models/party';


var Office = function () {
  function Office() {
    _classCallCheck(this, Office);
  }

  _createClass(Office, null, [{
    key: 'create',

    /**
     * 
     * @param {Values} req - request values into keys 
     * @param {Object} res - request object
     * @returns {array} - returns all key value pairs as object in array
     */
    // static createOffice(req, res) {
    //   const {
    //     type,
    //     name
    //   } = req.body;
    //   if (!req.body.type) {
    //       return res.status(400).send({
    //           "status": 404,
    //           "error": "The type and name field are required"
    //   })
    //     }
    //     if(!req.body.name){
    //       return res.status(400).send({
    //           "status": 400,
    //           "error": "The name and type field are required"
    //   })
    //     }
    //   officeDb.push({
    //     id: uuid.v4(),
    //     type,
    //     name
    //   });
    //   return res.status(201).json({
    //       "status": 201,
    //       "data": officeDb
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
                    "message": "office created",
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
     * @returns {array} - returns all key value pairs as object in array
     */

  }, {
    key: 'getOffice',
    value: function getOffice(req, res) {
      return res.status(200).json({
        "status": 200,
        "data": _officedb2.default
      });
    }
    /**
     * 
     * @param {uuid} id
     * @param {Object} res - request object
     * @returns {array} - returns specific party
     */

  }, {
    key: 'getOfficeById',
    value: function getOfficeById(req, res) {
      var officeId = req.params.officeId;

      var officeObject = void 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _officedb2.default[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var office = _step.value;

          // console.log(typeof officeId, typeof office.id)
          if (office.id === Number(officeId)) {
            officeObject = office;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return res.status(200).json({
        "status": 200,
        "data": officeObject
      });
    }
  }]);

  return Office;
}();

exports.default = Office;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy9vZmZpY2VDdHIuanMiXSwibmFtZXMiOlsiT2ZmaWNlIiwicmVxIiwicmVzIiwiaXNBZG1pbiIsInN0YXR1cyIsIm1lc3NhZ2UiLCJjcmVhdGVRdWVyeSIsInZhbHVlcyIsIm1vbWVudCIsInJvd3MiLCJkYiIsIm9mZmljZURiIiwib2ZmaWNlT2JqZWN0Iiwib2ZmaWNlIiwiTnVtYmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBLFFBQUEsUUFBQSxNQUFBLENBQUE7Ozs7QUFDQSxJQUFBLFlBQUEsUUFBQSxnQkFBQSxDQUFBOzs7O0FBQ0EsSUFBQSxhQUFBLFFBQUEsZ0NBQUEsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7OztJQUdNQSxTOzs7Ozs7OztBQUNKOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs2RkFFb0JDLEcsRUFBS0MsRzs7Ozs7OztBQUNmQywwQkFBWUYsSUFBQUEsSUFBQUEsQ0FBWkUsT0FBQUE7O3FCQUNBQSxPOzs7OztpREFDSyxJQUFBLE1BQUEsQ0FBQSxHQUFBLEVBQUEsSUFBQSxDQUFxQjtBQUMxQkMsMEJBRDBCLEdBQUE7QUFFMUJDLDJCQUFTO0FBRmlCLGlCQUFyQixDOzs7QUFLUEMsOEJBQUFBLHlHQUFBQTtBQUlBQyx5QkFBUyxDQUFBLFFBQUEsRUFFYk4sSUFBQUEsSUFBQUEsQ0FGYSxJQUFBLEVBR2JBLElBQUFBLElBQUFBLENBSGEsSUFBQSxFQUliTyxPQUFPLElBSkhELElBSUcsRUFBUEMsQ0FKYSxDQUFURDs7O3VCQVFtQkcsWUFBQUEsT0FBQUEsQ0FBQUEsS0FBQUEsQ0FBQUEsV0FBQUEsRUFBQUEsTUFBQUEsQzs7OztBQUFmRCx1QixNQUFBQSxJQUFBQTtpREFDRCxJQUFBLE1BQUEsQ0FBQSxHQUFBLEVBQUEsSUFBQSxDQUFxQjtBQUMxQiw0QkFEMEIsR0FBQTtBQUUxQiwwQkFBUSxDQUFDO0FBQ1AsK0JBRE8sZ0JBQUE7QUFFUCw2QkFBU0EsS0FBQUEsQ0FBQUE7QUFGRixtQkFBRDtBQUZrQixpQkFBckIsQzs7Ozs7aURBUUEsSUFBQSxNQUFBLENBQUEsR0FBQSxFQUFBLElBQUEsQ0FBcUI7QUFDMUIsNEJBRDBCLEdBQUE7QUFFMUIsMEJBQUEsU0FBQTtBQUYwQixpQkFBckIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRWDs7Ozs7Ozs7OzhCQU1pQlIsRyxFQUFLQyxHLEVBQU07QUFDMUIsYUFBTyxJQUFBLE1BQUEsQ0FBQSxHQUFBLEVBQUEsSUFBQSxDQUFxQjtBQUN4QixrQkFEd0IsR0FBQTtBQUV4QixnQkFBUVMsV0FBQUE7QUFGZ0IsT0FBckIsQ0FBUDtBQUlEO0FBQ0Q7Ozs7Ozs7OztrQ0FNcUJWLEcsRUFBS0MsRyxFQUFLO0FBQUEsVUFBQSxXQUNSRCxJQURRLE1BQ1JBLENBRFEsUUFBQTs7QUFFN0IsVUFBSVcsZUFBQUEsS0FBSixDQUFBO0FBRjZCLFVBQUEsNEJBQUEsSUFBQTtBQUFBLFVBQUEsb0JBQUEsS0FBQTtBQUFBLFVBQUEsaUJBQUEsU0FBQTs7QUFBQSxVQUFBO0FBRzdCLGFBQUEsSUFBQSxZQUFxQkQsV0FBckIsT0FBcUJBLENBQXJCLE9BQUEsUUFBcUJBLEdBQXJCLEVBQUEsS0FBQSxFQUFBLEVBQUEsNEJBQUEsQ0FBQSxRQUFBLFVBQUEsSUFBQSxFQUFBLEVBQUEsSUFBQSxDQUFBLEVBQUEsNEJBQUEsSUFBQSxFQUErQjtBQUFBLGNBQXBCRSxTQUFvQixNQUFBLEtBQUE7O0FBQzNCO0FBQ0EsY0FBSUEsT0FBQUEsRUFBQUEsS0FBY0MsT0FBbEIsUUFBa0JBLENBQWxCLEVBQW9DO0FBQ2hDRiwyQkFBQUEsTUFBQUE7QUFDSDtBQUNKO0FBUjRCLE9BQUEsQ0FBQSxPQUFBLEdBQUEsRUFBQTtBQUFBLDRCQUFBLElBQUE7QUFBQSx5QkFBQSxHQUFBO0FBQUEsT0FBQSxTQUFBO0FBQUEsWUFBQTtBQUFBLGNBQUEsQ0FBQSx5QkFBQSxJQUFBLFVBQUEsTUFBQSxFQUFBO0FBQUEsc0JBQUEsTUFBQTtBQUFBO0FBQUEsU0FBQSxTQUFBO0FBQUEsY0FBQSxpQkFBQSxFQUFBO0FBQUEsa0JBQUEsY0FBQTtBQUFBO0FBQUE7QUFBQTs7QUFTN0IsYUFBTyxJQUFBLE1BQUEsQ0FBQSxHQUFBLEVBQUEsSUFBQSxDQUFxQjtBQUN4QixrQkFEd0IsR0FBQTtBQUV4QixnQkFBUUE7QUFGZ0IsT0FBckIsQ0FBUDtBQUtEOzs7Ozs7a0JBRVlaLE0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXVpZCBmcm9tICd1dWlkJztcclxuaW1wb3J0IG9mZmljZURiIGZyb20gJy4uL2RiL29mZmljZWRiJztcclxuaW1wb3J0IGRiIGZyb20gJy4uLy4uL2RhdGFiYXNlVGFibGVzL2RiY29ubmVjdCc7XHJcbi8vIGltcG9ydCBQYXJ0eU1vZGVsIGZyb20gJy4uL21vZGVscy9wYXJ0eSc7XHJcblxyXG5cclxuY2xhc3MgT2ZmaWNle1xyXG4gIC8qKlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmFsdWVzfSByZXEgLSByZXF1ZXN0IHZhbHVlcyBpbnRvIGtleXMgXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlcyAtIHJlcXVlc3Qgb2JqZWN0XHJcbiAgICogQHJldHVybnMge2FycmF5fSAtIHJldHVybnMgYWxsIGtleSB2YWx1ZSBwYWlycyBhcyBvYmplY3QgaW4gYXJyYXlcclxuICAgKi9cclxuICAvLyBzdGF0aWMgY3JlYXRlT2ZmaWNlKHJlcSwgcmVzKSB7XHJcbiAgLy8gICBjb25zdCB7XHJcbiAgLy8gICAgIHR5cGUsXHJcbiAgLy8gICAgIG5hbWVcclxuICAvLyAgIH0gPSByZXEuYm9keTtcclxuICAvLyAgIGlmICghcmVxLmJvZHkudHlwZSkge1xyXG4gIC8vICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XHJcbiAgLy8gICAgICAgICAgIFwic3RhdHVzXCI6IDQwNCxcclxuICAvLyAgICAgICAgICAgXCJlcnJvclwiOiBcIlRoZSB0eXBlIGFuZCBuYW1lIGZpZWxkIGFyZSByZXF1aXJlZFwiXHJcbiAgLy8gICB9KVxyXG4gIC8vICAgICB9XHJcbiAgLy8gICAgIGlmKCFyZXEuYm9keS5uYW1lKXtcclxuICAvLyAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xyXG4gIC8vICAgICAgICAgICBcInN0YXR1c1wiOiA0MDAsXHJcbiAgLy8gICAgICAgICAgIFwiZXJyb3JcIjogXCJUaGUgbmFtZSBhbmQgdHlwZSBmaWVsZCBhcmUgcmVxdWlyZWRcIlxyXG4gIC8vICAgfSlcclxuICAvLyAgICAgfVxyXG4gIC8vICAgb2ZmaWNlRGIucHVzaCh7XHJcbiAgLy8gICAgIGlkOiB1dWlkLnY0KCksXHJcbiAgLy8gICAgIHR5cGUsXHJcbiAgLy8gICAgIG5hbWVcclxuICAvLyAgIH0pO1xyXG4gIC8vICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAxKS5qc29uKHtcclxuICAvLyAgICAgICBcInN0YXR1c1wiOiAyMDEsXHJcbiAgLy8gICAgICAgXCJkYXRhXCI6IG9mZmljZURiXHJcbiAgLy8gICB9KTtcclxuICAvLyB9XHJcblxyXG4gIHN0YXRpYyBhc3luYyBjcmVhdGUocmVxLCByZXMpIHtcclxuICAgIGNvbnN0IHsgaXNBZG1pbiB9ID0gcmVxLnVzZXI7XHJcbiAgICAgICAgaWYgKGlzQWRtaW4pIHtcclxuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMykuanNvbih7XHJcbiAgICAgICAgICAgIHN0YXR1czogNDAzLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBcIkFjY2VzcyBkZW5pZWQsIHlvdSBkb24ndCBoYXZlIHRoZSByZXF1aXJlZCBjcmVkZW50aWFscyB0byBhY2Nlc3MgdGhpcyByb3V0ZVwiLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgY29uc3QgY3JlYXRlUXVlcnkgPSBgSU5TRVJUIElOVE9cclxuICAgICAgcGFydHkoaWQsIG5hbWUsIHR5cGUsIGNyZWF0ZWRfZGF0ZSlcclxuICAgICAgVkFMVUVTKCQxLCAkMiwgJDMsICQ0KVxyXG4gICAgICByZXR1cm5pbmcgKmA7XHJcbiAgICBjb25zdCB2YWx1ZXMgPSBbXHJcbiAgICAgIHV1aWR2NCgpLFxyXG4gICAgICByZXEuYm9keS5uYW1lLFxyXG4gICAgICByZXEuYm9keS50eXBlLFxyXG4gICAgICBtb21lbnQobmV3IERhdGUoKSlcclxuICAgIF07XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyByb3dzIH0gPSBhd2FpdCBkYi5xdWVyeShjcmVhdGVRdWVyeSwgdmFsdWVzKTtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAxKS5zZW5kKHtcclxuICAgICAgICBcInN0YXR1c1wiOiAyMDEsXHJcbiAgICAgICAgXCJkYXRhXCI6IFt7XHJcbiAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJvZmZpY2UgY3JlYXRlZFwiLFxyXG4gICAgICAgICAgXCJvcmRlclwiOiByb3dzWzBdLFxyXG4gICAgICAgIH1dLFxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2goZXJyb3IpIHtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcclxuICAgICAgICBcInN0YXR1c1wiOiA0MDAsXHJcbiAgICAgICAgXCJkYXRhXCI6IGVycm9yXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7dXVpZH0gaWRcclxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVzIC0gcmVxdWVzdCBvYmplY3RcclxuICAgKiBAcmV0dXJucyB7YXJyYXl9IC0gcmV0dXJucyBhbGwga2V5IHZhbHVlIHBhaXJzIGFzIG9iamVjdCBpbiBhcnJheVxyXG4gICAqL1xyXG4gIHN0YXRpYyBnZXRPZmZpY2UocmVxLCByZXMpICB7XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICAgIFwic3RhdHVzXCI6IDIwMCxcclxuICAgICAgICBcImRhdGFcIjogb2ZmaWNlRGJcclxuICAgIH0pO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBcclxuICAgKiBAcGFyYW0ge3V1aWR9IGlkXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlcyAtIHJlcXVlc3Qgb2JqZWN0XHJcbiAgICogQHJldHVybnMge2FycmF5fSAtIHJldHVybnMgc3BlY2lmaWMgcGFydHlcclxuICAgKi9cclxuICBzdGF0aWMgZ2V0T2ZmaWNlQnlJZChyZXEsIHJlcykge1xyXG4gICAgY29uc3QgeyBvZmZpY2VJZCB9ID0gcmVxLnBhcmFtcztcclxuICAgIGxldCBvZmZpY2VPYmplY3Q7XHJcbiAgICBmb3IgKGNvbnN0IG9mZmljZSBvZiBvZmZpY2VEYikge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHR5cGVvZiBvZmZpY2VJZCwgdHlwZW9mIG9mZmljZS5pZClcclxuICAgICAgICBpZiAob2ZmaWNlLmlkID09PSBOdW1iZXIob2ZmaWNlSWQpKSB7XHJcbiAgICAgICAgICAgIG9mZmljZU9iamVjdCA9IG9mZmljZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgICAgXCJzdGF0dXNcIjogMjAwLFxyXG4gICAgICAgIFwiZGF0YVwiOiBvZmZpY2VPYmplY3RcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IE9mZmljZTtcclxuIl19