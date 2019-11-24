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
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      
      cheked: props.task.cheked,
      text: props.task.task_text,
      priority: props.task.priority,


    };
  }


  onSubmit() {
    const task = this.props.task;
    task.cheked = this.state.cheked;
    task.task_text = this.state.text;
    task.priority = this.state.priority;

    this.props.editTask(task);
    this.props.closeEdit();
  }
  
  render() {
    console.log(this.props.task)
    return (
        <CardBody>
        <Form>
            <FormGroup>
            <Input type="checkbox" id="cheked"
                   checked={this.state.cheked} 
                   onClick={(e) => {
                       this.setState({cheked: e.target.checked});
                    }}
            />
            <Label htmlFor="cheked">status</Label>

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

            <Button type="submit" size="sm" color="primary" onClick={this.onSubmit}><i className="fa fa-dot-circle-o"></i> Submit</Button>
            <Button size="sm" color="secondary" onClick={this.props.closeEdit}><i className="fa fa-dot-circle-o"></i>Exit</Button>
        </Form>
      </CardBody>
    );
  }
}

export default EditModal;
