import React,{Component} from "react";
import {Route,Switch} from "react-router-dom";
import {Register_account_page, Register_facebook_page} from "./Register_pages";
class register_app extends Component{
    render(){
        return(
            <div>
                <Switch>
                    <Route path="/Register/pages/Register_account" exact component={Register_account_page}/>
                    <Route path="/Register/pages/Register_facebook" exact component={Register_facebook_page}/>
                </Switch>
            </div>
        )
}
}

export default register_app;