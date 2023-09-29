import express from "express";
import { getSavedByUserId, postSavedData } from "../controller/Saved.js";

const router = express.Router();

router.post("/postSaved", postSavedData);
router.post("/getSaved", getSavedByUserId);

export default router;
