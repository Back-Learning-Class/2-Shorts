import express from "express";
import reqProm from "request-promise";
// reqProm 버전 4.2.6
//import db from "../../../config/db.js";
import dotenv from "dotenv";
import { logger } from "../../../config/winston.js"; //로거
import moment from "moment-timezone";
import Record from "../../models/recordModel.js";
import con from "../../../config/db.js";

dotenv.config();

const router = express.Router();

const KEY = "AIzaSyA2nJdF6tnRHzzHoJt-AtjbmWnxE_FuPXw";

//const KEY = "AIzaSyCEivncDEIHZwGKpdjtngDXx_-EhdVtJdQ";
let option = {
  uri: "https://www.googleapis.com/youtube/v3/search",
  qs: {
    part: "snippet", // snippet // id,
    maxResults: 16,
    //order: "relevance",
    q: "##shorts",
    //regionCode: "KR",
    type: "video",
    //videoDuration: "short",
    //videoSyndicated: "any",
    key: KEY
  },
  headers: {
    "User-Agent": "Request-Promise"
  },
  json: true
};

router.get("/", async (req, res) => {
  let idResult = new Array(); // 동영상의 아이디가 저장되는 Array
  let titleResult = new Array(); // 동영상의 제목이 저장되는 Array
  let thumbnailsResult = new Array(); // 동영상의 썸네일 url 이 저장되는 Array // high 로 픽스
  logger.info("GET / ");

  moment.tz.setDefault("Asia/Seoul");
  let date = moment().format("YYYY-MM-DD HH:mm:ss");
  console.log("test", date);

  let apiResult = await reqProm(option);

  for (var i = 0; i < option.qs.maxResults; i++) {
    idResult.push(apiResult.items[i].id.videoId);
    titleResult.push(apiResult.items[i].snippet.title);
    thumbnailsResult.push(apiResult.items[i].snippet.thumbnails.high.url);
  }
  try {
    await Record.findOrCreate({
      where: {
        Record_date: date
      },
      defaults: {
        Record_videoid: idResult[4],
        Record_videotitle: "test",
        Record_thumbnail: thumbnailsResult[4]
      }
    });
  } catch (error) {
    console.log("error 73", error);
  }

  //console.log("idResult");
  console.log("get test", idResult);

  //console.log("titleResult");
  console.log(titleResult);

  //console.log("thumbnailsResult");
  console.log(thumbnailsResult);

  res.status(200).json({
    idResult,
    titleResult,
    thumbnailsResult
  });
});

export default router;
