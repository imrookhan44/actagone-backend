import User from "../models/Register.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import twilio from "twilio";
import nodemailer from "nodemailer";
import randomstring from "randomstring";
import cloudinary from "./../helpers/UploadImage.js  ";
import Conversation from "../models/chat.conversation.js";
import dotenv from "dotenv";
dotenv.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_FROM_NUMBER;
const secretKey = process.env.JWT_SECRET_KEY;

console.log(accountSid, authToken, twilioPhoneNumber, secretKey);
const client = twilio(accountSid, authToken);

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

const emailConfig = {
  service: "Gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
};
const transporter = nodemailer.createTransport(emailConfig);

function generateEmailOtp() {
  return randomstring.generate({
    length: 6,
    charset: "alphanumeric",
  });
}

export const phoneAuth = async (req, res) => {
  const { phone } = req.body;
  console.log(phone, "phone");
  try {
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "This phone number already registered" });
    } else {
      const generatedOTP = generateOTP();

      client.messages
        .create({
          body: `Your OTP For Actagone is ${generatedOTP}`,
          from: twilioPhoneNumber,
          to: phone,
        })
        .then(async () => {
          const newUser = new User({
            phone,
            otp: generatedOTP,
          });
          await newUser.save();
          res.status(200).json({ message: "OTP sent successfully" });
        })
        .catch((error) => {
          res
            .status(500)
            .json({ msg: "Failed to send OTP", error: error.message });
        });
    }
  } catch (error) {
    return console.log(error);
  }
};

export const verifyOTP = async (req, res) => {
  const { phone, otp } = req.body;

  const oneWeek = 60 * 60 * 24 * 7;

  try {
    if (phone && otp) {
      const token = jwt.sign({ phone }, secretKey, {
        expiresIn: oneWeek,
      });
      User.findOne({
        phone,
        otp,
      }).then((user) => {
        if (!user) {
          return res.status(400).json({ msg: "Invalid OTP" });
        } else {
          return res
            .status(200)
            .json({ msg: "OTP verified successfully", token });
        }
      });
    }
  } catch (error) {
    return console.log(error);
  }
};

export const registerAndUpdateUserDetails = async (req, res) => {
  const { phone, firstName, lastName, username, email, otp, profile_img } =
    req.body;

  try {
    const uploadImage = await cloudinary.uploader.upload(profile_img, {
      folder: "uploads",
    });
    const clodimage = uploadImage.secure_url;
    const findUser = await User.findOne({ phone });

    if (!findUser) {
      return res.status(404).json({ error: "User not found" });
    } else {
      const updatedUser = await User.findByIdAndUpdate(
        findUser._id,
        {
          firstName,
          lastName,
          username,
          email,
          profile_img: clodimage,
        },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      return res
        .status(200)
        .json({ message: "Profile updated successfully", user: updatedUser });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const emailAuth = async (req, res) => {
  const { email } = req.body;

  try {
    const findUserByEmail = await User.findOne({ email });
    console.log(findUserByEmail, "findUserByEmail");

    if (!findUserByEmail) {
      return res.status(404).send("User not found");
    } else {
      const generatedOTP = generateOTP();
      const updateOtp = await User.findByIdAndUpdate(
        findUserByEmail._id,
        {
          loginOtp: generatedOTP,
        },
        { new: true }
      );
      if (!updateOtp) {
        return res.status(404).send("User not found");
      } else {
        const sendOtp = await sendOtpByEmail(email, generatedOTP);
        console.log(sendOtp, "sendOtp");
        if (!sendOtp) {
          return res.status(404).send("User not found");
        } else {
          return res.status(200).json({ message: "OTP sent successfully" });
        }
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const verifyEmailOTP = async (req, res) => {
  const { email, otp } = req.body;

  const oneWeek = 60 * 60 * 24 * 7;

  try {
    if (email && otp) {
      const token = jwt.sign({ email }, secretKey, {
        expiresIn: oneWeek,
      });

      const user = await User.findOne({
        email,
        loginOtp: otp,
      });

      if (!user) {
        return res.status(400).json({ msg: "Invalid OTP" });
      } else {
        return res
          .status(200)
          .json({ msg: "OTP verified successfully", token, user });
      }
    } else {
      return res.status(400).json({ msg: "Missing email or OTP" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

//get user with id
export const getUserByUnderscoreId = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ message: "User fetched successfully", user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const getUsers = async (req, res) => {
  const { userId } = req.body;
  try {
    const users = await User.find({ _id: { $ne: userId } });
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const addFriend = async (req, res) => {
  const { userId, friendId } = req.body;
  try {
    const user = await User.findById(userId);
    const secondUser = await User.findById(friendId);

    if (!user && !secondUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (
      user.friends.friendId.includes(friendId) &&
      secondUser.friends.friendId.includes(friendId)
    ) {
      return res.status(400).json({ error: "Friend already added" });
    }
    user.friends.friendId.push(friendId);
    secondUser.friends.friendId.push(userId);
    await user.save();
    await secondUser.save();
    const checkConversation = await Conversation.findOne({
      members: { $all: [userId, friendId] },
    });

    if (!checkConversation) {
      const newCoversation = new Conversation({
        members: [userId, friendId],
      });

      await newCoversation.save();
    }

    return res.status(200).json({ message: "Friend added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to add friend" });
  }
};

export const getFriends = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const friends = await User.find({
      _id: { $in: user.friends.friendId },
    });

    res.json(friends);
  } catch (err) {
    res.status(500).json(err);
  }
};

//email function
function sendOtpByEmail(email, otp) {
  const mailOptions = {
    from: process.env.AUTH_EMAIL, // Your email address
    to: email,
    subject: "OTP for Actagone", // Customize the email subject
    text: `Your OTP for Actagone is: ${otp}`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
}
