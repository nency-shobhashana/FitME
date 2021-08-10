const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DieticianSchema = new Schema({

    firstname: {
        type: String,
    },

    specialisation: 
    {
        type: String,
    },
    experience:
    {
        type: String,
    },
    education:
    {
        type: String,
    },
    personal:
    {
        type: String,
    },

    contact:
    {
        type: String,
    },
    
    languages:
    {
        type: String,
    },

    userId:
    {
        type: String
    },

}, {timestamps: true} )

const Dietician = mongoose.model('Dietician', DieticianSchema)
module.exports = Dietician