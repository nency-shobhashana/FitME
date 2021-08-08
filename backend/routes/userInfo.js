const express = require('express');
const router = express.Router();
let UserInfo = require('../models/UserInfo');
let Bmi = require('../models/Bmi');

router.route('/add').post((req,res) => {
    const firstname = req.body.firstname;
    const gender = req.body.gender;
    const date = req.body.date;
    const currentDate = req.body.currentDate;
    const height = req.body.height;
    const weight = req.body.weight;
    const userId = req.body.userId;
    hei = parseFloat(req.body.height);
    wei = parseFloat(req.body.weight);
    const bmi = wei / (hei * hei);

    const newUserInfo = new UserInfo({firstname, gender, date, currentDate, height, weight, userId, bmi});
    var bmiDetails = {
        height,
        weight,
        currentDate,
        bmi
    }

    newUserInfo.save()
        .then(() => {
            
            const newBmi = new Bmi({details: [bmiDetails], userId});
            newBmi.save()
            .then(() => {
              res.json('User data Added.')
            })
        })
        .catch(err => res.status(400).json('Error:' + err));
});


router.route('/getbmiByUserId').get((req,res) => {

    const userId = req.query.userId;
    const filter = {
      userId: userId,
    };
    UserInfo.find(filter)
      .then((carts) => {
        if (carts.length > 0) res.json(carts[0]);
        else {
          res.json({});
        }
      })
      .catch((err) => res.status(400).json("Error:" + err));

});


router.route('/update').post((req,res) => {
  const userid =  req.query.userId;
  const firstname = req.body.firstname;
  const date = req.body.date;
  const gender = req.body.gender;

  UserInfo.updateOne({userId: userid} , {firstname: firstname, date: date, gender: gender}, 
    function(err, numberAffected, rawResponse) {
    //handle it
     })
      .then(() => res.json('User updated'))
      .catch(err => res.status(400).json('Error:' + err));
});

module.exports = router