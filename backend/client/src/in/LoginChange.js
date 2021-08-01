import React, { Component } from 'react';
import "./LoginChange.css"
import axios from "axios";
import refresh from "../images/refresh.png"

class LoginChange extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			account: '',
			question: '',
			img: ''
		};
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	showPersonal() {
		axios.post("/api/showPersonal",
			{}
		).then(res => {//{username,account,question}
			this.setState({
				username: res.data.username,
				account: res.data.account,
				question: res.data.SQ,
				img: res.data.img
			});
		}).catch(err => {
			(err.response.data.description) && alert('錯誤\n'+err.response.data.description);
		})
	}

	handleInputChange = event => {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		if (name === "safe_Question") {
			this.setState({ question: value });
		}
	}

	componentDidMount() {
		this.showPersonal();
	}

	btn_click = e => {
		console.log("hi")
		e.preventDefault();
		this.showPersonal();
	}

	 handleSubmit = event => {event.preventDefault();}
	// 	event.preventDefault();
	// 	console.log(this.state);
	// 	if (this.state === "") {
	// 		alert("該值不得為空");
	// 	} else {
	// 		var r = window.confirm("確認更改安全問題?");
	// 		if (r) {
	// 			axios.post("/api/chLogin",
	// 				{ question: this.state.question }
	// 			).then(res => {
	// 				console.log(res.data);
	// 				if (res.data) {
	// 					if (res.data.message === true) {
	// 						alert('更改完成');
	// 					} else {
	// 						alert('更改失敗');
	// 					}
	// 				}
	// 			})
	// 		}
	// 	}
	// }

	render() {
		return (
			<div description="personalInfo" id="LC_containers" className="mb-5">
				<div id="LC_hr">Security Question Reset</div>
				<form onSubmit={this.handleSubmit} >
					<button id="LC_refresh_btn" onClick={this.btn_click}>
						<img src={refresh} alt="refresh" id="LC_refresh_icon" className="img-fluid">
						</img>
					</button>
					{/*<img src={this.state.img} />*/}
					<div className="container">
					<div className="form-group row mx-auto">
							<label className="col-form-label col-5">姓名</label>
							<input id="LC_safe_Question" className="col-6 col-md-5 col-xl-4 offset-1 offset-md-2 offset-xl-3"
									value={this.state.username} disabled></input>
						</div>
						<div className="form-group row mx-auto">
							<label className="col-form-label col-5">學號</label>
							<input id="LC_safe_Question" className="col-6 col-md-5 col-xl-4 offset-1 offset-md-2 offset-xl-3"
									value={this.state.account} disabled></input>
						</div>
						<div className="form-group row mx-auto">
							<label className="col-form-label col-5">安全問題</label>
							<input id="LC_safe_Question" className="col-6 col-md-5 col-xl-4 offset-1 offset-md-2 offset-xl-3"
									value={this.state.question} onChange={this.handleInputChange} name="safe_Question"></input>
						</div>
					</div>
					<div className="d-flex justify-content-center mt-3">
						<input id="LC_submit_btn" type="submit" value="Change" className="btn"/>
					</div>
				</form>
			</div>
		);
	}
}

export default LoginChange;