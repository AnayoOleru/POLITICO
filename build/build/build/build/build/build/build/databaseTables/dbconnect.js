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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2RhdGFiYXNlVGFibGVzL2RiY29ubmVjdC5qcyJdLCJuYW1lcyI6WyJkb3RlbnYiLCJwb29sIiwiUG9vbCIsImNvbm5lY3Rpb25TdHJpbmciLCJwcm9jZXNzIiwiREFUQUJBU0VfVVJMIiwicmVzb2x2ZSIsInJlamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBQSxNQUFBLFFBQUEsSUFBQSxDQUFBOztBQUNBLElBQUEsVUFBQSxRQUFBLFFBQUEsQ0FBQTs7Ozs7Ozs7QUFFQUEsU0FBQUEsT0FBQUEsQ0FBQUEsTUFBQUE7O0FBRUEsSUFBTUMsT0FBTyxJQUFJQyxJQUFKLElBQUEsQ0FBUztBQUNwQkMsb0JBQWtCQyxRQUFBQSxHQUFBQSxDQUFZQztBQURWLENBQVQsQ0FBYjs7a0JBSWU7QUFDYjs7Ozs7O0FBRGEsU0FBQSxTQUFBLEtBQUEsQ0FBQSxJQUFBLEVBQUEsTUFBQSxFQU9NO0FBQ2pCLFdBQU8sSUFBQSxPQUFBLENBQVksVUFBQSxPQUFBLEVBQUEsTUFBQSxFQUFxQjtBQUN0Q0osV0FBQUEsS0FBQUEsQ0FBQUEsSUFBQUEsRUFBQUEsTUFBQUEsRUFBQUEsSUFBQUEsQ0FDTSxVQUFBLEdBQUEsRUFBUztBQUNiSyxnQkFBQUEsR0FBQUE7QUFGRkwsT0FBQUEsRUFBQUEsS0FBQUEsQ0FJTyxVQUFBLEdBQUEsRUFBUztBQUNkTSxlQUFBQSxHQUFBQTtBQUxGTixPQUFBQTtBQURGLEtBQU8sQ0FBUDtBQVNEO0FBakJZLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQb29sIH0gZnJvbSAncGcnO1xyXG5pbXBvcnQgZG90ZW52IGZyb20gJ2RvdGVudic7XHJcblxyXG5kb3RlbnYuY29uZmlnKCk7XHJcblxyXG5jb25zdCBwb29sID0gbmV3IFBvb2woe1xyXG4gIGNvbm5lY3Rpb25TdHJpbmc6IHByb2Nlc3MuZW52LkRBVEFCQVNFX1VSTFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKipcclxuICAgKiBEYXRhYmFzZSBxdWVyeVxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSByZXFcclxuICAgKiBAcGFyYW0ge29iamVjdH0gcmVzXHJcbiAgICogQHJldHVybnMge29iamVjdH0gb2JqZWN0IChwcm9taXNlKVxyXG4gICAqL1xyXG4gIHF1ZXJ5KHRleHQsIHBhcmFtcyl7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBwb29sLnF1ZXJ5KHRleHQsIHBhcmFtcylcclxuICAgICAgLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIHJlc29sdmUocmVzKTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgfVxyXG59Il19