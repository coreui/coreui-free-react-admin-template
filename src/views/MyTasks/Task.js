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

        this._onBlur = this._onBlur.bind(this)
        this._onFocus = this._onFocus.bind(this)
        
        this.state = {
            focus: false
        };
    }

    onClick() {
        // console.log(this.props.disabled);
        if(!this.props.disabled) {
            this.props.checkTask(this.props.task.id, !this.props.task.checked); 
        }  
    }

    _onBlur() {
        // console.log(this.state.focus);
        setTimeout(() => {
            if (this.state.focus) {
                this.setState({
                    focus: false,
                });
            }
        }, 100);
    }
    _onFocus() {
        // console.log(this.state.focus);
        
        if (!this.state.focus) {
            console.log(this.props.task.id, this.props.activeId);

            this.setState({
                focus: true,
            });
            this.props.taskHover(this.props.task.id);
        }
    }


    render() {
        // return(
        //     <FormGroup check className="inputGroup">
        //         <Input className="form-check-input checkbox" 
        //                type="checkbox" 
        //             //    id={this.props.task.id} name="checkTask" 
        //             //    checked={this.props.task.checked} 
        //             //    value={this.props.task.checked} 
        //             //    onChange={() => {this.props.checkTask(this.props.task.id, !this.props.task.checked)}}
        //             />
        //         {/* <Label check className="form-check-label" htmlFor="checkbox3">{this.props.task.name}</Label> */}
        //     </FormGroup>
        // )
        return (
            <div className={"inputGroup"} onMouseOver={this._onFocus} onMouseOut={this._onBlur}>
                <Input className="form-check-input checkbox task-input" 
                       type="checkbox" id="checkbox1" name="checkTask" 
                       checked={this.props.task.checked} 
                       value={this.props.task.checked}
                       disabled={this.props.disabled} 
                       readOnly={true}
                />
                <Label check className="form-check-label task-label" htmlFor="checkbox3"  onClick={() => this.onClick()}>
                    {this.props.task.name}
                </Label>
                <Button active block className={"buttonRemove"} color="danger" aria-pressed="true" 
                        hidden={(!this.state.focus & this.props.task.id !== this.props.activeId & !this.props.task.checked)}>x</Button>

            </div>
        );
    }
}
export default Tasks;