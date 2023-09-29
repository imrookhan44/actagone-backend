import mongoose from "mongoose";

const savedSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId
  },
  photos: {
    type: Array
  },
  name: {
    type: String
  },
  rating: {
    type: Number
  },
  totalRating: {
    type: Number
  },
  phoneNumber: {
    type: String
  },

})

const saved = mongoose.model("saved", savedSchema)
export default saved;