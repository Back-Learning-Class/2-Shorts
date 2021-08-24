import express from "express";
import { auth } from "../../../middleware/auth.js";
const router = express.Router();

router.get("/status", auth, (req, res) => {
  res.json({
    isAuth: true,
    error: false
  });
});

export default router;
