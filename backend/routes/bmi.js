const express = require('express');
const router = express.Router();
let Bmi = require('../models/Bmi');
let UserInfo = require('../models/UserInfo');
// Load the full build.
var _ = require('lodash');

router.route('/add').post((req,res) => {
    
    const height = req.body.height;
    const weight = req.body.weight;
    const currentDate = req.body.currentDate;
    const userId = req.body.userId;
    const bmi = req.body.bmi;

    var obj = {
        height,
        weight,
        currentDate,
        bmi
    }
    Bmi.updateOne({userId}, {'$push': {details: obj}})
        .then(() => {
          UserInfo.updateOne({userId}, {"$set":{
            height,
            weight,
            bmi
          }}).then(()=>{
            res.json('User data Added.')

          })
        })
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/getbmiByUserId').get((req,res) => {

    const userId = req.query.userId;
    console.log(userId)
    const filter = {
      userId: userId,
    };
    Bmi.findOne(filter)
      .then((docs) => {
        const data = _.orderBy(docs.details, ['currentDate'],['desc']);
        res.json(data);
      })
      .catch((err) => res.status(400).json("Error:" + err));

});

module.exports = router

