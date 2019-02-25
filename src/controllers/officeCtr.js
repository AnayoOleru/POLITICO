import moment from 'moment';
import uuidv4 from 'uuid/v4';
import officeDb from '../db/officedb';
import db from '../controllers/databaseTables/dbconnect';
import userAuthHelper from '../helper/userAuth';
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
    if(!req.body.type && !req.body.name){
      return res.status(400).send({
        "status": 400,
        "error": "Inputs fields can't be left empty"
      })
    }
    
    if (!req.body.type) {
      return res.status(400).send({ 
          "status": 400, 
          "error": "Type field is empty" 
      });
    }

    if (!req.body.name) {
      return res.status(400).send({ 
          "status": 400, 
          "error": "Name field is empty" 
      });
    }
  
  if (!userAuthHelper.isName(req.body.name, req.body.type)) {
  return res.status(400).send({
    "status": 400,  
    "error": "Alphabets only"
});
}
// if (!userAuthHelper.isHigher(req.body.name, req.body.type)) {
//   return res.status(400).send({
//     "status": 400,  
//     "error": "Alphabets only"
//   })
//     };

    const check = `SELECT * FROM office WHERE name=$1`
      const { name } = req.body;
      const result = await db.query(check, [name]);
      if(result.rowCount !== 0){
        return res.status(400).send({
          "status":400,
          "error": "Office already exist"
        })
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
    try {
      // const result = await db.query(query);
      // if (result.row !== 0) {
      //   return res.status(400).json({
      //     status: 400,
      //     error: 'An office with this name already exist',
      //   });
      // }
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send({
        "status": 201,
        "data": [{
          "message": "office created",
          "order": rows[0],
        }],
      });
    } catch(error) {
      return res.status(500).send({
        "status": 400,
        "data": "There was an error, please try again."
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
    return res.status(200).send({ 
      "status": 200,
      "data": rows, rowCount
       });
  } catch(error) {
    return res.status(400).send({
      "status": 400,
      "error":"Bad Request"
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
      if (!userAuthHelper.isUUID(req.params)) {
        return res.status(400).send({
          "status": 400,  
          "error": "The user ID used is invalid"
      });
      }
      return res.status(200).send({
        "status": 200,
        "data": rows[0]});
    } catch(error) {
      return res.status(400).send({
        "status": 400,
        "error":"Bad request. Check and try again"
      })
    }
  }

   /**
   *
   * @param {*} request
   * @param {*} response
   * @return promise;
   */
  static async officeResult(req, res) {
    let  { officeid } = req.params;

    if (!userAuthHelper.isUUID(officeid)) {
      return res.status(400).send({
        "status": 400,  
        "error": "The user ID used is invalid"
    });
    }
    let text = 'SELECT * FROM office WHERE id = $1';
    let { rows } = await db.query(text, [officeid]);

    if(!rows[0]) {
      return res.status(404).send({
        "status": 404,
        "error": "Office not found"
      });
    }

  let text2 = 'SELECT candidate, COUNT(candidate) FROM votes WHERE office = $1 GROUP BY candidate';
 let row = await db.query(text2, [officeid]);
  const pollResult = [];
  for(let i = 0; i < row.rows.length; i++) {
    const singleResult = {
      "office": officeid,
      "candidate": row.rows[i].candidate,
      "result": Number(row.rows[i].count),
    };
    
    pollResult.push(singleResult);
  }
  const response = {
    "status": 200,
    "data": pollResult 
  };
  // console.log(response);
  return res.status(200).send(response);
  } catch(error) {
    return res.status(500).send({
      "status": 500,
      "error": error
    })
   }
}
export default Office;
