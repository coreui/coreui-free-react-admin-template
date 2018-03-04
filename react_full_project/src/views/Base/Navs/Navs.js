import React, {Component} from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Nav, NavItem, NavLink,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

class Navs extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: [false, false]
    };
  }

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return (index === i ? !element : false);
    });
    this.setState({
      dropdownOpen: newArray
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i><strong>Navs</strong>
            <div className="card-actions">
              <a href="https://reactstrap.github.io/components/navs/" target="_blank">
                <small className="text-muted">docs</small>
              </a>
            </div>
          </CardHeader>
          <CardBody>
            <p>List Based</p>
            <Nav>
              <NavItem>
                <NavLink href="#">Link</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Link</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Another Link</NavLink>
              </NavItem>
              <NavItem>
                <NavLink disabled href="#">Disabled Link</NavLink>
              </NavItem>
            </Nav>
            <hr/>
            <p>Link Based</p>
            <Nav>
              <NavLink href="#">Link</NavLink> <NavLink href="#">Link</NavLink> <NavLink href="#">Another Link</NavLink> <NavLink disabled href="#">Disabled Link</NavLink>
            </Nav>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i><strong>Navs Tabs</strong>
          </CardHeader>
          <CardBody>
            <Nav tabs>
              <NavItem>
                <NavLink href="#" active>Link</NavLink>
              </NavItem>
              <Dropdown nav isOpen={this.state.dropdownOpen[0]} toggle={() => {this.toggle(0)}}>
                <DropdownToggle nav caret>
                  Dropdown
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <NavItem>
                <NavLink href="#">Link</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Another Link</NavLink>
              </NavItem>
              <NavItem>
                <NavLink disabled href="#">Disabled Link</NavLink>
              </NavItem>
            </Nav>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i><strong>Navs Pills</strong>
          </CardHeader>
          <CardBody>
            <Nav pills>
              <NavItem>
                <NavLink href="#" active>Link</NavLink>
              </NavItem>
              <Dropdown nav isOpen={this.state.dropdownOpen[1]} toggle={() => {this.toggle(1)}}>
                <DropdownToggle nav caret>
                  Dropdown
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <NavItem>
                <NavLink href="#">Link</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Another Link</NavLink>
              </NavItem>
              <NavItem>
                <NavLink disabled href="#">Disabled Link</NavLink>
              </NavItem>
            </Nav>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i><strong>Navs Vertical</strong>
          </CardHeader>
          <CardBody>
            <p>List Based</p>
            <Nav vertical>
              <NavItem>
                <NavLink href="#">Link</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Link</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Another Link</NavLink>
              </NavItem>
              <NavItem>
                <NavLink disabled href="#">Disabled Link</NavLink>
              </NavItem>
            </Nav>
            <hr/>
            <p>Link based</p>
            <Nav vertical>
              <NavLink href="#">Link</NavLink> <NavLink href="#">Link</NavLink> <NavLink href="#">Another Link</NavLink> <NavLink disabled href="#">Disabled Link</NavLink>
            </Nav>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Navs;