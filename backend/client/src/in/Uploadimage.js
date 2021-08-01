import React, { Component } from 'react';
import {saveImg} from './columnImgFunc/saveImg';

class Uploadimage extends Component{
    constructor(props){
        super(props);
        this.state = {
            filename:'',
            file:null
        };

        this.handleImageChange = this.handleImageChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleFilenameChange = this.handleFilenameChange.bind(this)
    }

    handleFilenameChange(event) {
		const target = event.target;
		const filename = target.value;
		//const name = target.id;
		
		this.setState({
		  filename:filename
		});
    }
    
    handleSubmit(e){
        e.preventDefault();
        saveImg(this.state.filename,this.setState.file)

    }

    handleImageChange(e){
        let reader = new FileReader();
        if(e.target.files.length===0) return;
        let file = e.target.files[0];
        this.setState({
            file:file
        })

        try {
            console.log(reader.readAsDataURL(file))
        } catch (error) {
            console.log("readfile error!!")
        }
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="file" onChange={this.handleImageChange}/>
                    <input type="text" onChange={this.handleFilenameChange}/>
                    <button onClick={this.handleSubmit}> submit </button>
                </form>
            </div>
        );
    }
    
}
export default Uploadimage;