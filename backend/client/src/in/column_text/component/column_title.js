import React, { Component } from 'react';
import './column_title.css';

class Column_title extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: this.props.title,
            id: this.props.id
        }
        this.addTitle = this.addTitle.bind(this);
    }
    addTitle(i,content){
        let title_container = document.getElementById(this.state.id);
        let newtitle = document.createElement("p");
        newtitle.setAttribute('href','#');
        newtitle.setAttribute('class','column_title');
        newtitle.setAttribute('id',this.state.id+"_"+i);
        newtitle.innerHTML = content;
        title_container.appendChild(newtitle);
    }
    componentDidMount(){
        for (let i = 1; i< this.state.title.length+1; i++) {
          this.addTitle(i,this.state.title[i-1]);
        }
    }
    render(){
        return(
            <div id={this.state.id} class="column_whole_title">
                {/* {this.state.title} */}
            </div>
        )
        }   
}

export default Column_title;