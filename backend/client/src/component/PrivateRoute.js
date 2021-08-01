// import React from 'react';
// import { Component } from 'react'
// import { connect } from 'react-redux'
// import { getIslogin } from '../redux/actions/loginAction';
// //import { get } from 'lodash'
// import PropTypes from 'prop-types'
// //import toastr from 'toastr'
// //mport {api,storage} from "service"
// import { Route } from 'react-router-dom'
// import { Redirect } from 'react-router'
// //import { LoadingIndicator } from 'components'
// //import axios from 'axios'
// import {isLoginChecker} from '../in/isLogin'
// export class PrivateRoute extends Component {
//   constructor (props) {
//     super(props)

//     this.state = {
//       isLoading: true, // 是否於權限檢核中
//       isLogin: false  // 是否通過權限檢核
//     }

//     //this.isLoginChecker = isLoginChecker.bind();
//   }
//   // static propTypes = {
//   //   component: PropTypes.any.isRequired,
//   //   //funcCode: PropTypes.string.isRequired
//   // }
//   checkAuth = () => {
        
//     console.log("isLogin: "+this.state.isLogin)
//     this.setState({
//       isLogin:false,
//     })
//     // let isAuthed = false
//     // const { isLogin, funcCode } = this.props

//     // if (isLogin) {

//     //   // 設定狀態為權限檢核中 ...
//     //   this.setState(state => ({ ...state, isLoading: true }))

//     //   // 與遠端 API 確認權限 ...
//     //   // token 可以從 axios interceptor 透過 head 送到後端
//     //   // funcCode 需要從外部取得送至後端驗證使用者是否有此功能的權限
//     // //   isAuthed = await api.checkAuthWithServer(funcCode)
//     //     isAuthed = await this.getIsLogin();
//     // }

//     // if (!isAuthed) {
//     //   // 無權限顯示提示訊息
//     //   toastr.warning('無權使用，請先登入系統')
//     // }

//     // // 更新狀態 1.檢核結束 2.檢核結果
//     // this.setState(state => ({ ...state, isAuthed: isAuthed, isLoading: false }))
//   }

//   componentWillMount(){
//    this.checkAuth()
//   }

//   // componentWillReceiveProps = async (nextProps) => {
//   //   if (nextProps.path !== this.props.path) {
//   //     await this.checkAuth()
//   //   }
//   // }

//   render () {
//     const { component: Component, ...rest } = this.props
//     const { isLoading, isLogin } = this.state
//     console.log(this.state)
//     return (
//       isLoading === true
//         ? alert("請稍候...")
//         : <Route {...rest} render={props => (
//             isLogin
//               ? <Component {...props} />
//               : <Redirect to={{ pathname: '/in/Study', state: { from: props.location } }} />
//           )} />
//     )
//   }

// }

// export default PrivateRoute;

// // const mapStateToProps = state => ({
// //   isLogin: state.get('isLogin')
// // })

// // const mapDispatchToProps = dispatch => ({
// // })

// // export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)
import React from 'react';
//import { Component } from 'react'
import {Route,Redirect} from 'react-router-dom';
import { Component } from 'react';

const fakeAuth = {
  isLogin: false,
  login(cb){
    this.isLogin = true
    setTimeout(cb,100)
  },
  signout(cb){
    this.isLogin = false
    setTimeout(cb,100)
  }
}

const PrivateRoute =({ component: Component, ...rest}) =>(
  <Route {...rest} render={(props)=>(
    fakeAuth.isLogin === true
    ? <Component {...props}/>
    : <Redirect to='/login' />
  )}/>
)

export {PrivateRoute};