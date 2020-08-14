import React, { Component } from 'react'
import Drivers from '../../../utils/drivers/driverlist'
import './createdriver.css'

let drivers = [...Drivers]

class CreateDriver extends Component {
    constructor(){
        super();
        this.state = drivers;
    }
render() {
    let driver = this.state.driver
        return <div className="driver-div">
                {drivers.map(driver => <div className="driver-div__content" draggable="true"><span className="driver-span">{driver.name}</span>
                    <div className="driver-load-div driver-load-div-1"><span>Load1</span><span class="material-icons">create</span></div>
                    <div className="driver-load-div driver-load-div-2"><span>Load2</span><span class="material-icons">create</span></div>
                    <div className="driver-load-div driver-load-div-3"><span>Load3</span><span class="material-icons">create</span></div>
                    <div className="driver-load-div driver-load-div-4"><span>Load4</span><span class="material-icons">create</span></div>
                    <div className="driver-load-div driver-load-div-5"><span>Load5</span><span class="material-icons">create</span></div>
                </div>)}
        </div>
       
    }
}
export default CreateDriver