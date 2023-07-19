require('dotenv').config();

const express = require("express");

const app = express();
// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
// (process.env.REACT_APP_STRIPE_API_KEY);

app.use(express.static("public"));
app.use(express.json());

const url ="https://us-central1-maruta-records.cloudfunctions.net/api"

app.post(url, async (req, res) => {
  const { amount } = req.body;


 
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "jpy",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});




app.listen(4000, () => console.log("Node server listening on port 4242!"));