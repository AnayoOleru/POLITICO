let assert = require('assert');

// test if mocha exist
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});

/**
 * test/test.js
 * Basic tests to check if server exist
 */
const chai = require('chai');
const expect = chai.expect;

//start app
const app = require('../index');

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