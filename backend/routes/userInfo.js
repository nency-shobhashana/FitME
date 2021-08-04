const express = require('express');
const router = express.Router();
let UserInfo = require('../models/UserInfo');

router.route('/add').post((req,res) => {
    const firstname = req.body.firstname;
    const gender = req.body.gender;
    const date = req.body.date;
    const height = req.body.height;
    const weight = req.body.weight;
    const userId = req.body.userId;
    hei = parseFloat(req.body.height);
    wei = parseFloat(req.body.weight);
    const bmi = wei / (hei * hei);

    const newUserInfo = new UserInfo({firstname, gender, date, height, weight, userId, bmi});

    newUserInfo.save()
        .then(() => {
            res.json('User data Added.')
        })
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/getbmiByUserId').get((req,res) => {

    const userId = req.query.userId;
    console.log(userId)
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

module.exports = router