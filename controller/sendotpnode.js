import nodemailer from 'nodemailer';
import randomstring from 'randomstring';
import OTP from '../models/otpModel.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;


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
export const sendOTPnode = async(req, res)=> {
  const { email } = req.body
  try {

    // console.log('OTP sent:', info.response);

    let emailFound = await OTP.findOne({ email })
    if (emailFound) {
      return res.status(400).json({ message: "Already registered, Please Login" })
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

export const loginOtpSend = async (req, res) => {
  
  const { email } = req.body;
  try {
    let emailFound = await OTP.findOne({ email });
    if (!emailFound) {
      return res.status(400).json({ message: "Email not registered, Please SignUp" })
    }
    const newOTP = new OTP({ email, otp });
    // let data = await newOTP.save();

    const info = await transporter.sendMail({
      from: process.env.AUTH_EMAIL, // Update with your email address
      to: email,
      subject: 'OTP for Login', // Replace with your email's subject
      text: `Your OTP is: ${otp}`, // Email body with the OTP
    });
    console.log('OTP saved to the database');
    let dataEmail = data.email
    let _id = data._id
    // Respond to the client
    res.status(200).json({ message: 'OTP sent successfully', data: { email: dataEmail, _id } });
  }catch (error) {
    console.error('Error sending OTP:', error);

    // Respond with an error to the client
    res.status(500).json({ error: 'Failed to send OTP' });
  }
  
}

export const  loginOtpVerify = async (req, res) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const { email, otp } = req.body;
  try {

    const savedOtp = await OTP.findOne({ email, otp });
    if (!savedOtp) {
      return res.status(400).json({ message: "Invalid OTP" })
    }
    // Generate a JWT token
     // Replace with your actual secret key
    const jwtPayload = {
      email: savedOtp.email,
      // Add any additional data you want to include in the token payload
    };
    const token = jwt.sign(jwtPayload, secretKey, { expiresIn : oneDay} ); // You can adjust the expiration time

    return res.status(200).json({ message: "OTP verified", token: token });
    
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ error: 'Failed to send OTP' })
  
  }
}


