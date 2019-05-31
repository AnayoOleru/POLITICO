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
var createVote = function createVote() {
  var queryText = 'CREATE TABLE IF NOT EXISTS votes(\n    id UUID UNIQUE NOT NULL,\n    created_on TIMESTAMP,\n    created_by UUID NOT NULL, \n    userName VARCHAR(128) NOT NULL,\n    office UUID NOT NULL,\n    officeName VARCHAR(128) NOT NULL,\n    candidate UUID NOT NULL,\n    candidateName VARCHAR(128) NOT NULL,\n    FOREIGN KEY (office) REFERENCES office (id) ON DELETE CASCADE,\n    FOREIGN KEY (candidate) REFERENCES candidates (candidateId) ON DELETE CASCADE,\n    FOREIGN KEY (created_by) REFERENCES users (id) ON DELETE CASCADE,\n    PRIMARY KEY (office, candidate)\n  )';

  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  }).catch(function (err) {
    console.log(err);
    pool.end();
  });
};
module.exports = createVote;

require('make-runnable');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb250cm9sbGVycy9kYXRhYmFzZVRhYmxlcy92b3RlVGFibGVzLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJQb29sIiwiZG90ZW52IiwiY29uZmlnIiwicG9vbCIsImNvbm5lY3Rpb25TdHJpbmciLCJwcm9jZXNzIiwiZW52IiwiREFUQUJBU0VfVVJMIiwib24iLCJjb25zb2xlIiwibG9nIiwiY3JlYXRlVm90ZSIsInF1ZXJ5VGV4dCIsInF1ZXJ5IiwidGhlbiIsInJlcyIsImVuZCIsImNhdGNoIiwiZXJyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7ZUFBaUJBLFFBQVEsSUFBUixDO0lBQVRDLEksWUFBQUEsSTs7QUFDUixJQUFNQyxTQUFTRixRQUFRLFFBQVIsQ0FBZjs7QUFFQUUsT0FBT0MsTUFBUDs7QUFFQSxJQUFNQyxPQUFPLElBQUlILElBQUosQ0FBUztBQUNwQkksb0JBQWtCQyxRQUFRQyxHQUFSLENBQVlDO0FBRFYsQ0FBVCxDQUFiOztBQUlBSixLQUFLSyxFQUFMLENBQVEsU0FBUixFQUFtQixZQUFNO0FBQ3ZCQyxVQUFRQyxHQUFSLENBQVksMkJBQVo7QUFDRCxDQUZEOztBQUlBOzs7QUFHQSxJQUFNQyxhQUFhLFNBQWJBLFVBQWEsR0FBTTtBQUN2QixNQUFNQyxna0JBQU47O0FBZ0JBVCxPQUFLVSxLQUFMLENBQVdELFNBQVgsRUFDR0UsSUFESCxDQUNRLFVBQUNDLEdBQUQsRUFBUztBQUNiTixZQUFRQyxHQUFSLENBQVlLLEdBQVo7QUFDQVosU0FBS2EsR0FBTDtBQUNELEdBSkgsRUFLR0MsS0FMSCxDQUtTLFVBQUNDLEdBQUQsRUFBUztBQUNkVCxZQUFRQyxHQUFSLENBQVlRLEdBQVo7QUFDQWYsU0FBS2EsR0FBTDtBQUNELEdBUkg7QUFTRCxDQTFCRDtBQTJCQUcsT0FBT0MsT0FBUCxHQUFpQlQsVUFBakI7O0FBRUFaLFFBQVEsZUFBUiIsImZpbGUiOiJ2b3RlVGFibGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBQb29sIH0gPSByZXF1aXJlKCdwZycpO1xuY29uc3QgZG90ZW52ID0gcmVxdWlyZSgnZG90ZW52Jyk7XG5cbmRvdGVudi5jb25maWcoKTtcblxuY29uc3QgcG9vbCA9IG5ldyBQb29sKHtcbiAgY29ubmVjdGlvblN0cmluZzogcHJvY2Vzcy5lbnYuREFUQUJBU0VfVVJMXG59KTtcblxucG9vbC5vbignY29ubmVjdCcsICgpID0+IHtcbiAgY29uc29sZS5sb2coJ2RhdGFiYXNlIGlzIGNvbm5lY3RlZCBub3cnKTtcbn0pO1xuXG4vKipcbiAqIENyZWF0ZSB1c2VyIFRhYmxlc1xuICovXG5jb25zdCBjcmVhdGVWb3RlID0gKCkgPT4ge1xuICBjb25zdCBxdWVyeVRleHQgPVxuICBgQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgdm90ZXMoXG4gICAgaWQgVVVJRCBVTklRVUUgTk9UIE5VTEwsXG4gICAgY3JlYXRlZF9vbiBUSU1FU1RBTVAsXG4gICAgY3JlYXRlZF9ieSBVVUlEIE5PVCBOVUxMLCBcbiAgICB1c2VyTmFtZSBWQVJDSEFSKDEyOCkgTk9UIE5VTEwsXG4gICAgb2ZmaWNlIFVVSUQgTk9UIE5VTEwsXG4gICAgb2ZmaWNlTmFtZSBWQVJDSEFSKDEyOCkgTk9UIE5VTEwsXG4gICAgY2FuZGlkYXRlIFVVSUQgTk9UIE5VTEwsXG4gICAgY2FuZGlkYXRlTmFtZSBWQVJDSEFSKDEyOCkgTk9UIE5VTEwsXG4gICAgRk9SRUlHTiBLRVkgKG9mZmljZSkgUkVGRVJFTkNFUyBvZmZpY2UgKGlkKSBPTiBERUxFVEUgQ0FTQ0FERSxcbiAgICBGT1JFSUdOIEtFWSAoY2FuZGlkYXRlKSBSRUZFUkVOQ0VTIGNhbmRpZGF0ZXMgKGNhbmRpZGF0ZUlkKSBPTiBERUxFVEUgQ0FTQ0FERSxcbiAgICBGT1JFSUdOIEtFWSAoY3JlYXRlZF9ieSkgUkVGRVJFTkNFUyB1c2VycyAoaWQpIE9OIERFTEVURSBDQVNDQURFLFxuICAgIFBSSU1BUlkgS0VZIChvZmZpY2UsIGNhbmRpZGF0ZSlcbiAgKWA7XG5cbiAgcG9vbC5xdWVyeShxdWVyeVRleHQpXG4gICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgIHBvb2wuZW5kKCk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIHBvb2wuZW5kKCk7XG4gICAgfSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVZvdGU7XG5cbnJlcXVpcmUoJ21ha2UtcnVubmFibGUnKTtcblxuIl19