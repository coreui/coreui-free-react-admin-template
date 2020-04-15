import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';

class ReactPlayground extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <div className="clearfix">
                <h1 className="float-left display-3 mr-4">ReactPlayground</h1>
                <h4 className="pt-3">Work hard and play hard</h4>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ReactPlayground;
