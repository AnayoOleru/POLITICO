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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2RhdGFiYXNlVGFibGVzL2RiY29ubmVjdC5qcyJdLCJuYW1lcyI6WyJkb3RlbnYiLCJjb25maWciLCJwb29sIiwiUG9vbCIsImNvbm5lY3Rpb25TdHJpbmciLCJwcm9jZXNzIiwiZW52IiwiREFUQUJBU0VfVVJMIiwicXVlcnkiLCJ0ZXh0IiwicGFyYW1zIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ0aGVuIiwicmVzIiwiY2F0Y2giLCJlcnIiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUNBOzs7Ozs7QUFFQUEsaUJBQU9DLE1BQVA7O0FBRUEsSUFBTUMsT0FBTyxJQUFJQyxRQUFKLENBQVM7QUFDcEJDLG9CQUFrQkMsUUFBUUMsR0FBUixDQUFZQztBQURWLENBQVQsQ0FBYjs7a0JBSWU7QUFDYjs7Ozs7O0FBTUFDLE9BUGEsaUJBT1BDLElBUE8sRUFPREMsTUFQQyxFQU9NO0FBQ2pCLFdBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q1gsV0FBS00sS0FBTCxDQUFXQyxJQUFYLEVBQWlCQyxNQUFqQixFQUNDSSxJQURELENBQ00sVUFBQ0MsR0FBRCxFQUFTO0FBQ2JILGdCQUFRRyxHQUFSO0FBQ0QsT0FIRCxFQUlDQyxLQUpELENBSU8sVUFBQ0MsR0FBRCxFQUFTO0FBQ2RKLGVBQU9JLEdBQVA7QUFDRCxPQU5EO0FBT0QsS0FSTSxDQUFQO0FBU0Q7QUFqQlksQyIsImZpbGUiOiJkYmNvbm5lY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQb29sIH0gZnJvbSAncGcnO1xyXG5pbXBvcnQgZG90ZW52IGZyb20gJ2RvdGVudic7XHJcblxyXG5kb3RlbnYuY29uZmlnKCk7XHJcblxyXG5jb25zdCBwb29sID0gbmV3IFBvb2woe1xyXG4gIGNvbm5lY3Rpb25TdHJpbmc6IHByb2Nlc3MuZW52LkRBVEFCQVNFX1VSTFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKipcclxuICAgKiBEYXRhYmFzZSBxdWVyeVxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSByZXFcclxuICAgKiBAcGFyYW0ge29iamVjdH0gcmVzXHJcbiAgICogQHJldHVybnMge29iamVjdH0gb2JqZWN0IChwcm9taXNlKVxyXG4gICAqL1xyXG4gIHF1ZXJ5KHRleHQsIHBhcmFtcyl7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBwb29sLnF1ZXJ5KHRleHQsIHBhcmFtcylcclxuICAgICAgLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIHJlc29sdmUocmVzKTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgfVxyXG59Il19