const express = require('express');
const app = express();
const cors = require('cors');
const connection = require("./config/db")
require('dotenv').config()


app.use(cors());
app.use(express.json());


app.use((req, res) => {
    res.status(404).send({ message: 'Route not found' });
});

connection().then(()=>{
    try {
        app.listen(process.env.PORT, ()=>{
            console.log(`Server connected to http://localhost:${process.env.PORT}`);
        })
    } catch (error) {
        console.log('Cannot connect to the server')
    }
}).catch(error => console.log(error));