import React, { Component } from 'react';
import './Task.scss'

import {
    FormGroup,
    Input,
    Label,
    Button
  } from 'reactstrap';

class Tasks extends Component {


    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);

        // this._onBlur = this._onBlur.bind(this)
        // this._onFocus = this._onFocus.bind(this)
        
        this.state = {
            focus: false,
            hideOptions: true
        };
    }

    onClick() {
        // console.log(this.props.disabled);
        if(!this.props.disabled) {
            this.props.checkTask(this.props.task.task_id, !this.props.task.cheked); 
        }  
    }

    // _onBlur() {
    //     // console.log(this.state.focus);
    //     setTimeout(() => {
    //         if (this.state.focus) {
    //             this.setState({
    //                 focus: false,
    //             });
    //         }
    //     }, 100);
    // }
    // _onFocus() {
    //     // console.log(this.state.focus);
        
    //     if (!this.state.focus) {
    //         console.log(this.props.task.id, this.props.activeId);

    //         this.setState({
    //             focus: true,
    //         });
    //         this.props.taskHover(this.props.task.id);
    //     }
    // }


    render() {
        return (
            <div className={"inputGroup"}>
                <Input className="form-check-input checkbox task-input" 
                       type="checkbox" id="checkbox1" name="checkTask" 
                       checked={this.props.task.cheked} 
                       value={this.props.task.cheked}
                       disabled={this.props.task.cheked || this.props.disabled} 
                       readOnly={true}
                />
                <Label check className="form-check-label task-label" htmlFor="checkbox3"  onClick={() => this.onClick()}>
                    {this.props.task.task_text}
                </Label>
                {!this.props.task.cheked ? <div className={"d-flex"}><Button color={"link"} 
                    onClick={() => {this.setState({hideOptions: !this.state.hideOptions})}}>||||</Button>
                <Button active block className={"buttonRemove"} color="danger" aria-pressed="true" 
                        hidden={this.state.hideOptions}>x</Button></div> : ""}
                

            </div>
        );
    }
}
export default Tasks;