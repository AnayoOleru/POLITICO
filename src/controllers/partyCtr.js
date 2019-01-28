
import uuid from 'uuid';
import partyDb from '../db/partydb'

class Party{
  static createParty(req, res) {
    const {
      name,
      hqaddress,
      logoURL
    } = req.body;
    partyDb.push({
      id: uuid.v4(),
      name,
      hqaddress,
      logoURL
    });
    return res.status(201).json(partyDb);
  }
} 
export default Party;