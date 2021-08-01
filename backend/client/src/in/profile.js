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
    var tmpCh = {};
    map.forEach((element) => {
      tmpCh[element[0]] = false;
    });

    this.state = {
      Occupation_number: 0,
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
      work_O_1: "",
      work_P_1: "",
      work_C_1: "",

      work_O_2: "",
      work_P_2: "",
      work_C_2: "",

      work_O_3: "",
      work_P_3: "",
      work_C_3: "", //will add button to add work experience
      hasChanged: tmpCh,
    };

    this.handleInputChange = handleInputChange.bind(this);
    this.handleCheckChange = handleCheckChange.bind(this);
    this.handleImageChange = handleImageChange.bind(this);

    this.showVisual = showVisual.bind(this);
    this.handleSubmit = handleSubmit.bind(this);

    this.expandDiploma = this.expandDiploma.bind(this);
    this.addOccupation = this.addOccupation.bind(this);
    this.removeOccupation = this.removeOccupation.bind(this);
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
  addOccupation(haveVal) {
    //e.preventDefault();
    if (haveVal) {
      var toSet = { Occupation_number: this.state.Occupation_number + 1 };
    } else {
      var toSet = {
        Occupation_number: this.state.Occupation_number + 1,
        [`work_O_${this.state.Occupation_number + 1}`]: "",
        [`work_P_${this.state.Occupation_number + 1}`]: "",
        [`work_C_${this.state.Occupation_number + 1}`]: "",
      };
    }
    this.setState(toSet, function () {
      var OT = document.getElementById("Profile_occupation_table");
      //var i;
      let num = this.state.Occupation_number;
      console.log("num", num);
      var new_tr = document.createElement("tr");
      new_tr.setAttribute("id", `Profile_occupation_row_${num}`);
      new_tr.setAttribute("name", `work_${num}`);
      var new_input_O = document.createElement("input");
      var new_input_P = document.createElement("input");
      var new_input_C = document.createElement("input");
      var remove_btn = document.createElement("button");
      new_input_O.onchange = this.handleInputChange;
      new_input_P.onchange = this.handleInputChange;
      new_input_C.onchange = this.handleInputChange;
      remove_btn.onclick = this.removeOccupation;
      new_input_O.setAttribute("name", `work_O_${num}`);
      new_input_P.setAttribute("name", `work_P_${num}`);
      new_input_C.setAttribute("name", `work_C_${num}`);
      new_input_O.setAttribute("value", this.state[`work_O_${num}`]);
      new_input_P.setAttribute("value", this.state[`work_P_${num}`]);
      new_input_C.setAttribute("value", this.state[`work_C_${num}`]);
      new_input_O.setAttribute(
        "class",
        "Profile_info_table_input Profile_info_input"
      );
      new_input_P.setAttribute(
        "class",
        "Profile_info_table_input Profile_info_input"
      );
      new_input_C.setAttribute(
        "class",
        "Profile_info_table_input Profile_info_input"
      );
      if (!this.state.editmode) {
        new_input_O.setAttribute("readOnly", true);
        new_input_P.setAttribute("readOnly", true);
        new_input_C.setAttribute("readOnly", true);
      }
      remove_btn.setAttribute("id", "Profile_removeOccupation");
      var new_img = document.createElement("img");
      new_img.setAttribute("src", data.remove_icon);
      new_img.setAttribute("class", "Profile_remove_icon");
      new_img.setAttribute("alt", "remove_icon");
      remove_btn.appendChild(new_img);
      //remove_btn.innerHTML = remove_icon;
      //var new_td;
      let new_td_1 = document.createElement("td");
      new_td_1.appendChild(new_input_O);
      new_tr.appendChild(new_td_1);
      let new_td_2 = document.createElement("td");
      new_td_2.appendChild(new_input_P);
      new_tr.appendChild(new_td_2);
      let new_td_3 = document.createElement("td");
      new_td_3.appendChild(new_input_C);
      new_tr.appendChild(new_td_3);
      let new_td_4 = document.createElement("td");
      new_td_4.appendChild(remove_btn);
      new_tr.appendChild(new_td_4);

      OT.appendChild(new_tr);
    });
  }

  removeOccupation(e) {
    e.preventDefault();

    var delete_tr = e.target.parentNode.parentNode.parentNode;
    var delete_tr_parent = delete_tr.parentNode;
    console.log("toDelete name", delete_tr.getAttribute("name"));
    var hasChanged = { ...this.state.hasChanged };
    hasChanged[delete_tr.getAttribute("name")] = true;
    this.setState({ hasChanged });

    delete_tr_parent.removeChild(delete_tr);
  }

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

    // this.setState({ editmode: wantEdit })
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
        <div id="hr0" className="ml-1 mt-2 d-flex justify-content-between">
          <p className="Profile_main_title">Profile Setting</p>
          <button
            className="btn Profile_edit_btn pl-0"
            onClick={(e) => {
              e.preventDefault();
              this.editMode(true);
            }}
          >
            <img src={data.edit} className="img-fluid Profile_edit_icon" />
            <p className="d-none d-sm-inline">Edit</p>
          </button>
        </div>
        <div id="Profile_information" className="container-fluid mb-5">
          {/* <p id="Profile_public">Public</p> */}
          <form
            id="Profile_loginform"
            onSubmit={(e) => {
              this.handleSubmit(e);
              this.editMode(false);
            }}
          >
            <div id="Profile_userimage_container" className="mt-3">
              <div className="d-flex justify-content-center">
                <img
                  src={this.state.imagePreviewUrl}
                  id="Profile_userimage"
                  className="img-fluid"
                ></img>
              </div>
              <label
                id="Profile_userimage_change"
                className="mt-2 d-flex justify-content-center"
              >
                <input
                  type="file"
                  id="Profile_head_shot"
                  onChange={this.handleImageChange}
                  name="userimage"
                  accept="image/*"
                  style={{ display: "none" }}
                ></input>
                <span id="Profile_addImage_icon">
                  ➕<p style={{ display: "inline" }}>Add Head Shot</p>
                </span>
              </label>
            </div>

            <div id="Profile_info">
              <div id="Profile_name" className="mb-4">
                <div className="form-group row mx-auto">
                  <label className="col-form-label Profile_info_label col-4">
                    Realname:
                  </label>
                  {/* <input type="checkbox" id="Profile_realname_checkbox" 
                                    checked = {this.state.realname_checkbox}
                                    onChange = {this.handleCheckChange}
                                    name="realname_checkbox" ></input> */}
                  <input
                    type="text"
                    className="form-control Profile_info_input col-7 col-md-6 col-xl-5 offset-1 offset-md-2 offset-xl-3"
                    value={this.state.realname}
                    onChange={this.handleInputChange}
                    name="realname"
                  ></input>
                </div>
                <div className="form-group row mx-auto">
                  <label className="col-form-label Profile_info_label col-4">
                    Nickname:
                  </label>
                  {/* <input type="checkbox" id="Profile_nickname_checkbox"
                                    checked = {this.state.nickname_checkbox}
                                    onChange = {this.handleCheckChange}
                                    name="nickname_checkbox"></input> */}
                  <input
                    type="text"
                    className="form-control Profile_info_input col-7 col-md-6 col-xl-5 offset-1 offset-md-2 offset-xl-3"
                    value={this.state.nickname}
                    onChange={this.handleInputChange}
                    name="nickname"
                  ></input>
                </div>
              </div>
              <div>
                <p className="Profile_info_label">Talk about yourself:</p>
                <textarea
                  id="Profile_shortintro"
                  name="shortintro"
                  placeholder="briefly introduce yourself!"
                  value={this.state.shortintro}
                  onChange={this.handleInputChange}
                ></textarea>
              </div>
            </div>
            <div id="hr1" className="Profile_hr">
              How to Contact
            </div>
            <div id="Profile_more_info">
              <div className="form-group row mx-auto">
                <label className="col-form-label col-4 Profile_info_label">
                  Email:
                </label>
                {/* <input type="checkbox"
                                    checked={this.state.email_checkbox}
                                    onChange={this.handleCheckChange}
                                    name="email_checkbox"
                                ></input> */}
                <input
                  type="email"
                  id="Profile_email"
                  className="form-control Profile_info_input col-7 col-md-6 col-xl-5 offset-1 offset-md-2 offset-xl-3"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  name="email"
                ></input>
              </div>
              <div className="form-group row mx-auto">
                <label className="col-form-label col-5 Profile_info_label">
                  Living Address:
                </label>
                {/* <input type="checkbox"
                                    checked={this.state.address_checkbox}
                                    onChange={this.handleCheckChange}
                                    name="address_checkbox"
                                ></input> */}
                <input
                  type="address"
                  className="form-control col-7 col-md-6 col-xl-5 offset-md-1 offset-xl-2 Profile_info_input"
                  id="address"
                  value={this.state.address}
                  onChange={this.handleInputChange}
                  name="address"
                ></input>
              </div>
              <div className="form-group row mx-auto">
                <label className="col-form-label col-5 Profile_info_label">
                  Phone(Office):
                </label>
                <button
                  className="Profile_expand_button"
                  onClick={(e) => {
                    e.preventDefault();
                    this.expandDiploma(
                      "Profile_expand_phone",
                      "hr4",
                      "Profile_expand_icon_1",
                      "2rem",
                      "0rem"
                    );
                  }}
                >
                  <img
                    className="Profile_expand_icon"
                    id="Profile_expand_icon_1"
                    src={data.show_more}
                    alt="show_more"
                  ></img>
                </button>
                {/* <input type="checkbox"
                                    checked={this.state.phone_company_checkbox}
                                    onChange={this.handleCheckChange}
                                    name="phone_company_checkbox"
                                ></input> */}
                <input
                  id="Profile_phone_company"
                  className="form-control col-5 ml-auto Profile_info_input"
                  value={this.state.phone_company}
                  onChange={this.handleInputChange}
                  name="phone_company"
                  onFocus={(e) => {
                    e.preventDefault();
                    this.expandDiploma(
                      "Profile_expand_phone",
                      "hr4",
                      "Profile_expand_icon_1",
                      "5vh",
                      "0vh"
                    );
                  }}
                ></input>
              </div>

              <div id="Profile_expand_phone">
                <div className="form-group row mx-auto">
                  <label className="col-form-label col-4 Profile_info_label">
                    Phone(Home):
                  </label>
                  {/* <input type="checkbox"
                                        checked={this.state.phone_home_checkbox}
                                        onChange={this.handleCheckChange}
                                        name="phone_home_checkbox"
                                    ></input> */}
                  <input
                    id="Profile_phone_home"
                    className="form-control col-7 col-md-6 col-xl-5 offset-1 offset-md-2 offset-xl-3 Profile_info_input"
                    value={this.state.phone_home}
                    onChange={this.handleInputChange}
                    name="phone_home"
                  ></input>
                </div>
                <div className="form-group row mx-auto">
                  <label className="col-form-label col-4 Profile_info_label">
                    Mobile:
                  </label>
                  {/* <input type="checkbox"
                                        checked={this.state.mobile_checkbox}
                                        onChange={this.handleCheckChange}
                                        name="mobile_checkbox"
                                    ></input> */}
                  <input
                    id="Profile_mobile"
                    className="form-control col-7 col-md-6 col-xl-5 offset-1 offset-md-2 offset-xl-3 Profile_info_input"
                    value={this.state.mobile}
                    onChange={this.handleInputChange}
                    name="mobile"
                  ></input>
                </div>
              </div>

              <div id="hr4" className="Profile_hr">
                Social Media
              </div>
              <div id="Profile_social_media">
                <div className="form-group row mx-auto">
                  <label className="col-form-label col-4 Profile_info_label">
                    Facebook:
                  </label>
                  <button
                    className="Profile_expand_button"
                    onClick={(e) => {
                      e.preventDefault();
                      this.expandDiploma(
                        "Profile_expand_social_media",
                        "hr2",
                        "Profile_expand_icon_2",
                        "2rem",
                        "1rem"
                      );
                    }}
                  >
                    <img
                      className="Profile_expand_icon"
                      id="Profile_expand_icon_2"
                      src={data.show_more}
                      alt="show_more"
                    ></img>
                  </button>
                  {/* <input type="checkbox"
                                        checked={this.state.facebook_checkbox}
                                        onChange={this.handleCheckChange}
                                        name="facebook_checkbox"
                                    ></input> */}
                  <input
                    id="Profile_FB"
                    className="form-control col-6 ml-auto Profile_info_input"
                    value={this.state.facebook}
                    onChange={this.handleInputChange}
                    name="facebook"
                    onFocus={(e) => {
                      e.preventDefault();
                      this.expandDiploma(
                        "Profile_expand_social_media",
                        "hr2",
                        "Profile_expand_icon_2",
                        "2rem",
                        "1rem"
                      );
                    }}
                  ></input>
                </div>

                <div id="Profile_expand_social_media">
                  <div className="form-group row mx-auto">
                    <label className="col-form-label col-4 Profile_info_label">
                      Blog:
                    </label>
                    {/* <input type="checkbox"
                                            checked={this.state.personal_website_checkbox}
                                            onChange={this.handleCheckChange}
                                            name="personal_website_checkbox"
                                        ></input> */}
                    <input
                      id="Profile_personal_website"
                      className="form-control col-7 col-md-6 col-xl-5 offset-1 offset-md-2 offset-xl-3 Profile_info_input"
                      value={this.state.personal_website}
                      onChange={this.handleInputChange}
                      name="personal_website"
                    ></input>
                  </div>
                  <div className="form-group row mx-auto">
                    <label className="col-form-label col-4 Profile_info_label">
                      Linkedin:
                    </label>
                    {/* <input type="checkbox"
                                            checked={this.state.Linkedin_checkbox}
                                            onChange={this.handleCheckChange}
                                            name="Linkedin_checkbox"
                                        ></input> */}
                    <input
                      id="Profile_Linkedin"
                      className="form-control col-7 col-md-6 col-xl-5 offset-1 offset-md-2 offset-xl-3 Profile_info_input"
                      value={this.state.Linkedin}
                      onChange={this.handleInputChange}
                      name="Linkedin"
                    ></input>
                  </div>
                </div>
              </div>
              <div id="hr2" className="Profile_hr">
                Diploma
              </div>
              <div id="Profile_diploma_container">
                <div className="form-group row mx-auto">
                  <label className="col-form-label col-4 Profile_info_label">
                    Bachelor Major:
                  </label>
                  <button
                    className="Profile_expand_button"
                    onClick={(e) => {
                      e.preventDefault();
                      this.expandDiploma(
                        "Profile_expand_diploma",
                        "hr41",
                        "Profile_expand_icon_3",
                        "1rem",
                        "1rem"
                      );
                    }}
                  >
                    <img
                      className="Profile_expand_icon"
                      id="Profile_expand_icon_3"
                      src={data.show_more}
                      alt="show_more"
                    ></img>
                  </button>
                  <input
                    id="Profile_diploma_bachelor_major"
                    className="form-control col-5 ml-auto offset-1 Profile_info_input"
                    value={this.state.diploma_bachelor_major}
                    onChange={this.handleInputChange}
                    name="diploma_bachelor_major"
                    onFocus={(e) => {
                      e.preventDefault();
                      this.expandDiploma(
                        "Profile_expand_diploma",
                        "hr41",
                        "Profile_expand_icon_3",
                        "1rem",
                        "1rem"
                      );
                    }}
                  ></input>
                  {/* <input type="checkbox" id="Profile_diploma_major_checkbox"
                                        className="Profile_diploma_checkbox"
                                        checked={this.state.major_checkbox}
                                        onChange={this.handleCheckChange}
                                        name="major_checkbox"></input> */}
                </div>
                <div id="Profile_expand_diploma">
                  <div className="form-group row mx-auto">
                    <label className="col-form-label col-4 Profile_info_label">
                      Double:
                    </label>
                    <input
                      className="Profile_input_nonfloat form-control col-7 col-md-6 col-xl-5 offset-1 offset-md-2 offset-xl-3 Profile_info_input"
                      id="Profile_diploma_bachelor_double_major"
                      value={this.state.diploma_bachelor_double_major}
                      onChange={this.handleInputChange}
                      name="diploma_bachelor_double_major"
                    ></input>
                  </div>
                  <div className="form-group row mx-auto">
                    <label className="col-form-label col-4 Profile_info_label">
                      Minor:
                    </label>
                    <input
                      className="Profile_input_nonfloat form-control col-7 col-md-6 col-xl-5 offset-1 offset-md-2 offset-xl-3 Profile_info_input"
                      id="diploma_bachelor_minor"
                      value={this.state.diploma_bachelor_minor}
                      onChange={this.handleInputChange}
                      name="diploma_bachelor_minor"
                    ></input>
                  </div>
                  {/* <input type="checkbox"
                                            className="Profile_diploma_checkbox"
                                            checked={this.state.dm_checkbox}
                                            onChange={this.handleCheckChange}
                                            name="dm_checkbox"
                                        ></input> */}

                  <div className="form-group row mx-auto">
                    <label className="col-form-label col-4 Profile_info_label">
                      Master:
                    </label>
                    <input
                      id="Profile_diploma_master"
                      className="form-control col-7 col-md-6 col-xl-5 offset-1 offset-md-2 offset-xl-3 Profile_info_input"
                      value={this.state.diploma_master}
                      onChange={this.handleInputChange}
                      name="diploma_master"
                    ></input>
                    {/* <input type="checkbox"
                                            className="Profile_diploma_checkbox"
                                            checked={this.state.master_checkbox}
                                            onChange={this.handleCheckChange}
                                            name="master_checkbox"
                                        ></input> */}
                  </div>
                  <div className="form-group row mx-auto">
                    <label className="col-form-label col-4 Profile_info_label">
                      Doctor:
                    </label>
                    <input
                      id="Profile_diploma_doctor"
                      className="form-control col-7 col-md-6 col-xl-5 offset-1 offset-md-2 offset-xl-3 Profile_info_input"
                      value={this.state.diploma_doctor}
                      onChange={this.handleInputChange}
                      name="diploma_doctor"
                    ></input>
                    {/* <input type="checkbox"
                                            className="Profile_diploma_checkbox"
                                            checked={this.state.doctor_checkbox}
                                            onChange={this.handleCheckChange}
                                            name="doctor_checkbox"
                                        ></input> */}
                  </div>
                </div>
              </div>
              <div id="hr41" className="Profile_hr">
                Work Experience
              </div>
              <div id="Profile_occupation_container" className="mt-1">
                <table
                  id="Profile_occupation_table"
                  className="table table-responsive col-12"
                >
                  <thead>
                    <tr style={{ borderBottom: "2px white solid" }}>
                      <th>Occupation</th>
                      <th>Position</th>
                      <th>Company</th>
                      <th>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            this.addOccupation(false);
                          }}
                          id="Profile_addOccupation"
                        >
                          <img
                            src={data.add_icon}
                            alt="add_icon"
                            className="Profile_remove_icon"
                          ></img>
                        </button>
                      </th>
                    </tr>
                  </thead>
                </table>
                <div className="form-group row mx-auto">
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
                </div>
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
