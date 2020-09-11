import React from 'react'
import { FcParallelTasks } from "react-icons/fc";
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

    return (
        <div className="driver-accordion">
            <React.Fragment>
                <div driver-accordion__container>
                    <div className="driver-accordion__label"><div className="h3-label"><h3>8am</h3></div><div className="h5-label"><h5>Subitems</h5></div><div className="h5-label"><h5>Status</h5></div></div>
                    <div className="sriver-accordion-content__container">
                        {Drivers.filter(driver => driver.shift === "8am")
                            .map(driver => (
                                <React.Fragment>

                                    <div className="driver-accordion__content">
                                        <div className="driver-info">{driver.name} ({driver.tractor})</div>
                                        <div className="driver-subItem">
                                            <div className="driver-subItem-icon"><FcParallelTasks size={32} /></div>
                                            <div className="driver-subItem-icon-items">1</div>
                                        </div>
                                        <div className="driver-status">Status</div>
                                    </div>


                                </React.Fragment>

                            ))}
                    </div>
                </div>

                <div driver-accordion__container>
                <div className="driver-accordion__label"><div className="h3-label"><h3>8am</h3></div><div className="h5-label"><h5>Subitems</h5></div><div className="h5-label"><h5>Status</h5></div></div>
                    <div className="sriver-accordion-content__container">
                        {Drivers.filter(driver => driver.shift === "9am")
                            .map(driver => (
                                <React.Fragment>

                                    <div className="driver-accordion__content">
                                        <div className="driver-info">{driver.name} ({driver.tractor})</div>
                                        <div className="driver-subItem">
                                            <div className="driver-subItem-icon"><FcParallelTasks size={32} /></div>
                                            <div className="driver-subItem-icon-items">1</div>
                                        </div>
                                        <div className="driver-status">Status</div>
                                    </div>


                                </React.Fragment>

                            ))}
                    </div>
                </div>
                <div driver-accordion__container>
                <div className="driver-accordion__label"><div className="h3-label"><h3>8am</h3></div><div className="h5-label"><h5>Subitems</h5></div><div className="h5-label"><h5>Status</h5></div></div>
                    <div className="sriver-accordion-content__container">
                        {Drivers.filter(driver => driver.shift === "11am")
                            .map(driver => (
                                <React.Fragment>

                                    <div className="driver-accordion__content">
                                        <div className="driver-info">{driver.name} ({driver.tractor})</div>
                                        <div className="driver-subItem">
                                            <div className="driver-subItem-icon"><FcParallelTasks size={32} /></div>
                                            <div className="driver-subItem-icon-items">1</div>
                                        </div>
                                        <div className="driver-status">Status</div>
                                    </div>


                                </React.Fragment>

                            ))}
                    </div>
                </div>
                <div driver-accordion__container>
                <div className="driver-accordion__label"><div className="h3-label"><h3>8am</h3></div><div className="h5-label"><h5>Subitems</h5></div><div className="h5-label"><h5>Status</h5></div></div>
                    <div className="sriver-accordion-content__container">
                        {Drivers.filter(driver => driver.shift === "12pm")
                            .map(driver => (
                                <React.Fragment>

                                    <div className="driver-accordion__content">
                                        <div className="driver-info">{driver.name} ({driver.tractor})</div>
                                        <div className="driver-subItem">
                                            <div className="driver-subItem-icon"><FcParallelTasks size={32} /></div>
                                            <div className="driver-subItem-icon-items">1</div>
                                        </div>
                                        <div className="driver-status">Status</div>
                                    </div>


                                </React.Fragment>

                            ))}
                    </div>
                </div>
               <div driver-accordion__container>
               <div className="driver-accordion__label"><div className="h3-label"><h3>8am</h3></div><div className="h5-label"><h5>Subitems</h5></div><div className="h5-label"><h5>Status</h5></div></div>
                    <div className="sriver-accordion-content__container">
                        {Drivers.filter(driver => driver.shift === "2pm")
                            .map(driver => (
                                <React.Fragment>

                                    <div className="driver-accordion__content">
                                        <div className="driver-info">{driver.name} ({driver.tractor})</div>
                                        <div className="driver-subItem">
                                            <div className="driver-subItem-icon"><FcParallelTasks size={32} /></div>
                                            <div className="driver-subItem-icon-items">1</div>
                                        </div>
                                        <div className="driver-status">Status</div>
                                    </div>


                                </React.Fragment>

                            ))}
                    </div>
                </div>
                <div driver-accordion__container>
                <div className="driver-accordion__label"><div className="h3-label"><h3>8am</h3></div><div className="h5-label"><h5>Subitems</h5></div><div className="h5-label"><h5>Status</h5></div></div>
                    <div className="sriver-accordion-content__container">
                        {Drivers.filter(driver => driver.shift === "3pm")
                            .map(driver => (
                                <React.Fragment>

                                    <div className="driver-accordion__content">
                                        <div className="driver-info">{driver.name} ({driver.tractor})</div>
                                        <div className="driver-subItem">
                                            <div className="driver-subItem-icon"><FcParallelTasks size={32} /></div>
                                            <div className="driver-subItem-icon-items">1</div>
                                        </div>
                                        <div className="driver-status">Status</div>
                                    </div>


                                </React.Fragment>

                            ))}
                    </div>
                </div>
                <div driver-accordion__container>
                <div className="driver-accordion__label"><div className="h3-label"><h3>8am</h3></div><div className="h5-label"><h5>Subitems</h5></div><div className="h5-label"><h5>Status</h5></div></div>
                    <div className="sriver-accordion-content__container">
                        {Drivers.filter(driver => driver.shift === "4pm")
                            .map(driver => (
                                <React.Fragment>

                                    <div className="driver-accordion__content">
                                        <div className="driver-info">{driver.name} ({driver.tractor})</div>
                                        <div className="driver-subItem">
                                            <div className="driver-subItem-icon"><FcParallelTasks size={32} /></div>
                                            <div className="driver-subItem-icon-items">1</div>
                                        </div>
                                        <div className="driver-status">Status</div>
                                    </div>


                                </React.Fragment>

                            ))}
                    </div>
                </div>
                <div driver-accordion__container>
                <div className="driver-accordion__label"><div className="h3-label"><h3>8am</h3></div><div className="h5-label"><h5>Subitems</h5></div><div className="h5-label"><h5>Status</h5></div></div>
                    <div className="sriver-accordion-content__container">
                        {Drivers.filter(driver => driver.shift === "5pm")
                            .map(driver => (
                                <React.Fragment>

                                    <div className="driver-accordion__content">
                                        <div className="driver-info">{driver.name} ({driver.tractor})</div>
                                        <div className="driver-subItem">
                                            <div className="driver-subItem-icon"><FcParallelTasks size={32} /></div>
                                            <div className="driver-subItem-icon-items">1</div>
                                        </div>
                                        <div className="driver-status">Status</div>
                                    </div>


                                </React.Fragment>

                            ))}
                    </div>
                </div>
                <div driver-accordion__container>
                <div className="driver-accordion__label"><div className="h3-label"><h3>8am</h3></div><div className="h5-label"><h5>Subitems</h5></div><div className="h5-label"><h5>Status</h5></div></div>
                    <div className="sriver-accordion-content__container">
                        {Drivers.filter(driver => driver.shift === "6pm")
                            .map(driver => (
                                <React.Fragment>

                                    <div className="driver-accordion__content">
                                        <div className="driver-info">{driver.name} ({driver.tractor})</div>
                                        <div className="driver-subItem">
                                            <div className="driver-subItem-icon"><FcParallelTasks size={32} /></div>
                                            <div className="driver-subItem-icon-items">1</div>
                                        </div>
                                        <div className="driver-status">Status</div>
                                    </div>


                                </React.Fragment>

                            ))}
                    </div>
                </div>
                <div driver-accordion__container>
                <div className="driver-accordion__label"><div className="h3-label"><h3>8am</h3></div><div className="h5-label"><h5>Subitems</h5></div><div className="h5-label"><h5>Status</h5></div></div>
                    <div className="sriver-accordion-content__container">
                        {Drivers.filter(driver => driver.shift === "7pm")
                            .map(driver => (
                                <React.Fragment>

                                    <div className="driver-accordion__content">
                                        <div className="driver-info">{driver.name} ({driver.tractor})</div>
                                        <div className="driver-subItem">
                                            <div className="driver-subItem-icon"><FcParallelTasks size={32} /></div>
                                            <div className="driver-subItem-icon-items">1</div>
                                        </div>
                                        <div className="driver-status">Status</div>
                                    </div>


                                </React.Fragment>

                            ))}
                    </div>
                </div>
                <div driver-accordion__container>
                <div className="driver-accordion__label"><div className="h3-label"><h3>8am</h3></div><div className="h5-label"><h5>Subitems</h5></div><div className="h5-label"><h5>Status</h5></div></div>
                    <div className="sriver-accordion-content__container">
                        {Drivers.filter(driver => driver.shift === "730pm")
                            .map(driver => (
                                <React.Fragment>

                                    <div className="driver-accordion__content">
                                        <div className="driver-info">{driver.name} ({driver.tractor})</div>
                                        <div className="driver-subItem">
                                            <div className="driver-subItem-icon"><FcParallelTasks size={32} /></div>
                                            <div className="driver-subItem-icon-items">1</div>
                                        </div>
                                        <div className="driver-status">Status</div>
                                    </div>


                                </React.Fragment>

                            ))}
                    </div>
                </div>
                <div driver-accordion__container>
                <div className="driver-accordion__label"><div className="h3-label"><h3>8am</h3></div><div className="h5-label"><h5>Subitems</h5></div><div className="h5-label"><h5>Status</h5></div></div>
                    <div className="sriver-accordion-content__container">
                        {Drivers.filter(driver => driver.shift === "830pm")
                            .map(driver => (
                                <React.Fragment>

                                    <div className="driver-accordion__content">
                                        <div className="driver-info">{driver.name} ({driver.tractor})</div>
                                        <div className="driver-subItem">
                                            <div className="driver-subItem-icon"><FcParallelTasks size={32} /></div>
                                            <div className="driver-subItem-icon-items">1</div>
                                        </div>
                                        <div className="driver-status">Status</div>
                                    </div>


                                </React.Fragment>

                            ))}
                    </div>
                </div>
                <div driver-accordion__container>
                <div className="driver-accordion__label"><div className="h3-label"><h3>8am</h3></div><div className="h5-label"><h5>Subitems</h5></div><div className="h5-label"><h5>Status</h5></div></div>
                    <div className="sriver-accordion-content__container">
                        {Drivers.filter(driver => driver.shift === "930pm")
                            .map(driver => (
                                <React.Fragment>

                                    <div className="driver-accordion__content">
                                        <div className="driver-info">{driver.name} ({driver.tractor})</div>
                                        <div className="driver-subItem">
                                            <div className="driver-subItem-icon"><FcParallelTasks size={32} /></div>
                                            <div className="driver-subItem-icon-items">1</div>
                                        </div>
                                        <div className="driver-status">Status</div>
                                    </div>


                                </React.Fragment>

                            ))}
                    </div>
                </div>
                <div driver-accordion__container>
                <div className="driver-accordion__label"><div className="h3-label"><h3>8am</h3></div><div className="h5-label"><h5>Subitems</h5></div><div className="h5-label"><h5>Status</h5></div></div>
                    <div className="sriver-accordion-content__container">
                        {Drivers.filter(driver => driver.shift === "11pm")
                            .map(driver => (
                                <React.Fragment>

                                    <div className="driver-accordion__content">
                                        <div className="driver-info">{driver.name} ({driver.tractor})</div>
                                        <div className="driver-subItem">
                                            <div className="driver-subItem-icon"><FcParallelTasks size={32} /></div>
                                            <div className="driver-subItem-icon-items">1</div>
                                        </div>
                                        <div className="driver-status">Status</div>
                                    </div>


                                </React.Fragment>

                            ))}
                    </div>
                </div>
                <div driver-accordion__container>
                <div className="driver-accordion__label"><div className="h3-label"><h3>8am</h3></div><div className="h5-label"><h5>Subitems</h5></div><div className="h5-label"><h5>Status</h5></div></div>
                    <div className="sriver-accordion-content__container">
                        {Drivers.filter(driver => driver.shift === "015am")
                            .map(driver => (
                                <React.Fragment>

                                    <div className="driver-accordion__content">
                                        <div className="driver-info">{driver.name} ({driver.tractor})</div>
                                        <div className="driver-subItem">
                                            <div className="driver-subItem-icon"><FcParallelTasks size={32} /></div>
                                            <div className="driver-subItem-icon-items">1</div>
                                        </div>
                                        <div className="driver-status">Status</div>
                                    </div>


                                </React.Fragment>

                            ))}
                    </div>
                </div>
                <div driver-accordion__container>
                <div className="driver-accordion__label"><div className="h3-label"><h3>8am</h3></div><div className="h5-label"><h5>Subitems</h5></div><div className="h5-label"><h5>Status</h5></div></div>
                    <div className="sriver-accordion-content__container">
                        {Drivers.filter(driver => driver.shift === "230am")
                            .map(driver => (
                                <React.Fragment>

                                    <div className="driver-accordion__content">
                                        <div className="driver-info">{driver.name} ({driver.tractor})</div>
                                        <div className="driver-subItem">
                                            <div className="driver-subItem-icon"><FcParallelTasks size={32} /></div>
                                            <div className="driver-subItem-icon-items">1</div>
                                        </div>
                                        <div className="driver-status">Status</div>
                                    </div>


                                </React.Fragment>

                            ))}
                    </div>
                </div>
                <div driver-accordion__container>
                <div className="driver-accordion__label"><div className="h3-label"><h3>8am</h3></div><div className="h5-label"><h5>Subitems</h5></div><div className="h5-label"><h5>Status</h5></div></div>
                    <div className="sriver-accordion-content__container">
                        {Drivers.filter(driver => driver.shift === "3am")
                            .map(driver => (
                                <React.Fragment>

                                    <div className="driver-accordion__content">
                                        <div className="driver-info">{driver.name} ({driver.tractor})</div>
                                        <div className="driver-subItem">
                                            <div className="driver-subItem-icon"><FcParallelTasks size={32} /></div>
                                            <div className="driver-subItem-icon-items">1</div>
                                        </div>
                                        <div className="driver-status">Status</div>
                                    </div>


                                </React.Fragment>

                            ))}
                    </div>
                </div>
                <div driver-accordion__container>
                <div className="driver-accordion__label"><div className="h3-label"><h3>8am</h3></div><div className="h5-label"><h5>Subitems</h5></div><div className="h5-label"><h5>Status</h5></div></div>
                    <div className="sriver-accordion-content__container">
                        {Drivers.filter(driver => driver.shift === "330am")
                            .map(driver => (
                                <React.Fragment>

                                    <div className="driver-accordion__content">
                                        <div className="driver-info">{driver.name} ({driver.tractor})</div>
                                        <div className="driver-subItem">
                                            <div className="driver-subItem-icon"><FcParallelTasks size={32} /></div>
                                            <div className="driver-subItem-icon-items">1</div>
                                        </div>
                                        <div className="driver-status">Status</div>
                                    </div>


                                </React.Fragment>

                            ))}
                    </div>
                </div>
                <div driver-accordion__container>
                <div className="driver-accordion__label"><div className="h3-label"><h3>8am</h3></div><div className="h5-label"><h5>Subitems</h5></div><div className="h5-label"><h5>Status</h5></div></div>
                    <div className="sriver-accordion-content__container">
                        {Drivers.filter(driver => driver.shift === "5am")
                            .map(driver => (
                                <React.Fragment>

                                    <div className="driver-accordion__content">
                                        <div className="driver-info">{driver.name} ({driver.tractor})</div>
                                        <div className="driver-subItem">
                                            <div className="driver-subItem-icon"><FcParallelTasks size={32} /></div>
                                            <div className="driver-subItem-icon-items">1</div>
                                        </div>
                                        <div className="driver-status">Status</div>
                                    </div>


                                </React.Fragment>

                            ))}
                    </div>
                </div>
            </React.Fragment>
        </div>
    )
}




export default CreateDriver