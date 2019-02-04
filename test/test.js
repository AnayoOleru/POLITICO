
// describe('Array', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       assert.equal([1,2,3].indexOf(4), -1);
//     });
//   });
// });

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import {goodSignup, badSignup, badSignup2, badSignup3, badLogin, 
  badLogin2, badLogin3, isEmail, badTestParty, badTestParty2, 
  badTestParty3, badTestParty4, offices, offices2, offices3, vote1,
vote2, vote3, candidate1, candidate2, candidate3 } from './inputField'

chai.use(chaiHttp);
const { expect } = chai;



// test if mocha exist



describe('GET \'/api/v1\'', () => {
  it('It should return  welcome message', (done) => {
    chai.request(app)
      .get('/api/v1')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(200);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Post \'/api/v1\'', () => {
  it('POST create an account', (done) => { // WHEN PASSWORD FIELD IS LEFT BLANK
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(badSignup)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Post \'/api/v1\'', () => {
  it('POST create an account', (done) => { // WHEN NAMES FIELD IS LEFT BLANK
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(badSignup2)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Post \'/api/v1\'', () => {
  it('POST create an account', (done) => { // WHEN NAMES FIELD IS LEFT BLANK
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(badSignup3)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});


// login
describe('Post \'/api/v1\'', () => {
  it('POST login to account', (done) => { // WHEN EMAIL IS INCORRECTLY LAID
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(badLogin)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Post \'/api/v1\'', () => {
  it('POST login to account', (done) => { // WHEN NAMES PASSWORD IS EMPTY
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(badLogin2)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Post \'/api/v1\'', () => {
  it('POST Login to account', (done) => { // WHEN ALL FIELDS ARE EMPTY
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(badLogin3)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

// describe('post /login', () => {
//   it('should return 401 if any credentiasl are invalid', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/login')
//           .send({
//   password: 'helllo',
//   email: 'mrb@gmail.com',
//         })
//       .end((err, res) => {
//         expect(err).to.be.null;
//         expect(res).to.have.headers;
//         expect(res).to.have.status(201);
//         expect(res).to.not.redirect;
//         expect(res.body).to.be.an('object');
//         done();
//       });
//   });
// });

// get all parties
describe('GET /parties', () => {
  it('should return all parties', (done) => {
    chai.request(app)
      .get('/api/v1/parties')
      .send(badTestParty)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.not.be.empty;
        done(err);
      });
  });
});

describe('GET /parties', () => {
  it('should return all parties', (done) => {
    chai.request(app)
      .get('/api/v1/parties')
      .send(badTestParty2)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.not.be.empty;
        done(err);
      });
  });
});

describe('GET /parties', () => {
  it('should return all parties', (done) => {
    chai.request(app)
      .get('/api/v1/parties')
      .send(badTestParty3)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.not.be.empty;
        done(err);
      });
  });
});

describe('GET /parties', () => {
  it('should return all parties', (done) => {
    chai.request(app)
      .get('/api/v1/parties')
      .send(badTestParty4)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.not.be.empty;
        done(err);
      });
  });
});

describe('Fetch Parties by Id',() => {
  it('should return 401 because there is no token', (done) => {
    chai.request(app)
      .get('/api/v1/parties/a34e2e87-eeaa-4721-80e9-724309e6bbea')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Post \'/api/v1\'', () => {
  it('POST login to account', (done) => { // WHEN EMAIL IS INCORRECTLY LAID
    chai.request(app)
      .post('/api/v1/parties')
      .send(badTestParty2)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Post \'/api/v1\'', () => {
  it('POST login to account', (done) => { // WHEN EMAIL IS INCORRECTLY LAID
    chai.request(app)
      .post('/api/v1/parties')
      .send(badTestParty3)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Post \'/api/v1\'', () => {
  it('POST login to account', (done) => { // WHEN EMAIL IS INCORRECTLY LAID
    chai.request(app)
      .post('/api/v1/parties')
      .send(badTestParty4)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

// offices
describe('GET /office', () => {
  it('should return all offices', (done) => {
    chai.request(app)
      .get('/api/v1/office')
      .send(offices2)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.not.be.empty;
        done(err);
      });
  });
});

describe('GET /offices', () => {
  it('should return all offices', (done) => {
    chai.request(app)
      .get('/api/v1/office')
      .send(offices3)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.not.be.empty;
        done(err);
      });
  });
});

describe('Fetch office by Id',() => {
  it('should return 401 because there is no token', (done) => {
    chai.request(app)
      .get('/api/v1/office/a34e2e87-eeaa-4721-80e9-724309e6bbea')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Post \'/api/v1\'', () => {
  it('POST office to account', (done) => { // WHEN EMAIL IS INCORRECTLY LAID
    chai.request(app)
      .post('/api/v1/office')
      .send(offices2)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Post \'/api/v1\'', () => {
  it('POST office to account', (done) => { // WHEN EMAIL IS INCORRECTLY LAID
    chai.request(app)
      .post('/api/v1/office')
      .send(offices3)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Post \'/api/v1\'', () => {
  it('POST vote for a candidate', (done) => { // WHEN EMAIL IS INCORRECTLY LAID
    chai.request(app)
      .post('/api/v1/vote')
      .send(vote1)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(404);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Post \'/api/v1\'', () => {
  it('POST vote for a candidate', (done) => { // WHEN EMAIL IS INCORRECTLY LAID
    chai.request(app)
      .post('/api/v1/vote')
      .send(vote2)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(404);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Post \'/api/v1\'', () => {
  it('POST vote for a candidate', (done) => { // WHEN EMAIL IS INCORRECTLY LAID
    chai.request(app)
      .post('/api/v1/vote')
      .send(vote3)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(404);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Post \'/api/v1\'', () => {
  it('POST register a candidate', (done) => { // WHEN EMAIL IS INCORRECTLY LAID
    chai.request(app)
      .post('/api/v1/:officeid/register')
      .send(candidate1)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(404);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Post \'/api/v1\'', () => {
  it('POST register a candidate', (done) => { // WHEN EMAIL IS INCORRECTLY LAID
    chai.request(app)
      .post('/api/v1/:officeid/register')
      .send(candidate2)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(404);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Post \'/api/v1\'', () => {
  it('POST register a candidate', (done) => { // WHEN EMAIL IS INCORRECTLY LAID
    chai.request(app)
      .post('/api/v1/:officeid/register')
      .send(candidate3)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(404);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});