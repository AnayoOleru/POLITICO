'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _officedb = require('../db/officedb');

var _officedb2 = _interopRequireDefault(_officedb);

var _dbconnect = require('../../databaseTables/dbconnect');

var _dbconnect2 = _interopRequireDefault(_dbconnect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy9vZmZpY2VDdHIuanMiXSwibmFtZXMiOlsiT2ZmaWNlIiwicmVxIiwicmVzIiwiaXNBZG1pbiIsInVzZXIiLCJzdGF0dXMiLCJqc29uIiwibWVzc2FnZSIsImNyZWF0ZVF1ZXJ5IiwidmFsdWVzIiwidXVpZHY0IiwiYm9keSIsIm5hbWUiLCJ0eXBlIiwibW9tZW50IiwiRGF0ZSIsImRiIiwicXVlcnkiLCJyb3dzIiwic2VuZCIsIm9mZmljZURiIiwib2ZmaWNlSWQiLCJwYXJhbXMiLCJvZmZpY2VPYmplY3QiLCJvZmZpY2UiLCJpZCIsIk51bWJlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7QUFDQTs7O0lBR01BLE07Ozs7Ozs7O0FBQ0o7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzBGQUVvQkMsRyxFQUFLQyxHOzs7Ozs7O0FBQ2ZDLHVCLEdBQVlGLElBQUlHLEksQ0FBaEJELE87O3FCQUNBQSxPOzs7OztpREFDS0QsSUFBSUcsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQzFCRCwwQkFBUSxHQURrQjtBQUUxQkUsMkJBQVM7QUFGaUIsaUJBQXJCLEM7OztBQUtQQywyQjtBQUlBQyxzQixHQUFTLENBQ2JDLFFBRGEsRUFFYlQsSUFBSVUsSUFBSixDQUFTQyxJQUZJLEVBR2JYLElBQUlVLElBQUosQ0FBU0UsSUFISSxFQUliQyxPQUFPLElBQUlDLElBQUosRUFBUCxDQUphLEM7Ozt1QkFRVUMsb0JBQUdDLEtBQUgsQ0FBU1QsV0FBVCxFQUFzQkMsTUFBdEIsQzs7OztBQUFmUyxvQixTQUFBQSxJO2lEQUNEaEIsSUFBSUcsTUFBSixDQUFXLEdBQVgsRUFBZ0JjLElBQWhCLENBQXFCO0FBQzFCLDRCQUFVLEdBRGdCO0FBRTFCLDBCQUFRLENBQUM7QUFDUCwrQkFBVyxnQkFESjtBQUVQLDZCQUFTRCxLQUFLLENBQUw7QUFGRixtQkFBRDtBQUZrQixpQkFBckIsQzs7Ozs7aURBUUFoQixJQUFJRyxNQUFKLENBQVcsR0FBWCxFQUFnQmMsSUFBaEIsQ0FBcUI7QUFDMUIsNEJBQVUsR0FEZ0I7QUFFMUI7QUFGMEIsaUJBQXJCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBUVg7Ozs7Ozs7Ozs4QkFNaUJsQixHLEVBQUtDLEcsRUFBTTtBQUMxQixhQUFPQSxJQUFJRyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDeEIsa0JBQVUsR0FEYztBQUV4QixnQkFBUWM7QUFGZ0IsT0FBckIsQ0FBUDtBQUlEO0FBQ0Q7Ozs7Ozs7OztrQ0FNcUJuQixHLEVBQUtDLEcsRUFBSztBQUFBLFVBQ3JCbUIsUUFEcUIsR0FDUnBCLElBQUlxQixNQURJLENBQ3JCRCxRQURxQjs7QUFFN0IsVUFBSUUscUJBQUo7QUFGNkI7QUFBQTtBQUFBOztBQUFBO0FBRzdCLDZCQUFxQkgsa0JBQXJCLDhIQUErQjtBQUFBLGNBQXBCSSxNQUFvQjs7QUFDM0I7QUFDQSxjQUFJQSxPQUFPQyxFQUFQLEtBQWNDLE9BQU9MLFFBQVAsQ0FBbEIsRUFBb0M7QUFDaENFLDJCQUFlQyxNQUFmO0FBQ0g7QUFDSjtBQVI0QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVM3QixhQUFPdEIsSUFBSUcsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQ3hCLGtCQUFVLEdBRGM7QUFFeEIsZ0JBQVFpQjtBQUZnQixPQUFyQixDQUFQO0FBS0Q7Ozs7OztrQkFFWXZCLE0iLCJmaWxlIjoib2ZmaWNlQ3RyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XHJcbmltcG9ydCBvZmZpY2VEYiBmcm9tICcuLi9kYi9vZmZpY2VkYic7XHJcbmltcG9ydCBkYiBmcm9tICcuLi8uLi9kYXRhYmFzZVRhYmxlcy9kYmNvbm5lY3QnO1xyXG4vLyBpbXBvcnQgUGFydHlNb2RlbCBmcm9tICcuLi9tb2RlbHMvcGFydHknO1xyXG5cclxuXHJcbmNsYXNzIE9mZmljZXtcclxuICAvKipcclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZhbHVlc30gcmVxIC0gcmVxdWVzdCB2YWx1ZXMgaW50byBrZXlzIFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXMgLSByZXF1ZXN0IG9iamVjdFxyXG4gICAqIEByZXR1cm5zIHthcnJheX0gLSByZXR1cm5zIGFsbCBrZXkgdmFsdWUgcGFpcnMgYXMgb2JqZWN0IGluIGFycmF5XHJcbiAgICovXHJcbiAgLy8gc3RhdGljIGNyZWF0ZU9mZmljZShyZXEsIHJlcykge1xyXG4gIC8vICAgY29uc3Qge1xyXG4gIC8vICAgICB0eXBlLFxyXG4gIC8vICAgICBuYW1lXHJcbiAgLy8gICB9ID0gcmVxLmJvZHk7XHJcbiAgLy8gICBpZiAoIXJlcS5ib2R5LnR5cGUpIHtcclxuICAvLyAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xyXG4gIC8vICAgICAgICAgICBcInN0YXR1c1wiOiA0MDQsXHJcbiAgLy8gICAgICAgICAgIFwiZXJyb3JcIjogXCJUaGUgdHlwZSBhbmQgbmFtZSBmaWVsZCBhcmUgcmVxdWlyZWRcIlxyXG4gIC8vICAgfSlcclxuICAvLyAgICAgfVxyXG4gIC8vICAgICBpZighcmVxLmJvZHkubmFtZSl7XHJcbiAgLy8gICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcclxuICAvLyAgICAgICAgICAgXCJzdGF0dXNcIjogNDAwLFxyXG4gIC8vICAgICAgICAgICBcImVycm9yXCI6IFwiVGhlIG5hbWUgYW5kIHR5cGUgZmllbGQgYXJlIHJlcXVpcmVkXCJcclxuICAvLyAgIH0pXHJcbiAgLy8gICAgIH1cclxuICAvLyAgIG9mZmljZURiLnB1c2goe1xyXG4gIC8vICAgICBpZDogdXVpZC52NCgpLFxyXG4gIC8vICAgICB0eXBlLFxyXG4gIC8vICAgICBuYW1lXHJcbiAgLy8gICB9KTtcclxuICAvLyAgIHJldHVybiByZXMuc3RhdHVzKDIwMSkuanNvbih7XHJcbiAgLy8gICAgICAgXCJzdGF0dXNcIjogMjAxLFxyXG4gIC8vICAgICAgIFwiZGF0YVwiOiBvZmZpY2VEYlxyXG4gIC8vICAgfSk7XHJcbiAgLy8gfVxyXG5cclxuICBzdGF0aWMgYXN5bmMgY3JlYXRlKHJlcSwgcmVzKSB7XHJcbiAgICBjb25zdCB7IGlzQWRtaW4gfSA9IHJlcS51c2VyO1xyXG4gICAgICAgIGlmIChpc0FkbWluKSB7XHJcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDMpLmpzb24oe1xyXG4gICAgICAgICAgICBzdGF0dXM6IDQwMyxcclxuICAgICAgICAgICAgbWVzc2FnZTogXCJBY2Nlc3MgZGVuaWVkLCB5b3UgZG9uJ3QgaGF2ZSB0aGUgcmVxdWlyZWQgY3JlZGVudGlhbHMgdG8gYWNjZXNzIHRoaXMgcm91dGVcIixcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIGNvbnN0IGNyZWF0ZVF1ZXJ5ID0gYElOU0VSVCBJTlRPXHJcbiAgICAgIHBhcnR5KGlkLCBuYW1lLCB0eXBlLCBjcmVhdGVkX2RhdGUpXHJcbiAgICAgIFZBTFVFUygkMSwgJDIsICQzLCAkNClcclxuICAgICAgcmV0dXJuaW5nICpgO1xyXG4gICAgY29uc3QgdmFsdWVzID0gW1xyXG4gICAgICB1dWlkdjQoKSxcclxuICAgICAgcmVxLmJvZHkubmFtZSxcclxuICAgICAgcmVxLmJvZHkudHlwZSxcclxuICAgICAgbW9tZW50KG5ldyBEYXRlKCkpXHJcbiAgICBdO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHsgcm93cyB9ID0gYXdhaXQgZGIucXVlcnkoY3JlYXRlUXVlcnksIHZhbHVlcyk7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMSkuc2VuZCh7XHJcbiAgICAgICAgXCJzdGF0dXNcIjogMjAxLFxyXG4gICAgICAgIFwiZGF0YVwiOiBbe1xyXG4gICAgICAgICAgXCJtZXNzYWdlXCI6IFwib2ZmaWNlIGNyZWF0ZWRcIixcclxuICAgICAgICAgIFwib3JkZXJcIjogcm93c1swXSxcclxuICAgICAgICB9XSxcclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoKGVycm9yKSB7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XHJcbiAgICAgICAgXCJzdGF0dXNcIjogNDAwLFxyXG4gICAgICAgIFwiZGF0YVwiOiBlcnJvclxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBcclxuICAgKiBAcGFyYW0ge3V1aWR9IGlkXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlcyAtIHJlcXVlc3Qgb2JqZWN0XHJcbiAgICogQHJldHVybnMge2FycmF5fSAtIHJldHVybnMgYWxsIGtleSB2YWx1ZSBwYWlycyBhcyBvYmplY3QgaW4gYXJyYXlcclxuICAgKi9cclxuICBzdGF0aWMgZ2V0T2ZmaWNlKHJlcSwgcmVzKSAge1xyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcclxuICAgICAgICBcInN0YXR1c1wiOiAyMDAsXHJcbiAgICAgICAgXCJkYXRhXCI6IG9mZmljZURiXHJcbiAgICB9KTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHt1dWlkfSBpZFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXMgLSByZXF1ZXN0IG9iamVjdFxyXG4gICAqIEByZXR1cm5zIHthcnJheX0gLSByZXR1cm5zIHNwZWNpZmljIHBhcnR5XHJcbiAgICovXHJcbiAgc3RhdGljIGdldE9mZmljZUJ5SWQocmVxLCByZXMpIHtcclxuICAgIGNvbnN0IHsgb2ZmaWNlSWQgfSA9IHJlcS5wYXJhbXM7XHJcbiAgICBsZXQgb2ZmaWNlT2JqZWN0O1xyXG4gICAgZm9yIChjb25zdCBvZmZpY2Ugb2Ygb2ZmaWNlRGIpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0eXBlb2Ygb2ZmaWNlSWQsIHR5cGVvZiBvZmZpY2UuaWQpXHJcbiAgICAgICAgaWYgKG9mZmljZS5pZCA9PT0gTnVtYmVyKG9mZmljZUlkKSkge1xyXG4gICAgICAgICAgICBvZmZpY2VPYmplY3QgPSBvZmZpY2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICAgIFwic3RhdHVzXCI6IDIwMCxcclxuICAgICAgICBcImRhdGFcIjogb2ZmaWNlT2JqZWN0XHJcbiAgICB9KTtcclxuICAgIFxyXG4gIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBPZmZpY2U7XHJcbiJdfQ==