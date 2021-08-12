const express = require('express');
const router = express.Router();
let Quotes = require('../models/Quotes');

router.route('/add').post((req,res) => {
    const quotes = req.body.quotes;

    const newQuotes = new Quotes({quotes});
   

    newQuotes.save()
    .then(() => {
        res.json('User data Added.')
    })
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/randomQuote').get((req,res) => {

   
    var random;

    Quotes.find()
        .then((quotes) => {
    
        
                random = Math.floor(Math.random() * quotes.length);
                res.json(quotes[random]);
        })
        .catch(err => res.status(400).json('Error:' + err));
    
});

module.exports = router;