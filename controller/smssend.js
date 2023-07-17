import sendSms from '../middleware/sendSms.js';
import smsSchema from '../models/sms.js';
//reset password throght email

export const getsmsMarketing = async (req, res) => {
    let filter={}
    if(req.query.userId){
     filter={userId:req.query.userId.split(',')}
    }
    let data = await smsMarketing.find(filter);
    res.send(data)
}

 export const postSmsMarketing = async (req, res) => {
     try { 
        const {number,message}=req.body;
        const smsMarketingS=new smsSchema({number, message})
     const data=await smsMarketingS.save();
         
        await sendSms(number,message);
        return res.json({ message: `link send to your mobile number`,data })

    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
};