import React, { Component } from 'react';
import './ResetPassword.css';
import axios from 'axios';
import { NavBar } from '../component/AppBar';
import handleInputChange from './funcTest/handleInputChange';

class ResetPassword extends Component{
	constructor(props) {
		super(props);
		this.state = {
          account: '',
          active: '',
		  //Forget_email: '',
		  //Forget_question: '',
		  Reset_password: '',
		  Reset_confirm_password: ''
		};

		this.handleInputChange = handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	/*handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		
		this.setState({
		  [name]: value
		});
	}*/
    
    componentDidMount(){
        try{
            this.setState({
                account:this.props.match.params.account,
                active:this.props.match.params.active
            })
        }catch{
            console.log(this.props)
            alert('驗證碼不存在');
            // window.location = "/Login";
        }
    }

	handleSubmit(event) {
		event.preventDefault();
		console.log(this.state);
		if(this.state.Reset_password!==this.state.Reset_confirm_password || this.state.Reset_password===''){
			alert("密碼不一致或為空");
		}else{
			var r=window.confirm("密碼即將更改");
			if(r){
				axios.post("/api/activation", 
					{account:this.state.account,
                    password:this.state.Reset_password,
                    active:this.state.active
					// question:this.state.Forget_question,
					// Email:this.state.Forget_email,
					// ConfirmPassword:this.state.Reset_confirm_password
					}
				).then(() => {//{}
					alert('密碼變更成功，請登入');
					window.location = "/Login";
				}).catch(err => {
					(err.response.data.description) && alert('錯誤\n'+err.response.data.description);
				})
			}
		}
	}
	
    render(){
        return(
			<div>
			{/* <NavBar/> */}
            <div id="Forget_container">
				<div className="w-100" style={{height:"5rem"}}></div>
                <div id="Forget_left_table" className="container justify-content-center mt-2 mt-md-5 mx-3 mx-md-5">
					<form onSubmit={this.handleSubmit}>
						<div id="Forget_input" className="form-group row">
							<label for="StudentID" id="Forget_input_text" className="col-form-label col-lg-3 col-4 text-center text-md-left">Student ID</label>
							<input name="Forget_ID"
								id="Forget_input_input" 
								placeholder="Student ID"
								value={this.state.account} 
                                // onChange={this.handleInputChange}
                                disabled={true}
								className="form-control col-5 col-lg-6 offset-1"
							></input>
						</div>
						{/* <div id="Forget_input" className="form-group row">
							<label for="Your Email" id="Forget_input_text" className="col-form-label col-lg-3 col-4 text-center text-md-left">Your Email</label>
							<input name="Forget_email"
								id="Forget_input_input" 
								placeholder="Your Email"
								value={this.state.value} 
								onChange={this.handleInputChange}
								className="form-control col-5 col-lg-6 offset-1 "
							></input>
						</div> */}
						{/* <div id="Forget_input" className="form-group row">
							<label for="Question" id="Forget_input_text" className="col-form-label col-lg-3 col-4 text-center text-md-left">Question</label>
							<input name="Forget_question"
								id="Forget_input_input" 
								placeholder="Your favorite movie"
								value={this.state.value} 
								onChange={this.handleInputChange}
								className="form-control col-5 col-lg-6 offset-1"
							></input>
						</div> */}
						<div id="Forget_input" className="form-group  row">
						   <label id="Forget_input_text" className="col-form-label col-lg-3 col-4 text-center text-md-left">New Password</label>
							<input name="Reset_password"
								id="Forget_input_input" 
								type = "password"
								placeholder="設定新密碼"
								value={this.state.Reset_password} 
								onChange={this.handleInputChange}
								className="form-control col-5 col-lg-6 offset-1"
							></input>
						</div>
						<div id="Forget_input" className="form-group row">
						   <label id="Forget_input_text" className="col-form-label col-lg-3 col-4 text-center text-md-left">Confirm Password</label>
							<input name="Reset_confirm_password"
								id="Forget_input_input" 
								type = "password"
								placeholder="再次輸入密碼"
								value={this.state.Reset_confirm_password} 
								onChange={this.handleInputChange}
								className="form-control col-5 col-lg-6 offset-1"
							></input>
						</div>
						<div id="Forget_btn" className="justify-content-center d-flex mt-4">
							<button id="Forget_btn_text" onClick={this.handleSubmit}>
								RESET PASSWORD
							</button>
						</div>
					</form>
                </div>

                {/* <div id="Forget_FAQ">
                    <div id="Forget_FAQ_title">FAQ</div>
                    <div id="Forget_FAQ_splitline"></div>
                    <div id="Forget_FAQ_content">
                        <ul id="Forget_FAQ_list">
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                </div> */}

            </div>
			</div>
        )
    }
}
// const ResetPassword_page = () => {
//     return <ResetPassword />
// }
export default ResetPassword
