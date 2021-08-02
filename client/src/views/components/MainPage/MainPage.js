import React, { useEffect, useState } from "react";
import { Col, Card, Row } from "antd";
import axios from "axios";
import Meta from "antd/lib/card/Meta";

function MainPage() {
  const [shortVideo, setshortVideo] = useState([]);
  const [Limit, setLimit] = useState(8);

  useEffect(() => {
    let body = {
      limit: Limit
    };
    getVideos(body);
  }, []);

  const getVideos = body => {
    axios.post("/", body).then(response => {
      if (response.data.success) {
        setshortVideo(response.data.info);
      } else {
        alert("동영상을 가져오는데 실패했습니다.");
      }
    });
  };

  const videoCards = shortVideo.map((videos, index) => {
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card cover={<a>{videos}</a>}>
          <p>Test</p>
        </Card>
      </Col>
    );
  });

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <Row gutter={[16, 16]}>{videoCards}</Row>
    </div>
  );
}

export default MainPage;
