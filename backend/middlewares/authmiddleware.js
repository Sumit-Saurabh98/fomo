require("dotenv").config();
const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).send("Please login");
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
      req.userId = decoded.userId;
      next();
    } else {
      res.status(401).send({message:"Please login"});
    }
  } catch (error) {
    res.status(500).send({message:"Internal server error"});
  }
};

module.exports = authenticate;