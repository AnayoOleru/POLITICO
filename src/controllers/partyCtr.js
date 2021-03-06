
import uuidv4 from 'uuid/v4';
import moment from 'moment';
import partyDb from '../db/partydb';
// import PartyModel from '../models/party';
import db from "./databaseTables/dbconnect";
import userAuthHelper from '../helper/userAuth';

// const partyModel = new PartyModel()

class Party {
  /**
   *
   * @param {Values} req - request values into keys
   * @param {Object} res - request object
   * @returns {array} - returns all key value pairs as object in array
   */
  static async create(req, res) {
    if (!req.body.name && !req.body.hqaddress && !req.body.logoUrl) {
      return res.status(400).send({
        status: 400,
        error: "Inputs fields can't be left empty",
      });
    }
    if (!req.body.logoUrl) {
      return res.status(400).send({
        status: 400,
        error: 'Logo field is empty',
      });
    }
    if (!req.body.name) {
      return res.status(400).send({
        status: 400,
        error: 'Party field is empty',
      });
    }
    if (!req.body.hqaddress) {
      return res.status(400).send({
        status: 400,
        error: 'Address field is empty',
      });
    }
    if (!userAuthHelper.isAddress(req.body.hqaddress)) {
      return res.status(400).send({
        status: 400,
        error: 'Please enter a valid address',
      });
    }
    if (!userAuthHelper.isName(req.body.name)) {
      return res.status(400).send({
        status: 400,
        error: 'Alphabets only',
      });
    }
    // if (!userAuthHelper.isHigher(req.body.name, req.body.hqaddress)) {
    //   return res.status(400).send({
    //     "status": 400,
    //     "error": "Alphabets only"
    //   })
    //     };
    if (!userAuthHelper.isURL(req.body.logoUrl)) {
      return res.status(400).send({
        status: 400,
        error: 'Incorrect URL. Use https://',
      });
    }
      const check = 'SELECT * FROM party WHERE name=$1';
    const { name } = req.body;
    const result = await db.query(check, [name]);
    if (result.rowCount !== 0) {
      return res.status(400).send({
        status: 400,
        error: 'Party already exist',
      });
    }

    const createQuery = `INSERT INTO
      party(id, name, hqaddress, logoUrl, created_date)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
    const values = [
      uuidv4(),
      req.body.name,
      req.body.hqaddress,
      req.body.logoUrl,
      moment(new Date()),
    ];


    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send({
        status: 201,
        data: [{
          message: 'party created',
          order: rows[0],
        }],
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        data: error,
      });
    }
  }

  /**
   * Get a specific party(users)
   * @param {uuid} id
   * @param {Object} res - request object
   * @returns {array} - returns specific party
   */
  static async getAParty(req, res) {
    const { id } = req.params;
    if (!userAuthHelper.isUUID(id)) {
      return res.status(400).send({
        status: 400,
        error: 'The user ID used is invalid',
      });
    }
    const text = 'SELECT * FROM party WHERE id = $1';
    try {
      const { rows } = await db.query(text, [id]);
      // console.log(party_id);
      if (!rows[0]) {
        return res.status(404).send({ error: 'Party not found' });
      }
      // if(req.body.params !== rows[0].id){
      //   return res.status(404).send({"error": "Your id is wrong"});
      // }
      return res.status(200).send({
        status: 201,
        data: [{
          order: rows[0],
        }],
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  /**
   * Get All parties(users)
   * @param {uuid} id
   * @param {Object} res - request object
   * @returns {array} - returns all key value pairs as object in array
   */
  // static getParties(req, res)  {
  //   return res.status(200).json({
  //     "status": 200,
  //     "data": partyDb
  //   });
  // }
  static async getParties(req, res) {
    const findAllQuery = 'SELECT * FROM party';
    try {
      const { rows, rowCount } = await db.query(findAllQuery);
      return res.status(200).send({
        status: 200,
        data: rows,
        rowCount,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  /**
   * Edit a specific party(admin)
   * @param {object} req
   * @param {object} res
   * @returns {object} updated party
   */
  static async update(req, res) {
    if (!req.body.name) {
      return res.status(400).send({
        status: 400,
        error: "Input field can't be left empty",
      });
    }

    const findOneQuery = 'SELECT * FROM party WHERE id=$1';
    const updateOneQuery = `UPDATE party
      SET name=$1 
      WHERE id=$2 returning *`;

    try {
      const { rows } = await db.query(findOneQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          error: 'Party not found',
        });
      }
      const values = [
        req.body.name || rows[0].name,
        req.params.id,
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch (err) {
      return res.status(400).send({
        error: 'Oops, something wrong happened. Check and try again',
      });
    }
  }

  /**
   * Delete party(admin)
   * @param {object} req
   * @param {object} res
   * @returns {void} return code 204
   */
  static async delete(req, res) {
    const deleteQuery = 'DELETE FROM party WHERE id=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id]);

      if (!rows[0]) {
        return res.status(404).send({
          error: 404,
          message: 'party not found',
        });
      }
      return res.status(410).send({
        data: 'deleted',
      });
    } catch (error) {
      // console.log(error);
      return res.status(400).send({
        error: 'Oops, something wrong happened. Check and try again',
      });
    }
  }
}
export default Party;
