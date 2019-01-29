
import uuid from 'uuid';
import partyDb from '../db/partydb';
import PartyModel from '../models/party';

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
/**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {object} updated party
   */
  static update(req, res) {
    const party = PartyModel.findOne(req.params.id);
    console.log(party);
    if (!party) {
      return res.status(404).send({'message': 'party not found'});
    }
    const updatedParty = PartyModel.update(req.params.id, req.body)
    return res.status(200).send(updatedParty);
  }
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return statuc code 204 
   */
  static delete(req, res) {
    const party = PartyModel.findOne(req.params.id);
    if (!party) {
      return res.status(404).send({'message': 'reflection not found'});
    }
    const ref = PartyModel.delete(req.params.id);
    return res.status(204).send(ref);
  }
} 
export default Party;