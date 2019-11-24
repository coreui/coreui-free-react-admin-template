import React, { Component } from 'react';
import axios from 'axios';
import server from '../../serverInfo';
import Cookies from 'js-cookie';
import UserTasks from './UserTasks.js';
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Fade,
    Form,
    FormGroup,
    FormText,
    FormFeedback,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
    InputGroupText,
    Label,
    Row,
  } from 'reactstrap';


class EditModal extends Component {
  constructor(props) {
    super(props);
    this.onUpdate = this.onUpdate.bind(this);
    this.onCreate = this.onCreate.bind(this);


    this.state = {
      
      cheked:   props.task ? props.task.cheked : false,
      text:     props.task ? props.task.task_text : "",
      priority: props.task ? props.task.priority : 0,


    };
  }


  onUpdate() {
    const task = this.props.task;
    task.cheked = this.state.cheked;
    task.task_text = this.state.text;
    task.priority = this.state.priority;

    this.props.editTask(task);
    this.props.closeEdit();
  }

  onCreate() {
    const task = {
        "task_text": null,
        "task_date": "2019-11-24",
        "photo_required": false,
        "is_active": true,
        "is_repitable": 1,
        "days": "0123456",
        "task_time": null,
        "succeeded": null,
        "cheked": true,
        "priority": 0,
        "list_id": 6,
        "name": this.props.name.split(" ")[0],
        "name_job": this.props.name,

    };
    task.cheked = this.state.cheked;
    task.task_text = this.state.text;
    task.priority = this.state.priority;
    
    this.props.createTask(task);
    this.props.closeEdit();
  }
  
  render() {
    console.log(this.props.task)
    return (
        <CardBody>
        <Form>
            <FormGroup>
                <div className={'ml-4'}>
                <Input type="checkbox" id="cheked"
                    checked={this.state.cheked} 
                    onClick={(e) => {
                        this.setState({cheked: e.target.checked});
                    }}
                />
                <Label htmlFor="cheked">status</Label>
                </div>

            </FormGroup>
            <FormGroup>
            <Label htmlFor="task_text">Priority</Label>
            <Input type="number" id="task_text" placeholder="Enter task text" 
                   value={this.state.priority}
                   onChange={(e) => {this.setState({priority: e.target.value})}}
            />
            </FormGroup>
            <FormGroup>
            <Label htmlFor="task_text">Text</Label>
            <Input type="text" id="task_text" placeholder="Enter task text" 
                    value={this.state.text}
                    onChange={(e) => {this.setState({text: e.target.value})}}
                    />
            </FormGroup>

            <Button type="submit" size="sm" color="primary" onClick={this.props.create ? this.onCreate : this.onUpdate}><i className="fa fa-dot-circle-o"></i> Submit</Button>
            <Button size="sm" color="secondary" onClick={this.props.closeEdit}><i className="fa fa-dot-circle-o"></i>Exit</Button>
        </Form>
      </CardBody>
    );
  }
}

export default EditModal;
