import React, { Component } from 'react';
import './column_section.css';

class Column_section extends Component{
    constructor(props){
        super(props);
        this.state = {
            bigtitle : this.props.sections.bigtitle,
            sections : this.props.sections.sections,
            id : this.props.id
        }
    }
    componentDidMount(){
        let minor_section_container = document.getElementById(this.state.id);
        for (let i=0;i<this.state.sections.length;i++){
            let new_minor_section = document.createElement('div')
            let minor_section_title = document.createElement('li');
            let minor_section_content = document.createElement('p');
            minor_section_title.innerHTML = this.state.sections[i].title;
            minor_section_title.setAttribute('id',this.state.id+'_minor_title'+(i+1));
            minor_section_title.setAttribute('class','column_minor_title');
            minor_section_content.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+this.state.sections[i].section;
            minor_section_content.setAttribute('id',this.state.id+'_content'+(i+1));
            minor_section_content.setAttribute('class','column_minor_content');
            new_minor_section.setAttribute('class','column_minor_sections');
            new_minor_section.setAttribute('id',this.state.id+"_minor_section"+(i+1));
            
            new_minor_section.appendChild(minor_section_title);
            new_minor_section.appendChild(minor_section_content);
            minor_section_container.appendChild(new_minor_section)
        }
    }
    render(){
        return(
            <div id={this.state.id}>
                <p id={this.state.id+"_bigtitle"} class="column_sections_bigtitle">
                    {this.state.bigtitle}
                </p>
            </div>
        )
    }
}
export default Column_section;