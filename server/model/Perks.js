const mongoose = require("mongoose");

const {Schema, model} = mongoose;

const PerksSchema = new Schema({
    name: {
        type: String,
        default: "",
    },
    level: {
        type: Number,
        default: 0,
    }
});

const Perk = model("Perk", PerksSchema)

module.exports = Perk;