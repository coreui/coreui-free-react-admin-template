import React, { Component } from 'react';
import {Link} from "react-router-dom"
import './career.css';
import Recruitment_image from '../images/Recruitment.png';
import Recommendation_image from '../images/Recommendation.png';

class Career extends Component{
    render(){
		
        return (
        <div className="align-items-center d-flex career_link_imgs">
			<div className="row container mx-auto ">
                <div className="col d-flex justify-content-center">
                    <Link to="/in/Career/pages/Recruitment" ><img className="career_img img-fluid" src= {Recruitment_image} alt="Recruitment"/></Link>
                </div>
                <div className="col d-flex justify-content-center">
                    <Link to="/in/Career/pages/Recommendation"><img className="career_img img-fluid" src= {Recommendation_image} alt="Recommendation"/></Link>
                </div>
            </div>
					
			
		</div>
        )
    }
}

export default Career;
