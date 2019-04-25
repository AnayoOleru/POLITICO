"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var verifyIsAdminClass = function () {
  function verifyIsAdminClass() {
    (0, _classCallCheck3.default)(this, verifyIsAdminClass);
  }

  (0, _createClass3.default)(verifyIsAdminClass, null, [{
    key: "verifyIsAdmin",
    value: function verifyIsAdmin(req, res, next) {
      var isAdmin = req.user.isAdmin;

      if (!isAdmin) {
        // console.log(isAdmin)
        return res.status(403).json({
          "status": 403,
          "message": "Access denied, You do not have the admin privileges to access this route"
        });
      }
      next();
    }
  }]);
  return verifyIsAdminClass;
}();

exports.default = verifyIsAdminClass;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oZWxwZXIvdmVyaWZ5QWRtaW4uanMiXSwibmFtZXMiOlsidmVyaWZ5SXNBZG1pbkNsYXNzIiwicmVxIiwicmVzIiwibmV4dCIsImlzQWRtaW4iLCJ1c2VyIiwic3RhdHVzIiwianNvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUFxQkEsa0I7Ozs7Ozs7a0NBQ0VDLEcsRUFBS0MsRyxFQUFLQyxJLEVBQU07QUFBQSxVQUMzQkMsT0FEMkIsR0FDZkgsSUFBSUksSUFEVyxDQUMzQkQsT0FEMkI7O0FBRW5DLFVBQUksQ0FBQ0EsT0FBTCxFQUFjO0FBQ1Y7QUFDQSxlQUFPRixJQUFJSSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDMUIsb0JBQVUsR0FEZ0I7QUFFMUIscUJBQVc7QUFGZSxTQUFyQixDQUFQO0FBSUQ7QUFDREo7QUFDRDs7Ozs7a0JBWGdCSCxrQiIsImZpbGUiOiJ2ZXJpZnlBZG1pbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIHZlcmlmeUlzQWRtaW5DbGFzcyB7XG4gIHN0YXRpYyB2ZXJpZnlJc0FkbWluKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgY29uc3QgeyBpc0FkbWluIH0gPSByZXEudXNlcjtcbiAgICBpZiAoIWlzQWRtaW4pIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coaXNBZG1pbilcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAzKS5qc29uKHtcbiAgICAgICAgICBcInN0YXR1c1wiOiA0MDMsXG4gICAgICAgICAgXCJtZXNzYWdlXCI6IFwiQWNjZXNzIGRlbmllZCwgWW91IGRvIG5vdCBoYXZlIHRoZSBhZG1pbiBwcml2aWxlZ2VzIHRvIGFjY2VzcyB0aGlzIHJvdXRlXCIsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgbmV4dCgpO1xuICAgIH1cbiAgfSJdfQ==