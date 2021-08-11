const express = require('express');
const router = express.Router();
let UserInfo = require('../models/UserInfo');
let User = require('../models/User');
let Bmi = require('../models/Bmi');

router.route('/add').post( async (req,res) => {
    const firstname = req.body.firstname;
    const gender = req.body.gender;
    const date = req.body.date;
    const currentDate = req.body.currentDate;
    const height = req.body.height;
    const weight = req.body.weight;
    const userId = req.body.userId;
    const isPaid = req.body.isPaid;
    hei = parseFloat(req.body.height);
    wei = parseFloat(req.body.weight);
    const bmi = wei / (hei * hei);

    const newUserInfo = new UserInfo({firstname, gender, date, currentDate, height, weight, userId, isPaid, bmi});
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

router.route('/').get((req,res) => {
  UserInfo.find()
  .then(async (users) => {
    const promises = users.map(async user => {
      const userDetail = await User.findOne({userid: user.userId}).exec()
      const emailId = userDetail.email
      user['emailId'] = emailId
      return user
    })
    const data = await Promise.all(promises)
    res.json(data)
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

router.route('/updatepayment').post((req,res) => {
  const userid =  req.query.userId;
  const isPaid = req.body.isPaid;

  UserInfo.updateOne({userId: userid} , {isPaid: isPaid}, 
    function(err, numberAffected, rawResponse) {
    //handle it
     })
      .then(() => res.json('User updated'))
      .catch(err => res.status(400).json('Error:' + err));
});

module.exports = router