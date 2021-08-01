import React, { Component } from 'react';
import './search.css';
import axios from 'axios';
import {handleInputChange} from "./searchFunc/handleChange";

var map = [
	["account","account"],
	["username","username"],
	["nickname","nickname"],
	["profile","profile"],
	["publicEmail","publicEmail"],
	["office","office"],
	["homephone","homephone"],
	["cellphone","cellphone"],
	["major","education.major"],
	["double_major","education.double_major"],
	["minor","education.minor"],
	["master","education.master"],
	["doctor","education.doctor"],
	["Company","Occupation.C"],
	["Occupation","Occupation.O"],
	["Position","Occupation.P"]
];

class Search extends Component{
    /*constructor(props) {
		super(props);
		var tmpState = {hasChanged:{}};
		map.forEach(arr=>{
			tmpState[arr[1]]='';
		});
		this.state = tmpState;
		this.handleInputChange = handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.creatTable = this.creatTable.bind(this);
	}*/
	/*
	handleSubmit(event){
		event.preventDefault();
		var r = window.confirm("確認搜尋?");
		if(r){
			var toSend = {}
			map.forEach(arr=>{
				if(this.state.hasChanged[arr[1]]){
					toSend[arr[1]] = this.state[arr[1]]
				}
			})
			console.log('toSend',toSend)
			axios.post("/api/searchVisual",
				toSend
			).then(res=>{
				if(res.data){
					if(res.data.message===true){
						const receive = res.data.data;
						console.log('獲得'+receive.length+'筆資料');
						console.log(receive);
					}else{
						alert("錯誤: \n"+res.data.description);
					}
				}
			})
		}
	}
	componentDidMount(){
		this.creatTable();
	}
	creatTable(){
		var ST = document.getElementById("Search_table");
		map.forEach(arr=>{
			var new_tr = document.createElement("tr");
			
			var new_td1 = document.createElement("td");
			new_td1.innerHTML=arr[0];
			
			var new_td2 = document.createElement("td");
			new_td2.setAttribute("colSpan",2);
			var new_input = document.createElement("input");
			new_input.setAttribute("name",arr[1]);
			new_input.setAttribute("value",this.state[arr[1]])
			new_input.onchange = this.handleInputChange;
			new_td2.appendChild(new_input)
			
			new_tr.appendChild(new_td1)
			new_tr.appendChild(new_td2)
			
			ST.appendChild(new_tr)
		})
	}*/
	render(){
        return (
	       <div id = "search_container">
			<form id="search_Form" onSubmit={this.handleSubmit}>
				<div id = "search_div">
					<span id = "search_method">請選擇查詢方式：</span>
					<select id="search_cstype">
						<option value="1">account</option>
						<option value="2">username</option>
						<option value="3">nickname</option>
						<option value="4">profile</option>
						<option value="5">publicEmail</option>
						<option value="6">office</option>
						<option value="7">homephone</option>
						<option value="8">cellphone</option>
						<option value="9">major</option>
						<option value="10">double_major</option>
						<option value="11">minor</option>
						<option value="12">master</option>
						<option value="13">doctor</option>
						<option value="14">Company</option>
					</select>
					<span id = "search_method">輸入關鍵字：</span> 
					<input/>
					<input type="submit" value="Search" />
				</div>
			</form>
		</div>
        )
    }
}

export default Search;
