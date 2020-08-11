import React, { Component } from 'react'
//import Storelist from './storelist'
import {CBadge} from '@coreui/react'


class createBadge extends Component {
    render(props) {
        return (
            <div className="badge-div">
                <CBadge color="danger" shape="pill">5</CBadge><CBadge color="info" shape="pill" >5</CBadge><CBadge color="warning" shape="pill">5</CBadge> 
            </div>
        )
    }
}

export default createBadge

