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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb250cm9sbGVycy9kYXRhYmFzZVRhYmxlcy9kYmNvbm5lY3QuanMiXSwibmFtZXMiOlsiZG90ZW52IiwicG9vbCIsIlBvb2wiLCJjb25uZWN0aW9uU3RyaW5nIiwicHJvY2VzcyIsIkRBVEFCQVNFX1VSTCIsInJlc29sdmUiLCJyZWplY3QiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQUEsTUFBQSxRQUFBLElBQUEsQ0FBQTs7QUFDQSxJQUFBLFVBQUEsUUFBQSxRQUFBLENBQUE7Ozs7Ozs7O0FBRUFBLFNBQUFBLE9BQUFBLENBQUFBLE1BQUFBOztBQUVBLElBQU1DLE9BQU8sSUFBSUMsSUFBSixJQUFBLENBQVM7QUFDcEJDLG9CQUFrQkMsUUFBQUEsR0FBQUEsQ0FBWUM7QUFEVixDQUFULENBQWI7O2tCQUllO0FBQ2I7Ozs7OztBQURhLFNBQUEsU0FBQSxLQUFBLENBQUEsSUFBQSxFQUFBLE1BQUEsRUFPTTtBQUNqQixXQUFPLElBQUEsT0FBQSxDQUFZLFVBQUEsT0FBQSxFQUFBLE1BQUEsRUFBcUI7QUFDdENKLFdBQUFBLEtBQUFBLENBQUFBLElBQUFBLEVBQUFBLE1BQUFBLEVBQUFBLElBQUFBLENBQ00sVUFBQSxHQUFBLEVBQVM7QUFDYkssZ0JBQUFBLEdBQUFBO0FBRkZMLE9BQUFBLEVBQUFBLEtBQUFBLENBSU8sVUFBQSxHQUFBLEVBQVM7QUFDZE0sZUFBQUEsR0FBQUE7QUFMRk4sT0FBQUE7QUFERixLQUFPLENBQVA7QUFTRDtBQWpCWSxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUG9vbCB9IGZyb20gJ3BnJztcbmltcG9ydCBkb3RlbnYgZnJvbSAnZG90ZW52JztcblxuZG90ZW52LmNvbmZpZygpO1xuXG5jb25zdCBwb29sID0gbmV3IFBvb2woe1xuICBjb25uZWN0aW9uU3RyaW5nOiBwcm9jZXNzLmVudi5EQVRBQkFTRV9VUkxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIC8qKlxuICAgKiBEYXRhYmFzZSBxdWVyeVxuICAgKiBAcGFyYW0ge29iamVjdH0gcmVxXG4gICAqIEBwYXJhbSB7b2JqZWN0fSByZXNcbiAgICogQHJldHVybnMge29iamVjdH0gb2JqZWN0IChwcm9taXNlKVxuICAgKi9cbiAgcXVlcnkodGV4dCwgcGFyYW1zKXtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgcG9vbC5xdWVyeSh0ZXh0LCBwYXJhbXMpXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIHJlc29sdmUocmVzKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufSJdfQ==