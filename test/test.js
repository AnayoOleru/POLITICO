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

describe('App', () => {
  it('Should exists', () => {
    expect(app).to.be.a('function');})
})

/**
 * Test for the general route
 */
// describe('GET \'/api/v1\'', () => {
//   it('It should return  welcome message', (done) => {
//     chai.request(app)
//       .get('/api/v1')
//       .end((err, res) => {
//         expect(err).to.be.null;
//         expect(res).to.have.headers;
//         expect(res).to.have.status(200);
//         expect(res).to.not.redirect;
//         expect(res.body).to.be.an('object'); 
//         done();
//       });
//   });
// });

