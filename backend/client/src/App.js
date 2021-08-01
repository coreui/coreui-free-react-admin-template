import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import "regenerator-runtime/runtime";
import {
  Home_page,
  Login_page,
  Support_page,
  About_page,
  Contact_page,
  Register_page,
  Forget_page,
  Team_page,
  History_page,
} from "./out/pages";
//import { Home_in_page, Column_page,Recruit_study_page, Main_in_page } from './in/pages_in';
//import PrivateRoute from './component/PrivateRoute';
import Register_app from "./out/register_in/Register_app";
import Test from "./test/Test";
import Login from "./out/Login";
// import {isLoginChecker} from './in/isLogin';
// import Footer from './component/Footer/Footer'
// import NavBar from './component/AppBar'
import "./App.css";
import { NavBar } from "./component/AppBar";
import Footer from "./component/Footer/Footer";
import ResetPassword_page from "./out/ResetPassword";
import Policy_page from "./out/Policy";
// import { get } from 'mongoose';
// import equal from 'fast-deep-equal';
//import {fakeAuth} from './auth';
/*class PrivateRoute extends Component {
    constructor (props) {
      super(props)
  
      this.state = {
        isLogin: false // 是否通過權限檢核
      }
  
    }
    /*checkAuth = async() => {
          
      //console.log("isLogin: "+this.state.isLogin)
      if(!this.state.isLogin){
        //setTimeout(alert("please wait"),1000)
        let isLogin = isLoginChecker()
        this.setState({
          isLogin:isLogin
        })
        
      }
    }
    componentWillMount(){
     this.checkAuth()
    }//
    UNSAFE_componentWillReceiveProps(){
      this.setState({
        isLogin:this.props.loginstatus
      })
    }
	
	componentDidUpdate(prevProps) {
	  if(!equal(this.props.loginstatus, prevProps.loginstatus))
	  {
		const propL = this.props.loginstatus;
		console.log('login state change',propL);
		this.setState((propL)=>({
			isLogin:propL
		}));
		
	  }
	} 
	
    render () {
      const { component: Component, ...rest } = this.props
      let isLogin = this.props.loginstatus;
      //const { isLogin } = this.state
      console.log("call PrivateRoute")
      console.log('PrivateRoute isLogin = ',isLogin)
      return (
		
         <Route {...rest} render={props => (
			 {this.state.isLogin}
                ? <Component {...props} />
                : <Redirect to='/Login' />
            )} />
      )
    }
  
  }*/

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={(props) => (
//     true
//       ? <Component {...props} />
//       : <Redirect to={{
//           pathname: '/Login',
//           state: { from: props.location }
//         }} />
//   )} />
// )

const App = () => {
  // class App extends Component {
  //   constructor(props){
  //     super(props);
  //     this.state = {
  //       isLogin:false
  //     }
  //     this.handleisLoginChange = this.handleisLoginChange.bind(this);
  //   }
  //   handleisLoginChange = (isLogin) =>{
  //     console.log("call handleisLoginChange")
  //     console.log(isLogin)
  //     this.setState({
  //       isLogin:isLogin
  //     })
  // 	localStorage.setItem('auth',true);
  // 	if(isLogin) window.location = "/in";
  //     console.log('App isLogin = ',this.state.isLogin)
  //   }
  //   render() {
  return (
    <div className="contain">
      <NavBar />
      {/* The corresponding component will show here if the current URL matches the path */}
      <Route path="/" exact component={Home_page} />
      {/* <Route path="/Login" component={Login_page} loginFunc={this.handleisLoginChange} /> */}
      <Route path="/Login" render={(props) => <Login {...props} />} />
      <Route path="/Support" component={Support_page} />
      <Route path="/About" component={About_page} />
      <Route path="/Contact" component={Contact_page} />
      <Route path="/Register" exact component={Register_page} />
      <Route path="/Register/pages" component={Register_app} />
      <Route path="/Forget" component={Forget_page} />
      {/* <Route path="/in" component={Main_in_page} /> */}
      {/* <PrivateRoute path="/in" component={Main_in_page} loginstatus={this.state.isLogin}/> */}
      <Route path="/Team" component={Team_page} />
      <Route
        path="/ResetPassword/:account/:active"
        component={ResetPassword_page}
      />
      <Route path="/History" component={History_page} />
      <Route path="/Policy" component={Policy_page} />
      {<Route path="/Test" component={Test} />}{/* don't use it in product */}
      <Footer />
    </div>
  );
};

export default App;
