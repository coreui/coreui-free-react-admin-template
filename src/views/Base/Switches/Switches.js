import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Input, Label, Row, Table } from 'reactstrap';

class Switches extends Component {
  render() {
    return (
      <div className="animated fadeIn">

        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                3d Switch
              </CardHeader>
              <CardBody>
                <Label className="switch switch-3d switch-primary">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-3d switch-secondary">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-3d switch-success">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-3d switch-warning">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-3d switch-info">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-3d switch-danger">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                Switch default
              </CardHeader>
              <CardBody>
                <Label className="switch switch-default switch-primary">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-default switch-secondary">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-default switch-success">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-default switch-warning">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-default switch-info">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-default switch-danger">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                Switch default - pills
              </CardHeader>
              <CardBody>
                <Label className="switch switch-default switch-pill switch-primary">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-default switch-pill switch-secondary">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-default switch-pill switch-success">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-default switch-pill switch-warning">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-default switch-pill switch-info">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-default switch-pill switch-danger">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                Switch outline
              </CardHeader>
              <CardBody>
                <Label className="switch switch-default switch-primary-outline">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-default switch-secondary-outline">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-default switch-success-outline">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-default switch-warning-outline">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-default switch-info-outline">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-default switch-danger-outline">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                Switch outline - pills
              </CardHeader>
              <CardBody>
                <Label className="switch switch-default switch-pill switch-primary-outline">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-default switch-pill switch-secondary-outline">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-default switch-pill switch-success-outline">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-default switch-pill switch-warning-outline">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-default switch-pill switch-info-outline">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-default switch-pill switch-danger-outline">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                Switch outline alternative
              </CardHeader>
              <CardBody>
                <Label className="switch switch-default switch-primary-outline-alt">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-default switch-secondary-outline-alt">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-default switch-success-outline-alt">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-default switch-warning-outline-alt">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-default switch-info-outline-alt">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-default switch-danger-outline-alt">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                Switch outline alternative - pills
              </CardHeader>
              <CardBody>
                <Label className="switch switch-default switch-pill switch-primary-outline-alt">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-default switch-pill switch-secondary-outline-alt">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-default switch-pill switch-success-outline-alt">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-default switch-pill switch-warning-outline-alt">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-default switch-pill switch-info-outline-alt">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-default switch-pill switch-danger-outline-alt">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
                </Label>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                Switch with text
              </CardHeader>
              <CardBody>
                <Label className="switch switch-text switch-primary">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-text switch-secondary">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-text switch-success">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-text switch-warning">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-text switch-info">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-text switch-danger">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </Label>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                Switch with text - pills
              </CardHeader>
              <CardBody>
                <Label className="switch switch-text switch-pill switch-primary">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-text switch-pill switch-secondary">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-text switch-pill switch-success">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-text switch-pill switch-warning">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-text switch-pill switch-info">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-text switch-pill switch-danger">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </Label>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                Switch with text outline
              </CardHeader>
              <CardBody>

                <Label className="switch switch-text switch-primary-outline">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-text switch-secondary-outline">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-text switch-success-outline">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-text switch-warning-outline">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-text switch-info-outline">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-text switch-danger-outline">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </Label>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                Switch with text outline - pills
              </CardHeader>
              <CardBody>

                <Label className="switch switch-text switch-pill switch-primary-outline">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-text switch-pill switch-secondary-outline">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-text switch-pill switch-success-outline">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-text switch-pill switch-warning-outline">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-text switch-pill switch-info-outline">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-text switch-pill switch-danger-outline">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </Label>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                Switch with text outline alternative
              </CardHeader>
              <CardBody>
                <Label className="switch switch-text switch-primary-outline-alt">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-text switch-secondary-outline-alt">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-text switch-success-outline-alt">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-text switch-warning-outline-alt">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-text switch-info-outline-alt">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-text switch-danger-outline-alt">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </Label>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                Switch with text outline alternative - pills
              </CardHeader>
              <CardBody>
                <Label className="switch switch-text switch-pill switch-primary-outline-alt">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-text switch-pill switch-secondary-outline-alt">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-text switch-pill switch-success-outline-alt">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-text switch-pill switch-warning-outline-alt">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-text switch-pill switch-info-outline-alt">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </Label>
                &nbsp;&nbsp;&nbsp;
                <Label className="switch switch-text switch-pill switch-danger-outline-alt">
                  <Input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </Label>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12">
            <Card>
              <CardHeader>
                Sizes
              </CardHeader>
              <CardBody className="p-0">
                <Table hover striped className="table-align-middle mb-0">
                  <thead>
                  <tr>
                    <th>Size</th>
                    <th>Example</th>
                    <th>CSS Class</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>
                      Large
                    </td>
                    <td>
                      <Label className="switch switch-lg switch-3d switch-primary">
                        <Input type="checkbox" className="switch-input" defaultChecked />
                        <span className="switch-label"></span>
                        <span className="switch-handle"></span>
                      </Label>
                    </td>
                    <td>
                      Add following class <code>.switch-lg</code>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Normal
                    </td>
                    <td>
                      <Label className="switch switch-3d switch-primary">
                        <Input type="checkbox" className="switch-input" defaultChecked />
                        <span className="switch-label"></span>
                        <span className="switch-handle"></span>
                      </Label>
                    </td>
                    <td>
                      -
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Small
                    </td>
                    <td>
                      <Label className="switch switch-sm switch-3d switch-primary">
                        <Input type="checkbox" className="switch-input" defaultChecked />
                        <span className="switch-label"></span>
                        <span className="switch-handle"></span>
                      </Label>
                    </td>
                    <td>
                      Add following class <code>.switch-sm</code>
                    </td>
                  </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>

        </Row>
      </div>

    );
  }
}

export default Switches;
