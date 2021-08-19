import express from "express";
import { auth } from "../../../middleware/auth.js";
const router = express.Router();

router.get("/auth", (req, res) => {
  console.log("status test", req.cookies);
  res.json({
    isAuth: true,
    error: false
  });
});

export default router;
