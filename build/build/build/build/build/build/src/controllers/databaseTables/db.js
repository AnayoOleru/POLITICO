'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _pg = require('pg');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb250cm9sbGVycy9kYXRhYmFzZVRhYmxlcy9kYi5qcyJdLCJuYW1lcyI6WyJkb3RlbnYiLCJwb29sIiwiUG9vbCIsImNvbm5lY3Rpb25TdHJpbmciLCJwcm9jZXNzIiwiREFUQUJBU0VfVVJMIiwiZGIiLCJxdWVyeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBQSxNQUFBLFFBQUEsSUFBQSxDQUFBOztBQUNBLElBQUEsVUFBQSxRQUFBLFFBQUEsQ0FBQTs7Ozs7Ozs7QUFFQUEsU0FBQUEsT0FBQUEsQ0FBQUEsSUFBQUE7O0FBRUEsSUFBTUMsT0FBTyxJQUFJQyxJQUFKLElBQUEsQ0FBUztBQUNsQkMsc0JBQWtCQyxRQUFBQSxHQUFBQSxDQUFZQztBQURaLENBQVQsQ0FBYjs7QUFJQSxJQUFNQyxLQUFLO0FBQ1BDLFdBQU8sU0FBQSxLQUFBLENBQUEsSUFBQSxFQUFBLE1BQUEsRUFBQTtBQUFBLGVBQWtCTixLQUFBQSxLQUFBQSxDQUFBQSxJQUFBQSxFQUFsQixNQUFrQkEsQ0FBbEI7QUFBQTtBQURBLENBQVg7O2tCQUllSyxFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUG9vbCB9IGZyb20gJ3BnJztcbmltcG9ydCBkb3RlbnYgZnJvbSAnZG90ZW52JztcblxuZG90ZW52LmxvYWQoKTtcblxuY29uc3QgcG9vbCA9IG5ldyBQb29sKHtcbiAgICBjb25uZWN0aW9uU3RyaW5nOiBwcm9jZXNzLmVudi5EQVRBQkFTRV9VUkxcbiAgfSk7XG5cbmNvbnN0IGRiID0ge1xuICAgIHF1ZXJ5OiAodGV4dCwgcGFyYW1zKSA9PiBwb29sLnF1ZXJ5KHRleHQsIHBhcmFtcyksXG59O1xuXG5leHBvcnQgZGVmYXVsdCBkYjsiXX0=