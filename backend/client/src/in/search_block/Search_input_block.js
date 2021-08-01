import React from 'react';
import './Search_input_block.css'
import {Component} from 'react'; 

import remove_btn from '../../images/remove_icon.png';
import expand_icon from '../../images/show_more.png';
//import {handleInputChange} from "../searchFunc/handleChange";

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


class Search_input_block extends Component{
    state={
            currentOption:this.props.currentOption,
            options:this.props.options,
            name:map[this.props.currentOption],
            currentValue:this.props.currentValue
    };

    static getDerivedStateFromProps(props,state){
        if (props.currentOption !== state.currentOption){
            return{
                    currentOption:props.currentOption,
                    name:map[props.currentOption],
                    currentValue:props.currentValue
                };
            
        }else{
            return null
        }
    } 

    removeButtonFuc = (e) => {
        e.preventDefault();
        this.props.removeFunc(this.state.currentOption)
    }

    changeDefaultToNewOption = (newOption) => {
        this.props.addOptionFunc(newOption)
    }

    renderOptions = () => {
        let select = document.getElementById(this.props.id+'_ul');
        for (let option in this.state.options){
            if(this.state.currentOption!==option){
            let new_option = document.createElement('li');
            new_option.innerHTML = option;
            new_option.setAttribute('class','Search_input_block_options')
            new_option.onclick=this.handleSelectChange
            select.appendChild(new_option)
            }
            }
    }

    componentDidMount(){
        this.renderOptions()
        
    }
    componentDidUpdate(){
        
        let input = document.getElementById(this.props.id+'_input');
        input.setAttribute("value",this.state.currentValue)

    }
    handleSelectChange = (e) => {
        let value = e.target.innerHTML
        if(this.state.currentOption==='Please Choose A Catalog'){
            this.changeDefaultToNewOption(value);
        }
        else{
            this.props.removeOptionFunc(this.state.currentOption)
            this.props.addOptionFunc(value)
        }
        this.setState({
            currentOption:value,
            name:map[value]
        })
        
    }
    


    render(){
        return(
            <li className='Search_input_block_container'>
                <div id={this.props.id+'_list_container'} className='Search_input_block_list_container'>
                    <ul className='Search_input_block_dropdown'>
                        
                        <li id={this.props.id+'_currentOption'} onClick={this.displayUl} className='Search_input_block_options'>
                            <img src={expand_icon} className="Search_input_block_expand"></img>
                            {this.state.currentOption}
                        <ul id={this.props.id+'_ul'} className='Search_input_block_options'></ul>
                        </li>
                    </ul>
                </div>
                <button id={this.props.id+'_remove_btn'} onClick={this.removeButtonFuc} className='Search_input_block_remove_btn'>
                    <img src={remove_btn} className='Search_input_block_btn'/>
                </button>
                <input id={this.props.id+'_input'} name={this.state.name} className='Search_input_block_input' onChange={this.props.handleInputChangeFunc}></input>
                
            </li>
        )
    }
}


export default Search_input_block;
/*class Search_input_block extends Component{
    constructor(props){
        super(props);
        this.state={
            currentOption:this.props.default_key,
            options:this.props.options,
            name:this.props.name,
            //currentOption:this.props.currentOption,
        }

        
    }
    removeButtonFunc = (e) => {
            e.preventDefault();
            if(this.state.currentOption==='default'){
                this.props.blockNumSetter();

            }else{
                this.props.removeFunc(this.state.currentOption);
            }
         }

    handleSelectChange = (e) =>{
            let value = e.target.value
            if(this.state.currentOption==='default'){
                this.props.addFunc(value)
                this.setState({
                    currentOption:value
                })
            }
            else{
                this.props.removeFunc(this.state.currentOption)
                this.props.addFunc(value)
                this.setState({
                    currentOption:value
                })
            }
        }
    clearWholeChild = (parentNode) => {
        while (parentNode.firstChild) {
            parentNode.removeChild(parentNode.firstChild);
           }
    }
    // shouldComponentUpdate(){
    //     console.log(this.props.id+' has been changed!')
    //     let select = document.getElementById(this.props.id+'_select');
    //     this.clearWholeChild(select)
    //     console.log(this.state.options)
    //     if (this.state.currentOption === 'default'){
    //         let new_option = document.createElement('option');
    //         new_option.innerHTML = 'Please Choose A Catalog';
    //         //new_option.setAttribute('value',option)
    //         select.appendChild(new_option)
    //     }
    //     for (let option in this.state.options){
    //         let new_option = document.createElement('option');
    //         new_option.innerHTML = option;
    //         new_option.setAttribute('value',option)
    //         select.appendChild(new_option)
    //     }
    //     return true
    // }
    componentDidUpdate(){
        let select = document.getElementById(this.props.id+'_select');
        this.clearWholeChild(select)
        console.log(this.state.options)
        // if (this.state.currentOption === 'default'){
        //     let new_option = document.createElement('option');
        //     new_option.innerHTML = 'Please Choose A Catalog';
        //     //new_option.setAttribute('value',option)
        //     select.appendChild(new_option)
        // }
        for (let option in this.state.options){
            let new_option = document.createElement('option');
            new_option.innerHTML = option;
            new_option.setAttribute('value',option)
            select.appendChild(new_option)
        }
    }
    componentDidMount(){
        //console.log(this.props.id+' has been changed!')
        let select = document.getElementById(this.props.id+'_select');
        this.clearWholeChild(select)
        console.log(this.state.options)
        if (this.state.currentOption === 'default'){
            let new_option = document.createElement('option');
            new_option.innerHTML = 'Please Choose A Catalog';
            //new_option.setAttribute('value',option)
            select.appendChild(new_option)
        }
        for (let option in this.state.options){
            let new_option = document.createElement('option');
            new_option.innerHTML = option;
            new_option.setAttribute('value',option)
            select.appendChild(new_option)
        }
    }
    
    render(){
        return(
                <div className="Search_input_block">
                    <select id={this.props.id+'_select'} onChange={this.handleSelectChange}>  
                    </select>
                    <input name={this.state.name} className='Search_input_block_input' onChange={this.handleInputChange}></input>
                    <button onClick={this.removeButtonFunc}>remove</button>
                </div>
        )
    }
}*/


// const Search_input_block = (props) => {
//     let addFunc = props.addFunc;
//     let removeFunc = props.removeFunc;
//     //let options = props.options;
//     let value = props.default_value;
//     let key = props.default_key;
//     let id = props.id;
//     const [currentOption, setCurrentOption] = useState(key)
//     const [options, setOptions] = useState(props.options)
//     const [name, setName] = useState(value);
//     const handleInputChange = (e) => {
        
//         const target = e.target;
//         const value = target.value;
//         const name = target.name;
//         console.log(name,value);
//         setName(value)
//         console.log([name],value);
//         // var hasChanged = {...this.state.hasChanged}
//         // if(value===""){
//         //     hasChanged[name] = false;
//         // }else{
//         //     hasChanged[name] = true;
//         // }
        
//         // this.setState({hasChanged})
//     }
//     const removeButtonFunc = (e) => {
//         e.preventDefault();
//         removeFunc(key);
//     }

//     const handleSelectChange = (e) =>{
//         let value = e.target.value
//         removeFunc(currentOption)
//         addFunc(value)
//         setCurrentOption(value)
//     }
//     useEffect(()=>{
//         let select = document.getElementById(id+'_select');
//         for (let option in options){
//             let new_option = document.createElement('option');
//             new_option.innerHTML = option;
//             new_option.setAttribute('value',option)
//             select.appendChild(new_option)
//         }
//     },[])
//     return(
//         <div className="Search_input_block">
//             <select id={id+'_select'} onChange={handleSelectChange}>
                
//             </select>
//             <input name={name} className='Search_input_block_input' onChange={handleInputChange}></input>
//             <button onClick={removeButtonFunc}>remove</button>
//         </div>
//     )
// }
