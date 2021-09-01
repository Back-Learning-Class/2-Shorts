import express from "express";
import { auth } from "../../../middleware/auth.js";
import Token from "../../models/tokenModel.js"; // 시퀄라이저 모델
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/logout", async (req, res) => {
  console.log("loguuset", req.user);

  let accesTokenId = jwt.decode(req.cookies.w_auth);

  const deleteToken = await Token.destroy({
    where: { user_id: accesTokenId.tokenId }
  });
  if (!deleteToken)
    (err, doc) => {
      if (err) return res.json({ success: false, err });
    };
  res.clearCookie("w_auth");
  res.clearCookie("refresh_auth");
  return res.status(200).json({ isAuth: true });
  //console.log("back logout test", findUser.dataValues.id);
});

export default router;
