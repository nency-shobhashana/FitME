const express = require('express');
const router = express.Router();
let Bmi = require('../models/Bmi');

router.route('/add').post((req,res) => {
    

    const height = req.body.height;
    const weight = req.body.weight;
    const date = req.body.date;
    const userId = req.body.userId;
    hei = parseFloat(req.body.height);
    wei = parseFloat(req.body.weight);
    const bmi = wei / (hei * hei);

    console.log(height);

    const newBmi = new Bmi({height, weight, date, userId, bmi});

    newBmi.save()
        .then(() => {
            res.json('User data Added.')
        })
        .catch(err => res.status(400).json('Error:' + err));
});



module.exports = router
