import React, {Component} from 'react';
import {Row, Col, Card, CardHeader, CardBody, CardFooter,  ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';

class ButtonDropdowns extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: new Array(16).fill(false)
    };
  }

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => { return (index === i ? !element : false); });
    this.setState({
      dropdownOpen: newArray
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Button Dropdown</strong>
                <div className="card-actions">
                  <a href="https://reactstrap.github.io/components/button-dropdown/" target="_blank">
                    <small className="text-muted">docs</small>
                  </a>
                </div>
              </CardHeader>
              <CardBody>
                <ButtonDropdown isOpen={this.state.dropdownOpen[0]} toggle={() => { this.toggle(0); }}>
                  <DropdownToggle caret>
                    Button Dropdown
                  </DropdownToggle>
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
                <i className="fa fa-align-justify"></i><strong>Single button dropdowns</strong>
              </CardHeader>
              <CardBody>
                <ButtonDropdown className="mr-1" isOpen={this.state.dropdownOpen[1]} toggle={() => { this.toggle(1); }}>
                  <DropdownToggle caret color="primary">
                    Primary
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>Header</DropdownItem>
                    <DropdownItem disabled>Action Disabled</DropdownItem>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem>Another Action</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
                <ButtonDropdown className="mr-1" isOpen={this.state.dropdownOpen[2]} toggle={() => { this.toggle(2); }}>
                  <DropdownToggle caret color="secondary">
                    Secondary
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>Header</DropdownItem>
                    <DropdownItem disabled>Action Disabled</DropdownItem>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem>Another Action</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
                <ButtonDropdown className="mr-1" isOpen={this.state.dropdownOpen[3]} toggle={() => { this.toggle(3); }}>
                  <DropdownToggle caret color="success">
                    Success
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>Header</DropdownItem>
                    <DropdownItem disabled>Action Disabled</DropdownItem>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem>Another Action</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
                <ButtonDropdown className="mr-1" isOpen={this.state.dropdownOpen[4]} toggle={() => { this.toggle(4); }}>
                  <DropdownToggle caret color="info">
                    Info
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>Header</DropdownItem>
                    <DropdownItem disabled>Action Disabled</DropdownItem>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem>Another Action</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
                <ButtonDropdown className="mr-1" isOpen={this.state.dropdownOpen[5]} toggle={() => { this.toggle(5); }}>
                  <DropdownToggle caret color="warning">
                    Warning
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>Header</DropdownItem>
                    <DropdownItem disabled>Action Disabled</DropdownItem>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem>Another Action</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
                <ButtonDropdown className="mr-1" isOpen={this.state.dropdownOpen[6]} toggle={() => { this.toggle(6); }}>
                  <DropdownToggle caret color="danger">
                    Danger
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>Header</DropdownItem>
                    <DropdownItem disabled>Action Disabled</DropdownItem>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem>Another Action</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Split button dropdowns</strong>
              </CardHeader>
              <CardBody>
                <ButtonDropdown className="mr-1" isOpen={this.state.dropdownOpen[7]} toggle={() => { this.toggle(7); }}>
                  <Button id="caret" color="primary">Primary</Button>
                  <DropdownToggle caret color="primary"/>
                  <DropdownMenu>
                    <DropdownItem header>Header</DropdownItem>
                    <DropdownItem disabled>Action Disabled</DropdownItem>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem>Another Action</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
                <ButtonDropdown className="mr-1" isOpen={this.state.dropdownOpen[8]} toggle={() => { this.toggle(8); }}>
                  <Button id="caret" color="secondary">Secondary</Button>
                  <DropdownToggle caret color="secondary"/>
                  <DropdownMenu>
                    <DropdownItem header>Header</DropdownItem>
                    <DropdownItem disabled>Action Disabled</DropdownItem>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem>Another Action</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
                <ButtonDropdown className="mr-1" isOpen={this.state.dropdownOpen[9]} toggle={() => { this.toggle(9); }}>
                  <Button id="caret" color="success">Success</Button>
                  <DropdownToggle caret color="success"/>
                  <DropdownMenu>
                    <DropdownItem header>Header</DropdownItem>
                    <DropdownItem disabled>Action Disabled</DropdownItem>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem>Another Action</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
                <ButtonDropdown className="mr-1" isOpen={this.state.dropdownOpen[10]} toggle={() => { this.toggle(10); }}>
                  <Button id="caret" color="info">Info</Button>
                  <DropdownToggle caret color="info"/>
                  <DropdownMenu>
                    <DropdownItem header>Header</DropdownItem>
                    <DropdownItem disabled>Action Disabled</DropdownItem>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem>Another Action</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
                <ButtonDropdown className="mr-1" isOpen={this.state.dropdownOpen[11]} toggle={() => { this.toggle(11); }}>
                  <Button id="caret" color="warning">Warning</Button>
                  <DropdownToggle caret color="warning"/>
                  <DropdownMenu>
                    <DropdownItem header>Header</DropdownItem>
                    <DropdownItem disabled>Action Disabled</DropdownItem>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem>Another Action</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
                <ButtonDropdown className="mr-1" isOpen={this.state.dropdownOpen[12]} toggle={() => { this.toggle(12); }}>
                  <Button id="caret" color="danger">Danger</Button>
                  <DropdownToggle caret color="danger"/>
                  <DropdownMenu>
                    <DropdownItem header>Header</DropdownItem>
                    <DropdownItem disabled>Action Disabled</DropdownItem>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem>Another Action</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Button Dropdown sizing</strong>
              </CardHeader>
              <CardBody>
                <ButtonDropdown className="mr-1" isOpen={this.state.dropdownOpen[13]} toggle={() => { this.toggle(13); }}>
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
                <ButtonDropdown isOpen={this.state.dropdownOpen[14]} toggle={() => { this.toggle(14); }}>
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
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Button Dropup variation</strong>
              </CardHeader>
              <CardBody>
                <ButtonDropdown dropup className="mr-1" isOpen={this.state.dropdownOpen[15]} toggle={() => { this.toggle(15); }}>
                  <DropdownToggle caret caret size="lg">
                    Dropup
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
    )
  }
}

export default ButtonDropdowns;