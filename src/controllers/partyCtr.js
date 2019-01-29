
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
   * @returns {array} - returns all key value pairs as object in array
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

} 
export default Party;

// static getOfficeById(req, res) {
//   const { officeId } = req.params;
//   let officeObject;
//   for (const office of officeDb) {
//       // console.log(typeof officeId, typeof office.id)
//       if (office.id === Number(officeId)) {
//           officeObject = office
//       }
//   }
//   return res.status(200).json({
//       "status": 200,
//       "data": officeObject
//   });
  
// }