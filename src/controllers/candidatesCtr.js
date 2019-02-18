import uuidv4 from 'uuid/v4';
// import moment from 'moment';
import db from '../databaseTables/dbconnect';
import userAuthHelper from '../helper/userAuth';

// const partyModel = new PartyModel()

class Candidates{
  /**
   * 
   * @param {Values} req - request values into keys 
   * @param {Object} res - request object
   * @returns {array} - returns all key value pairs as object in array
   */
  static async register(req, res) {
    console.log("ggggg")
    if( !req.body.office || !req.body.party ){
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
    if(!req.body.candidate){
      return res.status(400).send({
        "data":"null"
      })
    }
    const createQuery = `INSERT INTO
      candidates(candidateId, office, officeName, party, partyName, candidate, candidateName)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *`;
    const values = [
      uuidv4(),
      req.body.office,
      req.body.officeName,
      req.body.party,
      req.body.partyName,
      req.body.candidate,
      req.body.candidateName
    ];
    console.log(values)

    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send({
        "status": 201,
        "data": [{
          "message": "Candidate Registered",
          "Candidate-id":rows[0].candidateId, 
          "office": rows[0].office,
          "user": rows[0].candidate

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

  /**
   * Get all Candidates
   */
  static async getAllCandidates(req, res) {
    const findAllQuery = 'SELECT * FROM candidates';
    try{
      const { rows, rowCount } = await db.query(findAllQuery);
      return res.status(200).send({
        "status": 200,
       "data": rows, rowCount 
      });
    } catch(error) {
      console.log(error)
      return res.status(400).send(error);
    }
  }
 }
export default Candidates; 
