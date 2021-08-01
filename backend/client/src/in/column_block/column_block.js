import React, { Component } from 'react';
import './column_block.css';
import {getImg} from '../columnImgFunc/getImg';

const Column_block_title = (props) =>{
    const _id = props.id;
    const _title = props.title;
    const Listitems = _title.map((Intro) =>
    <p>{Intro}</p>
    );
    return (
        <span id= {_id}  class="column_block_title">{Listitems}</span>
    );
}
const Column_block_exp = (props) =>{
    const _id = props.id;
    const _exp = props.exp;
    const Listintro = _exp.map((Intro) =>
    <p>{Intro}</p>
    );
    return (
        <p id= {_id}  class="column_block_introtext">{Listintro}</p>
    );
}
const Column_block_edu = (props) =>{
    const _id = props.id;
    const _edu = props.edu;
    const Listintro = _edu.map((Intro) =>
    <p>{Intro}</p>
    );
    return (
        <p id= {_id}  class="column_block_introtext">{Listintro}</p>
    );
}
const Column_block_intro = (props) =>{
    const _id = props.id;
    const _intro = props.intro;
    const Listintro = _intro.map((Intro) =>
    <p>{Intro}</p>
    );
    return (
        <p id= {_id}  class="column_block_introtext">{Listintro}</p>
    );
}
const Column_block_anno = (props) =>{
    const _id = props.id;
    const _anno = props.anno;
    const _anno_name = _anno[0];
    const _anno_date = _anno[1];
    return (
        <p id={_id} class="column_block_Anno">
            <span className="column_block_anno">{_anno_name}</span>
            <span className="column_block_date">{_anno_date}</span>
        </p>
    );
}
class Column_block_img extends Component{
    constructor(props){
        super(props);
        this.state = {
            img : null,
            id : this.props.id,
            filename: this.props.filename
        }
        this.getImg = getImg.bind(this);
    }
    componentWillMount(){
        console.log(this.state.filename)
        this.getImg(this.state.filename)
    }
    render(){
        
        return(
            <div className="column_block_img">
                <img src={this.state.img} alt = {this.state.id}/>
            </div>
        );
    }
}
/*
const Column_block_img = (props) =>{
    const _id = props.id;
    const _filename = props.filename;
    const _img = getImg(_filename);
    return (
        <div className="column_block_img">
            <img src={_img} alt = {_id}/>
        </div>
    );
}*/


const Column_block = (props) =>{
    const _link = props.link;
    const _filename = props.block.filename;
    const _anno = props.block.anno;
    const _title = props.block.title;
    const _exp = props.block.exp;
    const _edu = props.block.edu;
    const _intro = props.block.intro;
    const _id = props.block.id;
    return (
        <a href={_link} id="column_block" class ="container">
            <div class="row">
                
                <div class="col-12 col-lg-4" >  
                    <Column_block_img id={`${_id}_img`} filename={_filename}/>
                </div>
                <div class="col-12 col-lg-8 column_block_text"> 
                    
                    <Column_block_title id = {`${_id}_title`} title = {_title}/> 
                    <div class="Simple-Line"></div>    
                    <div class="column_block_bulletlist">
                        
                        <li class="column_listtitle">經歷</li>
                        <Column_block_exp id = {`${_id}_exp`} exp = {_exp}/>
                        <li class="column_listtitle">學歷</li>
                        <Column_block_edu id = {`${_id}_edu`} edu = {_edu}/>
                        <li class="column_listtitle">介紹</li>
                        <Column_block_intro id = {`${_id}_intro`} intro = {_intro}/> 
                        <Column_block_anno id={`${_id}_img`} anno={_anno}/> 
                    </div>
                </div>
            </div>
        </a>
    );
}

export default Column_block

