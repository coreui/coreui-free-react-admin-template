import React from 'react'
 
const DriverSchedule = () => {
    return (
        <div driver-accordion__container>
        <div className="driver-accordion__label"><div className="h3-label"><h3>9am</h3></div><div className="h5-label"><h5>Subitems</h5></div><div className="h5-label"><h5>Status</h5></div></div>
            <div className="sriver-accordion-content__container">
                {Drivers.filter(driver => driver.shift === "9am")
                    .map(driver => (
                        <React.Fragment>

                            <div className="driver-accordion__content">
                            <div className="driver-info"><div className="driver-info-content">{driver.name} ({driver.tractor})</div><div className="driver-info-speech"><BsChat/></div></div>
                                <div className="driver-subItem">
                                    <div className="driver-subItem-icon"><FcParallelTasks size={32} /></div>
                                    <div className="driver-subItem-icon-items">1</div>
                                </div>
                                <div className="driver-status">Status</div>
                                <div className="driver-status">Load 1</div>
                                <div className="driver-status">Load 2</div>
                                <div className="driver-status">Load 3</div>
                                <div className="driver-status">Load 4</div>
                                <div className="driver-status">Load 5</div>
                            </div>


                        </React.Fragment>

                    ))}
            </div>
        </div>
    )
}
export default DriverSchedule