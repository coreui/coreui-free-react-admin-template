import React, {Component} from 'react';
import {Row, Col, Card, CardHeader, CardBody, CardFooter, Breadcrumb, BreadcrumbItem } from 'reactstrap';

class Breadcrumbs extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Breadcrumbs</strong>
                <div className="card-actions">
                  <a href="https://reactstrap.github.io/components/breadcrumbs/" target="_blank">
                    <small className="text-muted">docs</small>
                  </a>
                </div>
              </CardHeader>
              <CardBody>
                <Breadcrumb>
                  <BreadcrumbItem active>Home</BreadcrumbItem>
                </Breadcrumb>
                <Breadcrumb>
                  <BreadcrumbItem><a href="#">Home</a></BreadcrumbItem>
                  <BreadcrumbItem active>Library</BreadcrumbItem>
                </Breadcrumb>
                <Breadcrumb>
                  <BreadcrumbItem><a href="#">Home</a></BreadcrumbItem>
                  <BreadcrumbItem><a href="#">Library</a></BreadcrumbItem>
                  <BreadcrumbItem active>Data</BreadcrumbItem>
                </Breadcrumb>
                <Breadcrumb tag="nav">
                  <BreadcrumbItem tag="a" href="#">Home</BreadcrumbItem>
                  <BreadcrumbItem tag="a" href="#">Library</BreadcrumbItem>
                  <BreadcrumbItem tag="a" href="#">Data</BreadcrumbItem>
                  <BreadcrumbItem active tag="span">Bootstrap</BreadcrumbItem>
                </Breadcrumb>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Breadcrumbs;