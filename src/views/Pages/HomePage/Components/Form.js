import React from 'react';
import { Container, Col, Row, Input, Button } from 'reactstrap';

const Form = () => {
  return (
    <Container className="form__style  py-3">
      <Row className="justify-content-center py-5">
        <Col md="8" xs="12">
          <h3
            className="text-center font-weight-bold"
            style={{ color: 'white' }}
          >
            Join 504 investors who funded 365 startups with over $129.5 million
          </h3>
          <h5
            className="text-center"
            style={{ color: 'white', textDecoration: 'underline' }}
          >
            View Reg D,A+ and Reg CF Breakdown
          </h5>
        </Col>
      </Row>
      <Row className="my-3 justify-content-center">
        <Col xs="8" md="6" className="text-center">
          <Input className="py-4 mb-3" type="text" placeholder="Email" />
          <Input className="py-4 mb-3" type="password" placeholder="Password" />
          <Button outline className="secondary__block__button">
            Submit
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Form;
