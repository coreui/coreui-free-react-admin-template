import React, { Component } from 'react';
import axios from "axios";
import Button from "@material-ui/core/Button";
import {fakeAuth} from '../auth';

class Logout extends Component {
	logoutbtn(){
		axios.post("/api/logout", 
			{}
		).then(res => {
			alert('登出成功');
			localStorage.removeItem('auth');
			window.location = "/Login";
		}).catch(err => {
			(err.response.data.description) && alert('錯誤\n'+err.response.data.description);
		})
	}
	
	btn_click=e=>{
		e.preventDefault();
		this.logoutbtn();
	}
	
	render(){
		return (
			<div description="logout" >
			  <Button onClick={this.btn_click}
			  style={{display:"inline-block",
			  position:"relative",
			  width:"10vw",
			  margin:"0",
			  flexGrow:"2",
			  color:"#6AFFC6",
			  fontSize:"1.5rem",
			  fontWeight:"bold",
			  textDecoration:"none"}}
			  className="noHoverBg">Logout</Button>
			</div>
		);
	}
}

/*const Logout = (e) => {
	alert("logout successfully!") //for test
	/*e.preventDefault();
	axios.post("/api/logout", 
			{}
		).then(res => {
			console.log(res.data);
				if(res.data){
					if(res.data.message===true){
						alert('登出成功');
						window.location = "/Login";
					}else{
						alert('登出失敗');
					}
				}
		})*/
//}
export default Logout