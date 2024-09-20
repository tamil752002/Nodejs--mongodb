const mongoose = require("mongoose");
const { Schema } = mongoose;

const personSchema = new Schema({
    FName: {
        type: String,
        required: true,
        trim: true,
    },
    LName: {
        type: String,
        required: true,     
    },
    age: {
        type: Number,
        required: true,
    },
})
const Person = mongoose.model("Person", personSchema);
module.exports = Person;
