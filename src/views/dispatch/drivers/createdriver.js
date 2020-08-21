import React, { Component } from 'react'
import Drivers from '../../../utils/drivers/driverlist'
import './createdriver.css'

const CreateDriver = ()=> (
<div className="driver-container">
<div className="driver-container-label"><span>3am</span>
    {Drivers.filter(driver => driver.shift ==="3am")
        .map(driver => (
           
        <div className="driver-container-content">
            {driver.name} ({driver.tractor})
        </div>
    
    ))}
    </div>
    </div>
)

    

export default CreateDriver