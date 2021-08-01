import React, { Component } from "react"
import "./Forget.css"
import handleInputChange from "./funcTest/handleInputChange"
import axios from 'axios'

class Forget extends Component {
	constructor(props) {
		super(props)
		this.state =
		{
			Forget_ID: "",
			Forget_email: "",
			Forget_question: "",
			Forget_password: "",
			Forget_confirm_password: ""
		}

		this.handleInputChange = handleInputChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log(this.state);
		if(false){//this.state.Forget_password!==this.state.Forget_confirm_password){
			alert("密碼不一致");
		}else{
			var r=window.confirm("一個更改密碼的頁面連結將寄到信箱");
			if(r){
				axios.post("/api/forget",
					{
						account:this.state.Forget_ID//,
						// password:this.state.Forget_password,
						// question:this.state.Forget_question,
						// Email:this.state.Forget_email,
						// ConfirmPassword:this.state.Forget_confirm_password
					}
				).then(res => {//{email}
					alert('連結已寄到'+res.data.email);
					window.location = "/Login";
				}
				).catch(err => {//{description}
					(err.response.data.description) && alert('錯誤\n'+err.response.data.description);
				})
			}
		}
	}

	render() {
		return (
			<div id="Forget_container">
				{/*======== a div being a 5rem margin-top ============*/}
				<div className="w-100" style={{ height: "5rem" }}></div>
				{/*======== a div being a 5rem margin-top ============*/}

				{/*=====================main form=====================*/}
				<div id="Forget_left_table" className="container justify-content-center mt-2 mt-md-5 mx-3 mx-md-5">
					<form onSubmit={this.handleSubmit}>
					{/*==================input area=====================*/}
					<div id="Forget_input" className="form-group row">
							<label id="Forget_input_text" className="col-form-label col-lg-3 col-4 text-center text-md-left" for="StudentID">Student ID</label>
							<input name="Forget_ID"
								id="Forget_input_input"
								className="form-control col-5 col-lg-6 offset-1"
								placeholder="Student ID"
								value={this.state.value}
								onChange={this.handleInputChange}
							></input>
						</div>
						{/* <div id="Forget_input" className="form-group row">
							<label for="Your Email" id="Forget_input_text" className="col-form-label col-lg-3 col-4 text-center text-md-left">Your Email</label>
							<input name="Forget_email"
								id="Forget_input_input"
								className="form-control col-5 col-lg-6 offset-1 "
								placeholder="Your Email"
								value={this.state.value}
								onChange={this.handleInputChange}
							></input>
						</div>
						<div id="Forget_input" className="form-group row">
							<label id="Forget_input_text" className="col-form-label col-lg-3 col-4 text-center text-md-left" for="Question" >Question</label>
							<input name="Forget_question"
								id="Forget_input_input"
								placeholder="Your favorite movie"
								value={this.state.value}
								onChange={this.handleInputChange}
								className="form-control col-5 col-lg-6 offset-1"
							></input>
						</div>
						<div id="Forget_input" className="form-group row">
							<label id="Forget_input_text" className="col-form-label col-lg-3 col-4 text-center text-md-left">New Password</label>
							<input name="Forget_password"
								id="Forget_input_input"
								className="form-control col-5 col-lg-6 offset-1"
								type="password"
								placeholder="登入後須設定新密碼"
								value={this.state.value}
								onChange={this.handleInputChange}
							></input>
						</div>
						<div id="Forget_input" className="form-group row">
							<label id="Forget_input_text" className="col-form-label col-lg-3 col-4 text-center text-md-left">Confirm Password</label>
							<input name="Forget_confirm_password"
								id="Forget_input_input"
								className="form-control col-5 col-lg-6 offset-1"
								type="password"
								placeholder="再次輸入密碼"
								value={this.state.value}
								onChange={this.handleInputChange}
							></input>
						</div> */}
						{/*==================input area=====================*/}
						<div id="Forget_btn" className="justify-content-center d-flex mt-4">
							<button id="Forget_btn_text" onclick={this.handleSubmit}>
								Send Link to Mail
							</button>
						</div>
					</form>
				</div>
				{/*=====================main form=====================*/}
			</div>
		)
	}
}
export default Forget
