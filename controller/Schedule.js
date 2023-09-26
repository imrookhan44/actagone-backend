import Schedule from "../models/Schedule.js";

export const addSchedule = async (req, res) => {
  const { userId, dateAndTime, title, location, phoneCalls, invitedPeople } = req.body;
  try {
    const add = new Schedule({
      title: title,
      userId: userId,
      dateAndTime: dateAndTime,
      location: location,
      phoneCalls: phoneCalls,
      invitedPeople: invitedPeople,
    });
    await add.save();
    res.status(200).json({ msg: "Schedule added" });
  } catch (error) {
    return res.status(404).json({ error: error, msg: "error" })
  }
};

export const getScheduleById = async (req, res) => {
  const { userId, dateAndTime } = req.body

  try {
    const find = await Schedule.find({ dateAndTime, userId })
    if (find) {
      res.status(200).json({ data: find })
    } else {
      res.status(400).json({ msg: "data not found" })
    }
  } catch (error) {

    res.status(400).json({ message: error })

  }

}
