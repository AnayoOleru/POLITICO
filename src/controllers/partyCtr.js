
import uuid from 'uuid';
import partyDb from '../db/partydb';
import PartyModel from '../models/party';

const partyModel = new PartyModel()

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
    return res.status(201).json({
      "status": 201,
      "data": partyDb
    });
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
      
      if(party.id === Number(partyId)) {
        partyObject = party;
      }
    });
    return res.status(200).json({
      "status": 200,
      "data": partyObject
    });
  }
  /**
   * 
   * @param {uuid} id
   * @param {Object} res - request object
   * @returns {array} - returns all key value pairs as object in array
   */
  static getParties(req, res)  {
    return res.status(200).json({
      "status": 200,
      "data": partyDb
    });
  }
/**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {object} updated party
   */
  static update(req, res) {
    let partyObject;

    const party = partyModel.findOne(req.params.id);
    console.log(party);
    if (!party) {
      return res.status(404).send({
        "status": 404,
        "error": "party not found"
      });
    }
    party.name = req.body.name
    // const updatedParty = PartyModel.update(req.params.id, req.body)
    return res.status(200).send(party);
  }
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return code 204 
   */
  static delete(req, res) {
    const party = partyModel.findOne(req.params.id);
    if (!party) {
      return res.status(404).send({
        "status": 404,
        "error": "party not found"
      });
    }
    const ref = partyModel.delete(req.params.id);
    return res.status(200).send({
      "status": 200,
      "message": "Party had been deleted",
      "data": party
    });
  }
} 
export default Party;