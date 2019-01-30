import uuid from 'uuid';
import partyDb from '../db/partydb';
// import PartyModel from '../models/party';
import db from '../../databaseTables/dbconnect';

// const partyModel = new PartyModel()

class Party{
  /**
   * 
   * @param {Values} req - request values into keys 
   * @param {Object} res - request object
   * @returns {array} - returns all key value pairs as object in array
   */
  // static createParty(req, res) {
  //   const {
  //     name,
  //     hqaddress,
  //     logoURL
  //   } = req.body;
  //   partyDb.push({
  //     id: uuid.v4(),
  //     name,
  //     hqaddress,
  //     logoURL
  //   });
  //   return res.status(201).json({
  //     "status": 201,
  //     "data": partyDb
  //   });
  // }

  static async create(req, res) {
    const { isAdmin } = req.user;
        if (isAdmin) {
          return res.status(403).json({
            status: 403,
            message: "Access denied, you don't have the required credentials to access this route",
          });
        }
    const createQuery = `INSERT INTO
      party(id, name, type, created_date)
      VALUES($1, $2, $3, $4)
      returning *`;
    const values = [
      uuidv4(),
      req.body.name,
      req.body.type,
      moment(new Date())
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send({
        "status": 201,
        "data": [{
          "message": "party created",
          "order": rows[0],
        }],
      });
    } catch(error) {
      return res.status(400).send({
        "status": 400,
        "data": error
      });
    }
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
  // static update(req, res) {
  //   let partyObject;

  //   const party = partyModel.findOne(req.params.id);
  //   console.log(party);
  //   if (!party) {
  //     return res.status(404).send({
  //       "status": 404,
  //       "error": "party not found"
  //     });
  //   }
  //   party.name = req.body.name
  //   // const updatedParty = PartyModel.update(req.params.id, req.body)
  //   return res.status(200).send(party);
  // }

  static async update(req, res) {
    const findOneQuery = 'SELECT * FROM party WHERE id=$1';
    const updateOneQuery =`UPDATE party
      SET name=$1,type=$2, modified_date=$3
      WHERE id=$4 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id, req.user.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'Party not found'});
      }
      const values = [
        req.body.name || rows[0].name,
        req.body.type || rows[0].type,
        moment(new Date()),
        req.params.id,
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch(err) {
      return res.status(400).send(err);
    }
  }
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return code 204 
   */
  // static delete(req, res) {
  //   const party = partyModel.findOne(req.params.id);
  //   if (!party) {
  //     return res.status(404).send({
  //       "status": 404,
  //       "error": "party not found"
  //     });
  //   }
  //   const ref = partyModel.delete(req.params.id);
  //   return res.status(200).send({
  //     "status": 200,
  //     "message": "Party had been deleted",
  //     "data": party
  //   });
  // }


  static async delete(req, res) {
    const deleteQuery = 'DELETE FROM party WHERE id=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, req.params.id);
      if(!rows[0]) {
        return res.status(404).send({'message': 'party not found'});
      }
      return res.status(204).send({ 'message': 'deleted' });
    } catch(error) {
      return res.status(400).send(error);
    }
  }

} 
export default Party;