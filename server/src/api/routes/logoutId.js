import express from "express";
import { auth } from "../../../middleware/auth.js";
import Token from "../../models/tokenModel.js"; // 시퀄라이저 모델
import User from "../../models/userModel.js";

const router = express.Router();

router.get("/logout", auth, async (req, res) => {
  console.log("loguuset", req.user);
  const findUser = await User.findOne({
    where: { email: req.user },
    attributes: ["id"]
  });

  const deleteToken = await Token.destroy({
    where: { user_id: findUser.dataValues.id }
  });
  if (!deleteToken)
    (err, doc) => {
      if (err) return res.json({ success: false, err });
    };
  res.clearCookie("w_auth");
  return res.status(200).json({ isAuth: true });
  //console.log("back logout test", findUser.dataValues.id);
});

export default router;
