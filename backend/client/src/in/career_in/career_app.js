import React,{Component} from "react";
import {Route,Switch} from "react-router-dom";
import {Recruitment_page} from "./career_pages";
import {Recommendation_page} from "./career_pages";

class career_app extends Component{
    render(){
        return(
            <div>
                <Switch>
                    <Route path="/in/Career/pages/Recommendation" exact component={Recommendation_page}/>
                    <Route path="/in/Career/pages/Recruitment" exact component={Recruitment_page}/>
                </Switch>
            </div>
        )
}
}

export {career_app};