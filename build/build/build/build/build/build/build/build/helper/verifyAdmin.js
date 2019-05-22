"use strict";

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

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2hlbHBlci92ZXJpZnlBZG1pbi5qcyJdLCJuYW1lcyI6WyJ2ZXJpZnlJc0FkbWluQ2xhc3MiLCJyZXEiLCJyZXMiLCJuZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQXFCQSxxQjs7Ozs7OztrQ0FDSUMsRyxFQUFLQyxHLEVBQUtDLEksRUFBTTtBQUFBLFVBQUEsVUFDZkYsSUFEZSxJQUNmQSxDQURlLE9BQUE7O0FBRW5DLFVBQUksQ0FBSixPQUFBLEVBQWM7QUFDWixlQUFPLElBQUEsTUFBQSxDQUFBLEdBQUEsRUFBQSxJQUFBLENBQXFCO0FBQzFCLG9CQUQwQixHQUFBO0FBRTFCLHFCQUFXO0FBRmUsU0FBckIsQ0FBUDtBQUlEO0FBQ0RFO0FBQ0Q7Ozs7OztrQkFWZ0JILGtCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgdmVyaWZ5SXNBZG1pbkNsYXNzIHtcclxuICAgIHN0YXRpYyB2ZXJpZnlJc0FkbWluKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICAgIGNvbnN0IHsgaXNBZG1pbiB9ID0gcmVxLnVzZXI7XHJcbiAgICAgIGlmICghaXNBZG1pbikge1xyXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMykuanNvbih7XHJcbiAgICAgICAgICBcInN0YXR1c1wiOiA0MDMsXHJcbiAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJBY2Nlc3MgZGVuaWVkLCB5b3UgZG9uJ3QgaGF2ZSB0aGUgcmVxdWlyZWQgY3JlZGVudGlhbHMgdG8gYWNjZXNzIHRoaXMgcm91dGVcIixcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBuZXh0KCk7XHJcbiAgICB9XHJcbiAgfSJdfQ==