"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var verifyIsAdminClass = function () {
  function verifyIsAdminClass() {
    _classCallCheck(this, verifyIsAdminClass);
  }

  _createClass(verifyIsAdminClass, null, [{
    key: "verifyIsAdmin",
    value: function verifyIsAdmin(req, res, next) {
      var isAdmin = req.user.isAdmin;

      if (!isAdmin) {
        return res.status(403).json({
          "status": 403,
          "message": "Access denied, you don't have the required credentials to access this route"
        });
      }
      next();
    }
  }]);

  return verifyIsAdminClass;
}();

exports.default = verifyIsAdminClass;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2hlbHBlci92ZXJpZnlBZG1pbi5qcyJdLCJuYW1lcyI6WyJ2ZXJpZnlJc0FkbWluQ2xhc3MiLCJyZXEiLCJyZXMiLCJuZXh0IiwiaXNBZG1pbiIsInVzZXIiLCJzdGF0dXMiLCJqc29uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQXFCQSxrQjs7Ozs7OztrQ0FDSUMsRyxFQUFLQyxHLEVBQUtDLEksRUFBTTtBQUFBLFVBQzNCQyxPQUQyQixHQUNmSCxJQUFJSSxJQURXLENBQzNCRCxPQUQyQjs7QUFFbkMsVUFBSSxDQUFDQSxPQUFMLEVBQWM7QUFDWixlQUFPRixJQUFJSSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDMUIsb0JBQVUsR0FEZ0I7QUFFMUIscUJBQVc7QUFGZSxTQUFyQixDQUFQO0FBSUQ7QUFDREo7QUFDRDs7Ozs7O2tCQVZnQkgsa0IiLCJmaWxlIjoidmVyaWZ5QWRtaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyB2ZXJpZnlJc0FkbWluQ2xhc3Mge1xyXG4gICAgc3RhdGljIHZlcmlmeUlzQWRtaW4ocmVxLCByZXMsIG5leHQpIHtcclxuICAgICAgY29uc3QgeyBpc0FkbWluIH0gPSByZXEudXNlcjtcclxuICAgICAgaWYgKCFpc0FkbWluKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAzKS5qc29uKHtcclxuICAgICAgICAgIFwic3RhdHVzXCI6IDQwMyxcclxuICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkFjY2VzcyBkZW5pZWQsIHlvdSBkb24ndCBoYXZlIHRoZSByZXF1aXJlZCBjcmVkZW50aWFscyB0byBhY2Nlc3MgdGhpcyByb3V0ZVwiLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIG5leHQoKTtcclxuICAgIH1cclxuICB9Il19