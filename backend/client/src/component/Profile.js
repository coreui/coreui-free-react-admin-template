import React, {Component} from 'react'
import './Profile.css';
import show_more from '../images/show_more.png';
import show_less from '../images/show_less.png';
import Job_row from '../component/Job_row';
import Scrollbar from 'react-scrollbars-custom';


class Profile_for_search extends Component{
    constructor(props){
        
        super(props)
        this.state={
            userdata:{},
        }
        this.expandDiploma = this.expandDiploma.bind(this);

    }

    componentWillMount(){
        // const template = {
        //     userimage:'',
        //     Linkedin:'',
        //     account:'',
        //     education : {
        //         doctor:{
        //             SD:''
        //         },
        //         double_major:{
        //             SD:''
        //         },
        //         major:{
        //             SD:''
        //         },
        //         master:{
        //             SD:''
        //         },
        //         minor:{
        //             SD:''
        //         }
        //     },
        //     Occupation:[],
        //     facebook:'',
        //     nickname:'',
        //     office:'',
        //     profile:'',
        //     publicEmail:'',
        //     username:'',
        //     web:'',
        // }

        const {handle} = this.props.match.params
        const {userdata} = this.props.location.state

        console.log(userdata)
        //const {prevstate} = this.props.location.prevstate

        // for (let catalog in userdata){
        //     if (catalog==='education'){
        //         for (let diploma in userdata[catalog]){
        //             template[catalog][diploma]['SD'] = userdata[catalog][diploma]['SD'] ? userdata[catalog][diploma]['SD'] : ''
        //         }
        //     if (catalog==='Occupation')
        //         userdata.catalog.forEach(
        //             CPO=>{
        //                 template.catalog.push(CPO)}
        //         )
        //     }else
        //         {
        //             template[catalog] = userdata[catalog] ? userdata[catalog] : '';

            
        // }
        // }
        this.setState({
            userdata:userdata
        })
        // console.log(this.state.userdata)
    }
    componentWillUnmount(){
        console.log('Jump!')
        this.props.history.push({
            pathname: '/in/Search',
            state: this.state.userdata.prevstate
          });
        this.props.history.goBack()
    }
    expandDiploma(elem,elemDown,elemIcon,downheight,origheight){
        let expand_icon = document.getElementById(elemIcon);
        let expand_icon_parent = expand_icon.parentNode;
        let expand_elem = document.getElementById(elem);
        let moving_elem = document.getElementById(elemDown);
        let show_more_icon = function(){
            let icon = document.createElement("img");
            icon.setAttribute("src",show_more);
            icon.setAttribute("alt","show_more");
            icon.setAttribute("id",elemIcon);
            icon.setAttribute("class","Profile_for_search_expand_icon");
            return icon;
        }
        let show_less_icon = function(){
            let icon = document.createElement("img");
            icon.setAttribute("src",show_less);
            icon.setAttribute("alt","show_less");
            icon.setAttribute("id",elemIcon);
            icon.setAttribute("class","Profile_for_search_expand_icon");
            return icon;
        }

        if (expand_icon.alt==="show_more"){
            expand_icon_parent.replaceChild(show_less_icon(),expand_icon);
            moving_elem.style.marginTop = downheight;
            moving_elem.style.transitionDuration = "0.5s";
            expand_elem.style.transitionDuration = "0.5s";
            expand_elem.style.transitionProperty = "opacity";
            setTimeout(()=>{
                expand_elem.style.display = "block";
            },1);
            expand_elem.style.opacity = "0";
            setTimeout(()=>{
                expand_elem.style.opacity="1";
                //this.checkboxDisplay();
            },100);
            
        }else{
            expand_icon_parent.replaceChild(show_more_icon(),expand_icon);
            moving_elem.style.transitionDuration = "0.5s";
            expand_elem.style.transitionDuration = "0.5s";
            moving_elem.style.marginTop = origheight;
            expand_elem.style.opacity = "0";
            //this.checkboxDisplay();
            setTimeout(()=>{
                expand_elem.style.display = "none";
            },500);

        }
        
    };
    render(){
        let userdata = this.state.userdata;
        let $new_jobs = [];
        userdata.Occupation.forEach(
            CPO=>{
                $new_jobs.push(<Job_row CPO={CPO}/>)
            }
        )
        const renderThumb = ({ style, ...props }) => {
			const thumbStyle = {
			borderRadius: 6,
			backgroundColor: 'rgba(192,192,200, 0.5)'
			};
			return <div style={{ ...style, ...thumbStyle }} {...props} />;}
        return(
            <Scrollbar renderThumbVertical={renderThumb}>
            <div id="Profile_for_search_container">
                <div id="hr0">Profile</div>
                <div id="Profile_for_search_information">
                {/* <p id="Profile_for_search_public">Public</p> */}
                {/* <form id="Profile_for_search_loginform" onSubmit={this.handleSubmit}> */}
                    <div id="Profile_for_search_userimage_container">
					{/*$imagePreview*/}
						<img src={userdata.userimage} id="Profile_for_search_userimage"></img>
                        {/* <label id="Profile_for_search_userimage_change">
                        <input type="file"
                         onChange = {this.handleImageChange}
                         name = "userimage"
						 accept = "image/*"
                         style = {{display:"none"}}></input>
                         <span id="Profile_for_search_addImage_icon"><br/>➕ <p style={{display:"inline",fontSize:"14px"}}>Add Head Shot</p></span>
                        </label> */}
                    </div>
                    
                    <div id="Profile_for_search_info">
                        <div id="Profile_for_search_name">
                            <ul className="Profile_for_search_ul" id="Profile_for_search_name_list">
                                <li><p id="Profile_for_search_realname_tag">RealName:</p>
                            {/* <input type="checkbox" id="Profile_for_search_realname_checkbox" 
							checked = {this.state.realname_checkbox}
                            onChange = {this.handleCheckChange}
							name="realname_checkbox"></input> */}
                            <input type="text" id="Profile_for_search_realname" value = {userdata.username}  name="realname" disabled></input>
                                </li>
                                <li style={{marginBottom:"8vh"}}>
                                <p id="Profile_for_search_nickname_tag">Nickname:</p>
                            {/* <input type="checkbox" id="Profile_for_search_nickname_checkbox"
							checked = {this.state.nickname_checkbox}
                            onChange = {this.handleCheckChange}
							name="nickname_checkbox"></input> */}
                            <input type="text" id="Profile_for_search_nickname" value = {userdata.nickname} name="nickname" disabled></input>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <p id="Profile_for_search_shortintro_tag">Introduction:</p>
                            <textarea id="Profile_for_search_shortintro" name="shortintro" value = {userdata.profile} disabled></textarea>
                        </div>
                    </div>
                    <div id="hr1">How to Contact</div> 
                    <div id="Profile_for_search_more_info" style={{paddingBottom:"10vh"}}>
                        <ul className="Profile_for_search_ul" id="Profile_for_search_contact_us">
                            <li>
                                <p id="Profile_for_search_email_tag">E-mail:</p>
                                {/* <input type="checkbox"
						checked = {this.state.email_checkbox}
                        onChange = {this.handleCheckChange}
						name="email_checkbox"
						        ></input> */}
                                <input type="email" id="Profile_for_search_email" value = {userdata.publicEmail} name="email" disabled></input>
                            </li>
                            {/* <li>
                            <p id="Profile_for_search_address_tag">Living Address:</p>
                        {/* <input type="checkbox"
							checked = {this.state.address_checkbox}
							onChange = {this.handleCheckChange}
							name="address_checkbox"
						></input> 
                        <input type="address" id="address" value = {this.state.address} onChange = {this.handleInputChange} name="address"></input>
                            </li> */}
                            <li>
                            <p id="Profile_for_search_phone_company_tag">Phone(Company):</p>
                        <button className="Profile_for_search_expand_button" 
							onClick={(e)=>{
								e.preventDefault();
								this.expandDiploma("Profile_for_search_expand_phone","hr4","Profile_for_search_expand_icon_1","5vh","0vh")}}>
								<img className="Profile_for_search_expand_icon" id="Profile_for_search_expand_icon_1" src={show_more} alt="show_more">
								</img>
						</button>
                        {/* <input type="checkbox"
							checked = {this.state.phone_company_checkbox}
							onChange = {this.handleCheckChange}
							name="phone_company_checkbox"
						></input> */}
                        <input id="Profile_for_search_phone_company" value = {userdata.office}  name="phone_company" disabled></input>
                            </li>
                        </ul>
                        <div id="Profile_for_search_expand_phone">
                            <ul className="Profile_for_search_ul" id="Profile_for_search_phone_list">
                                <li>
                                <p id="Profile_for_search_phone_home_tag">Phone(Home):</p>
                        {/* <input type="checkbox"
							checked = {this.state.phone_home_checkbox}
							onChange = {this.handleCheckChange}
							name="phone_home_checkbox"
						></input> */}
                        <input id="Profile_for_search_phone_home" value = {userdata.homephone}  name="phone_home" disabled></input>
                                </li>
                                <li>
                                <p id="Profile_for_search_mobile_tag">Mobile:</p>
                        {/* <input type="checkbox"
							checked = {this.state.mobile_checkbox}
							onChange = {this.handleCheckChange}
							name="mobile_checkbox"
						></input> */}
                        <input id="Profile_for_search_mobile" value = {userdata.cellphone}  name="mobile" disabled></input>
                                </li>
                            </ul>
                        </div>
                    
                        <div id="hr4">Social Media</div>
                        <div id="Profile_for_search_social_media">
                            <ul className="Profile_for_search_ul" id="Profile_for_search_social_media_list">
                                <li>
                                <p id="Profile_for_search_FB_tag">Facebook:</p>
                        <button className="Profile_for_search_expand_button" 
                                                onClick={(e)=>{
                                                    e.preventDefault();
                                                    this.expandDiploma("Profile_for_search_expand_social_media","hr2","Profile_for_search_expand_icon_2","5vh","2vh")}}>
                                                    <img className="Profile_for_search_expand_icon" id="Profile_for_search_expand_icon_2" src={show_more} alt="show_more">
                                                    </img>
                                                </button>
                        {/* <input type="checkbox"
							checked = {this.state.facebook_checkbox}
							onChange = {this.handleCheckChange}
							name="facebook_checkbox"
						></input> */}
                        <input id="Profile_for_search_FB" value = {userdata.facebook} name="facebook" disabled></input>
                                </li>
                            </ul>
                            <div id="Profile_for_search_expand_social_media">
                                <ul className="Profile_for_search_ul">
                                    <li>
                                    <p id="Profile_for_search_personal_website_tag">Blog:</p>
                        {/* <input type="checkbox"
							checked = {this.state.personal_website_checkbox}
							onChange = {this.handleCheckChange}
							name="personal_website_checkbox"
						></input> */}
                        <input id="Profile_for_search_personal_website" value = {userdata.web} name="personal_website" disabled></input>
                                    </li>
                                    <li>
                                    <p id="Profile_for_search_Linkedin_tag">Linkedin:</p>
                        {/* <input type="checkbox"
							checked = {this.state.Linkedin_checkbox}
							onChange = {this.handleCheckChange}
							name="Linkedin_checkbox"
						></input> */}
                        <input id="Profile_for_search_Linkedin" value = {userdata.LinkedIn} name="Linkedin" disabled></input>
                                    </li>
                                </ul>
                            </div>
                        </div>
                <div style={{display:'inline-block',width:'45vw',position:'absolute',top:'-5vh',left:'50vw'}}>
                <div id="hr2">Diploma</div>
                        <div id="Profile_for_search_diploma_container">
                            <ul className="Profile_for_search_ul" id="Profile_for_search_diploma_list">
                                <li>
                                    Bachelor Major:
                                    <button className="Profile_for_search_expand_button"
                                                onClick={(e)=>{
                                                    e.preventDefault();
                                                    this.expandDiploma("Profile_for_search_expand_diploma","hr3","Profile_for_search_expand_icon_3","5vh","2vh")
                                                    
                                                    }}>
                                                    <img className="Profile_for_search_expand_icon" id="Profile_for_search_expand_icon_3" src={show_more} alt="show_more">
                                                    </img>
                                                </button>
                                    <input id="Profile_for_search_diploma_bachelor_major" value = {userdata.education.major.SD} name="diploma_bachelor_major" disabled></input>
                                    {/* <input type="checkbox" id="Profile_for_search_diploma_major_checkbox"
                                                className = "Profile_for_search_diploma_checkbox"
												checked = {this.state.major_checkbox}
												onChange = {this.handleCheckChange}
                                                name="major_checkbox"></input> */}
                                    
                                </li>
                                <div id="Profile_for_search_expand_diploma">
                                    <li style={{marginTop:"7vh"}}>
                                        Double:
                                        <input className="Profile_for_search_input_nonfloat" id="Profile_for_search_diploma_bachelor_double_major" value = {userdata.education.double_major.SD} name="diploma_bachelor_double_major" disabled></input>
                                        <span style={{marginLeft:"2vw"}}>Minor:</span>
                                        <input className="Profile_for_search_input_nonfloat" id="diploma_bachelor_minor" value = {userdata.education.minor.SD} name="diploma_bachelor_minor" disabled></input>
                                        {/* <input type="checkbox" 
                                                    className="Profile_for_search_diploma_checkbox"
                                                    checked = {this.state.dm_checkbox}
                                                    onChange = {this.handleCheckChange}
                                                name="dm_checkbox"
                                                ></input> */}
                                    </li>
                                    <li>
                                        Master:
                                        <input id="Profile_for_search_diploma_master" value = {userdata.education.master.SD} name="diploma_master" disabled></input>
                                        {/* <input type="checkbox" 
                                                    className="Profile_for_search_diploma_checkbox"
                                                    checked = {this.state.master_checkbox}
                                                    onChange = {this.handleCheckChange}
                                                    name="master_checkbox"
                                                    ></input> */}
                                    </li>
                                    <li>
                                        Doctor:
                                        <input id="Profile_for_search_diploma_doctor" value = {userdata.education.doctor.SD} name="diploma_doctor" disabled></input>
                                        {/* <input type="checkbox" 
                                                    className="Profile_for_search_diploma_checkbox"
                                                    checked = {this.state.doctor_checkbox}
                                                    onChange = {this.handleCheckChange}
                                                    name="doctor_checkbox"     
                                        ></input> */}
                                    </li>
                                </div>
                            </ul>
                            </div>
                        
                        <div id="hr3">Work Experience</div>
                        <div id="Profile_for_search_occupation_container">
                            <table id="Profile_for_search_occupation_table" cellPadding="9">
                                <thead >
                                    <tr style={{borderBottom:"2px white solid"}}>
                                        <th>Occupation</th>
                                        <th>Position</th>
                                        <th>Company</th>
                                        {/* <th>
                                        <button onClick={(e)=>{
											e.preventDefault();
											this.addOccupation(false);
										}} id="Profile_for_search_addOccupation"><img src={add_icon} alt="add_icon" className="Profile_for_search_remove_icon"></img></button>
                                        </th> */}
                                    </tr>
                                    {$new_jobs}
                                </thead>
                            </table>
                            <div style={{marginTop:"5%",height:"7vh"}}>
                                <p>Job ID</p>
                                <input id="Profile_for_search_JobID" name="JobID" value = {this.state.JobID} disabled></input>
                                {/* <input id="Profile_for_search_submit_btn" type="submit" value="Update Profile" /> */}
                            </div>
                            </div>
                        </div>         
                   
                    </div>
                    
                </div>
                {/* </form> */}
                
                </div>
                </Scrollbar>
        )
    }
    
}
export default Profile_for_search;