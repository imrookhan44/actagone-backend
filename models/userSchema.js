import mongoose from 'mongoose'
var current = new Date();
const timeStamp = new Date(Date.UTC(current.getFullYear(),
   current.getMonth(), current.getDate(), current.getHours(),
   current.getMinutes(), current.getSeconds(), current.getMilliseconds()));
const schema = mongoose.Schema;

const userSchema = new schema({
   name: {
      type: String,
      require: true
   },
   email: {
      type: String,
      require: true,
      unique: true
   },
   password: {
      type: String,
      require: true
   },
   createdata: {
      type: Date,
      default:timeStamp

   }

})

const user = mongoose.model('users', userSchema);

export default user