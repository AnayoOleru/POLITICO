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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3Rlc3QvdGVzdC5qcyJdLCJuYW1lcyI6WyJjaGFpIiwidXNlIiwiY2hhaUh0dHAiLCJleHBlY3QiLCJkZXNjcmliZSIsImFkbWluVG9rZW4iLCJ1c2VyVG9rZW4iLCJiZWZvcmUiLCJyZXF1ZXN0IiwiYXBwIiwicG9zdCIsInNlbmQiLCJlbWFpbCIsInBhc3N3b3JkIiwicmVzIiwiYm9keSIsImRhdGEiLCJ0b2tlbiIsIml0IiwiZG9uZSIsImdldCIsImVuZCIsImVyciIsInRvIiwiYmUiLCJudWxsIiwiaGF2ZSIsInN0YXR1cyIsIm5vdCIsInJlZGlyZWN0IiwiYW4iLCJiYWRTaWdudXA0IiwianNvbiIsImVycm9yIiwiZXF1YWwiLCJiYWRTaWdudXA1IiwiYmFkU2lnbnVwIiwiaGVhZGVycyIsImZpcnN0bmFtZSIsImxhc3RuYW1lIiwib3RoZXJuYW1lIiwicGhvbmVOdW1iZXIiLCJwYXNzcG9ydFVybCIsImJhZFNpZ251cDMiLCJiYWRTaWdudXAyIiwicGhvbmVudW1iZXIiLCJiYWRMb2dpbiIsImJhZExvZ2luMiIsImJhZExvZ2luMyIsImdvb2RMb2dpbiIsInVzZXIiLCJ0ZXN0UGFydHkiLCJzZXQiLCJiYWRUZXN0UGFydHkiLCJiYWRUZXN0UGFydHkyIiwiYmFkVGVzdFBhcnR5MyIsImJhZFRlc3RQYXJ0eTQiLCJiYWRUZXN0UGFydHk1IiwiYmFkVGVzdFBhcnR5NiIsImJhZFRlc3RQYXJ0eTciLCJiYWRUZXN0UGFydHk4Iiwib3JkZXIiLCJuYW1lIiwiaHFhZGRyZXNzIiwibG9nb3VybCIsInBhdGNoIiwiZGVsZXRlIiwibWVzc2FnZSIsIm9mZmljZXMiLCJvZmZpY2VzMiIsIm9mZmljZXMzIiwib2ZmaWNlczQiLCJvZmZpY2VzNSIsInR5cGUiLCJiYWRWb3RlUmVzdWx0NSIsImJhZFZvdGVSZXN1bHQ0IiwiY2FuZGlkYXRlNCIsIm9mZmljZSIsInBhcnR5IiwiY2FuZGlkYXRlIiwiY2FuZGlkYXRlMyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBS0FBLGVBQUtDLEdBQUwsQ0FBU0Msa0JBQVQ7SUFDUUMsTSxHQUFXSCxjLENBQVhHLE07OztBQUlSQyxTQUFTLFFBQVQsRUFBbUIsWUFBTTtBQUN2QixNQUFJQyxtQkFBSjtBQUNBLE1BQUlDLGtCQUFKOztBQUVBQyxrRkFBTztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUlhUCxlQUFLUSxPQUFMLENBQWFDLGVBQWIsRUFDZkMsSUFEZSxDQUNWLG9CQURVLEVBRWZDLElBRmUsQ0FFVjtBQUNKQyxxQkFBTyxxQkFESDtBQUVKQyx3QkFBVTtBQUZOLGFBRlUsQ0FKYjs7QUFBQTtBQUlDQyxlQUpEOztBQVVMVCx5QkFBYVMsSUFBSUMsSUFBSixDQUFTQyxJQUFULENBQWMsQ0FBZCxFQUFpQkMsS0FBOUI7O0FBVks7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBUDs7QUFlRmIsV0FBUyxTQUFULEVBQW9CLFlBQU07QUFDeEJjLE9BQUcsbUNBQUgsRUFBd0MsVUFBQ0MsSUFBRCxFQUFVO0FBQ2hEbkIscUJBQUtRLE9BQUwsQ0FBYUMsZUFBYixFQUNHVyxHQURILENBQ08sU0FEUCxFQUVHQyxHQUZILENBRU8sVUFBQ0MsR0FBRCxFQUFNUixHQUFOLEVBQWM7QUFDakJYLGVBQU9tQixHQUFQLEVBQVlDLEVBQVosQ0FBZUMsRUFBZixDQUFrQkMsSUFBbEI7QUFDQXRCLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlRyxJQUFmLENBQW9CQyxNQUFwQixDQUEyQixHQUEzQjtBQUNBeEIsZUFBT1csR0FBUCxFQUFZUyxFQUFaLENBQWVLLEdBQWYsQ0FBbUJDLFFBQW5CO0FBQ0ExQixlQUFPVyxJQUFJQyxJQUFYLEVBQWlCUSxFQUFqQixDQUFvQkMsRUFBcEIsQ0FBdUJNLEVBQXZCLENBQTBCLFFBQTFCO0FBQ0FYO0FBQ0QsT0FSSDtBQVNELEtBVkQ7QUFXRCxHQVpEOztBQWNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBZixXQUFTLHFCQUFULEVBQWdDLFlBQU07QUFDcENjLE9BQUcsOENBQUgsRUFBbUQsVUFBQ0MsSUFBRCxFQUFVO0FBQzNEbkIscUJBQUtRLE9BQUwsQ0FBYUMsZUFBYixFQUNDQyxJQURELENBQ00scUJBRE4sRUFFQ0MsSUFGRCxDQUVNb0Isc0JBRk4sRUFHQ1YsR0FIRCxDQUdLLFVBQUNDLEdBQUQsRUFBTVIsR0FBTixFQUFhO0FBQ2hCWCxlQUFPVyxHQUFQLEVBQVlTLEVBQVosQ0FBZUMsRUFBZixDQUFrQlEsSUFBbEI7QUFDQTdCLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlRyxJQUFmLENBQW9CQyxNQUFwQixDQUEyQixHQUEzQjtBQUNBeEIsZUFBT1csSUFBSUMsSUFBSixDQUFTa0IsS0FBaEIsRUFBdUJWLEVBQXZCLENBQTBCVyxLQUExQixDQUFnQyx5QkFBaEM7QUFDQWY7QUFDRCxPQVJEO0FBU0QsS0FWRDs7QUFZQUQsT0FBRywrQkFBSCxFQUFvQyxVQUFDQyxJQUFELEVBQVU7QUFDNUNuQixxQkFBS1EsT0FBTCxDQUFhQyxlQUFiLEVBQ0NDLElBREQsQ0FDTSxxQkFETixFQUVDQyxJQUZELENBRU13QixzQkFGTixFQUdDZCxHQUhELENBR0ssVUFBQ0MsR0FBRCxFQUFNUixHQUFOLEVBQWE7QUFDaEJYLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlQyxFQUFmLENBQWtCUSxJQUFsQjtBQUNBN0IsZUFBT1csR0FBUCxFQUFZUyxFQUFaLENBQWVHLElBQWYsQ0FBb0JDLE1BQXBCLENBQTJCLEdBQTNCO0FBQ0F4QixlQUFPVyxJQUFJQyxJQUFKLENBQVNrQixLQUFoQixFQUF1QlYsRUFBdkIsQ0FBMEJXLEtBQTFCLENBQWdDLDZDQUFoQztBQUNBZjtBQUNELE9BUkQ7QUFTRCxLQVZEOztBQVlBRCxPQUFHLHdCQUFILEVBQTZCLFVBQUNDLElBQUQsRUFBVTtBQUFFO0FBQ3ZDbkIscUJBQUtRLE9BQUwsQ0FBYUMsZUFBYixFQUNHQyxJQURILENBQ1EscUJBRFIsRUFFR0MsSUFGSCxDQUVReUIscUJBRlIsRUFHR2YsR0FISCxDQUdPLFVBQUNDLEdBQUQsRUFBTVIsR0FBTixFQUFjO0FBQ2pCWCxlQUFPbUIsR0FBUCxFQUFZQyxFQUFaLENBQWVDLEVBQWYsQ0FBa0JDLElBQWxCO0FBQ0F0QixlQUFPVyxHQUFQLEVBQVlTLEVBQVosQ0FBZUcsSUFBZixDQUFvQlcsT0FBcEI7QUFDQWxDLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlRyxJQUFmLENBQW9CQyxNQUFwQixDQUEyQixHQUEzQjtBQUNBeEIsZUFBT1csR0FBUCxFQUFZUyxFQUFaLENBQWVLLEdBQWYsQ0FBbUJDLFFBQW5CO0FBQ0ExQixlQUFPVyxJQUFJQyxJQUFYLEVBQWlCUSxFQUFqQixDQUFvQkMsRUFBcEIsQ0FBdUJNLEVBQXZCLENBQTBCLFFBQTFCO0FBQ0FYO0FBQ0QsT0FWSDtBQVdELEtBWkQ7QUFhQUQsT0FBRyw0Q0FBSCxFQUFpRCxVQUFDQyxJQUFELEVBQVU7QUFDekRuQixxQkFBS1EsT0FBTCxDQUFhQyxlQUFiLEVBQ0dDLElBREgsQ0FDUSxxQkFEUixFQUVHQyxJQUZILENBRVE7QUFDSjJCLG1CQUFXLE1BRFA7QUFFSkMsa0JBQVUsS0FGTjtBQUdKQyxtQkFBVyxLQUhQO0FBSUo1QixlQUFPLHVCQUpIO0FBS0o2QixxQkFBYSxNQUxUO0FBTUpDLHFCQUFhLGlCQU5UO0FBT0o3QixrQkFBVTtBQVBOLE9BRlIsRUFXR1EsR0FYSCxDQVdPLFVBQUNDLEdBQUQsRUFBTVIsR0FBTixFQUFjO0FBQ2pCWCxlQUFPVyxHQUFQLEVBQVlTLEVBQVosQ0FBZUMsRUFBZixDQUFrQlEsSUFBbEI7QUFDQTdCLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlRyxJQUFmLENBQW9CQyxNQUFwQixDQUEyQixHQUEzQjtBQUNBeEIsZUFBT1csSUFBSUMsSUFBSixDQUFTa0IsS0FBaEIsRUFBdUJWLEVBQXZCLENBQTBCVyxLQUExQixDQUFnQywrQkFBaEM7QUFDQWY7QUFDRCxPQWhCSDtBQWlCRCxLQWxCRDs7QUFvQkFELE9BQUcsK0JBQUgsRUFBb0MsVUFBQ0MsSUFBRCxFQUFVO0FBQzVDbkIscUJBQUtRLE9BQUwsQ0FBYUMsZUFBYixFQUNHQyxJQURILENBQ1EscUJBRFIsRUFFR0MsSUFGSCxDQUVRO0FBQ0oyQixtQkFBVyxNQURQO0FBRUpDLGtCQUFVLEtBRk47QUFHSkMsbUJBQVcsS0FIUDtBQUlKNUIsZUFBTyx1QkFKSDtBQUtKNkIscUJBQWEsYUFMVDtBQU1KQyxxQkFBYSxFQU5UO0FBT0o3QixrQkFBVTtBQVBOLE9BRlIsRUFXR1EsR0FYSCxDQVdPLFVBQUNDLEdBQUQsRUFBTVIsR0FBTixFQUFjO0FBQ2pCWCxlQUFPVyxHQUFQLEVBQVlTLEVBQVosQ0FBZUMsRUFBZixDQUFrQlEsSUFBbEI7QUFDQTdCLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlRyxJQUFmLENBQW9CQyxNQUFwQixDQUEyQixHQUEzQjtBQUNBeEIsZUFBT1csSUFBSUMsSUFBSixDQUFTa0IsS0FBaEIsRUFBdUJWLEVBQXZCLENBQTBCVyxLQUExQixDQUFnQyx5QkFBaEM7QUFDQWY7QUFDRCxPQWhCSDtBQWlCRCxLQWxCRDtBQW1CQUQsT0FBRyw4QkFBSCxFQUFtQyxVQUFDQyxJQUFELEVBQVU7QUFBRTtBQUM3Q25CLHFCQUFLUSxPQUFMLENBQWFDLGVBQWIsRUFDR0MsSUFESCxDQUNRLHFCQURSLEVBRUdDLElBRkgsQ0FFUWdDLHNCQUZSLEVBR0d0QixHQUhILENBR08sVUFBQ0MsR0FBRCxFQUFNUixHQUFOLEVBQWM7QUFDakJYLGVBQU9tQixHQUFQLEVBQVlDLEVBQVosQ0FBZUMsRUFBZixDQUFrQkMsSUFBbEI7QUFDQXRCLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlRyxJQUFmLENBQW9CVyxPQUFwQjtBQUNBbEMsZUFBT1csR0FBUCxFQUFZUyxFQUFaLENBQWVHLElBQWYsQ0FBb0JDLE1BQXBCLENBQTJCLEdBQTNCO0FBQ0F4QixlQUFPVyxHQUFQLEVBQVlTLEVBQVosQ0FBZUssR0FBZixDQUFtQkMsUUFBbkI7QUFDQTFCLGVBQU9XLElBQUlDLElBQVgsRUFBaUJRLEVBQWpCLENBQW9CQyxFQUFwQixDQUF1Qk0sRUFBdkIsQ0FBMEIsUUFBMUI7QUFDQTNCLGVBQU9XLElBQUlDLElBQUosQ0FBU2tCLEtBQWhCLEVBQXVCVixFQUF2QixDQUEwQlcsS0FBMUIsQ0FBZ0MseUJBQWhDO0FBQ0FmO0FBQ0QsT0FYSDtBQVlELEtBYkQ7QUFjQUQsT0FBRyxpREFBSCxFQUFzRCxVQUFDQyxJQUFELEVBQVU7QUFBRTtBQUNoRW5CLHFCQUFLUSxPQUFMLENBQWFDLGVBQWIsRUFDR0MsSUFESCxDQUNRLHFCQURSLEVBRUdDLElBRkgsQ0FFUWlDLHNCQUZSLEVBR0d2QixHQUhILENBR08sVUFBQ0MsR0FBRCxFQUFNUixHQUFOLEVBQWM7QUFDakJYLGVBQU9tQixHQUFQLEVBQVlDLEVBQVosQ0FBZUMsRUFBZixDQUFrQkMsSUFBbEI7QUFDQXRCLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlRyxJQUFmLENBQW9CVyxPQUFwQjtBQUNBbEMsZUFBT1csR0FBUCxFQUFZUyxFQUFaLENBQWVHLElBQWYsQ0FBb0JDLE1BQXBCLENBQTJCLEdBQTNCO0FBQ0F4QixlQUFPVyxHQUFQLEVBQVlTLEVBQVosQ0FBZUssR0FBZixDQUFtQkMsUUFBbkI7QUFDQTFCLGVBQU9XLElBQUlDLElBQVgsRUFBaUJRLEVBQWpCLENBQW9CQyxFQUFwQixDQUF1Qk0sRUFBdkIsQ0FBMEIsUUFBMUI7QUFDQTNCLGVBQU9XLElBQUlDLElBQUosQ0FBU2tCLEtBQWhCLEVBQXVCVixFQUF2QixDQUEwQlcsS0FBMUIsQ0FBZ0MseUJBQWhDO0FBQ0FmO0FBQ0QsT0FYSDtBQVlELEtBYkQ7QUFjQUQsT0FBRyw0QkFBSCxFQUFpQyxVQUFDQyxJQUFELEVBQVU7QUFDekNuQixxQkFBS1EsT0FBTCxDQUFhQyxlQUFiLEVBQ0dDLElBREgsQ0FDUSxxQkFEUixFQUVHQyxJQUZILENBRVE7QUFDSjJCLG1CQUFXLFNBRFA7QUFFSkMsa0JBQVUsTUFGTjtBQUdKQyxtQkFBVyxRQUhQO0FBSUo1QixlQUFPLG1CQUpIO0FBS0ppQyxxQkFBYSxhQUxUO0FBTUpILHFCQUFhLGVBTlQ7QUFPSjdCLGtCQUFVO0FBUE4sT0FGUixFQVdHUSxHQVhILENBV08sVUFBQ0MsR0FBRCxFQUFNUixHQUFOLEVBQWM7QUFDakJYLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlQyxFQUFmLENBQWtCUSxJQUFsQjtBQUNBN0IsZUFBT1csR0FBUCxFQUFZUyxFQUFaLENBQWVHLElBQWYsQ0FBb0JDLE1BQXBCLENBQTJCLEdBQTNCO0FBQ0F4QixlQUFPVyxJQUFJQyxJQUFKLENBQVNrQixLQUFoQixFQUF1QlYsRUFBdkIsQ0FBMEJXLEtBQTFCLENBQWdDLG9DQUFoQztBQUNBZjtBQUNELE9BaEJIO0FBaUJELEtBbEJEO0FBbUJELEdBNUhEOztBQWdJQTtBQUNBZixXQUFTLG9CQUFULEVBQStCLFlBQU07QUFDbkNjLE9BQUcsdUJBQUgsRUFBNEIsVUFBQ0MsSUFBRCxFQUFVO0FBQUU7QUFDdENuQixxQkFBS1EsT0FBTCxDQUFhQyxlQUFiLEVBQ0dDLElBREgsQ0FDUSxvQkFEUixFQUVHQyxJQUZILENBRVFtQyxvQkFGUixFQUdHekIsR0FISCxDQUdPLFVBQUNDLEdBQUQsRUFBTVIsR0FBTixFQUFjO0FBQ2pCWCxlQUFPbUIsR0FBUCxFQUFZQyxFQUFaLENBQWVDLEVBQWYsQ0FBa0JDLElBQWxCO0FBQ0F0QixlQUFPVyxHQUFQLEVBQVlTLEVBQVosQ0FBZUcsSUFBZixDQUFvQlcsT0FBcEI7QUFDQWxDLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlQyxFQUFmLENBQWtCUSxJQUFsQjtBQUNBN0IsZUFBT1csR0FBUCxFQUFZUyxFQUFaLENBQWVHLElBQWYsQ0FBb0JDLE1BQXBCLENBQTJCLEdBQTNCO0FBQ0F4QixlQUFPVyxHQUFQLEVBQVlTLEVBQVosQ0FBZUssR0FBZixDQUFtQkMsUUFBbkI7QUFDQTFCLGVBQU9XLElBQUlDLElBQVgsRUFBaUJRLEVBQWpCLENBQW9CQyxFQUFwQixDQUF1Qk0sRUFBdkIsQ0FBMEIsUUFBMUI7QUFDQTNCLGVBQU9XLElBQUlDLElBQUosQ0FBU2tCLEtBQWhCLEVBQXVCVixFQUF2QixDQUEwQlcsS0FBMUIsQ0FBZ0Msb0NBQWhDO0FBQ0FmO0FBQ0QsT0FaSDtBQWFELEtBZEQ7QUFlQUQsT0FBRyx1Q0FBSCxFQUE0QyxVQUFDQyxJQUFELEVBQVU7QUFBRTtBQUN0RG5CLHFCQUFLUSxPQUFMLENBQWFDLGVBQWIsRUFDR0MsSUFESCxDQUNRLG9CQURSLEVBRUdDLElBRkgsQ0FFUW9DLHFCQUZSLEVBR0cxQixHQUhILENBR08sVUFBQ0MsR0FBRCxFQUFNUixHQUFOLEVBQWM7QUFDakJYLGVBQU9tQixHQUFQLEVBQVlDLEVBQVosQ0FBZUMsRUFBZixDQUFrQkMsSUFBbEI7QUFDQXRCLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlRyxJQUFmLENBQW9CVyxPQUFwQjtBQUNBbEMsZUFBT1csR0FBUCxFQUFZUyxFQUFaLENBQWVDLEVBQWYsQ0FBa0JRLElBQWxCO0FBQ0E3QixlQUFPVyxHQUFQLEVBQVlTLEVBQVosQ0FBZUcsSUFBZixDQUFvQkMsTUFBcEIsQ0FBMkIsR0FBM0I7QUFDQXhCLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlSyxHQUFmLENBQW1CQyxRQUFuQjtBQUNBMUIsZUFBT1csSUFBSUMsSUFBWCxFQUFpQlEsRUFBakIsQ0FBb0JDLEVBQXBCLENBQXVCTSxFQUF2QixDQUEwQixRQUExQjtBQUNBM0IsZUFBT1csSUFBSUMsSUFBSixDQUFTa0IsS0FBaEIsRUFBdUJWLEVBQXZCLENBQTBCVyxLQUExQixDQUFnQyx5QkFBaEM7QUFDQWY7QUFDRCxPQVpIO0FBYUQsS0FkRDtBQWVBRCxPQUFHLHFEQUFILEVBQTBELFVBQUNDLElBQUQsRUFBVTtBQUFFO0FBQ3BFbkIscUJBQUtRLE9BQUwsQ0FBYUMsZUFBYixFQUNHQyxJQURILENBQ1Esb0JBRFIsRUFFR0MsSUFGSCxDQUVRcUMscUJBRlIsRUFHRzNCLEdBSEgsQ0FHTyxVQUFDQyxHQUFELEVBQU1SLEdBQU4sRUFBYztBQUNqQlgsZUFBT21CLEdBQVAsRUFBWUMsRUFBWixDQUFlQyxFQUFmLENBQWtCQyxJQUFsQjtBQUNBdEIsZUFBT1csR0FBUCxFQUFZUyxFQUFaLENBQWVHLElBQWYsQ0FBb0JXLE9BQXBCO0FBQ0FsQyxlQUFPVyxHQUFQLEVBQVlTLEVBQVosQ0FBZUcsSUFBZixDQUFvQkMsTUFBcEIsQ0FBMkIsR0FBM0I7QUFDQXhCLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlSyxHQUFmLENBQW1CQyxRQUFuQjtBQUNBMUIsZUFBT1csSUFBSUMsSUFBWCxFQUFpQlEsRUFBakIsQ0FBb0JDLEVBQXBCLENBQXVCTSxFQUF2QixDQUEwQixRQUExQjtBQUNBM0IsZUFBT1csSUFBSUMsSUFBSixDQUFTa0IsS0FBaEIsRUFBdUJWLEVBQXZCLENBQTBCVyxLQUExQixDQUFnQyw2Q0FBaEM7QUFDQWY7QUFDRCxPQVhIO0FBWUQsS0FiRDs7QUFlQUQsT0FBRyxzREFBSCxFQUEyRCxVQUFDQyxJQUFELEVBQVU7QUFBRTtBQUNyRW5CLHFCQUFLUSxPQUFMLENBQWFDLGVBQWIsRUFDR0MsSUFESCxDQUNRLG9CQURSLEVBRUdDLElBRkgsQ0FFUXNDLHFCQUZSLEVBR0c1QixHQUhILENBR08sVUFBQ0MsR0FBRCxFQUFNUixHQUFOLEVBQWM7QUFDakJYLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlRyxJQUFmLENBQW9CQyxNQUFwQixDQUEyQixHQUEzQjtBQUNBeEIsZUFBT1csSUFBSUMsSUFBWCxFQUFpQlEsRUFBakIsQ0FBb0JDLEVBQXBCLENBQXVCTSxFQUF2QixDQUEwQixRQUExQjtBQUNBM0IsZUFBT1csSUFBSUMsSUFBSixDQUFTa0IsS0FBaEIsRUFBdUJWLEVBQXZCLENBQTBCVyxLQUExQixDQUFnQyx1QkFBaEM7QUFDQWY7QUFDRCxPQVJIO0FBU0QsS0FWRDs7QUFZQUQsT0FBRyxrQkFBSCxFQUF1QixVQUFDQyxJQUFELEVBQVU7QUFBRTtBQUNqQ25CLHFCQUFLUSxPQUFMLENBQWFDLGVBQWIsRUFDR0MsSUFESCxDQUNRLG9CQURSLEVBRUdDLElBRkgsQ0FFUTtBQUNGQyxlQUFPLG1CQURMO0FBRUZDLGtCQUFVO0FBRlIsT0FGUixFQU1HUSxHQU5ILENBTU8sVUFBQ0MsR0FBRCxFQUFNUixHQUFOLEVBQWM7QUFDakJYLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlQyxFQUFmLENBQWtCUSxJQUFsQjtBQUNBN0IsZUFBT1csR0FBUCxFQUFZUyxFQUFaLENBQWVHLElBQWYsQ0FBb0JDLE1BQXBCLENBQTJCLEdBQTNCO0FBQ0F4QixlQUFPVyxJQUFJQyxJQUFKLENBQVNDLElBQVQsQ0FBYyxDQUFkLEVBQWlCa0MsSUFBakIsQ0FBc0J0QyxLQUE3QixFQUFvQ1csRUFBcEMsQ0FBdUNXLEtBQXZDLENBQTZDLG1CQUE3QztBQUNBZjtBQUNELE9BWEg7QUFZRCxLQWJEO0FBY0QsR0F4RUQ7O0FBMEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBZixXQUFTLHFCQUFULEVBQWdDLFlBQU07QUFDcENjLE9BQUcsaUNBQUgsRUFBc0MsVUFBQ0MsSUFBRCxFQUFVO0FBQzlDbkIscUJBQUtRLE9BQUwsQ0FBYUMsZUFBYixFQUNHQyxJQURILENBQ1EsaUJBRFIsRUFFR0MsSUFGSCxDQUVRd0MscUJBRlIsRUFHRzlCLEdBSEgsQ0FHTyxVQUFDQyxHQUFELEVBQU1SLEdBQU4sRUFBYztBQUNqQlgsZUFBT1csR0FBUCxFQUFZUyxFQUFaLENBQWVDLEVBQWYsQ0FBa0JRLElBQWxCO0FBQ0U3QixlQUFPVyxHQUFQLEVBQVlTLEVBQVosQ0FBZUcsSUFBZixDQUFvQkMsTUFBcEIsQ0FBMkIsR0FBM0I7QUFDQXhCLGVBQU9XLElBQUlDLElBQUosQ0FBU2tCLEtBQWhCLEVBQXVCVixFQUF2QixDQUEwQlcsS0FBMUIsQ0FBZ0Msc0JBQWhDO0FBQ0FmO0FBQ0gsT0FSSDtBQVNELEtBVkQ7QUFXQUQsT0FBRyw4QkFBSCxFQUFtQyxVQUFDQyxJQUFELEVBQVU7QUFDM0NuQixxQkFBS1EsT0FBTCxDQUFhQyxlQUFiLEVBQ0dDLElBREgsQ0FDUSxpQkFEUixFQUVHMEMsR0FGSCxDQUVPLGdCQUZQLE9BRTRCL0MsVUFGNUIsRUFHR00sSUFISCxDQUdRMEMsd0JBSFIsRUFJR2hDLEdBSkgsQ0FJTyxVQUFDQyxHQUFELEVBQU1SLEdBQU4sRUFBYztBQUNqQlgsZUFBT1csR0FBUCxFQUFZUyxFQUFaLENBQWVDLEVBQWYsQ0FBa0JRLElBQWxCO0FBQ0E3QixlQUFPVyxHQUFQLEVBQVlTLEVBQVosQ0FBZUcsSUFBZixDQUFvQkMsTUFBcEIsQ0FBMkIsR0FBM0I7QUFDQXhCLGVBQU9XLElBQUlDLElBQUosQ0FBU2tCLEtBQWhCLEVBQXVCVixFQUF2QixDQUEwQlcsS0FBMUIsQ0FBZ0Msc0JBQWhDO0FBQ0FmO0FBQ0QsT0FUSDtBQVVELEtBWEQ7O0FBYUFELE9BQUcsbUNBQUgsRUFBd0MsVUFBQ0MsSUFBRCxFQUFVO0FBQ2hEbkIscUJBQUtRLE9BQUwsQ0FBYUMsZUFBYixFQUNHQyxJQURILENBQ1EsaUJBRFIsRUFFRzBDLEdBRkgsQ0FFTyxnQkFGUCxPQUU0Qi9DLFVBRjVCLEVBR0dNLElBSEgsQ0FHUTJDLHlCQUhSLEVBSUdqQyxHQUpILENBSU8sVUFBQ0MsR0FBRCxFQUFNUixHQUFOLEVBQWM7QUFDakJYLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlQyxFQUFmLENBQWtCUSxJQUFsQjtBQUNBN0IsZUFBT1csR0FBUCxFQUFZUyxFQUFaLENBQWVHLElBQWYsQ0FBb0JDLE1BQXBCLENBQTJCLEdBQTNCO0FBQ0F4QixlQUFPVyxJQUFJQyxJQUFKLENBQVNrQixLQUFoQixFQUF1QlYsRUFBdkIsQ0FBMEJXLEtBQTFCLENBQWdDLHdCQUFoQztBQUNBZjtBQUNELE9BVEg7QUFVRCxLQVhEOztBQWFBRCxPQUFHLGlDQUFILEVBQXNDLFVBQUNDLElBQUQsRUFBVTtBQUM5Q25CLHFCQUFLUSxPQUFMLENBQWFDLGVBQWIsRUFDR0MsSUFESCxDQUNRLGlCQURSLEVBRUcwQyxHQUZILENBRU8sZ0JBRlAsT0FFNEIvQyxVQUY1QixFQUdHTSxJQUhILENBR1E0Qyx5QkFIUixFQUlHbEMsR0FKSCxDQUlPLFVBQUNDLEdBQUQsRUFBTVIsR0FBTixFQUFjO0FBQ2pCWCxlQUFPVyxHQUFQLEVBQVlTLEVBQVosQ0FBZUMsRUFBZixDQUFrQlEsSUFBbEI7QUFDQTdCLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlRyxJQUFmLENBQW9CQyxNQUFwQixDQUEyQixHQUEzQjtBQUNBeEIsZUFBT1csSUFBSUMsSUFBSixDQUFTa0IsS0FBaEIsRUFBdUJWLEVBQXZCLENBQTBCVyxLQUExQixDQUFnQyxxQkFBaEM7QUFDQWY7QUFDRCxPQVRIO0FBVUQsS0FYRDs7QUFhQUQsT0FBRyxzQ0FBSCxFQUEyQyxVQUFDQyxJQUFELEVBQVU7QUFDbkRuQixxQkFBS1EsT0FBTCxDQUFhQyxlQUFiLEVBQ0dDLElBREgsQ0FDUSxpQkFEUixFQUVHMEMsR0FGSCxDQUVPLGdCQUZQLE9BRTRCL0MsVUFGNUIsRUFHR00sSUFISCxDQUdRNkMseUJBSFIsRUFJR25DLEdBSkgsQ0FJTyxVQUFDQyxHQUFELEVBQU1SLEdBQU4sRUFBYztBQUNqQlgsZUFBT1csR0FBUCxFQUFZUyxFQUFaLENBQWVDLEVBQWYsQ0FBa0JRLElBQWxCO0FBQ0E3QixlQUFPVyxHQUFQLEVBQVlTLEVBQVosQ0FBZUcsSUFBZixDQUFvQkMsTUFBcEIsQ0FBMkIsR0FBM0I7QUFDQXhCLGVBQU9XLElBQUlDLElBQUosQ0FBU2tCLEtBQWhCLEVBQXVCVixFQUF2QixDQUEwQlcsS0FBMUIsQ0FBZ0Msb0NBQWhDO0FBQ0FmO0FBQ0QsT0FUSDtBQVVELEtBWEQ7O0FBYUFELE9BQUcsMEJBQUgsRUFBK0IsVUFBQ0MsSUFBRCxFQUFVO0FBQ3ZDbkIscUJBQUtRLE9BQUwsQ0FBYUMsZUFBYixFQUNHQyxJQURILENBQ1EsaUJBRFIsRUFFRzBDLEdBRkgsQ0FFTyxnQkFGUCxPQUU0Qi9DLFVBRjVCLEVBR0dNLElBSEgsQ0FHUThDLHlCQUhSLEVBSUdwQyxHQUpILENBSU8sVUFBQ0MsR0FBRCxFQUFNUixHQUFOLEVBQWM7QUFDakJYLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlQyxFQUFmLENBQWtCUSxJQUFsQjtBQUNBN0IsZUFBT1csR0FBUCxFQUFZUyxFQUFaLENBQWVHLElBQWYsQ0FBb0JDLE1BQXBCLENBQTJCLEdBQTNCO0FBQ0F4QixlQUFPVyxJQUFJQyxJQUFKLENBQVNrQixLQUFoQixFQUF1QlYsRUFBdkIsQ0FBMEJXLEtBQTFCLENBQWdDLGdCQUFoQztBQUNBZjtBQUNELE9BVEg7QUFVRCxLQVhEOztBQWFBRCxPQUFHLDBCQUFILEVBQStCLFVBQUNDLElBQUQsRUFBVTtBQUN2Q25CLHFCQUFLUSxPQUFMLENBQWFDLGVBQWIsRUFDR0MsSUFESCxDQUNRLGlCQURSLEVBRUcwQyxHQUZILENBRU8sZ0JBRlAsT0FFNEIvQyxVQUY1QixFQUdHTSxJQUhILENBR1ErQyx5QkFIUixFQUlHckMsR0FKSCxDQUlPLFVBQUNDLEdBQUQsRUFBTVIsR0FBTixFQUFjO0FBQ2pCWCxlQUFPVyxHQUFQLEVBQVlTLEVBQVosQ0FBZUMsRUFBZixDQUFrQlEsSUFBbEI7QUFDQTdCLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlRyxJQUFmLENBQW9CQyxNQUFwQixDQUEyQixHQUEzQjtBQUNBeEIsZUFBT1csSUFBSUMsSUFBSixDQUFTa0IsS0FBaEIsRUFBdUJWLEVBQXZCLENBQTBCVyxLQUExQixDQUFnQyw2QkFBaEM7QUFDQWY7QUFDRCxPQVRIO0FBVUQsS0FYRDs7QUFhQUQsT0FBRywrQkFBSCxFQUFvQyxVQUFDQyxJQUFELEVBQVU7QUFDNUNuQixxQkFBS1EsT0FBTCxDQUFhQyxlQUFiLEVBQ0dDLElBREgsQ0FDUSxpQkFEUixFQUVHMEMsR0FGSCxDQUVPLGdCQUZQLE9BRTRCL0MsVUFGNUIsRUFHR00sSUFISCxDQUdRZ0QseUJBSFIsRUFJR3RDLEdBSkgsQ0FJTyxVQUFDQyxHQUFELEVBQU1SLEdBQU4sRUFBYztBQUNqQlgsZUFBT1csR0FBUCxFQUFZUyxFQUFaLENBQWVDLEVBQWYsQ0FBa0JRLElBQWxCO0FBQ0E3QixlQUFPVyxHQUFQLEVBQVlTLEVBQVosQ0FBZUcsSUFBZixDQUFvQkMsTUFBcEIsQ0FBMkIsR0FBM0I7QUFDQXhCLGVBQU9XLElBQUlDLElBQUosQ0FBU2tCLEtBQWhCLEVBQXVCVixFQUF2QixDQUEwQlcsS0FBMUIsQ0FBZ0MsOEJBQWhDO0FBQ0FmO0FBQ0QsT0FUSDtBQVVELEtBWEQ7O0FBYUFELE9BQUcscUJBQUgsRUFBMEIsVUFBQ0MsSUFBRCxFQUFVO0FBQ2xDbkIscUJBQUtRLE9BQUwsQ0FBYUMsZUFBYixFQUNHQyxJQURILENBQ1EsaUJBRFIsRUFFRzBDLEdBRkgsQ0FFTyxnQkFGUCxPQUU0Qi9DLFVBRjVCLEVBR0dNLElBSEgsQ0FHUWlELHlCQUhSLEVBSUd2QyxHQUpILENBSU8sVUFBQ0MsR0FBRCxFQUFNUixHQUFOLEVBQWM7QUFDakJYLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlQyxFQUFmLENBQWtCUSxJQUFsQjtBQUNBN0IsZUFBT1csR0FBUCxFQUFZUyxFQUFaLENBQWVHLElBQWYsQ0FBb0JDLE1BQXBCLENBQTJCLEdBQTNCO0FBQ0F4QixlQUFPVyxJQUFJQyxJQUFKLENBQVNrQixLQUFoQixFQUF1QlYsRUFBdkIsQ0FBMEJXLEtBQTFCLENBQWdDLHFCQUFoQztBQUNBZjtBQUNELE9BVEg7QUFVRCxLQVhEO0FBWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRCxHQWhJRDs7QUFrSUE7QUFDQWYsV0FBUyxvQkFBVCxFQUErQixZQUFNO0FBQ3BDYyxPQUFHLDZCQUFILEVBQWtDLFVBQUNDLElBQUQsRUFBVTtBQUN6Q25CLHFCQUFLUSxPQUFMLENBQWFDLGVBQWIsRUFDR1csR0FESCxDQUNPLHNEQURQLEVBRUdDLEdBRkgsQ0FFTyxVQUFDQyxHQUFELEVBQU1SLEdBQU4sRUFBYztBQUNqQlgsZUFBT1csR0FBUCxFQUFZUyxFQUFaLENBQWVDLEVBQWYsQ0FBa0JRLElBQWxCO0FBQ0E3QixlQUFPVyxHQUFQLEVBQVlTLEVBQVosQ0FBZUcsSUFBZixDQUFvQkMsTUFBcEIsQ0FBMkIsR0FBM0I7QUFDQXhCLGVBQU9XLElBQUlDLElBQUosQ0FBU2tCLEtBQWhCLEVBQXVCVixFQUF2QixDQUEwQlcsS0FBMUIsQ0FBZ0Msc0JBQWhDO0FBQ0FmO0FBQ0QsT0FQSDtBQVFGLEtBVEQ7O0FBV0FELE9BQUcseUNBQUgsRUFBOEMsVUFBQ0MsSUFBRCxFQUFVO0FBQ3ZEbkIscUJBQUtRLE9BQUwsQ0FBYUMsZUFBYixFQUNHVyxHQURILENBQ08sMEJBRFAsRUFFR2dDLEdBRkgsQ0FFTyxnQkFGUCxPQUU0Qi9DLFVBRjVCLEVBR0dnQixHQUhILENBR08sVUFBQ0MsR0FBRCxFQUFNUixHQUFOLEVBQWM7QUFDakJYLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlQyxFQUFmLENBQWtCUSxJQUFsQjtBQUNBN0IsZUFBT1csR0FBUCxFQUFZUyxFQUFaLENBQWVHLElBQWYsQ0FBb0JDLE1BQXBCLENBQTJCLEdBQTNCO0FBQ0F4QixlQUFPVyxJQUFJQyxJQUFKLENBQVNrQixLQUFoQixFQUF1QlYsRUFBdkIsQ0FBMEJXLEtBQTFCLENBQWdDLDZCQUFoQztBQUNBZjtBQUNELE9BUkg7QUFTQyxLQVZGOztBQVlDRCxPQUFHLHlDQUFILEVBQThDLFVBQUNDLElBQUQsRUFBVTtBQUN0RG5CLHFCQUFLUSxPQUFMLENBQWFDLGVBQWIsRUFDR1csR0FESCxDQUNPLHNEQURQLEVBRUdnQyxHQUZILENBRU8sZ0JBRlAsT0FFNEIvQyxVQUY1QixFQUdHZ0IsR0FISCxDQUdPLFVBQUNDLEdBQUQsRUFBTVIsR0FBTixFQUFjO0FBQ2pCWCxlQUFPVyxHQUFQLEVBQVlTLEVBQVosQ0FBZUMsRUFBZixDQUFrQlEsSUFBbEI7QUFDQTdCLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlRyxJQUFmLENBQW9CQyxNQUFwQixDQUEyQixHQUEzQjtBQUNBeEIsZUFBT1csSUFBSUMsSUFBSixDQUFTa0IsS0FBaEIsRUFBdUJWLEVBQXZCLENBQTBCVyxLQUExQixDQUFnQyxpQkFBaEM7QUFDQWY7QUFDRCxPQVJIO0FBU0MsS0FWSDs7QUFZRUQsT0FBRyxvQ0FBSCxFQUF5QyxVQUFDQyxJQUFELEVBQVU7QUFDakRuQixxQkFBS1EsT0FBTCxDQUFhQyxlQUFiLEVBQ0dXLEdBREgsQ0FDTyxzREFEUCxFQUVHZ0MsR0FGSCxDQUVPLGdCQUZQLE9BRTRCL0MsVUFGNUIsRUFHR2dCLEdBSEgsQ0FHTyxVQUFDQyxHQUFELEVBQU1SLEdBQU4sRUFBYztBQUNuQlgsZUFBT1csR0FBUCxFQUFZUyxFQUFaLENBQWVDLEVBQWYsQ0FBa0JRLElBQWxCO0FBQ0E3QixlQUFPVyxHQUFQLEVBQVlTLEVBQVosQ0FBZUcsSUFBZixDQUFvQkMsTUFBcEIsQ0FBMkIsR0FBM0I7QUFDQXhCLGVBQU9XLElBQUlDLElBQUosQ0FBU0MsSUFBVCxDQUFjLENBQWQsRUFBaUI2QyxLQUFqQixDQUF1QkMsSUFBOUIsRUFBb0N2QyxFQUFwQyxDQUF1Q1csS0FBdkMsQ0FBNkMsaUJBQTdDO0FBQ0EvQixlQUFPVyxJQUFJQyxJQUFKLENBQVNDLElBQVQsQ0FBYyxDQUFkLEVBQWlCNkMsS0FBakIsQ0FBdUJFLFNBQTlCLEVBQXlDeEMsRUFBekMsQ0FBNENXLEtBQTVDLENBQWtELEtBQWxEO0FBQ0EvQixlQUFPVyxJQUFJQyxJQUFKLENBQVNDLElBQVQsQ0FBYyxDQUFkLEVBQWlCNkMsS0FBakIsQ0FBdUJHLE9BQTlCLEVBQXVDekMsRUFBdkMsQ0FBMENXLEtBQTFDLENBQWdELGdCQUFoRDtBQUNBZjtBQUNDLE9BVkg7QUFXQyxLQVpIO0FBYUgsR0FqREQ7O0FBbURBO0FBQ0FmLFdBQVMsb0JBQVQsRUFBK0IsWUFBTTtBQUNuQ2MsT0FBRyxvREFBSCxFQUF5RCxVQUFDQyxJQUFELEVBQVU7QUFDakVuQixxQkFBS1EsT0FBTCxDQUFhQyxlQUFiLEVBQ0NXLEdBREQsQ0FDSyxpQkFETCxFQUVDZ0MsR0FGRCxDQUVLLGdCQUZMLE9BRTBCL0MsVUFGMUIsRUFHQ2dCLEdBSEQsQ0FHSyxVQUFDQyxHQUFELEVBQU1SLEdBQU4sRUFBYztBQUNuQlgsZUFBT1csR0FBUCxFQUFZUyxFQUFaLENBQWVDLEVBQWYsQ0FBa0JRLElBQWxCO0FBQ0E3QixlQUFPVyxHQUFQLEVBQVlTLEVBQVosQ0FBZUcsSUFBZixDQUFvQkMsTUFBcEIsQ0FBMkIsR0FBM0I7QUFDQVI7QUFDQyxPQVBEO0FBUUQsS0FURDtBQVVELEdBWEQ7O0FBYUE7QUFDQWYsV0FBUyxzQkFBVCxFQUFpQyxZQUFNO0FBQ3JDYyxPQUFHLHNEQUFILEVBQTJELFVBQUNDLElBQUQsRUFBVTtBQUNuRW5CLHFCQUFLUSxPQUFMLENBQWFDLGVBQWIsRUFDQ3dELEtBREQsQ0FDTywyREFEUCxFQUVDdEQsSUFGRCxDQUVNO0FBQ0ptRCxjQUFNO0FBREYsT0FGTixFQUtDekMsR0FMRCxDQUtLLFVBQUNDLEdBQUQsRUFBTVIsR0FBTixFQUFjO0FBQ2pCWCxlQUFPVyxHQUFQLEVBQVlTLEVBQVosQ0FBZUMsRUFBZixDQUFrQlEsSUFBbEI7QUFDQTdCLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlRyxJQUFmLENBQW9CQyxNQUFwQixDQUEyQixHQUEzQjtBQUNBeEIsZUFBT1csSUFBSUMsSUFBSixDQUFTa0IsS0FBaEIsRUFBdUJWLEVBQXZCLENBQTBCVyxLQUExQixDQUFnQyxzQkFBaEM7QUFDQWY7QUFDRCxPQVZEO0FBV0QsS0FaRDs7QUFjQUQsT0FBRyx1REFBSCxFQUE0RCxVQUFDQyxJQUFELEVBQVU7QUFDcEVuQixxQkFBS1EsT0FBTCxDQUFhQyxlQUFiLEVBQ0N3RCxLQURELENBQ08sMkRBRFAsRUFFQ2IsR0FGRCxDQUVLLGdCQUZMLE9BRTBCL0MsVUFGMUIsRUFHQ00sSUFIRCxDQUdNO0FBQ0ptRCxjQUFNO0FBREYsT0FITixFQU1DekMsR0FORCxDQU1LLFVBQUNDLEdBQUQsRUFBTVIsR0FBTixFQUFjO0FBQ2pCWCxlQUFPVyxHQUFQLEVBQVlTLEVBQVosQ0FBZUMsRUFBZixDQUFrQlEsSUFBbEI7QUFDQTdCLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlRyxJQUFmLENBQW9CQyxNQUFwQixDQUEyQixHQUEzQjtBQUNBeEIsZUFBT1csSUFBSUMsSUFBSixDQUFTa0IsS0FBaEIsRUFBdUJWLEVBQXZCLENBQTBCVyxLQUExQixDQUFnQyxrQ0FBaEM7QUFDQWY7QUFDRCxPQVhEO0FBWUQsS0FiRDs7QUFlQUQsT0FBRywwREFBSCxFQUErRCxVQUFDQyxJQUFELEVBQVU7QUFDdkVuQixxQkFBS1EsT0FBTCxDQUFhQyxlQUFiLEVBQ0N3RCxLQURELENBQ08sMkRBRFAsRUFFQ2IsR0FGRCxDQUVLLGdCQUZMLE9BRTBCL0MsVUFGMUIsRUFHQ00sSUFIRCxDQUdNO0FBQ0ptRCxjQUFNO0FBREYsT0FITixFQU1DekMsR0FORCxDQU1LLFVBQUNDLEdBQUQsRUFBTVIsR0FBTixFQUFjO0FBQ2pCWCxlQUFPVyxHQUFQLEVBQVlTLEVBQVosQ0FBZUMsRUFBZixDQUFrQlEsSUFBbEI7QUFDQTdCLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlRyxJQUFmLENBQW9CQyxNQUFwQixDQUEyQixHQUEzQjtBQUNBeEIsZUFBT1csSUFBSUMsSUFBSixDQUFTa0IsS0FBaEIsRUFBdUJWLEVBQXZCLENBQTBCVyxLQUExQixDQUFnQyxpQkFBaEM7QUFDQWY7QUFDRCxPQVhEO0FBWUQsS0FiRDs7QUFlQUQsT0FBRywwREFBSCxFQUErRCxVQUFDQyxJQUFELEVBQVU7QUFDdkVuQixxQkFBS1EsT0FBTCxDQUFhQyxlQUFiLEVBQ0N3RCxLQURELENBQ08scURBRFAsRUFFQ2IsR0FGRCxDQUVLLGdCQUZMLE9BRTBCL0MsVUFGMUIsRUFHQ00sSUFIRCxDQUdNO0FBQ0ptRCxjQUFNO0FBREYsT0FITixFQU1DekMsR0FORCxDQU1LLFVBQUNDLEdBQUQsRUFBTVIsR0FBTixFQUFjO0FBQ2pCWCxlQUFPVyxHQUFQLEVBQVlTLEVBQVosQ0FBZUMsRUFBZixDQUFrQlEsSUFBbEI7QUFDQTdCLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlRyxJQUFmLENBQW9CQyxNQUFwQixDQUEyQixHQUEzQjtBQUNBeEIsZUFBT1csSUFBSUMsSUFBSixDQUFTa0IsS0FBaEIsRUFBdUJWLEVBQXZCLENBQTBCVyxLQUExQixDQUFnQyxxREFBaEM7QUFDQWY7QUFDRCxPQVhEO0FBWUQsS0FiRDs7QUFlQUQsT0FBRyxpQ0FBSCxFQUFzQyxVQUFDQyxJQUFELEVBQVU7QUFDOUNuQixxQkFBS1EsT0FBTCxDQUFhQyxlQUFiLEVBQ0N3RCxLQURELENBQ08sMkRBRFAsRUFFQ2IsR0FGRCxDQUVLLGdCQUZMLE9BRTBCL0MsVUFGMUIsRUFHQ00sSUFIRCxDQUdNO0FBQ0ptRCxjQUFNO0FBREYsT0FITixFQU1DekMsR0FORCxDQU1LLFVBQUNDLEdBQUQsRUFBTVIsR0FBTixFQUFjO0FBQ2pCWCxlQUFPVyxHQUFQLEVBQVlTLEVBQVosQ0FBZUMsRUFBZixDQUFrQlEsSUFBbEI7QUFDQTdCLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlRyxJQUFmLENBQW9CQyxNQUFwQixDQUEyQixHQUEzQjtBQUNBUjtBQUNELE9BVkQ7QUFXRCxLQVpEO0FBYUQsR0F6RUQ7O0FBMkVBO0FBQ0FmLFdBQVMsdUJBQVQsRUFBa0MsWUFBTTtBQUN0Q2MsT0FBRywrQ0FBSCxFQUFvRCxVQUFDQyxJQUFELEVBQVU7QUFDNURuQixxQkFBS1EsT0FBTCxDQUFhQyxlQUFiLEVBQ0N5RCxNQURELENBQ1Esc0RBRFIsRUFFQzdDLEdBRkQsQ0FFSyxVQUFDQyxHQUFELEVBQU1SLEdBQU4sRUFBYztBQUNqQlgsZUFBT1csR0FBUCxFQUFZUyxFQUFaLENBQWVDLEVBQWYsQ0FBa0JRLElBQWxCO0FBQ0E3QixlQUFPVyxHQUFQLEVBQVlTLEVBQVosQ0FBZUcsSUFBZixDQUFvQkMsTUFBcEIsQ0FBMkIsR0FBM0I7QUFDQXhCLGVBQU9XLElBQUlDLElBQUosQ0FBU2tCLEtBQWhCLEVBQXVCVixFQUF2QixDQUEwQlcsS0FBMUIsQ0FBZ0Msc0JBQWhDO0FBQ0FmO0FBQ0QsT0FQRDtBQVFELEtBVEQ7O0FBV0FELE9BQUcsOENBQUgsRUFBbUQsVUFBQ0MsSUFBRCxFQUFVO0FBQzNEbkIscUJBQUtRLE9BQUwsQ0FBYUMsZUFBYixFQUNDeUQsTUFERCxDQUNRLHNEQURSLEVBRUNkLEdBRkQsQ0FFSyxnQkFGTCxPQUUwQi9DLFVBRjFCLEVBR0NnQixHQUhELENBR0ssVUFBQ0MsR0FBRCxFQUFNUixHQUFOLEVBQWM7QUFDakJYLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlQyxFQUFmLENBQWtCUSxJQUFsQjtBQUNBN0IsZUFBT1csR0FBUCxFQUFZUyxFQUFaLENBQWVHLElBQWYsQ0FBb0JDLE1BQXBCLENBQTJCLEdBQTNCO0FBQ0F4QixlQUFPVyxJQUFJQyxJQUFKLENBQVNrQixLQUFoQixFQUF1QlYsRUFBdkIsQ0FBMEJXLEtBQTFCLENBQWdDLEdBQWhDO0FBQ0EvQixlQUFPVyxJQUFJQyxJQUFKLENBQVNvRCxPQUFoQixFQUF5QjVDLEVBQXpCLENBQTRCVyxLQUE1QixDQUFrQyxpQkFBbEM7QUFDQWY7QUFDRCxPQVREO0FBVUQsS0FYRDtBQVlELEdBeEJEOztBQTJCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQWYsV0FBUyxzQkFBVCxFQUFpQyxZQUFNO0FBQ3JDYyxPQUFHLGlDQUFILEVBQXNDLFVBQUNDLElBQUQsRUFBVTtBQUM5Q25CLHFCQUFLUSxPQUFMLENBQWFDLGVBQWIsRUFDR0MsSUFESCxDQUNRLGlCQURSLEVBRUdDLElBRkgsQ0FFUXlELG1CQUZSLEVBR0cvQyxHQUhILENBR08sVUFBQ0MsR0FBRCxFQUFNUixHQUFOLEVBQWM7QUFDakJYLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlQyxFQUFmLENBQWtCUSxJQUFsQjtBQUNFN0IsZUFBT1csR0FBUCxFQUFZUyxFQUFaLENBQWVHLElBQWYsQ0FBb0JDLE1BQXBCLENBQTJCLEdBQTNCO0FBQ0F4QixlQUFPVyxJQUFJQyxJQUFKLENBQVNrQixLQUFoQixFQUF1QlYsRUFBdkIsQ0FBMEJXLEtBQTFCLENBQWdDLHNCQUFoQztBQUNBZjtBQUNILE9BUkg7QUFTRCxLQVZEO0FBV0FELE9BQUcsK0JBQUgsRUFBb0MsVUFBQ0MsSUFBRCxFQUFVO0FBQzVDbkIscUJBQUtRLE9BQUwsQ0FBYUMsZUFBYixFQUNHQyxJQURILENBQ1EsaUJBRFIsRUFFRzBDLEdBRkgsQ0FFTyxnQkFGUCxPQUU0Qi9DLFVBRjVCLEVBR0dNLElBSEgsQ0FHUTBELG9CQUhSLEVBSUdoRCxHQUpILENBSU8sVUFBQ0MsR0FBRCxFQUFNUixHQUFOLEVBQWM7QUFDakJYLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlQyxFQUFmLENBQWtCUSxJQUFsQjtBQUNBN0IsZUFBT1csR0FBUCxFQUFZUyxFQUFaLENBQWVHLElBQWYsQ0FBb0JDLE1BQXBCLENBQTJCLEdBQTNCO0FBQ0F4QixlQUFPVyxJQUFJQyxJQUFKLENBQVNrQixLQUFoQixFQUF1QlYsRUFBdkIsQ0FBMEJXLEtBQTFCLENBQWdDLHFCQUFoQztBQUNBZjtBQUNELE9BVEg7QUFVRCxLQVhEOztBQWFBRCxPQUFHLHFDQUFILEVBQTBDLFVBQUNDLElBQUQsRUFBVTtBQUNsRG5CLHFCQUFLUSxPQUFMLENBQWFDLGVBQWIsRUFDR0MsSUFESCxDQUNRLGlCQURSLEVBRUcwQyxHQUZILENBRU8sZ0JBRlAsT0FFNEIvQyxVQUY1QixFQUdHTSxJQUhILENBR1EyRCxvQkFIUixFQUlHakQsR0FKSCxDQUlPLFVBQUNDLEdBQUQsRUFBTVIsR0FBTixFQUFjO0FBQ2pCWCxlQUFPVyxHQUFQLEVBQVlTLEVBQVosQ0FBZUMsRUFBZixDQUFrQlEsSUFBbEI7QUFDQTdCLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlRyxJQUFmLENBQW9CQyxNQUFwQixDQUEyQixHQUEzQjtBQUNBeEIsZUFBT1csSUFBSUMsSUFBSixDQUFTa0IsS0FBaEIsRUFBdUJWLEVBQXZCLENBQTBCVyxLQUExQixDQUFnQyxxQkFBaEM7QUFDQWY7QUFDRCxPQVRIO0FBVUQsS0FYRDs7QUFhQUQsT0FBRyx1Q0FBSCxFQUE0QyxVQUFDQyxJQUFELEVBQVU7QUFDcERuQixxQkFBS1EsT0FBTCxDQUFhQyxlQUFiLEVBQ0dDLElBREgsQ0FDUSxpQkFEUixFQUVHMEMsR0FGSCxDQUVPLGdCQUZQLE9BRTRCL0MsVUFGNUIsRUFHR00sSUFISCxDQUdRNEQsb0JBSFIsRUFJR2xELEdBSkgsQ0FJTyxVQUFDQyxHQUFELEVBQU1SLEdBQU4sRUFBYztBQUNqQlgsZUFBT1csR0FBUCxFQUFZUyxFQUFaLENBQWVDLEVBQWYsQ0FBa0JRLElBQWxCO0FBQ0E3QixlQUFPVyxHQUFQLEVBQVlTLEVBQVosQ0FBZUcsSUFBZixDQUFvQkMsTUFBcEIsQ0FBMkIsR0FBM0I7QUFDQXhCLGVBQU9XLElBQUlDLElBQUosQ0FBU2tCLEtBQWhCLEVBQXVCVixFQUF2QixDQUEwQlcsS0FBMUIsQ0FBZ0Msb0NBQWhDO0FBQ0FmO0FBQ0QsT0FUSDtBQVVELEtBWEQ7O0FBY0FELE9BQUcsb0RBQUgsRUFBeUQsVUFBQ0MsSUFBRCxFQUFVO0FBQ2pFbkIscUJBQUtRLE9BQUwsQ0FBYUMsZUFBYixFQUNHQyxJQURILENBQ1EsaUJBRFIsRUFFRzBDLEdBRkgsQ0FFTyxnQkFGUCxPQUU0Qi9DLFVBRjVCLEVBR0dNLElBSEgsQ0FHUTZELG9CQUhSLEVBSUduRCxHQUpILENBSU8sVUFBQ0MsR0FBRCxFQUFNUixHQUFOLEVBQWM7QUFDakJYLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlQyxFQUFmLENBQWtCUSxJQUFsQjtBQUNBN0IsZUFBT1csR0FBUCxFQUFZUyxFQUFaLENBQWVHLElBQWYsQ0FBb0JDLE1BQXBCLENBQTJCLEdBQTNCO0FBQ0F4QixlQUFPVyxJQUFJQyxJQUFKLENBQVNrQixLQUFoQixFQUF1QlYsRUFBdkIsQ0FBMEJXLEtBQTFCLENBQWdDLGdCQUFoQztBQUNBZjtBQUNELE9BVEg7QUFVRCxLQVhEOztBQWFBRCxPQUFHLCtDQUFILEVBQW9ELFVBQUNDLElBQUQsRUFBVTtBQUM1RG5CLHFCQUFLUSxPQUFMLENBQWFDLGVBQWIsRUFDR0MsSUFESCxDQUNRLGlCQURSLEVBRUcwQyxHQUZILENBRU8sZ0JBRlAsT0FFNEIvQyxVQUY1QixFQUdHTSxJQUhILENBR1E7QUFDSm1ELGNBQU0sWUFERjtBQUVKVyxjQUFLO0FBRkQsT0FIUixFQU9HcEQsR0FQSCxDQU9PLFVBQUNDLEdBQUQsRUFBTVIsR0FBTixFQUFjO0FBQ2pCWCxlQUFPVyxHQUFQLEVBQVlTLEVBQVosQ0FBZUMsRUFBZixDQUFrQlEsSUFBbEI7QUFDQTdCLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlRyxJQUFmLENBQW9CQyxNQUFwQixDQUEyQixHQUEzQjtBQUNBeEIsZUFBT1csSUFBSUMsSUFBSixDQUFTa0IsS0FBaEIsRUFBdUJWLEVBQXZCLENBQTBCVyxLQUExQixDQUFnQyxzQkFBaEM7QUFDQWY7QUFDRCxPQVpIO0FBYUQsS0FkRDtBQWVGO0FBQ0VELE9BQUcsaUNBQUgsRUFBc0MsVUFBQ0MsSUFBRCxFQUFVO0FBQzlDbkIscUJBQUtRLE9BQUwsQ0FBYUMsZUFBYixFQUNHQyxJQURILENBQ1EsaUJBRFIsRUFFRzBDLEdBRkgsQ0FFTyxnQkFGUCxPQUU0Qi9DLFVBRjVCLEVBR0dNLElBSEgsQ0FHUTtBQUNKOEQsY0FBSyxPQUREO0FBRUpYLGNBQU07QUFGRixPQUhSLEVBT0d6QyxHQVBILENBT08sVUFBQ0MsR0FBRCxFQUFNUixHQUFOLEVBQWM7QUFDakJYLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlQyxFQUFmLENBQWtCUSxJQUFsQjtBQUNBN0IsZUFBT1csR0FBUCxFQUFZUyxFQUFaLENBQWVHLElBQWYsQ0FBb0JDLE1BQXBCLENBQTJCLEdBQTNCLEVBRmlCLENBRWlCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBUjtBQUNELE9BZEg7QUFlRCxLQWhCRDtBQWlCRCxHQWxHRDs7QUFvR0E7QUFDQWYsV0FBUyxxQkFBVCxFQUFnQyxZQUFNO0FBQ3BDYyxPQUFHLHdCQUFILEVBQTZCLFVBQUNDLElBQUQsRUFBVTtBQUNyQ25CLHFCQUFLUSxPQUFMLENBQWFDLGVBQWIsRUFDQ1csR0FERCxDQUNLLGlCQURMLEVBRUNnQyxHQUZELENBRUssZ0JBRkwsT0FFMEIvQyxVQUYxQixFQUdDZ0IsR0FIRCxDQUdLLFVBQUNDLEdBQUQsRUFBTVIsR0FBTixFQUFjO0FBQ25CWCxlQUFPVyxHQUFQLEVBQVlTLEVBQVosQ0FBZUMsRUFBZixDQUFrQlEsSUFBbEI7QUFDQTdCLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlRyxJQUFmLENBQW9CQyxNQUFwQixDQUEyQixHQUEzQjtBQUNBeEIsZUFBT1csR0FBUCxFQUFZUyxFQUFaLENBQWVDLEVBQWYsQ0FBa0JNLEVBQWxCLENBQXFCLFFBQXJCO0FBQ0FYO0FBQ0MsT0FSRDtBQVNELEtBVkQ7QUFXRCxHQVpEOztBQWNBO0FBQ0FmLFdBQVMsb0JBQVQsRUFBK0IsWUFBTTtBQUNuQ2MsT0FBRyw2QkFBSCxFQUFrQyxVQUFDQyxJQUFELEVBQVU7QUFDekNuQixxQkFBS1EsT0FBTCxDQUFhQyxlQUFiLEVBQ0dXLEdBREgsQ0FDTyxzREFEUCxFQUVHQyxHQUZILENBRU8sVUFBQ0MsR0FBRCxFQUFNUixHQUFOLEVBQWM7QUFDakJYLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlQyxFQUFmLENBQWtCUSxJQUFsQjtBQUNBN0IsZUFBT1csR0FBUCxFQUFZUyxFQUFaLENBQWVHLElBQWYsQ0FBb0JDLE1BQXBCLENBQTJCLEdBQTNCO0FBQ0F4QixlQUFPVyxJQUFJQyxJQUFKLENBQVNrQixLQUFoQixFQUF1QlYsRUFBdkIsQ0FBMEJXLEtBQTFCLENBQWdDLHNCQUFoQztBQUNBZjtBQUNELE9BUEg7QUFRRixLQVREOztBQVdBRCxPQUFHLHlDQUFILEVBQThDLFVBQUNDLElBQUQsRUFBVTtBQUN2RG5CLHFCQUFLUSxPQUFMLENBQWFDLGVBQWIsRUFDR1csR0FESCxDQUNPLDBCQURQLEVBRUdnQyxHQUZILENBRU8sZ0JBRlAsT0FFNEIvQyxVQUY1QixFQUdHZ0IsR0FISCxDQUdPLFVBQUNDLEdBQUQsRUFBTVIsR0FBTixFQUFjO0FBQ2pCWCxlQUFPVyxHQUFQLEVBQVlTLEVBQVosQ0FBZUMsRUFBZixDQUFrQlEsSUFBbEI7QUFDQTdCLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlRyxJQUFmLENBQW9CQyxNQUFwQixDQUEyQixHQUEzQjtBQUNBeEIsZUFBT1csSUFBSUMsSUFBSixDQUFTa0IsS0FBaEIsRUFBdUJWLEVBQXZCLENBQTBCVyxLQUExQixDQUFnQyxrQ0FBaEM7QUFDQWY7QUFDRCxPQVJIO0FBU0MsS0FWRjs7QUFZQ0QsT0FBRywwQ0FBSCxFQUErQyxVQUFDQyxJQUFELEVBQVU7QUFDdkRuQixxQkFBS1EsT0FBTCxDQUFhQyxlQUFiLEVBQ0dXLEdBREgsQ0FDTyxzREFEUCxFQUVHZ0MsR0FGSCxDQUVPLGdCQUZQLE9BRTRCL0MsVUFGNUIsRUFHR2dCLEdBSEgsQ0FHTyxVQUFDQyxHQUFELEVBQU1SLEdBQU4sRUFBYztBQUNqQlgsZUFBT1csR0FBUCxFQUFZUyxFQUFaLENBQWVDLEVBQWYsQ0FBa0JRLElBQWxCO0FBQ0E3QixlQUFPVyxHQUFQLEVBQVlTLEVBQVosQ0FBZUcsSUFBZixDQUFvQkMsTUFBcEIsQ0FBMkIsR0FBM0I7QUFDQXhCLGVBQU9XLElBQUlDLElBQUosQ0FBU2tCLEtBQWhCLEVBQXVCVixFQUF2QixDQUEwQlcsS0FBMUIsQ0FBZ0Msa0JBQWhDO0FBQ0FmO0FBQ0QsT0FSSDtBQVNDLEtBVkg7QUFXSDtBQUNLRCxPQUFHLG9DQUFILEVBQXlDLFVBQUNDLElBQUQsRUFBVTtBQUNqRG5CLHFCQUFLUSxPQUFMLENBQWFDLGVBQWIsRUFDR1csR0FESCxDQUNPLHNEQURQLEVBRUdnQyxHQUZILENBRU8sZ0JBRlAsT0FFNEIvQyxVQUY1QixFQUdHZ0IsR0FISCxDQUdPLFVBQUNDLEdBQUQsRUFBTVIsR0FBTixFQUFjO0FBQ25CWCxlQUFPVyxHQUFQLEVBQVlTLEVBQVosQ0FBZUMsRUFBZixDQUFrQlEsSUFBbEI7QUFDQTdCLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlRyxJQUFmLENBQW9CQyxNQUFwQixDQUEyQixHQUEzQixFQUZtQixDQUVjO0FBQ2xDO0FBQ0E7QUFDQ1I7QUFDQyxPQVRIO0FBVUMsS0FYSDtBQVlILEdBaERGOztBQWtEQTtBQUNBZixXQUFTLHFDQUFULEVBQWdELFlBQU07QUFDaERjLE9BQUcsZ0RBQUgsRUFBcUQsVUFBQ0MsSUFBRCxFQUFVO0FBQzdEbkIscUJBQUtRLE9BQUwsQ0FBYUMsZUFBYixFQUNDVyxHQURELENBQ0ssOEJBREwsRUFFQ2dDLEdBRkQsQ0FFSyxnQkFGTCxPQUUwQi9DLFVBRjFCLEVBR0NnQixHQUhELENBR0ssVUFBQ0MsR0FBRCxFQUFNUixHQUFOLEVBQWM7QUFDakJYLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlQyxFQUFmLENBQWtCUSxJQUFsQjtBQUNBN0IsZUFBT1csR0FBUCxFQUFZUyxFQUFaLENBQWVHLElBQWYsQ0FBb0JDLE1BQXBCLENBQTJCLEdBQTNCO0FBQ0F4QixlQUFPVyxJQUFJQyxJQUFKLENBQVNrQixLQUFoQixFQUF1QlYsRUFBdkIsQ0FBMEJXLEtBQTFCLENBQWdDLDZCQUFoQztBQUNBZjtBQUNELE9BUkQ7QUFTRCxLQVZEOztBQVlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQUQsT0FBRyw0REFBSCxFQUFpRSxVQUFDQyxJQUFELEVBQVU7QUFDekVuQixxQkFBS1EsT0FBTCxDQUFhQyxlQUFiLEVBQ0NXLEdBREQsQ0FDSyw0REFETCxFQUVDZ0MsR0FGRCxDQUVLLGdCQUZMLE9BRTBCL0MsVUFGMUIsRUFHQ2dCLEdBSEQsQ0FHSyxVQUFDQyxHQUFELEVBQU1SLEdBQU4sRUFBYztBQUNqQlgsZUFBT1csR0FBUCxFQUFZUyxFQUFaLENBQWVDLEVBQWYsQ0FBa0JRLElBQWxCO0FBQ0E3QixlQUFPVyxHQUFQLEVBQVlTLEVBQVosQ0FBZUcsSUFBZixDQUFvQkMsTUFBcEIsQ0FBMkIsR0FBM0I7QUFDQTtBQUNBO0FBQ0FSO0FBQ0QsT0FURDtBQVVELEtBWEQ7QUFZTCxHQXRDRDs7QUF3Q0E7QUFDQWYsV0FBUyxvQkFBVCxFQUErQixZQUFNO0FBQ25DYyxPQUFHLGtEQUFILEVBQXVELFVBQUNDLElBQUQsRUFBUztBQUM5RG5CLHFCQUFLUSxPQUFMLENBQWFDLGVBQWIsRUFDQ0MsSUFERCxDQUNNLGVBRE4sRUFFQzBDLEdBRkQsQ0FFSyxnQkFGTCxPQUUwQi9DLFVBRjFCLEVBR0NNLElBSEQsQ0FHTStELDBCQUhOLEVBSUNyRCxHQUpELENBSUssVUFBQ0MsR0FBRCxFQUFNUixHQUFOLEVBQWM7QUFDakJYLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlQyxFQUFmLENBQWtCUSxJQUFsQjtBQUNBN0IsZUFBT1csR0FBUCxFQUFZUyxFQUFaLENBQWVHLElBQWYsQ0FBb0JDLE1BQXBCLENBQTJCLEdBQTNCO0FBQ0F4QixlQUFPVyxJQUFJQyxJQUFKLENBQVNrQixLQUFoQixFQUF1QlYsRUFBdkIsQ0FBMEJXLEtBQTFCLENBQWdDLDZDQUFoQztBQUNBZjtBQUNELE9BVEQ7QUFVRCxLQVhEOztBQWFBRCxPQUFHLG1EQUFILEVBQXdELFVBQUNDLElBQUQsRUFBUztBQUMvRG5CLHFCQUFLUSxPQUFMLENBQWFDLGVBQWIsRUFDQ0MsSUFERCxDQUNNLGVBRE4sRUFFQzBDLEdBRkQsQ0FFSyxnQkFGTCxPQUUwQi9DLFVBRjFCLEVBR0NNLElBSEQsQ0FHTWdFLDBCQUhOLEVBSUN0RCxHQUpELENBSUssVUFBQ0MsR0FBRCxFQUFNUixHQUFOLEVBQWM7QUFDakJYLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlQyxFQUFmLENBQWtCUSxJQUFsQjtBQUNBN0IsZUFBT1csR0FBUCxFQUFZUyxFQUFaLENBQWVHLElBQWYsQ0FBb0JDLE1BQXBCLENBQTJCLEdBQTNCO0FBQ0F4QixlQUFPVyxJQUFJQyxJQUFKLENBQVNrQixLQUFoQixFQUF1QlYsRUFBdkIsQ0FBMEJXLEtBQTFCLENBQWdDLHlCQUFoQztBQUNBZjtBQUNELE9BVEQ7QUFVRCxLQVhEOztBQWFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNELEdBMUNEOztBQTRDQTtBQUNBO0FBQ0NmLFdBQVMsc0NBQVQsRUFBaUQsWUFBTTtBQUN0RGMsT0FBRyxxQ0FBSCxFQUEwQyxVQUFDQyxJQUFELEVBQVM7QUFDL0NuQixxQkFBS1EsT0FBTCxDQUFhQyxlQUFiLEVBQ0dDLElBREgsQ0FDUSw4REFEUixFQUVHQyxJQUZILENBRVFpRSxzQkFGUixFQUdHdkQsR0FISCxDQUdPLFVBQUNDLEdBQUQsRUFBTVIsR0FBTixFQUFjO0FBQ2pCWCxlQUFPVyxHQUFQLEVBQVlTLEVBQVosQ0FBZUMsRUFBZixDQUFrQlEsSUFBbEI7QUFDQTdCLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlRyxJQUFmLENBQW9CQyxNQUFwQixDQUEyQixHQUEzQjtBQUNBeEIsZUFBT1csSUFBSUMsSUFBSixDQUFTa0IsS0FBaEIsRUFBdUJWLEVBQXZCLENBQTBCVyxLQUExQixDQUFnQyxzQkFBaEM7QUFDQWY7QUFDSixPQVJBO0FBU0gsS0FWRDtBQVdBRCxPQUFHLGlEQUFILEVBQXNELFVBQUNDLElBQUQsRUFBVTtBQUM5RG5CLHFCQUFLUSxPQUFMLENBQWFDLGVBQWIsRUFDQ0MsSUFERCxDQUNNLDhEQUROLEVBRUMwQyxHQUZELENBRUssZ0JBRkwsT0FFMEIvQyxVQUYxQixFQUdDTSxJQUhELENBR007QUFDSmtFLGdCQUFRLEVBREo7QUFFSkMsZUFBTyxFQUZIO0FBR0pDLG1CQUFXO0FBSFAsT0FITixFQVFDMUQsR0FSRCxDQVFLLFVBQUNDLEdBQUQsRUFBTVIsR0FBTixFQUFjO0FBQ2pCWCxlQUFPVyxHQUFQLEVBQVlTLEVBQVosQ0FBZUMsRUFBZixDQUFrQlEsSUFBbEI7QUFDQTdCLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlRyxJQUFmLENBQW9CQyxNQUFwQixDQUEyQixHQUEzQjtBQUNBeEIsZUFBT1csSUFBSUMsSUFBSixDQUFTa0IsS0FBaEIsRUFBdUJWLEVBQXZCLENBQTBCVyxLQUExQixDQUFnQyx5QkFBaEM7QUFDQWY7QUFDRCxPQWJEO0FBY0QsS0FmRDs7QUFpQkFELE9BQUcsZ0RBQUgsRUFBcUQsVUFBQ0MsSUFBRCxFQUFVO0FBQzdEbkIscUJBQUtRLE9BQUwsQ0FBYUMsZUFBYixFQUNDQyxJQURELENBQ00sOERBRE4sRUFFQzBDLEdBRkQsQ0FFSyxnQkFGTCxPQUUwQi9DLFVBRjFCLEVBR0NNLElBSEQsQ0FHTXFFLHNCQUhOLEVBSUMzRCxHQUpELENBSUssVUFBQ0MsR0FBRCxFQUFNUixHQUFOLEVBQWM7QUFDakJYLGVBQU9XLEdBQVAsRUFBWVMsRUFBWixDQUFlQyxFQUFmLENBQWtCUSxJQUFsQjtBQUNBN0IsZUFBT1csR0FBUCxFQUFZUyxFQUFaLENBQWVHLElBQWYsQ0FBb0JDLE1BQXBCLENBQTJCLEdBQTNCO0FBQ0F4QixlQUFPVyxJQUFJQyxJQUFKLENBQVNrQixLQUFoQixFQUF1QlYsRUFBdkIsQ0FBMEJXLEtBQTFCLENBQWdDLGlDQUFoQztBQUNBZjtBQUNELE9BVEQ7QUFVRCxLQVhEOztBQWFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNELEdBekRBOztBQThERDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Y7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0MsQ0Evc0NEIiwiZmlsZSI6InRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpSHR0cCBmcm9tICdjaGFpLWh0dHAnO1xuaW1wb3J0IGFwcCBmcm9tICcuLi9zcmMvaW5kZXgnO1xuaW1wb3J0IHtnb29kU2lnbnVwLCBiYWRTaWdudXAsIGJhZFNpZ251cDIsIGJhZFNpZ251cDMsIGJhZFNpZ251cDQsIGJhZFNpZ251cDUsIGJhZExvZ2luLCBcbiAgYmFkTG9naW4yLCBiYWRMb2dpbjMsIGlzRW1haWwsIGJhZFRlc3RQYXJ0eSwgYmFkVGVzdFBhcnR5MiwgXG4gIGJhZFRlc3RQYXJ0eTMsIGJhZFRlc3RQYXJ0eTQsIG9mZmljZXMsIG9mZmljZXMyLCBvZmZpY2VzMywgdm90ZTEsXG52b3RlMiwgdm90ZTMsIGNhbmRpZGF0ZTEsIGNhbmRpZGF0ZTIsIGNhbmRpZGF0ZTMsIGdvb2RWb3RlUmVzdWx0LCBiYWRWb3RlUmVzdWx0NCwgZ29vZExvZ2luLCB0ZXN0UGFydHksIGJhZFRlc3RQYXJ0eTUsIGJhZFRlc3RQYXJ0eTYsIGJhZFRlc3RQYXJ0eTcsIGJhZFRlc3RQYXJ0eTgsIG9mZmljZXM0LCBvZmZpY2VzNSwgYmFkVm90ZVJlc3VsdDUsIGNhbmRpZGF0ZTQgfSBmcm9tICcuL2lucHV0RmllbGQnXG5cbmNoYWkudXNlKGNoYWlIdHRwKTtcbmNvbnN0IHsgZXhwZWN0IH0gPSBjaGFpO1xuXG5cblxuZGVzY3JpYmUoJ0FwcC5qcycsICgpID0+IHtcbiAgbGV0IGFkbWluVG9rZW47XG4gIGxldCB1c2VyVG9rZW47XG5cbiAgYmVmb3JlKGFzeW5jICgpID0+IHtcbiAgICAvKiBiZWZvcmUgYW55IHRlc3Qgd2lsbCBydW4sIGxvZ2luIGFzIGFuIGFkbWluLCBcbiAgICBnZXQgdGhlIGFkbWluIHRva2VuIGFuZCBzYXZlIGl0IHRvIGEgdmFyaWFibGUsIFxuICAgIHVzZSBpdCB0byBhY2Nlc3Mgb3RoZXIgcHJvdGVjdGl2ZSByb3V0ZSoqL1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGNoYWkucmVxdWVzdChhcHApXG4gICAgICAucG9zdCgnL2FwaS92MS9hdXRoL2xvZ2luJylcbiAgICAgIC5zZW5kKHtcbiAgICAgICAgZW1haWw6ICdhbmF5b2t5bGVAZ21haWwuY29tJyxcbiAgICAgICAgcGFzc3dvcmQ6ICdhbmF5b2t5bGVvbGVydScsXG4gICAgICB9KTtcbiAgICBhZG1pblRva2VuID0gcmVzLmJvZHkuZGF0YVswXS50b2tlbjtcbiAgfSk7XG5cblxuXG5kZXNjcmliZSgnL2FwaS92MScsICgpID0+IHtcbiAgaXQoJ0l0IHNob3VsZCByZXR1cm4gIHdlbGNvbWUgbWVzc2FnZScsIChkb25lKSA9PiB7XG4gICAgY2hhaS5yZXF1ZXN0KGFwcClcbiAgICAgIC5nZXQoJy9hcGkvdjEnKVxuICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgICAgZXhwZWN0KGVycikudG8uYmUubnVsbDtcbiAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoMjAwKTtcbiAgICAgICAgZXhwZWN0KHJlcykudG8ubm90LnJlZGlyZWN0O1xuICAgICAgICBleHBlY3QocmVzLmJvZHkpLnRvLmJlLmFuKCdvYmplY3QnKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gIH0pO1xufSk7XG5cbi8vIGRlc2NyaWJlKCcvJywgKCkgPT4ge1xuLy8gICBpdCgnc2hvdWxkIHJlZGlyZWN0IHRvIHRoZSBob21lcGFnZScsIChkb25lKSA9PiB7XG4vLyAgICAgY2hhaS5yZXF1ZXN0KGFwcClcbi8vICAgICAuZ2V0KCcvJylcbi8vICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuLy8gICAgICAgZXhwZWN0KGVycikudG8uYmUubnVsbDtcbi8vICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDMwMClcbi8vICAgICAgIGV4cGVjdChyZXMpLnRvLnJlZGlyZWN0O1xuLy8gICAgICAgZXhwZWN0KHJlcy5zZW5kRmlsZSkudG8uZXF1YWwocGF0aC5qb2luKF9fZGlybmFtZSArICcuLi8uLi9VSS92aWV3cy9pbmRleC5odG1sJykpO1xuLy8gICAgICAgZG9uZSgpXG4vLyAgICAgfSlcbi8vICAgfSlcbi8vIH0pXG5cbi8vIHVzZXJzIHNpZ251cFxuXG5kZXNjcmliZSgnL2FwaS92MS9hdXRoL3NpZ251cCcsICgpID0+IHtcbiAgaXQoJ1Nob3VsZG5cXCd0IHNpZ251cCB3aGVuIGlucHV0IGZpZWxkIGFyZSBlbXB0eScsIChkb25lKSA9PiB7XG4gICAgY2hhaS5yZXF1ZXN0KGFwcClcbiAgICAucG9zdCgnL2FwaS92MS9hdXRoL3NpZ251cCcpXG4gICAgLnNlbmQoYmFkU2lnbnVwNClcbiAgICAuZW5kKChlcnIsIHJlcykgPT57XG4gICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDAwKTtcbiAgICAgIGV4cGVjdChyZXMuYm9keS5lcnJvcikudG8uZXF1YWwoJ1NvbWUgdmFsdWVzIGFyZSBtaXNzaW5nJyk7XG4gICAgICBkb25lKCk7XG4gICAgfSlcbiAgfSlcblxuICBpdCgnU2hvdWxkblxcJ3QgY29udGFpbiB3aGl0ZXNwYWNlJywgKGRvbmUpID0+IHtcbiAgICBjaGFpLnJlcXVlc3QoYXBwKVxuICAgIC5wb3N0KCcvYXBpL3YxL2F1dGgvc2lnbnVwJylcbiAgICAuc2VuZChiYWRTaWdudXA1KVxuICAgIC5lbmQoKGVyciwgcmVzKSA9PntcbiAgICAgIGV4cGVjdChyZXMpLnRvLmJlLmpzb247XG4gICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDApO1xuICAgICAgZXhwZWN0KHJlcy5ib2R5LmVycm9yKS50by5lcXVhbCgnV2hpdGUgU3BhY2UgYXJlIG5vdCBhbGxvd2VkIGluIGlucHV0IGZpZWxkcycpO1xuICAgICAgZG9uZSgpO1xuICAgIH0pXG4gIH0pXG5cbiAgaXQoJ1BPU1QgY3JlYXRlIGFuIGFjY291bnQnLCAoZG9uZSkgPT4geyAvLyBXSEVOIFBBU1NXT1JEIEZJRUxEIElTIExFRlQgQkxBTktcbiAgICBjaGFpLnJlcXVlc3QoYXBwKVxuICAgICAgLnBvc3QoJy9hcGkvdjEvYXV0aC9zaWdudXAnKVxuICAgICAgLnNlbmQoYmFkU2lnbnVwKVxuICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgICAgZXhwZWN0KGVycikudG8uYmUubnVsbDtcbiAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5oZWFkZXJzO1xuICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDApO1xuICAgICAgICBleHBlY3QocmVzKS50by5ub3QucmVkaXJlY3Q7XG4gICAgICAgIGV4cGVjdChyZXMuYm9keSkudG8uYmUuYW4oJ29iamVjdCcpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcbiAgfSk7XG4gIGl0KCdwaG9uZSBudW1iZXIgbXVzdCBiZSB2YWxpZCBOaWdlcmlhbiBudW1iZXInLCAoZG9uZSkgPT4ge1xuICAgIGNoYWkucmVxdWVzdChhcHApXG4gICAgICAucG9zdCgnL2FwaS92MS9hdXRoL3NpZ251cCcpXG4gICAgICAuc2VuZCh7XG4gICAgICAgIGZpcnN0bmFtZTogJ2pvaG4nLFxuICAgICAgICBsYXN0bmFtZTogJ2RvZScsXG4gICAgICAgIG90aGVybmFtZTogJ2JlbicsXG4gICAgICAgIGVtYWlsOiAndmVyeWVtYWlsZHJAZ21haWwuaW9uJyxcbiAgICAgICAgcGhvbmVOdW1iZXI6ICdmZ2NoJyxcbiAgICAgICAgcGFzc3BvcnRVcmw6ICdodHRwczovL2hwdS5qcGcnLFxuICAgICAgICBwYXNzd29yZDogJ2hkYnNqZGZkZmQyMzQnLFxuICAgICAgfSlcbiAgICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLmJlLmpzb247XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwMCk7XG4gICAgICAgIGV4cGVjdChyZXMuYm9keS5lcnJvcikudG8uZXF1YWwoJ0ludmFsaWQgTmlnZXJpYW4gcGhvbmUtbnVtYmVyJyk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICB9KTtcblxuICBpdCgncGFzc3BvcnRVcmwgbXVzdCBub3QgYmUgZW1wdHknLCAoZG9uZSkgPT4ge1xuICAgIGNoYWkucmVxdWVzdChhcHApXG4gICAgICAucG9zdCgnL2FwaS92MS9hdXRoL3NpZ251cCcpXG4gICAgICAuc2VuZCh7XG4gICAgICAgIGZpcnN0bmFtZTogJ2pvaG4nLFxuICAgICAgICBsYXN0bmFtZTogJ2RvZScsXG4gICAgICAgIG90aGVybmFtZTogJ2JlbicsXG4gICAgICAgIGVtYWlsOiAndmVyeWVtYWlsZHJAZ21haWwuaW9uJyxcbiAgICAgICAgcGhvbmVOdW1iZXI6ICcwODA5Njg3NTY1NCcsXG4gICAgICAgIHBhc3Nwb3J0VXJsOiAnJyxcbiAgICAgICAgcGFzc3dvcmQ6ICdoZGJzamRmZGZkMjM0JyxcbiAgICAgIH0pXG4gICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDApO1xuICAgICAgICBleHBlY3QocmVzLmJvZHkuZXJyb3IpLnRvLmVxdWFsKCdTb21lIHZhbHVlcyBhcmUgbWlzc2luZycpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcbiAgfSk7XG4gIGl0KCdXaGVuIHBhc3N3b3JkIGZpZWxkIGlzIGVtcHR5JywgKGRvbmUpID0+IHsgLy8gV0hFTiBOQU1FUyBGSUVMRCBJUyBMRUZUIEJMQU5LXG4gICAgY2hhaS5yZXF1ZXN0KGFwcClcbiAgICAgIC5wb3N0KCcvYXBpL3YxL2F1dGgvc2lnbnVwJylcbiAgICAgIC5zZW5kKGJhZFNpZ251cDMpXG4gICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgICAgICBleHBlY3QoZXJyKS50by5iZS5udWxsO1xuICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLmhlYWRlcnM7XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwMCk7XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLm5vdC5yZWRpcmVjdDtcbiAgICAgICAgZXhwZWN0KHJlcy5ib2R5KS50by5iZS5hbignb2JqZWN0Jyk7XG4gICAgICAgIGV4cGVjdChyZXMuYm9keS5lcnJvcikudG8uZXF1YWwoJ1NvbWUgdmFsdWVzIGFyZSBtaXNzaW5nJyk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICB9KTtcbiAgaXQoJ3doZW4gZmlyc3RuYW1lLCBsYXN0bmFtZSBhbmQgb3RoZXJuYW1lIGlzIGVtcHR5JywgKGRvbmUpID0+IHsgLy8gV0hFTiBOQU1FUyBGSUVMRCBJUyBMRUZUIEJMQU5LXG4gICAgY2hhaS5yZXF1ZXN0KGFwcClcbiAgICAgIC5wb3N0KCcvYXBpL3YxL2F1dGgvc2lnbnVwJylcbiAgICAgIC5zZW5kKGJhZFNpZ251cDIpXG4gICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgICAgICBleHBlY3QoZXJyKS50by5iZS5udWxsO1xuICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLmhlYWRlcnM7XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwMCk7XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLm5vdC5yZWRpcmVjdDtcbiAgICAgICAgZXhwZWN0KHJlcy5ib2R5KS50by5iZS5hbignb2JqZWN0Jyk7XG4gICAgICAgIGV4cGVjdChyZXMuYm9keS5lcnJvcikudG8uZXF1YWwoJ1NvbWUgdmFsdWVzIGFyZSBtaXNzaW5nJyk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBub3Qgc2lnbiB1c2VyIHR3aWNlJywgKGRvbmUpID0+IHtcbiAgICBjaGFpLnJlcXVlc3QoYXBwKVxuICAgICAgLnBvc3QoJy9hcGkvdjEvYXV0aC9zaWdudXAnKVxuICAgICAgLnNlbmQoe1xuICAgICAgICBmaXJzdG5hbWU6ICdtdW5hY2hpJyxcbiAgICAgICAgbGFzdG5hbWU6ICdtdW5hJyxcbiAgICAgICAgb3RoZXJuYW1lOiAnY2hpY2hpJyxcbiAgICAgICAgZW1haWw6ICdtdW5hY2hpQGdtYWlsLmNvbScsXG4gICAgICAgIHBob25lbnVtYmVyOiAnMDcwNjk1ODM2NTQnLFxuICAgICAgICBwYXNzcG9ydFVybDogJ2h0dHA6Ly9qcC5qcGcnLFxuICAgICAgICBwYXNzd29yZDogJ211bmFjaGkxMjM0NScsXG4gICAgICB9KVxuICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgICAgZXhwZWN0KHJlcykudG8uYmUuanNvbjtcbiAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDA5KTtcbiAgICAgICAgZXhwZWN0KHJlcy5ib2R5LmVycm9yKS50by5lcXVhbCgnVXNlciB3aXRoIHRoYXQgRU1BSUwgYWxyZWFkeSBleGlzdCcpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcbiAgfSk7XG59KTtcblxuXG5cbi8vIGxvZ2luXG5kZXNjcmliZSgnL2FwaS92MS9hdXRoL2xvZ2luJywgKCkgPT4ge1xuICBpdCgnd2hlbiBlbWFpbCBpcyBpbnZhbGlkJywgKGRvbmUpID0+IHsgLy8gV0hFTiBFTUFJTCBJUyBJTkNPUlJFQ1RMWSBMQUlEXG4gICAgY2hhaS5yZXF1ZXN0KGFwcClcbiAgICAgIC5wb3N0KCcvYXBpL3YxL2F1dGgvbG9naW4nKVxuICAgICAgLnNlbmQoYmFkTG9naW4pXG4gICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgICAgICBleHBlY3QoZXJyKS50by5iZS5udWxsO1xuICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLmhlYWRlcnM7XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLmJlLmpzb247XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwMCk7XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLm5vdC5yZWRpcmVjdDtcbiAgICAgICAgZXhwZWN0KHJlcy5ib2R5KS50by5iZS5hbignb2JqZWN0Jyk7XG4gICAgICAgIGV4cGVjdChyZXMuYm9keS5lcnJvcikudG8uZXF1YWwoJ1BsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsIGFkZHJlc3MnKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gIH0pO1xuICBpdCgnd2hlbiBwYXNzd29yZCBvZSBlbWFpbCBmaWVsZCBpcyBlbXB0eScsIChkb25lKSA9PiB7IC8vIFdIRU4gTkFNRVMgUEFTU1dPUkQgSVMgRU1QVFlcbiAgICBjaGFpLnJlcXVlc3QoYXBwKVxuICAgICAgLnBvc3QoJy9hcGkvdjEvYXV0aC9sb2dpbicpXG4gICAgICAuc2VuZChiYWRMb2dpbjIpXG4gICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgICAgICBleHBlY3QoZXJyKS50by5iZS5udWxsO1xuICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLmhlYWRlcnM7XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLmJlLmpzb247XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwMCk7XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLm5vdC5yZWRpcmVjdDtcbiAgICAgICAgZXhwZWN0KHJlcy5ib2R5KS50by5iZS5hbignb2JqZWN0Jyk7XG4gICAgICAgIGV4cGVjdChyZXMuYm9keS5lcnJvcikudG8uZXF1YWwoJ1NvbWUgdmFsdWVzIGFyZSBtaXNzaW5nJylcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gIH0pO1xuICBpdCgnd2hlbiB0aGVyZSBhcmUgd2hpdGUgc3BhY2VzIGluIGlucHV0IGZpZWxkcyBpbnN0ZWFkJywgKGRvbmUpID0+IHsgLy8gV0hFTiBBTEwgRklFTERTIEFSRSBFTVBUWVxuICAgIGNoYWkucmVxdWVzdChhcHApXG4gICAgICAucG9zdCgnL2FwaS92MS9hdXRoL2xvZ2luJylcbiAgICAgIC5zZW5kKGJhZExvZ2luMylcbiAgICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4gICAgICAgIGV4cGVjdChlcnIpLnRvLmJlLm51bGw7XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuaGVhZGVycztcbiAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDAwKTtcbiAgICAgICAgZXhwZWN0KHJlcykudG8ubm90LnJlZGlyZWN0O1xuICAgICAgICBleHBlY3QocmVzLmJvZHkpLnRvLmJlLmFuKCdvYmplY3QnKTtcbiAgICAgICAgZXhwZWN0KHJlcy5ib2R5LmVycm9yKS50by5lcXVhbCgnV2hpdGUgU3BhY2UgYXJlIG5vdCBhbGxvd2VkIGluIGlucHV0IGZpZWxkcycpXG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICB9KTtcblxuICBpdCgnd2hlbiBlbWFpbCBvciBwYXNzd29kIGRvZXMgbm90IGV4aXN0IGluIHRoZSBkYXRhYmFzZScsIChkb25lKSA9PiB7IC8vIFdIRU4gQUxMIEZJRUxEUyBBUkUgRU1QVFlcbiAgICBjaGFpLnJlcXVlc3QoYXBwKVxuICAgICAgLnBvc3QoJy9hcGkvdjEvYXV0aC9sb2dpbicpXG4gICAgICAuc2VuZChnb29kTG9naW4pXG4gICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDApO1xuICAgICAgICBleHBlY3QocmVzLmJvZHkpLnRvLmJlLmFuKCdvYmplY3QnKTtcbiAgICAgICAgZXhwZWN0KHJlcy5ib2R5LmVycm9yKS50by5lcXVhbCgncGFzc3dvcmQgaXMgaW5jb3JyZWN0JylcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGl0KCdzdWNjZXNzZnVsIGxvZ2luJywgKGRvbmUpID0+IHsgLy8gV0hFTiBBTEwgRklFTERTIEFSRSBFTVBUWVxuICAgIGNoYWkucmVxdWVzdChhcHApXG4gICAgICAucG9zdCgnL2FwaS92MS9hdXRoL2xvZ2luJylcbiAgICAgIC5zZW5kKHtcbiAgICAgICAgICBlbWFpbDogJ211bmFjaGlAZ21haWwuY29tJyxcbiAgICAgICAgICBwYXNzd29yZDogJ211bmFjaGkxMjM0NScsXG4gICAgICB9KVxuICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgICAgZXhwZWN0KHJlcykudG8uYmUuanNvbjtcbiAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoMjAxKTtcbiAgICAgICAgZXhwZWN0KHJlcy5ib2R5LmRhdGFbMF0udXNlci5lbWFpbCkudG8uZXF1YWwoJ211bmFjaGlAZ21haWwuY29tJyk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICB9KTtcbn0pO1xuXG4vLyB0ZXN0IHRvIGdldCBhbGwgdXNlcnNcbi8vIGRlc2NyaWJlKCcvYXBpL3YxL2F1dGgvdXNlcnMnLCAoKSA9PiB7XG4vLyAgIGl0KCdzdWNjZXNzZnVsbHkgZ2V0cyBhbGwgdXNlcnMnLCAoZG9uZSkgPT4ge1xuLy8gICAgIGNoYWkucmVxdWVzdChhcHApXG4vLyAgICAgLmdldCgnL2FwaS92MS91c2VycycpXG4vLyAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbi8vICAgICAgIGV4cGVjdChyZXMpLnRvLmJlLmpzb247XG4vLyAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cygyMDApO1xuLy8gICAgICAgZXhwZWN0KHJlcy5ib2R5LmRhdGFbMF0uZmlyc3RuYW1lKS50by5lcXVhbCgnQW5heW8nKTtcbi8vICAgICAgIGV4cGVjdChyZXMuYm9keS5kYXRhWzBdLmxhc3RuYW1lKS50by5lcXVhbCgnT2xlcnUnKTtcbi8vICAgICAgIGV4cGVjdChyZXMuYm9keS5kYXRhWzBdLm90aGVybmFtZSkudG8uZXF1YWwoJ0RhdmlkJyk7XG4vLyAgICAgICBleHBlY3QocmVzLmJvZHkuZGF0YVswXS5lbWFpbCkudG8uZXF1YWwoJ2FuYXlvX29sZXJ1QG91dGxvb2suY29tJyk7XG4vLyAgICAgICBleHBlY3QocmVzLmJvZHkuZGF0YVswXS5waG9uZW51bWJlcikudG8uZXF1YWwoJzA3MDY5NTgzNjU0Jyk7XG4vLyAgICAgICBleHBlY3QocmVzLmJvZHkuZGF0YVswXS5wYXNzcG9ydFVybCkudG8uZXF1YWwoJ2h0dHBzOi8vYW5heW8uanBnJyk7XG4vLyAgICAgICBleHBlY3QocmVzLmJvZHkuZGF0YVswXS5wYXNzd29yZCkudG8uZXF1YWwoJ211bmFjaGkxMjM0NScpO1xuLy8gICAgICAgZG9uZSgpO1xuLy8gICAgIH0pXG4vLyAgIH0pXG4vLyB9KVxuXG5cbi8vIGNyZWF0ZSBwb2xpdGljYWwgcGFydGllc1xuZGVzY3JpYmUoJ1BPU1QgYXBpL3YxL3BhcnRpZXMnLCAoKSA9PiB7XG4gIGl0KCdvbmx5IGF1dGhvcmlzZSBhZG1pbiBjYW4gYWNjZXNzJywgKGRvbmUpID0+IHtcbiAgICBjaGFpLnJlcXVlc3QoYXBwKVxuICAgICAgLnBvc3QoJy9hcGkvdjEvcGFydGllcycpXG4gICAgICAuc2VuZCh0ZXN0UGFydHkpXG4gICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAgICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwMCk7XG4gICAgICAgICAgZXhwZWN0KHJlcy5ib2R5LmVycm9yKS50by5lcXVhbCgnVXNlciBub3QgYXV0aG9yaXNlZCEnKTtcbiAgICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcbiAgfSk7XG4gIGl0KCdwYXJ0eSBuYW1lIG11c3Qgbm90IGJlIGVtcHR5JywgKGRvbmUpID0+IHtcbiAgICBjaGFpLnJlcXVlc3QoYXBwKVxuICAgICAgLnBvc3QoJy9hcGkvdjEvcGFydGllcycpXG4gICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIGAke2FkbWluVG9rZW59YClcbiAgICAgIC5zZW5kKGJhZFRlc3RQYXJ0eSlcbiAgICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLmJlLmpzb247XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwMCk7XG4gICAgICAgIGV4cGVjdChyZXMuYm9keS5lcnJvcikudG8uZXF1YWwoJ1BhcnR5IGZpZWxkIGlzIGVtcHR5Jyk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICB9KTtcblxuICBpdCgncGFydHkgaHFhZGRyZXNzIG11c3Qgbm90IGJlIGVtcHR5JywgKGRvbmUpID0+IHtcbiAgICBjaGFpLnJlcXVlc3QoYXBwKVxuICAgICAgLnBvc3QoJy9hcGkvdjEvcGFydGllcycpXG4gICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIGAke2FkbWluVG9rZW59YClcbiAgICAgIC5zZW5kKGJhZFRlc3RQYXJ0eTIpXG4gICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDApO1xuICAgICAgICBleHBlY3QocmVzLmJvZHkuZXJyb3IpLnRvLmVxdWFsKCdBZGRyZXNzIGZpZWxkIGlzIGVtcHR5Jyk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICB9KTtcblxuICBpdCgncGFydHkgbG9nb1VybCBtdXN0IG5vdCBiZSBlbXB0eScsIChkb25lKSA9PiB7XG4gICAgY2hhaS5yZXF1ZXN0KGFwcClcbiAgICAgIC5wb3N0KCcvYXBpL3YxL3BhcnRpZXMnKVxuICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCBgJHthZG1pblRva2VufWApXG4gICAgICAuc2VuZChiYWRUZXN0UGFydHkzKVxuICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgICAgZXhwZWN0KHJlcykudG8uYmUuanNvbjtcbiAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDAwKTtcbiAgICAgICAgZXhwZWN0KHJlcy5ib2R5LmVycm9yKS50by5lcXVhbCgnTG9nbyBmaWVsZCBpcyBlbXB0eScpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ3BhcnR5IGlucHV0cyBmaWVsZCBtdXN0IG5vdCBiZSBlbXB0eScsIChkb25lKSA9PiB7XG4gICAgY2hhaS5yZXF1ZXN0KGFwcClcbiAgICAgIC5wb3N0KCcvYXBpL3YxL3BhcnRpZXMnKVxuICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCBgJHthZG1pblRva2VufWApXG4gICAgICAuc2VuZChiYWRUZXN0UGFydHk0KVxuICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgICAgZXhwZWN0KHJlcykudG8uYmUuanNvbjtcbiAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDAwKTtcbiAgICAgICAgZXhwZWN0KHJlcy5ib2R5LmVycm9yKS50by5lcXVhbCgnSW5wdXRzIGZpZWxkcyBjYW5cXCd0IGJlIGxlZnQgZW1wdHknKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGl0KCdwYXJ0eSBuYW1lIG11c3QgYmUgdmFsaWQnLCAoZG9uZSkgPT4ge1xuICAgIGNoYWkucmVxdWVzdChhcHApXG4gICAgICAucG9zdCgnL2FwaS92MS9wYXJ0aWVzJylcbiAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgYCR7YWRtaW5Ub2tlbn1gKVxuICAgICAgLnNlbmQoYmFkVGVzdFBhcnR5NSlcbiAgICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLmJlLmpzb247XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwMCk7XG4gICAgICAgIGV4cGVjdChyZXMuYm9keS5lcnJvcikudG8uZXF1YWwoJ0FscGhhYmV0cyBvbmx5Jyk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICB9KTtcblxuICBpdCgncGFydHkgbG9nbyBtdXN0IGJlIHZhbGlkJywgKGRvbmUpID0+IHtcbiAgICBjaGFpLnJlcXVlc3QoYXBwKVxuICAgICAgLnBvc3QoJy9hcGkvdjEvcGFydGllcycpXG4gICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIGAke2FkbWluVG9rZW59YClcbiAgICAgIC5zZW5kKGJhZFRlc3RQYXJ0eTYpXG4gICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDApO1xuICAgICAgICBleHBlY3QocmVzLmJvZHkuZXJyb3IpLnRvLmVxdWFsKCdJbmNvcnJlY3QgVVJMLiBVc2UgaHR0cHM6Ly8nKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGl0KCdwYXJ0eSBocWFkZHJlc3MgbXVzdCBiZSB2YWxpZCcsIChkb25lKSA9PiB7XG4gICAgY2hhaS5yZXF1ZXN0KGFwcClcbiAgICAgIC5wb3N0KCcvYXBpL3YxL3BhcnRpZXMnKVxuICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCBgJHthZG1pblRva2VufWApXG4gICAgICAuc2VuZChiYWRUZXN0UGFydHk3KVxuICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgICAgZXhwZWN0KHJlcykudG8uYmUuanNvbjtcbiAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDAwKTtcbiAgICAgICAgZXhwZWN0KHJlcy5ib2R5LmVycm9yKS50by5lcXVhbCgnUGxlYXNlIGVudGVyIGEgdmFsaWQgYWRkcmVzcycpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ3BhcnR5IGFscmVhZHkgZXhpc3QnLCAoZG9uZSkgPT4ge1xuICAgIGNoYWkucmVxdWVzdChhcHApXG4gICAgICAucG9zdCgnL2FwaS92MS9wYXJ0aWVzJylcbiAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgYCR7YWRtaW5Ub2tlbn1gKVxuICAgICAgLnNlbmQoYmFkVGVzdFBhcnR5OClcbiAgICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLmJlLmpzb247XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwMCk7XG4gICAgICAgIGV4cGVjdChyZXMuYm9keS5lcnJvcikudG8uZXF1YWwoJ1BhcnR5IGFscmVhZHkgZXhpc3QnKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gIH0pO1xuICAvLyBpdCgncGFydHkgc3VjY2Vzc2Z1bGx5IGNyZWF0ZWQnLCAoZG9uZSkgPT4ge1xuICAvLyAgIGNoYWkucmVxdWVzdChhcHApXG4gIC8vICAgICAucG9zdCgnL2FwaS92MS9wYXJ0aWVzJylcbiAgLy8gICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgYCR7YWRtaW5Ub2tlbn1gKVxuICAvLyAgICAgLnNlbmQodGVzdFBhcnR5KVxuICAvLyAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgLy8gICAgICAgZXhwZWN0KHJlcykudG8uYmUuanNvbjtcbiAgLy8gICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cygyMDEpO1xuICAvLyAgICAgICAgIGV4cGVjdChyZXMuYm9keS5kYXRhLm9yZGVyWzBdLm5hbWUpLnRvLmVxdWFsKCdBY3Rpb24gY29uZ3Jlc3MgTmlnZXJpYScpO1xuICAvLyAgICAgICAgIGV4cGVjdChyZXMuYm9keS5kYXRhLm9yZGVyWzBdLmlkKS50by5lcXVhbCgxKTtcbiAgLy8gICAgICAgZG9uZSgpO1xuICAvLyAgICAgfSk7XG4gIC8vIH0pO1xufSk7XG5cbi8vIGdldCBzcGVjaWZpYyBwYXJ0eVxuZGVzY3JpYmUoJ0dFVCBhcGkvdjEvcGFydGllcycsICgpID0+IHtcbiBpdCgnc2hvdWxkIHJldHVybiA0MDAsIG5vIHRva2VuJywgKGRvbmUpID0+IHtcbiAgICBjaGFpLnJlcXVlc3QoYXBwKVxuICAgICAgLmdldCgnL2FwaS92MS9wYXJ0aWVzLzZlMmRjNjAxLTg5OTAtNGRlMy1hZjMyLTcxOTE4Yjg3YTM2MycpXG4gICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDApO1xuICAgICAgICBleHBlY3QocmVzLmJvZHkuZXJyb3IpLnRvLmVxdWFsKCdVc2VyIG5vdCBhdXRob3Jpc2VkIScpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9KSAgXG4gfSk7XG5cbiBpdCgnc2hvdWxkIHJldHVybiA0MDAgaWYgdXNlciBJRCBpcyBpbnZhbGlkJywgKGRvbmUpID0+IHtcbiAgY2hhaS5yZXF1ZXN0KGFwcClcbiAgICAuZ2V0KCcvYXBpL3YxL3BhcnRpZXMvcXcxYGBgODgnKVxuICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgYCR7YWRtaW5Ub2tlbn1gKVxuICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4gICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDAwKTtcbiAgICAgIGV4cGVjdChyZXMuYm9keS5lcnJvcikudG8uZXF1YWwoJ1RoZSB1c2VyIElEIHVzZWQgaXMgaW52YWxpZCcpO1xuICAgICAgZG9uZSgpO1xuICAgIH0pICBcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCByZXR1cm4gNDA0IGlmIHBhcnR5IGlzIG5vdCBmb3VuZCcsIChkb25lKSA9PiB7XG4gICAgY2hhaS5yZXF1ZXN0KGFwcClcbiAgICAgIC5nZXQoJy9hcGkvdjEvcGFydGllcy9hMzRlMmU4Ny1lZWFhLTQ3MjEtODBlOS03MjQzMDllNmJiZWEnKVxuICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCBgJHthZG1pblRva2VufWApXG4gICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDQpO1xuICAgICAgICBleHBlY3QocmVzLmJvZHkuZXJyb3IpLnRvLmVxdWFsKCdQYXJ0eSBub3QgZm91bmQnKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSkgIFxuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gMjAwLCB3aGVuIHN1Y2Nlc3NmdWwnLCAoZG9uZSkgPT4ge1xuICAgICAgY2hhaS5yZXF1ZXN0KGFwcClcbiAgICAgICAgLmdldCgnL2FwaS92MS9wYXJ0aWVzLzViNjljZmEwLTlhOWMtNDkxNy05MWI4LTY3NjliZThmYWMxMicpXG4gICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgYCR7YWRtaW5Ub2tlbn1gKVxuICAgICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cygyMDApO1xuICAgICAgICBleHBlY3QocmVzLmJvZHkuZGF0YVswXS5vcmRlci5uYW1lKS50by5lcXVhbCgnQWN0aW9uIGNvbmdyZXNzJyk7XG4gICAgICAgIGV4cGVjdChyZXMuYm9keS5kYXRhWzBdLm9yZGVyLmhxYWRkcmVzcykudG8uZXF1YWwoJyQyMicpO1xuICAgICAgICBleHBlY3QocmVzLmJvZHkuZGF0YVswXS5vcmRlci5sb2dvdXJsKS50by5lcXVhbCgnaHR0cHM6Ly9hYy5qcGcnKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgICB9KSAgXG4gICAgICB9KTtcbn0pO1xuXG4vLyBnZXQgYWxsIHBhcnRpZXNcbmRlc2NyaWJlKCdHRVQgYXBpL3YxL3BhcnRpZXMnLCAoKSA9PiB7XG4gIGl0KCdzaG91bGQgc2VsZWN0IGFsbCBwYXJ0eSBhbmQgcmV0dXJuIGl0IHN1Y2Nlc3NmdWxseScsIChkb25lKSA9PiB7XG4gICAgY2hhaS5yZXF1ZXN0KGFwcClcbiAgICAuZ2V0KCcvYXBpL3YxL3BhcnRpZXMnKVxuICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgYCR7YWRtaW5Ub2tlbn1gKVxuICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4gICAgZXhwZWN0KHJlcykudG8uYmUuanNvbjtcbiAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cygyMDApO1xuICAgIGRvbmUoKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcblxuLy8gdXBkYXRlIGEgc3BlY2lmaWMgcGFydHlcbmRlc2NyaWJlKCdQQVRDSCBhcGkvdjEvcGFydGllcycsICgpID0+IHtcbiAgaXQoJ3Nob3VsZCBub3QgZ2l2ZSBhY2Nlc3Mgd2hlbiBhZG1pbiB0b2tlbiBub3QgcHJvdmlkZWQnLCAoZG9uZSkgPT4ge1xuICAgIGNoYWkucmVxdWVzdChhcHApXG4gICAgLnBhdGNoKCcvYXBpL3YxL3BhcnRpZXMvNmUyZGM2MDEtODk5MC00ZGUzLWFmMzItNzE5MThiODdhMzYzL25hbWUnKVxuICAgIC5zZW5kKHtcbiAgICAgIG5hbWU6ICdQZW9wbGUgQ2l0eSBwYXJ0eSdcbiAgICB9KVxuICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4gICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDAwKTtcbiAgICAgIGV4cGVjdChyZXMuYm9keS5lcnJvcikudG8uZXF1YWwoJ1VzZXIgbm90IGF1dGhvcmlzZWQhJyk7XG4gICAgICBkb25lKCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgcmV0dXJuIDQwMCB3aGVuIG5hbWUgaW5wdXQgZmllbGQgaXMgbGVmdCBlbXB0eScsIChkb25lKSA9PiB7XG4gICAgY2hhaS5yZXF1ZXN0KGFwcClcbiAgICAucGF0Y2goJy9hcGkvdjEvcGFydGllcy82ZTJkYzYwMS04OTkwLTRkZTMtYWYzMi03MTkxOGI4N2EzNjMvbmFtZScpXG4gICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCBgJHthZG1pblRva2VufWApXG4gICAgLnNlbmQoe1xuICAgICAgbmFtZTogJydcbiAgICB9KVxuICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4gICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDAwKTtcbiAgICAgIGV4cGVjdChyZXMuYm9keS5lcnJvcikudG8uZXF1YWwoJ0lucHV0IGZpZWxkIGNhblxcJ3QgYmUgbGVmdCBlbXB0eScpO1xuICAgICAgZG9uZSgpO1xuICAgIH0pO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIHJldHVybiA0MDQgd2hlbiBwYXJ0eSB3aXRoIHRoYXQgaWQgZG9lcyBub3QgZXhpc3QnLCAoZG9uZSkgPT4ge1xuICAgIGNoYWkucmVxdWVzdChhcHApXG4gICAgLnBhdGNoKCcvYXBpL3YxL3BhcnRpZXMvZmQxNjQ4YjktMzJkZC00MDJhLWIyZmUtOThjOWRmMWM1ODVjL25hbWUnKVxuICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgYCR7YWRtaW5Ub2tlbn1gKVxuICAgIC5zZW5kKHtcbiAgICAgIG5hbWU6ICdDb2xkIGNpdHkgcGFydHknXG4gICAgfSlcbiAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgICAgZXhwZWN0KHJlcykudG8uYmUuanNvbjtcbiAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwNCk7XG4gICAgICBleHBlY3QocmVzLmJvZHkuZXJyb3IpLnRvLmVxdWFsKCdQYXJ0eSBub3QgZm91bmQnKTtcbiAgICAgIGRvbmUoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCByZXR1cm4gNDA0IHdoZW4gcGFydHkgd2l0aCB0aGF0IGlkIGRvZXMgbm90IGV4aXN0JywgKGRvbmUpID0+IHtcbiAgICBjaGFpLnJlcXVlc3QoYXBwKVxuICAgIC5wYXRjaCgnL2FwaS92MS9wYXJ0aWVzL2ZkMTY0OGI5MzJkZC00MDJhLTk4YzlkZjFjNDVlci9uYW1lJylcbiAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIGAke2FkbWluVG9rZW59YClcbiAgICAuc2VuZCh7XG4gICAgICBuYW1lOiAnQ29sZCBjaXR5IHBhcnR5J1xuICAgIH0pXG4gICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgIGV4cGVjdChyZXMpLnRvLmJlLmpzb247XG4gICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDApO1xuICAgICAgZXhwZWN0KHJlcy5ib2R5LmVycm9yKS50by5lcXVhbCgnT29wcywgc29tZXRoaW5nIHdyb25nIGhhcHBlbmVkLiBDaGVjayBhbmQgdHJ5IGFnYWluJyk7XG4gICAgICBkb25lKCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgcmV0dXJuIDIwMCBpZiBzdWNjZXNzZnVsJywgKGRvbmUpID0+IHtcbiAgICBjaGFpLnJlcXVlc3QoYXBwKVxuICAgIC5wYXRjaCgnL2FwaS92MS9wYXJ0aWVzL2JjM2VhMjIxLThjMmMtNDA1MC1iMTUyLWNlNGVkNTE5NjQ3NC9uYW1lJylcbiAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIGAke2FkbWluVG9rZW59YClcbiAgICAuc2VuZCh7XG4gICAgICBuYW1lOiAnQ29sZCBjaXR5IHBhcnR5J1xuICAgIH0pXG4gICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgIGV4cGVjdChyZXMpLnRvLmJlLmpzb247XG4gICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cygyMDApO1xuICAgICAgZG9uZSgpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuXG4vLyBkZWxldGUgcGFydHlcbmRlc2NyaWJlKCdERUxFVEUgYXBpL3YxL3BhcnRpZXMnLCAoKSA9PiB7XG4gIGl0KCdzaG91bGQgcmV0dXJuIDQwMCBpZiBhZG1pbiB0b2tlbiBub3QgcHJvdmlkZWQnLCAoZG9uZSkgPT4ge1xuICAgIGNoYWkucmVxdWVzdChhcHApXG4gICAgLmRlbGV0ZSgnL2FwaS92MS9wYXJ0aWVzLzZlMmRjNjAxLTg5OTAtNGRlMy1hZjMyLTcxOTE4Yjg3YTM2MycpXG4gICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgIGV4cGVjdChyZXMpLnRvLmJlLmpzb247XG4gICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDApO1xuICAgICAgZXhwZWN0KHJlcy5ib2R5LmVycm9yKS50by5lcXVhbCgnVXNlciBub3QgYXV0aG9yaXNlZCEnKTtcbiAgICAgIGRvbmUoKTtcbiAgICB9KVxuICB9KTtcblxuICBpdCgnc2hvdWxkIHJldHVybiA0MDQgaWYgcGFydHkgaWQgZG9lcyBub3QgZXhpc3QnLCAoZG9uZSkgPT4ge1xuICAgIGNoYWkucmVxdWVzdChhcHApXG4gICAgLmRlbGV0ZSgnL2FwaS92MS9wYXJ0aWVzL2ZkMTY0OGI5LTMyZGQtNDAyYS1iMmZlLTk4YzlkZjFjNTg1YycpXG4gICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCBgJHthZG1pblRva2VufWApXG4gICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgIGV4cGVjdChyZXMpLnRvLmJlLmpzb247XG4gICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDQpO1xuICAgICAgZXhwZWN0KHJlcy5ib2R5LmVycm9yKS50by5lcXVhbCg0MDQpO1xuICAgICAgZXhwZWN0KHJlcy5ib2R5Lm1lc3NhZ2UpLnRvLmVxdWFsKCdwYXJ0eSBub3QgZm91bmQnKTtcbiAgICAgIGRvbmUoKTtcbiAgICB9KVxuICB9KTtcbn0pXG5cblxuLy8gZGVzY3JpYmUoJ0dFVCBcXCdhcGkvdjEvcGFydGllc1xcJycsICgpID0+IHtcbi8vICAgaXQoJ3Nob3VsZCByZXR1cm4gYWxsIHBhcnRpZXMnLCAoZG9uZSkgPT4ge1xuLy8gICAgIGNoYWkucmVxdWVzdChhcHApXG4vLyAgICAgICAuZ2V0KCcvYXBpL3YxL3BhcnRpZXMnKVxuLy8gICAgICAgLnNlbmQoYmFkVGVzdFBhcnR5Mylcbi8vICAgICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4vLyAgICAgICAgIGV4cGVjdChyZXMuc3RhdHVzKS50by5lcXVhbCg0MDApO1xuLy8gICAgICAgICBleHBlY3QocmVzLmJvZHkpLnRvLm5vdC5iZS5lbXB0eTtcbi8vICAgICAgICAgZG9uZShlcnIpO1xuLy8gICAgICAgfSk7XG4vLyAgIH0pO1xuLy8gfSk7XG5cbi8vIGRlc2NyaWJlKCdHRVQgXFwnYXBpL3YxL3BhcnRpZXNcXCcnLCAoKSA9PiB7XG4vLyAgIGl0KCdzaG91bGQgcmV0dXJuIGFsbCBwYXJ0aWVzJywgKGRvbmUpID0+IHtcbi8vICAgICBjaGFpLnJlcXVlc3QoYXBwKVxuLy8gICAgICAgLmdldCgnL2FwaS92MS9wYXJ0aWVzJylcbi8vICAgICAgIC5zZW5kKGJhZFRlc3RQYXJ0eTQpXG4vLyAgICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuLy8gICAgICAgICBleHBlY3QocmVzLnN0YXR1cykudG8uZXF1YWwoNDAwKTtcbi8vICAgICAgICAgZXhwZWN0KHJlcy5ib2R5KS50by5ub3QuYmUuZW1wdHk7XG4vLyAgICAgICAgIGRvbmUoZXJyKTtcbi8vICAgICAgIH0pO1xuLy8gICB9KTtcbi8vIH0pO1xuXG4vLyBkZXNjcmliZSgnRmV0Y2ggUGFydGllcyBieSBJZCcsKCkgPT4ge1xuLy8gICBpdCgnc2hvdWxkIHJldHVybiA0MDEgYmVjYXVzZSB0aGVyZSBpcyBubyB0b2tlbicsIChkb25lKSA9PiB7XG4vLyAgICAgY2hhaS5yZXF1ZXN0KGFwcClcbi8vICAgICAgIC5nZXQoJy9hcGkvdjEvcGFydGllcy9hMzRlMmU4Ny1lZWFhLTQ3MjEtODBlOS03MjQzMDllNmJiZWEnKVxuLy8gICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbi8vICAgICAgICAgZXhwZWN0KGVycikudG8uYmUubnVsbDtcbi8vICAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5oZWFkZXJzO1xuLy8gICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDApO1xuLy8gICAgICAgICBleHBlY3QocmVzKS50by5ub3QucmVkaXJlY3Q7XG4vLyAgICAgICAgIGV4cGVjdChyZXMuYm9keSkudG8uYmUuYW4oJ29iamVjdCcpO1xuLy8gICAgICAgICBkb25lKCk7XG4vLyAgICAgICB9KTtcbi8vICAgfSk7XG4vLyB9KTtcblxuLy8gZGVzY3JpYmUoJ1BPU1QgXFwnL2FwaS92MS9wYXJ0aWVzXFwnJywgKCkgPT4ge1xuLy8gICBpdCgnUE9TVCBsb2dpbiB0byBhY2NvdW50JywgKGRvbmUpID0+IHsgXG4vLyAgICAgY2hhaS5yZXF1ZXN0KGFwcClcbi8vICAgICAgIC5wb3N0KCcvYXBpL3YxL3BhcnRpZXMnKVxuLy8gICAgICAgLnNlbmQoYmFkVGVzdFBhcnR5Milcbi8vICAgICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4vLyAgICAgICAgIGV4cGVjdChlcnIpLnRvLmJlLm51bGw7XG4vLyAgICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuaGVhZGVycztcbi8vICAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDAwKTtcbi8vICAgICAgICAgZXhwZWN0KHJlcykudG8ubm90LnJlZGlyZWN0O1xuLy8gICAgICAgICBleHBlY3QocmVzLmJvZHkpLnRvLmJlLmFuKCdvYmplY3QnKTtcbi8vICAgICAgICAgZG9uZSgpO1xuLy8gICAgICAgfSk7XG4vLyAgIH0pO1xuLy8gfSk7XG5cbi8vIGRlc2NyaWJlKCdQT1NUIFxcJy9hcGkvdjEvcGFydGllc1xcJycsICgpID0+IHtcbi8vICAgaXQoJ1BPU1QgbG9naW4gdG8gYWNjb3VudCcsIChkb25lKSA9PiB7IFxuLy8gICAgIGNoYWkucmVxdWVzdChhcHApXG4vLyAgICAgICAucG9zdCgnL2FwaS92MS9wYXJ0aWVzJylcbi8vICAgICAgIC5zZW5kKGJhZFRlc3RQYXJ0eTMpXG4vLyAgICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuLy8gICAgICAgICBleHBlY3QoZXJyKS50by5iZS5udWxsO1xuLy8gICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLmhlYWRlcnM7XG4vLyAgICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwMCk7XG4vLyAgICAgICAgIGV4cGVjdChyZXMpLnRvLm5vdC5yZWRpcmVjdDtcbi8vICAgICAgICAgZXhwZWN0KHJlcy5ib2R5KS50by5iZS5hbignb2JqZWN0Jyk7XG4vLyAgICAgICAgIGRvbmUoKTtcbi8vICAgICAgIH0pO1xuLy8gICB9KTtcbi8vIH0pO1xuXG4vLyBkZXNjcmliZSgnUE9TVCBcXCcvYXBpL3YxL3BhcnRpZXNcXCcnLCAoKSA9PiB7XG4vLyAgIGl0KCdQT1NUIGxvZ2luIHRvIGFjY291bnQnLCAoZG9uZSkgPT4geyBcbi8vICAgICBjaGFpLnJlcXVlc3QoYXBwKVxuLy8gICAgICAgLnBvc3QoJy9hcGkvdjEvcGFydGllcycpXG4vLyAgICAgICAuc2VuZChiYWRUZXN0UGFydHk0KVxuLy8gICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbi8vICAgICAgICAgZXhwZWN0KGVycikudG8uYmUubnVsbDtcbi8vICAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5oZWFkZXJzO1xuLy8gICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDApO1xuLy8gICAgICAgICBleHBlY3QocmVzKS50by5ub3QucmVkaXJlY3Q7XG4vLyAgICAgICAgIGV4cGVjdChyZXMuYm9keSkudG8uYmUuYW4oJ29iamVjdCcpO1xuLy8gICAgICAgICBkb25lKCk7XG4vLyAgICAgICB9KTtcbi8vICAgfSk7XG4vLyB9KTtcblxuLy8gY3JlYXRlIG9mZmljZVxuZGVzY3JpYmUoJ1BPU1QgL2FwaS92MS9vZmZpY2VzJywgKCkgPT4ge1xuICBpdCgnb25seSBhdXRob3Jpc2UgYWRtaW4gY2FuIGFjY2VzcycsIChkb25lKSA9PiB7XG4gICAgY2hhaS5yZXF1ZXN0KGFwcClcbiAgICAgIC5wb3N0KCcvYXBpL3YxL29mZmljZXMnKVxuICAgICAgLnNlbmQob2ZmaWNlcylcbiAgICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLmJlLmpzb247XG4gICAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDAwKTtcbiAgICAgICAgICBleHBlY3QocmVzLmJvZHkuZXJyb3IpLnRvLmVxdWFsKCdVc2VyIG5vdCBhdXRob3Jpc2VkIScpO1xuICAgICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICB9KTtcbiAgaXQoJ29mZmljZSB0eXBlIG11c3Qgbm90IGJlIGVtcHR5JywgKGRvbmUpID0+IHtcbiAgICBjaGFpLnJlcXVlc3QoYXBwKVxuICAgICAgLnBvc3QoJy9hcGkvdjEvb2ZmaWNlcycpXG4gICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIGAke2FkbWluVG9rZW59YClcbiAgICAgIC5zZW5kKG9mZmljZXMyKVxuICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgICAgZXhwZWN0KHJlcykudG8uYmUuanNvbjtcbiAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDAwKTtcbiAgICAgICAgZXhwZWN0KHJlcy5ib2R5LmVycm9yKS50by5lcXVhbCgnVHlwZSBmaWVsZCBpcyBlbXB0eScpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ29mZmljZSBuYW1lIGZpZWxkIG11c3Qgbm90IGJlIGVtcHR5JywgKGRvbmUpID0+IHtcbiAgICBjaGFpLnJlcXVlc3QoYXBwKVxuICAgICAgLnBvc3QoJy9hcGkvdjEvb2ZmaWNlcycpXG4gICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIGAke2FkbWluVG9rZW59YClcbiAgICAgIC5zZW5kKG9mZmljZXMzKVxuICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgICAgZXhwZWN0KHJlcykudG8uYmUuanNvbjtcbiAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDAwKTtcbiAgICAgICAgZXhwZWN0KHJlcy5ib2R5LmVycm9yKS50by5lcXVhbCgnTmFtZSBmaWVsZCBpcyBlbXB0eScpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ29mZmljZSBpbnB1dHMgZmllbGQgbXVzdCBub3QgYmUgZW1wdHknLCAoZG9uZSkgPT4ge1xuICAgIGNoYWkucmVxdWVzdChhcHApXG4gICAgICAucG9zdCgnL2FwaS92MS9vZmZpY2VzJylcbiAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgYCR7YWRtaW5Ub2tlbn1gKVxuICAgICAgLnNlbmQob2ZmaWNlczQpXG4gICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDApO1xuICAgICAgICBleHBlY3QocmVzLmJvZHkuZXJyb3IpLnRvLmVxdWFsKCdJbnB1dHMgZmllbGRzIGNhblxcJ3QgYmUgbGVmdCBlbXB0eScpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgXG4gIGl0KCdvZmZpY2UgbmFtZSBhbmQgdHlwZSBzaG91bGQgY29udGFpbiBvbmx5IGFscGhhYmV0cycsIChkb25lKSA9PiB7XG4gICAgY2hhaS5yZXF1ZXN0KGFwcClcbiAgICAgIC5wb3N0KCcvYXBpL3YxL29mZmljZXMnKVxuICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCBgJHthZG1pblRva2VufWApXG4gICAgICAuc2VuZChvZmZpY2VzNSlcbiAgICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLmJlLmpzb247XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwMCk7XG4gICAgICAgIGV4cGVjdChyZXMuYm9keS5lcnJvcikudG8uZXF1YWwoJ0FscGhhYmV0cyBvbmx5Jyk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICB9KTtcblxuICBpdCgnb2ZmaWNlIG11c3Qgbm90IGFscmVhZHkgZXhpc3QgaW4gdGhlIGRhdGFiYXNlJywgKGRvbmUpID0+IHtcbiAgICBjaGFpLnJlcXVlc3QoYXBwKVxuICAgICAgLnBvc3QoJy9hcGkvdjEvb2ZmaWNlcycpXG4gICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIGAke2FkbWluVG9rZW59YClcbiAgICAgIC5zZW5kKHtcbiAgICAgICAgbmFtZTogJ1ByZXNpZGVuY3knLFxuICAgICAgICB0eXBlOidGZWRlcmFsJ1xuICAgICAgfSlcbiAgICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLmJlLmpzb247XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwMCk7XG4gICAgICAgIGV4cGVjdChyZXMuYm9keS5lcnJvcikudG8uZXF1YWwoJ09mZmljZSBhbHJlYWR5IGV4aXN0Jyk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICB9KTtcbi8vIHVucmVzb2x2ZWQgcHJvbWlzZVxuICBpdCgnc2hvdWxkIHJldHVybiAyMDEgaWYgc3VjY2Vzc2Z1bCcsIChkb25lKSA9PiB7XG4gICAgY2hhaS5yZXF1ZXN0KGFwcClcbiAgICAgIC5wb3N0KCcvYXBpL3YxL29mZmljZXMnKVxuICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCBgJHthZG1pblRva2VufWApXG4gICAgICAuc2VuZCh7XG4gICAgICAgIHR5cGU6J1N0YXRlJyxcbiAgICAgICAgbmFtZTogJ0dvdmVybm9yIG9mIEthZHVuYSBzdGF0ZSdcbiAgICAgIH0pXG4gICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDApOyAgLy93cm9uZ1xuICAgICAgICAvLyBleHBlY3QocmVzLmJvZHkuZGF0YVswXS5tZXNzYWdlKS50by5lcXVhbCgnb2ZmaWNlIGNyZWF0ZWQnKTtcbiAgICAgICAgLy8gZXhwZWN0KHJlcy5ib2R5LmRhdGFbMF0ub3JkZXIudHlwZSkudG8uZXF1YWwoJ1N0YXRlJyk7XG4gICAgICAgIC8vIGV4cGVjdChyZXMuYm9keS5kYXRhWzBdLm9yZGVyLm5hbWUpLnRvLmVxdWFsKCdHb3Zlcm5vciBvZiBLYWR1bmEgc3RhdGUnKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gIH0pO1xufSk7XG5cbi8vIGdldCBhbGwgb2ZmaWNlXG5kZXNjcmliZSgnR0VUIC9hcGkvdjEvb2ZmaWNlcycsICgpID0+IHtcbiAgaXQoJ3Nob3VsZCBnZXQgYWxsIG9mZmljZXMnLCAoZG9uZSkgPT4ge1xuICAgIGNoYWkucmVxdWVzdChhcHApXG4gICAgLmdldCgnL2FwaS92MS9vZmZpY2VzJylcbiAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIGAke2FkbWluVG9rZW59YClcbiAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgIGV4cGVjdChyZXMpLnRvLmJlLmpzb247XG4gICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoMjAwKTtcbiAgICBleHBlY3QocmVzKS50by5iZS5hbignb2JqZWN0Jyk7XG4gICAgZG9uZSgpO1xuICAgIH0pO1xuICB9KVxufSk7XG5cbi8vIGdldCBhIHNwZWNpZmljIG9mZmljZVxuZGVzY3JpYmUoJ0dFVCBhcGkvdjEvb2ZmaWNlcycsICgpID0+IHtcbiAgaXQoJ3Nob3VsZCByZXR1cm4gNDAwLCBubyB0b2tlbicsIChkb25lKSA9PiB7XG4gICAgIGNoYWkucmVxdWVzdChhcHApXG4gICAgICAgLmdldCgnL2FwaS92MS9vZmZpY2VzLzZlMmRjNjAxLTg5OTAtNGRlMy1hZjMyLTcxOTE4Yjg3YTM2MycpXG4gICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgICAgIGV4cGVjdChyZXMpLnRvLmJlLmpzb247XG4gICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDApO1xuICAgICAgICAgZXhwZWN0KHJlcy5ib2R5LmVycm9yKS50by5lcXVhbCgnVXNlciBub3QgYXV0aG9yaXNlZCEnKTtcbiAgICAgICAgIGRvbmUoKTtcbiAgICAgICB9KSAgXG4gIH0pO1xuIFxuICBpdCgnc2hvdWxkIHJldHVybiA0MDAgaWYgdXNlciBJRCBpcyBpbnZhbGlkJywgKGRvbmUpID0+IHtcbiAgIGNoYWkucmVxdWVzdChhcHApXG4gICAgIC5nZXQoJy9hcGkvdjEvb2ZmaWNlcy9xdzFgYGA4OCcpXG4gICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgYCR7YWRtaW5Ub2tlbn1gKVxuICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgICAgIGV4cGVjdChyZXMpLnRvLmJlLmpzb247XG4gICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDAwKTtcbiAgICAgICBleHBlY3QocmVzLmJvZHkuZXJyb3IpLnRvLmVxdWFsKCdCYWQgcmVxdWVzdC4gQ2hlY2sgYW5kIHRyeSBhZ2FpbicpO1xuICAgICAgIGRvbmUoKTtcbiAgICAgfSkgIFxuICAgfSk7XG4gXG4gICBpdCgnc2hvdWxkIHJldHVybiA0MDQgaWYgb2ZmaWNlIGlzIG5vdCBmb3VuZCcsIChkb25lKSA9PiB7XG4gICAgIGNoYWkucmVxdWVzdChhcHApXG4gICAgICAgLmdldCgnL2FwaS92MS9vZmZpY2VzL2EzNGUyZTg3LWVlYWEtNDcyMS04MGU5LTcyNDMwOWU2YmJlYScpXG4gICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCBgJHthZG1pblRva2VufWApXG4gICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgICAgIGV4cGVjdChyZXMpLnRvLmJlLmpzb247XG4gICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDQpO1xuICAgICAgICAgZXhwZWN0KHJlcy5ib2R5LmVycm9yKS50by5lcXVhbCgnT2ZmaWNlIG5vdCBmb3VuZCcpO1xuICAgICAgICAgZG9uZSgpO1xuICAgICAgIH0pICBcbiAgICAgfSk7XG4vLyAgaW5zZXJ0IGRhdGFiYXNlIHZhbHVlcyBpbnRvIHRoZSByaWdodCBwbGFjZXNcbiAgICAgaXQoJ3Nob3VsZCByZXR1cm4gMjAwLCB3aGVuIHN1Y2Nlc3NmdWwnLCAoZG9uZSkgPT4ge1xuICAgICAgIGNoYWkucmVxdWVzdChhcHApXG4gICAgICAgICAuZ2V0KCcvYXBpL3YxL29mZmljZXMvZmQxNjQ4YjktMzJkZC00MDJhLWIyZmUtOThjOWRmMWM1ODVjJylcbiAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgYCR7YWRtaW5Ub2tlbn1gKVxuICAgICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgICAgIGV4cGVjdChyZXMpLnRvLmJlLmpzb247XG4gICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDApOyAvL3dyb25nXG4gICAgICAgIC8vICBleHBlY3QocmVzLmJvZHkuZGF0YVswXS50eXBlKS50by5lcXVhbCgnRmVkZXJhbCcpO1xuICAgICAgICAvLyAgZXhwZWN0KHJlcy5ib2R5LmRhdGFbMF0ubmFtZSkudG8uZXF1YWwoJ1ByZXNpZGVuY3knKTtcbiAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgIH0pICBcbiAgICAgICB9KTtcbiB9KTtcblxuLy8gIGdldCBvZmZpY2UgcmVzdWx0XG5kZXNjcmliZSgnR0VUIC9hcGkvdjEvb2ZmaWNlLzpvZmZpY2VpZC9yZXN1bHQnLCAoKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIGhhdmUgYSB2YWxpZCBJRCBwYXNzZWQgb24gdG8gdGhlIHBhcmFtcycsIChkb25lKSA9PiB7XG4gICAgICAgIGNoYWkucmVxdWVzdChhcHApXG4gICAgICAgIC5nZXQoJy9hcGkvdjEvb2ZmaWNlLzc4dHktLS9yZXN1bHQnKVxuICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIGAke2FkbWluVG9rZW59YClcbiAgICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAgICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwMCk7XG4gICAgICAgICAgZXhwZWN0KHJlcy5ib2R5LmVycm9yKS50by5lcXVhbCgnVGhlIHVzZXIgSUQgdXNlZCBpcyBpbnZhbGlkJyk7XG4gICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9KVxuICAgICAgfSk7XG5cbiAgICAgIC8vIGl0KCdzaG91bGQgcmV0dXJuIDQwNCBpZiBvZmZpY2UgaXMgbm90IGZvdW5kJywgKGRvbmUpID0+IHtcbiAgICAgIC8vICAgY2hhaS5yZXF1ZXN0KGFwcClcbiAgICAgIC8vICAgLmdldCgnL2FwaS92MS9vZmZpY2UvMjQwMGNmYmMtNGIxNS00MDA2LTg2YzMtM2ZmNzY3YTYzMTA1L3Jlc3VsdCcpXG4gICAgICAvLyAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgYCR7YWRtaW5Ub2tlbn1gKVxuICAgICAgLy8gICAuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgICAgLy8gICAgIGV4cGVjdChyZXMpLnRvLmJlLmpzb247XG4gICAgICAvLyAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDAwKTtcbiAgICAgIC8vICAgICBleHBlY3QocmVzLmJvZHkuZXJyb3IpLnRvLmVxdWFsKCdPZmZpY2Ugbm90IGZvdW5kJyk7XG4gICAgICAvLyAgICAgZG9uZSgpO1xuICAgICAgLy8gICB9KVxuICAgICAgLy8gfSk7XG5cbiAgICAgIC8vIGNoZWNrIGRhdGFiYXNlIGZvciB0aGUgbGVmdCBibGFuayBpbnB1dHNcbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIDIwMCBpZiBvZmZpY2UgcmVzdWx0IGlzIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5JywgKGRvbmUpID0+IHtcbiAgICAgICAgY2hhaS5yZXF1ZXN0KGFwcClcbiAgICAgICAgLmdldCgnL2FwaS92MS9vZmZpY2UvZmQxNjQ4YjktMzJkZC00MDJhLWIyZmUtOThjOWRmMWM1ODVjL3Jlc3VsdCcpXG4gICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgYCR7YWRtaW5Ub2tlbn1gKVxuICAgICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgICAgICAgIGV4cGVjdChyZXMpLnRvLmJlLmpzb247XG4gICAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoMjAwKTtcbiAgICAgICAgICAvLyBleHBlY3QocmVzLmJvZHkuZGF0YVswXS5zaW5nbGVSZXN1bHQub2ZmaWNlKS50by5lcXVhbCgnZmQxNjQ4YjktMzJkZC00MDJhLWIyZmUtOThjOWRmMWM1ODVjJyk7XG4gICAgICAgICAgLy8gZXhwZWN0KHJlcy5ib2R5LmRhdGFbMF0uc2luZ2xlUmVzdWx0LmNhbmRpZGF0ZSkudG8uZXF1YWwoJzhlYTc2ZTQwLTdmMmYtNGJjZS1iMDdmLTlmMzg3MmFjMzljMCcsICdiY2YzOGQ3NC02YmI5LTQwMzctODRhNS1lNjk0YWRmMjdjMGQnKTtcbiAgICAgICAgICBkb25lKCk7XG4gICAgICAgIH0pXG4gICAgICB9KTsgIFxufSk7XG5cbi8vIHZvdGVzXG5kZXNjcmliZSgnUE9TVCAvYXBpL3YxL3ZvdGVzJywgKCkgPT4ge1xuICBpdCgnc2hvdWxkIHJldHVybiA0MDAgaWYgaW5wdXRzIGNvbnRhaW4gd2hpdGUgc3BhY2VzJywgKGRvbmUpID0+e1xuICAgIGNoYWkucmVxdWVzdChhcHApXG4gICAgLnBvc3QoJy9hcGkvdjEvdm90ZXMnKVxuICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgYCR7YWRtaW5Ub2tlbn1gKVxuICAgIC5zZW5kKGJhZFZvdGVSZXN1bHQ1KVxuICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4gICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDAwKTtcbiAgICAgIGV4cGVjdChyZXMuYm9keS5lcnJvcikudG8uZXF1YWwoJ1doaXRlIFNwYWNlIGFyZSBub3QgYWxsb3dlZCBpbiBpbnB1dCBmaWVsZHMnKTtcbiAgICAgIGRvbmUoKTtcbiAgICB9KVxuICB9KTtcblxuICBpdCgnc2hvdWxkIHJldHVybiA0MDAgd2hlbiBhbGwgaW5wdXRzIGZpZWxkcyBpcyBlbXB0eScsIChkb25lKSA9PntcbiAgICBjaGFpLnJlcXVlc3QoYXBwKVxuICAgIC5wb3N0KCcvYXBpL3YxL3ZvdGVzJylcbiAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIGAke2FkbWluVG9rZW59YClcbiAgICAuc2VuZChiYWRWb3RlUmVzdWx0NClcbiAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgICAgZXhwZWN0KHJlcykudG8uYmUuanNvbjtcbiAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwMCk7XG4gICAgICBleHBlY3QocmVzLmJvZHkuZXJyb3IpLnRvLmVxdWFsKCdTb21lIHZhbHVlcyBhcmUgbWlzc2luZycpO1xuICAgICAgZG9uZSgpO1xuICAgIH0pXG4gIH0pO1xuXG4gIC8vIGl0KCdzaG91bGQgcmV0dXJuIDIwMSB3aGVuIHZvdGUgaXMgc3VjY2Vzc2Z1bCcsIChkb25lKSA9PntcbiAgLy8gICBjaGFpLnJlcXVlc3QoYXBwKVxuICAvLyAgIC5wb3N0KCcvYXBpL3YxL3ZvdGVzJylcbiAgLy8gICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIGAke2FkbWluVG9rZW59YClcbiAgLy8gICAuc2VuZChnb29kVm90ZVJlc3VsdClcbiAgLy8gICAuZW5kKChlcnIsIHJlcykgPT4ge1xuICAvLyAgICAgZXhwZWN0KHJlcykudG8uYmUuanNvbjtcbiAgLy8gICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDIwMSk7XG4gIC8vICAgICBleHBlY3QocmVzLmJvZHlbMF0uZGF0YS5tZXNzYWdlKS50by5lcXVhbCgnVm90ZSBjb21wbGV0ZScpO1xuICAvLyAgICAgLy8gZXhwZWN0KHJlcy5ib2R5WzBdLmRhdGEuZGF0YS5vZmZpY2UpLnRvLmVxdWFsKCdmZDE2NDhiOS0zMmRkLTQwMmEtYjJmZS05OGM5ZGYxYzU4NWMnKTtcbiAgLy8gICAgIC8vIGV4cGVjdChyZXMuYm9keVswXS5kYXRhLmRhdGEuY2FuZGlkYXRlKS50by5lcXVhbCgnN2MwMWI0M2QtZTkxMS00YTZmLThjYzAtMWQ1YzhjMTY1MDFkJyk7XG4gIC8vICAgICAvLyBleHBlY3QocmVzLmJvZHlbMF0uZGF0YS5kYXRhLnZvdGVyKS50by5lcXVhbCgnYTU5MzQyNTYtZWExYi00NzZjLWFmOWEtYjJhYjRjNTUxMmI2Jyk7XG4gIC8vICAgICBkb25lKCk7XG4gIC8vICAgfSlcbiAgLy8gfSk7XG59KTtcblxuLy8gUmVnaXN0ZXIgY2FuZGlkYXRlc1xuLy8gaWQgaSB1c2VkIGZvciB0aGUgdXNlciBpcyBmYW4gb2ZmaWNlIGlkLCBjaGFuZ2UgaXRcbiBkZXNjcmliZSgnUE9TVCAvYXBpL3YxL29mZmljZS86dXNlcmlkL3JlZ2lzdGVyJywgKCkgPT4ge1xuICBpdCgnc2hvdWxkIHJldHVybiA0MDAgaWYgbm8gYWRtaW4gdG9rZW4nLCAoZG9uZSkgPT57XG4gICAgICBjaGFpLnJlcXVlc3QoYXBwKVxuICAgICAgICAucG9zdCgnL2FwaS92MS9vZmZpY2UvNmUyZGM2MDEtODk5MC00ZGUzLWFmMzItNzE5MThiODdhMzYzL3JlZ2lzdGVyJylcbiAgICAgICAgLnNlbmQoY2FuZGlkYXRlNClcbiAgICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAgICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwMCk7XG4gICAgICAgICAgZXhwZWN0KHJlcy5ib2R5LmVycm9yKS50by5lcXVhbCgnVXNlciBub3QgYXV0aG9yaXNlZCEnKTtcbiAgICAgICAgICBkb25lKCk7XG4gICAgIH0pICBcbiAgfSk7XG4gIGl0KCdzaG91bGQgcmV0dXJuIDQwMCBpZiBubyBvZmZpY2UgYW5kIHBhcnR5IGlucHV0cycsIChkb25lKSA9PiB7XG4gICAgY2hhaS5yZXF1ZXN0KGFwcClcbiAgICAucG9zdCgnL2FwaS92MS9vZmZpY2UvNmUyZGM2MDEtODk5MC00ZGUzLWFmMzItNzE5MThiODdhMzYzL3JlZ2lzdGVyJylcbiAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIGAke2FkbWluVG9rZW59YClcbiAgICAuc2VuZCh7XG4gICAgICBvZmZpY2U6ICcnLFxuICAgICAgcGFydHk6ICcnLFxuICAgICAgY2FuZGlkYXRlOiAnJ1xuICAgIH0pXG4gICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgIGV4cGVjdChyZXMpLnRvLmJlLmpzb247XG4gICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDApO1xuICAgICAgZXhwZWN0KHJlcy5ib2R5LmVycm9yKS50by5lcXVhbCgnU29tZSB2YWx1ZXMgYXJlIG1pc3NpbmcnKTtcbiAgICAgIGRvbmUoKTtcbiAgICB9KVxuICB9KVxuXG4gIGl0KCdzaG91bGQgcmV0dXJuIDQwMCBpZiBjYW5kaWRhdGUgaW5wdXRzIGlzIGVtcHR5JywgKGRvbmUpID0+IHtcbiAgICBjaGFpLnJlcXVlc3QoYXBwKVxuICAgIC5wb3N0KCcvYXBpL3YxL29mZmljZS82ZTJkYzYwMS04OTkwLTRkZTMtYWYzMi03MTkxOGI4N2EzNjMvcmVnaXN0ZXInKVxuICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgYCR7YWRtaW5Ub2tlbn1gKVxuICAgIC5zZW5kKGNhbmRpZGF0ZTMpXG4gICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgIGV4cGVjdChyZXMpLnRvLmJlLmpzb247XG4gICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDApO1xuICAgICAgZXhwZWN0KHJlcy5ib2R5LmVycm9yKS50by5lcXVhbCgnY2FuZGlkYXRlIGZpZWxkIGNhblxcJ3QgYmUgZW1wdHknKTtcbiAgICAgIGRvbmUoKTtcbiAgICB9KVxuICB9KVxuXG4gIC8vIGl0KCdzaG91bGQgcmV0dXJuIDIwMSBpZiBzdWNjZXNzZnVsbHkgcmVnaXN0ZXJlZCcsIChkb25lKSA9PiB7XG4gIC8vICAgY2hhaS5yZXF1ZXN0KGFwcClcbiAgLy8gICAucG9zdCgnL2FwaS92MS9vZmZpY2UvNmUyZGM2MDEtODk5MC00ZGUzLWFmMzItNzE5MThiODdhMzYzL3JlZ2lzdGVyJylcbiAgLy8gICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIGAke2FkbWluVG9rZW59YClcbiAgLy8gICAuc2VuZChjYW5kaWRhdGU0KVxuICAvLyAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4gIC8vICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAvLyAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDAwKTtcbiAgLy8gICAgIGV4cGVjdChyZXMuYm9keVswXS5tZXNzYWdlKS50by5lcXVhbCgnQ2FuZGlkYXRlIFJlZ2lzdGVyZWQnKTtcbiAgLy8gICAgIC8vIGV4cGVjdChyZXMuYm9keVswXS5kYXRhLmNhbmRpZGF0ZS1pZCkudG8uZXF1YWwoJzI2NDNlMzk3LTRjZjctNDk2OC04OWQ1LTk2MDU5YmZkMGVhNicpO1xuICAvLyAgICAgLy8gZXhwZWN0KHJlcy5ib2R5WzBdLmRhdGEub2ZmaWNlKS50by5lcXVhbCgnYWMwYTg4OWQtNTdkMi00NDc3LTgwNWEtODBjYjIyY2YxYjNjJyk7XG4gIC8vICAgICAvLyBleHBlY3QocmVzLmJvZHlbMF0uZGF0YS51c2VyKS50by5lcXVhbCgnYWMwYTg4OWQtNTdkMi00NDc3LTgwNWEtODBjYjIyY2YxYjNjJyk7XG4gIC8vICAgICBkb25lKCk7XG4gIC8vICAgfSlcbiAgLy8gfSlcbn0pO1xuXG5cblxuXG4vLyBkZXNjcmliZSgnR0VUIC9vZmZpY2UnLCAoKSA9PiB7XG4vLyAgIGl0KCdzaG91bGQgcmV0dXJuIGFsbCBvZmZpY2VzJywgKGRvbmUpID0+IHtcbi8vICAgICBjaGFpLnJlcXVlc3QoYXBwKVxuLy8gICAgICAgLmdldCgnL2FwaS92MS9vZmZpY2VzJylcbi8vICAgICAgIC5zZW5kKG9mZmljZXMyKVxuLy8gICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbi8vICAgICAgICAgZXhwZWN0KHJlcy5zdGF0dXMpLnRvLmVxdWFsKDQwMCk7XG4vLyAgICAgICAgIGV4cGVjdChyZXMuYm9keSkudG8ubm90LmJlLmVtcHR5O1xuLy8gICAgICAgICBkb25lKGVycik7XG4vLyAgICAgICB9KTtcbi8vICAgfSk7XG4vLyB9KTtcblxuLy8gZGVzY3JpYmUoJ0dFVCAvb2ZmaWNlcycsICgpID0+IHtcbi8vICAgaXQoJ3Nob3VsZCByZXR1cm4gYWxsIG9mZmljZXMnLCAoZG9uZSkgPT4ge1xuLy8gICAgIGNoYWkucmVxdWVzdChhcHApXG4vLyAgICAgICAuZ2V0KCcvYXBpL3YxL29mZmljZXMnKVxuLy8gICAgICAgLnNlbmQob2ZmaWNlczMpXG4vLyAgICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuLy8gICAgICAgICBleHBlY3QocmVzLnN0YXR1cykudG8uZXF1YWwoNDAwKTtcbi8vICAgICAgICAgZXhwZWN0KHJlcy5ib2R5KS50by5ub3QuYmUuZW1wdHk7XG4vLyAgICAgICAgIGRvbmUoZXJyKTtcbi8vICAgICAgIH0pO1xuLy8gICB9KTtcbi8vIH0pO1xuXG4vLyBkZXNjcmliZSgnRmV0Y2ggb2ZmaWNlIGJ5IElkJywoKSA9PiB7XG4vLyAgIGl0KCdzaG91bGQgcmV0dXJuIDQwMSBiZWNhdXNlIHRoZXJlIGlzIG5vIHRva2VuJywgKGRvbmUpID0+IHtcbi8vICAgICBjaGFpLnJlcXVlc3QoYXBwKVxuLy8gICAgICAgLmdldCgnL2FwaS92MS9vZmZpY2VzL2EzNGUyZTg3LWVlYWEtNDcyMS04MGU5LTcyNDMwOWU2YmJlYScpXG4vLyAgICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuLy8gICAgICAgICBleHBlY3QoZXJyKS50by5iZS5udWxsO1xuLy8gICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLmhlYWRlcnM7XG4vLyAgICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwMCk7XG4vLyAgICAgICAgIGV4cGVjdChyZXMpLnRvLm5vdC5yZWRpcmVjdDtcbi8vICAgICAgICAgZXhwZWN0KHJlcy5ib2R5KS50by5iZS5hbignb2JqZWN0Jyk7XG4vLyAgICAgICAgIGRvbmUoKTtcbi8vICAgICAgIH0pO1xuLy8gICB9KTtcbi8vIH0pO1xuXG4vLyBkZXNjcmliZSgnUG9zdCBcXCcvYXBpL3YxXFwnJywgKCkgPT4ge1xuLy8gICBpdCgnUE9TVCBvZmZpY2UgdG8gYWNjb3VudCcsIChkb25lKSA9PiB7IC8vIFdIRU4gRU1BSUwgSVMgSU5DT1JSRUNUTFkgTEFJRFxuLy8gICAgIGNoYWkucmVxdWVzdChhcHApXG4vLyAgICAgICAucG9zdCgnL2FwaS92MS9vZmZpY2VzJylcbi8vICAgICAgIC5zZW5kKG9mZmljZXMyKVxuLy8gICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbi8vICAgICAgICAgZXhwZWN0KGVycikudG8uYmUubnVsbDtcbi8vICAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5oZWFkZXJzO1xuLy8gICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDApO1xuLy8gICAgICAgICBleHBlY3QocmVzKS50by5ub3QucmVkaXJlY3Q7XG4vLyAgICAgICAgIGV4cGVjdChyZXMuYm9keSkudG8uYmUuYW4oJ29iamVjdCcpO1xuLy8gICAgICAgICBkb25lKCk7XG4vLyAgICAgICB9KTtcbi8vICAgfSk7XG4vLyB9KTtcblxuLy8gZGVzY3JpYmUoJ1Bvc3QgXFwnL2FwaS92MS9vZmZpY2VzXFwnJywgKCkgPT4ge1xuLy8gICBpdCgnUE9TVCBvZmZpY2UgdG8gYWNjb3VudCcsIChkb25lKSA9PiB7IC8vIFdIRU4gRU1BSUwgSVMgSU5DT1JSRUNUTFkgTEFJRFxuLy8gICAgIGNoYWkucmVxdWVzdChhcHApXG4vLyAgICAgICAucG9zdCgnL2FwaS92MS9vZmZpY2VzJylcbi8vICAgICAgIC5zZW5kKG9mZmljZXMzKVxuLy8gICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbi8vICAgICAgICAgZXhwZWN0KGVycikudG8uYmUubnVsbDtcbi8vICAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5oZWFkZXJzO1xuLy8gICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDApO1xuLy8gICAgICAgICBleHBlY3QocmVzKS50by5ub3QucmVkaXJlY3Q7XG4vLyAgICAgICAgIGV4cGVjdChyZXMuYm9keSkudG8uYmUuYW4oJ29iamVjdCcpO1xuLy8gICAgICAgICBkb25lKCk7XG4vLyAgICAgICB9KTtcbi8vICAgfSk7XG4vLyB9KTtcblxuLy8gZGVzY3JpYmUoJ1Bvc3QgXFwnL2FwaS92MVxcJycsICgpID0+IHtcbi8vICAgaXQoJ1BPU1Qgdm90ZSBmb3IgYSBjYW5kaWRhdGUnLCAoZG9uZSkgPT4geyAvLyBXSEVOIEVNQUlMIElTIElOQ09SUkVDVExZIExBSURcbi8vICAgICBjaGFpLnJlcXVlc3QoYXBwKVxuLy8gICAgICAgLnBvc3QoJy9hcGkvdjEvdm90ZScpXG4vLyAgICAgICAuc2VuZCh2b3RlMSlcbi8vICAgICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4vLyAgICAgICAgIGV4cGVjdChlcnIpLnRvLmJlLm51bGw7XG4vLyAgICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuaGVhZGVycztcbi8vICAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDA0KTtcbi8vICAgICAgICAgZXhwZWN0KHJlcykudG8ubm90LnJlZGlyZWN0O1xuLy8gICAgICAgICBleHBlY3QocmVzLmJvZHkpLnRvLmJlLmFuKCdvYmplY3QnKTtcbi8vICAgICAgICAgZG9uZSgpO1xuLy8gICAgICAgfSk7XG4vLyAgIH0pO1xuLy8gfSk7XG5cbi8vIGRlc2NyaWJlKCdQb3N0IFxcJy9hcGkvdjFcXCcnLCAoKSA9PiB7XG4vLyAgIGl0KCdQT1NUIHZvdGUgZm9yIGEgY2FuZGlkYXRlJywgKGRvbmUpID0+IHsgLy8gV0hFTiBFTUFJTCBJUyBJTkNPUlJFQ1RMWSBMQUlEXG4vLyAgICAgY2hhaS5yZXF1ZXN0KGFwcClcbi8vICAgICAgIC5wb3N0KCcvYXBpL3YxL3ZvdGUnKVxuLy8gICAgICAgLnNlbmQodm90ZTIpXG4vLyAgICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuLy8gICAgICAgICBleHBlY3QoZXJyKS50by5iZS5udWxsO1xuLy8gICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLmhlYWRlcnM7XG4vLyAgICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwNCk7XG4vLyAgICAgICAgIGV4cGVjdChyZXMpLnRvLm5vdC5yZWRpcmVjdDtcbi8vICAgICAgICAgZXhwZWN0KHJlcy5ib2R5KS50by5iZS5hbignb2JqZWN0Jyk7XG4vLyAgICAgICAgIGRvbmUoKTtcbi8vICAgICAgIH0pO1xuLy8gICB9KTtcbi8vIH0pO1xuXG4vLyBkZXNjcmliZSgnUG9zdCBcXCcvYXBpL3YxXFwnJywgKCkgPT4ge1xuLy8gICBpdCgnUE9TVCB2b3RlIGZvciBhIGNhbmRpZGF0ZScsIChkb25lKSA9PiB7IC8vIFdIRU4gRU1BSUwgSVMgSU5DT1JSRUNUTFkgTEFJRFxuLy8gICAgIGNoYWkucmVxdWVzdChhcHApXG4vLyAgICAgICAucG9zdCgnL2FwaS92MS92b3RlJylcbi8vICAgICAgIC5zZW5kKHZvdGUzKVxuLy8gICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbi8vICAgICAgICAgZXhwZWN0KGVycikudG8uYmUubnVsbDtcbi8vICAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5oZWFkZXJzO1xuLy8gICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDQpO1xuLy8gICAgICAgICBleHBlY3QocmVzKS50by5ub3QucmVkaXJlY3Q7XG4vLyAgICAgICAgIGV4cGVjdChyZXMuYm9keSkudG8uYmUuYW4oJ29iamVjdCcpO1xuLy8gICAgICAgICBkb25lKCk7XG4vLyAgICAgICB9KTtcbi8vICAgfSk7XG4vLyB9KTtcblxuLy8gZGVzY3JpYmUoJ1Bvc3QgXFwnL2FwaS92MVxcJycsICgpID0+IHtcbi8vICAgaXQoJ1BPU1QgcmVnaXN0ZXIgYSBjYW5kaWRhdGUnLCAoZG9uZSkgPT4geyAvLyBXSEVOIEVNQUlMIElTIElOQ09SUkVDVExZIExBSURcbi8vICAgICBjaGFpLnJlcXVlc3QoYXBwKVxuLy8gICAgICAgLnBvc3QoJy9hcGkvdjEvOm9mZmljZWlkL3JlZ2lzdGVyJylcbi8vICAgICAgIC5zZW5kKGNhbmRpZGF0ZTEpXG4vLyAgICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuLy8gICAgICAgICBleHBlY3QoZXJyKS50by5iZS5udWxsO1xuLy8gICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLmhlYWRlcnM7XG4vLyAgICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwNCk7XG4vLyAgICAgICAgIGV4cGVjdChyZXMpLnRvLm5vdC5yZWRpcmVjdDtcbi8vICAgICAgICAgZXhwZWN0KHJlcy5ib2R5KS50by5iZS5hbignb2JqZWN0Jyk7XG4vLyAgICAgICAgIGRvbmUoKTtcbi8vICAgICAgIH0pO1xuLy8gICB9KTtcbi8vIH0pO1xuXG4vLyBkZXNjcmliZSgnUG9zdCBcXCcvYXBpL3YxXFwnJywgKCkgPT4ge1xuLy8gICBpdCgnUE9TVCByZWdpc3RlciBhIGNhbmRpZGF0ZScsIChkb25lKSA9PiB7IC8vIFdIRU4gRU1BSUwgSVMgSU5DT1JSRUNUTFkgTEFJRFxuLy8gICAgIGNoYWkucmVxdWVzdChhcHApXG4vLyAgICAgICAucG9zdCgnL2FwaS92MS86b2ZmaWNlaWQvcmVnaXN0ZXInKVxuLy8gICAgICAgLnNlbmQoY2FuZGlkYXRlMilcbi8vICAgICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4vLyAgICAgICAgIGV4cGVjdChlcnIpLnRvLmJlLm51bGw7XG4vLyAgICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuaGVhZGVycztcbi8vICAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5zdGF0dXMoNDA0KTtcbi8vICAgICAgICAgZXhwZWN0KHJlcykudG8ubm90LnJlZGlyZWN0O1xuLy8gICAgICAgICBleHBlY3QocmVzLmJvZHkpLnRvLmJlLmFuKCdvYmplY3QnKTtcbi8vICAgICAgICAgZG9uZSgpO1xuLy8gICAgICAgfSk7XG4vLyAgIH0pO1xuLy8gfSk7XG5cbi8vIGRlc2NyaWJlKCdQb3N0IFxcJy9hcGkvdjFcXCcnLCAoKSA9PiB7XG4vLyAgIGl0KCdQT1NUIHJlZ2lzdGVyIGEgY2FuZGlkYXRlJywgKGRvbmUpID0+IHsgLy8gV0hFTiBFTUFJTCBJUyBJTkNPUlJFQ1RMWSBMQUlEXG4vLyAgICAgY2hhaS5yZXF1ZXN0KGFwcClcbi8vICAgICAgIC5wb3N0KCcvYXBpL3YxLzpvZmZpY2VpZC9yZWdpc3RlcicpXG4vLyAgICAgICAuc2VuZChjYW5kaWRhdGUzKVxuLy8gICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbi8vICAgICAgICAgZXhwZWN0KGVycikudG8uYmUubnVsbDtcbi8vICAgICAgICAgZXhwZWN0KHJlcykudG8uaGF2ZS5oZWFkZXJzO1xuLy8gICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDQpO1xuLy8gICAgICAgICBleHBlY3QocmVzKS50by5ub3QucmVkaXJlY3Q7XG4vLyAgICAgICAgIGV4cGVjdChyZXMuYm9keSkudG8uYmUuYW4oJ29iamVjdCcpO1xuLy8gICAgICAgICBkb25lKCk7XG4vLyAgICAgICB9KTtcbi8vICAgfSk7XG4vLyB9KTtcblxuLy8gLy8gb2ZmaWNlIHJlc3VsdFxuLy8gZGVzY3JpYmUoJy9hcGkvdjEvb2ZmaWNlcy86aWQvcmVzdWx0JywgKCkgPT4ge1xuLy8gICBpdCgnb2ZmaWNlIGlkIG9uIHRoZSBwYXJhbXMgbXVzdCBiZSB2YWxpZCcsIChkb25lKSA9PiB7IC8vIFdIRU4gRU1BSUwgSVMgSU5DT1JSRUNUTFkgTEFJRFxuLy8gICAgIGNoYWkucmVxdWVzdChhcHApXG4vLyAgICAgICAuZ2V0KCcvYXBpL3YxL29mZmljZS9yNy9yZXN1bHQnKVxuLy8gICAgICAgLy8gLnNlbmQoZ29vZFZvdGVSZXN1bHQpXG4vLyAgICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuLy8gICAgICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuLy8gICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cyg0MDApO1xuLy8gICAgICAgICBleHBlY3QocmVzKS50by5ub3QucmVkaXJlY3Q7XG4vLyAgICAgICAgIGV4cGVjdChyZXMuYm9keS5lcnJvcikudG8uYmUuZXF1YWwoJ1VzZXIgbm90IGF1dGhvcmlzZWQhJyk7XG4vLyAgICAgICAgIGRvbmUoKTtcbi8vICAgICAgIH0pO1xuLy8gICB9KTtcblxuLy8gICBpdCgnb2ZmaWNlIHdpdGggdGhhdCBJRCBzaG91bGQgZXhpc3QnLCAoZG9uZSkgPT57XG4vLyAgICAgY2hhaS5yZXF1ZXN0KGFwcClcbi8vICAgICAuZ2V0KCcvYXBpL3YxL29mZmljZXMvMjY0M2UzOTctNGNmNy00OTY4LTg5ZDUtOTYwNTliZmQwZWE2L3Jlc3VsdCcpXG4vLyAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcbi8vICAgICAgIGV4cGVjdChyZXMpLnRvLmJlLmpzb247XG4vLyAgICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwNCk7XG4vLyAgICAgICAgIGV4cGVjdChyZXMuYm9keS5lcnJvcikudG8uZXF1YWwoJ1Jlc291cmNlIG5vdCBmb3VuZCBvbiB0aGUgc2VydmVyJyk7XG4vLyAgICAgICAgIGRvbmUoKTtcbi8vICAgICB9KVxuLy8gICB9KVxuXG4gIC8vIGl0KCdyZXN1bHQgc2hvdWxkIGJlIGdvdHRlbiBzdWNjZXNzZnVsbHknLCAoZG9uZSkgPT4ge1xuICAvLyAgIGNoYWkucmVxdWVzdChhcHApXG4gIC8vICAgICAuZ2V0KCcvYXBpL3YxL29mZmljZXMvMjY0M2UzOTctNGNmNy00OTY4LTg5ZDUtOTYwNTliZmQwZWE2L3Jlc3VsdCcpXG4gIC8vICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuICAvLyAgICAgICBleHBlY3QocmVzKS50by5iZS5qc29uO1xuICAvLyAgICAgICBleHBlY3QocmVzKS50by5oYXZlLnN0YXR1cygyMDApO1xuICAvLyAgICAgICBleHBlY3QocmVzcG9uc2UuYm9keS5kYXRhWzBdLnBvbGxSZXN1bHQpLnRvLmVxdWFsKCcyNjQzZTM5Ny00Y2Y3LTQ5NjgtODlkNS05NjA1OWJmZDBlYTYnKTtcbiAgLy8gICAgICAgZG9uZSgpO1xuICAvLyAgICAgfSk7XG4gIC8vIH0pO1xuLy8gfSk7XG5cbiAgXG5cblxuLy8gZ2V0IGFsbCB1c2Vyc1xuLy8gZGVzY3JpYmUoJ0dFVCAvdXNlcnMnLCAoKSA9PiB7XG4vLyAgIGl0KCdzaG91bGQgcmV0dXJuIGFsbCB1c2VycycsIChkb25lKSA9PiB7XG4vLyAgICAgY2hhaS5yZXF1ZXN0KGFwcClcbi8vICAgICAgIC5nZXQoJy9hcGkvdjEvdXNlcnMnKVxuLy8gICAgICAgLnNlbmQoZ29vZFNpZ251cClcbi8vICAgICAgIC5lbmQoKGVyciwgcmVzKSA9PiB7XG4vLyAgICAgICAgIGV4cGVjdChyZXMuc3RhdHVzKS50by5lcXVhbCg0MDApO1xuLy8gICAgICAgICBleHBlY3QocmVzLmJvZHkpLnRvLm5vdC5iZS5lbXB0eTtcbi8vICAgICAgICAgZG9uZShlcnIpO1xuLy8gICAgICAgfSk7XG4vLyAgIH0pO1xuLy8gfSk7XG5cbi8vIGRlc2NyaWJlKCdHRVQgL3VzZXJzJywgKCkgPT4ge1xuLy8gICBpdCgnc2hvdWxkIHJldHVybiBhbGwgdXNlcnMnLCAoZG9uZSkgPT4ge1xuLy8gICAgIGNoYWkucmVxdWVzdChhcHApXG4vLyAgICAgICAuZ2V0KCcvYXBpL3YxL3VzZXJzJylcbi8vICAgICAgIC5zZW5kKGJhZFNpZ251cDIpXG4vLyAgICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuLy8gICAgICAgICBleHBlY3QocmVzLnN0YXR1cykudG8uZXF1YWwoNDAwKTtcbi8vICAgICAgICAgZXhwZWN0KHJlcy5ib2R5KS50by5ub3QuYmUuZW1wdHk7XG4vLyAgICAgICAgIGRvbmUoZXJyKTtcbi8vICAgICAgIH0pO1xuLy8gICB9KTtcbi8vIH0pO1xuXG4vLyBkZXNjcmliZSgnRmV0Y2ggYWxsIHVzZXJzJywoKSA9PiB7XG4vLyAgIGl0KCdzaG91bGQgcmV0dXJuIDQwMSB3aGVuIHRoZXJlIGlzIG5vIHRva2VuJywgKGRvbmUpID0+IHtcbi8vICAgICBjaGFpLnJlcXVlc3QoYXBwKVxuLy8gICAgICAgLmdldCgnL2FwaS92MS91c2VycycpXG4vLyAgICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuLy8gICAgICAgICBleHBlY3QoZXJyKS50by5iZS5udWxsO1xuLy8gICAgICAgICBleHBlY3QocmVzKS50by5oYXZlLmhlYWRlcnM7XG4vLyAgICAgICAgIGV4cGVjdChyZXMpLnRvLmhhdmUuc3RhdHVzKDQwMCk7XG4vLyAgICAgICAgIGV4cGVjdChyZXMpLnRvLm5vdC5yZWRpcmVjdDtcbi8vICAgICAgICAgZXhwZWN0KHJlcy5ib2R5KS50by5iZS5hbignb2JqZWN0Jyk7XG4vLyAgICAgICAgIGRvbmUoKTtcbi8vICAgICAgIH0pO1xuLy8gICB9KTtcbi8vIH0pO1xufSk7Il19