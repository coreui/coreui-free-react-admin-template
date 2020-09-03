import React from 'react'
import { FaSortDown } from 'react-icons/fa';
import Drivers from '../../../utils/drivers/driverlist'
import { ItemTypes } from '../../../utils/DnD/items.js'
import './createdriver.css'
import { useDrop } from 'react-dnd';

const CreateDriver = props => {
    
    const [{ isOver }, drop] = useDrop({
                accept: ItemTypes.CARD,
                        id: props.id
                ,
                collect: monitor => ({
                        isOver: !!monitor.isOver()
                })
        });

    return(
    <div className="driver-container">
        <React.Fragment>
            <div className="driver-container-label" key={Drivers.id}><h3>8am</h3>
                {Drivers.filter(driver => driver.shift === "8am")
                    .map(driver => (

                        <div 
                            ref={drop} 
                            key={driver.id}
                            opacity={isOver ? alert('green') : 'red'}
                            className="driver-container-content">
                       
                            {driver.name} ({driver.tractor})
                            <FaSortDown className="sortDown"/>
                        </div>

                    ))}
            </div>
            
            <div className="driver-container-label"><h3>9am</h3>
                {Drivers.filter(driver => driver.shift === "9am")
                    .map(driver => (

                        <div className="driver-container-content">
                            {driver.name} ({driver.tractor})
                            <FaSortDown className="sortDown"/>
                        </div>

                    ))}
            </div>
            <div className="driver-container-label"><h3>11am</h3>
                {Drivers.filter(driver => driver.shift === "11am")
                    .map(driver => (

                        <div className="driver-container-content">
                            {driver.name} ({driver.tractor})
                            <FaSortDown className="sortDown"/>
                        </div>

                    ))}
            </div>
            <div className="driver-container-label"><h3>12pm</h3>
                {Drivers.filter(driver => driver.shift === "12pm")
                    .map(driver => (

                        <div className="driver-container-content">
                            {driver.name} ({driver.tractor})
                            <FaSortDown className="sortDown"/>
                        </div>

                    ))}
            </div>
            <div className="driver-container-label"><h3>2pm</h3>
                {Drivers.filter(driver => driver.shift === "2pm")
                    .map(driver => (

                        <div className="driver-container-content">
                            {driver.name} ({driver.tractor})
                            <FaSortDown className="sortDown"/>
                        </div>

                    ))}
            </div>
            <div className="driver-container-label"><h3>3pm</h3>
                {Drivers.filter(driver => driver.shift === "3pm")
                    .map(driver => (

                        <div className="driver-container-content">
                            {driver.name} ({driver.tractor})
                            <FaSortDown className="sortDown"/>
                        </div>

                    ))}
            </div>
            <div className="driver-container-label"><h3>4pm</h3>
                {Drivers.filter(driver => driver.shift === "4pm")
                    .map(driver => (

                        <div className="driver-container-content">
                            {driver.name} ({driver.tractor})
                            <FaSortDown className="sortDown"/>
                        </div>

                    ))}
            </div>
            <div className="driver-container-label"><h3>5pm</h3>
                {Drivers.filter(driver => driver.shift === "5pm")
                    .map(driver => (

                        <div className="driver-container-content">
                            {driver.name} ({driver.tractor})
                            <FaSortDown className="sortDown"/>
                        </div>

                    ))}
            </div>
            <div className="driver-container-label"><h3>6pm</h3>
                {Drivers.filter(driver => driver.shift === "6pm")
                    .map(driver => (

                        <div className="driver-container-content">
                            {driver.name} ({driver.tractor})
                            <FaSortDown className="sortDown"/>
                        </div>

                    ))}
            </div>
            <div className="driver-container-label"><h3>7pm</h3>
                {Drivers.filter(driver => driver.shift === "7pm")
                    .map(driver => (

                        <div className="driver-container-content">
                            {driver.name} ({driver.tractor})
                            <FaSortDown className="sortDown"/>
                        </div>

                    ))}
            </div>
            <div className="driver-container-label"><h3>730pm</h3>
                {Drivers.filter(driver => driver.shift === "730pm")
                    .map(driver => (

                        <div className="driver-container-content">
                            {driver.name} ({driver.tractor})
                            <FaSortDown className="sortDown"/>
                        </div>

                    ))}
            </div>
            <div className="driver-container-label"><h3>830pm</h3>
                {Drivers.filter(driver => driver.shift === "830pm")
                    .map(driver => (

                        <div className="driver-container-content">
                            {driver.name} ({driver.tractor})
                            <FaSortDown className="sortDown"/>
                        </div>

                    ))}
            </div>
            <div className="driver-container-label"><h3>930pm</h3>
                {Drivers.filter(driver => driver.shift === "930pm")
                    .map(driver => (

                        <div className="driver-container-content">
                            {driver.name} ({driver.tractor})
                            <FaSortDown className="sortDown"/>
                        </div>

                    ))}
            </div>
            <div className="driver-container-label"><h3>11pm</h3>
                {Drivers.filter(driver => driver.shift === "11pm")
                    .map(driver => (

                        <div className="driver-container-content">
                            {driver.name} ({driver.tractor})
                            <FaSortDown className="sortDown"/>
                        </div>

                    ))}
            </div>
            <div className="driver-container-label"><h3>015am</h3>
                {Drivers.filter(driver => driver.shift === "015am")
                    .map(driver => (

                        <div className="driver-container-content">
                            {driver.name} ({driver.tractor})
                            <FaSortDown className="sortDown"/>
                        </div>

                    ))}
            </div>
            <div className="driver-container-label"><h3>230am</h3>
                {Drivers.filter(driver => driver.shift === "230am")
                    .map(driver => (

                        <div className="driver-container-content">
                            {driver.name} ({driver.tractor})
                            <FaSortDown className="sortDown"/>
                        </div>

                    ))}
            </div>
            <div className="driver-container-label"><h3>3am</h3>
                {Drivers.filter(driver => driver.shift === "3am")
                    .map(driver => (

                        <div className="driver-container-content">
                            {driver.name} ({driver.tractor})
                            <FaSortDown className="sortDown"/>
                        </div>

                    ))}
            </div>
            <div className="driver-container-label"><h3>330am</h3>
                {Drivers.filter(driver => driver.shift === "330am")
                    .map(driver => (

                        <div className="driver-container-content">
                            {driver.name} ({driver.tractor})
                            <FaSortDown className="sortDown"/>
                        </div>

                    ))}
            </div>
            <div className="driver-container-label"><h3>5am</h3>
                {Drivers.filter(driver => driver.shift === "5am")
                    .map(driver => (

                        <div className="driver-container-content">
                            {driver.name} ({driver.tractor})
                            <FaSortDown className="sortDown"/>
                        </div>

                    ))}
            </div>
    </React.Fragment>
</div>
    )}




export default CreateDriver