require("dotenv").config();
const jwt = require("jsonwebtoken");
//brought in a deconstructed way the findByIdUserService
const {findByIdUserService} = require("../users/users.service");

/*
exporting an anonymous function Let's do a little different exporting the middleware function compared to the other functions we've created. Instead of naming the function and exporting it later, let's create it anonymously inside module.exports. It's another way of working with modularization: */

module.exports = (req,res,next) => {
    const authHeader = req.header.authorization;

    if(!authHeader){
        return res.status(401).send({
            message:"The token didn't ind!"
        })
    }

    const parts = authHeader.split(" ")// ["Bearer", "<token>"]
    if (parts.length !==2) {// if there is no Bearer or token
        return res.status(401).send({message: "Invalid token!"});
    }
// the bearer is now the schema and token remains tu=oken. the arrey was deconstructed
    const [scheme, token] = parts;
    // validating individually
    if (!/^Bearer$/i.test(scheme)) {//checking from scheme starts with Bearer
        return res.status(401).send({ message: "Malformatted Token!" });
      
}
//checking the jwt
jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    const user = await findByIdUserService(decoded.id);// generateToken id deconstruct

    if (err || !user || !user.id) {// if not, it gives an error
      return res.status(401).send({ message: "Invalid token!" });
    }
//sending a user id to the route request (decoded.id)
    req.userId = user.id;

    return next();
  });



}