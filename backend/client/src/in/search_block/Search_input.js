import React,{Component} from 'react';
import './Search_input.css';
//import { useState } from 'react';
import Search_input_block from '../search_block/Search_input_block';
import add_btn from '../../images/add_icon.png';
// var map = [
// 	["Account","account"],
// 	["Username","username"],
// 	["Nickname","nickname"],
// 	["Profile","profile"],
// 	["Email","publicEmail"],
// 	["Office Tel","office"],
// 	["Home Tel","homephone"],
// 	["Mobile","cellphone"],
// 	["Major","education.major"],
// 	["Double Major","education.double_major"],
// 	["Minor","education.minor"],
// 	["Master","education.master"],
// 	["Doctor","education.doctor"],
// 	["Company","Occupation.C"],
// 	["Occupation","Occupation.O"],
// 	["Position","Occupation.P"]
// ];
const map = {
    'Please Choose A Catalog':'default',
    'Account':'account',
    "Username":"username",
    "Nickname":"nickname",
    "Profile":"profile",
    "Email":"publicEmail",
    "Office Tel":"office",
    "Home Tel":"homephone",
    "Mobile":"cellphone",
    "Major":"education.major",
    "Double Major":"education.double_major",
    "Minor":"education.minor",
    "Master":"education.master",
    "Doctor":"education.doctor",
    "Company":"Occupation.C",
    "Occupation":"Occupation.O",
    "Position":"Occupation.P"
}
let map_reverse = {}
for (let option in map){
    map_reverse[map[option]] = option;
}
let template = {
    'Please Choose A Catalog':'default',
    'Account':'account',
    "Username":"username",
    "Nickname":"nickname",
    "Profile":"profile",
    "Email":"publicEmail",
    "Office Tel":"office",
    "Home Tel":"homephone",
    "Mobile":"cellphone",
    "Major":"education.major",
    "Double Major":"education.double_major",
    "Minor":"education.minor",
    "Master":"education.master",
    "Doctor":"education.doctor",
    "Company":"Occupation.C",
    "Occupation":"Occupation.O",
    "Position":"Occupation.P"
}

class Search_input extends Component{
   state={
            block_num:0,
            options:template,
            have_chosen:{},
            parentState : this.props.inputValues
        }
        //this.parentHasChangedSetter = this.props.hasChangedSetter;
    static getDerivedStateFromProps(props,state){
        if (props.inputValues !== state.parentState){
            return{
                    parentState:props.inputValues
                };
            
        }else{
            return null
        }
    }
    parentHasChangedSetter = (new_object) => {
        this.props.hasChangedSetter(new_object)
    }
    addButtonFunc = (e) => {
        e.preventDefault();
        this.setState({
            block_num:this.state.block_num+1
        }, function() {
            console.log(this.state.block_num)
        })
        
}

    removeButtonFunc = (currentOption) => {
        let new_have_chosen = this.state.have_chosen
        delete new_have_chosen[map[currentOption]]

        this.setState({

            block_num:this.state.block_num-1,
            have_chosen:new_have_chosen

        },function() {
            console.log(this.state.block_num)
            console.log(this.state.have_chosen)
            this.parentHasChangedSetter(this.state.have_chosen)
        })

        

    }

    addOption = (newOption) => {
        let new_have_chosen = this.state.have_chosen
        new_have_chosen[map[newOption]] = true;

        this.setState({

            have_chosen:new_have_chosen

        },function() {

            console.log(this.state.have_chosen)
            this.parentHasChangedSetter(this.state.have_chosen)
        })
    }

    removeOption = (prevOption) => {
        let new_have_chosen = this.state.have_chosen
        delete new_have_chosen[map[prevOption]]

        this.setState({

            have_chosen:new_have_chosen

        },function() {

            console.log(this.state.have_chosen)
            this.parentHasChangedSetter(this.state.have_chosen)
        })
    }

    render(){
        let $Search_input_blocks=[]
        let have_chosen_num = Object.keys(this.state.have_chosen).length
        // for(let i = 0;i<have_chosen_num;i++){
        //     $Search_input_blocks.push(<Search_input_block options={this.state.options} currentOption={this.state.have_chosen[i]} removeFunc={this.removeButtonFunc}></Search_input_block>)
        // }
        let count=1
        for (let option in this.state.have_chosen){
            $Search_input_blocks.push(
            <Search_input_block 
            options={this.state.options}
            currentValue = {this.state.parentState[option]}
            currentOption={map_reverse[option]} 
            removeFunc={this.removeButtonFunc}
            addOptionFunc={this.addOption}
            removeOptionFunc = {this.removeOption}
            handleInputChangeFunc = {this.props.handleInputChange}
            id={'Search_input_block_'+count}>
            </Search_input_block>)

            count = count + 1
        }
        for (let i = 0;i<this.state.block_num-have_chosen_num;i++){
            $Search_input_blocks.push(
            <Search_input_block 
            options={this.state.options}
            currentValue = ''
            currentOption={'Please Choose A Catalog'} 
            removeFunc={this.removeButtonFunc}
            addOptionFunc={this.addOption}
            removeOptionFunc = {this.removeOption}
            handleInputChangeFunc = {this.props.handleInputChange}
            id={'Search_input_block_'+count}>
            </Search_input_block>)

            count = count + 1
        }
        return(
            <ul id="Search_input_container">
                <button onClick={this.addButtonFunc} id="Search_input_addbtn">
                    <img src={add_btn} className="Search_input_btn"></img>
                </button>
                {$Search_input_blocks}
                
            </ul>
        )
    }
}

export default Search_input;
/*class Search_input extends Component{
    constructor(props){
        super(props);
        this.state={
            options:template,
            have_chosen:{},
            block_num:0
        };

        
    }

    addChosen = (option) =>{
        let new_options = this.state.options;
        delete new_options[option]
        //setOptions(new_options)
        this.setState({
            options:new_options
        }
        )

        let new_have_chosen = this.state.have_chosen
        new_have_chosen[option] = map[option]
        //setHaveChosen(new_have_chosen)
        this.setState({
            have_chosen:new_have_chosen
        })

    }

    removeChosen = (option)=>{
        let new_options = this.state.options;
        new_options[option] = map[option]
        //setOptions(new_options)
        this.setState({
            options:new_options
        }
        )
        console.log(this.state.have_chosen)
        console.log(this.state.options)

        let new_have_chosen = this.state.have_chosen
        delete new_have_chosen[option]
        //setHaveChosen(new_have_chosen)
        this.setState({
            have_chosen:new_have_chosen
        })
        console.log(this.state.have_chosen)
        console.log(this.state.options)
    }

    addButtonFunc = (e) =>{
        e.preventDefault()
        this.setState({
            block_num:this.state.block_num+1,
        }
        )
        // let key_arr = Object.keys(this.state.options);
        // if (key_arr.length!==0){
        //     this.addChosen(key_arr[0])
        // }
       
        
    }

    blocknum_Setter = () =>{
        this.setState({
            block_num:this.state.block_num-1
        })
    }

    render(){
        let $Search_input_blocks = []
        let count = 1
        //console.log("Rerender!!!")
        for (let option in this.state.have_chosen){
            $Search_input_blocks.push(<Search_input_block
                blockNumSetter={this.blocknum_Setter}
                addFunc={this.addChosen} 
                removeFunc={this.removeChosen} 
                options={this.state.options} 
                default_key={option} 
                default_value={this.state.options[option]} 
                id={'Search_input_block_'+count}></Search_input_block>)
            count = count+1
            // console.log('Search_input_block'+count)
        }
        let new_defalut_block_num = this.state.block_num-Object.keys(this.state.have_chosen).length
        console.log(new_defalut_block_num)
        for (let i=0; i<new_defalut_block_num;i++){
            $Search_input_blocks.push(<Search_input_block
                blockNumSetter={this.blocknum_Setter}
                addFunc={this.addChosen} 
                removeFunc={this.removeChosen} 
                options={this.state.options} 
                default_key={'default'} 
                default_value={'default'} 
                id={'Search_input_block_'+count}></Search_input_block> )
            count = count+1
        }
        return(
            <div>
            <button onClick={this.addButtonFunc}>add</button>
            {$Search_input_blocks}
            </div>
        )
    }

}*/

