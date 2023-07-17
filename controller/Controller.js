import User from '../models/userSchema.js';
import  bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
export const controller =async (req, res)=> {
      const { name, email, password } = req.body;
      console.log("djdkdk", email)
      if (!name || !email || !password) {
        return res
          .status(201)
          .json({ Error: true, msg: "Please enter all fields" });
      }
      try {
        const user = await User.findOne({ email });
        if (!user) {
          let hashedpassword = await bcrypt.hash(password, 12);
  
          const newUser = new User({
            name,
            email,
            password: hashedpassword,
           
          });
          console.log("new user",newUser)
          await newUser.save().then((result) => {
            const token = jwt.sign(
              { email: newUser.email, id: newUser._id }, "your"
            );
            return res.status(201).json({
              newUser,
              token,
              msg: "User Created Successfully",
            });
          });
        
          } else {
            res.status(201).json({
              status: false,
              Error: true,
              msg: "User Already Exist",
            });
            return res.status(201).json({ msg: "User Already Exist" });
        }
      } catch (error) {
        return console.log(error);
      }
    }
