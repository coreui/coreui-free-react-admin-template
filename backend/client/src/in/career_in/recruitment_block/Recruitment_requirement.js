import React, { Component } from 'react';
import './Recruitment_requirement.css';

class Recruitment_block_requirement extends Component{
    constructor(props){
        super(props);
        this.state = {
            requirement : this.props.requirement,
            id : this.props.id
        }
        this.addrequirement = this.addrequirement.bind(this);
    }
    addrequirement(i,content){
        let requirement_container = document.getElementById(this.state.id);
        let new_requirement = document.createElement("li");
        new_requirement.setAttribute('href','#');
        new_requirement.setAttribute('class','recruitment_block_requirement');
        new_requirement.setAttribute('id',this.state.id+"_"+i);
        new_requirement.innerHTML = content;
        requirement_container.appendChild(new_requirement);
    }
    componentDidMount(){
        for (let i = 1; i< this.state.requirement.length+1; i++) {
          this.addrequirement(i,this.state.requirement[i-1]);
        }
    }
    
    render(){
        return(
            <div id={this.state.id} class="Recruitment_block_requirement">
                <li id = 'Recruitment_block_requirement'>學歷</li>
                {/* {this.state.requirement} */}
            </div>
        )
    }
}
export default Recruitment_block_requirement;