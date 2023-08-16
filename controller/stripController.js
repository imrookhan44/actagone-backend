// controllers/stripeController.js
import dotenv from 'dotenv';
dotenv.config();

import stripePackage from 'stripe';
const stripe = stripePackage(process.env.SECRET_KEY);

export const handlePayment = async (req, res) => {
  let status, error;
  const { token, amount } = req.body;
  try {
    await stripe.charges.create({
      source: token.id,
      amount,
      currency: 'usd',
    });
    status = 'success';
  } catch (err) {
    console.error(err);
    status = 'Failure';
    error = err.message;
  }
  res.json({ error, status });
};
