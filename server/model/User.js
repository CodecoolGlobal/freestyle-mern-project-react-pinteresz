const mongoose = require("mongoose");

const {Schema, model} = mongoose;


const UserSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    score:{
        type: Number,
        default: 0,
    },
    perks: [
        {
            name:  String,
            level: {
                type: Number,
                default: 0
            }
        }
    ]
});


const User = model("User", UserSchema)

module.exports = User;