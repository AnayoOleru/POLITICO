import userAuth from '../../helper/userAuth';
const validateVote = async (req, res, next) => {
const { created_by, office, candidate } = req.body;

if(!created_by || !office || !candidate){
  return res.status(400).send({ 
    "status": 400, 
    "error": [{
        "message": "Some values are missing",
        "created_by": "user id",
        "office": "office's id",
        "candidate": "candidate's id" 
}]
})
}
if(!userAuth.isWhiteSpace(office)){
    return res.status(400).send({
        "status": 400,
        "error": "white space are not allowed in input fields"
    });
}

if(!userAuth.isWhiteSpace(office, candidate, created_by)){
    return res.status(400).send({
        "status": 400,
        "error": "Fill the inputs, they are empty"
    });
}

if(!userAuth.isInt(created_by)){
    return res.status(400).send({
        "status": 400,
        "error": "Your userId is empty or incorrect"        
    }) 
}

if(!userAuth.isInt(candidate)){
    return res.status(400).send({
        "status": 400,
        "error": "Candidate Id field is empty or Id is incorrect"        
    }) 
}

    next();
    }
export default validateVote;