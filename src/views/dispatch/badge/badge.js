import React, { Component } from 'react'
//import Storelist from './storelist'
import {CBadge} from '@coreui/react'


class badge extends Component {
    render(props) {
        return (
            <div>
                <CBadge color="danger" shape="pill"> 5</CBadge>  
            </div>
        )
    }
}

export default badge

