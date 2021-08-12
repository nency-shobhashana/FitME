const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuotesSchema = new Schema({

    quotes: 
    {
        type: String
    },    

})

const Quotes = mongoose.model('Quotes', QuotesSchema)
module.exports = Quotes

