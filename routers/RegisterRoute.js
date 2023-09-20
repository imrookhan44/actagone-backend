import express from 'express'
import { emailAuth, getUserByUnderscoreId, getUsers, phoneAuth, registerAndUpdateUserDetails, verifyEmailOTP, verifyOTP, addFriend, getFriends } from '../controller/Register.js'
const router = express.Router();
router.post('/phoneAuth', phoneAuth);
router.post('/verifyOTP', verifyOTP);
router.put('/emailAuth', emailAuth);
router.post('/verifyEmailOTP', verifyEmailOTP);
router.put('/updateProfile', registerAndUpdateUserDetails)
router.get('/getUserWithId', getUserByUnderscoreId)
router.post('/getUsers', getUsers)
router.post('/addFriend', addFriend)
router.post('/getFriends', getFriends)
export default router