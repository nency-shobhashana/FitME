const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserChatSchema = new Schema({

    userId:
    {
        type: String
    },
    messages:{
        type: Array
    }

}, {timestamps: true} )

const UserChat = mongoose.model('UserChat', UserChatSchema)
module.exports = UserChat