import mongoose  from 'mongoose'
const smsSchema = new mongoose.Schema({
    number:String,
    message:String,


})

const sms = mongoose.model('sms', smsSchema);

export default sms
