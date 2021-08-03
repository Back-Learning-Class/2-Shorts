import express from "express";
// express 버전 4.17.1
import cors from "cors";

import bodyParser from "body-parser";
import getData from "./src/api/routes/getYoutube.js";
//서버 세팅
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var port = 5000;

app.listen(port, () => {
  console.log("server on!" + port);
});

app.use("/api/route", getData);
