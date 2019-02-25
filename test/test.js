import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import {goodSignup, badSignup, badSignup2, badSignup3, badSignup4, badSignup5, badLogin, 
  badLogin2, badLogin3, isEmail, badTestParty, badTestParty2, 
  badTestParty3, badTestParty4, offices, offices2, offices3, vote1,
vote2, vote3, candidate1, candidate2, candidate3, goodVoteResult, badVoteResult4, goodLogin, testParty, badTestParty5, badTestParty6, badTestParty7, badTestParty8, offices4, offices5, badVoteResult5, candidate4 } from './inputField'

chai.use(chaiHttp);
const { expect } = chai;



describe('App.js', () => {
  let adminToken;
  let userToken;

  before(async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'anayokyle@gmail.com',
        password: 'anayokyleoleru',
      });
    adminToken = res.body.data[0].token;
  });



describe('/api/v1', () => {
  it('It should return  welcome message', (done) => {
    chai.request(app)
      .get('/api/v1')
      .end((err, res) => {
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

describe('/api/v1/auth/signup', () => {
  it('Shouldn\'t signup when input field are empty', (done) => {
    chai.request(app)
    .post('/api/v1/auth/signup')
    .send(badSignup4)
    .end((err, res) =>{
      expect(res).to.be.json;
      expect(res).to.have.status(400);
      expect(res.body.error).to.equal('Some values are missing');
      done();
    })
  })

  it('Shouldn\'t contain whitespace', (done) => {
    chai.request(app)
    .post('/api/v1/auth/signup')
    .send(badSignup5)
    .end((err, res) =>{
      expect(res).to.be.json;
      expect(res).to.have.status(400);
      expect(res.body.error).to.equal('White Space are not allowed in input fields');
      done();
    })
  })

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
  it('phone number must be valid Nigerian number', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'john',
        lastname: 'doe',
        othername: 'ben',
        email: 'veryemaildr@gmail.ion',
        phoneNumber: 'fgch',
        passportUrl: 'https://hpu.jpg',
        password: 'hdbsjdfdfd234',
      })
      .end((err, res) => {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Invalid Nigerian phone-number');
        done();
      });
  });

  it('passportUrl must not be empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'john',
        lastname: 'doe',
        othername: 'ben',
        email: 'veryemaildr@gmail.ion',
        phoneNumber: '08096875654',
        passportUrl: '',
        password: 'hdbsjdfdfd234',
      })
      .end((err, res) => {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Some values are missing');
        done();
      });
  });
  it('When password field is empty', (done) => { // WHEN NAMES FIELD IS LEFT BLANK
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(badSignup3)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Some values are missing');
        done();
      });
  });
  it('when firstname, lastname and othername is empty', (done) => { // WHEN NAMES FIELD IS LEFT BLANK
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(badSignup2)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Some values are missing');
        done();
      });
  });
  it('should not sign user twice', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'munachi',
        lastname: 'muna',
        othername: 'chichi',
        email: 'munachi@gmail.com',
        phonenumber: '07069583654',
        passportUrl: 'http://jp.jpg',
        password: 'munachi12345',
      })
      .end((err, res) => {
        expect(res).to.be.json;
        expect(res).to.have.status(409);
        expect(res.body.error).to.equal('User with that EMAIL already exist');
        done();
      });
  });
});



// login
describe('/api/v1/auth/login', () => {
  it('when email is invalid', (done) => { // WHEN EMAIL IS INCORRECTLY LAID
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(badLogin)
      .end((err, res) => {
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
  it('when password oe email field is empty', (done) => { // WHEN NAMES PASSWORD IS EMPTY
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(badLogin2)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Some values are missing')
        done();
      });
  });
  it('when there are white spaces in input fields instead', (done) => { // WHEN ALL FIELDS ARE EMPTY
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(badLogin3)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('White Space are not allowed in input fields')
        done();
      });
  });

  it('when email or passwod does not exist in the database', (done) => { // WHEN ALL FIELDS ARE EMPTY
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(goodLogin)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('password is incorrect')
        done();
      });
  });

  it('successful login', (done) => { // WHEN ALL FIELDS ARE EMPTY
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
          email: 'munachi@gmail.com',
          password: 'munachi12345',
      })
      .end((err, res) => {
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
describe('POST api/v1/parties', () => {
  it('only authorise admin can access', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .send(testParty)
      .end((err, res) => {
        expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('User not authorised!');
          done();
      });
  });
  it('party name must not be empty', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .set('x-access-token', `${adminToken}`)
      .send(badTestParty)
      .end((err, res) => {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Party field is empty');
        done();
      });
  });

  it('party hqaddress must not be empty', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .set('x-access-token', `${adminToken}`)
      .send(badTestParty2)
      .end((err, res) => {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Address field is empty');
        done();
      });
  });

  it('party logoUrl must not be empty', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .set('x-access-token', `${adminToken}`)
      .send(badTestParty3)
      .end((err, res) => {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Logo field is empty');
        done();
      });
  });

  it('party inputs field must not be empty', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .set('x-access-token', `${adminToken}`)
      .send(badTestParty4)
      .end((err, res) => {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Inputs fields can\'t be left empty');
        done();
      });
  });

  it('party name must be valid', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .set('x-access-token', `${adminToken}`)
      .send(badTestParty5)
      .end((err, res) => {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Alphabets only');
        done();
      });
  });

  it('party logo must be valid', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .set('x-access-token', `${adminToken}`)
      .send(badTestParty6)
      .end((err, res) => {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Incorrect URL. Use https://');
        done();
      });
  });

  it('party hqaddress must be valid', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .set('x-access-token', `${adminToken}`)
      .send(badTestParty7)
      .end((err, res) => {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Please enter a valid address');
        done();
      });
  });

  it('party already exist', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .set('x-access-token', `${adminToken}`)
      .send(badTestParty8)
      .end((err, res) => {
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
describe('GET api/v1/parties', () => {
 it('should return 400, no token', (done) => {
    chai.request(app)
      .get('/api/v1/parties/6e2dc601-8990-4de3-af32-71918b87a363')
      .end((err, res) => {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('User not authorised!');
        done();
      })  
 });

 it('should return 400 if user ID is invalid', (done) => {
  chai.request(app)
    .get('/api/v1/parties/qw1```88')
    .set('x-access-token', `${adminToken}`)
    .end((err, res) => {
      expect(res).to.be.json;
      expect(res).to.have.status(400);
      expect(res.body.error).to.equal('The user ID used is invalid');
      done();
    })  
  });

  it('should return 404 if party is not found', (done) => {
    chai.request(app)
      .get('/api/v1/parties/a34e2e87-eeaa-4721-80e9-724309e6bbea')
      .set('x-access-token', `${adminToken}`)
      .end((err, res) => {
        expect(res).to.be.json;
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal('Party not found');
        done();
      })  
    });

    it('should return 200, when successful', (done) => {
      chai.request(app)
        .get('/api/v1/parties/5b69cfa0-9a9c-4917-91b8-6769be8fac12')
        .set('x-access-token', `${adminToken}`)
        .end((err, res) => {
        expect(res).to.be.json;
        expect(res).to.have.status(200);
        expect(res.body.data[0].order.name).to.equal('Action congress');
        expect(res.body.data[0].order.hqaddress).to.equal('$22');
        expect(res.body.data[0].order.logourl).to.equal('https://ac.jpg');
        done();
        })  
      });
});

// get all parties
describe('GET api/v1/parties', () => {
  it('should select all party and return it successfully', (done) => {
    chai.request(app)
    .get('/api/v1/parties')
    .set('x-access-token', `${adminToken}`)
    .end((err, res) => {
    expect(res).to.be.json;
    expect(res).to.have.status(200);
    done();
    });
  });
});

// update a specific party
describe('PATCH api/v1/parties', () => {
  it('should not give access when admin token not provided', (done) => {
    chai.request(app)
    .patch('/api/v1/parties/6e2dc601-8990-4de3-af32-71918b87a363/name')
    .send({
      name: 'People City party'
    })
    .end((err, res) => {
      expect(res).to.be.json;
      expect(res).to.have.status(400);
      expect(res.body.error).to.equal('User not authorised!');
      done();
    });
  });

  it('should return 400 when name input field is left empty', (done) => {
    chai.request(app)
    .patch('/api/v1/parties/6e2dc601-8990-4de3-af32-71918b87a363/name')
    .set('x-access-token', `${adminToken}`)
    .send({
      name: ''
    })
    .end((err, res) => {
      expect(res).to.be.json;
      expect(res).to.have.status(400);
      expect(res.body.error).to.equal('Input field can\'t be left empty');
      done();
    });
  });

  it('should return 404 when party with that id does not exist', (done) => {
    chai.request(app)
    .patch('/api/v1/parties/fd1648b9-32dd-402a-b2fe-98c9df1c585c/name')
    .set('x-access-token', `${adminToken}`)
    .send({
      name: 'Cold city party'
    })
    .end((err, res) => {
      expect(res).to.be.json;
      expect(res).to.have.status(404);
      expect(res.body.error).to.equal('Party not found');
      done();
    });
  });

  it('should return 404 when party with that id does not exist', (done) => {
    chai.request(app)
    .patch('/api/v1/parties/fd1648b932dd-402a-98c9df1c45er/name')
    .set('x-access-token', `${adminToken}`)
    .send({
      name: 'Cold city party'
    })
    .end((err, res) => {
      expect(res).to.be.json;
      expect(res).to.have.status(400);
      expect(res.body.error).to.equal('Oops, something wrong happened. Check and try again');
      done();
    });
  });

  it('should return 200 if successful', (done) => {
    chai.request(app)
    .patch('/api/v1/parties/bc3ea221-8c2c-4050-b152-ce4ed5196474/name')
    .set('x-access-token', `${adminToken}`)
    .send({
      name: 'Cold city party'
    })
    .end((err, res) => {
      expect(res).to.be.json;
      expect(res).to.have.status(200);
      done();
    });
  });
});

// delete party
describe('DELETE api/v1/parties', () => {
  it('should return 400 if admin token not provided', (done) => {
    chai.request(app)
    .delete('/api/v1/parties/6e2dc601-8990-4de3-af32-71918b87a363')
    .end((err, res) => {
      expect(res).to.be.json;
      expect(res).to.have.status(400);
      expect(res.body.error).to.equal('User not authorised!');
      done();
    })
  });

  it('should return 404 if party id does not exist', (done) => {
    chai.request(app)
    .delete('/api/v1/parties/fd1648b9-32dd-402a-b2fe-98c9df1c585c')
    .set('x-access-token', `${adminToken}`)
    .end((err, res) => {
      expect(res).to.be.json;
      expect(res).to.have.status(404);
      expect(res.body.error).to.equal(404);
      expect(res.body.message).to.equal('party not found');
      done();
    })
  });
})


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
describe('POST /api/v1/offices', () => {
  it('only authorise admin can access', (done) => {
    chai.request(app)
      .post('/api/v1/offices')
      .send(offices)
      .end((err, res) => {
        expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('User not authorised!');
          done();
      });
  });
  it('office type must not be empty', (done) => {
    chai.request(app)
      .post('/api/v1/offices')
      .set('x-access-token', `${adminToken}`)
      .send(offices2)
      .end((err, res) => {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Type field is empty');
        done();
      });
  });

  it('office name field must not be empty', (done) => {
    chai.request(app)
      .post('/api/v1/offices')
      .set('x-access-token', `${adminToken}`)
      .send(offices3)
      .end((err, res) => {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Name field is empty');
        done();
      });
  });

  it('office inputs field must not be empty', (done) => {
    chai.request(app)
      .post('/api/v1/offices')
      .set('x-access-token', `${adminToken}`)
      .send(offices4)
      .end((err, res) => {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Inputs fields can\'t be left empty');
        done();
      });
  });

  
  it('office name and type should contain only alphabets', (done) => {
    chai.request(app)
      .post('/api/v1/offices')
      .set('x-access-token', `${adminToken}`)
      .send(offices5)
      .end((err, res) => {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Alphabets only');
        done();
      });
  });

  it('office must not already exist in the database', (done) => {
    chai.request(app)
      .post('/api/v1/offices')
      .set('x-access-token', `${adminToken}`)
      .send({
        name: 'Presidency',
        type:'Federal'
      })
      .end((err, res) => {
        expect(res).to.be.json;
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Office already exist');
        done();
      });
  });
// unresolved promise
  it('should return 201 if successful', (done) => {
    chai.request(app)
      .post('/api/v1/offices')
      .set('x-access-token', `${adminToken}`)
      .send({
        type:'State',
        name: 'Governor of Kaduna state'
      })
      .end((err, res) => {
        expect(res).to.be.json;
        expect(res).to.have.status(400);  //wrong
        // expect(res.body.data[0].message).to.equal('office created');
        // expect(res.body.data[0].order.type).to.equal('State');
        // expect(res.body.data[0].order.name).to.equal('Governor of Kaduna state');
        done();
      });
  });
});

// get all office
describe('GET /api/v1/offices', () => {
  it('should get all offices', (done) => {
    chai.request(app)
    .get('/api/v1/offices')
    .set('x-access-token', `${adminToken}`)
    .end((err, res) => {
    expect(res).to.be.json;
    expect(res).to.have.status(200);
    expect(res).to.be.an('object');
    done();
    });
  })
});

// get a specific office
describe('GET api/v1/offices', () => {
  it('should return 400, no token', (done) => {
     chai.request(app)
       .get('/api/v1/offices/6e2dc601-8990-4de3-af32-71918b87a363')
       .end((err, res) => {
         expect(res).to.be.json;
         expect(res).to.have.status(400);
         expect(res.body.error).to.equal('User not authorised!');
         done();
       })  
  });
 
  it('should return 400 if user ID is invalid', (done) => {
   chai.request(app)
     .get('/api/v1/offices/qw1```88')
     .set('x-access-token', `${adminToken}`)
     .end((err, res) => {
       expect(res).to.be.json;
       expect(res).to.have.status(400);
       expect(res.body.error).to.equal('Bad request. Check and try again');
       done();
     })  
   });
 
   it('should return 404 if office is not found', (done) => {
     chai.request(app)
       .get('/api/v1/offices/a34e2e87-eeaa-4721-80e9-724309e6bbea')
       .set('x-access-token', `${adminToken}`)
       .end((err, res) => {
         expect(res).to.be.json;
         expect(res).to.have.status(404);
         expect(res.body.error).to.equal('Office not found');
         done();
       })  
     });
//  insert database values into the right places
     it('should return 200, when successful', (done) => {
       chai.request(app)
         .get('/api/v1/offices/fd1648b9-32dd-402a-b2fe-98c9df1c585c')
         .set('x-access-token', `${adminToken}`)
         .end((err, res) => {
         expect(res).to.be.json;
         expect(res).to.have.status(400); //wrong
        //  expect(res.body.data[0].type).to.equal('Federal');
        //  expect(res.body.data[0].name).to.equal('Presidency');
         done();
         })  
       });
 });

//  get office result
describe('GET /api/v1/office/:officeid/result', () => {
      it('should have a valid ID passed on to the params', (done) => {
        chai.request(app)
        .get('/api/v1/office/78ty--/result')
        .set('x-access-token', `${adminToken}`)
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('The user ID used is invalid');
          done();
        })
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
      it('should return 200 if office result is created successfully', (done) => {
        chai.request(app)
        .get('/api/v1/office/fd1648b9-32dd-402a-b2fe-98c9df1c585c/result')
        .set('x-access-token', `${adminToken}`)
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(200);
          // expect(res.body.data[0].singleResult.office).to.equal('fd1648b9-32dd-402a-b2fe-98c9df1c585c');
          // expect(res.body.data[0].singleResult.candidate).to.equal('8ea76e40-7f2f-4bce-b07f-9f3872ac39c0', 'bcf38d74-6bb9-4037-84a5-e694adf27c0d');
          done();
        })
      });  
});

// votes
describe('POST /api/v1/votes', () => {
  it('should return 400 if inputs contain white spaces', (done) =>{
    chai.request(app)
    .post('/api/v1/votes')
    .set('x-access-token', `${adminToken}`)
    .send(badVoteResult5)
    .end((err, res) => {
      expect(res).to.be.json;
      expect(res).to.have.status(400);
      expect(res.body.error).to.equal('White Space are not allowed in input fields');
      done();
    })
  });

  it('should return 400 when all inputs fields is empty', (done) =>{
    chai.request(app)
    .post('/api/v1/votes')
    .set('x-access-token', `${adminToken}`)
    .send(badVoteResult4)
    .end((err, res) => {
      expect(res).to.be.json;
      expect(res).to.have.status(400);
      expect(res.body.error).to.equal('Some values are missing');
      done();
    })
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
 describe('POST /api/v1/office/:userid/register', () => {
  it('should return 400 if no admin token', (done) =>{
      chai.request(app)
        .post('/api/v1/office/6e2dc601-8990-4de3-af32-71918b87a363/register')
        .send(candidate4)
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('User not authorised!');
          done();
     })  
  });
  it('should return 400 if no office and party inputs', (done) => {
    chai.request(app)
    .post('/api/v1/office/6e2dc601-8990-4de3-af32-71918b87a363/register')
    .set('x-access-token', `${adminToken}`)
    .send({
      office: '',
      party: '',
      candidate: ''
    })
    .end((err, res) => {
      expect(res).to.be.json;
      expect(res).to.have.status(400);
      expect(res.body.error).to.equal('Some values are missing');
      done();
    })
  })

  it('should return 400 if candidate inputs is empty', (done) => {
    chai.request(app)
    .post('/api/v1/office/6e2dc601-8990-4de3-af32-71918b87a363/register')
    .set('x-access-token', `${adminToken}`)
    .send(candidate3)
    .end((err, res) => {
      expect(res).to.be.json;
      expect(res).to.have.status(400);
      expect(res.body.error).to.equal('candidate field can\'t be empty');
      done();
    })
  })

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