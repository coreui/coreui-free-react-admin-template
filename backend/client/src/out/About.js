import React, { Component } from "react"
import "./About.css"
import { Link } from "react-router-dom"

class About extends Component 
{
    render() 
    {
        return (
            <div className="About_container justify-content-center">
                <div className="About_content_wrap mx-auto mt-n5">
                    <div className="ml-3">
                        <p id="About_up_text">
                            Welcome to NTUEE+
                        </p>
                    </div>
                    <div className="ml-3">
                        <p id="About_down_text">
                            我們希望這個聯絡網能成為<br />
                            一個整合式的社群網路，<br />
                            讓NTUEErs聚在一起；<br />
                            秉持著恢復人脈網的精神，<br />
                            讓NTUEE能在世界上有更大的影響力；<br />
                            建立一個連結電機系的共同回憶，<br />
                            讓系友們有專屬的家！
                        </p>
                    </div>
                    <div className="justify-content-center d-flex p-auto">
                        <Link id="About_join" to="/Login">
                            <button id="About_join_btn" className="btn text-center justify-content-center">
                                JOIN US
                            </button>
                        </Link>
                    </div>
                </div>

            </div>



        )
    }
}

export default About
