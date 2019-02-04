import userAuth from '../../helper/userAuth';
const validateRegister = async (req, res, next) => {
const { office, candidate, party } = req.body;

if(!office || !candidate || !party){
  return res.status(400).send({ 
    "status": 400, 
    "error": [{
        "message": "Some values are missing",
        "office": "office's id",
        "candidate": "candidate's id",
        "party": "party id" 
}]
})
}
// if(!userAuth.isWhiteSpace(office)){
//     return res.status(400).send({
//         "status": 400,
//         "error": "white space are not allowed in input fields"
//     });
// }

if(!userAuth.isWhiteSpace(office, candidate, party)){
    return res.status(400).send({
        "status": 400,
        "error": "Fill the inputs, they are empty"
    });
}

// if(!userAuth.isInt(office)){
//     return res.status(400).send({
//         "status": 400,
//         "error": "Your userId is empty or incorrect"        
//     }) 
// }

if(!userAuth.isInt(party)){
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
export default validateRegister;