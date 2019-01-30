import { json, urlencoded } from 'body-parser';
import express from 'express';
import Party from './src/controllers/partyCtr';
import Office from './src/controllers/officeCtr';
import TokenAuth from './helper/tokenAuth';
import userCtr from './src/controllers/userCtr';
import partyCtr from './src/controllers/partyCtr';
import officeCtr from './src/controllers/officeCtr';
import token from './helper/tokenAuth';


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
app.post('/api/v1/parties', token.verifyToken, partyCtr.create);
app.get('/api/v1/parties/:partyId', token.verifyToken, partyCtr.getAParty);
app.get('/api/v1/parties', token.verifyToken, partyCtr.getParties);
app.put('/api/v1/party/:id/name', partyCtr.update);
app.delete('/api/v1/party/:id', partyCtr.delete);
app.post('/api/v1/office', token.verifyToken, Office.createOffice);
app.get('/api/v1/office', token.verifyToken, Office.getAllOffices);
app.get('/api/v1/office/:officeId', token.verifyToken, Office.getOneOffice);

app.post('/api/v1/auth/signup', userCtr.createUser);
app.post('/api/v1/auth/login', userCtr.login);

app.get('*', (req, res) => res.status(404).send({
  "status": 404,
  "message": "Page not found, your URL is incorrect"
}));

// app.listen(3000)
// console.log('app running on port ', 3000);
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});

export default app;