import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import axios from 'axios';
import server from '../../serverInfo';
import Cookies from 'js-cookie';
import UserTasks from './UserTasks.js';


class TaskManager extends Component {
  constructor(props) {
    super(props);
    this.editTask = this.editTask.bind(this);
    this.createTask = this.createTask.bind(this);



    this.state = {
      tasks: {
        
      }
    };
  }

  componentDidMount(){
    axios.get(
      server.addr+`/api/task?sub_list=1&thisday=1`,
      {headers: {"Content-Type": "application/json", 'Authorization': "JWT " + Cookies.get('token') }})
    .then(res => {
      console.log(res);
      const tasks = res.data;
      console.log("taski",tasks);
      this.setState({ tasks: tasks });
    })
  }

  editTask(newTask) {
    let tasks = this.state.tasks;
    for (const key in tasks) {
      tasks[key].map((task, index) => {
        if(task.task_id == newTask.task_id){
          task = newTask;
          axios.put(
            server.addr+`/api/task/`,
            {task},
            {headers: {"Content-Type": "application/json", 'Authorization': "JWT " + Cookies.get('token') }})
            .then(res => {
              console.log(res);
          })
          return;
        }
      });
      
    }
    
  
  }

  createTask(newTask, name) {
    const task = newTask;
    axios.post(
      server.addr+`/api/task/`,
      {task},
      {headers: {"Content-Type": "application/json", 'Authorization': "JWT " + Cookies.get('token') }}
    ).then(res => {
      let tasks = this.state.tasks;
      console.log('ff',tasks);  
      tasks[newTask['name_job']].push(res.data);
      this.setState({ tasks: tasks });
    });
  }
  

  render() {
    return (

      <div className="animated fadeIn">
        <Row>
        {
           Object.keys(this.state.tasks).map((key) => {
            return (
              <UserTasks key={key} 
                         name={key} 
                         tasks={this.state.tasks[key]} 
                         editTask={this.editTask} 
                         createTask={this.createTask}/>
            )
           })          
        }
        </Row>
      </div>

    );
  }
}

export default TaskManager;
