import React from 'react';
import { Container, Row } from 'reactstrap';
import Partners from '../assets/imgs/partners.png';
const PartnersList = () => {
  return (
    <Container className="my-5">
      <Row className="justify-content-center  font-weight-bold">
        <h3 className="font-weight-bold ">Partners</h3>
      </Row>
      <img className="w-100" src={Partners} alt="Partners" />
    </Container>
  );
};
export default PartnersList;
