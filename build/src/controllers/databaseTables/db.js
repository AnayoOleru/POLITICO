'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _pg = require('pg');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.load();

var pool = new _pg.Pool({
    connectionString: process.env.DATABASE_URL
});

var db = {
    query: function query(text, params) {
        return pool.query(text, params);
    }
};

exports.default = db;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb250cm9sbGVycy9kYXRhYmFzZVRhYmxlcy9kYi5qcyJdLCJuYW1lcyI6WyJkb3RlbnYiLCJsb2FkIiwicG9vbCIsIlBvb2wiLCJjb25uZWN0aW9uU3RyaW5nIiwicHJvY2VzcyIsImVudiIsIkRBVEFCQVNFX1VSTCIsImRiIiwicXVlcnkiLCJ0ZXh0IiwicGFyYW1zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7Ozs7O0FBRUFBLGlCQUFPQyxJQUFQOztBQUVBLElBQU1DLE9BQU8sSUFBSUMsUUFBSixDQUFTO0FBQ2xCQyxzQkFBa0JDLFFBQVFDLEdBQVIsQ0FBWUM7QUFEWixDQUFULENBQWI7O0FBSUEsSUFBTUMsS0FBSztBQUNQQyxXQUFPLGVBQUNDLElBQUQsRUFBT0MsTUFBUDtBQUFBLGVBQWtCVCxLQUFLTyxLQUFMLENBQVdDLElBQVgsRUFBaUJDLE1BQWpCLENBQWxCO0FBQUE7QUFEQSxDQUFYOztrQkFJZUgsRSIsImZpbGUiOiJkYi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBvb2wgfSBmcm9tICdwZyc7XG5pbXBvcnQgZG90ZW52IGZyb20gJ2RvdGVudic7XG5cbmRvdGVudi5sb2FkKCk7XG5cbmNvbnN0IHBvb2wgPSBuZXcgUG9vbCh7XG4gICAgY29ubmVjdGlvblN0cmluZzogcHJvY2Vzcy5lbnYuREFUQUJBU0VfVVJMXG4gIH0pO1xuXG5jb25zdCBkYiA9IHtcbiAgICBxdWVyeTogKHRleHQsIHBhcmFtcykgPT4gcG9vbC5xdWVyeSh0ZXh0LCBwYXJhbXMpLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZGI7Il19