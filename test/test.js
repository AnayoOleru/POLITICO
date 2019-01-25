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
 * Basic tests for Auth system API
 */
const chai = require('chai');
const expect = chai.expect;

//start app
const app = require('../index');

describe('App', () => {
  it('Should exists', () => {
    expect(app).to.be.a('function');})
})
