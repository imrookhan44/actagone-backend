import mongoose from 'mongoose'
var current = new Date();
const timeStamp = new Date(Date.UTC(current.getFullYear(),
   current.getMonth(), current.getDate(), current.getHours(),
   current.getMinutes(), current.getSeconds(), current.getMilliseconds()));
const schema = mongoose.Schema;

const userSchema = new schema({
   firstName: {
      type: String,
   },
   lastName: {
      type: String,
   },
   userName: {
      type: String,
   },
   profile_img: {
      type: String,
      default: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
   },
}, { timestamps: true })

const user = mongoose.model('users', userSchema);

export default user