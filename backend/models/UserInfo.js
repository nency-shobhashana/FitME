const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserInfoSchema = new Schema({

    firstname: {
        type: String,
        required: true
    },

    gender: 
    {
        type: String,
    },
    date:
    {
        type: String,
    },
    height:
    {
        type: String,
        required: true
    },

    weight:
    {
        type: String,
        required: true
    },
    
    userid:
    {
        type: String
    },

    bmi:
    {
        type: String
    },

}, {timestamps: true} )

const UserInfo = mongoose.model('UserInfo', UserInfoSchema)
module.exports = UserInfo