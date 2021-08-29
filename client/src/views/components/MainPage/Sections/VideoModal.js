import "react-modal-video/scss/modal-video.scss";

import React, { useState } from "react";
import ModalVideo from "react-modal-video";

function VideoModal(props) {
  const [isOpen, setOpen] = useState(false);

  return (
    <div>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId={props.videoId}
        onClose={() => setOpen(false)}
      />
      <button onClick={() => setOpen(true)}>{props.title} </button>
    </div>
  );
}

export default VideoModal;
