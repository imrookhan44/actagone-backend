import mongoose from "mongoose";

const schema = mongoose.Schema;

const registerSchema = new schema(
   {
      phone: {
         type: String,
      },
      email: { type: String },
      otp: { type: String },
      firstName: { type: String },
      lastName: { type: String },
      userName: {
         type: String,
      },
      friends: {
         friendId: {
            type: Array,
            default: [],
         },
      },
      profile_img: {
         type: String,
         default:
            "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
      },
      loginOtp: {
         type: String,
      },
   },
   { timestamps: true }
);

const User = mongoose.model("user", registerSchema);

export default User;
