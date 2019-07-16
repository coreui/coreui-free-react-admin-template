import React from "react";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";

import usersData from "./UsersData";

function User(props) {
  const user = usersData.find(
    user => user.id.toString() === props.match.params.id
  );

  const userDetails = user
    ? Object.entries(user)
    : [
        [
          "id",
          <span>
            <i className="text-muted icon-ban" /> Not found
          </span>
        ]
      ];

  return (
    <div className="animated fadeIn">
      <Row>
        <Col lg={6}>
          <Card>
            <CardHeader>
              <strong>
                <i className="icon-info pr-1" />User id: {props.match.params.id}
              </strong>
            </CardHeader>
            <CardBody>
              <Table responsive striped hover>
                <tbody>
                  {userDetails.map(([key, value]) => {
                    return (
                      <tr key={key}>
                        <td>{`${key}:`}</td>
                        <td>
                          <strong>{value}</strong>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default User;
