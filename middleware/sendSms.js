const accountId="AC5ba5e8d70ae1dc168dc2a1ef1288eb84";
const authToken="eaa9d3ccff3b699dd0e6f90d700b2f0d"
const testNum=+18149293525
import twilio from "twilio";

const smsTwilio=twilio(accountId,authToken)
const sendSms=async(number,text)=>{
    
    console.log('number 1: ', number);
    try {
        await smsTwilio.messages.create({
           body:text,
           from:testNum,
           to:number
        })
        console.log("Send Sms Success");
    } catch (error) {
        console.log(error,"sms not sent");
    }
}
export default sendSms