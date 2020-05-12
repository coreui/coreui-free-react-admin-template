import React from 'react';
import { Container, Row } from 'reactstrap';
import Stat from './Stat';

const StatsList = () => {
  return (
    <Container className="my-5">
      <Row className="text-center mb-3 justify-content-center">
        <Stat title="300 Million" text="Raised" />
        <div style={{ borderLeft: '1px solid lightgrey', height: 70 }}></div>
        <Stat title="25 Companies" text="Funded" />
        <div style={{ borderLeft: '1px solid lightgrey', height: 70 }}></div>
        <Stat title="35000" text="Investors" />
        <div style={{ borderLeft: '1px solid lightgrey', height: 70 }}></div>
      </Row>
      <hr />
    </Container>
  );
};
export default StatsList;
