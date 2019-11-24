import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import axios from 'axios';
import server from '../../../serverInfo';
import Cookies from 'js-cookie';
import TaskManager from '../TaskManager.js';
import HistoryTask from './HistoryTasks';



class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: {}
    }
  }

  componentDidMount(){
    axios.get(
      server.addr+`/api/task?sub_list=1&thisday=0`,
      {headers: {"Content-Type": "application/json", 'Authorization': "JWT " + Cookies.get('token') }})
    .then(res => {
      console.log(res);
      const tasks = res.data;
      console.log("taski",tasks);
      this.setState({ tasks: tasks });
    })
  }

  render() {
    return (

      <div className="animated fadeIn">
        <Row>
        {
           Object.keys(this.state.tasks).map((key) => {
            return (
              <HistoryTask key={key} tasks={this.state.tasks[key]}/> 
            )
           })          
        }
        </Row>
      </div>

    );
  }
}

export default History;
