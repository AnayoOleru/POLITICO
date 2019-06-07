// import { json, urlencoded } from 'body-parser';
import express from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import Office from './controllers/officeCtr';
import userCtr from './controllers/userCtr';
import partyCtr from './controllers/partyCtr';
import candidateCtr from './controllers/candidatesCtr';
import interestCtr from './controllers/interestCtr';
import votesCtr from './controllers/votesCtr';
import token from './helper/tokenAuth';
import verifyAdmin from './helper/verifyAdmin';
import verifyId from './helper/userAuth';


const app = express();


app.use(cors());

app.use('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.static(path.join(__dirname)));
app.use('/styles', express.static(`${__dirname}../../UI/styles`));
app.use('/images', express.static(`${__dirname}../../UI/images`));
app.use('/scripts', express.static(`${__dirname}../../UI/scripts`));
app.use('/views', express.static(`${__dirname}../../UI/views`));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(express.json());
const port = process.env.PORT || 5000;

// homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}../../UI/views/index.html`));
});

app.get('/api/v1', (req, res) => res.status(200).send({
  status: 200,
  message: 'Welcome to POLITICO',
}));
// admin: create, edit
app.post(
  '/api/v1/parties',
  token.verifyToken,
  verifyAdmin.verifyIsAdmin,
  partyCtr.create,
);

app.patch(
  '/api/v1/parties/:id/name',
  token.verifyToken,
  verifyAdmin.verifyIsAdmin,
  partyCtr.update,
);

app.delete(
  '/api/v1/parties/:id',
  token.verifyToken,
  verifyAdmin.verifyIsAdmin,
  partyCtr.delete,
);

app.post(
  '/api/v1/offices',
  token.verifyToken,
  verifyAdmin.verifyIsAdmin,
  Office.create,
);

app.post(
  '/api/v1/office/:userid/register',
  token.verifyToken,
  verifyAdmin.verifyIsAdmin,
  verifyId.validateUserId,
  candidateCtr.register,
);

app.post(
  '/api/v1/office/interest',
  token.verifyToken,
  interestCtr.userInterest,
);

app.get(
  '/api/v1/office/interest',
  token.verifyToken,
  verifyAdmin.verifyIsAdmin,
  interestCtr.getAllInterestedCandidates,
);

app.get(
  '/api/v1/users',
  token.verifyToken,
  verifyAdmin.verifyIsAdmin,
  verifyId.validateUserId,
  userCtr.getAllUsers,
);

app.get(
  '/api/v1/:id/users',
  token.verifyToken,
  verifyAdmin.verifyIsAdmin,
  verifyId.validateUserId,
  userCtr.getAUser,
);


// user
app.get(
  '/api/v1/parties',
  partyCtr.getParties,
);

app.get(
  '/api/v1/parties/:id',
  partyCtr.getAParty,
);

app.get(
  '/api/v1/offices',
  token.verifyToken,
  Office.getAllOffices,
);

app.get(
  '/api/v1/offices/:id',
  token.verifyToken,
  Office.getOneOffice,
);

app.post(
  '/api/v1/votes',
  token.verifyToken,
  votesCtr.votes,
);

app.get(
  '/api/v1/office/:officeid/result',
  token.verifyToken,
  Office.officeResult,
);

app.get(
  '/api/v1/candidates',
  token.verifyToken,
  candidateCtr.getAllCandidates,
);

// user login
app.post(
  '/api/v1/auth/signup',
  userCtr.createUser,
);

app.post(
  '/api/v1/auth/login',
  userCtr.login,
);

// user/admin logout
app.post(
  '/api/v1/auth/signout',
  token.verifyToken,
  userCtr.signout,
);

app.get('/', (req, res) => res.status(200).send({
  status: 200,
  message: 'Welcome to POLITICO',
}));

// Handle 404: send an 404 error page
// app.use(function(req, res) {
//   res.status(404).sendFile(path.join(__dirname + '../../UI/views/404.html'));
// });

// Handle 500: send a 500 error
// app.use(function(error, req, res, next) {
//   res.status(500).sendFile(path.join(__dirname + '../../UI/views/500.html'));
// });

app.all('*', (req, res) => {
  res.status(404).send({
    status: 404,
    error: 'Resource not found on the server',
  });
});

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});

export default app;
