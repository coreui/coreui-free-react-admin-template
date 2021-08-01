import React, { Component } from 'react';
import './column_hashtags.css';

class Column_hashtags extends Component{
    constructor(props){
        super(props);
        this.state = {
            hashtags : this.props.hashtags,
            id : this.props.id
        }
        this.addHashTag = this.addHashTag.bind(this);
    }
    addHashTag(i,content){
        let tag_container = document.getElementById(this.state.id);
        let newtag = document.createElement("a");
        newtag.setAttribute('href','#');
        newtag.setAttribute('class','column_hashtags');
        newtag.setAttribute('id',this.state.id+"_"+i);
        newtag.innerHTML = "#"+content;
        tag_container.appendChild(newtag);
    }
    componentDidMount(){
        for (let i = 1; i< this.state.hashtags.length+1; i++) {
          this.addHashTag(i,this.state.hashtags[i-1]);
        }
    }
    render(){
        return(
            <div id = "hashtag_space">
                <div id={this.state.id} class="column_hashtags">
            </div>
            </div>
            
        )
    }
}
export default Column_hashtags;