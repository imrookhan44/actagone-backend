import twilio from 'twilio';
import OTP from '../models/otpModel.js';
import dotenv from 'dotenv'
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

export const sendOTP = (req, res) => {
  const phoneNumber = req.body.phoneNumber;

  if (phoneNumber) {
    const otp = generateOTP();
    const newOTP = new OTP({
      phone: phoneNumber,
      otp: otp.toString()
    });

    newOTP.save()
      .then(() => {
        client.messages
          .create({
            body: `Your verification code is: ${otp}`,
            from: twilioPhoneNumber,
            to: phoneNumber
          })
          .then(() => {
            res.status(200).json({ message: 'OTP sent successfully' });
          })
          .catch(error => {
            res.status(500).json({ message: 'Failed to send OTP', error: error.message });
          });
      })
      .catch(error => {
        res.status(500).json({ message: 'Failed to save OTP', error: error.message });
      });
  } else {
    res.status(400).json({ message: 'Phone number is required' });
  }
};

export const verifyOTP = (req, res) => {
  const phoneNumber = req.body?.phoneNumber;
  const otp = req.body?.otp;

//   console.log('Phone:', phoneNumber, 'OTP:', otp);

  if (phoneNumber && otp) {
    OTP.findOne({ phone: phoneNumber, otp: otp })
      .then(otp => {
        if (otp) {
          otp.deleteOne();
          res.status(200).json({ message: 'OTP verified successfully' });
        } else {
          res.status(400).json({ message: 'Invalid OTP' });
        }
      })
      .catch(error => {
        res.status(500).json({ message: 'Failed to verify OTP', error: error.message });
      });
  } else {
    res.status(400).json({ message: 'Phone number or OTP is missing' });
  }
};
