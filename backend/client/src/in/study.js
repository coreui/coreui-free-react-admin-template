import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './study.css';

class Study extends Component{
    render(){
		
        return (
        <div id = "study_container" >
			<div id = "study_text" style={{marginTop:"8%"}}>
                <a href="https://docs.google.com/spreadsheets/d/1I2HBAvKZWo2eeMYtZTJ8JkHEGu8gM2yUiRyArxE5GvY/edit#gid=0" target="_blank">
                    <Button id="Study_btn">Program Info</Button>
                </a>
			</div>
					
			
		</div>
        )
    }
}

export default Study;
