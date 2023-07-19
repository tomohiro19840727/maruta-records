const functions = require("firebase-functions");
const cors = require("cors");
const express = require("express");
const app = express();

const stripe = require("stripe")(
  "sk_test_51NNs3cEZdPzyB7DWmugGpIdcBiCsEfkqavqITjJhh27WtxjIDxL4j46ST7sxn3yQfAgGZF7YNjpxPkE6Vvj6ZccD000MjFlhO6"
);

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/api", async (req, res) => {
  console.log(req.path);
  const { amount } = req.body;

  console.log(amount);
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

exports.api = functions.https.onRequest(app);
