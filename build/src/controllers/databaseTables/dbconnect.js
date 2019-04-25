'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var pool = new _pg.Pool({
  connectionString: process.env.DATABASE_URL
});

exports.default = {
  /**
   * Database query
   * @param {object} req
   * @param {object} res
   * @returns {object} object (promise)
   */
  query: function query(text, params) {
    return new Promise(function (resolve, reject) {
      pool.query(text, params).then(function (res) {
        resolve(res);
      }).catch(function (err) {
        reject(err);
      });
    });
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb250cm9sbGVycy9kYXRhYmFzZVRhYmxlcy9kYmNvbm5lY3QuanMiXSwibmFtZXMiOlsiZG90ZW52IiwiY29uZmlnIiwicG9vbCIsIlBvb2wiLCJjb25uZWN0aW9uU3RyaW5nIiwicHJvY2VzcyIsImVudiIsIkRBVEFCQVNFX1VSTCIsInF1ZXJ5IiwidGV4dCIsInBhcmFtcyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwidGhlbiIsInJlcyIsImNhdGNoIiwiZXJyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7Ozs7O0FBRUFBLGlCQUFPQyxNQUFQOztBQUVBLElBQU1DLE9BQU8sSUFBSUMsUUFBSixDQUFTO0FBQ3BCQyxvQkFBa0JDLFFBQVFDLEdBQVIsQ0FBWUM7QUFEVixDQUFULENBQWI7O2tCQUllO0FBQ2I7Ozs7OztBQU1BQyxPQVBhLGlCQU9QQyxJQVBPLEVBT0RDLE1BUEMsRUFPTTtBQUNqQixXQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENYLFdBQUtNLEtBQUwsQ0FBV0MsSUFBWCxFQUFpQkMsTUFBakIsRUFDQ0ksSUFERCxDQUNNLFVBQUNDLEdBQUQsRUFBUztBQUNiSCxnQkFBUUcsR0FBUjtBQUNELE9BSEQsRUFJQ0MsS0FKRCxDQUlPLFVBQUNDLEdBQUQsRUFBUztBQUNkSixlQUFPSSxHQUFQO0FBQ0QsT0FORDtBQU9ELEtBUk0sQ0FBUDtBQVNEO0FBakJZLEMiLCJmaWxlIjoiZGJjb25uZWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUG9vbCB9IGZyb20gJ3BnJztcbmltcG9ydCBkb3RlbnYgZnJvbSAnZG90ZW52JztcblxuZG90ZW52LmNvbmZpZygpO1xuXG5jb25zdCBwb29sID0gbmV3IFBvb2woe1xuICBjb25uZWN0aW9uU3RyaW5nOiBwcm9jZXNzLmVudi5EQVRBQkFTRV9VUkxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIC8qKlxuICAgKiBEYXRhYmFzZSBxdWVyeVxuICAgKiBAcGFyYW0ge29iamVjdH0gcmVxXG4gICAqIEBwYXJhbSB7b2JqZWN0fSByZXNcbiAgICogQHJldHVybnMge29iamVjdH0gb2JqZWN0IChwcm9taXNlKVxuICAgKi9cbiAgcXVlcnkodGV4dCwgcGFyYW1zKXtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgcG9vbC5xdWVyeSh0ZXh0LCBwYXJhbXMpXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIHJlc29sdmUocmVzKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufSJdfQ==