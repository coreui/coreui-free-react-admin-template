import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import usersData from './UsersData'

function UserRow(props) {
  const user = props.user
  const userLink = `#/users/${user.id}`
  return (
    <tr key={user.id.toString()}>
      <td><a href={userLink}>{user.id}</a></td>
      <td><a href={userLink}>{user.name}</a></td>
      <td>{user.genre}</td>
    </tr>
  )
}

class Users extends Component {

  render() {

    const userList = usersData

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Users
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>name</th>
                      <th>genre</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((user, index) =>
                      <UserRow key={index} user={user}/>
                    )}
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

export default Users;
