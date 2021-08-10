var moment = require('moment'); 

const express = require('express');
const router = express.Router();
let UserChatSchema = require('../models/chat');
let UserInfo = require('../models/UserInfo');

router.route('/admin/add').post((req,res) => {
    
  const text = req.body.text;
  const date = moment().valueOf();
  const admin = true;
  const userId = req.body.userId;

  var obj = {
    text,
    date,
    admin
  }
  UserChatSchema.updateOne({userId}, {'$push': {messages: obj}},{upsert: true})
      .then(() => {
        res.json('Message Added.')
      })
      .catch(err => res.status(400).json('Error:' + err));
});

router.route('/add').post((req,res) => {
    
    const text = req.body.text;
    const date = moment().valueOf();
    const admin = false;
    const userId = req.body.userId;

    var obj = {
      text,
      date,
      admin
    }
    UserChatSchema.updateOne({userId}, {'$push': {messages: obj}}, {upsert: true})
        .then(() => {
          res.json('Message Added.')
        })
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/:uid').get((req,res) => {

    const userId = req.params.uid;
    console.log(userId)
    const filter = {
      userId,
    };
    UserChatSchema.findOne(filter)
      .then((docs) => {
        res.json(docs);
      })
      .catch((err) => res.status(400).json("Error:" + err));

});

module.exports = router

