import React from "react";
import { Col } from "reactstrap";

const Stat = ({ title, text }) => {
  return (
    <Col xs="5" md="3" className="mb-2">
      <div>
        <div className="post__center">
          <h5 className="font-weight-bold">{title}</h5>
          <p className=" font-weight-light text-muted">{text}</p>
        </div>
      </div>
    </Col>
  );
};

export default Stat;
