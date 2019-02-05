import { json, urlencoded } from 'body-parser';
import express from 'express';
import Office from './controllers/officeCtr';
import userCtr from './controllers/userCtr';
import partyCtr from './controllers/partyCtr';
import candidateCtr from './controllers/candidatesCtr';
import votesCtr from './controllers/votesCtr';
import token from './helper/tokenAuth';
import verifyAdmin from './helper/verifyAdmin';
import verifyId from './helper/userAuth';
import verifyVoter from './middlewares/voteValidations'




const app = express();
app.use(json());
app.use(urlencoded({
  extended: true
}));

app.use(express.json())
const port = process.env.PORT || 3000;


app.get('/api/v1', (req, res) => res.status(200).send({
  "status": 200,
  "message": 'Welcome to POLITICO'
}));
// admin: create, edit
app.post(
  '/api/v1/parties', 
  token.verifyToken, 
  verifyAdmin.verifyIsAdmin, 
  partyCtr.create
  );

app.patch(
  '/api/v1/parties/:id/name', 
  token.verifyToken, 
  verifyAdmin.verifyIsAdmin, 
  partyCtr.update
  );

app.delete(
  '/api/v1/parties/:id', 
  token.verifyToken, 
  verifyAdmin.verifyIsAdmin, 
  partyCtr.delete
  );

app.post(
  '/api/v1/offices', 
  token.verifyToken, 
  verifyAdmin.verifyIsAdmin, 
  Office.create
  );

app.post(
  '/api/v1/office/:userid/register', 
  token.verifyToken, 
  verifyAdmin.verifyIsAdmin, 
  verifyId.validateUserId, 
  candidateCtr.register
  );


// user
app.get(
  '/api/v1/parties', 
  token.verifyToken, 
  partyCtr.getParties
  );

app.get(
  '/api/v1/parties/:id', 
  token.verifyToken, 
  partyCtr.getAParty
  );

app.get(
  '/api/v1/offices', 
  token.verifyToken, 
  Office.getAllOffices
  );

app.get(
  '/api/v1/offices/:id', 
  token.verifyToken, 
  Office.getOneOffice
  );

app.post(
  '/api/v1/votes', 
  token.verifyToken, 
  votesCtr.votes
  );

app.get(
  '/api/v1/office/:officeid/result', 
  token.verifyToken, 
  Office.officeResult
  );

// user login
app.post(
  '/api/v1/auth/signup', 
  userCtr.createUser
  );

app.post(
  '/api/v1/auth/login', 
  userCtr.login
  );

app.get('/', (req, res) => res.status(200).send({
  "status": 200,
  "message": 'Welcome to POLITICO'
}));

app.all('*', (req, res) =>{
  res.status(404).send({
    "status": 404,
    "error": "Resource not found on the server" 
  })
})

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});

export default app;