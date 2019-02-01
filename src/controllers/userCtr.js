import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../../databaseTables/dbconnect';
import userAuthHelper from '../../helper/userAuth';

const User = {
  /**
   * Create A User
   * @param {object} req 
   * @param {object} res
   * @returns {object} User Object
   */
  async createUser(req, res) {
    if (!req.body.email || !req.body.password || !req.body.fullname || !req.body.lastname || !req.body.passportUrl) {
        return res.status(400).send({ 
            "status": 400, 
            "error": "Some values are missing" 
        });
      }
      if (!userAuthHelper.isWhiteSpace(req.body.email, req.body.password, req, req.body.passportUrl)) {
        return res.status(400).send({ 
            "status": 400, 
            "error": "White Space are not allowed in input fields" 
        });
      }

    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({
        "status": 400,  
        "error": "Please enter a valid email"
    });
}

    if (!userAuthHelper.ispasswordValid(req.body.password)) {
        return res.status(400).send({ 
            "status": 400, 
            "error": "Password Must Be at least Five Characters And Must Be A string" 
        });
      }

    const hashPassword = Helper.hashPassword(req.body.password);

    const createQuery = `INSERT INTO
      users(id, firstname, lastname, 
        othername, email, phonenumber, passportUrl, 
        password, created_date)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
      returning *`;

    const values = [
      uuidv4(),
      req.body.firstname,
      req.body.lastname,
      req.body.othername,
      req.body.email,
      req.body.phonenumber,
      req.body.passportUrl,
      hashPassword,
      moment(new Date())
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      const token = userAuthHelper.generateToken(rows[0].id);
      return res.status(201).header('x-auth-token', token).json({
        status: 201,
        data: [{
          token,
          user: rows[0],
        }],
      });
    } catch(error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ 
            "data": 400,
            "message": "User with that EMAIL already exist" 
    })
      }
      return res.status(400).send({
            "data":
            error
      });
    }
  },
  /**
   * Login
   * @param {object} req 
   * @param {object} res
   * @returns {object} user object 
   */
  async login(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({
        "status": 400,
        "error": "Some values are missing"
      });
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ 
        "status": 400,
        "error": "Please enter a valid email address" 
      });
    }
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).send({
          "status": 400,
          "error": "The credentials you provided is incorrect"
        });
      }
      if(!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).send({
          "status": 400, 
          "error": "The credentials you provided is incorrect" 
        });
      }
      const token = Helper.generateToken(rows[0].id);
      return res.status(200).send({
        "status": 201,
        "data": [{
          "token": token,
          "user": rows[0],
        }], 
      })
    } catch(error) {
      return res.status(400).send({
        "status": 404,
        "error": error
      })
    }
  }
  }
export default User;