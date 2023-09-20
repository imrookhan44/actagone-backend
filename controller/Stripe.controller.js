import stripePackage from "stripe";
import dotenv from "dotenv";
dotenv.config()
const stripe = stripePackage(process.env.SECRET_KEY);
export const handlePayment = async (req, res) => {
  let status, error;
  const { amount, currency, email } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: 'Product Name',
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/amountToPay',
      cancel_url: 'https://yourwebsite.com/cancel',
      customer_email: email,
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};