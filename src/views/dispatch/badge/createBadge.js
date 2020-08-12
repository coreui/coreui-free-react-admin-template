import React, { Component } from 'react'
//import Storelist from './storelist'
import {CBadge} from '@coreui/react'
import './createBadge.css'


class createBadge extends Component {
    render(props) {
        return (
            <div className="badge-div">
                <CBadge className="badgeStyle" color="danger" shape="pill">5</CBadge><CBadge className="badgeStyle" color="info" shape="pill" >5</CBadge><CBadge className="badgeStyle" color="warning" shape="pill">5</CBadge> 
            </div>
        )
    }
}

export default createBadge

