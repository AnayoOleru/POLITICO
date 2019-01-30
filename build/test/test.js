'use strict';

var assert = require('assert');

// test if mocha exist
describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

/**
 * test/test.js
 * Basic tests to check if server exist
 */
var chai = require('chai');
var expect = chai.expect;

//start app
var app = require('../index');

// describe('App', () => {
//   it('Should exists', () => {
//     expect(app).to.be.a('function');})
// })

/**
 * Test for create party endpoint
 */
// describe('#POST /api/v1/parties "create new political party."', () => {
//   it('should create a new party', (done) => {
//     request(app).post('/api/v1/parties')
//       .send(partyDb)
//       .end((err, res) => {
//         expect(res.status).to.equal(201);
//         done();
//       });
//   });
//   it('should throw an error: "party already exist"', (done) => {
//     request(app).post('/api/v1/parties')
//       .send(partyDb)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body.error).equals('party not found');
//         done();
//       });
//   });
// it('should throw an error: "please check input"', (done) => {
//   request(app).post('/api/v1/parties')
//     .send(invalidParty)
//     .end((err, res) => {
//       expect(res.status).to.equal(400);
//       expect(res.body.error).equals('please check input');
//       done();
//     });
// });
// });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3Rlc3QvdGVzdC5qcyJdLCJuYW1lcyI6WyJhc3NlcnQiLCJyZXF1aXJlIiwiZGVzY3JpYmUiLCJpdCIsImVxdWFsIiwiaW5kZXhPZiIsImNoYWkiLCJleHBlY3QiLCJhcHAiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsU0FBU0MsUUFBUSxRQUFSLENBQWI7O0FBRUE7QUFDQUMsU0FBUyxPQUFULEVBQWtCLFlBQVc7QUFDM0JBLFdBQVMsWUFBVCxFQUF1QixZQUFXO0FBQ2hDQyxPQUFHLGdEQUFILEVBQXFELFlBQVc7QUFDOURILGFBQU9JLEtBQVAsQ0FBYSxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFRQyxPQUFSLENBQWdCLENBQWhCLENBQWIsRUFBaUMsQ0FBQyxDQUFsQztBQUNELEtBRkQ7QUFHRCxHQUpEO0FBS0QsQ0FORDs7QUFRQTs7OztBQUlBLElBQU1DLE9BQU9MLFFBQVEsTUFBUixDQUFiO0FBQ0EsSUFBTU0sU0FBU0QsS0FBS0MsTUFBcEI7O0FBRUE7QUFDQSxJQUFNQyxNQUFNUCxRQUFRLFVBQVIsQ0FBWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0YiLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKTtcclxuXHJcbi8vIHRlc3QgaWYgbW9jaGEgZXhpc3RcclxuZGVzY3JpYmUoJ0FycmF5JywgZnVuY3Rpb24oKSB7XHJcbiAgZGVzY3JpYmUoJyNpbmRleE9mKCknLCBmdW5jdGlvbigpIHtcclxuICAgIGl0KCdzaG91bGQgcmV0dXJuIC0xIHdoZW4gdGhlIHZhbHVlIGlzIG5vdCBwcmVzZW50JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgIGFzc2VydC5lcXVhbChbMSwyLDNdLmluZGV4T2YoNCksIC0xKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59KTtcclxuXHJcbi8qKlxyXG4gKiB0ZXN0L3Rlc3QuanNcclxuICogQmFzaWMgdGVzdHMgdG8gY2hlY2sgaWYgc2VydmVyIGV4aXN0XHJcbiAqL1xyXG5jb25zdCBjaGFpID0gcmVxdWlyZSgnY2hhaScpO1xyXG5jb25zdCBleHBlY3QgPSBjaGFpLmV4cGVjdDtcclxuXHJcbi8vc3RhcnQgYXBwXHJcbmNvbnN0IGFwcCA9IHJlcXVpcmUoJy4uL2luZGV4Jyk7XHJcblxyXG4vLyBkZXNjcmliZSgnQXBwJywgKCkgPT4ge1xyXG4vLyAgIGl0KCdTaG91bGQgZXhpc3RzJywgKCkgPT4ge1xyXG4vLyAgICAgZXhwZWN0KGFwcCkudG8uYmUuYSgnZnVuY3Rpb24nKTt9KVxyXG4vLyB9KVxyXG5cclxuLyoqXHJcbiAqIFRlc3QgZm9yIGNyZWF0ZSBwYXJ0eSBlbmRwb2ludFxyXG4gKi9cclxuLy8gZGVzY3JpYmUoJyNQT1NUIC9hcGkvdjEvcGFydGllcyBcImNyZWF0ZSBuZXcgcG9saXRpY2FsIHBhcnR5LlwiJywgKCkgPT4ge1xyXG4vLyAgIGl0KCdzaG91bGQgY3JlYXRlIGEgbmV3IHBhcnR5JywgKGRvbmUpID0+IHtcclxuLy8gICAgIHJlcXVlc3QoYXBwKS5wb3N0KCcvYXBpL3YxL3BhcnRpZXMnKVxyXG4vLyAgICAgICAuc2VuZChwYXJ0eURiKVxyXG4vLyAgICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xyXG4vLyAgICAgICAgIGV4cGVjdChyZXMuc3RhdHVzKS50by5lcXVhbCgyMDEpO1xyXG4vLyAgICAgICAgIGRvbmUoKTtcclxuLy8gICAgICAgfSk7XHJcbi8vICAgfSk7XHJcbi8vICAgaXQoJ3Nob3VsZCB0aHJvdyBhbiBlcnJvcjogXCJwYXJ0eSBhbHJlYWR5IGV4aXN0XCInLCAoZG9uZSkgPT4ge1xyXG4vLyAgICAgcmVxdWVzdChhcHApLnBvc3QoJy9hcGkvdjEvcGFydGllcycpXHJcbi8vICAgICAgIC5zZW5kKHBhcnR5RGIpXHJcbi8vICAgICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XHJcbi8vICAgICAgICAgZXhwZWN0KHJlcy5zdGF0dXMpLnRvLmVxdWFsKDQwMCk7XHJcbi8vICAgICAgICAgZXhwZWN0KHJlcy5ib2R5LmVycm9yKS5lcXVhbHMoJ3BhcnR5IG5vdCBmb3VuZCcpO1xyXG4vLyAgICAgICAgIGRvbmUoKTtcclxuLy8gICAgICAgfSk7XHJcbi8vICAgfSk7XHJcbiAgLy8gaXQoJ3Nob3VsZCB0aHJvdyBhbiBlcnJvcjogXCJwbGVhc2UgY2hlY2sgaW5wdXRcIicsIChkb25lKSA9PiB7XHJcbiAgLy8gICByZXF1ZXN0KGFwcCkucG9zdCgnL2FwaS92MS9wYXJ0aWVzJylcclxuICAvLyAgICAgLnNlbmQoaW52YWxpZFBhcnR5KVxyXG4gIC8vICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xyXG4gIC8vICAgICAgIGV4cGVjdChyZXMuc3RhdHVzKS50by5lcXVhbCg0MDApO1xyXG4gIC8vICAgICAgIGV4cGVjdChyZXMuYm9keS5lcnJvcikuZXF1YWxzKCdwbGVhc2UgY2hlY2sgaW5wdXQnKTtcclxuICAvLyAgICAgICBkb25lKCk7XHJcbiAgLy8gICAgIH0pO1xyXG4gIC8vIH0pO1xyXG4vLyB9KTsiXX0=