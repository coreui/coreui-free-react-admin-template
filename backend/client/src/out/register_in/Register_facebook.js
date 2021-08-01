import React, { Component } from 'react';
import axios from 'axios';
import { NavBar } from '../../component/AppBar';
import {withRouter} from 'react-router-dom'

class Register_facebook extends Component{
	constructor(props) {
		super(props);
		this.state = {
			Register_acc_realname: '',
			Register_acc_student_id: '',
		  	Register_facebook_id: props.location.id,
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

		var r=window.confirm("Are you sure to register via Facebook account?");
		if(r){
			var data = new FormData();
			data.append('file',this.state.file)
			data.append('username',this.state.Register_acc_realname)
			data.append('account',this.state.Register_acc_student_id)
			data.append('facebookID', this.state.Register_facebook_id)

			const config = {
				headers: {
					'content-type': 'multipart/form-data'
				}
			};
			
			axios.post("/api/registerFB",
				data, config
			).then(res => {//{username}
				alert('Successfully registered!');
				window.location = "/Login";
			}).catch(err=>{
				(err.response.data.description) && alert('錯誤\n'+err.response.data.description);
			})
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
                    <h1 id="Register_acc_table_title">Just A Few Steps to Join EE+ With Facebook!</h1>
					<form onSubmit={this.handleSubmit}>
						<div id="Register_acc_table" className="col-11 col-xl-8 mt-5 mr-0 d-xl-inline-block mx-auto">
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
									className="form-control col-7 col-md-8 offset-sm-1 Register_account_input"
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
export default withRouter(Register_facebook)