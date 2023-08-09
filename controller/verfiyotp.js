import OTP from '../models/otpModel.js';

async function verifyOTPnode(req, res) {
  const { email, otp } = req.body;

  try {
    const savedOTP = await OTP.findOne({ email, otp });

    if (savedOTP) {
      console.log('OTP verified successfully.');
      res.status(200).json({ message: 'OTP verified successfully' });
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
