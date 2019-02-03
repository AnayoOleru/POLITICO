import moment from 'moment';
import uuidv4 from 'uuid/v4';
import officeDb from '../db/officedb';
import db from '../../databaseTables/dbconnect';
// import Query from '../../helper/query'
// import PartyModel from '../models/party';


class Office{
  /**
   * Create office(admin)
   * @param {Values} req - request values into keys 
   * @param {Object} res - request object
   * @returns {array} - returns all key value pairs as object in array
   */
  

  static async create(req, res) {
    const createQuery = `INSERT INTO
      office(id, name, type, created_date)
      VALUES($1, $2, $3, $4)
      returning *`;
    const values = [
      uuidv4(),
      req.body.name,
      req.body.type,
      moment(new Date())
    ];
console.log(values)
    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send({
        "status": 201,
        "data": [{
          "message": "office created",
          "order": rows[0],
        }],
      });
      console.log(error)
    } catch(error) {
      return res.status(400).send({
        "status": 400,
        "data": error
      });
    }
  }


  /**
   * get all political offices(users)
   * @param {uuid} id
   * @param {Object} res - request object
   * @returns {array} - returns all key value pairs as object in array
   */
static async getAllOffices(req, res){
  const findAllQuery = 'SELECT * FROM office';
  try {
    const { rows, rowCount } = await db.query(findAllQuery);
    console.log(rows);
    return res.status(200).send({ 
      "status": 200,
      "data": rows, rowCount
       });
  } catch(error) {
    console.log(error);
    return res.status(400).send({
      "status": 400,
      "error":error
    });
  }
}

  /**
    * User fetch specific office
   * @param {uuid} id
   * @param {Object} res - request object
   * @returns {array} - returns specific party
   */
  static async getOneOffice(req, res) {
    const text = 'SELECT * FROM office WHERE id = $1';
    try {
      const { rows } = await db.query(text, [req.params.id]);
      if(!rows[0]) {
        return res.status(404).send({
          "status": 404,
          "error": "Office not found"
        });
      }
      return res.status(200).send({
        "status": 200,
        "data": rows[0]});
    } catch(error) {
      return res.status(400).send(error)
    }
  }

//   static async register(req, res) {
//     const id = Number(req.params.id);
//     const result = await Query.register([req.body.office, req.body.party, id]);
//     if (result.rows) {
//       return res.status(201).send({
//         status: 201,
//         data: [result.rows],
//       });
//     }
//     let error = '';
//     if (result.constraint.includes('pkey')) {
//       error = 'Candidate already registered for this office';
//       return res.status(409).send({
//         status: 409,
//         error,
//       });
//     }
//     if (result.constraint.includes('party')) error = 'Party ID does not exist.';
//     if (result.constraint.includes('office')) error = 'Office ID does not exist.';
//     return res.status(404).send({
//       status: 404,
//       error,
//     });
// }
}
export default Office;
