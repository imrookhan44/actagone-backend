import express  from 'express'
import {controller}  from '../controller/Controller.js';
import {postSmsMarketing} from '../controller/smssend.js'
const router=express.Router()
router.post('/register', controller);
router.post('/smsMarketing',postSmsMarketing)

export default  router;
