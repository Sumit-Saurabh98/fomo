const User = require("../models/user.model")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
require("dotenv").config();

const signup = async (req, res) =>{
    try {
        const{name, email, password} = req.body;
        const duplicate_email = await User.findOne({email})
        if(duplicate_email){
            res.status(401).send({message:"Account already exists"})
            return;
        }else{
            const hashed_password = bcrypt.hashSync(password, 10);

        const new_user = new User({
            name,
            email,
            password : hashed_password
        })
        await new_user.save();
        res.status(200).send({message:"Signup successful"})
        }
    } catch (error) {
        res.status(500).send({message:"Error during signing up"})
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).send({ message: "User not found" });
            return;
        }

        const correct_password = bcrypt.compareSync(password, user.password);

        if (correct_password) {
            let token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
            res.status(200).send({ message: "Login Successful", token: token }); 
        }
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
}


module.exports ={signup, login}