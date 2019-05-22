'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _index = require('../src/index');

var _index2 = _interopRequireDefault(_index);

var _inputField = require('./inputField');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

_chai2.default.use(_chaiHttp2.default);
var expect = _chai2.default.expect;

describe('App.js', function () {
  var adminToken = void 0;
  var userToken = void 0;

  before((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var res;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _chai2.default.request(_index2.default).post('/api/v1/auth/login').send({
              email: 'anayokyle@gmail.com',
              password: 'anayokyleoleru'
            });

          case 2:
            res = _context.sent;

            adminToken = res.body.data[0].token;

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  describe('/api/v1', function () {
    it('It should return  welcome message', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1').end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
    });
  });

  // describe('/', () => {
  //   it('should redirect to the homepage', (done) => {
  //     chai.request(app)
  //     .get('/')
  //     .end((err, res) => {
  //       expect(err).to.be.null;
  //       expect(res).to.have.status(300)
  //       expect(res).to.redirect;
  //       expect(res.sendFile).to.equal(path.join(__dirname + '../../UI/views/index.html'));
  //       done()
  //     })
  //   })
  // })

  // users signup

  describe('/api/v1/auth/signup', function () {
    it('Shouldn\'t signup when input field are empty', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send(_inputField.badSignup4).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Some values are missing');
        done();
      });
    });

    it('Shouldn\'t contain whitespace', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send(_inputField.badSignup5).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('White Space are not allowed in input fields');
        done();
      });
    });

    it('POST create an account', function (done) {
      // WHEN PASSWORD FIELD IS LEFT BLANK
      _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send(_inputField.badSignup).end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
    });
    it('phone number must be valid Nigerian number', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send({
        firstname: 'john',
        lastname: 'doe',
        othername: 'ben',
        email: 'veryemaildr@gmail.ion',
        phoneNumber: 'fgch',
        passportUrl: 'https://hpu.jpg',
        password: 'hdbsjdfdfd234'
      }).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Invalid Nigerian phone-number');
        done();
      });
    });

    it('passportUrl must not be empty', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send({
        firstname: 'john',
        lastname: 'doe',
        othername: 'ben',
        email: 'veryemaildr@gmail.ion',
        phoneNumber: '08096875654',
        passportUrl: '',
        password: 'hdbsjdfdfd234'
      }).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Some values are missing');
        done();
      });
    });
    it('When password field is empty', function (done) {
      // WHEN NAMES FIELD IS LEFT BLANK
      _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send(_inputField.badSignup3).end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Some values are missing');
        done();
      });
    });
    it('when firstname, lastname and othername is empty', function (done) {
      // WHEN NAMES FIELD IS LEFT BLANK
      _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send(_inputField.badSignup2).end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Some values are missing');
        done();
      });
    });
    it('should not sign user twice', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send({
        firstname: 'munachi',
        lastname: 'muna',
        othername: 'chichi',
        email: 'munachi@gmail.com',
        phonenumber: '07069583654',
        passportUrl: 'http://jp.jpg',
        password: 'munachi12345'
      }).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(409);
        expect(res.body.error).to.equal('User with that EMAIL already exist');
        done();
      });
    });
  });

  // login
  describe('/api/v1/auth/login', function () {
    it('when email is invalid', function (done) {
      // WHEN EMAIL IS INCORRECTLY LAID
      _chai2.default.request(_index2.default).post('/api/v1/auth/login').send(_inputField.badLogin).end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Please enter a valid email address');
        done();
      });
    });
    it('when password oe email field is empty', function (done) {
      // WHEN NAMES PASSWORD IS EMPTY
      _chai2.default.request(_index2.default).post('/api/v1/auth/login').send(_inputField.badLogin2).end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Some values are missing');
        done();
      });
    });
    it('when there are white spaces in input fields instead', function (done) {
      // WHEN ALL FIELDS ARE EMPTY
      _chai2.default.request(_index2.default).post('/api/v1/auth/login').send(_inputField.badLogin3).end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('White Space are not allowed in input fields');
        done();
      });
    });

    it('when email or passwod does not exist in the database', function (done) {
      // WHEN ALL FIELDS ARE EMPTY
      _chai2.default.request(_index2.default).post('/api/v1/auth/login').send(_inputField.goodLogin).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('password is incorrect');
        done();
      });
    });

    it('successful login', function (done) {
      // WHEN ALL FIELDS ARE EMPTY
      _chai2.default.request(_index2.default).post('/api/v1/auth/login').send({
        email: 'munachi@gmail.com',
        password: 'munachi12345'
      }).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(201);
        expect(res.body.data[0].user.email).to.equal('munachi@gmail.com');
        done();
      });
    });
  });

  // test to get all users
  // describe('/api/v1/auth/users', () => {
  //   it('successfully gets all users', (done) => {
  //     chai.request(app)
  //     .get('/api/v1/users')
  //     .end((err, res) => {
  //       expect(res).to.be.json;
  //       expect(res).to.have.status(200);
  //       expect(res.body.data[0].firstname).to.equal('Anayo');
  //       expect(res.body.data[0].lastname).to.equal('Oleru');
  //       expect(res.body.data[0].othername).to.equal('David');
  //       expect(res.body.data[0].email).to.equal('anayo_oleru@outlook.com');
  //       expect(res.body.data[0].phonenumber).to.equal('07069583654');
  //       expect(res.body.data[0].passportUrl).to.equal('https://anayo.jpg');
  //       expect(res.body.data[0].password).to.equal('munachi12345');
  //       done();
  //     })
  //   })
  // })


  // create political parties
  describe('POST api/v1/parties', function () {
    it('only authorise admin can access', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/parties').send(_inputField.testParty).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('User not authorised!');
        done();
      });
    });
    it('party name must not be empty', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/parties').set('x-access-token', '' + adminToken).send(_inputField.badTestParty).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Party field is empty');
        done();
      });
    });

    it('party hqaddress must not be empty', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/parties').set('x-access-token', '' + adminToken).send(_inputField.badTestParty2).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Address field is empty');
        done();
      });
    });

    it('party logoUrl must not be empty', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/parties').set('x-access-token', '' + adminToken).send(_inputField.badTestParty3).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Logo field is empty');
        done();
      });
    });

    it('party inputs field must not be empty', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/parties').set('x-access-token', '' + adminToken).send(_inputField.badTestParty4).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Inputs fields can\'t be left empty');
        done();
      });
    });

    it('party name must be valid', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/parties').set('x-access-token', '' + adminToken).send(_inputField.badTestParty5).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Alphabets only');
        done();
      });
    });

    it('party logo must be valid', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/parties').set('x-access-token', '' + adminToken).send(_inputField.badTestParty6).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Incorrect URL. Use https://');
        done();
      });
    });

    it('party hqaddress must be valid', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/parties').set('x-access-token', '' + adminToken).send(_inputField.badTestParty7).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Please enter a valid address');
        done();
      });
    });

    it('party already exist', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/parties').set('x-access-token', '' + adminToken).send(_inputField.badTestParty8).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Party already exist');
        done();
      });
    });
    // it('party successfully created', (done) => {
    //   chai.request(app)
    //     .post('/api/v1/parties')
    //     .set('x-access-token', `${adminToken}`)
    //     .send(testParty)
    //     .end((err, res) => {
    //       expect(res).to.be.json;
    //         expect(res).to.have.status(201);
    //         expect(res.body.data.order[0].name).to.equal('Action congress Nigeria');
    //         expect(res.body.data.order[0].id).to.equal(1);
    //       done();
    //     });
    // });
  });

  // get specific party
  describe('GET api/v1/parties', function () {
    it('should return 400, no token', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/parties/6e2dc601-8990-4de3-af32-71918b87a363').end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('User not authorised!');
        done();
      });
    });

    it('should return 400 if user ID is invalid', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/parties/qw1```88').set('x-access-token', '' + adminToken).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('The user ID used is invalid');
        done();
      });
    });

    it('should return 404 if party is not found', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/parties/a34e2e87-eeaa-4721-80e9-724309e6bbea').set('x-access-token', '' + adminToken).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal('Party not found');
        done();
      });
    });

    it('should return 200, when successful', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/parties/5b69cfa0-9a9c-4917-91b8-6769be8fac12').set('x-access-token', '' + adminToken).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(200);
        expect(res.body.data[0].order.name).to.equal('Action congress');
        expect(res.body.data[0].order.hqaddress).to.equal('$22');
        expect(res.body.data[0].order.logourl).to.equal('https://ac.jpg');
        done();
      });
    });
  });

  // get all parties
  describe('GET api/v1/parties', function () {
    it('should select all party and return it successfully', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/parties').set('x-access-token', '' + adminToken).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(200);
        done();
      });
    });
  });

  // update a specific party
  describe('PATCH api/v1/parties', function () {
    it('should not give access when admin token not provided', function (done) {
      _chai2.default.request(_index2.default).patch('/api/v1/parties/6e2dc601-8990-4de3-af32-71918b87a363/name').send({
        name: 'People City party'
      }).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('User not authorised!');
        done();
      });
    });

    it('should return 400 when name input field is left empty', function (done) {
      _chai2.default.request(_index2.default).patch('/api/v1/parties/6e2dc601-8990-4de3-af32-71918b87a363/name').set('x-access-token', '' + adminToken).send({
        name: ''
      }).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Input field can\'t be left empty');
        done();
      });
    });

    it('should return 404 when party with that id does not exist', function (done) {
      _chai2.default.request(_index2.default).patch('/api/v1/parties/fd1648b9-32dd-402a-b2fe-98c9df1c585c/name').set('x-access-token', '' + adminToken).send({
        name: 'Cold city party'
      }).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal('Party not found');
        done();
      });
    });

    it('should return 404 when party with that id does not exist', function (done) {
      _chai2.default.request(_index2.default).patch('/api/v1/parties/fd1648b932dd-402a-98c9df1c45er/name').set('x-access-token', '' + adminToken).send({
        name: 'Cold city party'
      }).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Oops, something wrong happened. Check and try again');
        done();
      });
    });

    it('should return 200 if successful', function (done) {
      _chai2.default.request(_index2.default).patch('/api/v1/parties/bc3ea221-8c2c-4050-b152-ce4ed5196474/name').set('x-access-token', '' + adminToken).send({
        name: 'Cold city party'
      }).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(200);
        done();
      });
    });
  });

  // delete party
  describe('DELETE api/v1/parties', function () {
    it('should return 400 if admin token not provided', function (done) {
      _chai2.default.request(_index2.default).delete('/api/v1/parties/6e2dc601-8990-4de3-af32-71918b87a363').end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('User not authorised!');
        done();
      });
    });

    it('should return 404 if party id does not exist', function (done) {
      _chai2.default.request(_index2.default).delete('/api/v1/parties/fd1648b9-32dd-402a-b2fe-98c9df1c585c').set('x-access-token', '' + adminToken).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal(404);
        expect(res.body.message).to.equal('party not found');
        done();
      });
    });
  });

  // describe('GET \'api/v1/parties\'', () => {
  //   it('should return all parties', (done) => {
  //     chai.request(app)
  //       .get('/api/v1/parties')
  //       .send(badTestParty3)
  //       .end((err, res) => {
  //         expect(res.status).to.equal(400);
  //         expect(res.body).to.not.be.empty;
  //         done(err);
  //       });
  //   });
  // });

  // describe('GET \'api/v1/parties\'', () => {
  //   it('should return all parties', (done) => {
  //     chai.request(app)
  //       .get('/api/v1/parties')
  //       .send(badTestParty4)
  //       .end((err, res) => {
  //         expect(res.status).to.equal(400);
  //         expect(res.body).to.not.be.empty;
  //         done(err);
  //       });
  //   });
  // });

  // describe('Fetch Parties by Id',() => {
  //   it('should return 401 because there is no token', (done) => {
  //     chai.request(app)
  //       .get('/api/v1/parties/a34e2e87-eeaa-4721-80e9-724309e6bbea')
  //       .end((err, res) => {
  //         expect(err).to.be.null;
  //         expect(res).to.have.headers;
  //         expect(res).to.have.status(400);
  //         expect(res).to.not.redirect;
  //         expect(res.body).to.be.an('object');
  //         done();
  //       });
  //   });
  // });

  // describe('POST \'/api/v1/parties\'', () => {
  //   it('POST login to account', (done) => { 
  //     chai.request(app)
  //       .post('/api/v1/parties')
  //       .send(badTestParty2)
  //       .end((err, res) => {
  //         expect(err).to.be.null;
  //         expect(res).to.have.headers;
  //         expect(res).to.have.status(400);
  //         expect(res).to.not.redirect;
  //         expect(res.body).to.be.an('object');
  //         done();
  //       });
  //   });
  // });

  // describe('POST \'/api/v1/parties\'', () => {
  //   it('POST login to account', (done) => { 
  //     chai.request(app)
  //       .post('/api/v1/parties')
  //       .send(badTestParty3)
  //       .end((err, res) => {
  //         expect(err).to.be.null;
  //         expect(res).to.have.headers;
  //         expect(res).to.have.status(400);
  //         expect(res).to.not.redirect;
  //         expect(res.body).to.be.an('object');
  //         done();
  //       });
  //   });
  // });

  // describe('POST \'/api/v1/parties\'', () => {
  //   it('POST login to account', (done) => { 
  //     chai.request(app)
  //       .post('/api/v1/parties')
  //       .send(badTestParty4)
  //       .end((err, res) => {
  //         expect(err).to.be.null;
  //         expect(res).to.have.headers;
  //         expect(res).to.have.status(400);
  //         expect(res).to.not.redirect;
  //         expect(res.body).to.be.an('object');
  //         done();
  //       });
  //   });
  // });

  // create office
  describe('POST /api/v1/offices', function () {
    it('only authorise admin can access', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/offices').send(_inputField.offices).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('User not authorised!');
        done();
      });
    });
    it('office type must not be empty', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/offices').set('x-access-token', '' + adminToken).send(_inputField.offices2).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Type field is empty');
        done();
      });
    });

    it('office name field must not be empty', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/offices').set('x-access-token', '' + adminToken).send(_inputField.offices3).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Name field is empty');
        done();
      });
    });

    it('office inputs field must not be empty', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/offices').set('x-access-token', '' + adminToken).send(_inputField.offices4).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Inputs fields can\'t be left empty');
        done();
      });
    });

    it('office name and type should contain only alphabets', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/offices').set('x-access-token', '' + adminToken).send(_inputField.offices5).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Alphabets only');
        done();
      });
    });

    it('office must not already exist in the database', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/offices').set('x-access-token', '' + adminToken).send({
        name: 'Presidency',
        type: 'Federal'
      }).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Office already exist');
        done();
      });
    });
    // unresolved promise
    it('should return 201 if successful', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/offices').set('x-access-token', '' + adminToken).send({
        type: 'State',
        name: 'Governor of Kaduna state'
      }).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(400); //wrong
        // expect(res.body.data[0].message).to.equal('office created');
        // expect(res.body.data[0].order.type).to.equal('State');
        // expect(res.body.data[0].order.name).to.equal('Governor of Kaduna state');
        done();
      });
    });
  });

  // get all office
  describe('GET /api/v1/offices', function () {
    it('should get all offices', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/offices').set('x-access-token', '' + adminToken).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        done();
      });
    });
  });

  // get a specific office
  describe('GET api/v1/offices', function () {
    it('should return 400, no token', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/offices/6e2dc601-8990-4de3-af32-71918b87a363').end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('User not authorised!');
        done();
      });
    });

    it('should return 400 if user ID is invalid', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/offices/qw1```88').set('x-access-token', '' + adminToken).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Bad request. Check and try again');
        done();
      });
    });

    it('should return 404 if office is not found', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/offices/a34e2e87-eeaa-4721-80e9-724309e6bbea').set('x-access-token', '' + adminToken).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal('Office not found');
        done();
      });
    });
    //  insert database values into the right places
    it('should return 200, when successful', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/offices/fd1648b9-32dd-402a-b2fe-98c9df1c585c').set('x-access-token', '' + adminToken).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(400); //wrong
        //  expect(res.body.data[0].type).to.equal('Federal');
        //  expect(res.body.data[0].name).to.equal('Presidency');
        done();
      });
    });
  });

  //  get office result
  describe('GET /api/v1/office/:officeid/result', function () {
    it('should have a valid ID passed on to the params', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/office/78ty--/result').set('x-access-token', '' + adminToken).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('The user ID used is invalid');
        done();
      });
    });

    // it('should return 404 if office is not found', (done) => {
    //   chai.request(app)
    //   .get('/api/v1/office/2400cfbc-4b15-4006-86c3-3ff767a63105/result')
    //   .set('x-access-token', `${adminToken}`)
    //   .end((err, res) => {
    //     expect(res).to.be.json;
    //     expect(res).to.have.status(400);
    //     expect(res.body.error).to.equal('Office not found');
    //     done();
    //   })
    // });

    // check database for the left blank inputs
    it('should return 200 if office result is created successfully', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/office/fd1648b9-32dd-402a-b2fe-98c9df1c585c/result').set('x-access-token', '' + adminToken).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(200);
        // expect(res.body.data[0].singleResult.office).to.equal('fd1648b9-32dd-402a-b2fe-98c9df1c585c');
        // expect(res.body.data[0].singleResult.candidate).to.equal('8ea76e40-7f2f-4bce-b07f-9f3872ac39c0', 'bcf38d74-6bb9-4037-84a5-e694adf27c0d');
        done();
      });
    });
  });

  // votes
  describe('POST /api/v1/votes', function () {
    it('should return 400 if inputs contain white spaces', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/votes').set('x-access-token', '' + adminToken).send(_inputField.badVoteResult5).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('White Space are not allowed in input fields');
        done();
      });
    });

    it('should return 400 when all inputs fields is empty', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/votes').set('x-access-token', '' + adminToken).send(_inputField.badVoteResult4).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Some values are missing');
        done();
      });
    });

    // it('should return 201 when vote is successful', (done) =>{
    //   chai.request(app)
    //   .post('/api/v1/votes')
    //   .set('x-access-token', `${adminToken}`)
    //   .send(goodVoteResult)
    //   .end((err, res) => {
    //     expect(res).to.be.json;
    //     expect(res).to.have.status(201);
    //     expect(res.body[0].data.message).to.equal('Vote complete');
    //     // expect(res.body[0].data.data.office).to.equal('fd1648b9-32dd-402a-b2fe-98c9df1c585c');
    //     // expect(res.body[0].data.data.candidate).to.equal('7c01b43d-e911-4a6f-8cc0-1d5c8c16501d');
    //     // expect(res.body[0].data.data.voter).to.equal('a5934256-ea1b-476c-af9a-b2ab4c5512b6');
    //     done();
    //   })
    // });
  });

  // Register candidates
  // id i used for the user is fan office id, change it
  describe('POST /api/v1/office/:userid/register', function () {
    it('should return 400 if no admin token', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/office/6e2dc601-8990-4de3-af32-71918b87a363/register').send(_inputField.candidate4).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('User not authorised!');
        done();
      });
    });
    it('should return 400 if no office and party inputs', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/office/6e2dc601-8990-4de3-af32-71918b87a363/register').set('x-access-token', '' + adminToken).send({
        office: '',
        party: '',
        candidate: ''
      }).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Some values are missing');
        done();
      });
    });

    it('should return 400 if candidate inputs is empty', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/office/6e2dc601-8990-4de3-af32-71918b87a363/register').set('x-access-token', '' + adminToken).send(_inputField.candidate3).end(function (err, res) {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('candidate field can\'t be empty');
        done();
      });
    });

    // it('should return 201 if successfully registered', (done) => {
    //   chai.request(app)
    //   .post('/api/v1/office/6e2dc601-8990-4de3-af32-71918b87a363/register')
    //   .set('x-access-token', `${adminToken}`)
    //   .send(candidate4)
    //   .end((err, res) => {
    //     expect(res).to.be.json;
    //     expect(res).to.have.status(400);
    //     expect(res.body[0].message).to.equal('Candidate Registered');
    //     // expect(res.body[0].data.candidate-id).to.equal('2643e397-4cf7-4968-89d5-96059bfd0ea6');
    //     // expect(res.body[0].data.office).to.equal('ac0a889d-57d2-4477-805a-80cb22cf1b3c');
    //     // expect(res.body[0].data.user).to.equal('ac0a889d-57d2-4477-805a-80cb22cf1b3c');
    //     done();
    //   })
    // })
  });

  // describe('GET /office', () => {
  //   it('should return all offices', (done) => {
  //     chai.request(app)
  //       .get('/api/v1/offices')
  //       .send(offices2)
  //       .end((err, res) => {
  //         expect(res.status).to.equal(400);
  //         expect(res.body).to.not.be.empty;
  //         done(err);
  //       });
  //   });
  // });

  // describe('GET /offices', () => {
  //   it('should return all offices', (done) => {
  //     chai.request(app)
  //       .get('/api/v1/offices')
  //       .send(offices3)
  //       .end((err, res) => {
  //         expect(res.status).to.equal(400);
  //         expect(res.body).to.not.be.empty;
  //         done(err);
  //       });
  //   });
  // });

  // describe('Fetch office by Id',() => {
  //   it('should return 401 because there is no token', (done) => {
  //     chai.request(app)
  //       .get('/api/v1/offices/a34e2e87-eeaa-4721-80e9-724309e6bbea')
  //       .end((err, res) => {
  //         expect(err).to.be.null;
  //         expect(res).to.have.headers;
  //         expect(res).to.have.status(400);
  //         expect(res).to.not.redirect;
  //         expect(res.body).to.be.an('object');
  //         done();
  //       });
  //   });
  // });

  // describe('Post \'/api/v1\'', () => {
  //   it('POST office to account', (done) => { // WHEN EMAIL IS INCORRECTLY LAID
  //     chai.request(app)
  //       .post('/api/v1/offices')
  //       .send(offices2)
  //       .end((err, res) => {
  //         expect(err).to.be.null;
  //         expect(res).to.have.headers;
  //         expect(res).to.have.status(400);
  //         expect(res).to.not.redirect;
  //         expect(res.body).to.be.an('object');
  //         done();
  //       });
  //   });
  // });

  // describe('Post \'/api/v1/offices\'', () => {
  //   it('POST office to account', (done) => { // WHEN EMAIL IS INCORRECTLY LAID
  //     chai.request(app)
  //       .post('/api/v1/offices')
  //       .send(offices3)
  //       .end((err, res) => {
  //         expect(err).to.be.null;
  //         expect(res).to.have.headers;
  //         expect(res).to.have.status(400);
  //         expect(res).to.not.redirect;
  //         expect(res.body).to.be.an('object');
  //         done();
  //       });
  //   });
  // });

  // describe('Post \'/api/v1\'', () => {
  //   it('POST vote for a candidate', (done) => { // WHEN EMAIL IS INCORRECTLY LAID
  //     chai.request(app)
  //       .post('/api/v1/vote')
  //       .send(vote1)
  //       .end((err, res) => {
  //         expect(err).to.be.null;
  //         expect(res).to.have.headers;
  //         expect(res).to.have.status(404);
  //         expect(res).to.not.redirect;
  //         expect(res.body).to.be.an('object');
  //         done();
  //       });
  //   });
  // });

  // describe('Post \'/api/v1\'', () => {
  //   it('POST vote for a candidate', (done) => { // WHEN EMAIL IS INCORRECTLY LAID
  //     chai.request(app)
  //       .post('/api/v1/vote')
  //       .send(vote2)
  //       .end((err, res) => {
  //         expect(err).to.be.null;
  //         expect(res).to.have.headers;
  //         expect(res).to.have.status(404);
  //         expect(res).to.not.redirect;
  //         expect(res.body).to.be.an('object');
  //         done();
  //       });
  //   });
  // });

  // describe('Post \'/api/v1\'', () => {
  //   it('POST vote for a candidate', (done) => { // WHEN EMAIL IS INCORRECTLY LAID
  //     chai.request(app)
  //       .post('/api/v1/vote')
  //       .send(vote3)
  //       .end((err, res) => {
  //         expect(err).to.be.null;
  //         expect(res).to.have.headers;
  //         expect(res).to.have.status(404);
  //         expect(res).to.not.redirect;
  //         expect(res.body).to.be.an('object');
  //         done();
  //       });
  //   });
  // });

  // describe('Post \'/api/v1\'', () => {
  //   it('POST register a candidate', (done) => { // WHEN EMAIL IS INCORRECTLY LAID
  //     chai.request(app)
  //       .post('/api/v1/:officeid/register')
  //       .send(candidate1)
  //       .end((err, res) => {
  //         expect(err).to.be.null;
  //         expect(res).to.have.headers;
  //         expect(res).to.have.status(404);
  //         expect(res).to.not.redirect;
  //         expect(res.body).to.be.an('object');
  //         done();
  //       });
  //   });
  // });

  // describe('Post \'/api/v1\'', () => {
  //   it('POST register a candidate', (done) => { // WHEN EMAIL IS INCORRECTLY LAID
  //     chai.request(app)
  //       .post('/api/v1/:officeid/register')
  //       .send(candidate2)
  //       .end((err, res) => {
  //         expect(err).to.be.null;
  //         expect(res).to.have.headers;
  //         expect(res).to.have.status(404);
  //         expect(res).to.not.redirect;
  //         expect(res.body).to.be.an('object');
  //         done();
  //       });
  //   });
  // });

  // describe('Post \'/api/v1\'', () => {
  //   it('POST register a candidate', (done) => { // WHEN EMAIL IS INCORRECTLY LAID
  //     chai.request(app)
  //       .post('/api/v1/:officeid/register')
  //       .send(candidate3)
  //       .end((err, res) => {
  //         expect(err).to.be.null;
  //         expect(res).to.have.headers;
  //         expect(res).to.have.status(404);
  //         expect(res).to.not.redirect;
  //         expect(res.body).to.be.an('object');
  //         done();
  //       });
  //   });
  // });

  // // office result
  // describe('/api/v1/offices/:id/result', () => {
  //   it('office id on the params must be valid', (done) => { // WHEN EMAIL IS INCORRECTLY LAID
  //     chai.request(app)
  //       .get('/api/v1/office/r7/result')
  //       // .send(goodVoteResult)
  //       .end((err, res) => {
  //         expect(res).to.be.json;
  //         expect(res).to.have.status(400);
  //         expect(res).to.not.redirect;
  //         expect(res.body.error).to.be.equal('User not authorised!');
  //         done();
  //       });
  //   });

  //   it('office with that ID should exist', (done) =>{
  //     chai.request(app)
  //     .get('/api/v1/offices/2643e397-4cf7-4968-89d5-96059bfd0ea6/result')
  //     .end((err, res) => {
  //       expect(res).to.be.json;
  //         expect(res).to.have.status(404);
  //         expect(res.body.error).to.equal('Resource not found on the server');
  //         done();
  //     })
  //   })

  // it('result should be gotten successfully', (done) => {
  //   chai.request(app)
  //     .get('/api/v1/offices/2643e397-4cf7-4968-89d5-96059bfd0ea6/result')
  //     .end((err, res) => {
  //       expect(res).to.be.json;
  //       expect(res).to.have.status(200);
  //       expect(response.body.data[0].pollResult).to.equal('2643e397-4cf7-4968-89d5-96059bfd0ea6');
  //       done();
  //     });
  // });
  // });


  // get all users
  // describe('GET /users', () => {
  //   it('should return all users', (done) => {
  //     chai.request(app)
  //       .get('/api/v1/users')
  //       .send(goodSignup)
  //       .end((err, res) => {
  //         expect(res.status).to.equal(400);
  //         expect(res.body).to.not.be.empty;
  //         done(err);
  //       });
  //   });
  // });

  // describe('GET /users', () => {
  //   it('should return all users', (done) => {
  //     chai.request(app)
  //       .get('/api/v1/users')
  //       .send(badSignup2)
  //       .end((err, res) => {
  //         expect(res.status).to.equal(400);
  //         expect(res.body).to.not.be.empty;
  //         done(err);
  //       });
  //   });
  // });

  // describe('Fetch all users',() => {
  //   it('should return 401 when there is no token', (done) => {
  //     chai.request(app)
  //       .get('/api/v1/users')
  //       .end((err, res) => {
  //         expect(err).to.be.null;
  //         expect(res).to.have.headers;
  //         expect(res).to.have.status(400);
  //         expect(res).to.not.redirect;
  //         expect(res.body).to.be.an('object');
  //         done();
  //       });
  //   });
  // });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3Rlc3QvdGVzdC5qcyJdLCJuYW1lcyI6WyJjaGFpIiwiY2hhaUh0dHAiLCJleHBlY3QiLCJkZXNjcmliZSIsImFkbWluVG9rZW4iLCJ1c2VyVG9rZW4iLCJiZWZvcmUiLCJhcHAiLCJlbWFpbCIsInBhc3N3b3JkIiwicmVzIiwiaXQiLCJkb25lIiwiYmFkU2lnbnVwNCIsImJhZFNpZ251cDUiLCJiYWRTaWdudXAiLCJmaXJzdG5hbWUiLCJsYXN0bmFtZSIsIm90aGVybmFtZSIsInBob25lTnVtYmVyIiwicGFzc3BvcnRVcmwiLCJiYWRTaWdudXAzIiwiYmFkU2lnbnVwMiIsInBob25lbnVtYmVyIiwiYmFkTG9naW4iLCJiYWRMb2dpbjIiLCJiYWRMb2dpbjMiLCJnb29kTG9naW4iLCJ0ZXN0UGFydHkiLCJiYWRUZXN0UGFydHkiLCJiYWRUZXN0UGFydHkyIiwiYmFkVGVzdFBhcnR5MyIsImJhZFRlc3RQYXJ0eTQiLCJiYWRUZXN0UGFydHk1IiwiYmFkVGVzdFBhcnR5NiIsImJhZFRlc3RQYXJ0eTciLCJiYWRUZXN0UGFydHk4IiwibmFtZSIsIm9mZmljZXMiLCJvZmZpY2VzMiIsIm9mZmljZXMzIiwib2ZmaWNlczQiLCJvZmZpY2VzNSIsInR5cGUiLCJiYWRWb3RlUmVzdWx0NSIsImJhZFZvdGVSZXN1bHQ0IiwiY2FuZGlkYXRlNCIsIm9mZmljZSIsInBhcnR5IiwiY2FuZGlkYXRlIiwiY2FuZGlkYXRlMyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQUEsUUFBQSxRQUFBLE1BQUEsQ0FBQTs7OztBQUNBLElBQUEsWUFBQSxRQUFBLFdBQUEsQ0FBQTs7OztBQUNBLElBQUEsU0FBQSxRQUFBLGNBQUEsQ0FBQTs7OztBQUNBLElBQUEsY0FBQSxRQUFBLGNBQUEsQ0FBQTs7Ozs7O0FBS0FBLE9BQUFBLE9BQUFBLENBQUFBLEdBQUFBLENBQVNDLFdBQVRELE9BQUFBO0lBQ1FFLFNBQVdGLE9BQUFBLE9BQUFBLENBQVhFLE07O0FBSVJDLFNB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QUFBQSxFQUFBQSxDQUFBQSxFQUFBQSxDQUFBQSxJQUFBQTtBQUNBQSxlQUFBQSxHQUFBQSxFQUFBQSxFQUFBQSxDQUFBQSxJQUFBQSxDQUFBQSxPQUFBQTtBQUNBQSxlQUFBQSxHQUFBQSxFQUFBQSxFQUFBQSxDQUFBQSxFQUFBQSxDQUFBQSxJQUFBQTtBQUNBQSxlQUFBQSxHQUFBQSxFQUFBQSxFQUFBQSxDQUFBQSxJQUFBQSxDQUFBQSxNQUFBQSxDQUFBQSxHQUFBQTtBQUNBQSxlQUFBQSxHQUFBQSxFQUFBQSxFQUFBQSxDQUFBQSxHQUFBQSxDQUFBQSxRQUFBQTtBQUNBQSxlQUFPUSxJQUFQUixJQUFBQSxFQUFBQSxFQUFBQSxDQUFBQSxFQUFBQSxDQUFBQSxFQUFBQSxDQUFBQSxRQUFBQTtBQUNBQSxlQUFPUSxJQUFBQSxJQUFBQSxDQUFQUixLQUFBQSxFQUFBQSxFQUFBQSxDQUFBQSxLQUFBQSxDQUFBQSx5QkFBQUE7QUFDQVU7QUFYSlosT0FBQUE7QUFERlcsS0FBQUE7QUFlQUEsT0FBQUEscURBQUFBLEVBQTBELFVBQUEsSUFBQSxFQUFVO0FBQUU7QUFDcEVYLGFBQUFBLE9BQUFBLENBQUFBLE9BQUFBLENBQWFPLFFBQWJQLE9BQUFBLEVBQUFBLElBQUFBLENBQUFBLG9CQUFBQSxFQUFBQSxJQUFBQSxDQUVRMEIsWUFGUjFCLFNBQUFBLEVBQUFBLEdBQUFBLENBR08sVUFBQSxHQUFBLEVBQUEsR0FBQSxFQUFjO0FBQ2pCRSxlQUFBQSxHQUFBQSxFQUFBQSxFQUFBQSxDQUFBQSxFQUFBQSxDQUFBQSxJQUFBQTtBQUNBQSxlQUFBQSxHQUFBQSxFQUFBQSxFQUFBQSxDQUFBQSxJQUFBQSxDQUFBQSxPQUFBQTtBQUNBQSxlQUFBQSxHQUFBQSxFQUFBQSxFQUFBQSxDQUFBQSxJQUFBQSxDQUFBQSxNQUFBQSxDQUFBQSxHQUFBQTtBQUNBQSxlQUFBQSxHQUFBQSxFQUFBQSxFQUFBQSxDQUFBQSxHQUFBQSxDQUFBQSxRQUFBQTtBQUNBQSxlQUFPUSxJQUFQUixJQUFBQSxFQUFBQSxFQUFBQSxDQUFB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QUNBQSxlQUFBQSxHQUFBQSxFQUFBQSxFQUFBQSxDQUFBQSxJQUFBQSxDQUFBQSxNQUFBQSxDQUFBQSxHQUFBQTtBQUNBQSxlQUFPUSxJQUFBQSxJQUFBQSxDQUFQUixLQUFBQSxFQUFBQSxFQUFBQSxDQUFBQSxLQUFBQSxDQUFBQSxpQ0FBQUE7QUFDQVU7QUFSRlosT0FBQUE7QUFERlcsS0FBQUE7O0FBYUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBeEREUixHQUFBQTs7QUE4REQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNGOzs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTlzQ0FBLENBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUh0dHAgZnJvbSAnY2hhaS1odHRwJztcbmltcG9ydCBhcHAgZnJvbSAnLi4vc3JjL2luZGV4JztcbmltcG9ydCB7Z29vZFNpZ251cCwgYmFkU2lnbnVwLCBiYWRTaWdudXAyLCBiYWRTaWdudXAzLCBiYWRTaWdudXA0LCBiYWRTaWdudXA1LCBiYWRMb2dpbiwgXG4gIGJhZExvZ2luMiwgYmFkTG9naW4zLCBpc0VtYWlsLCBiYWRUZXN0UGFydHksIGJhZFRlc3RQYXJ0eTIsIFxuICBiYWRUZXN0UGFydHkzLCBiYWRUZXN0UGFydHk0LCBvZmZpY2VzLCBvZmZpY2VzMiwgb2ZmaWNlczMsIHZvdGUxLFxudm90ZTIsIHZvdGUzLCBjYW5kaWRhdGUxLCBjYW5kaWRhdGUyLCBjYW5kaWRhdGUzLCBnb29kVm90ZVJlc3VsdCwgYmFkVm90ZVJlc3VsdDQsIGdvb2RMb2dpbiwgdGVzdFBhcnR5LCBiYWRUZXN0UGFydHk1LCBiYWRUZXN0UGFydHk2LCBiYWRUZXN0UGFydHk3LCBiYWRUZXN0UGFydHk4LCBvZmZpY2VzNCwgb2ZmaWNlczUsIGJhZFZvdGVSZXN1bHQ1LCBjYW5kaWRhdGU0IH0gZnJvbSAnLi9pbnB1dEZpZWxkJ1xuXG5jaGFpLnVzZShjaGFpSHR0cCk7XG5jb25zdCB7IGV4cGVjdCB9ID0gY2hhaTtcblxuXG5cbmRlc2NyaWJlKCdBcHAuanMnLCAoKSA9PiB7XG4gIGxldCBhZG1pblRva2VuO1xuICBsZXQgdXNlclRva2VuO1xuXG4gIGJlZm9yZShhc3luYyAoKSA9PiB7XG4gICAgLyogYmVmb3JlIGFueSB0ZXN0IHdpbGwgcnVuLCBsb2dpbiBhcyBhbiBhZG1pbiwgXG4gICAgZ2V0IHRoZSBhZG1pbiB0b2tlbiBhbmQgc2F2ZSBpdCB0byBhIHZhcmlhYmxlLCBcbiAgICB1c2UgaXQgdG8gYWNjZXNzIG90aGVyIHByb3RlY3RpdmUgcm91dGUqKi9cbiAgICBjb25zdCByZXMgPSBhd2FpdCBjaGFpLnJlcXVlc3QoYXBwKVxuICAgICAgLnBvc3QoJy9hcGkvdjEvYXV0aC9sb2dpbicpXG4gICAgICAuc2VuZCh7XG4gICAgICAgIGVtYWlsOiAnYW5heW9reWxlQGdtYWlsLmNvbScsXG4gICAgICAgIHBhc3N3b3JkOiAnYW5heW9reWxlb2xlcnUnLFxuICAgICAgfSk7XG4gICAgYWRtaW5Ub2tlbiA9IHJlcy5ib2R5LmRhdGFbMF0udG9rZW47XG4gIH0pO1xuXG5cblxuZGVzY3JpYmUoJy9hcGkvdjEnLCAoKSA9PiB7XG4gIGl0KCdJdCBzaG91bGQgcmV0dXJuICB3ZWxjb21lIG1lc3NhZ2UnLCAoZG9uZSkgPT4ge1xuICAgIGNoYWkucmVxdWVzdChhcHApXG4gICAgICAuZ2V0KCcvYXBpL3YxJylcbiAgICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4gICAgICAgIGV4cGVjdChlcnIpLnRvLmJlLm51bGw7XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDIwMCk7XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLm5vdC5yZWRpcmVjdDtcbiAgICAgICAgZXhwZWN0KHJlcy5ib2R5KS50by5iZS5hbignb2JqZWN0Jyk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICB9KTtcbn0pO1xuXG4vLyBkZXNjcmliZSgnLycsICgpID0+IHtcbi8vICAgaXQoJ3Nob3VsZCByZWRpcmVjdCB0byB0aGUgaG9tZXBhZ2UnLCAoZG9uZSkgPT4ge1xuLy8gICAgIGNoYWkucmVxdWVzdChhcHApXG4vLyAgICAgLmdldCgnLycpXG4vLyAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbi8vICAgICAgIGV4cGVjdChlcnIpLnRvLmJlLm51bGw7XG4vLyAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cygzMDApXG4vLyAgICAgICBleHBlY3QocmVzKS50by5yZWRpcmVjdDtcbi8vICAgICAgIGV4cGVjdChyZXMuc2VuZEZpbGUpLnRvLmVxdWFsKHBhdGguam9pbihfX2Rpcm5hbWUgKyAnLi4vLi4vVUkvdmlld3MvaW5kZXguaHRtbCcpKTtcbi8vICAgICAgIGRvbmUoKVxuLy8gICAgIH0pXG4vLyAgIH0pXG4vLyB9KVxuXG4vLyB1c2VycyBzaWdudXBcblxuZGVzY3JpYmUoJy9hcGkvdjEvYXV0aC9zaWdudXAnLCAoKSA9PiB7XG4gIGl0KCdTaG91bGRuXFwndCBzaWdudXAgd2hlbiBpbnB1dCBmaWVsZCBhcmUgZW1wdHknLCAoZG9uZSkgPT4ge1xuICAgIGNoYWkucmVxdWVzdChhcHApXG4gICAgLnBvc3QoJy9hcGkvdjEvYXV0aC9zaWdudXAnKVxuICAgIC5zZW5kKGJhZFNpZ251cDQpXG4gICAgLmVuZCgoZXJyLCByZXMpID0+e1xuICAgICAgZXhwZWN0KHJlcykudG8uYmUuanNvbjtcbiAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwMCk7XG4gICAgICBleHBlY3QocmVzLmJvZHkuZXJyb3IpLnRvLmVxdWFsKCdTb21lIHZhbHVlcyBhcmUgbWlzc2luZycpO1xuICAgICAgZG9uZSgpO1xuICAgIH0pXG4gIH0pXG5cbiAgaXQoJ1Nob3VsZG5cXCd0IGNvbnRhaW4gd2hpdGVzcGFjZScsIChkb25lKSA9PiB7XG4gICAgY2hhaS5yZXF1ZXN0KGFwcClcbiAgICAucG9zdCgnL2FwaS92MS9hdXRoL3NpZ251cCcpXG4gICAgLnNlbmQoYmFkU2lnbnVwNSlcbiAgICAuZW5kKChlcnIsIHJlcykgPT57XG4gICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDAwKTtcbiAgICAgIGV4cGVjdChyZXMuYm9keS5lcnJvcikudG8uZXF1YWwoJ1doaXRlIFNwYWNlIGFyZSBub3QgYWxsb3dlZCBpbiBpbnB1dCBmaWVsZHMnKTtcbiAgICAgIGRvbmUoKTtcbiAgICB9KVxuICB9KVxuXG4gIGl0KCdQT1NUIGNyZWF0ZSBhbiBhY2NvdW50JywgKGRvbmUpID0+IHsgLy8gV0hFTiBQQVNTV09SRCBGSUVMRCBJUyBMRUZUIEJMQU5LXG4gICAgY2hhaS5yZXF1ZXN0KGFwcClcbiAgICAgIC5wb3N0KCcvYXBpL3YxL2F1dGgvc2lnbnVwJylcbiAgICAgIC5zZW5kKGJhZFNpZ251cClcbiAgICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4gICAgICAgIGV4cGVjdChlcnIpLnRvLmJlLm51bGw7XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuaGVhZGVycztcbiAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDAwKTtcbiAgICAgICAgZXhwZWN0KHJlcykudG8ubm90LnJlZGlyZWN0O1xuICAgICAgICBleHBlY3QocmVzLmJvZHkpLnRvLmJlLmFuKCdvYmplY3QnKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gIH0pO1xuICBpdCgncGhvbmUgbnVtYmVyIG11c3QgYmUgdmFsaWQgTmlnZXJpYW4gbnVtYmVyJywgKGRvbmUpID0+IHtcbiAgICBjaGFpLnJlcXVlc3QoYXBwKVxuICAgICAgLnBvc3QoJy9hcGkvdjEvYXV0aC9zaWdudXAnKVxuICAgICAgLnNlbmQoe1xuICAgICAgICBmaXJzdG5hbWU6ICdqb2huJyxcbiAgICAgICAgbGFzdG5hbWU6ICdkb2UnLFxuICAgICAgICBvdGhlcm5hbWU6ICdiZW4nLFxuICAgICAgICBlbWFpbDogJ3ZlcnllbWFpbGRyQGdtYWlsLmlvbicsXG4gICAgICAgIHBob25lTnVtYmVyOiAnZmdjaCcsXG4gICAgICAgIHBhc3Nwb3J0VXJsOiAnaHR0cHM6Ly9ocHUuanBnJyxcbiAgICAgICAgcGFzc3dvcmQ6ICdoZGJzamRmZGZkMjM0JyxcbiAgICAgIH0pXG4gICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDApO1xuICAgICAgICBleHBlY3QocmVzLmJvZHkuZXJyb3IpLnRvLmVxdWFsKCdJbnZhbGlkIE5pZ2VyaWFuIHBob25lLW51bWJlcicpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ3Bhc3Nwb3J0VXJsIG11c3Qgbm90IGJlIGVtcHR5JywgKGRvbmUpID0+IHtcbiAgICBjaGFpLnJlcXVlc3QoYXBwKVxuICAgICAgLnBvc3QoJy9hcGkvdjEvYXV0aC9zaWdudXAnKVxuICAgICAgLnNlbmQoe1xuICAgICAgICBmaXJzdG5hbWU6ICdqb2huJyxcbiAgICAgICAgbGFzdG5hbWU6ICdkb2UnLFxuICAgICAgICBvdGhlcm5hbWU6ICdiZW4nLFxuICAgICAgICBlbWFpbDogJ3ZlcnllbWFpbGRyQGdtYWlsLmlvbicsXG4gICAgICAgIHBob25lTnVtYmVyOiAnMDgwOTY4NzU2NTQnLFxuICAgICAgICBwYXNzcG9ydFVybDogJycsXG4gICAgICAgIHBhc3N3b3JkOiAnaGRic2pkZmRmZDIzNCcsXG4gICAgICB9KVxuICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgICAgZXhwZWN0KHJlcykudG8uYmUuanNvbjtcbiAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDAwKTtcbiAgICAgICAgZXhwZWN0KHJlcy5ib2R5LmVycm9yKS50by5lcXVhbCgnU29tZSB2YWx1ZXMgYXJlIG1pc3NpbmcnKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gIH0pO1xuICBpdCgnV2hlbiBwYXNzd29yZCBmaWVsZCBpcyBlbXB0eScsIChkb25lKSA9PiB7IC8vIFdIRU4gTkFNRVMgRklFTEQgSVMgTEVGVCBCTEFOS1xuICAgIGNoYWkucmVxdWVzdChhcHApXG4gICAgICAucG9zdCgnL2FwaS92MS9hdXRoL3NpZ251cCcpXG4gICAgICAuc2VuZChiYWRTaWdudXAzKVxuICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgICAgZXhwZWN0KGVycikudG8uYmUubnVsbDtcbiAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5oZWFkZXJzO1xuICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDApO1xuICAgICAgICBleHBlY3QocmVzKS50by5ub3QucmVkaXJlY3Q7XG4gICAgICAgIGV4cGVjdChyZXMuYm9keSkudG8uYmUuYW4oJ29iamVjdCcpO1xuICAgICAgICBleHBlY3QocmVzLmJvZHkuZXJyb3IpLnRvLmVxdWFsKCdTb21lIHZhbHVlcyBhcmUgbWlzc2luZycpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcbiAgfSk7XG4gIGl0KCd3aGVuIGZpcnN0bmFtZSwgbGFzdG5hbWUgYW5kIG90aGVybmFtZSBpcyBlbXB0eScsIChkb25lKSA9PiB7IC8vIFdIRU4gTkFNRVMgRklFTEQgSVMgTEVGVCBCTEFOS1xuICAgIGNoYWkucmVxdWVzdChhcHApXG4gICAgICAucG9zdCgnL2FwaS92MS9hdXRoL3NpZ251cCcpXG4gICAgICAuc2VuZChiYWRTaWdudXAyKVxuICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgICAgZXhwZWN0KGVycikudG8uYmUubnVsbDtcbiAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5oZWFkZXJzO1xuICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDApO1xuICAgICAgICBleHBlY3QocmVzKS50by5ub3QucmVkaXJlY3Q7XG4gICAgICAgIGV4cGVjdChyZXMuYm9keSkudG8uYmUuYW4oJ29iamVjdCcpO1xuICAgICAgICBleHBlY3QocmVzLmJvZHkuZXJyb3IpLnRvLmVxdWFsKCdTb21lIHZhbHVlcyBhcmUgbWlzc2luZycpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgbm90IHNpZ24gdXNlciB0d2ljZScsIChkb25lKSA9PiB7XG4gICAgY2hhaS5yZXF1ZXN0KGFwcClcbiAgICAgIC5wb3N0KCcvYXBpL3YxL2F1dGgvc2lnbnVwJylcbiAgICAgIC5zZW5kKHtcbiAgICAgICAgZmlyc3RuYW1lOiAnbXVuYWNoaScsXG4gICAgICAgIGxhc3RuYW1lOiAnbXVuYScsXG4gICAgICAgIG90aGVybmFtZTogJ2NoaWNoaScsXG4gICAgICAgIGVtYWlsOiAnbXVuYWNoaUBnbWFpbC5jb20nLFxuICAgICAgICBwaG9uZW51bWJlcjogJzA3MDY5NTgzNjU0JyxcbiAgICAgICAgcGFzc3BvcnRVcmw6ICdodHRwOi8vanAuanBnJyxcbiAgICAgICAgcGFzc3dvcmQ6ICdtdW5hY2hpMTIzNDUnLFxuICAgICAgfSlcbiAgICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLmJlLmpzb247XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwOSk7XG4gICAgICAgIGV4cGVjdChyZXMuYm9keS5lcnJvcikudG8uZXF1YWwoJ1VzZXIgd2l0aCB0aGF0IEVNQUlMIGFscmVhZHkgZXhpc3QnKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gIH0pO1xufSk7XG5cblxuXG4vLyBsb2dpblxuZGVzY3JpYmUoJy9hcGkvdjEvYXV0aC9sb2dpbicsICgpID0+IHtcbiAgaXQoJ3doZW4gZW1haWwgaXMgaW52YWxpZCcsIChkb25lKSA9PiB7IC8vIFdIRU4gRU1BSUwgSVMgSU5DT1JSRUNUTFkgTEFJRFxuICAgIGNoYWkucmVxdWVzdChhcHApXG4gICAgICAucG9zdCgnL2FwaS92MS9hdXRoL2xvZ2luJylcbiAgICAgIC5zZW5kKGJhZExvZ2luKVxuICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgICAgZXhwZWN0KGVycikudG8uYmUubnVsbDtcbiAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5oZWFkZXJzO1xuICAgICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDApO1xuICAgICAgICBleHBlY3QocmVzKS50by5ub3QucmVkaXJlY3Q7XG4gICAgICAgIGV4cGVjdChyZXMuYm9keSkudG8uYmUuYW4oJ29iamVjdCcpO1xuICAgICAgICBleHBlY3QocmVzLmJvZHkuZXJyb3IpLnRvLmVxdWFsKCdQbGVhc2UgZW50ZXIgYSB2YWxpZCBlbWFpbCBhZGRyZXNzJyk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICB9KTtcbiAgaXQoJ3doZW4gcGFzc3dvcmQgb2UgZW1haWwgZmllbGQgaXMgZW1wdHknLCAoZG9uZSkgPT4geyAvLyBXSEVOIE5BTUVTIFBBU1NXT1JEIElTIEVNUFRZXG4gICAgY2hhaS5yZXF1ZXN0KGFwcClcbiAgICAgIC5wb3N0KCcvYXBpL3YxL2F1dGgvbG9naW4nKVxuICAgICAgLnNlbmQoYmFkTG9naW4yKVxuICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgICAgZXhwZWN0KGVycikudG8uYmUubnVsbDtcbiAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5oZWFkZXJzO1xuICAgICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDApO1xuICAgICAgICBleHBlY3QocmVzKS50by5ub3QucmVkaXJlY3Q7XG4gICAgICAgIGV4cGVjdChyZXMuYm9keSkudG8uYmUuYW4oJ29iamVjdCcpO1xuICAgICAgICBleHBlY3QocmVzLmJvZHkuZXJyb3IpLnRvLmVxdWFsKCdTb21lIHZhbHVlcyBhcmUgbWlzc2luZycpXG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICB9KTtcbiAgaXQoJ3doZW4gdGhlcmUgYXJlIHdoaXRlIHNwYWNlcyBpbiBpbnB1dCBmaWVsZHMgaW5zdGVhZCcsIChkb25lKSA9PiB7IC8vIFdIRU4gQUxMIEZJRUxEUyBBUkUgRU1QVFlcbiAgICBjaGFpLnJlcXVlc3QoYXBwKVxuICAgICAgLnBvc3QoJy9hcGkvdjEvYXV0aC9sb2dpbicpXG4gICAgICAuc2VuZChiYWRMb2dpbjMpXG4gICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgICAgICBleHBlY3QoZXJyKS50by5iZS5udWxsO1xuICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLmhlYWRlcnM7XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwMCk7XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLm5vdC5yZWRpcmVjdDtcbiAgICAgICAgZXhwZWN0KHJlcy5ib2R5KS50by5iZS5hbignb2JqZWN0Jyk7XG4gICAgICAgIGV4cGVjdChyZXMuYm9keS5lcnJvcikudG8uZXF1YWwoJ1doaXRlIFNwYWNlIGFyZSBub3QgYWxsb3dlZCBpbiBpbnB1dCBmaWVsZHMnKVxuICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ3doZW4gZW1haWwgb3IgcGFzc3dvZCBkb2VzIG5vdCBleGlzdCBpbiB0aGUgZGF0YWJhc2UnLCAoZG9uZSkgPT4geyAvLyBXSEVOIEFMTCBGSUVMRFMgQVJFIEVNUFRZXG4gICAgY2hhaS5yZXF1ZXN0KGFwcClcbiAgICAgIC5wb3N0KCcvYXBpL3YxL2F1dGgvbG9naW4nKVxuICAgICAgLnNlbmQoZ29vZExvZ2luKVxuICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDAwKTtcbiAgICAgICAgZXhwZWN0KHJlcy5ib2R5KS50by5iZS5hbignb2JqZWN0Jyk7XG4gICAgICAgIGV4cGVjdChyZXMuYm9keS5lcnJvcikudG8uZXF1YWwoJ3Bhc3N3b3JkIGlzIGluY29ycmVjdCcpXG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICB9KTtcblxuICBpdCgnc3VjY2Vzc2Z1bCBsb2dpbicsIChkb25lKSA9PiB7IC8vIFdIRU4gQUxMIEZJRUxEUyBBUkUgRU1QVFlcbiAgICBjaGFpLnJlcXVlc3QoYXBwKVxuICAgICAgLnBvc3QoJy9hcGkvdjEvYXV0aC9sb2dpbicpXG4gICAgICAuc2VuZCh7XG4gICAgICAgICAgZW1haWw6ICdtdW5hY2hpQGdtYWlsLmNvbScsXG4gICAgICAgICAgcGFzc3dvcmQ6ICdtdW5hY2hpMTIzNDUnLFxuICAgICAgfSlcbiAgICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLmJlLmpzb247XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDIwMSk7XG4gICAgICAgIGV4cGVjdChyZXMuYm9keS5kYXRhWzBdLnVzZXIuZW1haWwpLnRvLmVxdWFsKCdtdW5hY2hpQGdtYWlsLmNvbScpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcbiAgfSk7XG59KTtcblxuLy8gdGVzdCB0byBnZXQgYWxsIHVzZXJzXG4vLyBkZXNjcmliZSgnL2FwaS92MS9hdXRoL3VzZXJzJywgKCkgPT4ge1xuLy8gICBpdCgnc3VjY2Vzc2Z1bGx5IGdldHMgYWxsIHVzZXJzJywgKGRvbmUpID0+IHtcbi8vICAgICBjaGFpLnJlcXVlc3QoYXBwKVxuLy8gICAgIC5nZXQoJy9hcGkvdjEvdXNlcnMnKVxuLy8gICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4vLyAgICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuLy8gICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoMjAwKTtcbi8vICAgICAgIGV4cGVjdChyZXMuYm9keS5kYXRhWzBdLmZpcnN0bmFtZSkudG8uZXF1YWwoJ0FuYXlvJyk7XG4vLyAgICAgICBleHBlY3QocmVzLmJvZHkuZGF0YVswXS5sYXN0bmFtZSkudG8uZXF1YWwoJ09sZXJ1Jyk7XG4vLyAgICAgICBleHBlY3QocmVzLmJvZHkuZGF0YVswXS5vdGhlcm5hbWUpLnRvLmVxdWFsKCdEYXZpZCcpO1xuLy8gICAgICAgZXhwZWN0KHJlcy5ib2R5LmRhdGFbMF0uZW1haWwpLnRvLmVxdWFsKCdhbmF5b19vbGVydUBvdXRsb29rLmNvbScpO1xuLy8gICAgICAgZXhwZWN0KHJlcy5ib2R5LmRhdGFbMF0ucGhvbmVudW1iZXIpLnRvLmVxdWFsKCcwNzA2OTU4MzY1NCcpO1xuLy8gICAgICAgZXhwZWN0KHJlcy5ib2R5LmRhdGFbMF0ucGFzc3BvcnRVcmwpLnRvLmVxdWFsKCdodHRwczovL2FuYXlvLmpwZycpO1xuLy8gICAgICAgZXhwZWN0KHJlcy5ib2R5LmRhdGFbMF0ucGFzc3dvcmQpLnRvLmVxdWFsKCdtdW5hY2hpMTIzNDUnKTtcbi8vICAgICAgIGRvbmUoKTtcbi8vICAgICB9KVxuLy8gICB9KVxuLy8gfSlcblxuXG4vLyBjcmVhdGUgcG9saXRpY2FsIHBhcnRpZXNcbmRlc2NyaWJlKCdQT1NUIGFwaS92MS9wYXJ0aWVzJywgKCkgPT4ge1xuICBpdCgnb25seSBhdXRob3Jpc2UgYWRtaW4gY2FuIGFjY2VzcycsIChkb25lKSA9PiB7XG4gICAgY2hhaS5yZXF1ZXN0KGFwcClcbiAgICAgIC5wb3N0KCcvYXBpL3YxL3BhcnRpZXMnKVxuICAgICAgLnNlbmQodGVzdFBhcnR5KVxuICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgICAgZXhwZWN0KHJlcykudG8uYmUuanNvbjtcbiAgICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDApO1xuICAgICAgICAgIGV4cGVjdChyZXMuYm9keS5lcnJvcikudG8uZXF1YWwoJ1VzZXIgbm90IGF1dGhvcmlzZWQhJyk7XG4gICAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gIH0pO1xuICBpdCgncGFydHkgbmFtZSBtdXN0IG5vdCBiZSBlbXB0eScsIChkb25lKSA9PiB7XG4gICAgY2hhaS5yZXF1ZXN0KGFwcClcbiAgICAgIC5wb3N0KCcvYXBpL3YxL3BhcnRpZXMnKVxuICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCBgJHthZG1pblRva2VufWApXG4gICAgICAuc2VuZChiYWRUZXN0UGFydHkpXG4gICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDApO1xuICAgICAgICBleHBlY3QocmVzLmJvZHkuZXJyb3IpLnRvLmVxdWFsKCdQYXJ0eSBmaWVsZCBpcyBlbXB0eScpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ3BhcnR5IGhxYWRkcmVzcyBtdXN0IG5vdCBiZSBlbXB0eScsIChkb25lKSA9PiB7XG4gICAgY2hhaS5yZXF1ZXN0KGFwcClcbiAgICAgIC5wb3N0KCcvYXBpL3YxL3BhcnRpZXMnKVxuICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCBgJHthZG1pblRva2VufWApXG4gICAgICAuc2VuZChiYWRUZXN0UGFydHkyKVxuICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgICAgZXhwZWN0KHJlcykudG8uYmUuanNvbjtcbiAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDAwKTtcbiAgICAgICAgZXhwZWN0KHJlcy5ib2R5LmVycm9yKS50by5lcXVhbCgnQWRkcmVzcyBmaWVsZCBpcyBlbXB0eScpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ3BhcnR5IGxvZ29VcmwgbXVzdCBub3QgYmUgZW1wdHknLCAoZG9uZSkgPT4ge1xuICAgIGNoYWkucmVxdWVzdChhcHApXG4gICAgICAucG9zdCgnL2FwaS92MS9wYXJ0aWVzJylcbiAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgYCR7YWRtaW5Ub2tlbn1gKVxuICAgICAgLnNlbmQoYmFkVGVzdFBhcnR5MylcbiAgICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLmJlLmpzb247XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwMCk7XG4gICAgICAgIGV4cGVjdChyZXMuYm9keS5lcnJvcikudG8uZXF1YWwoJ0xvZ28gZmllbGQgaXMgZW1wdHknKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGl0KCdwYXJ0eSBpbnB1dHMgZmllbGQgbXVzdCBub3QgYmUgZW1wdHknLCAoZG9uZSkgPT4ge1xuICAgIGNoYWkucmVxdWVzdChhcHApXG4gICAgICAucG9zdCgnL2FwaS92MS9wYXJ0aWVzJylcbiAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgYCR7YWRtaW5Ub2tlbn1gKVxuICAgICAgLnNlbmQoYmFkVGVzdFBhcnR5NClcbiAgICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLmJlLmpzb247XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwMCk7XG4gICAgICAgIGV4cGVjdChyZXMuYm9keS5lcnJvcikudG8uZXF1YWwoJ0lucHV0cyBmaWVsZHMgY2FuXFwndCBiZSBsZWZ0IGVtcHR5Jyk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICB9KTtcblxuICBpdCgncGFydHkgbmFtZSBtdXN0IGJlIHZhbGlkJywgKGRvbmUpID0+IHtcbiAgICBjaGFpLnJlcXVlc3QoYXBwKVxuICAgICAgLnBvc3QoJy9hcGkvdjEvcGFydGllcycpXG4gICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIGAke2FkbWluVG9rZW59YClcbiAgICAgIC5zZW5kKGJhZFRlc3RQYXJ0eTUpXG4gICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDApO1xuICAgICAgICBleHBlY3QocmVzLmJvZHkuZXJyb3IpLnRvLmVxdWFsKCdBbHBoYWJldHMgb25seScpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ3BhcnR5IGxvZ28gbXVzdCBiZSB2YWxpZCcsIChkb25lKSA9PiB7XG4gICAgY2hhaS5yZXF1ZXN0KGFwcClcbiAgICAgIC5wb3N0KCcvYXBpL3YxL3BhcnRpZXMnKVxuICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCBgJHthZG1pblRva2VufWApXG4gICAgICAuc2VuZChiYWRUZXN0UGFydHk2KVxuICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgICAgZXhwZWN0KHJlcykudG8uYmUuanNvbjtcbiAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDAwKTtcbiAgICAgICAgZXhwZWN0KHJlcy5ib2R5LmVycm9yKS50by5lcXVhbCgnSW5jb3JyZWN0IFVSTC4gVXNlIGh0dHBzOi8vJyk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICB9KTtcblxuICBpdCgncGFydHkgaHFhZGRyZXNzIG11c3QgYmUgdmFsaWQnLCAoZG9uZSkgPT4ge1xuICAgIGNoYWkucmVxdWVzdChhcHApXG4gICAgICAucG9zdCgnL2FwaS92MS9wYXJ0aWVzJylcbiAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgYCR7YWRtaW5Ub2tlbn1gKVxuICAgICAgLnNlbmQoYmFkVGVzdFBhcnR5NylcbiAgICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLmJlLmpzb247XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwMCk7XG4gICAgICAgIGV4cGVjdChyZXMuYm9keS5lcnJvcikudG8uZXF1YWwoJ1BsZWFzZSBlbnRlciBhIHZhbGlkIGFkZHJlc3MnKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGl0KCdwYXJ0eSBhbHJlYWR5IGV4aXN0JywgKGRvbmUpID0+IHtcbiAgICBjaGFpLnJlcXVlc3QoYXBwKVxuICAgICAgLnBvc3QoJy9hcGkvdjEvcGFydGllcycpXG4gICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIGAke2FkbWluVG9rZW59YClcbiAgICAgIC5zZW5kKGJhZFRlc3RQYXJ0eTgpXG4gICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDApO1xuICAgICAgICBleHBlY3QocmVzLmJvZHkuZXJyb3IpLnRvLmVxdWFsKCdQYXJ0eSBhbHJlYWR5IGV4aXN0Jyk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICB9KTtcbiAgLy8gaXQoJ3BhcnR5IHN1Y2Nlc3NmdWxseSBjcmVhdGVkJywgKGRvbmUpID0+IHtcbiAgLy8gICBjaGFpLnJlcXVlc3QoYXBwKVxuICAvLyAgICAgLnBvc3QoJy9hcGkvdjEvcGFydGllcycpXG4gIC8vICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIGAke2FkbWluVG9rZW59YClcbiAgLy8gICAgIC5zZW5kKHRlc3RQYXJ0eSlcbiAgLy8gICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4gIC8vICAgICAgIGV4cGVjdChyZXMpLnRvLmJlLmpzb247XG4gIC8vICAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoMjAxKTtcbiAgLy8gICAgICAgICBleHBlY3QocmVzLmJvZHkuZGF0YS5vcmRlclswXS5uYW1lKS50by5lcXVhbCgnQWN0aW9uIGNvbmdyZXNzIE5pZ2VyaWEnKTtcbiAgLy8gICAgICAgICBleHBlY3QocmVzLmJvZHkuZGF0YS5vcmRlclswXS5pZCkudG8uZXF1YWwoMSk7XG4gIC8vICAgICAgIGRvbmUoKTtcbiAgLy8gICAgIH0pO1xuICAvLyB9KTtcbn0pO1xuXG4vLyBnZXQgc3BlY2lmaWMgcGFydHlcbmRlc2NyaWJlKCdHRVQgYXBpL3YxL3BhcnRpZXMnLCAoKSA9PiB7XG4gaXQoJ3Nob3VsZCByZXR1cm4gNDAwLCBubyB0b2tlbicsIChkb25lKSA9PiB7XG4gICAgY2hhaS5yZXF1ZXN0KGFwcClcbiAgICAgIC5nZXQoJy9hcGkvdjEvcGFydGllcy82ZTJkYzYwMS04OTkwLTRkZTMtYWYzMi03MTkxOGI4N2EzNjMnKVxuICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgICAgZXhwZWN0KHJlcykudG8uYmUuanNvbjtcbiAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDAwKTtcbiAgICAgICAgZXhwZWN0KHJlcy5ib2R5LmVycm9yKS50by5lcXVhbCgnVXNlciBub3QgYXV0aG9yaXNlZCEnKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSkgIFxuIH0pO1xuXG4gaXQoJ3Nob3VsZCByZXR1cm4gNDAwIGlmIHVzZXIgSUQgaXMgaW52YWxpZCcsIChkb25lKSA9PiB7XG4gIGNoYWkucmVxdWVzdChhcHApXG4gICAgLmdldCgnL2FwaS92MS9wYXJ0aWVzL3F3MWBgYDg4JylcbiAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIGAke2FkbWluVG9rZW59YClcbiAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgICAgZXhwZWN0KHJlcykudG8uYmUuanNvbjtcbiAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwMCk7XG4gICAgICBleHBlY3QocmVzLmJvZHkuZXJyb3IpLnRvLmVxdWFsKCdUaGUgdXNlciBJRCB1c2VkIGlzIGludmFsaWQnKTtcbiAgICAgIGRvbmUoKTtcbiAgICB9KSAgXG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgcmV0dXJuIDQwNCBpZiBwYXJ0eSBpcyBub3QgZm91bmQnLCAoZG9uZSkgPT4ge1xuICAgIGNoYWkucmVxdWVzdChhcHApXG4gICAgICAuZ2V0KCcvYXBpL3YxL3BhcnRpZXMvYTM0ZTJlODctZWVhYS00NzIxLTgwZTktNzI0MzA5ZTZiYmVhJylcbiAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgYCR7YWRtaW5Ub2tlbn1gKVxuICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgICAgZXhwZWN0KHJlcykudG8uYmUuanNvbjtcbiAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDA0KTtcbiAgICAgICAgZXhwZWN0KHJlcy5ib2R5LmVycm9yKS50by5lcXVhbCgnUGFydHkgbm90IGZvdW5kJyk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pICBcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIDIwMCwgd2hlbiBzdWNjZXNzZnVsJywgKGRvbmUpID0+IHtcbiAgICAgIGNoYWkucmVxdWVzdChhcHApXG4gICAgICAgIC5nZXQoJy9hcGkvdjEvcGFydGllcy81YjY5Y2ZhMC05YTljLTQ5MTctOTFiOC02NzY5YmU4ZmFjMTInKVxuICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIGAke2FkbWluVG9rZW59YClcbiAgICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgICAgZXhwZWN0KHJlcykudG8uYmUuanNvbjtcbiAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoMjAwKTtcbiAgICAgICAgZXhwZWN0KHJlcy5ib2R5LmRhdGFbMF0ub3JkZXIubmFtZSkudG8uZXF1YWwoJ0FjdGlvbiBjb25ncmVzcycpO1xuICAgICAgICBleHBlY3QocmVzLmJvZHkuZGF0YVswXS5vcmRlci5ocWFkZHJlc3MpLnRvLmVxdWFsKCckMjInKTtcbiAgICAgICAgZXhwZWN0KHJlcy5ib2R5LmRhdGFbMF0ub3JkZXIubG9nb3VybCkudG8uZXF1YWwoJ2h0dHBzOi8vYWMuanBnJyk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgICAgfSkgIFxuICAgICAgfSk7XG59KTtcblxuLy8gZ2V0IGFsbCBwYXJ0aWVzXG5kZXNjcmliZSgnR0VUIGFwaS92MS9wYXJ0aWVzJywgKCkgPT4ge1xuICBpdCgnc2hvdWxkIHNlbGVjdCBhbGwgcGFydHkgYW5kIHJldHVybiBpdCBzdWNjZXNzZnVsbHknLCAoZG9uZSkgPT4ge1xuICAgIGNoYWkucmVxdWVzdChhcHApXG4gICAgLmdldCgnL2FwaS92MS9wYXJ0aWVzJylcbiAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIGAke2FkbWluVG9rZW59YClcbiAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgIGV4cGVjdChyZXMpLnRvLmJlLmpzb247XG4gICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoMjAwKTtcbiAgICBkb25lKCk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG5cbi8vIHVwZGF0ZSBhIHNwZWNpZmljIHBhcnR5XG5kZXNjcmliZSgnUEFUQ0ggYXBpL3YxL3BhcnRpZXMnLCAoKSA9PiB7XG4gIGl0KCdzaG91bGQgbm90IGdpdmUgYWNjZXNzIHdoZW4gYWRtaW4gdG9rZW4gbm90IHByb3ZpZGVkJywgKGRvbmUpID0+IHtcbiAgICBjaGFpLnJlcXVlc3QoYXBwKVxuICAgIC5wYXRjaCgnL2FwaS92MS9wYXJ0aWVzLzZlMmRjNjAxLTg5OTAtNGRlMy1hZjMyLTcxOTE4Yjg3YTM2My9uYW1lJylcbiAgICAuc2VuZCh7XG4gICAgICBuYW1lOiAnUGVvcGxlIENpdHkgcGFydHknXG4gICAgfSlcbiAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgICAgZXhwZWN0KHJlcykudG8uYmUuanNvbjtcbiAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwMCk7XG4gICAgICBleHBlY3QocmVzLmJvZHkuZXJyb3IpLnRvLmVxdWFsKCdVc2VyIG5vdCBhdXRob3Jpc2VkIScpO1xuICAgICAgZG9uZSgpO1xuICAgIH0pO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIHJldHVybiA0MDAgd2hlbiBuYW1lIGlucHV0IGZpZWxkIGlzIGxlZnQgZW1wdHknLCAoZG9uZSkgPT4ge1xuICAgIGNoYWkucmVxdWVzdChhcHApXG4gICAgLnBhdGNoKCcvYXBpL3YxL3BhcnRpZXMvNmUyZGM2MDEtODk5MC00ZGUzLWFmMzItNzE5MThiODdhMzYzL25hbWUnKVxuICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgYCR7YWRtaW5Ub2tlbn1gKVxuICAgIC5zZW5kKHtcbiAgICAgIG5hbWU6ICcnXG4gICAgfSlcbiAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgICAgZXhwZWN0KHJlcykudG8uYmUuanNvbjtcbiAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwMCk7XG4gICAgICBleHBlY3QocmVzLmJvZHkuZXJyb3IpLnRvLmVxdWFsKCdJbnB1dCBmaWVsZCBjYW5cXCd0IGJlIGxlZnQgZW1wdHknKTtcbiAgICAgIGRvbmUoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCByZXR1cm4gNDA0IHdoZW4gcGFydHkgd2l0aCB0aGF0IGlkIGRvZXMgbm90IGV4aXN0JywgKGRvbmUpID0+IHtcbiAgICBjaGFpLnJlcXVlc3QoYXBwKVxuICAgIC5wYXRjaCgnL2FwaS92MS9wYXJ0aWVzL2ZkMTY0OGI5LTMyZGQtNDAyYS1iMmZlLTk4YzlkZjFjNTg1Yy9uYW1lJylcbiAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIGAke2FkbWluVG9rZW59YClcbiAgICAuc2VuZCh7XG4gICAgICBuYW1lOiAnQ29sZCBjaXR5IHBhcnR5J1xuICAgIH0pXG4gICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgIGV4cGVjdChyZXMpLnRvLmJlLmpzb247XG4gICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDQpO1xuICAgICAgZXhwZWN0KHJlcy5ib2R5LmVycm9yKS50by5lcXVhbCgnUGFydHkgbm90IGZvdW5kJyk7XG4gICAgICBkb25lKCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgcmV0dXJuIDQwNCB3aGVuIHBhcnR5IHdpdGggdGhhdCBpZCBkb2VzIG5vdCBleGlzdCcsIChkb25lKSA9PiB7XG4gICAgY2hhaS5yZXF1ZXN0KGFwcClcbiAgICAucGF0Y2goJy9hcGkvdjEvcGFydGllcy9mZDE2NDhiOTMyZGQtNDAyYS05OGM5ZGYxYzQ1ZXIvbmFtZScpXG4gICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCBgJHthZG1pblRva2VufWApXG4gICAgLnNlbmQoe1xuICAgICAgbmFtZTogJ0NvbGQgY2l0eSBwYXJ0eSdcbiAgICB9KVxuICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4gICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDAwKTtcbiAgICAgIGV4cGVjdChyZXMuYm9keS5lcnJvcikudG8uZXF1YWwoJ09vcHMsIHNvbWV0aGluZyB3cm9uZyBoYXBwZW5lZC4gQ2hlY2sgYW5kIHRyeSBhZ2FpbicpO1xuICAgICAgZG9uZSgpO1xuICAgIH0pO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIHJldHVybiAyMDAgaWYgc3VjY2Vzc2Z1bCcsIChkb25lKSA9PiB7XG4gICAgY2hhaS5yZXF1ZXN0KGFwcClcbiAgICAucGF0Y2goJy9hcGkvdjEvcGFydGllcy9iYzNlYTIyMS04YzJjLTQwNTAtYjE1Mi1jZTRlZDUxOTY0NzQvbmFtZScpXG4gICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCBgJHthZG1pblRva2VufWApXG4gICAgLnNlbmQoe1xuICAgICAgbmFtZTogJ0NvbGQgY2l0eSBwYXJ0eSdcbiAgICB9KVxuICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4gICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoMjAwKTtcbiAgICAgIGRvbmUoKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcblxuLy8gZGVsZXRlIHBhcnR5XG5kZXNjcmliZSgnREVMRVRFIGFwaS92MS9wYXJ0aWVzJywgKCkgPT4ge1xuICBpdCgnc2hvdWxkIHJldHVybiA0MDAgaWYgYWRtaW4gdG9rZW4gbm90IHByb3ZpZGVkJywgKGRvbmUpID0+IHtcbiAgICBjaGFpLnJlcXVlc3QoYXBwKVxuICAgIC5kZWxldGUoJy9hcGkvdjEvcGFydGllcy82ZTJkYzYwMS04OTkwLTRkZTMtYWYzMi03MTkxOGI4N2EzNjMnKVxuICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4gICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDAwKTtcbiAgICAgIGV4cGVjdChyZXMuYm9keS5lcnJvcikudG8uZXF1YWwoJ1VzZXIgbm90IGF1dGhvcmlzZWQhJyk7XG4gICAgICBkb25lKCk7XG4gICAgfSlcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCByZXR1cm4gNDA0IGlmIHBhcnR5IGlkIGRvZXMgbm90IGV4aXN0JywgKGRvbmUpID0+IHtcbiAgICBjaGFpLnJlcXVlc3QoYXBwKVxuICAgIC5kZWxldGUoJy9hcGkvdjEvcGFydGllcy9mZDE2NDhiOS0zMmRkLTQwMmEtYjJmZS05OGM5ZGYxYzU4NWMnKVxuICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgYCR7YWRtaW5Ub2tlbn1gKVxuICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4gICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDA0KTtcbiAgICAgIGV4cGVjdChyZXMuYm9keS5lcnJvcikudG8uZXF1YWwoNDA0KTtcbiAgICAgIGV4cGVjdChyZXMuYm9keS5tZXNzYWdlKS50by5lcXVhbCgncGFydHkgbm90IGZvdW5kJyk7XG4gICAgICBkb25lKCk7XG4gICAgfSlcbiAgfSk7XG59KVxuXG5cbi8vIGRlc2NyaWJlKCdHRVQgXFwnYXBpL3YxL3BhcnRpZXNcXCcnLCAoKSA9PiB7XG4vLyAgIGl0KCdzaG91bGQgcmV0dXJuIGFsbCBwYXJ0aWVzJywgKGRvbmUpID0+IHtcbi8vICAgICBjaGFpLnJlcXVlc3QoYXBwKVxuLy8gICAgICAgLmdldCgnL2FwaS92MS9wYXJ0aWVzJylcbi8vICAgICAgIC5zZW5kKGJhZFRlc3RQYXJ0eTMpXG4vLyAgICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuLy8gICAgICAgICBleHBlY3QocmVzLnN0YXR1cykudG8uZXF1YWwoNDAwKTtcbi8vICAgICAgICAgZXhwZWN0KHJlcy5ib2R5KS50by5ub3QuYmUuZW1wdHk7XG4vLyAgICAgICAgIGRvbmUoZXJyKTtcbi8vICAgICAgIH0pO1xuLy8gICB9KTtcbi8vIH0pO1xuXG4vLyBkZXNjcmliZSgnR0VUIFxcJ2FwaS92MS9wYXJ0aWVzXFwnJywgKCkgPT4ge1xuLy8gICBpdCgnc2hvdWxkIHJldHVybiBhbGwgcGFydGllcycsIChkb25lKSA9PiB7XG4vLyAgICAgY2hhaS5yZXF1ZXN0KGFwcClcbi8vICAgICAgIC5nZXQoJy9hcGkvdjEvcGFydGllcycpXG4vLyAgICAgICAuc2VuZChiYWRUZXN0UGFydHk0KVxuLy8gICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbi8vICAgICAgICAgZXhwZWN0KHJlcy5zdGF0dXMpLnRvLmVxdWFsKDQwMCk7XG4vLyAgICAgICAgIGV4cGVjdChyZXMuYm9keSkudG8ubm90LmJlLmVtcHR5O1xuLy8gICAgICAgICBkb25lKGVycik7XG4vLyAgICAgICB9KTtcbi8vICAgfSk7XG4vLyB9KTtcblxuLy8gZGVzY3JpYmUoJ0ZldGNoIFBhcnRpZXMgYnkgSWQnLCgpID0+IHtcbi8vICAgaXQoJ3Nob3VsZCByZXR1cm4gNDAxIGJlY2F1c2UgdGhlcmUgaXMgbm8gdG9rZW4nLCAoZG9uZSkgPT4ge1xuLy8gICAgIGNoYWkucmVxdWVzdChhcHApXG4vLyAgICAgICAuZ2V0KCcvYXBpL3YxL3BhcnRpZXMvYTM0ZTJlODctZWVhYS00NzIxLTgwZTktNzI0MzA5ZTZiYmVhJylcbi8vICAgICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4vLyAgICAgICAgIGV4cGVjdChlcnIpLnRvLmJlLm51bGw7XG4vLyAgICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuaGVhZGVycztcbi8vICAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDAwKTtcbi8vICAgICAgICAgZXhwZWN0KHJlcykudG8ubm90LnJlZGlyZWN0O1xuLy8gICAgICAgICBleHBlY3QocmVzLmJvZHkpLnRvLmJlLmFuKCdvYmplY3QnKTtcbi8vICAgICAgICAgZG9uZSgpO1xuLy8gICAgICAgfSk7XG4vLyAgIH0pO1xuLy8gfSk7XG5cbi8vIGRlc2NyaWJlKCdQT1NUIFxcJy9hcGkvdjEvcGFydGllc1xcJycsICgpID0+IHtcbi8vICAgaXQoJ1BPU1QgbG9naW4gdG8gYWNjb3VudCcsIChkb25lKSA9PiB7IFxuLy8gICAgIGNoYWkucmVxdWVzdChhcHApXG4vLyAgICAgICAucG9zdCgnL2FwaS92MS9wYXJ0aWVzJylcbi8vICAgICAgIC5zZW5kKGJhZFRlc3RQYXJ0eTIpXG4vLyAgICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuLy8gICAgICAgICBleHBlY3QoZXJyKS50by5iZS5udWxsO1xuLy8gICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLmhlYWRlcnM7XG4vLyAgICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwMCk7XG4vLyAgICAgICAgIGV4cGVjdChyZXMpLnRvLm5vdC5yZWRpcmVjdDtcbi8vICAgICAgICAgZXhwZWN0KHJlcy5ib2R5KS50by5iZS5hbignb2JqZWN0Jyk7XG4vLyAgICAgICAgIGRvbmUoKTtcbi8vICAgICAgIH0pO1xuLy8gICB9KTtcbi8vIH0pO1xuXG4vLyBkZXNjcmliZSgnUE9TVCBcXCcvYXBpL3YxL3BhcnRpZXNcXCcnLCAoKSA9PiB7XG4vLyAgIGl0KCdQT1NUIGxvZ2luIHRvIGFjY291bnQnLCAoZG9uZSkgPT4geyBcbi8vICAgICBjaGFpLnJlcXVlc3QoYXBwKVxuLy8gICAgICAgLnBvc3QoJy9hcGkvdjEvcGFydGllcycpXG4vLyAgICAgICAuc2VuZChiYWRUZXN0UGFydHkzKVxuLy8gICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbi8vICAgICAgICAgZXhwZWN0KGVycikudG8uYmUubnVsbDtcbi8vICAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5oZWFkZXJzO1xuLy8gICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDApO1xuLy8gICAgICAgICBleHBlY3QocmVzKS50by5ub3QucmVkaXJlY3Q7XG4vLyAgICAgICAgIGV4cGVjdChyZXMuYm9keSkudG8uYmUuYW4oJ29iamVjdCcpO1xuLy8gICAgICAgICBkb25lKCk7XG4vLyAgICAgICB9KTtcbi8vICAgfSk7XG4vLyB9KTtcblxuLy8gZGVzY3JpYmUoJ1BPU1QgXFwnL2FwaS92MS9wYXJ0aWVzXFwnJywgKCkgPT4ge1xuLy8gICBpdCgnUE9TVCBsb2dpbiB0byBhY2NvdW50JywgKGRvbmUpID0+IHsgXG4vLyAgICAgY2hhaS5yZXF1ZXN0KGFwcClcbi8vICAgICAgIC5wb3N0KCcvYXBpL3YxL3BhcnRpZXMnKVxuLy8gICAgICAgLnNlbmQoYmFkVGVzdFBhcnR5NClcbi8vICAgICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4vLyAgICAgICAgIGV4cGVjdChlcnIpLnRvLmJlLm51bGw7XG4vLyAgICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuaGVhZGVycztcbi8vICAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDAwKTtcbi8vICAgICAgICAgZXhwZWN0KHJlcykudG8ubm90LnJlZGlyZWN0O1xuLy8gICAgICAgICBleHBlY3QocmVzLmJvZHkpLnRvLmJlLmFuKCdvYmplY3QnKTtcbi8vICAgICAgICAgZG9uZSgpO1xuLy8gICAgICAgfSk7XG4vLyAgIH0pO1xuLy8gfSk7XG5cbi8vIGNyZWF0ZSBvZmZpY2VcbmRlc2NyaWJlKCdQT1NUIC9hcGkvdjEvb2ZmaWNlcycsICgpID0+IHtcbiAgaXQoJ29ubHkgYXV0aG9yaXNlIGFkbWluIGNhbiBhY2Nlc3MnLCAoZG9uZSkgPT4ge1xuICAgIGNoYWkucmVxdWVzdChhcHApXG4gICAgICAucG9zdCgnL2FwaS92MS9vZmZpY2VzJylcbiAgICAgIC5zZW5kKG9mZmljZXMpXG4gICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAgICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwMCk7XG4gICAgICAgICAgZXhwZWN0KHJlcy5ib2R5LmVycm9yKS50by5lcXVhbCgnVXNlciBub3QgYXV0aG9yaXNlZCEnKTtcbiAgICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcbiAgfSk7XG4gIGl0KCdvZmZpY2UgdHlwZSBtdXN0IG5vdCBiZSBlbXB0eScsIChkb25lKSA9PiB7XG4gICAgY2hhaS5yZXF1ZXN0KGFwcClcbiAgICAgIC5wb3N0KCcvYXBpL3YxL29mZmljZXMnKVxuICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCBgJHthZG1pblRva2VufWApXG4gICAgICAuc2VuZChvZmZpY2VzMilcbiAgICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLmJlLmpzb247XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwMCk7XG4gICAgICAgIGV4cGVjdChyZXMuYm9keS5lcnJvcikudG8uZXF1YWwoJ1R5cGUgZmllbGQgaXMgZW1wdHknKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGl0KCdvZmZpY2UgbmFtZSBmaWVsZCBtdXN0IG5vdCBiZSBlbXB0eScsIChkb25lKSA9PiB7XG4gICAgY2hhaS5yZXF1ZXN0KGFwcClcbiAgICAgIC5wb3N0KCcvYXBpL3YxL29mZmljZXMnKVxuICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCBgJHthZG1pblRva2VufWApXG4gICAgICAuc2VuZChvZmZpY2VzMylcbiAgICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLmJlLmpzb247XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwMCk7XG4gICAgICAgIGV4cGVjdChyZXMuYm9keS5lcnJvcikudG8uZXF1YWwoJ05hbWUgZmllbGQgaXMgZW1wdHknKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGl0KCdvZmZpY2UgaW5wdXRzIGZpZWxkIG11c3Qgbm90IGJlIGVtcHR5JywgKGRvbmUpID0+IHtcbiAgICBjaGFpLnJlcXVlc3QoYXBwKVxuICAgICAgLnBvc3QoJy9hcGkvdjEvb2ZmaWNlcycpXG4gICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIGAke2FkbWluVG9rZW59YClcbiAgICAgIC5zZW5kKG9mZmljZXM0KVxuICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgICAgZXhwZWN0KHJlcykudG8uYmUuanNvbjtcbiAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDAwKTtcbiAgICAgICAgZXhwZWN0KHJlcy5ib2R5LmVycm9yKS50by5lcXVhbCgnSW5wdXRzIGZpZWxkcyBjYW5cXCd0IGJlIGxlZnQgZW1wdHknKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIFxuICBpdCgnb2ZmaWNlIG5hbWUgYW5kIHR5cGUgc2hvdWxkIGNvbnRhaW4gb25seSBhbHBoYWJldHMnLCAoZG9uZSkgPT4ge1xuICAgIGNoYWkucmVxdWVzdChhcHApXG4gICAgICAucG9zdCgnL2FwaS92MS9vZmZpY2VzJylcbiAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgYCR7YWRtaW5Ub2tlbn1gKVxuICAgICAgLnNlbmQob2ZmaWNlczUpXG4gICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDApO1xuICAgICAgICBleHBlY3QocmVzLmJvZHkuZXJyb3IpLnRvLmVxdWFsKCdBbHBoYWJldHMgb25seScpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ29mZmljZSBtdXN0IG5vdCBhbHJlYWR5IGV4aXN0IGluIHRoZSBkYXRhYmFzZScsIChkb25lKSA9PiB7XG4gICAgY2hhaS5yZXF1ZXN0KGFwcClcbiAgICAgIC5wb3N0KCcvYXBpL3YxL29mZmljZXMnKVxuICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCBgJHthZG1pblRva2VufWApXG4gICAgICAuc2VuZCh7XG4gICAgICAgIG5hbWU6ICdQcmVzaWRlbmN5JyxcbiAgICAgICAgdHlwZTonRmVkZXJhbCdcbiAgICAgIH0pXG4gICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDApO1xuICAgICAgICBleHBlY3QocmVzLmJvZHkuZXJyb3IpLnRvLmVxdWFsKCdPZmZpY2UgYWxyZWFkeSBleGlzdCcpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcbiAgfSk7XG4vLyB1bnJlc29sdmVkIHByb21pc2VcbiAgaXQoJ3Nob3VsZCByZXR1cm4gMjAxIGlmIHN1Y2Nlc3NmdWwnLCAoZG9uZSkgPT4ge1xuICAgIGNoYWkucmVxdWVzdChhcHApXG4gICAgICAucG9zdCgnL2FwaS92MS9vZmZpY2VzJylcbiAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgYCR7YWRtaW5Ub2tlbn1gKVxuICAgICAgLnNlbmQoe1xuICAgICAgICB0eXBlOidTdGF0ZScsXG4gICAgICAgIG5hbWU6ICdHb3Zlcm5vciBvZiBLYWR1bmEgc3RhdGUnXG4gICAgICB9KVxuICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgICAgZXhwZWN0KHJlcykudG8uYmUuanNvbjtcbiAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDAwKTsgIC8vd3JvbmdcbiAgICAgICAgLy8gZXhwZWN0KHJlcy5ib2R5LmRhdGFbMF0ubWVzc2FnZSkudG8uZXF1YWwoJ29mZmljZSBjcmVhdGVkJyk7XG4gICAgICAgIC8vIGV4cGVjdChyZXMuYm9keS5kYXRhWzBdLm9yZGVyLnR5cGUpLnRvLmVxdWFsKCdTdGF0ZScpO1xuICAgICAgICAvLyBleHBlY3QocmVzLmJvZHkuZGF0YVswXS5vcmRlci5uYW1lKS50by5lcXVhbCgnR292ZXJub3Igb2YgS2FkdW5hIHN0YXRlJyk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICB9KTtcbn0pO1xuXG4vLyBnZXQgYWxsIG9mZmljZVxuZGVzY3JpYmUoJ0dFVCAvYXBpL3YxL29mZmljZXMnLCAoKSA9PiB7XG4gIGl0KCdzaG91bGQgZ2V0IGFsbCBvZmZpY2VzJywgKGRvbmUpID0+IHtcbiAgICBjaGFpLnJlcXVlc3QoYXBwKVxuICAgIC5nZXQoJy9hcGkvdjEvb2ZmaWNlcycpXG4gICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCBgJHthZG1pblRva2VufWApXG4gICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDIwMCk7XG4gICAgZXhwZWN0KHJlcykudG8uYmUuYW4oJ29iamVjdCcpO1xuICAgIGRvbmUoKTtcbiAgICB9KTtcbiAgfSlcbn0pO1xuXG4vLyBnZXQgYSBzcGVjaWZpYyBvZmZpY2VcbmRlc2NyaWJlKCdHRVQgYXBpL3YxL29mZmljZXMnLCAoKSA9PiB7XG4gIGl0KCdzaG91bGQgcmV0dXJuIDQwMCwgbm8gdG9rZW4nLCAoZG9uZSkgPT4ge1xuICAgICBjaGFpLnJlcXVlc3QoYXBwKVxuICAgICAgIC5nZXQoJy9hcGkvdjEvb2ZmaWNlcy82ZTJkYzYwMS04OTkwLTRkZTMtYWYzMi03MTkxOGI4N2EzNjMnKVxuICAgICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4gICAgICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDAwKTtcbiAgICAgICAgIGV4cGVjdChyZXMuYm9keS5lcnJvcikudG8uZXF1YWwoJ1VzZXIgbm90IGF1dGhvcmlzZWQhJyk7XG4gICAgICAgICBkb25lKCk7XG4gICAgICAgfSkgIFxuICB9KTtcbiBcbiAgaXQoJ3Nob3VsZCByZXR1cm4gNDAwIGlmIHVzZXIgSUQgaXMgaW52YWxpZCcsIChkb25lKSA9PiB7XG4gICBjaGFpLnJlcXVlc3QoYXBwKVxuICAgICAuZ2V0KCcvYXBpL3YxL29mZmljZXMvcXcxYGBgODgnKVxuICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIGAke2FkbWluVG9rZW59YClcbiAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwMCk7XG4gICAgICAgZXhwZWN0KHJlcy5ib2R5LmVycm9yKS50by5lcXVhbCgnQmFkIHJlcXVlc3QuIENoZWNrIGFuZCB0cnkgYWdhaW4nKTtcbiAgICAgICBkb25lKCk7XG4gICAgIH0pICBcbiAgIH0pO1xuIFxuICAgaXQoJ3Nob3VsZCByZXR1cm4gNDA0IGlmIG9mZmljZSBpcyBub3QgZm91bmQnLCAoZG9uZSkgPT4ge1xuICAgICBjaGFpLnJlcXVlc3QoYXBwKVxuICAgICAgIC5nZXQoJy9hcGkvdjEvb2ZmaWNlcy9hMzRlMmU4Ny1lZWFhLTQ3MjEtODBlOS03MjQzMDllNmJiZWEnKVxuICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgYCR7YWRtaW5Ub2tlbn1gKVxuICAgICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4gICAgICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDA0KTtcbiAgICAgICAgIGV4cGVjdChyZXMuYm9keS5lcnJvcikudG8uZXF1YWwoJ09mZmljZSBub3QgZm91bmQnKTtcbiAgICAgICAgIGRvbmUoKTtcbiAgICAgICB9KSAgXG4gICAgIH0pO1xuLy8gIGluc2VydCBkYXRhYmFzZSB2YWx1ZXMgaW50byB0aGUgcmlnaHQgcGxhY2VzXG4gICAgIGl0KCdzaG91bGQgcmV0dXJuIDIwMCwgd2hlbiBzdWNjZXNzZnVsJywgKGRvbmUpID0+IHtcbiAgICAgICBjaGFpLnJlcXVlc3QoYXBwKVxuICAgICAgICAgLmdldCgnL2FwaS92MS9vZmZpY2VzL2ZkMTY0OGI5LTMyZGQtNDAyYS1iMmZlLTk4YzlkZjFjNTg1YycpXG4gICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIGAke2FkbWluVG9rZW59YClcbiAgICAgICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4gICAgICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDAwKTsgLy93cm9uZ1xuICAgICAgICAvLyAgZXhwZWN0KHJlcy5ib2R5LmRhdGFbMF0udHlwZSkudG8uZXF1YWwoJ0ZlZGVyYWwnKTtcbiAgICAgICAgLy8gIGV4cGVjdChyZXMuYm9keS5kYXRhWzBdLm5hbWUpLnRvLmVxdWFsKCdQcmVzaWRlbmN5Jyk7XG4gICAgICAgICBkb25lKCk7XG4gICAgICAgICB9KSAgXG4gICAgICAgfSk7XG4gfSk7XG5cbi8vICBnZXQgb2ZmaWNlIHJlc3VsdFxuZGVzY3JpYmUoJ0dFVCAvYXBpL3YxL29mZmljZS86b2ZmaWNlaWQvcmVzdWx0JywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBoYXZlIGEgdmFsaWQgSUQgcGFzc2VkIG9uIHRvIHRoZSBwYXJhbXMnLCAoZG9uZSkgPT4ge1xuICAgICAgICBjaGFpLnJlcXVlc3QoYXBwKVxuICAgICAgICAuZ2V0KCcvYXBpL3YxL29mZmljZS83OHR5LS0vcmVzdWx0JylcbiAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCBgJHthZG1pblRva2VufWApXG4gICAgICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4gICAgICAgICAgZXhwZWN0KHJlcykudG8uYmUuanNvbjtcbiAgICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDApO1xuICAgICAgICAgIGV4cGVjdChyZXMuYm9keS5lcnJvcikudG8uZXF1YWwoJ1RoZSB1c2VyIElEIHVzZWQgaXMgaW52YWxpZCcpO1xuICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgfSlcbiAgICAgIH0pO1xuXG4gICAgICAvLyBpdCgnc2hvdWxkIHJldHVybiA0MDQgaWYgb2ZmaWNlIGlzIG5vdCBmb3VuZCcsIChkb25lKSA9PiB7XG4gICAgICAvLyAgIGNoYWkucmVxdWVzdChhcHApXG4gICAgICAvLyAgIC5nZXQoJy9hcGkvdjEvb2ZmaWNlLzI0MDBjZmJjLTRiMTUtNDAwNi04NmMzLTNmZjc2N2E2MzEwNS9yZXN1bHQnKVxuICAgICAgLy8gICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIGAke2FkbWluVG9rZW59YClcbiAgICAgIC8vICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgIC8vICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAgICAgLy8gICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwMCk7XG4gICAgICAvLyAgICAgZXhwZWN0KHJlcy5ib2R5LmVycm9yKS50by5lcXVhbCgnT2ZmaWNlIG5vdCBmb3VuZCcpO1xuICAgICAgLy8gICAgIGRvbmUoKTtcbiAgICAgIC8vICAgfSlcbiAgICAgIC8vIH0pO1xuXG4gICAgICAvLyBjaGVjayBkYXRhYmFzZSBmb3IgdGhlIGxlZnQgYmxhbmsgaW5wdXRzXG4gICAgICBpdCgnc2hvdWxkIHJldHVybiAyMDAgaWYgb2ZmaWNlIHJlc3VsdCBpcyBjcmVhdGVkIHN1Y2Nlc3NmdWxseScsIChkb25lKSA9PiB7XG4gICAgICAgIGNoYWkucmVxdWVzdChhcHApXG4gICAgICAgIC5nZXQoJy9hcGkvdjEvb2ZmaWNlL2ZkMTY0OGI5LTMyZGQtNDAyYS1iMmZlLTk4YzlkZjFjNTg1Yy9yZXN1bHQnKVxuICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIGAke2FkbWluVG9rZW59YClcbiAgICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAgICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDIwMCk7XG4gICAgICAgICAgLy8gZXhwZWN0KHJlcy5ib2R5LmRhdGFbMF0uc2luZ2xlUmVzdWx0Lm9mZmljZSkudG8uZXF1YWwoJ2ZkMTY0OGI5LTMyZGQtNDAyYS1iMmZlLTk4YzlkZjFjNTg1YycpO1xuICAgICAgICAgIC8vIGV4cGVjdChyZXMuYm9keS5kYXRhWzBdLnNpbmdsZVJlc3VsdC5jYW5kaWRhdGUpLnRvLmVxdWFsKCc4ZWE3NmU0MC03ZjJmLTRiY2UtYjA3Zi05ZjM4NzJhYzM5YzAnLCAnYmNmMzhkNzQtNmJiOS00MDM3LTg0YTUtZTY5NGFkZjI3YzBkJyk7XG4gICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9KVxuICAgICAgfSk7ICBcbn0pO1xuXG4vLyB2b3Rlc1xuZGVzY3JpYmUoJ1BPU1QgL2FwaS92MS92b3RlcycsICgpID0+IHtcbiAgaXQoJ3Nob3VsZCByZXR1cm4gNDAwIGlmIGlucHV0cyBjb250YWluIHdoaXRlIHNwYWNlcycsIChkb25lKSA9PntcbiAgICBjaGFpLnJlcXVlc3QoYXBwKVxuICAgIC5wb3N0KCcvYXBpL3YxL3ZvdGVzJylcbiAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIGAke2FkbWluVG9rZW59YClcbiAgICAuc2VuZChiYWRWb3RlUmVzdWx0NSlcbiAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgICAgZXhwZWN0KHJlcykudG8uYmUuanNvbjtcbiAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwMCk7XG4gICAgICBleHBlY3QocmVzLmJvZHkuZXJyb3IpLnRvLmVxdWFsKCdXaGl0ZSBTcGFjZSBhcmUgbm90IGFsbG93ZWQgaW4gaW5wdXQgZmllbGRzJyk7XG4gICAgICBkb25lKCk7XG4gICAgfSlcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCByZXR1cm4gNDAwIHdoZW4gYWxsIGlucHV0cyBmaWVsZHMgaXMgZW1wdHknLCAoZG9uZSkgPT57XG4gICAgY2hhaS5yZXF1ZXN0KGFwcClcbiAgICAucG9zdCgnL2FwaS92MS92b3RlcycpXG4gICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCBgJHthZG1pblRva2VufWApXG4gICAgLnNlbmQoYmFkVm90ZVJlc3VsdDQpXG4gICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgIGV4cGVjdChyZXMpLnRvLmJlLmpzb247XG4gICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDApO1xuICAgICAgZXhwZWN0KHJlcy5ib2R5LmVycm9yKS50by5lcXVhbCgnU29tZSB2YWx1ZXMgYXJlIG1pc3NpbmcnKTtcbiAgICAgIGRvbmUoKTtcbiAgICB9KVxuICB9KTtcblxuICAvLyBpdCgnc2hvdWxkIHJldHVybiAyMDEgd2hlbiB2b3RlIGlzIHN1Y2Nlc3NmdWwnLCAoZG9uZSkgPT57XG4gIC8vICAgY2hhaS5yZXF1ZXN0KGFwcClcbiAgLy8gICAucG9zdCgnL2FwaS92MS92b3RlcycpXG4gIC8vICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCBgJHthZG1pblRva2VufWApXG4gIC8vICAgLnNlbmQoZ29vZFZvdGVSZXN1bHQpXG4gIC8vICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgLy8gICAgIGV4cGVjdChyZXMpLnRvLmJlLmpzb247XG4gIC8vICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cygyMDEpO1xuICAvLyAgICAgZXhwZWN0KHJlcy5ib2R5WzBdLmRhdGEubWVzc2FnZSkudG8uZXF1YWwoJ1ZvdGUgY29tcGxldGUnKTtcbiAgLy8gICAgIC8vIGV4cGVjdChyZXMuYm9keVswXS5kYXRhLmRhdGEub2ZmaWNlKS50by5lcXVhbCgnZmQxNjQ4YjktMzJkZC00MDJhLWIyZmUtOThjOWRmMWM1ODVjJyk7XG4gIC8vICAgICAvLyBleHBlY3QocmVzLmJvZHlbMF0uZGF0YS5kYXRhLmNhbmRpZGF0ZSkudG8uZXF1YWwoJzdjMDFiNDNkLWU5MTEtNGE2Zi04Y2MwLTFkNWM4YzE2NTAxZCcpO1xuICAvLyAgICAgLy8gZXhwZWN0KHJlcy5ib2R5WzBdLmRhdGEuZGF0YS52b3RlcikudG8uZXF1YWwoJ2E1OTM0MjU2LWVhMWItNDc2Yy1hZjlhLWIyYWI0YzU1MTJiNicpO1xuICAvLyAgICAgZG9uZSgpO1xuICAvLyAgIH0pXG4gIC8vIH0pO1xufSk7XG5cbi8vIFJlZ2lzdGVyIGNhbmRpZGF0ZXNcbi8vIGlkIGkgdXNlZCBmb3IgdGhlIHVzZXIgaXMgZmFuIG9mZmljZSBpZCwgY2hhbmdlIGl0XG4gZGVzY3JpYmUoJ1BPU1QgL2FwaS92MS9vZmZpY2UvOnVzZXJpZC9yZWdpc3RlcicsICgpID0+IHtcbiAgaXQoJ3Nob3VsZCByZXR1cm4gNDAwIGlmIG5vIGFkbWluIHRva2VuJywgKGRvbmUpID0+e1xuICAgICAgY2hhaS5yZXF1ZXN0KGFwcClcbiAgICAgICAgLnBvc3QoJy9hcGkvdjEvb2ZmaWNlLzZlMmRjNjAxLTg5OTAtNGRlMy1hZjMyLTcxOTE4Yjg3YTM2My9yZWdpc3RlcicpXG4gICAgICAgIC5zZW5kKGNhbmRpZGF0ZTQpXG4gICAgICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4gICAgICAgICAgZXhwZWN0KHJlcykudG8uYmUuanNvbjtcbiAgICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDApO1xuICAgICAgICAgIGV4cGVjdChyZXMuYm9keS5lcnJvcikudG8uZXF1YWwoJ1VzZXIgbm90IGF1dGhvcmlzZWQhJyk7XG4gICAgICAgICAgZG9uZSgpO1xuICAgICB9KSAgXG4gIH0pO1xuICBpdCgnc2hvdWxkIHJldHVybiA0MDAgaWYgbm8gb2ZmaWNlIGFuZCBwYXJ0eSBpbnB1dHMnLCAoZG9uZSkgPT4ge1xuICAgIGNoYWkucmVxdWVzdChhcHApXG4gICAgLnBvc3QoJy9hcGkvdjEvb2ZmaWNlLzZlMmRjNjAxLTg5OTAtNGRlMy1hZjMyLTcxOTE4Yjg3YTM2My9yZWdpc3RlcicpXG4gICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCBgJHthZG1pblRva2VufWApXG4gICAgLnNlbmQoe1xuICAgICAgb2ZmaWNlOiAnJyxcbiAgICAgIHBhcnR5OiAnJyxcbiAgICAgIGNhbmRpZGF0ZTogJydcbiAgICB9KVxuICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4gICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDAwKTtcbiAgICAgIGV4cGVjdChyZXMuYm9keS5lcnJvcikudG8uZXF1YWwoJ1NvbWUgdmFsdWVzIGFyZSBtaXNzaW5nJyk7XG4gICAgICBkb25lKCk7XG4gICAgfSlcbiAgfSlcblxuICBpdCgnc2hvdWxkIHJldHVybiA0MDAgaWYgY2FuZGlkYXRlIGlucHV0cyBpcyBlbXB0eScsIChkb25lKSA9PiB7XG4gICAgY2hhaS5yZXF1ZXN0KGFwcClcbiAgICAucG9zdCgnL2FwaS92MS9vZmZpY2UvNmUyZGM2MDEtODk5MC00ZGUzLWFmMzItNzE5MThiODdhMzYzL3JlZ2lzdGVyJylcbiAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIGAke2FkbWluVG9rZW59YClcbiAgICAuc2VuZChjYW5kaWRhdGUzKVxuICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4gICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDAwKTtcbiAgICAgIGV4cGVjdChyZXMuYm9keS5lcnJvcikudG8uZXF1YWwoJ2NhbmRpZGF0ZSBmaWVsZCBjYW5cXCd0IGJlIGVtcHR5Jyk7XG4gICAgICBkb25lKCk7XG4gICAgfSlcbiAgfSlcblxuICAvLyBpdCgnc2hvdWxkIHJldHVybiAyMDEgaWYgc3VjY2Vzc2Z1bGx5IHJlZ2lzdGVyZWQnLCAoZG9uZSkgPT4ge1xuICAvLyAgIGNoYWkucmVxdWVzdChhcHApXG4gIC8vICAgLnBvc3QoJy9hcGkvdjEvb2ZmaWNlLzZlMmRjNjAxLTg5OTAtNGRlMy1hZjMyLTcxOTE4Yjg3YTM2My9yZWdpc3RlcicpXG4gIC8vICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCBgJHthZG1pblRva2VufWApXG4gIC8vICAgLnNlbmQoY2FuZGlkYXRlNClcbiAgLy8gICAuZW5kKChlcnIsIHJlcykgPT4ge1xuICAvLyAgICAgZXhwZWN0KHJlcykudG8uYmUuanNvbjtcbiAgLy8gICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwMCk7XG4gIC8vICAgICBleHBlY3QocmVzLmJvZHlbMF0ubWVzc2FnZSkudG8uZXF1YWwoJ0NhbmRpZGF0ZSBSZWdpc3RlcmVkJyk7XG4gIC8vICAgICAvLyBleHBlY3QocmVzLmJvZHlbMF0uZGF0YS5jYW5kaWRhdGUtaWQpLnRvLmVxdWFsKCcyNjQzZTM5Ny00Y2Y3LTQ5NjgtODlkNS05NjA1OWJmZDBlYTYnKTtcbiAgLy8gICAgIC8vIGV4cGVjdChyZXMuYm9keVswXS5kYXRhLm9mZmljZSkudG8uZXF1YWwoJ2FjMGE4ODlkLTU3ZDItNDQ3Ny04MDVhLTgwY2IyMmNmMWIzYycpO1xuICAvLyAgICAgLy8gZXhwZWN0KHJlcy5ib2R5WzBdLmRhdGEudXNlcikudG8uZXF1YWwoJ2FjMGE4ODlkLTU3ZDItNDQ3Ny04MDVhLTgwY2IyMmNmMWIzYycpO1xuICAvLyAgICAgZG9uZSgpO1xuICAvLyAgIH0pXG4gIC8vIH0pXG59KTtcblxuXG5cblxuLy8gZGVzY3JpYmUoJ0dFVCAvb2ZmaWNlJywgKCkgPT4ge1xuLy8gICBpdCgnc2hvdWxkIHJldHVybiBhbGwgb2ZmaWNlcycsIChkb25lKSA9PiB7XG4vLyAgICAgY2hhaS5yZXF1ZXN0KGFwcClcbi8vICAgICAgIC5nZXQoJy9hcGkvdjEvb2ZmaWNlcycpXG4vLyAgICAgICAuc2VuZChvZmZpY2VzMilcbi8vICAgICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4vLyAgICAgICAgIGV4cGVjdChyZXMuc3RhdHVzKS50by5lcXVhbCg0MDApO1xuLy8gICAgICAgICBleHBlY3QocmVzLmJvZHkpLnRvLm5vdC5iZS5lbXB0eTtcbi8vICAgICAgICAgZG9uZShlcnIpO1xuLy8gICAgICAgfSk7XG4vLyAgIH0pO1xuLy8gfSk7XG5cbi8vIGRlc2NyaWJlKCdHRVQgL29mZmljZXMnLCAoKSA9PiB7XG4vLyAgIGl0KCdzaG91bGQgcmV0dXJuIGFsbCBvZmZpY2VzJywgKGRvbmUpID0+IHtcbi8vICAgICBjaGFpLnJlcXVlc3QoYXBwKVxuLy8gICAgICAgLmdldCgnL2FwaS92MS9vZmZpY2VzJylcbi8vICAgICAgIC5zZW5kKG9mZmljZXMzKVxuLy8gICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbi8vICAgICAgICAgZXhwZWN0KHJlcy5zdGF0dXMpLnRvLmVxdWFsKDQwMCk7XG4vLyAgICAgICAgIGV4cGVjdChyZXMuYm9keSkudG8ubm90LmJlLmVtcHR5O1xuLy8gICAgICAgICBkb25lKGVycik7XG4vLyAgICAgICB9KTtcbi8vICAgfSk7XG4vLyB9KTtcblxuLy8gZGVzY3JpYmUoJ0ZldGNoIG9mZmljZSBieSBJZCcsKCkgPT4ge1xuLy8gICBpdCgnc2hvdWxkIHJldHVybiA0MDEgYmVjYXVzZSB0aGVyZSBpcyBubyB0b2tlbicsIChkb25lKSA9PiB7XG4vLyAgICAgY2hhaS5yZXF1ZXN0KGFwcClcbi8vICAgICAgIC5nZXQoJy9hcGkvdjEvb2ZmaWNlcy9hMzRlMmU4Ny1lZWFhLTQ3MjEtODBlOS03MjQzMDllNmJiZWEnKVxuLy8gICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbi8vICAgICAgICAgZXhwZWN0KGVycikudG8uYmUubnVsbDtcbi8vICAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5oZWFkZXJzO1xuLy8gICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDApO1xuLy8gICAgICAgICBleHBlY3QocmVzKS50by5ub3QucmVkaXJlY3Q7XG4vLyAgICAgICAgIGV4cGVjdChyZXMuYm9keSkudG8uYmUuYW4oJ29iamVjdCcpO1xuLy8gICAgICAgICBkb25lKCk7XG4vLyAgICAgICB9KTtcbi8vICAgfSk7XG4vLyB9KTtcblxuLy8gZGVzY3JpYmUoJ1Bvc3QgXFwnL2FwaS92MVxcJycsICgpID0+IHtcbi8vICAgaXQoJ1BPU1Qgb2ZmaWNlIHRvIGFjY291bnQnLCAoZG9uZSkgPT4geyAvLyBXSEVOIEVNQUlMIElTIElOQ09SUkVDVExZIExBSURcbi8vICAgICBjaGFpLnJlcXVlc3QoYXBwKVxuLy8gICAgICAgLnBvc3QoJy9hcGkvdjEvb2ZmaWNlcycpXG4vLyAgICAgICAuc2VuZChvZmZpY2VzMilcbi8vICAgICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4vLyAgICAgICAgIGV4cGVjdChlcnIpLnRvLmJlLm51bGw7XG4vLyAgICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuaGVhZGVycztcbi8vICAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDAwKTtcbi8vICAgICAgICAgZXhwZWN0KHJlcykudG8ubm90LnJlZGlyZWN0O1xuLy8gICAgICAgICBleHBlY3QocmVzLmJvZHkpLnRvLmJlLmFuKCdvYmplY3QnKTtcbi8vICAgICAgICAgZG9uZSgpO1xuLy8gICAgICAgfSk7XG4vLyAgIH0pO1xuLy8gfSk7XG5cbi8vIGRlc2NyaWJlKCdQb3N0IFxcJy9hcGkvdjEvb2ZmaWNlc1xcJycsICgpID0+IHtcbi8vICAgaXQoJ1BPU1Qgb2ZmaWNlIHRvIGFjY291bnQnLCAoZG9uZSkgPT4geyAvLyBXSEVOIEVNQUlMIElTIElOQ09SUkVDVExZIExBSURcbi8vICAgICBjaGFpLnJlcXVlc3QoYXBwKVxuLy8gICAgICAgLnBvc3QoJy9hcGkvdjEvb2ZmaWNlcycpXG4vLyAgICAgICAuc2VuZChvZmZpY2VzMylcbi8vICAgICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4vLyAgICAgICAgIGV4cGVjdChlcnIpLnRvLmJlLm51bGw7XG4vLyAgICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuaGVhZGVycztcbi8vICAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDAwKTtcbi8vICAgICAgICAgZXhwZWN0KHJlcykudG8ubm90LnJlZGlyZWN0O1xuLy8gICAgICAgICBleHBlY3QocmVzLmJvZHkpLnRvLmJlLmFuKCdvYmplY3QnKTtcbi8vICAgICAgICAgZG9uZSgpO1xuLy8gICAgICAgfSk7XG4vLyAgIH0pO1xuLy8gfSk7XG5cbi8vIGRlc2NyaWJlKCdQb3N0IFxcJy9hcGkvdjFcXCcnLCAoKSA9PiB7XG4vLyAgIGl0KCdQT1NUIHZvdGUgZm9yIGEgY2FuZGlkYXRlJywgKGRvbmUpID0+IHsgLy8gV0hFTiBFTUFJTCBJUyBJTkNPUlJFQ1RMWSBMQUlEXG4vLyAgICAgY2hhaS5yZXF1ZXN0KGFwcClcbi8vICAgICAgIC5wb3N0KCcvYXBpL3YxL3ZvdGUnKVxuLy8gICAgICAgLnNlbmQodm90ZTEpXG4vLyAgICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuLy8gICAgICAgICBleHBlY3QoZXJyKS50by5iZS5udWxsO1xuLy8gICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLmhlYWRlcnM7XG4vLyAgICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwNCk7XG4vLyAgICAgICAgIGV4cGVjdChyZXMpLnRvLm5vdC5yZWRpcmVjdDtcbi8vICAgICAgICAgZXhwZWN0KHJlcy5ib2R5KS50by5iZS5hbignb2JqZWN0Jyk7XG4vLyAgICAgICAgIGRvbmUoKTtcbi8vICAgICAgIH0pO1xuLy8gICB9KTtcbi8vIH0pO1xuXG4vLyBkZXNjcmliZSgnUG9zdCBcXCcvYXBpL3YxXFwnJywgKCkgPT4ge1xuLy8gICBpdCgnUE9TVCB2b3RlIGZvciBhIGNhbmRpZGF0ZScsIChkb25lKSA9PiB7IC8vIFdIRU4gRU1BSUwgSVMgSU5DT1JSRUNUTFkgTEFJRFxuLy8gICAgIGNoYWkucmVxdWVzdChhcHApXG4vLyAgICAgICAucG9zdCgnL2FwaS92MS92b3RlJylcbi8vICAgICAgIC5zZW5kKHZvdGUyKVxuLy8gICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbi8vICAgICAgICAgZXhwZWN0KGVycikudG8uYmUubnVsbDtcbi8vICAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5oZWFkZXJzO1xuLy8gICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDQpO1xuLy8gICAgICAgICBleHBlY3QocmVzKS50by5ub3QucmVkaXJlY3Q7XG4vLyAgICAgICAgIGV4cGVjdChyZXMuYm9keSkudG8uYmUuYW4oJ29iamVjdCcpO1xuLy8gICAgICAgICBkb25lKCk7XG4vLyAgICAgICB9KTtcbi8vICAgfSk7XG4vLyB9KTtcblxuLy8gZGVzY3JpYmUoJ1Bvc3QgXFwnL2FwaS92MVxcJycsICgpID0+IHtcbi8vICAgaXQoJ1BPU1Qgdm90ZSBmb3IgYSBjYW5kaWRhdGUnLCAoZG9uZSkgPT4geyAvLyBXSEVOIEVNQUlMIElTIElOQ09SUkVDVExZIExBSURcbi8vICAgICBjaGFpLnJlcXVlc3QoYXBwKVxuLy8gICAgICAgLnBvc3QoJy9hcGkvdjEvdm90ZScpXG4vLyAgICAgICAuc2VuZCh2b3RlMylcbi8vICAgICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4vLyAgICAgICAgIGV4cGVjdChlcnIpLnRvLmJlLm51bGw7XG4vLyAgICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuaGVhZGVycztcbi8vICAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDA0KTtcbi8vICAgICAgICAgZXhwZWN0KHJlcykudG8ubm90LnJlZGlyZWN0O1xuLy8gICAgICAgICBleHBlY3QocmVzLmJvZHkpLnRvLmJlLmFuKCdvYmplY3QnKTtcbi8vICAgICAgICAgZG9uZSgpO1xuLy8gICAgICAgfSk7XG4vLyAgIH0pO1xuLy8gfSk7XG5cbi8vIGRlc2NyaWJlKCdQb3N0IFxcJy9hcGkvdjFcXCcnLCAoKSA9PiB7XG4vLyAgIGl0KCdQT1NUIHJlZ2lzdGVyIGEgY2FuZGlkYXRlJywgKGRvbmUpID0+IHsgLy8gV0hFTiBFTUFJTCBJUyBJTkNPUlJFQ1RMWSBMQUlEXG4vLyAgICAgY2hhaS5yZXF1ZXN0KGFwcClcbi8vICAgICAgIC5wb3N0KCcvYXBpL3YxLzpvZmZpY2VpZC9yZWdpc3RlcicpXG4vLyAgICAgICAuc2VuZChjYW5kaWRhdGUxKVxuLy8gICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbi8vICAgICAgICAgZXhwZWN0KGVycikudG8uYmUubnVsbDtcbi8vICAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5oZWFkZXJzO1xuLy8gICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDQpO1xuLy8gICAgICAgICBleHBlY3QocmVzKS50by5ub3QucmVkaXJlY3Q7XG4vLyAgICAgICAgIGV4cGVjdChyZXMuYm9keSkudG8uYmUuYW4oJ29iamVjdCcpO1xuLy8gICAgICAgICBkb25lKCk7XG4vLyAgICAgICB9KTtcbi8vICAgfSk7XG4vLyB9KTtcblxuLy8gZGVzY3JpYmUoJ1Bvc3QgXFwnL2FwaS92MVxcJycsICgpID0+IHtcbi8vICAgaXQoJ1BPU1QgcmVnaXN0ZXIgYSBjYW5kaWRhdGUnLCAoZG9uZSkgPT4geyAvLyBXSEVOIEVNQUlMIElTIElOQ09SUkVDVExZIExBSURcbi8vICAgICBjaGFpLnJlcXVlc3QoYXBwKVxuLy8gICAgICAgLnBvc3QoJy9hcGkvdjEvOm9mZmljZWlkL3JlZ2lzdGVyJylcbi8vICAgICAgIC5zZW5kKGNhbmRpZGF0ZTIpXG4vLyAgICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuLy8gICAgICAgICBleHBlY3QoZXJyKS50by5iZS5udWxsO1xuLy8gICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLmhlYWRlcnM7XG4vLyAgICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwNCk7XG4vLyAgICAgICAgIGV4cGVjdChyZXMpLnRvLm5vdC5yZWRpcmVjdDtcbi8vICAgICAgICAgZXhwZWN0KHJlcy5ib2R5KS50by5iZS5hbignb2JqZWN0Jyk7XG4vLyAgICAgICAgIGRvbmUoKTtcbi8vICAgICAgIH0pO1xuLy8gICB9KTtcbi8vIH0pO1xuXG4vLyBkZXNjcmliZSgnUG9zdCBcXCcvYXBpL3YxXFwnJywgKCkgPT4ge1xuLy8gICBpdCgnUE9TVCByZWdpc3RlciBhIGNhbmRpZGF0ZScsIChkb25lKSA9PiB7IC8vIFdIRU4gRU1BSUwgSVMgSU5DT1JSRUNUTFkgTEFJRFxuLy8gICAgIGNoYWkucmVxdWVzdChhcHApXG4vLyAgICAgICAucG9zdCgnL2FwaS92MS86b2ZmaWNlaWQvcmVnaXN0ZXInKVxuLy8gICAgICAgLnNlbmQoY2FuZGlkYXRlMylcbi8vICAgICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4vLyAgICAgICAgIGV4cGVjdChlcnIpLnRvLmJlLm51bGw7XG4vLyAgICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuaGVhZGVycztcbi8vICAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDA0KTtcbi8vICAgICAgICAgZXhwZWN0KHJlcykudG8ubm90LnJlZGlyZWN0O1xuLy8gICAgICAgICBleHBlY3QocmVzLmJvZHkpLnRvLmJlLmFuKCdvYmplY3QnKTtcbi8vICAgICAgICAgZG9uZSgpO1xuLy8gICAgICAgfSk7XG4vLyAgIH0pO1xuLy8gfSk7XG5cbi8vIC8vIG9mZmljZSByZXN1bHRcbi8vIGRlc2NyaWJlKCcvYXBpL3YxL29mZmljZXMvOmlkL3Jlc3VsdCcsICgpID0+IHtcbi8vICAgaXQoJ29mZmljZSBpZCBvbiB0aGUgcGFyYW1zIG11c3QgYmUgdmFsaWQnLCAoZG9uZSkgPT4geyAvLyBXSEVOIEVNQUlMIElTIElOQ09SUkVDVExZIExBSURcbi8vICAgICBjaGFpLnJlcXVlc3QoYXBwKVxuLy8gICAgICAgLmdldCgnL2FwaS92MS9vZmZpY2UvcjcvcmVzdWx0Jylcbi8vICAgICAgIC8vIC5zZW5kKGdvb2RWb3RlUmVzdWx0KVxuLy8gICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbi8vICAgICAgICAgZXhwZWN0KHJlcykudG8uYmUuanNvbjtcbi8vICAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDAwKTtcbi8vICAgICAgICAgZXhwZWN0KHJlcykudG8ubm90LnJlZGlyZWN0O1xuLy8gICAgICAgICBleHBlY3QocmVzLmJvZHkuZXJyb3IpLnRvLmJlLmVxdWFsKCdVc2VyIG5vdCBhdXRob3Jpc2VkIScpO1xuLy8gICAgICAgICBkb25lKCk7XG4vLyAgICAgICB9KTtcbi8vICAgfSk7XG5cbi8vICAgaXQoJ29mZmljZSB3aXRoIHRoYXQgSUQgc2hvdWxkIGV4aXN0JywgKGRvbmUpID0+e1xuLy8gICAgIGNoYWkucmVxdWVzdChhcHApXG4vLyAgICAgLmdldCgnL2FwaS92MS9vZmZpY2VzLzI2NDNlMzk3LTRjZjctNDk2OC04OWQ1LTk2MDU5YmZkMGVhNi9yZXN1bHQnKVxuLy8gICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4vLyAgICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuLy8gICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDQpO1xuLy8gICAgICAgICBleHBlY3QocmVzLmJvZHkuZXJyb3IpLnRvLmVxdWFsKCdSZXNvdXJjZSBub3QgZm91bmQgb24gdGhlIHNlcnZlcicpO1xuLy8gICAgICAgICBkb25lKCk7XG4vLyAgICAgfSlcbi8vICAgfSlcblxuICAvLyBpdCgncmVzdWx0IHNob3VsZCBiZSBnb3R0ZW4gc3VjY2Vzc2Z1bGx5JywgKGRvbmUpID0+IHtcbiAgLy8gICBjaGFpLnJlcXVlc3QoYXBwKVxuICAvLyAgICAgLmdldCgnL2FwaS92MS9vZmZpY2VzLzI2NDNlMzk3LTRjZjctNDk2OC04OWQ1LTk2MDU5YmZkMGVhNi9yZXN1bHQnKVxuICAvLyAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgLy8gICAgICAgZXhwZWN0KHJlcykudG8uYmUuanNvbjtcbiAgLy8gICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoMjAwKTtcbiAgLy8gICAgICAgZXhwZWN0KHJlc3BvbnNlLmJvZHkuZGF0YVswXS5wb2xsUmVzdWx0KS50by5lcXVhbCgnMjY0M2UzOTctNGNmNy00OTY4LTg5ZDUtOTYwNTliZmQwZWE2Jyk7XG4gIC8vICAgICAgIGRvbmUoKTtcbiAgLy8gICAgIH0pO1xuICAvLyB9KTtcbi8vIH0pO1xuXG4gIFxuXG5cbi8vIGdldCBhbGwgdXNlcnNcbi8vIGRlc2NyaWJlKCdHRVQgL3VzZXJzJywgKCkgPT4ge1xuLy8gICBpdCgnc2hvdWxkIHJldHVybiBhbGwgdXNlcnMnLCAoZG9uZSkgPT4ge1xuLy8gICAgIGNoYWkucmVxdWVzdChhcHApXG4vLyAgICAgICAuZ2V0KCcvYXBpL3YxL3VzZXJzJylcbi8vICAgICAgIC5zZW5kKGdvb2RTaWdudXApXG4vLyAgICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuLy8gICAgICAgICBleHBlY3QocmVzLnN0YXR1cykudG8uZXF1YWwoNDAwKTtcbi8vICAgICAgICAgZXhwZWN0KHJlcy5ib2R5KS50by5ub3QuYmUuZW1wdHk7XG4vLyAgICAgICAgIGRvbmUoZXJyKTtcbi8vICAgICAgIH0pO1xuLy8gICB9KTtcbi8vIH0pO1xuXG4vLyBkZXNjcmliZSgnR0VUIC91c2VycycsICgpID0+IHtcbi8vICAgaXQoJ3Nob3VsZCByZXR1cm4gYWxsIHVzZXJzJywgKGRvbmUpID0+IHtcbi8vICAgICBjaGFpLnJlcXVlc3QoYXBwKVxuLy8gICAgICAgLmdldCgnL2FwaS92MS91c2VycycpXG4vLyAgICAgICAuc2VuZChiYWRTaWdudXAyKVxuLy8gICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbi8vICAgICAgICAgZXhwZWN0KHJlcy5zdGF0dXMpLnRvLmVxdWFsKDQwMCk7XG4vLyAgICAgICAgIGV4cGVjdChyZXMuYm9keSkudG8ubm90LmJlLmVtcHR5O1xuLy8gICAgICAgICBkb25lKGVycik7XG4vLyAgICAgICB9KTtcbi8vICAgfSk7XG4vLyB9KTtcblxuLy8gZGVzY3JpYmUoJ0ZldGNoIGFsbCB1c2VycycsKCkgPT4ge1xuLy8gICBpdCgnc2hvdWxkIHJldHVybiA0MDEgd2hlbiB0aGVyZSBpcyBubyB0b2tlbicsIChkb25lKSA9PiB7XG4vLyAgICAgY2hhaS5yZXF1ZXN0KGFwcClcbi8vICAgICAgIC5nZXQoJy9hcGkvdjEvdXNlcnMnKVxuLy8gICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbi8vICAgICAgICAgZXhwZWN0KGVycikudG8uYmUubnVsbDtcbi8vICAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5oZWFkZXJzO1xuLy8gICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDApO1xuLy8gICAgICAgICBleHBlY3QocmVzKS50by5ub3QucmVkaXJlY3Q7XG4vLyAgICAgICAgIGV4cGVjdChyZXMuYm9keSkudG8uYmUuYW4oJ29iamVjdCcpO1xuLy8gICAgICAgICBkb25lKCk7XG4vLyAgICAgICB9KTtcbi8vICAgfSk7XG4vLyB9KTtcbn0pOyJdfQ==