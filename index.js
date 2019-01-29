import { json,urlencoded } from 'body-parser';
import express from 'express';
import Party from './src/controllers/partyCtr';
import Office from './src/controllers/officeCtr';


const app = express();
app.use(json());
app.use(urlencoded({
  extended: true
}));

app.use(express.json())


app.get('/api/v1', (req, res) => res.status(200).send({
  message: 'Welcome to POLITICO'
}));
app.post('/api/v1/parties', Party.createParty);
app.get('/api/v1/parties/:partyId', Party.getPartyById);
app.get('/api/v1/parties', Party.getParties);
app.put('/api/v1/party/:id/name', Party.update);
app.delete('/api/v1/party/:id', Party.delete);
// app.post('/api/v1/office', Office.createOffice);

app.listen(3000)
console.log('app running on port ', 3000);

export default app;