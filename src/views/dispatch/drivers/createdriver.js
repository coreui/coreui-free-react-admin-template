import React, { Component } from 'react'
import Drivers from '../../../utils/drivers/driverlist'
import Shifts from '../../../utils/shifts/shiftList'
import './createdriver.css'

const CreateDriver = ()=> (
    <div className="driver-container">
<React.Fragment>
<div className="driver-container-label"><span>8am</span><div className="expand-icon-div"><span class="material-icons">
expand_more
</span></div>
    {Drivers.filter(driver => driver.shift ==="8am")
        .map(driver => (
           
        <div className="driver-container-content">
            {driver.name} ({driver.tractor})
        </div>
    
    ))}
    </div>
<div className="driver-container-label"><span>9am</span><div className="expand-icon-div" onClick={expandDriverContent}><span class="material-icons">
expand_more
</span></div>
    {Drivers.filter(driver => driver.shift ==="9am")
        .map(driver => (
           
        <div className="driver-container-content">
            {driver.name} ({driver.tractor})
        </div>
    
    ))}
    </div>
<div className="driver-container-label"><span>11am</span><div className="expand-icon-div"><span class="material-icons">
expand_more
</span></div>
    {Drivers.filter(driver => driver.shift ==="11am")
        .map(driver => (
           
        <div className="driver-container-content">
            {driver.name} ({driver.tractor})
        </div>
    
    ))}
    </div>
<div className="driver-container-label"><span>12pm</span><div className="expand-icon-div"><span class="material-icons">
expand_more
</span></div>
    {Drivers.filter(driver => driver.shift ==="12pm")
        .map(driver => (
           
        <div className="driver-container-content">
            {driver.name} ({driver.tractor})
        </div>
    
    ))}
    </div>
<div className="driver-container-label"><span>2pm</span><div className="expand-icon-div"><span class="material-icons">
expand_more
</span></div>
    {Drivers.filter(driver => driver.shift ==="2pm")
        .map(driver => (
           
        <div className="driver-container-content">
            {driver.name} ({driver.tractor})
        </div>
    
    ))}
    </div>
<div className="driver-container-label"><span>3pm</span><div className="expand-icon-div"><span class="material-icons">
expand_more
</span></div>
    {Drivers.filter(driver => driver.shift ==="3pm")
        .map(driver => (
           
        <div className="driver-container-content">
            {driver.name} ({driver.tractor})
        </div>
    
    ))}
    </div>
<div className="driver-container-label"><span>4pm</span><div className="expand-icon-div"><span class="material-icons">
expand_more
</span></div>
    {Drivers.filter(driver => driver.shift ==="4pm")
        .map(driver => (
           
        <div className="driver-container-content">
            {driver.name} ({driver.tractor})
        </div>
    
    ))}
    </div>
<div className="driver-container-label"><span>5pm</span><div className="expand-icon-div"><span class="material-icons">
expand_more
</span></div>
    {Drivers.filter(driver => driver.shift ==="5pm")
        .map(driver => (
           
        <div className="driver-container-content">
            {driver.name} ({driver.tractor})
        </div>
    
    ))}
    </div>
<div className="driver-container-label"><span>6pm</span><div className="expand-icon-div"><span class="material-icons">
expand_more
</span></div>
    {Drivers.filter(driver => driver.shift ==="6pm")
        .map(driver => (
           
        <div className="driver-container-content">
            {driver.name} ({driver.tractor})
        </div>
    
    ))}
    </div>
<div className="driver-container-label"><span>7pm</span><div className="expand-icon-div"><span class="material-icons">
expand_more
</span></div>
    {Drivers.filter(driver => driver.shift ==="7pm")
        .map(driver => (
           
        <div className="driver-container-content">
            {driver.name} ({driver.tractor})
        </div>
    
    ))}
    </div>
<div className="driver-container-label"><span>730pm</span><div className="expand-icon-div"><span class="material-icons">
expand_more
</span></div>
    {Drivers.filter(driver => driver.shift ==="730pm")
        .map(driver => (
           
        <div className="driver-container-content">
            {driver.name} ({driver.tractor})
        </div>
    
    ))}
    </div>
<div className="driver-container-label"><span>830pm</span><div className="expand-icon-div"><span class="material-icons">
expand_more
</span></div>
    {Drivers.filter(driver => driver.shift ==="830pm")
        .map(driver => (
           
        <div className="driver-container-content">
            {driver.name} ({driver.tractor})
        </div>
    
    ))}
    </div>
<div className="driver-container-label"><span>930pm</span><div className="expand-icon-div"><span class="material-icons">
expand_more
</span></div>
    {Drivers.filter(driver => driver.shift ==="930pm")
        .map(driver => (
           
        <div className="driver-container-content">
            {driver.name} ({driver.tractor})
        </div>
    
    ))}
    </div>
<div className="driver-container-label"><span>11pm</span><div className="expand-icon-div"><span class="material-icons">
expand_more
</span></div>
    {Drivers.filter(driver => driver.shift ==="11pm")
        .map(driver => (
           
        <div className="driver-container-content">
            {driver.name} ({driver.tractor})
        </div>
    
    ))}
    </div>
<div className="driver-container-label"><span>015am</span><div className="expand-icon-div"><span class="material-icons">
expand_more
</span></div>
    {Drivers.filter(driver => driver.shift ==="015am")
        .map(driver => (
           
        <div className="driver-container-content">
            {driver.name} ({driver.tractor})
        </div>
    
    ))}
    </div>
<div className="driver-container-label"><span>230am</span><div className="expand-icon-div"><span class="material-icons">
expand_more
</span></div>
    {Drivers.filter(driver => driver.shift ==="230am")
        .map(driver => (
           
        <div className="driver-container-content">
            {driver.name} ({driver.tractor})
        </div>
    
    ))}
    </div>
    <div className="driver-container">
<div className="driver-container-label"><span>3am</span><div className="expand-icon-div"><span class="material-icons">
expand_more
</span></div>
    {Drivers.filter(driver => driver.shift ==="3am")
        .map(driver => (
           
        <div className="driver-container-content">
            {driver.name} ({driver.tractor})
        </div>
    
    ))}
    </div>
<div className="driver-container-label"><span>330am</span><div className="expand-icon-div"><span class="material-icons">
expand_more
</span></div>
    {Drivers.filter(driver => driver.shift ==="330am")
        .map(driver => (
           
        <div className="driver-container-content">
            {driver.name} ({driver.tractor})
        </div>
    
    ))}
    </div>
<div className="driver-container-label"><span>5am</span><div className="expand-icon-div"><span class="material-icons">
expand_more
</span></div>
    {Drivers.filter(driver => driver.shift ==="5am")
        .map(driver => (
           
        <div className="driver-container-content">
            {driver.name} ({driver.tractor})
        </div>
    
    ))}
    </div>
    </div>
    </React.Fragment>
    </div>
)

    

export default CreateDriver