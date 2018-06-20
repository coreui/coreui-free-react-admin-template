import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import usersData from './UsersData'

class User extends Component {

  render() {

    const user = usersData.find( user => user.id.toString() === this.props.match.params.id)

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> User id: {this.props.match.params.id}
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                    <tr>
                      <td>id:</td>
                      <td><strong>{user.id}</strong></td>
                    </tr>
                    <tr>
                      <td>name:</td>
                      <td><strong>{user.name}</strong></td>
                    </tr>
                    <tr>
                      <td>genre:</td>
                      <td><strong>{user.genre}</strong></td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default User;
