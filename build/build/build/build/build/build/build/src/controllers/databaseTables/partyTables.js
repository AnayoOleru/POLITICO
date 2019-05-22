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
var createPartyTables = function createPartyTables() {
  var queryText = 'CREATE TABLE IF NOT EXISTS\n      party(\n        id UUID PRIMARY KEY NOT NULL,\n        name VARCHAR(128) NOT NULL,\n        hqaddress VARCHAR(128) NOT NULL,\n        logoUrl VARCHAR(128) NOT NULL,\n        created_date TIMESTAMP\n      )';

  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  }).catch(function (err) {
    console.log(err);
    pool.end();
  });
};

/**
 * Drop Tables
 */
var dropPartyTables = function dropPartyTables() {
  var queryText = 'DROP TABLE IF EXISTS party';
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
  createPartyTables: createPartyTables,
  dropPartyTables: dropPartyTables
};

require('make-runnable');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb250cm9sbGVycy9kYXRhYmFzZVRhYmxlcy9wYXJ0eVRhYmxlcy5qcyJdLCJuYW1lcyI6WyJQb29sIiwicmVxdWlyZSIsImRvdGVudiIsInBvb2wiLCJjb25uZWN0aW9uU3RyaW5nIiwicHJvY2VzcyIsIkRBVEFCQVNFX1VSTCIsImNvbnNvbGUiLCJjcmVhdGVQYXJ0eVRhYmxlcyIsInF1ZXJ5VGV4dCIsImRyb3BQYXJ0eVRhYmxlcyIsIm1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7ZUFBaUJDLFFBQUFBLElBQUFBLEM7SUFBVEQsTyxTQUFBQSxJOztBQUNSLElBQU1FLFNBQVNELFFBQWYsUUFBZUEsQ0FBZjs7QUFFQUMsT0FBQUEsTUFBQUE7O0FBRUEsSUFBTUMsT0FBTyxJQUFBLElBQUEsQ0FBUztBQUNwQkMsb0JBQWtCQyxRQUFBQSxHQUFBQSxDQUFZQztBQURWLENBQVQsQ0FBYjs7QUFJQUgsS0FBQUEsRUFBQUEsQ0FBQUEsU0FBQUEsRUFBbUIsWUFBTTtBQUN2QkksVUFBQUEsR0FBQUEsQ0FBQUEsMkJBQUFBO0FBREZKLENBQUFBOztBQUlBOzs7QUFHQSxJQUFNSyxvQkFBb0IsU0FBcEJBLGlCQUFvQixHQUFNO0FBQzlCLE1BQU1DLFlBQU4saVBBQUE7O0FBVUFOLE9BQUFBLEtBQUFBLENBQUFBLFNBQUFBLEVBQUFBLElBQUFBLENBQ1EsVUFBQSxHQUFBLEVBQVM7QUFDYkksWUFBQUEsR0FBQUEsQ0FBQUEsR0FBQUE7QUFDQUosU0FBQUEsR0FBQUE7QUFISkEsR0FBQUEsRUFBQUEsS0FBQUEsQ0FLUyxVQUFBLEdBQUEsRUFBUztBQUNkSSxZQUFBQSxHQUFBQSxDQUFBQSxHQUFBQTtBQUNBSixTQUFBQSxHQUFBQTtBQVBKQSxHQUFBQTtBQVhGLENBQUE7O0FBc0JBOzs7QUFHQSxJQUFNTyxrQkFBa0IsU0FBbEJBLGVBQWtCLEdBQU07QUFDNUIsTUFBTUQsWUFBTiw0QkFBQTtBQUNBTixPQUFBQSxLQUFBQSxDQUFBQSxTQUFBQSxFQUFBQSxJQUFBQSxDQUNRLFVBQUEsR0FBQSxFQUFTO0FBQ2JJLFlBQUFBLEdBQUFBLENBQUFBLEdBQUFBO0FBQ0FKLFNBQUFBLEdBQUFBO0FBSEpBLEdBQUFBLEVBQUFBLEtBQUFBLENBS1MsVUFBQSxHQUFBLEVBQVM7QUFDZEksWUFBQUEsR0FBQUEsQ0FBQUEsR0FBQUE7QUFDQUosU0FBQUEsR0FBQUE7QUFQSkEsR0FBQUE7QUFGRixDQUFBOztBQWFBQSxLQUFBQSxFQUFBQSxDQUFBQSxRQUFBQSxFQUFrQixZQUFNO0FBQ3RCSSxVQUFBQSxHQUFBQSxDQUFBQSx3QkFBQUE7QUFDQUYsVUFBQUEsSUFBQUEsQ0FBQUEsQ0FBQUE7QUFGRkYsQ0FBQUE7O0FBS0FRLE9BQUFBLE9BQUFBLEdBQWlCO0FBQ2ZILHFCQURlLGlCQUFBO0FBRWZFLG1CQUFBQTtBQUZlLENBQWpCQzs7QUFLQVYsUUFBQUEsZUFBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IFBvb2wgfSA9IHJlcXVpcmUoJ3BnJyk7XG5jb25zdCBkb3RlbnYgPSByZXF1aXJlKCdkb3RlbnYnKTtcblxuZG90ZW52LmNvbmZpZygpO1xuXG5jb25zdCBwb29sID0gbmV3IFBvb2woe1xuICBjb25uZWN0aW9uU3RyaW5nOiBwcm9jZXNzLmVudi5EQVRBQkFTRV9VUkxcbn0pO1xuXG5wb29sLm9uKCdjb25uZWN0JywgKCkgPT4ge1xuICBjb25zb2xlLmxvZygnZGF0YWJhc2UgaXMgY29ubmVjdGVkIG5vdycpO1xufSk7XG5cbi8qKlxuICogQ3JlYXRlIHVzZXIgVGFibGVzXG4gKi9cbmNvbnN0IGNyZWF0ZVBhcnR5VGFibGVzID0gKCkgPT4ge1xuICBjb25zdCBxdWVyeVRleHQgPVxuICAgIGBDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUU1xuICAgICAgcGFydHkoXG4gICAgICAgIGlkIFVVSUQgUFJJTUFSWSBLRVkgTk9UIE5VTEwsXG4gICAgICAgIG5hbWUgVkFSQ0hBUigxMjgpIE5PVCBOVUxMLFxuICAgICAgICBocWFkZHJlc3MgVkFSQ0hBUigxMjgpIE5PVCBOVUxMLFxuICAgICAgICBsb2dvVXJsIFZBUkNIQVIoMTI4KSBOT1QgTlVMTCxcbiAgICAgICAgY3JlYXRlZF9kYXRlIFRJTUVTVEFNUFxuICAgICAgKWA7XG5cbiAgcG9vbC5xdWVyeShxdWVyeVRleHQpXG4gICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgIHBvb2wuZW5kKCk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIHBvb2wuZW5kKCk7XG4gICAgfSk7XG59XG5cbi8qKlxuICogRHJvcCBUYWJsZXNcbiAqL1xuY29uc3QgZHJvcFBhcnR5VGFibGVzID0gKCkgPT4ge1xuICBjb25zdCBxdWVyeVRleHQgPSAnRFJPUCBUQUJMRSBJRiBFWElTVFMgcGFydHknO1xuICBwb29sLnF1ZXJ5KHF1ZXJ5VGV4dClcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgcG9vbC5lbmQoKTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgcG9vbC5lbmQoKTtcbiAgICB9KTtcbn1cblxucG9vbC5vbigncmVtb3ZlJywgKCkgPT4ge1xuICBjb25zb2xlLmxvZygnVGFibGUgcmNyZWF0aW9uIGV4aXRlZCcpO1xuICBwcm9jZXNzLmV4aXQoMCk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNyZWF0ZVBhcnR5VGFibGVzLFxuICBkcm9wUGFydHlUYWJsZXNcbn07XG5cbnJlcXVpcmUoJ21ha2UtcnVubmFibGUnKTsiXX0=