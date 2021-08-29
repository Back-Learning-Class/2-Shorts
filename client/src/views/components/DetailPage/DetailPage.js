/*import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import YouTube from "react-youtube";
import axios from "axios";

function detailPage(props) {
  //let [videoId, setVideoId] = useState(""); // 비디오 아이디 입력값

  // 동영상 플레이어 세팅
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    }
  };

  // 동영상 플레이어 클릭 이벤트
  function _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  // 제목
  // 플레이어
  // 댓글 입력 창 + 버튼
  // 댓글
  return (
    <div className="DetailPage" style={{ margin: "70px auto" }}>
      <h1>영상 제목 표시</h1>
      <br />
      <YouTube videoId="2g811Eo7K8U" opts={opts} onReady={_onReady} />
    </div>
  );
}

export default withRouter(detailPage);*/
