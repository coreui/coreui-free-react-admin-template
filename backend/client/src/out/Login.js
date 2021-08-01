import React, { Component } from "react"
import "./Login.css"
import FacebookLogin from "react-facebook-login"
import { Link, Redirect } from "react-router-dom"
//import myPost from "../post/axios"
import axios from "axios"
class Login extends Component 
{
	constructor(props) 
	{
		super(props)
		this.state = 
		{
			Login_username_input: "",
			Login_password_input: "",
			Login_facebook_ID: "",
			isLogin: false,
			isFBLogin: false
		}

		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleLogin = this.handleLogin.bind(this)
		this.handleFBSubmit = this.handleFBSubmit.bind(this)
	}
	handleLogin(isLoginorNot) 
	{
		console.log("handleLogin")
		let isLogin = isLoginorNot
		if (isLogin) 
		{
			localStorage.setItem("auth", true)
			window.location = "in"
		}
	}
	handleInputChange(event) 
	{
		const target = event.target
		const value = target.value
		const name = target.id

		this.setState(
			{
			[name]: value
			}
		)
	}

	handleSubmit(event) 
	{
		event.preventDefault()
		console.log(this.state)
		axios.post("/api/login",
			{
				account: this.state.Login_username_input,
				password: this.state.Login_password_input
			}
		).then( (res) => //{username,account}
			{
				alert("登入成功，歡迎：" + res.data.username)
				//window.location = "/"
				this.setState(
					{
					isLogin: true
					}
				)
				this.handleLogin(true)
			}
		).catch( err => //{description}
			{
				console.log(err);
				(err.response.data.description)&&(alert("錯誤：\n" + err.response.data.description))
			}
		)
	}

	handleFBSubmit = (response) => 
	{
		if (response.status == "unknown") 
		{
			return
		}
		axios.post("/api/loginFB", { facebookID: response.userID })
		.then(({data}) => //{username}
			{
				console.log(res)
				alert("Logged in! Welcome：" + data.username)
				this.setState(
					{
						Login_facebook_ID: response.userID,
						isFBLogin: true,
						isLogin: true
					})
				this.handleLogin(true)
			}
		).catch(err=>{
			console.log(err.description)
			alert("User not registered!")
			this.setState(
				{
					Login_facebook_ID: response.userID,
					isLogin: false,
					isFBLogin: true
				})
			this.handleLogin(false)
		})
	}
	render() 
	{
		console.log(this.state)
		if (this.state.isLogin) 
		{

			return <Redirect to="/in" />
		}
		else if (this.state.isFBLogin) 
		{

			return <Redirect to={{ pathname: "/Register/pages/Register_facebook", id: this.state.Login_facebook_ID }} />
		}

		return (

			<div id="Login_container" className="container-fluid col-10">
				<div className="w-100 d-none d-sm-block" style={{ height: "5rem" }}></div>
				<form onSubmit={this.handleSubmit} >

					<div id="Login_input" className="container justify-content-center mt-5">
						<div id="Login_username" className="form-group row mb-5">
							<label className="col-sm-6 col-form-label" for="username" >School ID</label>
							<input id="Login_username_input" className="Login_input form-control col-sm-6" placeholder="e.g. b06901000" autoFocus
								value={this.state.value} onChange={this.handleInputChange}
							></input>
						</div>
						<div id="Login_password1" className="form-group row">
							<label className="col-sm-6 col-form-label" for="password" >Password</label>
							<input id="Login_password_input" className="Login_input form-control col-sm-6" placeholder="password" type="password"
								value={this.state.value} onChange={this.handleInputChange}
							></input>
						</div>
						<div id="Login_links" className="container-sm-fluid justify-content-sm-between d-sm-flex mx-sm-auto">
							<Link id="Login_create" to="/Register">Create a new account</Link>
							<div className="w-100 d-block d-sm-none"></div>
							<Link id="Login_forgot" to="/Forget" >Forgot your password?</Link>
						</div>
					</div>
					<input id="Login_submit" className=" container d-flex justify-content-center mt-4" type="submit" value="LOGIN" />
					
					<div id="Login_hr" className="w-50 text-center container d-md-block d-none mt-3">or login with...</div>
					<div id="Login_hr" className="w-100 text-center container d-md-none d-block mt-5">or login with...</div>

				</form>

				<FacebookLogin
					appId="969130733557478"
					autoLoad={false}
					fields="name,email,picture"
					callback={this.handleFBSubmit}
					cssClass="btnFacebook container d-flex justify-content-center mt-4"
					icon="fa-facebook"
					textButton=""
				/>
			</div>

		)
	}
}

export default Login