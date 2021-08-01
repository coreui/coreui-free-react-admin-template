import React, { Component } from 'react';
import './Register_account.css';
import axios from 'axios';
//import myPost from '../../post/axios';
class Register_account extends Component{
	constructor(props) {
		super(props);
		this.state = {
		  Register_acc_realname: '',
		  Register_acc_student_id: '',
		  Register_acc_password: '',
		  Register_acc_confirm_password: '',
		  Register_acc_email: '',
		  imagePreviewUrl: '',
		  file: null
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleImageChange = this.handleImageChange.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.id;
		
		
		this.setState({
		  [name]: value
		});
	}
	
	handleSubmit(event) {
		event.preventDefault();
		console.log(this.state)
		if(this.state.Register_password!==this.state.Register_confirm_password){
			return alert("密碼不一致");
		}else{
			var r=window.confirm("確認註冊？");
			if(r){
				var data = new FormData();
				data.append('file',this.state.file)
				data.append('username',this.state.Register_acc_realname)
				data.append('account',this.state.Register_acc_student_id)
				data.append('password',this.state.Register_acc_password)
				data.append('ConfirmPassword',this.state.Register_acc_confirm_password)
				data.append('Email',this.state.Register_acc_email)
				console.log('data is form ',data)
				const config = {
					headers: {
						'content-type': 'multipart/form-data'
					}
				};
				axios.post("/api/register",data,config).then(()=>{
					alert('註冊成功');
					localStorage.setItem('auth',true);
				 	window.location = "/Login";
				}).catch((err)=>{
					(err.response.data.description) && alert('錯誤\n'+err.response.data.description);
				})

				// axios.post("/api/register",
				// 	data
				// 	/*{username:this.state.Register_realname,
				// 	account:this.state.Register_student_id,
				// 	password:this.state.Register_password,
				// 	ConfirmPassword:this.state.Register_confirm_password,
				// 	file:this.state.file}*/,
				// 	config
				// ).then(res => {
				// 	console.log(res.data);
				// 	alert('註冊成功');
				// 		// if(res){
				// 		// 	if(res.data.message===true){
				// 		// 		alert('註冊成功');
				// 		// 		localStorage.setItem('auth',true);
				// 		// 		window.location = "/Login";
				// 		// 	}else{
				// 		// 		alert('錯誤：\n'+res.data.description);
				// 		// 	}
				// 		// }
				// }).catch(err=>{
				// 	console.log("err  =  ",err.response);
				// 	//[{value:"使用者填的值",msg:"錯的原因",param:"用他拿到是誰錯",location:"body"}]
				// 	alert('錯誤：\n'+err.response.data.description||'');
				// })
			}
		}
	}
	
	handleImageChange(e) {
		//e.preventDefault();

		let reader = new FileReader();
		let file = e.target.files[0];
		console.log('t',e.target)
		this.setState({
			file:file
		})
		reader.onloadend = () => {
			console.log('onloadend');
		  this.setState({
			imagePreviewUrl: reader.result
		  });
		}

		reader.readAsDataURL(file)
		console.log(this.state.file)
	}
	
    render(){
		let {imagePreviewUrl} = this.state;
		let $imagePreview = null;
		if (imagePreviewUrl) {
		  $imagePreview = (<img src={imagePreviewUrl} className="img-fluid container justify-content-center d-flex" id="Register_acc_id_photo"/>);
		} else {
		  $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
		}
        return(
            <div id="Register_acc_container">
			
                <div id="Register_acc_register_table" className="container-fluid mt-3">
                    <p id="Register_acc_table_title">Just A Few Steps to Join EE+!</p>
					<form onSubmit={this.handleSubmit}>
						<div id="Register_acc_table" className="col-11 pl-0 pl-md-1 col-xl-8 mt-5 mr-0 d-xl-inline-block mx-auto">
							<div className="form-group row">
								<label id="Register_acc_realname_label" className="col-form-label col-5 col-sm-4 col-md-3 Register_account_label text-center text-lg-left">Your Name</label>
								<input id="Register_acc_realname" placeholder="Your Chinese Name"
									value={this.state.value} onChange={this.handleInputChange}
									className="form-control col-7 col-md-8 offset-sm-1 Register_account_input"
								></input>
							</div>
							<div className="form-group row">
								<label id="Register_acc_ID_label" className="col-form-label col-5 col-sm-4 col-md-3 Register_account_label text-center text-lg-left">Student ID</label>
								<input id="Register_acc_student_id" placeholder="Student ID"
									value={this.state.value} onChange={this.handleInputChange}
									className="form-control offset-sm-1 col-7 col-md-8 Register_account_input"
								></input>
							</div>
							<div className="form-group row">
								<label id="Register_acc_password_label" className="col-form-label col-5 col-sm-4 col-md-3 Register_account_label text-center text-lg-left">Password</label>
								<input id="Register_acc_password" placeholder="Set Your Password" type="password"
									value={this.state.value} onChange={this.handleInputChange}
									className="form-control offset-sm-1 col-7 col-md-8 Register_account_input"
								></input>
							</div>
							<div className="form-group row">
								<label id="Register_acc_confirm_password_label" className="col-form-label col-5 col-sm-4 col-md-3 Register_account_label text-center text-lg-left">Confirm Password</label>
								<input id="Register_acc_confirm_password" placeholder="Confirm Your Password" type="password"
									value={this.state.value} onChange={this.handleInputChange}
									className="form-control offset-sm-1 col-7 col-md-8 Register_account_input"
								></input>
							</div>
							<div className="form-group row">
								<label id="Register_acc_email_label" className="col-form-label col-5 col-sm-4 col-md-3 Register_account_label text-center text-lg-left">private email</label>
								<input id="Register_acc_email" placeholder="notify you when account is successfully activate" type="text"
								 value={this.state.value} onChange = {this.handleInputChange}
								 className="form-control offset-sm-1 col-7 col-md-8 Register_account_input"
								 ></input>
							</div>
							<div className="form-group row">
								<label id="Register_acc_image_label" className="col-form-label col-5 col-sm-4 col-md-3 Register_account_label text-center text-lg-left">Upload Image</label>
								<label className="col-form-label offset-sm-1">
								<input 	id="Register_acc_fileinput" 
										type="file" 
										onChange={this.handleImageChange} 
										name="file"
										className="form-control col-7 col-md-8 Register_account_input"/>
								<span id="Register_acc_addImage_icon" className="Register_account_input">➕ <p style={{display:"inline"}}>Add Your ID Photo</p></span>
								</label>
							</div>
							
							<div className="d-flex justify-content-center mx-auto">
								<button id="Register_acc_register_button" onclick={this.handleSubmit} className="btn">
									Register
								</button>
							</div>
						</div>
						
						
						<div id="Register_acc_FAQ" className="col-xl-3 d-xl-inline-block d-none ml-0 float-xl-right mt-5 mr-5">
							<div id="Register_acc_FAQ_title">FAQ</div>
							<div id="Register_acc_splitline"></div>
							<div id="Register_acc_FAQ_content">
								<ul id="Register_acc_FAQ_list">
									<li>ID photo should contain your <em>full name</em> and <em>intact, clear face</em>.</li>
									<li>ID photo is used to confirm your identity, and will be auto deleted after account is activated</li>
									<li>The size of photo is at most 1MB.</li>
									<li>...</li>
								</ul>
							</div>
							<div id="Register_acc_FAQ_title">Image Preview</div>
							<div id="Register_acc_splitline"></div>
							<div id="Register_imgPreview" className="mt-3 mb-5">
									{$imagePreview}
							</div>
						</div>

						<div id="Register_acc_FAQ" className="d-block d-xl-none ml-0 float-xl-right mt-5">
							<div id="Register_acc_FAQ_title">Image Preview</div>
							<div id="Register_acc_splitline"></div>
							<div id="Register_imgPreview">
									{$imagePreview}
							</div>
							<div id="Register_acc_FAQ_title">FAQ</div>
							<div id="Register_acc_splitline"></div>
							<div id="Register_acc_FAQ_content" className="mt-3 mb-5">
								<ul id="Register_acc_FAQ_list">
									<li>ID photo should contain your <em>full name</em> and <em>intact, clear face</em>.</li>
									<li>ID photo is used to confirm your identity, and will be auto deleted after account is activated</li>
									<li>The size of photo is at most 1MB.</li>
									<li>...</li>
								</ul>
							</div>
							
							
						</div>
					</form>
				
                </div>
				
                
            </div>
        )
    }
}
export default Register_account