import { json, urlencoded } from 'body-parser';
import express from 'express';
import Office from './src/controllers/officeCtr';
import userCtr from './src/controllers/userCtr';
import partyCtr from './src/controllers/partyCtr';
import candidateCtr from './src/controllers/candidatesCtr';
import votesCtr from './src/controllers/votesCtr';
import token from './helper/tokenAuth';
import verifyAdmin from './helper/verifyAdmin';
import verifyId from './helper/userAuth';
import verifyVoter from './src/middlewares/voteValidations';
import path from 'path';
import bodyParser from 'body-parser';

// import obie from './Views/UI/styles';
// import registerVoter from './src/middlewares/registerValidation'


const app = express();

app.use(express.static(path.join(__dirname)));
app.use("/styles", express.static(__dirname + './Views/UI/styles'));
app.use("/images", express.static(__dirname + './Views/UI/images'));
app.use("/scripts", express.static(__dirname + 'Views/UI/scripts'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.json())
const port = process.env.PORT || 3000;


app.get('/api/v1', (req, res) => res.status(200).send({
  "status": 200,
  "message": 'Welcome to POLITICO'
}));
// admin: create, edit
app.post('/api/v1/parties', token.verifyToken, verifyAdmin.verifyIsAdmin, partyCtr.create);
app.put('/api/v1/party/:id/name', token.verifyToken, verifyAdmin.verifyIsAdmin, partyCtr.update);
app.delete('/api/v1/party/:id', token.verifyToken, verifyAdmin.verifyIsAdmin, partyCtr.delete);
app.post('/api/v1/office', token.verifyToken, verifyAdmin.verifyIsAdmin, Office.create);
app.post('/api/v1/office/:userid/register', token.verifyToken, verifyAdmin.verifyIsAdmin, verifyId.validateUserId, candidateCtr.register);


// user
app.get('/api/v1/parties', token.verifyToken, partyCtr.getParties);
app.get('/api/v1/parties/:id', token.verifyToken, partyCtr.getAParty);
app.get('/api/v1/office', token.verifyToken, Office.getAllOffices);
app.get('/api/v1/office/:id', token.verifyToken, Office.getOneOffice);
app.post('/api/v1/votes', token.verifyToken, votesCtr.votes);
app.get('/api/v1/office/:officeid/result', token.verifyToken, Office.officeResult);

// user login
app.post('/api/v1/auth/signup', userCtr.createUser);
app.post('/api/v1/auth/login', userCtr.login);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/Views/index.html'));
});
// app.get('/', (req, res) => res.status(200).send({
//   "status": 200,
//   "message": 'Welcome to POLITICO'
// }));

app.all('*', (req, res) =>{
  res.status(404).send({
    "status": 404,
    "error": "Page not found. Check the documentation for valid routes" 
  })
})

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});

export default app;