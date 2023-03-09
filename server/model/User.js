const mongoose = require("mongoose");

const {Schema, model} = mongoose;

const PerksSchema = new Schema({
    firstGuessBonus: {
        type: Number,
        default: 10,
    },
    hintBonus: {
        type: Number,
        default: 5,
    },
    dailyBonus:{
        type: Number,
        default: 10,
    },
    hintChance: {
        type: Number,
        default: 0,
    }
});

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
    perks: {
        type: String,
        default:''
    }, 
});


const User = model("User", UserSchema)

module.exports = User;