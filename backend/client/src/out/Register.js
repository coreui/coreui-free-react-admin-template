import React, { Component } from "react"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props"
import { Link, Redirect } from "react-router-dom"
import axios from "axios"
import "./Register.css"
import Facebook_image from "../images/Register_Facebook.png"
import Account_image from "../images/Register_Account.png"
class Register extends Component 
{
	constructor(props) 
	{
		super(props)
		this.state =
		{
			Login_facebook_ID: "",
			isLogin: false,
			isFBLogin: false
		}

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
	handleFBSubmit = (response) => {
		if (response.status == "unknown") 
		{
			return
		}
		axios.post("/api/loginFB", { facebookID: response.userID })
		.then(res => {//{username}
			alert("Already registered! Welcome：" + res.data.username)
			this.setState(
				{
					Login_facebook_ID: response.userID,
					isFBLogin: true,
					isLogin: true
				})
			this.handleLogin(true)
		}).catch(err => {//{description}
			this.setState(
				{
					Login_facebook_ID: response.userID,
					isLogin: false,
					isFBLogin: true
				})
			this.handleLogin(false)
		})
	}
	render() {
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
			<div id="Register_container" className="mb-5 mb-md-0">
				<p id="Register_text" className="my-5 mx-5">
					Please choose one method to register, strongly recommend via Facebook
				</p>
				<div class="row container mx-auto">

					<div class="col d-flex justify-content-center">
						<FacebookLogin
							appId="969130733557478"
							autoLoad={false}
							fields="name,email,picture"
							callback={this.handleFBSubmit}
							textButton=""
							render={renderProps => (
								<img id="Register_imgs" src={Facebook_image} alt="Register by Facebook" onClick={renderProps.onClick} />
							)}
						/>
					</div>

					<div class="col d-flex justify-content-center">
						<Link to="/Register/pages/Register_account" >
							<img id="Register_imgs" src={Account_image} alt="Register by Account" />
						</Link>
					</div>

					<div class="w-100"/>
				</div>
			</div>
		)
	}
}
export default Register