import React from "react";
import { Container, Row, Button } from "reactstrap";
import DigitalAsset from "./DigitalAsset";
import Image1 from "../../../../assets/img/home/Image-1.png";
import Image2 from "../../../../assets/img/home/Image-2.png";
import Image3 from "../../../../assets/img/home/Image-3.png";
const AboutComponent = () => {
  return (
    <Container className="my-5">
      <Row className="justify-content-center mb-5">
        <h3>"What is digital assets?"</h3>
      </Row>
      <Row className="text-center mb-3">
        <DigitalAsset
          image={Image1}
          title="Efficieny"
          text="Decentralized financing,save time & money"
        />
        <DigitalAsset
          image={Image2}
          title="Complaince"
          text="Decentralized financing,save time & money"
        />
        <DigitalAsset
          image={Image3}
          title="Liquidity"
          text="Decentralized financing,save time & money"
        />
      </Row>
      <div className="text-center mb-5">
        <Button outline className="primary__block__button">
          View More
        </Button>
      </div>
      <hr />
    </Container>
  );
};

export default AboutComponent;
