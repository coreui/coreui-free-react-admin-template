import React from 'react';
import './Recruitment_block.css';


const Recruitment_block = (props) =>{
    let recruit_image = null
    if (props.image){
        recruit_image = <Recruitment_image/>
    }
    return(
        <div id="Recruitment_block_container">
            <Recruitment_title/>
            <Recuritment_info/>
            <Recruitment_description/>
            {recruit_image}
        </div>
    )
}

export default Recruitment_block;

const Recruitment_title = (props) => {
    let title = props.title;
    let id = props.id
    return (
        <div>
            <p className='Recruitment_block_title'>{title}</p>
        </div>
    )
}

const Recuritment_info = (props) =>{
    let company_name = props.cn;
    let work_type = props.wt;
	let salary = props.salary;
	let requirement = props.requirement
    let diploma = props.diploma
    return(
        <div>

        </div>
    )
}

const Recruitment_description = (props) => {
    let description = props.description;
    let id = props.id
    return (
        <div>
            <p className='Recruitment_block_description'>{title}</p>
        </div>
    )
}

const Recruitment_image = (props) => {
    let image = props.image;
    let id = props.id;
    return(
        <div>
            <img src={image} alt="Recruitment_block_image" className="Recruitment_block_image"/>
        </div>
    )
}