import React, { useState } from "react";
import {
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row
} from "reactstrap";

function ButtonDropdowns() {
  const [dropdownOpen, setDropdownOpen] = useState(new Array(19).fill(false));

  function toggle(i) {
    const newArray = dropdownOpen.map((element, index) => {
      return index === i ? !element : false;
    });
    setDropdownOpen(newArray);
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify" />
              <strong>Button Dropdown</strong>
              <div className="card-header-actions">
                <a
                  href="https://reactstrap.github.io/components/button-dropdown/"
                  rel="noreferrer noopener"
                  target="_blank"
                  className="card-header-action"
                >
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <ButtonDropdown
                isOpen={dropdownOpen[0]}
                toggle={() => {
                  toggle(0);
                }}
              >
                <DropdownToggle caret>Button Dropdown</DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action Disabled</DropdownItem>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify" />
              <strong>Single button dropdowns</strong>
            </CardHeader>
            <CardBody>
              <ButtonDropdown
                className="mr-1"
                isOpen={dropdownOpen[1]}
                toggle={() => {
                  toggle(1);
                }}
              >
                <DropdownToggle caret color="primary">
                  Primary
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action Disabled</DropdownItem>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
              <ButtonDropdown
                className="mr-1"
                isOpen={dropdownOpen[2]}
                toggle={() => {
                  toggle(2);
                }}
              >
                <DropdownToggle caret color="secondary">
                  Secondary
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action Disabled</DropdownItem>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
              <ButtonDropdown
                className="mr-1"
                isOpen={dropdownOpen[3]}
                toggle={() => {
                  toggle(3);
                }}
              >
                <DropdownToggle caret color="success">
                  Success
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action Disabled</DropdownItem>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
              <ButtonDropdown
                className="mr-1"
                isOpen={dropdownOpen[4]}
                toggle={() => {
                  toggle(4);
                }}
              >
                <DropdownToggle caret color="info">
                  Info
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action Disabled</DropdownItem>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
              <ButtonDropdown
                className="mr-1"
                isOpen={dropdownOpen[5]}
                toggle={() => {
                  toggle(5);
                }}
              >
                <DropdownToggle caret color="warning">
                  Warning
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action Disabled</DropdownItem>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
              <ButtonDropdown
                className="mr-1"
                isOpen={dropdownOpen[6]}
                toggle={() => {
                  toggle(6);
                }}
              >
                <DropdownToggle caret color="danger">
                  Danger
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action Disabled</DropdownItem>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify" />
              <strong>Split button dropdowns</strong>
            </CardHeader>
            <CardBody>
              <ButtonDropdown
                className="mr-1"
                isOpen={dropdownOpen[7]}
                toggle={() => {
                  toggle(7);
                }}
              >
                <Button id="caret" color="primary">
                  Primary
                </Button>
                <DropdownToggle caret color="primary" />
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action Disabled</DropdownItem>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
              <ButtonDropdown
                className="mr-1"
                isOpen={dropdownOpen[8]}
                toggle={() => {
                  toggle(8);
                }}
              >
                <Button id="caret" color="secondary">
                  Secondary
                </Button>
                <DropdownToggle caret color="secondary" />
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action Disabled</DropdownItem>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
              <ButtonDropdown
                className="mr-1"
                isOpen={dropdownOpen[9]}
                toggle={() => {
                  toggle(9);
                }}
              >
                <Button id="caret" color="success">
                  Success
                </Button>
                <DropdownToggle caret color="success" />
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action Disabled</DropdownItem>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
              <ButtonDropdown
                className="mr-1"
                isOpen={dropdownOpen[10]}
                toggle={() => {
                  toggle(10);
                }}
              >
                <Button id="caret" color="info">
                  Info
                </Button>
                <DropdownToggle caret color="info" />
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action Disabled</DropdownItem>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
              <ButtonDropdown
                className="mr-1"
                isOpen={dropdownOpen[11]}
                toggle={() => {
                  toggle(11);
                }}
              >
                <Button id="caret" color="warning">
                  Warning
                </Button>
                <DropdownToggle caret color="warning" />
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action Disabled</DropdownItem>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
              <ButtonDropdown
                className="mr-1"
                isOpen={dropdownOpen[12]}
                toggle={() => {
                  toggle(12);
                }}
              >
                <Button id="caret" color="danger">
                  Danger
                </Button>
                <DropdownToggle caret color="danger" />
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action Disabled</DropdownItem>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify" />
              <strong>Dropdown directions</strong>
            </CardHeader>
            <CardBody>
              <ButtonDropdown
                direction="up"
                className="mr-1"
                isOpen={dropdownOpen[13]}
                toggle={() => {
                  toggle(13);
                }}
              >
                <DropdownToggle caret size="lg">
                  Direction Up
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action Disabled</DropdownItem>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
              <ButtonDropdown
                direction="left"
                className="mr-1"
                isOpen={dropdownOpen[14]}
                toggle={() => {
                  toggle(14);
                }}
              >
                <DropdownToggle caret size="lg">
                  Direction Left
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action Disabled</DropdownItem>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
              <ButtonDropdown
                direction="right"
                className="mr-1"
                isOpen={dropdownOpen[15]}
                toggle={() => {
                  toggle(15);
                }}
              >
                <DropdownToggle caret size="lg">
                  Direction Right
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action Disabled</DropdownItem>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
              <ButtonDropdown
                className="mr-1"
                isOpen={dropdownOpen[16]}
                toggle={() => {
                  toggle(16);
                }}
              >
                <DropdownToggle caret size="lg">
                  Default Down
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action Disabled</DropdownItem>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify" />
              <strong>Button Dropdown sizing</strong>
            </CardHeader>
            <CardBody>
              <ButtonDropdown
                className="mr-1"
                isOpen={dropdownOpen[17]}
                toggle={() => {
                  toggle(17);
                }}
              >
                <DropdownToggle caret size="lg">
                  Large Button
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action Disabled</DropdownItem>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
              <ButtonDropdown
                isOpen={dropdownOpen[18]}
                toggle={() => {
                  toggle(18);
                }}
              >
                <DropdownToggle caret size="sm">
                  Small Button
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action Disabled</DropdownItem>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default ButtonDropdowns;
