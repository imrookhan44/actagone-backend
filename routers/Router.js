import express from 'express'
import { controller, getUsers, profile_img, updateProfile } from '../controller/Controller.js';
import { postSmsMarketing } from '../controller/smssend.js'
import upload from '../helpers/UserProfile.js';
import { addCard, deleteCard, getCard } from '../controller/AddCard.js';
import { getConversation, postConversation } from '../controller/chat.conversation.js';
import { getMessages, postMessage } from '../controller/chat.message.js';
import {updateName, getAllUsers} from '../controller/signup.js';


const router = express.Router()
router.post('/register', controller);
router.post('/profile-image', upload.single('profile_img'), profile_img);
router.post('/addCard', addCard)
router.get('/getCards', getCard)
router.delete('/deleteCard', deleteCard)
router.post('/smsMarketing', postSmsMarketing)
router.put('/signup', updateName)


//conversation routes
router.route('/conversation').post(postConversation)
router.route('/conversation/:userId').get(getConversation)

//message routes
router.route('/message').post(postMessage);
router.route('/message/:conversationId').get(getMessages);
//user routes get all users
router.route('/users/:userId').get(getUsers);
//update user profile
router.route('/updateProfile').put(updateProfile);
router.get('/getallusers', getAllUsers)

export default router;



