'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _db = require('../databaseTables/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Query = function () {
    function Query() {
        (0, _classCallCheck3.default)(this, Query);
    }

    (0, _createClass3.default)(Query, null, [{
        key: 'register',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(info) {
                var result;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;
                                _context.next = 3;
                                return _db2.default.query('INSERT INTO candidates(\n                office, \n                party,\n                candidate\n            )\n            VALUES($1, $2, $3) returning *', info);

                            case 3:
                                result = _context.sent;
                                return _context.abrupt('return', result);

                            case 7:
                                _context.prev = 7;
                                _context.t0 = _context['catch'](0);
                                return _context.abrupt('return', _context.t0);

                            case 10:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[0, 7]]);
            }));

            function register(_x) {
                return _ref.apply(this, arguments);
            }

            return register;
        }()
    }]);
    return Query;
}();

exports.default = Query;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oZWxwZXIvcXVlcnkuanMiXSwibmFtZXMiOlsiUXVlcnkiLCJpbmZvIiwiZGIiLCJxdWVyeSIsInJlc3VsdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7SUFFTUEsSzs7Ozs7Ozs7aUhBQ29CQyxJOzs7Ozs7Ozt1Q0FFT0MsYUFBR0MsS0FBSCxvS0FNakJGLElBTmlCLEM7OztBQUFmRyxzQztpRUFRQ0EsTTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkFPSkosSyIsImZpbGUiOiJxdWVyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkYiBmcm9tICcuLi9kYXRhYmFzZVRhYmxlcy9kYidcblxuY2xhc3MgUXVlcnkge1xuICAgIHN0YXRpYyBhc3luYyByZWdpc3RlcihpbmZvKXtcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZGIucXVlcnkoYElOU0VSVCBJTlRPIGNhbmRpZGF0ZXMoXG4gICAgICAgICAgICAgICAgb2ZmaWNlLCBcbiAgICAgICAgICAgICAgICBwYXJ0eSxcbiAgICAgICAgICAgICAgICBjYW5kaWRhdGVcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIFZBTFVFUygkMSwgJDIsICQzKSByZXR1cm5pbmcgKmAsXG4gICAgICAgICAgICAgICAgaW5mbyxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9Y2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFF1ZXJ5OyJdfQ==