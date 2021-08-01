import React from 'react';
import './Recruitment_block.css';
import Scrollbar from 'react-scrollbars-custom';

const renderThumb = ({ style, ...props }) => {
	const thumbStyle = {
	borderRadius: 6,
	backgroundColor: 'rgba(192,192,200, 0.5)'
	};
	return <div style={{ ...style, ...thumbStyle }} {...props} />;}

const Recruitment_block = (props) =>{
    let recruit_image = props.data.image
    let recruit_title = props.data.title
    let recruit_info = props.data.info
    let recruit_spec = props.data.spec
    let id = props.data.id

    let visual_image = null
    // if (recruit_image){
    //     visual_image = <Recruitment_image image={recruit_image} id={id+'_image'}/>
    // }
    return(
        <div id="Recruitment_block_container" className="card col-xl-10 mx-auto my-5" style={{boxShadow:"2px 2px rgba(12, 28, 99, 0.1)"}}>
            <div className="d-flex justify-content-center">
                <img className="card-img-top img-fluid Recruitment_block_image" src={recruit_image} id={id+'_image'} style={{borderRadius:"10px"}}></img>
            </div>
            <div class="card-header Recruitment_block_subtitle">{recruit_title.company_name}</div>
            <div className="card-body" id="Recruitment_block_text_lg">
                {/* <Recruitment_title title={recruit_title} id={id+'_title'}/> */}
                <p className="card-title Recruitment_block_title">{recruit_title.title}</p>
                <p className="card_text">
                    <Recruitment_info info={recruit_info} id={id+'_info'}/>          
                    <Recruitment_spec spec={recruit_spec} id={id+'_spec'}/>
                </p>
            </div>
            <div className="card-body" id="Recruitment_block_text_sm">
                <Scrollbar renderThumbVertical={renderThumb}>
                    <p className="card-title Recruitment_block_title">{recruit_title.title}</p>
                    <p className="card_text">
                        <Recruitment_info info={recruit_info} id={id+'_info'}/>          
                        <Recruitment_spec spec={recruit_spec} id={id+'_spec'}/>
                    </p>
                </Scrollbar>
            </div>

        </div>
    )
}

export default Recruitment_block;

// const Recruitment_image = (props) => {
//     let image = props.image;
//     let id = props.id;
//     return(
        
//         <img src={image} alt="Recruitment_block_image" className="Recruitment_block_image card-img-top" id={id}/>
    
//     )
// }

// const Recruitment_title = (props) => {
//     let title = props.title.title;
//     let company_name = props.title.company_name;
//     let work_type = props.title.work_type;
//     let id = props.id;
//     return (
//         <div className='Recruitment_block_title_container'>
//             <p className='Recruitment_block_title' id={id}>{title}</p>
//             <p className="Recruitment_block_subtitle">{company_name} | {work_type}</p>
//         </div>
//     )
// }

const Recruitment_info = (props) =>{
	let salary = props.info.salary;
	let experience = props.info.experience;
    let diploma = props.info.diploma;
    let id = props.id;
    return(
        <div className="Recruitment_block_info_div">
            <div className="Recruitment_block_info">
                <p className="Recruitment_block_salary">{salary} </p>
                <p>  |  {experience} |  {diploma}</p>
            </div>
        </div>
    )
}

const Recruitment_spec = (props) => {
    let requirement = props.spec.requirement.split('\n').map(i => {
        return <li key={i}>{i}</li>
    });
    let description = props.spec.description.split('\n').map(i => {
        return <li key={i}>{i}</li>
    });
    let id = props.id;
    return (
        <div className="Recruitment_block_spec_div">
            <p className="Recruitment_block_requirement" id={id}>
                <li id ="Recruitment_requirement_li">要求條件：</li>
                {requirement}
            </p>
            <p className='Recruitment_block_requirement' id={id}>
                <li id ="Recruitment_requirement_li">說明：</li>
                {description}
            </p>
        </div>
    )
}

