import uuidv4 from 'uuid/v4';
// import moment from 'moment';
import db from './databaseTables/dbconnect';

// const partyModel = new PartyModel()

class Interest {
  /**
   *
   * @param {Values} req - request values into keys
   * @param {Object} res - request object
   * @returns {array} - returns all key value pairs as object in array
   */
  static async userInterest(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (!req.body.userId && !req.body.userName) {
      return res.status(400).send({
        status: 400,
        error: 'UserId and Username cannot be empty',
      });
    }
    if (!req.body.partyId && !req.body.partyName) {
      return res.status(400).send({
        error: 'partyId and partyname cannot be empty',
      });
    }
    if (!req.body.officeId && !req.body.officeName) {
      return res.status(400).send({
        error: 'officeid and officename cannot be empty',
      });
    }
    const createQuery = `INSERT INTO
      interest(interestId, userId, userName, partyId, partyName, officeId, officeName)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *`;
    const values = [
      uuidv4(),
      req.body.userId,
      req.body.userName,
      req.body.partyId,
      req.body.partyName,
      req.body.officeId,
      req.body.officeName,
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send({
        status: 201,
        data: [{
          message: 'User successfully generated interest',
          data: rows,

        }],
      });
    } catch (error) {
      console.log('Here is the', error, '>>>>>>');
      return res.status(500).send({
        status: 500,
        error: 'Internal server error, please try again later',
      });
    }
  }

  static async getAllInterestedCandidates(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const findAllQuery = 'SELECT * FROM interest';
    try {
      const { rows } = await db.query(findAllQuery);
      return res.status(200).send({
        status: 200,
        data: rows,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
}
export default Interest;
