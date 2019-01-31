import moment from 'moment';
import uuidv4 from 'uuid/v4';
import officeDb from '../db/officedb';
import db from '../../databaseTables/dbconnect';
// import PartyModel from '../models/party';


class Office{
  /**
   * Create office(admin)
   * @param {Values} req - request values into keys 
   * @param {Object} res - request object
   * @returns {array} - returns all key value pairs as object in array
   */
  

  static async create(req, res) {
    const { isAdmin } = req.user;
        if (isAdmin) {
          return res.status(403).json({
            "status": 403,
            "message": "Access denied, you don't have the required credentials to access this route",
          });
        }
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
    return res.status(200).send({ rows, rowCount });
  } catch(error) {
    return res.status(400).send(error);
  }
}

  /**
   * User fetch specific office
   * @param {uuid} id
   * @param {Object} res - request object
   * @returns {array} - returns specific party
   */
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
  static async getOneOffice(req, res) {
    const text = 'SELECT * FROM party WHERE id = $1';
    try {
      const { rows } = await db.query(text, [req.params.id, req.user.id]);
      if(!rows[0]) {
        return res.status(404).send({'error': 'Office not found'});
      }
      return res.status(200).send(rows[0]);
    } catch(error) {
      return res.status(400).send(error)
    }
  }
}
export default Office;
