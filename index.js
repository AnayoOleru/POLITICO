import { json, urlencoded } from 'body-parser';
import express from 'express';
import Party from './src/controllers/partyCtr';
import Office from './src/controllers/officeCtr';
import TokenAuth from './helper/tokenAuth';
import userCtr from './src/controllers/userCtr';


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
app.post('/api/v1/parties', Party.createParty);
app.get('/api/v1/parties/:partyId', Party.getPartyById);
app.get('/api/v1/parties', Party.getParties);
app.put('/api/v1/party/:id/name', Party.update);
app.delete('/api/v1/party/:id', Party.delete);
app.post('/api/v1/office', Office.createOffice);
app.get('/api/v1/office', Office.getOffice);
app.get('/api/v1/office/:officeId', Office.getOfficeById);
app.post('/api/v1/auth/signup', userCtr.createUser);
app.get('/', (req, res) => res.status(404).send({
  "status": 404,
  "message": "Page not found, your URL is incorrect"
}));

// app.listen(3000)
// console.log('app running on port ', 3000);
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});

export default app;