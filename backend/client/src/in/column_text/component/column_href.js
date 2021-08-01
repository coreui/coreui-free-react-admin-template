import React, { Component } from 'react';
import './column_href.css';

class Column_href extends Component{
    constructor(props){
        super(props);
        this.state = {
            href : this.props.href,
            id : this.props.id
        }
        this.addHref = this.addHref.bind(this);
    }
    addHref(i,content){
        let tag_container = document.getElementById(this.state.id);
        let newtag = document.createElement("a");
        newtag.setAttribute('href','#');
        newtag.setAttribute('class','column_href');
        newtag.setAttribute('id',this.state.id+"_"+i);
        newtag.innerHTML = "#"+content;
        tag_container.appendChild(newtag);
    }
    componentDidMount(){
        for (let i = 1; i< this.state.href.length+1; i++) {
          this.addHref(i,this.state.href[i-1]);
        }
    }
    render(){
        return(
            <div id = "hrefspace">
                <div id={this.state.id} class="column_href">
            </div>
            </div>
            
        )
    }
}
export default Column_href;