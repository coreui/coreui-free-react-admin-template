import React, { Component } from 'react';
import './column_annotation.css';

class Column_annotation extends Component{
    constructor(props){
        super(props);
        this.state = {
            annotation : this.props.annotation,
            id : this.props.id
        }
        this.addAnno = this.addAnno.bind(this);
    }
    addAnno(i,content){
        let tag_container = document.getElementById(this.state.id);
        let newtag = document.createElement("li");
        newtag.setAttribute('href','#');
        newtag.setAttribute('class','column_annotation');
        newtag.setAttribute('id',this.state.id+"_"+i);
        newtag.innerHTML = content+"\n";
        tag_container.appendChild(newtag);
    }
    componentDidMount(){
        for (let i = 1; i< this.state.annotation.length+1; i++) {
          this.addAnno(i,this.state.annotation[i-1]);
        }
    }
    render(){
        return(
            <div id = "Anno_space">
                <div id={this.state.id} class="column_annotation">
            </div>
            </div>
            
        )
    }
}
export default Column_annotation;