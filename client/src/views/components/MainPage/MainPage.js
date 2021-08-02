import React, { useEffect, useState } from "react";
import { Col, Card, Row } from "antd";
import axios from "axios";
import Meta from "antd/lib/card/Meta";

function MainPage() {
  const [shortVideoid, setshortVideoid] = useState([]);
  const [shortVideotitle, setshortVideotitle] = useState([]);
  const [shortVideothum, setshortVideothum] = useState([]);

  const [Limit, setLimit] = useState(8);

  useEffect(() => {
    getData();
  }, [Limit]);

  const getData = () => {
    axios
      .get("http://localhost:5000/")
      .then(response => {
        if (response.data) {
          setshortVideoid(response.data.idResult);
          setshortVideotitle(response.data.titleResult);
          setshortVideothum(response.data.thumbnailsResult);

          console.log("123tett", shortVideoid);
        } else {
          alert("데이터를 가져오는데 실패 했습니다.");
        }
      })
      .catch(err => alert("whats error", err));
  };

  const videoCards =
    shortVideoid &&
    shortVideoid.map((videos, index) => {
      return (
        <Col lg={6} md={8} xs={24} key={index}>
          <Card
            cover={
              <img
                style={{ width: "100%", maxHeight: "200px" }}
                src={shortVideothum[index]}
              />
            }
          >
            <Meta title={shortVideotitle[index]} />
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
