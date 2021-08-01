import React, { Component } from 'react';
import './column_sp_thx.css';

class Column_sp_thx extends Component{
    constructor(props){
        super(props);
        this.state = {
            sp_thx : this.props.sp_thx,
            id : this.props.id
        }
    }
    render(){
        return(
            <div id={this.props.id}>
                {this.state.sp_thx}
            </div>
        )
    }
}
export default Column_sp_thx;