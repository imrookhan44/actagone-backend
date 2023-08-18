import express from 'express';
import { sendOTP, verifyOTP } from '../controller/otpController.js';
import { sendOTPnode, loginOtpSend, loginOtpVerify } from '../controller/sendotpnode.js';
import verifyOTPnode from '../controller/verfiyotp.js';
import { deleteFriend, getFriends, postFriends, searchFriends, getFriendsByUserId } from '../controller/AddFriends.js';

const router = express.Router();

router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/otp', sendOTPnode);
router.post('/otpverfiy', verifyOTPnode);
router.post('/login', loginOtpSend);
router.post('/loginotpverify', loginOtpVerify);
router.get('/friends', getFriends);
router.post('/friends', postFriends);
router.delete('/friends', deleteFriend);
router.get('/friends/search/:key', searchFriends);
router.get('/friends/:userId', getFriendsByUserId)


export default router;
