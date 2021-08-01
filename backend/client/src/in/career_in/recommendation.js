import React, { Component } from 'react';
import './recommendation.css';
import {NavBar_in} from '../../component/AppBar_in';
import Recommendation_block from './recommendation_block/Recommendation_block';
import eesa_icon from '../../images/eesa-icon.png';
import {Link} from 'react-router-dom';
import Scrollbar from 'react-scrollbars-custom';

const template1 = {
	title:{
		title:'矽谷推薦',
		name:'電機大神',
		desire_work_type:'新創CEO @ Silicon Valley'
	},
	info:{
		contact:'+886-987-654-321',
		email:'ntuee_genius@gmail.com',
		diploma:'NTUEE Bachelor'
	},
	
	spec:{
		experience:'IEEE seminar\n2020 ICCAD 1st place\nGoogle intern\n8x 書卷獎\n MIT 交換學生\n電機系系學會長',
		speciality:"Computer Science\nMachine Learning\nEDA,VLSI\nICS"
	},
	image:eesa_icon,
	id:'Recruitment_block_1'
}
const renderThumb = ({ style, ...props }) => {
	const thumbStyle = {
	borderRadius: 6,
	backgroundColor: 'rgba(192,192,200, 0.5)'
	};
	return <div style={{ ...style, ...thumbStyle }} {...props} />;}
const Recommendation = (props) =>{
	return(
		<div className ="Recommendation container-fluid">
			<Scrollbar renderThumbVertical={renderThumb}>
			<div className="d-xl-flex justify-content-xl-around">
				<div className = "Recommendation_container col">
					<div className = "Recommendation_wrapper">
						<Link className='Recommendation_block'>
							<Recommendation_block data = {template1} />
						</Link>
						<Link className='Recommendation_block'>
							<Recommendation_block data = {template1} />
						</Link>
						<Link className='Recommendation_block'>
							<Recommendation_block data = {template1}/>
						</Link>
					</div>
				</div>
				<div className = "Recommendation_container col">
					<div className = "Recommendation_wrapper">
						<Link className='Recommendation_block'>
							<Recommendation_block data = {template1} />
						</Link>
						<Link className='Recommendation_block'>
							<Recommendation_block data = {template1} />
						</Link>
						<Link className='Recommendation_block'>
							<Recommendation_block data = {template1}/>
						</Link>
					</div>
				</div>
			</div>
			</Scrollbar>
		</div>
	)
}

export default Recommendation;
