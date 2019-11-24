import React, { Component } from 'react';
import Task from './Task'
import './MyTasks.scss'
import axios from 'axios';
import server from '../../serverInfo';
import Cookies from 'js-cookie'

import {
  FormGroup,
  Input,
  Label,
} from 'reactstrap';

class MyTasks extends Component {

  constructor(props) {
    super(props);

    this.checkBlocked = this.checkBlocked.bind(this);


    this.state = {
      activeTab: 1,
      activeId: NaN,
      tasks: [
        
      ]
    };
  }

  componentDidMount(){
    axios.get(
      server.addr+`/api/task?sub_list=0&thisday=1`,
      {headers: {"Content-Type": "application/json", 'Authorization': "JWT " + Cookies.get('token') }})
    .then(res => {
      console.log(res);
      const tasks = res.data;
      console.log(tasks);
      this.setState({ tasks: tasks });
    })
  }
  

  checkTask(id, newState) {
    const tasks = this.state.tasks;
    const getTask = tasks.find(task => task.task_id === id);
    if(!getTask.cheked){
      getTask.cheked = newState;
      this.setState({tasks: tasks});
      const task = {
        task_id: getTask.task_id,
        cheked: getTask.cheked,
        succeeded: true,
      }
      console.log(task);
      axios.put(
        server.addr+`/api/task/checked/`,
        {task},
        {headers: {"Content-Type": "application/json", 'Authorization': "JWT " + Cookies.get('token') }})
        .then(res => {
          console.log(res);
      })
    }
  }

  checkBlocked(key) {
    if(key > 0) {
      const getTask = this.state.tasks[key-1];
      if(getTask.cheked) return false;
      return true;
    }
    return false;
  }

  render() {
  
    return (
      <FormGroup check className="form">
        {
          this.state.tasks.map((task, key) => {
            return(
              <Task key={key} 
                    task={task} 
                    checkTask={this.checkTask.bind(this)} 
                    disabled={this.checkBlocked(key)}
                    activeId={this.state.activeId}
              />
            )
          })
        }
      </FormGroup>
    );
  }
}

export default MyTasks;
