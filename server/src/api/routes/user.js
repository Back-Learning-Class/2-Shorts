import express from "express";
import db from "../../../config/db.js";

const router = express.Router();

router.post("/reqLogin", (req, res) => {
  let chkid = req.body.userId;
  let chkpw = req.body.userPswd;
  let loginResult = 0;
  let sql = "SELECT * FROM lock_extension WHERE id=?";
  db.query(sql, chkid, function (err, result) {
    if (err) console.log("error", err);
    console.log("test", result);
  });
  res.send(loginResult);
});

export default router;
