import uuidv4 from 'uuid/v4';
import moment from 'moment';
// import moment from 'moment';
import db from '../../databaseTables/dbconnect';
import userAuth from '../../helper/userAuth';
import { request } from 'http';

// const partyModel = new PartyModel()

class Votes{
  /**
   * 
   * @param {Values} req - request values into keys 
   * @param {Object} res - request object
   * @returns {array} - returns all key value pairs as object in array
   */
  static async votes(req, res) {
    const { created_by, office, candidate } = req.body;

    const createQuery = `INSERT INTO
      votes(id, created_on, created_by, office, candidate)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
    const values = [
      uuidv4(),
      moment(new Date()),
      req.body.created_by,
      req.body.office,
      req.body.candidate
    ];
    console.log(values)

    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send({
        "status": 201,
        "data": [{
          "message": "Vote complete",
          "data": rows[0],
        }],
      });
    } catch(error) {
        console.log(error)
      return res.status(400).send({
        "status": 400,
        "error": [{
          "message": "You can't vote twice for this office or there was an error with your inputs",
          "Created_by": "type in your id",
          "office": "type your office id",
          "candidate": "candidate id"
        
      })
    }
  }
 }
export default Votes; 
