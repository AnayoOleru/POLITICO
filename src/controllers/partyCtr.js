
import uuid from 'uuid';
import partyDb from '../db/partydb'

class Party{
  /**
   * 
   * @param {Values} req - request values into keys 
   * @param {Object} res - request object
   * @returns {array} - returns all key value pairs as object in array
   */
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
  /**
   * 
   * @param {uuid} id
   * @param {Object} res - request object
   * @returns {array} - returns specific party
   */
  static getPartyById(req, res) {
    const { partyId } = req.params;
    let partyObject;
    partyDb.forEach((party) => {
      
      if(party.id === partyId) {
        partyObject = party;
      }
    });
    return res.status(200).json(partyObject);
  }
  /**
   * 
   * @param {uuid} id
   * @param {Object} res - request object
   * @returns {array} - returns all key value pairs as object in array
   */
  static getParties(req, res)  {
    return res.status(200).json(partyDb);
  }

} 
export default Party;