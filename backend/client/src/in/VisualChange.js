import React, { Component } from 'react';
//import "./VisualChange.css"
import Profile from "./profile_new"
//import axios from "axios";

class VisualChange extends Component {
	/*constructor(props) {
		super(props);
		this.state = {
			username:'',
			account:'',
			question:''
		};
	}
	
	showPersonal(){
		axios.post("/api/showVisual", 
			{}
		).then(res => {
			console.log(res.data);
				if(res.data){
					if(res.data.message===true){
						this.setState({
							username:res.data.data.username,
							account:res.data.data.account,
							question:res.data.data.SQ
						});
					}else{
						alert('錯誤：\n'+res.data.description);
					}
				}
		})
	}
	
	handleInputChange=event=>{
		const target = event.target;
		const value = target.value;
		const name = target.name;
		
		this.setState({name: value});
	}
	
	componentDidMount(){
		this.showPersonal();
	}
	
	btn_click=e=>{
		e.preventDefault();
		this.showPersonal();
	}
	
	handleSubmit=event=>{
		event.preventDefault();
		console.log(this.state);
		if(this.state===""){
			alert("該值不得為空");
		}else{
			var r=window.confirm("確認更改安全問題?");
			if(r){
				axios.post("/api/chVisual", 
					this.state
				).then(res => {
					console.log(res.data);
						if(res.data){
							if(res.data.message===true){
								alert('更改完成');
							}else{
								alert('更改失敗');
							}
						}
				})
			}
		}
	}*/
	
	render(){
		return (
		<div>
			<Profile />
		</div>
		
		/*	<div description="personalInfo">
			  <button onClick={this.btn_click}>refresh</button>
			  <form onsubmit={this.handleSubmit}>
				  <table>
				  <thead>
					<tr>
						<th></th>
						<th> 輸入 </th>
						<th> 公開? </th> checkbox
						<th> 操作 </th> 刪除、新增等輔助按鈕
					</tr>
				  </thead>
				  <tbody>
					<tr>
						<td>學號</td>
						<td>{"this.state.account"}</td>
					</tr>
					<tr>
						<td>姓名</td>
						<td>{"this.state.username"}</td>
					</tr>
					<tr>
						<td>暱稱</td>
						<td>
							<input name="nick" 
								value={this.state.nick}
								onChange={this.handleInputChange}
							/>
						</td>
					</tr>
					<tr>
						<td>介紹</td>
						<td>
							<input name="profile" 
								value={this.state.profile}
								onChange={this.handleInputChange}
							/>
						</td>
					</tr>
					<tr>
						<td>學歷</td>
						<td>這裡要做一個可擴充的按鈕
							<input name="education" 
								value={this.state.education}
								onChange={this.handleInputChange}
							/>
						</td>
					</tr>
					<tr>
						<td>公用信箱</td>
						<td>
							<input name="pmail" 
								value={this.state.pmail}
								onChange={this.handleInputChange}
							/>
						</td>
					</tr>
					....請前端人員自行擴充，參考後端MD database
					https://docs.google.com/spreadsheets/d/1B0rfB7Ako43L1CAd31VnNTjovAsh5IRgfvKGySSEYq0/edit#gid=180446379 
				  </tbody>
				  </table>
			  </form>
		</div> */
		);
	}
}

export default VisualChange;