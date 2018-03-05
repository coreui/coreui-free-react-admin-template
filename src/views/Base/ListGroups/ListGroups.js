import React, {Component} from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
  Badge
} from 'reactstrap';

class ListGroups extends Component {

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="12" xl="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>List Group</strong>
                <div className="card-actions">
                  <a href="https://reactstrap.github.io/components/listgroup/" target="_blank">
                    <small className="text-muted">docs</small>
                  </a>
                </div>
              </CardHeader>
              <CardBody>
                <ListGroup>
                  <ListGroupItem>Cras justo odio</ListGroupItem>
                  <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                  <ListGroupItem>Morbi leo risus</ListGroupItem>
                  <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
                  <ListGroupItem>Vestibulum at eros</ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" xl="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>List Group</strong>
                <small> tags</small>
              </CardHeader>
              <CardBody>
                <ListGroup>
                  <ListGroupItem className="justify-content-between">Cras justo odio <Badge className="float-right" pill>14</Badge></ListGroupItem>
                  <ListGroupItem className="justify-content-between">Dapibus ac facilisis in <Badge className="float-right" pill>2</Badge></ListGroupItem>
                  <ListGroupItem className="justify-content-between">Morbi leo risus <Badge className="float-right" pill color="warning">1</Badge></ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col sm="12" xl="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>List Group</strong>
                <small> disabled items</small>
              </CardHeader>
              <CardBody>
                <ListGroup>
                  <ListGroupItem disabled tag="a" href="#">Cras justo odio</ListGroupItem>
                  <ListGroupItem tag="a" href="#">Dapibus ac facilisis in</ListGroupItem>
                  <ListGroupItem disabled tag="a" href="#">Morbi leo risus</ListGroupItem>
                  <ListGroupItem tag="a" href="#">Porta ac consectetur ac</ListGroupItem>
                  <ListGroupItem tag="a" href="#">Vestibulum at eros</ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" xl="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>List Group</strong>
                <small> contextual classes</small>
              </CardHeader>
              <CardBody>
                <ListGroup>
                  <ListGroupItem action color="success">Cras justo odio</ListGroupItem>
                  <ListGroupItem action color="info">Dapibus ac facilisis in</ListGroupItem>
                  <ListGroupItem action color="warning">Morbi leo risus</ListGroupItem>
                  <ListGroupItem action color="danger">Porta ac consectetur ac</ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col sm="12" xl="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>List Group</strong>
                <small> anchors</small>
              </CardHeader>
              <CardBody>
                <p>Be sure to <strong>not use the standard <code>.btn</code> classes here</strong>.</p>
                <ListGroup>
                  <ListGroupItem active tag="a" href="#" action>Cras justo odio</ListGroupItem>
                  <ListGroupItem tag="a" href="#" action>Dapibus ac facilisis in</ListGroupItem>
                  <ListGroupItem tag="a" href="#" action>Morbi leo risus</ListGroupItem>
                  <ListGroupItem tag="a" href="#" action>Porta ac consectetur ac</ListGroupItem>
                  <ListGroupItem disabled tag="a" href="#" action>Vestibulum at eros</ListGroupItem>
                </ListGroup>
                <p/>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" xl="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>List Group</strong>
                <small> buttons</small>
              </CardHeader>
              <CardBody>
                <ListGroup>
                  <ListGroupItem active tag="button" action>Cras justo odio</ListGroupItem>
                  <ListGroupItem tag="button" action>Dapibus ac facilisis in</ListGroupItem>
                  <ListGroupItem tag="button" action>Morbi leo risus</ListGroupItem>
                  <ListGroupItem tag="button" action>Porta ac consectetur ac</ListGroupItem>
                  <ListGroupItem disabled tag="button" action>Vestibulum at eros</ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col sm="12" xl="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>List Group</strong>
                <small> custom content</small>
              </CardHeader>
              <CardBody>
                <ListGroup>
                  <ListGroupItem active action>
                    <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
                    <ListGroupItemText>
                      Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
                    </ListGroupItemText>
                  </ListGroupItem>
                  <ListGroupItem action>
                    <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
                    <ListGroupItemText>
                      Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
                    </ListGroupItemText>
                  </ListGroupItem>
                  <ListGroupItem action>
                    <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
                    <ListGroupItemText>
                      Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
                    </ListGroupItemText>
                  </ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ListGroups;