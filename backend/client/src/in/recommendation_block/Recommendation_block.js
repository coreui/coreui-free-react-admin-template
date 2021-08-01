import React from 'react';


const Recommendation_block = (props) =>{
    let recommendation_image = null
    if (props.image){
        recommend_image = <Recommendation_image/>
    }
    return(
        <div id="Recommendation_block_container">
            <Recommendation_title/>
            <Recommendation_info/>
            <Recommendation_description/>
            {recommend_image}
        </div>
    )
}

export default Recommendation_block;

const Recommendation_title = (props) => {
    let title = props.title;
    let id = props.id
    return (
        <div>
            <p className='Recommendation_block_title'>{title}</p>
        </div>
    )
}

const Recommendation_info = (props) =>{
    let name = props.nam;
    let occupation = props.occ;
	let experience = props.exp;
	let speciality = props.spe;
    let diploma = props.dip;
    return(
        <div>

        </div>
    )
}

const Recommendation_description = (props) => {
    let description = props.description;
    let id = props.id
    return (
        <div>
            <p className='Recommendation_block_description'>{title}</p>
        </div>
    )
}

const Recommendation_image = (props) => {
    let image = props.image;
    let id = props.id;
    return(
        <div>
            <img src={image} alt="Recommendation_block_image" className="Recruitment_block_image"/>
        </div>
    )
}