'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _officedb = require('../db/officedb');

var _officedb2 = _interopRequireDefault(_officedb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import PartyModel from '../models/party';


var Office = function () {
  function Office() {
    _classCallCheck(this, Office);
  }

  _createClass(Office, null, [{
    key: 'createOffice',

    /**
     * 
     * @param {Values} req - request values into keys 
     * @param {Object} res - request object
     * @returns {array} - returns all key value pairs as object in array
     */
    value: function createOffice(req, res) {
      var _req$body = req.body,
          type = _req$body.type,
          name = _req$body.name;

      if (!req.body.type) {
        return res.status(400).send({
          "status": 404,
          "error": "The type and name field are required"
        });
      }
      if (!req.body.name) {
        return res.status(400).send({
          "status": 400,
          "error": "The name and type field are required"
        });
      }
      _officedb2.default.push({
        id: _uuid2.default.v4(),
        type: type,
        name: name
      });
      return res.status(201).json({
        "status": 201,
        "data": _officedb2.default
      });
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy9vZmZpY2VDdHIuanMiXSwibmFtZXMiOlsiT2ZmaWNlIiwicmVxIiwicmVzIiwiYm9keSIsInR5cGUiLCJuYW1lIiwic3RhdHVzIiwic2VuZCIsIm9mZmljZURiIiwicHVzaCIsImlkIiwidXVpZCIsInY0IiwianNvbiIsIm9mZmljZUlkIiwicGFyYW1zIiwib2ZmaWNlT2JqZWN0Iiwib2ZmaWNlIiwiTnVtYmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7O0FBQ0E7OztJQUdNQSxNOzs7Ozs7OztBQUNKOzs7Ozs7aUNBTW9CQyxHLEVBQUtDLEcsRUFBSztBQUFBLHNCQUl4QkQsSUFBSUUsSUFKb0I7QUFBQSxVQUUxQkMsSUFGMEIsYUFFMUJBLElBRjBCO0FBQUEsVUFHMUJDLElBSDBCLGFBRzFCQSxJQUgwQjs7QUFLNUIsVUFBSSxDQUFDSixJQUFJRSxJQUFKLENBQVNDLElBQWQsRUFBb0I7QUFDaEIsZUFBT0YsSUFBSUksTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQ3hCLG9CQUFVLEdBRGM7QUFFeEIsbUJBQVM7QUFGZSxTQUFyQixDQUFQO0FBSUQ7QUFDRCxVQUFHLENBQUNOLElBQUlFLElBQUosQ0FBU0UsSUFBYixFQUFrQjtBQUNoQixlQUFPSCxJQUFJSSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDeEIsb0JBQVUsR0FEYztBQUV4QixtQkFBUztBQUZlLFNBQXJCLENBQVA7QUFJRDtBQUNIQyx5QkFBU0MsSUFBVCxDQUFjO0FBQ1pDLFlBQUlDLGVBQUtDLEVBQUwsRUFEUTtBQUVaUixrQkFGWTtBQUdaQztBQUhZLE9BQWQ7QUFLQSxhQUFPSCxJQUFJSSxNQUFKLENBQVcsR0FBWCxFQUFnQk8sSUFBaEIsQ0FBcUI7QUFDeEIsa0JBQVUsR0FEYztBQUV4QixnQkFBUUw7QUFGZ0IsT0FBckIsQ0FBUDtBQUlEO0FBQ0Q7Ozs7Ozs7Ozs4QkFNaUJQLEcsRUFBS0MsRyxFQUFNO0FBQzFCLGFBQU9BLElBQUlJLE1BQUosQ0FBVyxHQUFYLEVBQWdCTyxJQUFoQixDQUFxQjtBQUN4QixrQkFBVSxHQURjO0FBRXhCLGdCQUFRTDtBQUZnQixPQUFyQixDQUFQO0FBSUQ7QUFDRDs7Ozs7Ozs7O2tDQU1xQlAsRyxFQUFLQyxHLEVBQUs7QUFBQSxVQUNyQlksUUFEcUIsR0FDUmIsSUFBSWMsTUFESSxDQUNyQkQsUUFEcUI7O0FBRTdCLFVBQUlFLHFCQUFKO0FBRjZCO0FBQUE7QUFBQTs7QUFBQTtBQUc3Qiw2QkFBcUJSLGtCQUFyQiw4SEFBK0I7QUFBQSxjQUFwQlMsTUFBb0I7O0FBQzNCO0FBQ0EsY0FBSUEsT0FBT1AsRUFBUCxLQUFjUSxPQUFPSixRQUFQLENBQWxCLEVBQW9DO0FBQ2hDRSwyQkFBZUMsTUFBZjtBQUNIO0FBQ0o7QUFSNEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFTN0IsYUFBT2YsSUFBSUksTUFBSixDQUFXLEdBQVgsRUFBZ0JPLElBQWhCLENBQXFCO0FBQ3hCLGtCQUFVLEdBRGM7QUFFeEIsZ0JBQVFHO0FBRmdCLE9BQXJCLENBQVA7QUFLRDs7Ozs7O2tCQUVZaEIsTSIsImZpbGUiOiJvZmZpY2VDdHIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXVpZCBmcm9tICd1dWlkJztcclxuaW1wb3J0IG9mZmljZURiIGZyb20gJy4uL2RiL29mZmljZWRiJztcclxuLy8gaW1wb3J0IFBhcnR5TW9kZWwgZnJvbSAnLi4vbW9kZWxzL3BhcnR5JztcclxuXHJcblxyXG5jbGFzcyBPZmZpY2V7XHJcbiAgLyoqXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWYWx1ZXN9IHJlcSAtIHJlcXVlc3QgdmFsdWVzIGludG8ga2V5cyBcclxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVzIC0gcmVxdWVzdCBvYmplY3RcclxuICAgKiBAcmV0dXJucyB7YXJyYXl9IC0gcmV0dXJucyBhbGwga2V5IHZhbHVlIHBhaXJzIGFzIG9iamVjdCBpbiBhcnJheVxyXG4gICAqL1xyXG4gIHN0YXRpYyBjcmVhdGVPZmZpY2UocmVxLCByZXMpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgdHlwZSxcclxuICAgICAgbmFtZVxyXG4gICAgfSA9IHJlcS5ib2R5O1xyXG4gICAgaWYgKCFyZXEuYm9keS50eXBlKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcclxuICAgICAgICAgICAgXCJzdGF0dXNcIjogNDA0LFxyXG4gICAgICAgICAgICBcImVycm9yXCI6IFwiVGhlIHR5cGUgYW5kIG5hbWUgZmllbGQgYXJlIHJlcXVpcmVkXCJcclxuICAgIH0pXHJcbiAgICAgIH1cclxuICAgICAgaWYoIXJlcS5ib2R5Lm5hbWUpe1xyXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XHJcbiAgICAgICAgICAgIFwic3RhdHVzXCI6IDQwMCxcclxuICAgICAgICAgICAgXCJlcnJvclwiOiBcIlRoZSBuYW1lIGFuZCB0eXBlIGZpZWxkIGFyZSByZXF1aXJlZFwiXHJcbiAgICB9KVxyXG4gICAgICB9XHJcbiAgICBvZmZpY2VEYi5wdXNoKHtcclxuICAgICAgaWQ6IHV1aWQudjQoKSxcclxuICAgICAgdHlwZSxcclxuICAgICAgbmFtZVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDEpLmpzb24oe1xyXG4gICAgICAgIFwic3RhdHVzXCI6IDIwMSxcclxuICAgICAgICBcImRhdGFcIjogb2ZmaWNlRGJcclxuICAgIH0pO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBcclxuICAgKiBAcGFyYW0ge3V1aWR9IGlkXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlcyAtIHJlcXVlc3Qgb2JqZWN0XHJcbiAgICogQHJldHVybnMge2FycmF5fSAtIHJldHVybnMgYWxsIGtleSB2YWx1ZSBwYWlycyBhcyBvYmplY3QgaW4gYXJyYXlcclxuICAgKi9cclxuICBzdGF0aWMgZ2V0T2ZmaWNlKHJlcSwgcmVzKSAge1xyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcclxuICAgICAgICBcInN0YXR1c1wiOiAyMDAsXHJcbiAgICAgICAgXCJkYXRhXCI6IG9mZmljZURiXHJcbiAgICB9KTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHt1dWlkfSBpZFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXMgLSByZXF1ZXN0IG9iamVjdFxyXG4gICAqIEByZXR1cm5zIHthcnJheX0gLSByZXR1cm5zIHNwZWNpZmljIHBhcnR5XHJcbiAgICovXHJcbiAgc3RhdGljIGdldE9mZmljZUJ5SWQocmVxLCByZXMpIHtcclxuICAgIGNvbnN0IHsgb2ZmaWNlSWQgfSA9IHJlcS5wYXJhbXM7XHJcbiAgICBsZXQgb2ZmaWNlT2JqZWN0O1xyXG4gICAgZm9yIChjb25zdCBvZmZpY2Ugb2Ygb2ZmaWNlRGIpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0eXBlb2Ygb2ZmaWNlSWQsIHR5cGVvZiBvZmZpY2UuaWQpXHJcbiAgICAgICAgaWYgKG9mZmljZS5pZCA9PT0gTnVtYmVyKG9mZmljZUlkKSkge1xyXG4gICAgICAgICAgICBvZmZpY2VPYmplY3QgPSBvZmZpY2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICAgIFwic3RhdHVzXCI6IDIwMCxcclxuICAgICAgICBcImRhdGFcIjogb2ZmaWNlT2JqZWN0XHJcbiAgICB9KTtcclxuICAgIFxyXG4gIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBPZmZpY2U7XHJcbiJdfQ==