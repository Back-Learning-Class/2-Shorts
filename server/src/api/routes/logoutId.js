import express from "express";
import { auth } from "../../../middleware/auth.js";
import User from "../../models/userModel.js"; // 시퀄라이저 모델

const router = express.Router();

router.get("/logout", auth, async (req, res) => {
  /*const findUser = await User.update(
    { email: "" },
    //{ token: "", tokenExp: "" },
    {
      where: { email: req.user }
    }
  );
  if (!findUser)
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({ success: true });
    };*/
  console.log("logout ttest");
});

export default router;
