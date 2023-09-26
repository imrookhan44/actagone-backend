import mongoose from "mongoose";


const scheduleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  title: {
    type: String
  },
  dateAndTime: {
    type: Date
  },
  location: {
    type: Object
  },
  phoneCalls: {
    type: Array
  },
  invitedPeople: {
    type: Array
  },
  img: {
    type: String,
    default: "https://picsum.photos/200"
  }
}, {
  timestamps: true
})
const schedule = mongoose.model("schedule", scheduleSchema);
export default schedule
