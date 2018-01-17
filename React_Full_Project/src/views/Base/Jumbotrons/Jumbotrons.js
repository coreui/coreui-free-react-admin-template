import React, {Component} from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Jumbotron, Button, Container
} from 'reactstrap';

class Jumbotrons extends Component {

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i><strong>Jumbotron</strong>
            <div className="card-actions">
              <a href="https://reactstrap.github.io/components/jumbotron/" target="_blank">
                <small className="text-muted">docs</small>
              </a>
            </div>
          </CardHeader>
          <CardBody>
            <Jumbotron>
              <h1 className="display-3">Hello, world!</h1>
              <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra
                attention to featured content or information.</p>
              <hr className="my-2"/>
              <p>It uses utility classes for typgraphy and spacing to space content out within the larger container.</p>
              <p className="lead">
                <Button color="primary">Learn More</Button>
              </p>
            </Jumbotron>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i><strong>Jumbotron</strong><small> fluid</small>
          </CardHeader>
          <CardBody>
            <Jumbotron fluid>
              <Container fluid>
                <h1 className="display-3">Fluid jumbotron</h1>
                <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
              </Container>
            </Jumbotron>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Jumbotrons;