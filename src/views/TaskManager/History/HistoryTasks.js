import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import axios from 'axios';
import server from '../../../serverInfo';
import Cookies from 'js-cookie';
import EditModal from '../EditModal';


import {
    FormGroup,
    Input,
    Label,
    Button
  } from 'reactstrap';

class HistoryTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: {
        
      },
    };
  }

  render() {
    return (
        <Col xs="12" lg="6">
            <Card>
            <CardHeader>
                <i className="fa fa-align-justify"></i> {this.props.name}
            </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                      <th>Status</th>
                      <th>Priority</th>
                      <th>Text</th>
                      <th>Date</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.props.tasks.map((task, key) => {
                      return (
                          <tr key={"task-" + task.task_id}>
                              <td>{task.cheked ? <Badge color="success">Done</Badge> : <Badge color="warning">To do</Badge>}</td>
                              <td>{task.priority}</td>
                              <td>{task.task_text}</td>
                              <td>{task.task_date + " " + (task.task_time ? task.task_time : "")}</td>
                          </tr>
                        )
                    })}
                    </tbody>
                    </Table>
                </CardBody>
            </Card>
        </Col>
    );
  }
}

export default HistoryTask;
