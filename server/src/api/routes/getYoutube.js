import express from "express";
import reqProm from "request-promise";
// reqProm 버전 4.2.6

const router = express.Router();

const KEY = "AIzaSyA2nJdF6tnRHzzHoJt-AtjbmWnxE_FuPXw";

//const KEY = "AIzaSyCEivncDEIHZwGKpdjtngDXx_-EhdVtJdQ";
let option = {
  uri: "https://www.googleapis.com/youtube/v3/search",
  qs: {
    part: "snippet", // snippet // id
    eventType: "completed",
    maxResults: 8,
    order: "viewCount",
    q: "#shorts",
    regionCode: "KR",
    type: "video",
    videoDuration: "short",
    videoSyndicated: "true",
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

  let apiResult = await reqProm(option);

  for (var i = 0; i < option.qs.maxResults; i++) {
    idResult.push(apiResult.items[i].id.videoId);
    titleResult.push(apiResult.items[i].snippet.title);
    thumbnailsResult.push(apiResult.items[i].snippet.thumbnails.high.url);
  }
  console.log("idResult");
  console.log(idResult);

  console.log("titleResult");
  console.log(titleResult);

  console.log("thumbnailsResult");
  console.log(thumbnailsResult);

  res.status(200).json({
    idResult,
    titleResult,
    thumbnailsResult
  });
});

export default router;
