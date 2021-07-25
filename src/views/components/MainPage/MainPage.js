import React from "react";
import { Col, Card, Row } from "antd";
import Meta from "antd/lib/card/Meta";

function MainPage() {
  const videoCards = () => {
    return (
      <Col lg={6} md={8} xs={24}>
        <Card>
          <p>Test</p>
        </Card>
      </Col>
    );
  };

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <Row gutter={[16, 16]}>{videoCards()}</Row>
    </div>
  );
}

export default MainPage;
