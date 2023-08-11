import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  firstName: { type: String, },
  lastName: { type: String, },
  image: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now }
});

const OTP = mongoose.model('OTP', otpSchema);

export default OTP
