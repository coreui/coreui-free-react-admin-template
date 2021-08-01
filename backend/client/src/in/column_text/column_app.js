import React,{Component} from "react";
import {Route,Switch} from "react-router-dom";
import {column_2001_page} from "./column_pages";
import {column_1912_page} from "./column_pages";
import {column_1910_page} from "./column_pages";
import {column_1909_page} from "./column_pages";
import {column_1908_page} from "./column_pages";
import {column_1907_page} from "./column_pages";
import {column_1808_page} from "./column_pages";
import {column_1807_page} from "./column_pages";
import {column_1806_page} from "./column_pages";
import {column_1805_page} from "./column_pages";
import {column_HungMingJiun_page} from "./column_pages";
import {column_1602_page} from "./column_pages";
import {column_1605_page} from "./column_pages";
import {column_1606_page} from "./column_pages";
import {column_1604_page} from "./column_pages";
import {column_1601_page} from "./column_pages";
import {column_1603_page} from "./column_pages";

class column_app extends Component{
    render(){
        return(
            <div>
                <Switch>
                    <Route path="/in/Column/pages/2001" exact component={column_2001_page}/>
                    <Route path="/in/Column/pages/1912" exact component={column_1912_page}/>
                    <Route path="/in/Column/pages/1910" exact component={column_1910_page}/>
                    <Route path="/in/Column/pages/1909" exact component={column_1909_page}/>
                    <Route path="/in/Column/pages/1908" exact component={column_1908_page}/>
                    <Route path="/in/Column/pages/1907" exact component={column_1907_page}/>
                    <Route path="/in/Column/pages/1808" exact component={column_1808_page}/>
                    <Route path="/in/Column/pages/1807" exact component={column_1807_page}/>
                    <Route path="/in/Column/pages/1806" exact component={column_1806_page}/>
                    <Route path="/in/Column/pages/1805" exact component={column_1805_page}/>
                    <Route path="/in/Column/pages/HungMingJiun" exact component={column_HungMingJiun_page}/>
                    <Route path="/in/Column/pages/1602" exact component={column_1602_page}/>
                    <Route path="/in/Column/pages/1605" exact component={column_1605_page}/>
                    <Route path="/in/Column/pages/1606" exact component={column_1606_page}/>
                    <Route path="/in/Column/pages/1604" exact component={column_1604_page}/>
                    <Route path="/in/Column/pages/1601" exact component={column_1601_page}/>
                    <Route path="/in/Column/pages/1603" exact component={column_1603_page}/>
                </Switch>
            </div>
        )
}
}

export {column_app};