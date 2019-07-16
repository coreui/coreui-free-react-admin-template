import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown
} from "reactstrap";

function Dropdowns() {
  const [dropdownOpen, setDropdownOpen] = useState(new Array(6).fill(false));

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
              <strong>Dropdowns</strong>
              <div className="card-header-actions">
                <a
                  href="https://reactstrap.github.io/components/dropdowns/"
                  rel="noreferrer noopener"
                  target="_blank"
                  className="card-header-action"
                >
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <Dropdown
                isOpen={dropdownOpen[0]}
                toggle={() => {
                  toggle(0);
                }}
              >
                <DropdownToggle caret>Dropdown</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify" />
              <strong>Dropdowns</strong>
              <small> alignment</small>
            </CardHeader>
            <CardBody>
              <Dropdown
                isOpen={dropdownOpen[1]}
                toggle={() => {
                  toggle(1);
                }}
              >
                <DropdownToggle caret>
                  This dropdown's menu is right-aligned
                </DropdownToggle>
                <DropdownMenu right style={{ right: "auto" }}>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify" />
              <strong>Dropdowns</strong>
              <small> sizing</small>
            </CardHeader>
            <CardBody>
              <Dropdown
                isOpen={dropdownOpen[2]}
                toggle={() => {
                  toggle(2);
                }}
                size="lg"
                className="mb-3"
              >
                <DropdownToggle caret>Large Dropdown</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Dropdown
                isOpen={dropdownOpen[3]}
                toggle={() => {
                  toggle(3);
                }}
                className="mb-3"
              >
                <DropdownToggle caret>Normal Dropdown</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Dropdown
                isOpen={dropdownOpen[4]}
                toggle={() => {
                  toggle(4);
                }}
                size="sm"
              >
                <DropdownToggle caret>Small Dropdown</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify" />
              <strong>Custom Dropdowns</strong>
            </CardHeader>
            <CardBody>
              <Dropdown
                isOpen={dropdownOpen[5]}
                toggle={() => {
                  toggle(5);
                }}
              >
                <DropdownToggle
                  tag="span"
                  onClick={() => {
                    toggle(5);
                  }}
                  data-toggle="dropdown"
                  aria-expanded={dropdownOpen[5]}
                >
                  Custom Dropdown Content <strong> * </strong>
                </DropdownToggle>
                <DropdownMenu>
                  <div
                    className="dropdown-item"
                    onClick={() => {
                      toggle(5);
                    }}
                  >
                    Custom dropdown item 1
                  </div>
                  <div
                    className="dropdown-item"
                    onClick={() => {
                      toggle(5);
                    }}
                  >
                    Custom dropdown item 2
                  </div>
                  <div
                    className="dropdown-item-text"
                    onClick={() => {
                      toggle(5);
                    }}
                  >
                    Custom dropdown text 3
                  </div>
                  <hr className="my-0 dropdown-item-text" />
                  <div
                    onClick={() => {
                      toggle(5);
                    }}
                  >
                    Custom dropdown item 4
                  </div>
                </DropdownMenu>
              </Dropdown>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify" />
              <strong>Uncontrolled Dropdown</strong>
            </CardHeader>
            <CardBody>
              <UncontrolledDropdown>
                <DropdownToggle caret>Uncontrolled Dropdown</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dropdowns;
