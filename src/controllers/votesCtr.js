import uuidv4 from 'uuid/v4';
import moment from 'moment';
// import moment from 'moment';
import db from './databaseTables/dbconnect';
import userAuthHelper from '../helper/userAuth';
// import userAuth from '../helper/userAuth';
// import { request } from 'http';

// const partyModel = new PartyModel()

class Votes {
  /**
   *
   * @param {Values} req - request values into keys
   * @param {Object} res - request object
   * @returns {array} - returns all key value pairs as object in array
   */
  static async votes(req, res) {
    // const { created_by, office, candidate } = req.body;
    if (!req.body.created_by && !req.body.office && !req.body.candidate) {
      return res.status(400).send({
        status: 400,
        error: 'Some values are missing',
      });
    }
    if (!userAuthHelper.isWhiteSpace(req.body.created_by, req.body.office, req, req.body.candidate)) {
      return res.status(400).send({
        status: 400,
        error: 'White Space are not allowed in input fields',
      });
    }

    const createQuery = `INSERT INTO
      votes(id, created_on, created_by, userName, office, officeName, candidate, candidateName)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      returning *`;
    const values = [
      uuidv4(),
      moment(new Date()),
      req.body.created_by,
      req.body.userName,
      req.body.office,
      req.body.officeName,
      req.body.candidate,
      req.body.candidateName,
    ];
    // console.log(values)

    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send({
        status: 201,
        data: [{
          message: 'Vote complete',
          data: {
            office: rows[0].office,
            candidate: rows[0].candidate,
            voter: rows[0].created_by,
          },
        }],
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        status: 400,
        error: [{
          message: 'Sorry, you have already voted for this user',
          Created_by: 'should be your id',
          office: 'should be your office id',
          candidate: 'should be your candidate id',
        }],
      });
    }
  }
}
export default Votes;
