import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../databaseTables/dbconnect';
import userAuthHelper from '../helper/userAuth';

const User = {
  /**
   * Create A User
   * @param {object} req 
   * @param {object} res
   * @returns {object} User Object
   */
  async createUser(req, res) {
    if (!req.body.email  || !req.body.password || !req.body.firstname || !req.body.lastname || !req.body.passportUrl) {
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

    if (!userAuthHelper.isValidEmail(req.body.email)) {
      return res.status(400).send({
        "status": 400,  
        "error": "Please enter a valid email"
    });
}
if(!req.body.passportUrl){
  return res.status(400).send({ 
    "status": 400, 
    "error": "URL field is empty" 
});
}

    if (!userAuthHelper.ispasswordValid(req.body.password)) {
        return res.status(400).send({ 
            "status": 400, 
            "error": "Password must be minimum eight characters, at least one letter and one number:" 
        });
      }

      if (!userAuthHelper.isName(req.body.firstname, req.body.lastname, req.body.othername)) {
        return res.status(400).send({ 
            "status": 400, 
            "error": "Names must only be Alphabets, spaces are allowed" 
        });
      }

      if (!userAuthHelper.isInt(req.body.phonenumber)) {
        return res.status(400).send({ 
            "status": 400, 
            "error": "Invalid Nigerian phone-number" 
        });
      }

      // if (!userAuthHelper.isURL(req.body.passportUrl)) {
      //   return res.status(400).send({ 
      //       "status": 400, 
      //       "error": "Invalid URL" 
      //   });
      // }



    const hashPassword = userAuthHelper.hashPassword(req.body.password);

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
    console.log(values);

    try {
      const { rows } = await db.query(createQuery, values);
      const userToken = { id: rows[0].id,  isAdmin: rows[0].isadmin }
      
      const token = userAuthHelper.generateToken(userToken);
     
      return res.status(201).header('x-auth-token', token).json({
        status: 201,
        data: [{
          "token": token,
          "user": rows[0]
        }],
      });
    } catch(error) {
      console.log(error);
      if (error.routine === '_bt_check_unique') {
        
        return res.status(409).send({ 
            "data": 409,
            "error": "User with that EMAIL already exist" 
    });
      }
      return res.status(400).send({
            "data": "Oops, something went wrong, check and try again"
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
    if (!userAuthHelper.isWhiteSpace(req.body.email, req.body.password)) {
      return res.status(400).send({ 
          "status": 400, 
          "error": "White Space are not allowed in input fields" 
      });
    }
    if (!userAuthHelper.isValidEmail(req.body.email)) {
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
      if(!userAuthHelper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).send({
          "status": 400, 
          "error": "The credentials you provided is incorrect" 
        });
      }
      const userToken = { id: rows[0].id,  isAdmin: rows[0].isadmin }

      const token = userAuthHelper.generateToken(userToken);

      console.log(token);
      return res.status(200).send({
        "status": 201,
        "data": [{
          "token": token,
          "user": rows[0],
        }], 
      })
    } catch(error) {
      console.log(error)
      return res.status(404).send({
        "status": 404,
        "error": error
      })
    }
  }

  /**
   * Get all
   */
  }
export default User;