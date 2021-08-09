const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv/config');
//import Stripe from "stripe";
const Stripe = require('stripe');
app.use(bodyParser.json());

app.use(cors());
app.options('*', cors());


const PUBLISHABLE_KEY = "ADD_PUBLISHABLE KEY HERE";
const SECRET_KEY = "ADD_SECRETE KEY HERE";



//Confirm the API version from your stripe dashboard
stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });


mongoose.set('useFindAndModify', false);

//Import Routes
const authRoute = require('./routes/auth');
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');
const userRoute = require('./routes/userInfo');
const bmiRoute = require('./routes/bmi');

//Routes
app.get('/', (req, res) => {
    res.send("Welcome to Home");
})


app.post("/create-payment-intent", async (req, res) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 1099, //lowest denomination of particular currency
        currency: "cad",
        payment_method_types: ["card"], //by default
      });
  
      const clientSecret = paymentIntent.client_secret;
  
      res.json({
        clientSecret: clientSecret,
      });
    } catch (e) {
      console.log(e.message);
      res.json({ error: e.message });
    }
  });
  


//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, (err) =>{
    if(err){
        console.log(err);
    }else{
        console.log('Connected to db');
    }
    app.use('/user', authRoute);
    app.use('/userInfo', userRoute);
    app.use('/userBmi', bmiRoute);
    app.use('/category', categoryRoute);
    app.use('/product', productRoute);
})

app.listen(3000);