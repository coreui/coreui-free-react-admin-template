import React from "react";
import { Col, Progress, Row } from "reactstrap";

const Post = ({ image }) => {
  return (
    <Col xs="12" md="4" className="mb-2">
      <div className="post__style">
        <img src={image} alt="post 1" className="post__image__style" />
        <div className="post__center">
          <h5>Why you may want to</h5>
          <p className=" font-weight-light text-muted">
            The world's only camera designed for live streaming events
          </p>
          <Progress value="75" color="danger" style={{ height: 7 }} />
          <Row className="py-3">
            <Col md="4" xs="5">
              <p className="font-weight-bold pb-0 mb-0">$10M</p>
              <p className="font-weight-light text-muted  pb-0 mb-0">Rated</p>
            </Col>
            <div
              style={{ borderLeft: "1px solid lightgrey", height: 30 }}
            ></div>
            <Col md="4" xs="5">
              <p className="font-weight-bold pb-0 mb-0">$10M</p>
              <p className="font-weight-light text-muted  pb-0 mb-0">Rated</p>
            </Col>
          </Row>
        </div>
      </div>
    </Col>
  );
};
export default Post;
