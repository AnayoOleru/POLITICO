'use strict';

var _require = require('pg'),
    Pool = _require.Pool;

var dotenv = require('dotenv');

dotenv.config();

var pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', function () {
  console.log('database is connected now');
});

/**
 * Create user Tables
 */
var createUserTables = function createUserTables() {
  var queryText = 'CREATE TABLE IF NOT EXISTS\n      users(\n        id UUID PRIMARY KEY NOT NULL,\n        firstname VARCHAR(128) NOT NULL,\n        lastname VARCHAR(128) NOT NULL,\n        othername VARCHAR(128) NOT NULL,\n        email VARCHAR(128) UNIQUE NOT NULL,\n        phonenumber VARCHAR(128) NOT NULL,\n        passportUrl VARCHAR(128) NOT NULL,\n        password VARCHAR(120) NOT NULL,\n        isAdmin BOOLEAN DEFAULT false,\n        created_date TIMESTAMP)';

  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  }).catch(function (err) {
    console.log(err);
    pool.end();
  });
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////;

/**
 * Drop Tables
 */
var dropUserTables = function dropUserTables() {
  var queryText = 'DROP TABLE IF EXISTS users';
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  }).catch(function (err) {
    console.log(err);
    pool.end();
  });
};

pool.on('remove', function () {
  console.log('Table rcreation exited');
  process.exit(0);
});

module.exports = {
  createUserTables: createUserTables,
  dropUserTables: dropUserTables
};

require('make-runnable');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb250cm9sbGVycy9kYXRhYmFzZVRhYmxlcy91c2VyVGFibGVzLmpzIl0sIm5hbWVzIjpbIlBvb2wiLCJyZXF1aXJlIiwiZG90ZW52IiwicG9vbCIsImNvbm5lY3Rpb25TdHJpbmciLCJwcm9jZXNzIiwiREFUQUJBU0VfVVJMIiwiY29uc29sZSIsImNyZWF0ZVVzZXJUYWJsZXMiLCJxdWVyeVRleHQiLCJkcm9wVXNlclRhYmxlcyIsIm1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7ZUFBaUJDLFFBQUFBLElBQUFBLEM7SUFBVEQsTyxTQUFBQSxJOztBQUNSLElBQU1FLFNBQVNELFFBQWYsUUFBZUEsQ0FBZjs7QUFFQUMsT0FBQUEsTUFBQUE7O0FBRUEsSUFBTUMsT0FBTyxJQUFBLElBQUEsQ0FBUztBQUNwQkMsb0JBQWtCQyxRQUFBQSxHQUFBQSxDQUFZQztBQURWLENBQVQsQ0FBYjs7QUFJQUgsS0FBQUEsRUFBQUEsQ0FBQUEsU0FBQUEsRUFBbUIsWUFBTTtBQUN2QkksVUFBQUEsR0FBQUEsQ0FBQUEsMkJBQUFBO0FBREZKLENBQUFBOztBQUlBOzs7QUFHQSxJQUFNSyxtQkFBbUIsU0FBbkJBLGdCQUFtQixHQUFNO0FBQzdCLE1BQU1DLFlBQU4scWNBQUE7O0FBY0FOLE9BQUFBLEtBQUFBLENBQUFBLFNBQUFBLEVBQUFBLElBQUFBLENBQ1EsVUFBQSxHQUFBLEVBQVM7QUFDYkksWUFBQUEsR0FBQUEsQ0FBQUEsR0FBQUE7QUFDQUosU0FBQUEsR0FBQUE7QUFISkEsR0FBQUEsRUFBQUEsS0FBQUEsQ0FLUyxVQUFBLEdBQUEsRUFBUztBQUNkSSxZQUFBQSxHQUFBQSxDQUFBQSxHQUFBQTtBQUNBSixTQUFBQSxHQUFBQTtBQVBKQSxHQUFBQTtBQWZGLENBQUE7QUF5QkE7O0FBRUE7OztBQUdBLElBQU1PLGlCQUFpQixTQUFqQkEsY0FBaUIsR0FBTTtBQUMzQixNQUFNRCxZQUFOLDRCQUFBO0FBQ0FOLE9BQUFBLEtBQUFBLENBQUFBLFNBQUFBLEVBQUFBLElBQUFBLENBQ1EsVUFBQSxHQUFBLEVBQVM7QUFDYkksWUFBQUEsR0FBQUEsQ0FBQUEsR0FBQUE7QUFDQUosU0FBQUEsR0FBQUE7QUFISkEsR0FBQUEsRUFBQUEsS0FBQUEsQ0FLUyxVQUFBLEdBQUEsRUFBUztBQUNkSSxZQUFBQSxHQUFBQSxDQUFBQSxHQUFBQTtBQUNBSixTQUFBQSxHQUFBQTtBQVBKQSxHQUFBQTtBQUZGLENBQUE7O0FBYUFBLEtBQUFBLEVBQUFBLENBQUFBLFFBQUFBLEVBQWtCLFlBQU07QUFDdEJJLFVBQUFBLEdBQUFBLENBQUFBLHdCQUFBQTtBQUNBRixVQUFBQSxJQUFBQSxDQUFBQSxDQUFBQTtBQUZGRixDQUFBQTs7QUFLQVEsT0FBQUEsT0FBQUEsR0FBaUI7QUFDZkgsb0JBRGUsZ0JBQUE7QUFFZkUsa0JBQUFBO0FBRmUsQ0FBakJDOztBQUtBVixRQUFBQSxlQUFBQSIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgUG9vbCB9ID0gcmVxdWlyZSgncGcnKTtcbmNvbnN0IGRvdGVudiA9IHJlcXVpcmUoJ2RvdGVudicpO1xuXG5kb3RlbnYuY29uZmlnKCk7XG5cbmNvbnN0IHBvb2wgPSBuZXcgUG9vbCh7XG4gIGNvbm5lY3Rpb25TdHJpbmc6IHByb2Nlc3MuZW52LkRBVEFCQVNFX1VSTFxufSk7XG5cbnBvb2wub24oJ2Nvbm5lY3QnLCAoKSA9PiB7XG4gIGNvbnNvbGUubG9nKCdkYXRhYmFzZSBpcyBjb25uZWN0ZWQgbm93Jyk7XG59KTtcblxuLyoqXG4gKiBDcmVhdGUgdXNlciBUYWJsZXNcbiAqL1xuY29uc3QgY3JlYXRlVXNlclRhYmxlcyA9ICgpID0+IHtcbiAgY29uc3QgcXVlcnlUZXh0ID1cbiAgICBgQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFNcbiAgICAgIHVzZXJzKFxuICAgICAgICBpZCBVVUlEIFBSSU1BUlkgS0VZIE5PVCBOVUxMLFxuICAgICAgICBmaXJzdG5hbWUgVkFSQ0hBUigxMjgpIE5PVCBOVUxMLFxuICAgICAgICBsYXN0bmFtZSBWQVJDSEFSKDEyOCkgTk9UIE5VTEwsXG4gICAgICAgIG90aGVybmFtZSBWQVJDSEFSKDEyOCkgTk9UIE5VTEwsXG4gICAgICAgIGVtYWlsIFZBUkNIQVIoMTI4KSBVTklRVUUgTk9UIE5VTEwsXG4gICAgICAgIHBob25lbnVtYmVyIFZBUkNIQVIoMTI4KSBOT1QgTlVMTCxcbiAgICAgICAgcGFzc3BvcnRVcmwgVkFSQ0hBUigxMjgpIE5PVCBOVUxMLFxuICAgICAgICBwYXNzd29yZCBWQVJDSEFSKDEyMCkgTk9UIE5VTEwsXG4gICAgICAgIGlzQWRtaW4gQk9PTEVBTiBERUZBVUxUIGZhbHNlLFxuICAgICAgICBjcmVhdGVkX2RhdGUgVElNRVNUQU1QKWA7XG5cbiAgcG9vbC5xdWVyeShxdWVyeVRleHQpXG4gICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgIHBvb2wuZW5kKCk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIHBvb2wuZW5kKCk7XG4gICAgfSk7XG59XG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vO1xuXG4vKipcbiAqIERyb3AgVGFibGVzXG4gKi9cbmNvbnN0IGRyb3BVc2VyVGFibGVzID0gKCkgPT4ge1xuICBjb25zdCBxdWVyeVRleHQgPSAnRFJPUCBUQUJMRSBJRiBFWElTVFMgdXNlcnMnO1xuICBwb29sLnF1ZXJ5KHF1ZXJ5VGV4dClcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgcG9vbC5lbmQoKTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgcG9vbC5lbmQoKTtcbiAgICB9KTtcbn1cblxucG9vbC5vbigncmVtb3ZlJywgKCkgPT4ge1xuICBjb25zb2xlLmxvZygnVGFibGUgcmNyZWF0aW9uIGV4aXRlZCcpO1xuICBwcm9jZXNzLmV4aXQoMCk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNyZWF0ZVVzZXJUYWJsZXMsXG4gIGRyb3BVc2VyVGFibGVzLFxufTtcblxucmVxdWlyZSgnbWFrZS1ydW5uYWJsZScpOyJdfQ==