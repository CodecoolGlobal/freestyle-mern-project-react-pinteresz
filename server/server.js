const express = require("express");
const app = express();
app.use(express.json())

const mongoose = require("mongoose");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});




app.listen(3001, () => console.log('Server started on port 3001'));