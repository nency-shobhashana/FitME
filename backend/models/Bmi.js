const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BmiSchema = new Schema({

    height: {
        type: String,
        required: true
    },

    weight: 
    {
        type: String,
        required: true
    },

    date:
    {
        type: String
    },

    bmi:
    {
        type: String
    },
    
    userId:
    {
        type: String
    },


}, {timestamps: true} )

const Bmi = mongoose.model('Bmi', BmiSchema)
module.exports = Bmi

