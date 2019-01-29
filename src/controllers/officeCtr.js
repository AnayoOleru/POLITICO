import uuid from 'uuid';
import officeDb from '../db/officedb';
// import PartyModel from '../models/party';

class Office{
  /**
   * 
   * @param {Values} req - request values into keys 
   * @param {Object} res - request object
   * @returns {array} - returns all key value pairs as object in array
   */
  static createOffice(req, res) {
    const {
      type,
      name
    } = req.body;
    if (!req.body.type) {
        return res.status(400).send({
            "status": 404,
            "error": "The type and name field are required"
    })
      }
      if(!req.body.name){
        return res.status(400).send({
            "status": 400,
            "error": "The name and type field are required"
    })
      }
    officeDb.push({
      id: uuid.v4(),
      type,
      name
    });
    return res.status(201).json({
        "status": 201,
        "data": officeDb
    });
  }
  /**
   * 
   * @param {uuid} id
   * @param {Object} res - request object
   * @returns {array} - returns all key value pairs as object in array
   */
  static getOffice(req, res)  {
    return res.status(200).json({
        "status": 200,
        "data": officeDb
    });
  }
  /**
   * 
   * @param {uuid} id
   * @param {Object} res - request object
   * @returns {array} - returns specific party
   */
  static getOfficeById(req, res) {
    const { officeId } = req.params;
    let officeObject;
    for (const office of officeDb) {
        // console.log(typeof officeId, typeof office.id)
        if (office.id === Number(officeId)) {
            officeObject = office
        }
    }
    return res.status(200).json({
        "status": 200,
        "data": officeObject
    });
    
  }
}
export default Office;