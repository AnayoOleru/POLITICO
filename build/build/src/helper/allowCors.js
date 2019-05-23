'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var allowCorsClass = function () {
  function allowCorsClass() {
    (0, _classCallCheck3.default)(this, allowCorsClass);
  }

  (0, _createClass3.default)(allowCorsClass, null, [{
    key: 'allowCors',
    value: function allowCors(req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      next();
    }
  }]);
  return allowCorsClass;
}();

exports.default = allowCorsClass;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oZWxwZXIvYWxsb3dDb3JzLmpzIl0sIm5hbWVzIjpbImFsbG93Q29yc0NsYXNzIiwicmVxIiwicmVzIiwibmV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQXFCQSxpQjs7Ozs7Ozs4QkFDRkMsRyxFQUFLQyxHLEVBQUtDLEksRUFBTTtBQUMvQkQsVUFBQUEsU0FBQUEsQ0FBQUEsNkJBQUFBLEVBQUFBLEdBQUFBO0FBQ0FDO0FBQ0Q7Ozs7O2tCQUprQkgsYyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIGFsbG93Q29yc0NsYXNzIHtcbiAgc3RhdGljIGFsbG93Q29ycyhyZXEsIHJlcywgbmV4dCkge1xuICAgIHJlcy5zZXRIZWFkZXIoJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbicsICcqJyk7XG4gICAgbmV4dCgpO1xuICB9XG59XG4iXX0=