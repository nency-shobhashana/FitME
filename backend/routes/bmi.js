const express = require('express');
const router = express.Router();
let Bmi = require('../models/Bmi');
let UserInfo = require('../models/UserInfo');

router.route('/add').post((req,res) => {
    
    const height = req.body.height;
    const weight = req.body.weight;
    const date = req.body.date;
    const userId = req.body.userId;
    const bmi = req.body.bmi;

    var obj = {
        height,
        weight,
        date,
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
    Bmi.find(filter)
      .then((docs) => {
        if (docs.length > 0) res.json(docs);
        else {
          res.json({});
        }
      })
      .catch((err) => res.status(400).json("Error:" + err));

});


router.route('/').put((req,res) => {

  const userid = req.query.userid;
  const height = req.body.height;
  const weight = req.body.weight;
  const date = req.body.date;
  const userId = req.body.userId;
  const bmi = req.body.bmi;

  const details = [];

  var obj = 
  {

        height: height,
        weight: weight,
        date: date,
        bmi: bmi
  }

  orders.push(obj);
  
  Bmi.updateOne({userid: userid} , {details: orders}, 
          function(err, numberAffected, rawResponse) {
          //handle it
       })
      .then(() => res.json('User updated'))
      .catch(err => res.status(400).json('Error:' + err));
});





module.exports = router

