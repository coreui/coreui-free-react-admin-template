import React from "react";
import { Container, Row, Col } from "reactstrap";
import FooterList from "./FooterList";
import logoMob from "../../../../assets/img/home/logoMob.png";
const Footer = () => {
  const listItems = [
    {
      title: "About Us",
      items: ["Our Profile", "Jobs", "Press", "Blog", "Charter"],
    },
    {
      title: "About Us",
      items: ["Our Profile", "Jobs", "Press", "Blog", "Charter"],
    },
    {
      title: "About Us",
      items: ["Our Profile", "Jobs", "Press", "Blog", "Charter"],
    },
    {
      title: "About Us",
      items: ["Our Profile", "Jobs", "Press", "Blog", "Charter"],
    },
  ];

  return (
    <Container>
      <Row
        className="justify-content-center p-5"
        style={{ background: "#1a2c37" }}
      >
        <Col md="3" xs="8" className="text-center">
          <img src={logoMob} style={{ width: 75, height: "auto" }} alt="logo" />
        </Col>
        {listItems.map((l, index) => (
          <FooterList
            className="mt-3"
            key={index}
            title={l.title}
            listItems={l.items}
          />
        ))}
      </Row>
      <Row
        className="justify-content-center p-1"
        style={{ background: "#152630" }}
      >
        <p className="text-muted mb-0 p-1">
          RedLedger © Copyright 2020 | All Rights Reserved
        </p>
      </Row>
    </Container>
  );
};
export default Footer;
