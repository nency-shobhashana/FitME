const express = require('express');
const router = express.Router();
let Dietician = require('../models/Dietician');

router.route('/add').post((req,res) => {
    const firstname = req.body.firstname;
    const specialisation = req.body.specialisation;
    const experience = req.body.experience;
    const education = req.body.education;
    const personal = req.body.personal;
    const contact = req.body.contact;
    const languages = req.body.languages;
    const userId = req.body.userId;

    const newDietician = new Dietician({firstname, specialisation, experience, education, personal, contact, languages, userId});
   

    newDietician.save()
    .then(() => {
        res.json('User data Added.')
    })
        .catch(err => res.status(400).json('Error:' + err));
});

module.exports = router;