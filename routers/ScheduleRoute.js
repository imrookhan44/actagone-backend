import express from "express";
import { addSchedule, getScheduleById } from "./../controller/Schedule.js";

const router = express.Router();

router.post("/addSchedule", addSchedule);
router.post("/getScheduleById", getScheduleById);
export default router;
