import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

class Buttons extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <strong>Standard Buttons</strong>
          </CardHeader>
          <CardBody>
            <Row className="d-flex justify-content-between align-items-center">
              <Col>
                <p>Normal</p>
              </Col>
              <Col>
                <Button block color="primary" type="button">Primary</Button>
              </Col>
              <Col>
                <Button block color="secondary" type="button">Secondary</Button>
              </Col>
              <Col>
                <Button block color="success" type="button">Success</Button>
              </Col>
              <Col>
                <Button block color="warning" type="button">Warning</Button>
              </Col>
              <Col>
                <Button block color="danger" type="button">Danger</Button>
              </Col>
              <Col>
                <Button block color="info" type="button">Info</Button>
              </Col>
              <Col>
                <Button block color="light" type="button">Light</Button>
              </Col>
              <Col>
                <Button block color="dark" type="button">Dark</Button>
              </Col>
              <Col>
                <Button block color="link" type="button">Link</Button>
              </Col>
            </Row>
            <Row className="align-items-center mt-3">
              <Col>
                Active State
              </Col>
              <Col>
                <Button active block color="primary" type="button" aria-pressed="true">Primary</Button>
              </Col>
              <Col>
                <Button active block color="secondary" type="button" aria-pressed="true">Secondary</Button>
              </Col>
              <Col>
                <Button active block color="success" type="button" aria-pressed="true">Success</Button>
              </Col>
              <Col>
                <Button active block color="warning" type="button" aria-pressed="true">Warning</Button>
              </Col>
              <Col>
                <Button active block color="danger" type="button" aria-pressed="true">Danger</Button>
              </Col>
              <Col>
                <Button active block color="info" type="button" aria-pressed="true">Info</Button>
              </Col>
              <Col>
                <Button active block color="light" type="button" aria-pressed="true">Light</Button>
              </Col>
              <Col>
                <Button active block color="dark" type="button" aria-pressed="true">Dark</Button>
              </Col>
              <Col>
                <Button active block color="link" type="button" aria-pressed="true">Link</Button>
              </Col>
            </Row>
            <Row className="align-items-center mt-3">
              <Col>
                Disabled
              </Col>
              <Col>
                <Button block color="primary" type="button" disabled>Primary</Button>
              </Col>
              <Col>
                <Button block color="secondary" type="button" disabled>Secondary</Button>
              </Col>
              <Col>
                <Button block color="success" type="button" disabled>Success</Button>
              </Col>
              <Col>
                <Button block color="warning" type="button" disabled>Warning</Button>
              </Col>
              <Col>
                <Button block color="danger" type="button" disabled>Danger</Button>
              </Col>
              <Col>
                <Button block color="info" type="button" disabled>Info</Button>
              </Col>
              <Col>
                <Button block color="light" type="button" disabled>Light</Button>
              </Col>
              <Col>
                <Button block color="dark" type="button" disabled>Dark</Button>
              </Col>
              <Col>
                <Button block color="link" type="button" disabled>Link</Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <strong>Outline Buttons</strong>
          </CardHeader>
          <CardBody>
            <p>
              Use <code>.btn-outline-*</code> class for outline buttons.
            </p>
            <Row className="align-items-center">
              <Col className="col">
                Normal
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-outline-primary">Primary</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-outline-secondary">Secondary</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-outline-success">Success</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-outline-warning">Warning</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-outline-danger">Danger</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-outline-info">Info</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-outline-light">Light</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-outline-dark">Dark</button>
              </Col>
              <Col></Col>
            </Row>
            <Row className="row align-items-center mt-3">
              <Col className="col">
                Active State
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-outline-primary active" aria-pressed="true">Primary</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-outline-secondary active" aria-pressed="true">Secondary</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-outline-success active" aria-pressed="true">Success</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-outline-warning active" aria-pressed="true">Warning</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-outline-danger active" aria-pressed="true">Danger</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-outline-info active" aria-pressed="true">Info</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-outline-light active" aria-pressed="true">Light</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-outline-dark active" aria-pressed="true">Dark</button>
              </Col>
              <Col></Col>
            </Row>
            <Row className="align-items-center mt-3">
              <Col>
                Disabled
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-outline-primary" disabled>Primary</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-outline-secondary" disabled>Secondary</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-outline-success" disabled>Success</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-outline-warning" disabled>Warning</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-outline-danger" disabled>Danger</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-outline-info" disabled>Info</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-outline-light" disabled>Light</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-outline-dark" disabled>Dark</button>
              </Col>
              <Col></Col>
            </Row>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <strong>Ghost Buttons</strong>
          </CardHeader>
          <CardBody>
            <p>
              Use
              <code>.btn-ghost-*</code> class for ghost buttons.
            </p>
            <Row className="align-items-center">
              <Col>
                Normal
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-ghost-primary">Primary</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-ghost-secondary">Secondary</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-ghost-success">Success</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-ghost-warning">Warning</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-ghost-danger">Danger</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-ghost-info">Info</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-ghost-light">Light</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-ghost-dark">Dark</button>
              </Col>
              <Col></Col>
            </Row>
            <Row className="align-items-center mt-3">
              <Col>
                Active State
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-ghost-primary active" aria-pressed="true">Primary</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-ghost-secondary active" aria-pressed="true">Secondary</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-ghost-success active" aria-pressed="true">Success</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-ghost-warning active" aria-pressed="true">Warning</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-ghost-danger active" aria-pressed="true">Danger</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-ghost-info active" aria-pressed="true">Info</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-ghost-light active" aria-pressed="true">Light</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-ghost-dark active" aria-pressed="true">Dark</button>
              </Col>
              <Col></Col>
            </Row>
            <Row className="align-items-center mt-3">
              <Col>
                Disabled
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-ghost-primary" disabled>Primary</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-ghost-secondary" disabled>Secondary</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-ghost-success" disabled>Success</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-ghost-warning" disabled>Warning</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-ghost-danger" disabled>Danger</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-ghost-info" disabled>Info</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-ghost-light" disabled>Light</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-block btn-ghost-dark" disabled>Dark</button>
              </Col>
              <Col></Col>
            </Row>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <strong>Square Buttons</strong>
          </CardHeader>
          <CardBody>
            <p>
              Use
              <code>.btn-square</code> class for square buttons.
            </p>
            <Row className="align-items-center">
              <Col>
                Normal
              </Col>
              <Col>
                <button type="button" className="btn btn-square btn-block btn-primary">Primary</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-square btn-block btn-secondary">Secondary</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-square btn-block btn-success">Success</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-square btn-block btn-warning">Warning</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-square btn-block btn-danger">Danger</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-square btn-block btn-info">Info</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-square btn-block btn-light">Light</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-square btn-block btn-dark">Dark</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-square btn-block btn-link">Link</button>
              </Col>
            </Row>
            <Row className="row align-items-center mt-3">
              <Col>
                Active State
              </Col>
              <Col>
                <button type="button" className="btn btn-square btn-block btn-primary active" aria-pressed="true">Primary</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-square btn-block btn-secondary active" aria-pressed="true">Secondary</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-square btn-block btn-success active" aria-pressed="true">Success</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-square btn-block btn-warning active" aria-pressed="true">Warning</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-square btn-block btn-danger active" aria-pressed="true">Danger</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-square btn-block btn-info active" aria-pressed="true">Info</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-square btn-block btn-light active" aria-pressed="true">Light</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-square btn-block btn-dark active" aria-pressed="true">Dark</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-square btn-block btn-link active" aria-pressed="true">Link</button>
              </Col>
            </Row>
            <Row className="row align-items-center mt-3">
              <Col className="col">
                Disabled
              </Col>
              <Col>
                <button type="button" className="btn btn-square btn-block btn-primary" disabled>Primary</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-square btn-block btn-secondary" disabled>Secondary</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-square btn-block btn-success" disabled>Success</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-square btn-block btn-warning" disabled>Warning</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-square btn-block btn-danger" disabled>Danger</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-square btn-block btn-info" disabled>Info</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-square btn-block btn-light" disabled>Light</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-square btn-block btn-dark" disabled>Dark</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-square btn-block btn-link" disabled>Link</button>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <strong>Pill Buttons</strong>
          </CardHeader>
          <CardBody>
            <p>
              Use
              <code>.btn-pill</code> class for pill buttons.
            </p>
            <Row className="align-items-center">
              <Col>
                Normal
              </Col>
              <Col>
                <button type="button" className="btn btn-pill btn-block btn-primary">Primary</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-pill btn-block btn-secondary">Secondary</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-pill btn-block btn-success">Success</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-pill btn-block btn-warning">Warning</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-pill btn-block btn-danger">Danger</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-pill btn-block btn-info">Info</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-pill btn-block btn-light">Light</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-pill btn-block btn-dark">Dark</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-pill btn-block btn-link">Link</button>
              </Col>
            </Row>
            <Row className="row align-items-center mt-3">
              <Col>
                Active State
              </Col>
              <Col>
                <button type="button" className="btn btn-pill btn-block btn-primary active" aria-pressed="true">Primary</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-pill btn-block btn-secondary active" aria-pressed="true">Secondary</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-pill btn-block btn-success active" aria-pressed="true">Success</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-pill btn-block btn-warning active" aria-pressed="true">Warning</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-pill btn-block btn-danger active" aria-pressed="true">Danger</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-pill btn-block btn-info active" aria-pressed="true">Info</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-pill btn-block btn-light active" aria-pressed="true">Light</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-pill btn-block btn-dark active" aria-pressed="true">Dark</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-pill btn-block btn-link active" aria-pressed="true">Link</button>
              </Col>
            </Row>
            <Row className="row align-items-center mt-3">
              <Col>
                Disabled
              </Col>
              <Col>
                <button type="button" className="btn btn-pill btn-block btn-primary" disabled>Primary</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-pill btn-block btn-secondary" disabled>Secondary</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-pill btn-block btn-success" disabled>Success</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-pill btn-block btn-warning" disabled>Warning</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-pill btn-block btn-danger" disabled>Danger</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-pill btn-block btn-info" disabled>Info</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-pill btn-block btn-light" disabled>Light</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-pill btn-block btn-dark" disabled>Dark</button>
              </Col>
              <Col>
                <button type="button" className="btn btn-pill btn-block btn-link" disabled>Link</button>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <strong>Sizes</strong>
          </CardHeader>
          <CardBody>
            <p>Fancy larger or smaller buttons? Add <code>.btn-lg</code> or <code>.btn-sm</code> for additional sizes.</p>
            <Row className="row align-items-center">
              <Col>
                Small add
                <code>.btn-sm</code>
              </Col>
              <Col className="col text-center">
                <button type="button" className="btn btn-sm btn-primary">Standard Button</button>
              </Col>
              <Col className="col text-center">
                <button type="button" className="btn btn-sm btn-outline-secondary">Outline Button</button>
              </Col>
              <Col className="col text-center">
                <button type="button" className="btn btn-sm btn-ghost-success">Ghost Button</button>
              </Col>
              <Col className="col text-center">
                <button type="button" className="btn btn-sm btn-square btn-warning">Square Button</button>
              </Col>
              <Col className="col text-center">
                <button type="button" className="btn btn-sm btn-pill btn-danger">Pill Button</button>
              </Col>
            </Row>
            <Row className="row align-items-center mt-3">
              <Col className="col">
                Normal
              </Col>
              <Col className="col text-center">
                <button type="button" className="btn btn-primary">Standard Button</button>
              </Col>
              <Col className="col text-center">
                <button type="button" className="btn btn-outline-secondary">Outline Button</button>
              </Col>
              <Col className="col text-center">
                <button type="button" className="btn btn-ghost-success">Ghost Button</button>
              </Col>
              <Col className="col text-center">
                <button type="button" className="btn btn-square btn-warning">Square Button</button>
              </Col>
              <Col className="col text-center">
                <button type="button" className="btn btn-pill btn-danger">Pill Button</button>
              </Col>
            </Row>
            <Row className="row align-items-center mt-3">
              <Col className="col">
                Large add <code>.btn-lg</code>.
              </Col>
              <Col className="col text-center">
                <button type="button" className="btn btn-lg btn-primary">Standard Button</button>
              </Col>
              <Col className="col text-center">
                <button type="button" className="btn btn-lg btn-outline-secondary">Outline Button</button>
              </Col>
              <Col className="col text-center">
                <button type="button" className="btn btn-lg btn-ghost-success">Ghost Button</button>
              </Col>
              <Col className="col text-center">
                <button type="button" className="btn btn-lg btn-square btn-warning">Square Button</button>
              </Col>
              <Col className="col text-center">
                <button type="button" className="btn btn-lg btn-pill btn-danger">Pill Button</button>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <strong>With Icons</strong>
          </CardHeader>
          <CardBody>
            <Row className="align-items-center mt-3">
              <Col className="col text-center">
                <button type="button" className="btn btn-primary">
                  <i className="fa fa-lightbulb-o"></i>&nbsp;Standard Button
                </button>
              </Col>
              <Col className="col text-center">
                <button type="button" className="btn btn-outline-secondary">
                  <i className="fa fa-lightbulb-o"></i>&nbsp;Outline Button
                </button>
              </Col>
              <Col className="col text-center">
                <button type="button" className="btn btn-ghost-success">
                  <i className="fa fa-lightbulb-o"></i>&nbsp;Ghost Button
                </button>
              </Col>
              <Col className="col text-center">
                <button type="button" className="btn btn-square btn-warning">
                  <i className="fa fa-lightbulb-o"></i>&nbsp;Square Button
                </button>
              </Col>
              <Col className="col text-center">
                <button type="button" className="btn btn-pill btn-danger">
                  <i className="fa fa-lightbulb-o"></i>&nbsp;Pill Button
                </button>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Row>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <strong>Options</strong>
              </CardHeader>
              <CardBody>
                <Button color="primary" className="mr-1">Primary</Button>
                <Button color="secondary" className="mr-1">Secondary</Button>
                <Button color="success" className="mr-1">Success</Button>
                <Button color="warning">Warning</Button>{' '}
                <Button color="danger">Danger</Button>{' '}
                <Button color="link">Link</Button>{' '}
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <strong>With Icons</strong>
              </CardHeader>
              <CardBody>
                <Button color="primary" className="mr-1"><i className="fa fa-star"></i>{'\u00A0'} Primary</Button>
                <Button color="secondary" className="mr-1"><i className="fa fa-lightbulb-o"></i>{'\u00A0 Secondary'}</Button>
                <Button color="success" className="mr-1"><i className="fa fa-magic"></i>&nbsp; Success</Button>
                <Button color="warning"><i className="fa fa-map-marker"></i>&nbsp; Warning</Button>{' '}
                <Button color="danger"><i className="fa fa-rss"></i>&nbsp; Danger</Button>{' '}
                <Button color="link"><i className="fa fa-link"></i>&nbsp; Link</Button>{' '}
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <strong>Size Large</strong>
              </CardHeader>
              <CardBody>
                <p>Add this class <code>.btn-lg</code></p>
                <Button color="primary" size="lg">Primary</Button>
                <Button color="secondary" size="lg">Secondary</Button>
                <Button color="success" size="lg">Success</Button>
                <Button color="info" size="lg">Info</Button>
                <Button color="warning" size="lg">Warning</Button>
                <Button color="danger" size="lg">Danger</Button>
                <Button color="link" size="lg">Link</Button>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <strong>Size Small</strong>
              </CardHeader>
              <CardBody>
                <p>Add class <code>.btn-sm</code></p>
                <Button color="primary" size="sm">Primary</Button>
                <Button color="secondary" size="sm">Secondary</Button>
                <Button color="success" size="sm">Success</Button>
                <Button color="info" size="sm">Info</Button>
                <Button color="warning" size="sm">Warning</Button>
                <Button color="danger" size="sm">Danger</Button>
                <Button color="link" size="sm">Link</Button>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <strong>Disabled state</strong>
              </CardHeader>
              <CardBody>
                <p>Add <code>disabled="disabled"</code></p>
                <Button color="primary" disabled>Primary</Button>
                <Button color="secondary" disabled>Secondary</Button>
                <Button color="success" disabled>Success</Button>
                <Button color="info" disabled>Info</Button>
                <Button color="warning" disabled>Warning</Button>
                <Button color="danger" disabled>Danger</Button>
                <Button color="link" disabled>Link</Button>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <strong>Active state</strong>
              </CardHeader>
              <CardBody>
                <p>Add class <code>.active</code></p>
                <Button color="primary" active>Primary</Button>
                <Button color="secondary" active>Secondary</Button>
                <Button color="success" active>Success</Button>
                <Button color="info" active>Info</Button>
                <Button color="warning" active>Warning</Button>
                <Button color="danger" active>Danger</Button>
                <Button color="link" active>Link</Button>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <strong>Block Level Buttons</strong>
              </CardHeader>
              <CardBody>
                <p>Add class <code>.btn-block</code></p>
                <Button color="secondary" size="lg" block>Block level button</Button>
                <Button color="primary" size="lg" block>Block level button</Button>
                <Button color="success" size="lg" block>Block level button</Button>
                <Button color="info" size="lg" block>Block level button</Button>
                <Button color="warning" size="lg" block>Block level button</Button>
                <Button color="danger" size="lg" block>Block level button</Button>
                <Button color="link" size="lg" block>Block level button</Button>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <strong>Options</strong>
              </CardHeader>
              <CardBody>
                <Button outline color="primary">Primary</Button>
                <Button outline color="secondary">Secondary</Button>
                <Button outline color="success">Success</Button>
                <Button outline color="warning">Warning</Button>
                <Button outline color="danger">Danger</Button>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <strong>With Icons</strong>
              </CardHeader>
              <CardBody>
                <Button outline color="primary"><i className="fa fa-star"></i>&nbsp; Primary</Button>
                <Button outline color="secondary"><i className="fa fa-lightbulb-o"></i>&nbsp; Secondary</Button>
                <Button outline color="success"><i className="fa fa-magic"></i>&nbsp; Success</Button>
                <Button outline color="warning"><i className="fa fa-map-marker"></i>&nbsp; Warning</Button>
                <Button outline color="danger"><i className="fa fa-rss"></i>&nbsp; Danger</Button>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <strong>Size Large</strong>
              </CardHeader>
              <CardBody>
                <p>Add class <code>.btn-lg</code></p>
                <Button outline color="primary" size="lg">Primary</Button>
                <Button outline color="secondary" size="lg">Secondary</Button>
                <Button outline color="success" size="lg">Success</Button>
                <Button outline color="info" size="lg">Info</Button>
                <Button outline color="warning" size="lg">Warning</Button>
                <Button outline color="danger" size="lg">Danger</Button>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <strong>Size Small</strong>
              </CardHeader>
              <CardBody>
                <p>Add class <code>.btn-sm</code></p>
                <Button outline color="primary" size="sm">Primary</Button>
                <Button outline color="secondary" size="sm">Secondary</Button>
                <Button outline color="success" size="sm">Success</Button>
                <Button outline color="info" size="sm">Info</Button>
                <Button outline color="warning" size="sm">Warning</Button>
                <Button outline color="danger" size="sm">Danger</Button>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <strong>Disabled state</strong>
              </CardHeader>
              <CardBody>
                <p>Add <code>disabled="disabled"</code></p>
                <Button outline color="primary" disabled>Primary</Button>
                <Button outline color="secondary" disabled>Secondary</Button>
                <Button color="success" disabled>Success</Button>
                <Button outline color="info" disabled>Info</Button>
                <Button outline color="warning" disabled>Warning</Button>
                <Button outline color="danger" disabled>Danger</Button>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <strong>Active state</strong>
              </CardHeader>
              <CardBody>
                <p>Add class <code>.active</code></p>
                <Button outline color="primary" active>Primary</Button>
                <Button outline color="secondary" active>Secondary</Button>
                <Button outline color="success" active>Success</Button>
                <Button outline color="info" active>Info</Button>
                <Button outline color="warning" active>Warning</Button>
                <Button outline color="danger" active>Danger</Button>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <strong>Block Level Buttons</strong>
                {/*<small>Add this class <code>.btn-block</code></small>*/}
              </CardHeader>
              <CardBody>
                <p>Add class <code>.btn-block</code></p>
                <Button outline color="secondary" size="lg" block>Block level button</Button>
                <Button outline color="primary" size="lg" block>Block level button</Button>
                <Button outline color="success" size="lg" block>Block level button</Button>
                <Button outline color="info" size="lg" block>Block level button</Button>
                <Button outline color="warning" size="lg" block>Block level button</Button>
                <Button outline color="danger" size="lg" block>Block level button</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Buttons;
