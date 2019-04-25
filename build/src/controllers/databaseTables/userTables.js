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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb250cm9sbGVycy9kYXRhYmFzZVRhYmxlcy91c2VyVGFibGVzLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJQb29sIiwiZG90ZW52IiwiY29uZmlnIiwicG9vbCIsImNvbm5lY3Rpb25TdHJpbmciLCJwcm9jZXNzIiwiZW52IiwiREFUQUJBU0VfVVJMIiwib24iLCJjb25zb2xlIiwibG9nIiwiY3JlYXRlVXNlclRhYmxlcyIsInF1ZXJ5VGV4dCIsInF1ZXJ5IiwidGhlbiIsInJlcyIsImVuZCIsImNhdGNoIiwiZXJyIiwiZHJvcFVzZXJUYWJsZXMiLCJleGl0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7ZUFBaUJBLFFBQVEsSUFBUixDO0lBQVRDLEksWUFBQUEsSTs7QUFDUixJQUFNQyxTQUFTRixRQUFRLFFBQVIsQ0FBZjs7QUFFQUUsT0FBT0MsTUFBUDs7QUFFQSxJQUFNQyxPQUFPLElBQUlILElBQUosQ0FBUztBQUNwQkksb0JBQWtCQyxRQUFRQyxHQUFSLENBQVlDO0FBRFYsQ0FBVCxDQUFiOztBQUlBSixLQUFLSyxFQUFMLENBQVEsU0FBUixFQUFtQixZQUFNO0FBQ3ZCQyxVQUFRQyxHQUFSLENBQVksMkJBQVo7QUFDRCxDQUZEOztBQUlBOzs7QUFHQSxJQUFNQyxtQkFBbUIsU0FBbkJBLGdCQUFtQixHQUFNO0FBQzdCLE1BQU1DLGlkQUFOOztBQWNBVCxPQUFLVSxLQUFMLENBQVdELFNBQVgsRUFDR0UsSUFESCxDQUNRLFVBQUNDLEdBQUQsRUFBUztBQUNiTixZQUFRQyxHQUFSLENBQVlLLEdBQVo7QUFDQVosU0FBS2EsR0FBTDtBQUNELEdBSkgsRUFLR0MsS0FMSCxDQUtTLFVBQUNDLEdBQUQsRUFBUztBQUNkVCxZQUFRQyxHQUFSLENBQVlRLEdBQVo7QUFDQWYsU0FBS2EsR0FBTDtBQUNELEdBUkg7QUFTRCxDQXhCRDtBQXlCQTs7QUFFQTs7O0FBR0EsSUFBTUcsaUJBQWlCLFNBQWpCQSxjQUFpQixHQUFNO0FBQzNCLE1BQU1QLFlBQVksNEJBQWxCO0FBQ0FULE9BQUtVLEtBQUwsQ0FBV0QsU0FBWCxFQUNHRSxJQURILENBQ1EsVUFBQ0MsR0FBRCxFQUFTO0FBQ2JOLFlBQVFDLEdBQVIsQ0FBWUssR0FBWjtBQUNBWixTQUFLYSxHQUFMO0FBQ0QsR0FKSCxFQUtHQyxLQUxILENBS1MsVUFBQ0MsR0FBRCxFQUFTO0FBQ2RULFlBQVFDLEdBQVIsQ0FBWVEsR0FBWjtBQUNBZixTQUFLYSxHQUFMO0FBQ0QsR0FSSDtBQVNELENBWEQ7O0FBYUFiLEtBQUtLLEVBQUwsQ0FBUSxRQUFSLEVBQWtCLFlBQU07QUFDdEJDLFVBQVFDLEdBQVIsQ0FBWSx3QkFBWjtBQUNBTCxVQUFRZSxJQUFSLENBQWEsQ0FBYjtBQUNELENBSEQ7O0FBS0FDLE9BQU9DLE9BQVAsR0FBaUI7QUFDZlgsb0NBRGU7QUFFZlE7QUFGZSxDQUFqQjs7QUFLQXBCLFFBQVEsZUFBUiIsImZpbGUiOiJ1c2VyVGFibGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBQb29sIH0gPSByZXF1aXJlKCdwZycpO1xuY29uc3QgZG90ZW52ID0gcmVxdWlyZSgnZG90ZW52Jyk7XG5cbmRvdGVudi5jb25maWcoKTtcblxuY29uc3QgcG9vbCA9IG5ldyBQb29sKHtcbiAgY29ubmVjdGlvblN0cmluZzogcHJvY2Vzcy5lbnYuREFUQUJBU0VfVVJMXG59KTtcblxucG9vbC5vbignY29ubmVjdCcsICgpID0+IHtcbiAgY29uc29sZS5sb2coJ2RhdGFiYXNlIGlzIGNvbm5lY3RlZCBub3cnKTtcbn0pO1xuXG4vKipcbiAqIENyZWF0ZSB1c2VyIFRhYmxlc1xuICovXG5jb25zdCBjcmVhdGVVc2VyVGFibGVzID0gKCkgPT4ge1xuICBjb25zdCBxdWVyeVRleHQgPVxuICAgIGBDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUU1xuICAgICAgdXNlcnMoXG4gICAgICAgIGlkIFVVSUQgUFJJTUFSWSBLRVkgTk9UIE5VTEwsXG4gICAgICAgIGZpcnN0bmFtZSBWQVJDSEFSKDEyOCkgTk9UIE5VTEwsXG4gICAgICAgIGxhc3RuYW1lIFZBUkNIQVIoMTI4KSBOT1QgTlVMTCxcbiAgICAgICAgb3RoZXJuYW1lIFZBUkNIQVIoMTI4KSBOT1QgTlVMTCxcbiAgICAgICAgZW1haWwgVkFSQ0hBUigxMjgpIFVOSVFVRSBOT1QgTlVMTCxcbiAgICAgICAgcGhvbmVudW1iZXIgVkFSQ0hBUigxMjgpIE5PVCBOVUxMLFxuICAgICAgICBwYXNzcG9ydFVybCBWQVJDSEFSKDEyOCkgTk9UIE5VTEwsXG4gICAgICAgIHBhc3N3b3JkIFZBUkNIQVIoMTIwKSBOT1QgTlVMTCxcbiAgICAgICAgaXNBZG1pbiBCT09MRUFOIERFRkFVTFQgZmFsc2UsXG4gICAgICAgIGNyZWF0ZWRfZGF0ZSBUSU1FU1RBTVApYDtcblxuICBwb29sLnF1ZXJ5KHF1ZXJ5VGV4dClcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgcG9vbC5lbmQoKTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgcG9vbC5lbmQoKTtcbiAgICB9KTtcbn1cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy87XG5cbi8qKlxuICogRHJvcCBUYWJsZXNcbiAqL1xuY29uc3QgZHJvcFVzZXJUYWJsZXMgPSAoKSA9PiB7XG4gIGNvbnN0IHF1ZXJ5VGV4dCA9ICdEUk9QIFRBQkxFIElGIEVYSVNUUyB1c2Vycyc7XG4gIHBvb2wucXVlcnkocXVlcnlUZXh0KVxuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICBwb29sLmVuZCgpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICBwb29sLmVuZCgpO1xuICAgIH0pO1xufVxuXG5wb29sLm9uKCdyZW1vdmUnLCAoKSA9PiB7XG4gIGNvbnNvbGUubG9nKCdUYWJsZSByY3JlYXRpb24gZXhpdGVkJyk7XG4gIHByb2Nlc3MuZXhpdCgwKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY3JlYXRlVXNlclRhYmxlcyxcbiAgZHJvcFVzZXJUYWJsZXMsXG59O1xuXG5yZXF1aXJlKCdtYWtlLXJ1bm5hYmxlJyk7Il19