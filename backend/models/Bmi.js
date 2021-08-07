const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BmiSchema = new Schema({

    details: 
    {
        type: Array
    },    
   
    userId:
    {
        type: String
    },

})

const Bmi = mongoose.model('Bmi', BmiSchema)
module.exports = Bmi

