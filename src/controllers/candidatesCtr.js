import uuidv4 from 'uuid/v4';
// import moment from 'moment';
import db from '../../databaseTables/dbconnect';

// const partyModel = new PartyModel()

class Candidates{
  /**
   * 
   * @param {Values} req - request values into keys 
   * @param {Object} res - request object
   * @returns {array} - returns all key value pairs as object in array
   */
  static async register(req, res) {
    if(!req.body.office || !req.body.party || !req.body.candidate){
      return res.status(400).send({ 
        "status": 400, 
        "error": [{
            "message": "Some values are missing",
            "office": "office's id",
            "party": "party's id",
            "candidate": "the user id you wants to register" 
    }]
})
    }
    const createQuery = `INSERT INTO
      candidates(id, office, party, candidate)
      VALUES($1, $2, $3, $4)
      returning *`;
    const values = [
      uuidv4(),
      req.body.office,
      req.body.party,
      req.body.candidate
    ];
    console.log(values)

    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send({
        "status": 201,
        "data": [{
          "message": "Candidate Registered",
          "data": rows[0]
        }],
      });
    } catch(error) {
        console.log(error)
      return res.status(400).send({
        "status": 400,
        "error": "You can't register this user as a candidate twice"
      })
    }
  }
 }
export default Candidates; 
