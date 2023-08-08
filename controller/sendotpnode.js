import nodemailer from 'nodemailer';
import randomstring from 'randomstring';
import OTP from '../models/otpModel.js';


// Replace these credentials with your email account details
const emailConfig = {
  service: 'Gmail',
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
};

// Function to generate a random OTP
function generateOTP() {
  return randomstring.generate({
    length: 6, // Change the length as per your requirement
    charset: 'numeric',
  });
}

// Function to send OTP via email
async function sendOTPnode(req, res) {
  const {email} = req.body
  const otp = generateOTP();
  const transporter = nodemailer.createTransport(emailConfig);

  try {
    const info = await transporter.sendMail({
      from: process.env.AUTH_EMAIL, // Update with your email address
      to: email,
      subject: 'OTP for Login', // Replace with your email's subject
      text: `Your OTP is: ${otp}`, // Email body with the OTP
    });

    console.log('OTP sent:', info.response);

    // Save the OTP to the database
    const newOTP = new OTP({ email, otp });
    await newOTP.save();
    console.log('OTP saved to the database.');

    // Respond to the client
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);

    // Respond with an error to the client
    res.status(500).json({ error: 'Failed to send OTP' });
  }
}

export default sendOTPnode;
