import e from 'express';
import express from 'express';
// express 버전 4.17.1
import reqProm from 'request-promise';
// reqProm 버전 4.2.6

// 서버 세팅 
const app = express();
app.use(express.urlencoded({ extended: false })); // 중첩된 객체표현 허용에 관한 옵션 
                                                    // 객체 안에 객체를 파싱할 수 있게하려면 true.
app.use(express.json())

// server 구성 
var port = 3000; // 사용할 포트 번호를 port 변수에 넣습니다. 
app.listen(port, function(){ // port변수를 이용하여 3000번 포트에 node.js 서버를 연결합니다.
  console.log('server on! http://localhost:' + port); //서버가 실행되면 콘솔창에 표시될 메세지입니다.
});


const KEY = 'AIzaSyA2nJdF6tnRHzzHoJt-AtjbmWnxE_FuPXw'
let option = {
    uri : 'https://www.googleapis.com/youtube/v3/search',
    qs : {
      part : 'snippet', // snippet // id
      eventType : 'completed',
      maxResults : 4,
      order : 'viewCount',
      q : '#shorts',
      regionCode : 'KR',
      type : 'video',
      videoDuration : 'short',
      videoSyndicated : 'true',
      key : KEY
  
    },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
}
  
app.get("/", async (req,res)=>{ 

    let idResult = new Array(); // 동영상의 아이디가 저장되는 Array
    let titleResult = new Array(); // 동영상의 제목이 저장되는 Array
    let thumbnailsResult = new Array(); // 동영상의 썸네일 url 이 저장되는 Array // high 로 픽스 

    let apiResult = await reqProm(option);

    for(var i = 0; i < option.qs.maxResults; i++)
    {
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
    
    res.send({
        idResult : idResult,
        titleResult : titleResult,
        thumbnailsResult : thumbnailsResult
    })
})