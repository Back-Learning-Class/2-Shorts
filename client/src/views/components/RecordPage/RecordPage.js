import React from "react";
import { Card, Col, Row } from "antd";
import { withRouter } from "react-router-dom";

function RecordPage() {
  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default withRouter(RecordPage);
