import React from 'react'

import './DispatchHeader.css'

const DispatchHeader = () => {
    return (
        <React.Fragment>
            <div className="header-container">
                <div className="header-totals">
                    <div className="header-totals-container__dry">
                        <div className="header-totals-container-__routes-items"><h3>Total Routes: 63</h3></div>
                        <div className="header-totals-container-__routes-items"><h3>Holds: 80</h3></div>
                        <div className="header-totals-container-__routes-items"><h3>Rolls: 0</h3></div>
                        <div className="header-totals-container-__routes-items"><h3>175 ADDS: 0</h3></div>
                    </div>
                    <div className="header-totals-container__wet">
                    <div className="header-totals-container-__routes-items"><h3>Offer Chill: 44</h3></div>
                    <div className="header-totals-container-__routes-items"><h3>Total Chill: 51</h3></div>
                    <div className="header-totals-container-__routes-items"><h3>Splits: 51</h3></div>
                    <div className="header-totals-container-__routes-items"><h3>Total For Today: 51</h3></div>
                    <div className="header-totals-container-__routes-items"><h3>265 ADDS: 51</h3></div>
                    </div>
                    <div className="header-totals-container__drivers">
                    <div className="header-totals-container-__routes-items"><h3>Drivers: 144</h3></div>
                    </div>
                </div>
            </div>
        </React.Fragment>


    )
}
export default DispatchHeader