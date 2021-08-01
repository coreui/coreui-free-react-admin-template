import React, { Component } from 'react';
import Column_section from './column_section';

class Column_article extends Component{
    constructor(props){
        super(props);
        this.state = {
            sections : this.props.sections,
            id : this.props.id
        }

    }
    render(){
        
        const new_sections = [];
        for (let i=0;i<this.state.sections.length;i++){
            new_sections.push(<Column_section id={this.state.id+"_"+(i+1)} sections = {this.state.sections[i]}/>)
        }
        return(
            <div id={this.state.id}>
                {new_sections}
            </div>
        )
    }
}
export default Column_article;