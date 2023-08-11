import mongoose, { Schema } from 'mongoose';
const schema = mongoose.schema;

var current = new Date();
const timeStamp = new Date(Date.UTC(current.getFullYear(),
    current.getMonth(), current.getDate(), current.getHours(),
    current.getMinutes(), current.getSeconds(), current.getMilliseconds()));


const AddFirendsSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }, 
    userName: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: timeStamp
    }
})

const AddFriends = mongoose.model("AddFriends", AddFirendsSchema);
export default AddFriends