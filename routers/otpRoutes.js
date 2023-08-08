import express from 'express';
import { sendOTP, verifyOTP } from '../controller/otpController.js';
import sendOTPnode from '../controller/sendotpnode.js';

const router = express.Router();

router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/otp', sendOTPnode);

export default router;
