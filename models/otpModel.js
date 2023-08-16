import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  firstName: { type: String, },
  lastName: { type: String, },
  userName: {
    type: String
  },
  image: {
    type: String
  },
 
  createdAt: { type: Date, default: Date.now }
});

const OTP = mongoose.model('otp', otpSchema);

export default OTP
