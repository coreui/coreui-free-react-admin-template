import React, { Component } from "react"
import "./Support.css"

class Support extends Component 
{
    render() 
    {
        return (
            <div id="Support_container" class="col-8 offset-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                <div id="Support_up" className="d-flex justify-content-center ml-3">
                    <p id="Support_up_text" >
                        Your support is vital in enabling NTUEE+ to fulfill
                        our mission to chain all the alumnae in the world.
                    </p>
                </div>
                <div id="Support_down" className="d-flex justify-content-center ml-3">
                    <p id="Support_down_text">
                        帳戶:700-0001236-0553850
                        <br />
                        備註:NTUEE-PLUS
                    </p>
                </div>
            </div>
        )
    }
}

export default Support
