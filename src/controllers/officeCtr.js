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
    officeDb.push({
      id: uuid.v4(),
      type,
      name
    });
    return res.status(201).json(officeDb);
  }
  /**
   * 
   * @param {uuid} id
   * @param {Object} res - request object
   * @returns {array} - returns all key value pairs as object in array
   */
  static getOffice(req, res)  {
    return res.status(200).json(officeDb);
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
    return res.status(200).json(officeObject);
    
  }
}
export default Office;