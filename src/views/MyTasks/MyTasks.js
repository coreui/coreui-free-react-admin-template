import React, { Component } from 'react';
import Task from './Task'
import './MyTasks.scss'

import {
  FormGroup,
  Input,
  Label,
} from 'reactstrap';

class MyTasks extends Component {

  constructor(props) {
    super(props);

    this.checkBlocked = this.checkBlocked.bind(this);
    this.checkBlocked = this.checkBlocked.bind(this);
    // this.checkBlocked = this.checkBlocked.bind(this);


    this.state = {
      activeTab: 1,
      activeId: NaN,
      tasks: [
        {
          id: 1,
          name: "Сладко дуть",
          checked: false,
        },
        {
          id: 2,
          name: "Lol",
          checked: false,
        }
      ]
    };
  }

  checkTask(id, newState) {
    const tasks = this.state.tasks;
    const getTask = tasks.find(task => task.id === id);
    getTask.checked = newState;
    this.setState({tasks: tasks})
  }

  checkBlocked(key) {
    if(key > 0) {
      const getTask = this.state.tasks[key-1];
      if(getTask.checked) return false;
      return true;
    }
    return false;
  }

  taskHover(id) {
    console.log("taskHover",id);
    this.setState({activeId: id})
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
                    taskHover={this.taskHover.bind(this)}
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
