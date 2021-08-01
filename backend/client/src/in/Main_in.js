import React,{ Component } from 'react';
import {Route,Switch} from "react-router-dom";
import Slidebar from "./Slidebar"
import { Column_page, Career_page, Study_page,Search_page} from "./pages_in";
import {column_app} from "./column_text/column_app";
import {career_app} from "./career_in/career_app";
import "./Main_in.css";
import {NavBar_in} from "../component/AppBar_in";
import Profile_for_search from '../component/Profile';
class Main_in extends Component{
    render(){
        return(
            <div id="Main_in_container">
                <NavBar_in/>
                <Slidebar/>
                <Switch>
                    {//<Route path="/in/Home_in" exact component={Home_in_page} />
    }
                    <Route path="/in/Column"  exact component={Column_page} />
                    <Route path="/in/Column/pages" component = {column_app}/>
                    <Route path="/in/Career"  exact component={Career_page} />
                    <Route path="/in/Career/pages" component = {career_app}/>
                    <Route path="/in/Study"  exact component={Study_page} />
					<Route path="/in/Search"  exact component={Search_page} />
                    <Route path="/in/:handle" exact component={Profile_for_search} />
                </Switch>
            </div>
        )
    }
}

export default Main_in;