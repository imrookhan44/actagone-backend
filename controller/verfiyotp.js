import OTP from '../models/otpModel.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
const secretKey = process.env.SECRET_KEY;

// Function to verify OTP
async function verifyOTPnode(req, res) {
  const { email, otp } = req.body;
  const oneDay = 24 * 60 * 60 * 1000;

  try {
    const savedOTP = await OTP.findOne({ email, otp });

    if (savedOTP) {
      // Generate a JWT token
      // Replace with your actual secret key
      const jwtPayload = {
        email: savedOTP.email,
        // Add any additional data you want to include in the token payload
      };
      const token = jwt.sign(jwtPayload, secretKey, { expiresIn: oneDay }); // You can adjust the expiration time

      return res.status(200).json({ message: "OTP verified", token: token });
    } else {
      console.log('Invalid OTP.');
      res.status(400).json({ error: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
}

export default verifyOTPnode;
