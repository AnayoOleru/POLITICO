import { json,urlencoded } from 'body-parser';
import express from 'express';
import Party from './src/controllers/partyCtr';


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

app.listen(3000)
console.log('app running on port ', 3000);

export default app;