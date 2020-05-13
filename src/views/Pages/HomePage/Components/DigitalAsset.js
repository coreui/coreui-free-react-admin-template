import React from "react";
import { Col } from "reactstrap";
const DigitalAsset = ({ image, title, text }) => {
  return (
    <Col xs="12" md="4" className="mb-2">
      <div>
        <img
          src={image}
          alt="digital asset 1"
          className="digital__image__style"
        />
        <div className="post__center">
          <h4 className="font-weight-bold">{title}</h4>
          <p className=" font-weight-light text-muted">{text}</p>
        </div>
      </div>
    </Col>
  );
};

export default DigitalAsset;
