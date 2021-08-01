import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./profile.css";
import data from "../images/public_images.json";
// import default_image from "../images/default_image.png";
// import remove_icon from "../images/remove_icon.png";
// import add_icon from "../images/add_icon.png";
// import show_less from "../images/show_less.png";
// import show_more from "../images/show_more.png";
// import edit from "../images/edit.png";
import {
  handleImageChange,
  handleCheckChange,
  handleInputChange,
} from "./profileFunc/handleChange";
import { showVisual, handleSubmit } from "./profileFunc/showAndSubmit.js";
import { map } from "./profileFunc/map";
import {OccupationTable,Header, HeadShot, Diploma,Profile_info, Contact, SocialMedia} from './profileComp/Main';
import handleWorkChange from './profileFunc/handleWorkChange';
import rmOccupation from './profileFunc/rmOccupation';

//import { NavBar } from '../component/AppBar';
//import ReactDOM from 'react-dom';
//const remove_icon = <svg t="1582553044501" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="2vw" height="2vw"><path d="M512 938.666667C276.362667 938.666667 85.333333 747.637333 85.333333 512S276.362667 85.333333 512 85.333333s426.666667 191.029333 426.666667 426.666667-191.029333 426.666667-426.666667 426.666667z m0-64c200.298667 0 362.666667-162.368 362.666667-362.666667S712.298667 149.333333 512 149.333333 149.333333 311.701333 149.333333 512s162.368 362.666667 362.666667 362.666667zM352 480h320a32 32 0 0 1 0 64H352a32 32 0 0 1 0-64z" p-id="2601" fill="#1296db" data-spm-anchor-id="a313x.7781069.0.i1" class="selected"></path></svg>
/*const makeSVG = function(tag,attrs){
    let el = document.createElementNS('http://www.w3.org/2000/svg',tag);
    for (var k in attrs){
        el.setAttribute(k,attrs[k]);
        
    }
    return el;
}*/

class Profile extends Component {
  constructor(props) {
    super(props);
    const hasChanged = {work:false};
    map.forEach(([element,..._]) => {
      hasChanged[element] = false;
    });

    this.state = {
      editmode: false,
      //clicktime : 0,
      userimage: data.default_image,
      imagePreviewUrl: "",
      realname: "",
      nickname: "",
      email: "",
      phone_company: "",
      phone_home: "",
      mobile: "",
      address: "",
      personal_website: "",
      facebook: "",
      Linkedin: "",
      diploma_bachelor_major: "",
      diploma_bachelor_minor: "",
      diploma_bachelor_double_major: "",
      diploma_master: "",
      diploma_doctor: "",
      shortintro: "",
      work:[],
      hasChanged
    };

    this.handleInputChange = handleInputChange.bind(this);
    this.handleCheckChange = handleCheckChange.bind(this);
    this.handleImageChange = handleImageChange.bind(this);
    this.handleWorkChange = handleWorkChange.bind(this);
    this.rmOccupation = rmOccupation.bind(this);
    this.showVisual = showVisual.bind(this);
    this.handleSubmit = handleSubmit.bind(this);

    this.expandDiploma = this.expandDiploma.bind(this);
    //this.checkboxDisplay = this.checkboxDisplay.bind(this)
  }

  expandDiploma(elem, elemDown, elemIcon, downheight, origheight) {
    let expand_icon = document.getElementById(elemIcon);
    let expand_icon_parent = expand_icon.parentNode;
    let expand_elem = document.getElementById(elem);
    let moving_elem = document.getElementById(elemDown);
    let show_more_icon = function () {
      let icon = document.createElement("img");
      icon.setAttribute("src", data.show_more);
      icon.setAttribute("alt", "show_more");
      icon.setAttribute("id", elemIcon);
      icon.setAttribute("class", "Profile_expand_icon");
      return icon;
    };
    let show_less_icon = function () {
      let icon = document.createElement("img");
      icon.setAttribute("src", data.show_less);
      icon.setAttribute("alt", "show_less");
      icon.setAttribute("id", elemIcon);
      icon.setAttribute("class", "Profile_expand_icon");
      return icon;
    };

    if (expand_icon.alt === "show_more") {
      expand_icon_parent.replaceChild(show_less_icon(), expand_icon);
      moving_elem.style.marginTop = downheight;
      moving_elem.style.transitionDuration = "0.5s";
      expand_elem.style.transitionDuration = "0.5s";
      expand_elem.style.transitionProperty = "opacity";
      setTimeout(() => {
        expand_elem.style.display = "block";
      }, 1);
      expand_elem.style.opacity = "0";
      setTimeout(() => {
        expand_elem.style.opacity = "1";
        //this.checkboxDisplay();
      }, 100);
    } else {
      expand_icon_parent.replaceChild(show_more_icon(), expand_icon);
      moving_elem.style.transitionDuration = "0.5s";
      expand_elem.style.transitionDuration = "0.5s";
      moving_elem.style.marginTop = origheight;
      expand_elem.style.opacity = "0";
      //this.checkboxDisplay();
      setTimeout(() => {
        expand_elem.style.display = "none";
      }, 500);
    }
  }
  /*checkboxDisplay(){
        let checkboxs = document.getElementsByClassName("Profile_diploma_checkbox");
        console.log(checkboxs)
        if(document.getElementById("Profile_expand_icon_3").alt === "show_more"){
            console.log("show_more");
            [...checkboxs].forEach(checkbox => checkbox.style.display = "none");
            
            
            

        }else{
            console.log("show_less");
            [...checkboxs].forEach(checkbox => checkbox.style.display = "block");
        }
    }*/


  editMode = (wantEdit) => {
    let input_list = document.getElementsByClassName("Profile_info_input");
    let textarea = document.getElementById("Profile_shortintro");
    let headshot = document.getElementById("Profile_head_shot");
    if (!wantEdit) {
      for (let i = 0; i < input_list.length; i++) {
        input_list[i].setAttribute("readOnly", !wantEdit);
      }
      textarea.setAttribute("disabled", !wantEdit);
      headshot.setAttribute("disabled", !wantEdit);
    } else {
      for (let i = 0; i < input_list.length; i++) {
        input_list[i].removeAttribute("readOnly");
      }
      textarea.removeAttribute("disabled");
      headshot.removeAttribute("disabled");
    }

    this.setState({ editmode: wantEdit })
    // input.setAttribute("readOnly",!wantEdit)
  };

  componentWillMount() {
    this.showVisual();
  }

  componentDidMount() {
    this.editMode(false);
  }

  // shouldComponentUpdate(nextProps, nextState){
  //     if (nextState.editmode){
  //         return true
  //     }else{
  //         return false
  //     }
  // }

  render() {
    return (
      <div id="Profile_container">
        <Header
          onClick={(e)=>{
            e.preventDefault()
            this.editMode(true)
          }}
        />
        <div id="Profile_information" className="container-fluid mb-5">
          {/* <p id="Profile_public">Public</p> */}
          <form
            id="Profile_loginform"
            onSubmit={(e) => {
              this.handleSubmit(e);
              this.editMode(false);
            }}
          >
            <HeadShot 
              {...this.state}
              handleImageChange={this.handleImageChange}
            />
            <Profile_info
              {...this.state}
              handleInputChange={this.handleInputChange}
              handleCheckChange={this.handleCheckChange}
            />
            
            <div id="hr1" className="Profile_hr">
              How to Contact
            </div>
            <div id="Profile_more_info">
              <Contact
                {...this.state}
                handleInputChange={this.handleInputChange}
                handleCheckChange={this.handleCheckChange}
                expandElement={this.expandDiploma}
              />
              <div id="hr4" className="Profile_hr">
                Social Media
              </div>
              <SocialMedia
                {...this.state}
                handleInputChange={this.handleInputChange}
                handleCheckChange={this.handleCheckChange}
                expandElement={this.expandDiploma}
              />
              <div id="hr2" className="Profile_hr">
                Diploma
              </div>
              <Diploma
                {...this.state}
                handleInputChange={this.handleInputChange}
                handleCheckChange={this.handleCheckChange}
                expandElement={this.expandDiploma}
              />
              <div id="hr41" className="Profile_hr">
                Work Experience
              </div>
              <div id="Profile_occupation_container" className="mt-1">
                <OccupationTable
                  addOcp={(e)=>{
                      e.preventDefault()
                      this.setState(state=>({work:[...state.work,{O:"",P:"",C:"",show:true}],
                          hasChanged:{...state.hasChanged,work:true}
                      }))
                  }}
                  {...this.state}
                  handleWorkChange={this.handleWorkChange}
                  handleCheckChange={this.handleCheckChange}
                  rmOccupation={this.rmOccupation}
                />
                {/* <div className="form-group row mx-auto">
                  <label className="col-form-label col-4 Profile_info_label">
                    JobID
                  </label>
                  <input
                    id="Profile_JobID"
                    className="form-control col-7 col-md-6 col-xl-5 offset-1 offset-md-2 offset-xl-3 Profile_info_input"
                    name="JobID"
                    value={this.state.JobID}
                    onChange={this.handleInputChange}
                  ></input>
                </div> */}
              </div>
              <div className="d-flex justify-content-center mt-5">
                <input
                  id="Profile_submit_btn"
                  className="btn"
                  type="submit"
                  value="Update Profile"
                />
              </div>
            </div>
          </form>
        </div>

        {/*<div id="Profile_latest_news">
                    <h2 style={{marginTop:"0"}}>Latest News:</h2>
                    <div id="Profile_divider"></div>
                    <div id="Profile_news_renderer">
                        <a id="Profile_subtitle1" href="#">Subtitle1...</a>
                        <p id="Profile_date1">Date1</p>
                        <a id="Profile_subtitle2" href="#">Subtitle2...</a>
                        <p id="Profile_date2">Date2</p>
                        <a id="Profile_subtitle3" href="#">Subtitle3...</a>
                        <p id="Profile_date3">Date3</p>
                    </div>

        </div>*/}
      </div>
    );
  }
}
export default Profile;
