import nodemailer from 'nodemailer';
import randomstring from 'randomstring';
import OTP from '../models/otpModel.js';

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
    length: 6,
    charset: 'numeric',
  });
}
const otp = generateOTP();
const transporter = nodemailer.createTransport(emailConfig);

// Function to send OTP via email
async function sendOTPnode(req, res) {
  const { email } = req.body
  try {

    // console.log('OTP sent:', info.response);

    let emailFound = await OTP.findOne({ email })
    if (emailFound) {
      return res.status(400).json({ message: "Already registered" })
    }
    const newOTP = new OTP({ email, otp });
    let data = await newOTP.save();

    const info = await transporter.sendMail({
      from: process.env.AUTH_EMAIL, // Update with your email address
      to: email,
      subject: 'OTP for Login', // Replace with your email's subject
      text: `Your OTP is: ${otp}`, // Email body with the OTP
    });
    console.log('OTP saved to the database.');
    let dataEmail = data.email
    let _id = data._id
    // Respond to the client
    res.status(200).json({ message: 'OTP sent successfully', data: { email: dataEmail, _id } });
  } catch (error) {
    console.error('Error sending OTP:', error);

    // Respond with an error to the client
    res.status(500).json({ error: 'Failed to send OTP' });
  }
}

export default sendOTPnode;
