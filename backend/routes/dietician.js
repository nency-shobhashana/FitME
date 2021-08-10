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

router.route('/getInfobyUserId').get((req,res) => {

    const userId = req.query.userId;
    const filter = {
      userId: userId,
    };
    Dietician.find(filter)
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
  const specialisation = req.body.specialisation;
  const experience = req.body.experience;
  const education = req.body.education;
  const personal = req.body.personal;
  const contact = req.body.contact;
  const languages = req.body.languages;

  console.log(firstname);

  Dietician.updateOne({userId: userid} , {firstname: firstname, specialisation: specialisation, experience: experience, education: education, personal: personal, contact: contact, languages: languages}, 
    function(err, numberAffected, rawResponse) {
    //handle it
     })
      .then(() => res.json('User updated'))
      .catch(err => res.status(400).json('Error:' + err));
});


module.exports = router;