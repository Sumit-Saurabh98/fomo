const jwt = require('jwt');
require("dotenv").config()

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            res.status(401).send("please login")
        }

        const decode = await jwt.verify(token, 'wrong-secret');
    } catch (error) {
        res.status(500).send({message:"Internal server error"});
    }
}