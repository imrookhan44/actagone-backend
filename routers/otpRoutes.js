import express from 'express';
import { sendOTP, verifyOTP } from '../controller/otpController.js';
import { sendOTPnode, loginOtpSend, loginOtpVerify } from '../controller/sendotpnode.js';
import verifyOTPnode from '../controller/verfiyotp.js';

const router = express.Router();

router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/otp', sendOTPnode);
router.post('/otpverfiy', verifyOTPnode);
router.post('/login', loginOtpSend);
router.post('/loginotpverify', loginOtpVerify);

export default router;
