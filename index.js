import { json, urlencoded } from 'body-parser';
import express from 'express';
import Office from './src/controllers/officeCtr';
import verifyAdmin from './helper/verifyAdmin';
import userCtr from './src/controllers/userCtr';
import partyCtr from './src/controllers/partyCtr';
import token from './helper/tokenAuth';
import verifyAdmin from './helper/verifyAdmin';



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
app.post('/api/v1/parties', token.verifyToken, verifyAdmin.verifyIsAdmin, partyCtr.create);
app.put('/api/v1/party/:id/name', token.verifyToken, verifyAdmin.verifyIsAdmin, partyCtr.update);
app.delete('/api/v1/party/:id', token.verifyToken, verifyAdmin.verifyIsAdmin, partyCtr.delete);
app.post('/api/v1/office', token.verifyToken, verifyAdmin.verifyIsAdmin, Office.create);

// user
app.get('/api/v1/parties', token.verifyToken, partyCtr.getParties);
app.get('/api/v1/parties/:id', token.verifyToken, partyCtr.getAParty);
app.get('/api/v1/office', token.verifyToken, Office.getAllOffices);
app.get('/api/v1/office/:id', token.verifyToken, Office.getOneOffice);
// 






// user login
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