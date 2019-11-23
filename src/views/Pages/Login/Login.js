import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import Cookies from 'js-cookie'
import server from '../../../serverInfo';
import axios from 'axios';


// const fakeAuth = {
//   isAuthenticated: false,
//   authenticate(cb) {
//     this.isAuthenticated = true
//     setTimeout(cb, 100)
//   },
//   signout(cb) {
//     this.isAuthenticated = false
//     setTimeout(cb, 100)
//   }
// }

// const Public = () => <h3>Public</h3>
// const Protected = () => <h3>Protected</h3>


// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={(props) => (
//     fakeAuth.isAuthenticated === true
//       ? <Component {...props} />
//       : <Redirect to='/login' />
//   )} />
// )

class Login extends Component {
  
  constructor(props) {
    super(props);
    this.loginClick = this.loginClick.bind(this);

    // this._onBlur = this._onBlur.bind(this)
    // this._onFocus = this._onFocus.bind(this)
    
    this.state = {
        login: "",
        password: "",
    };
  }

  // login = () => {
  //   fakeAuth.authenticate(() => {
  //     this.setState(() => ({
  //       redirectToReferrer: true
  //     }))
  //   })
  // }

  loginClick() { 
    let list = {
        "login": this.state.login,
        "password": this.state.password,
    }

    axios.post(server.addr + '/api/list/', { list })
      .then(res => {
        if(res.status == 200)
        {
          this.props.setToken(res.data.token);
        }
        console.log(res);
        console.log(res.data);
        console.log(Cookies.get('token'));
      })
  }
  // loginChange(e) {
  //   this.setState({login: e.target.value});
  // }


  render() {

    if (this.props.token) {
      return <Redirect to={"/"} />
    }

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" 
                          placeholder="Username" 
                          autoComplete="username" 
                          onChange={(e) => this.setState({login: e.target.value})} 
                          defaultValue={this.state.login}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" 
                          placeholder="Password" 
                          autoComplete="current-password" 
                          defaultValue={this.state.password}
                          onChange={(e) => this.setState({password: e.target.value})}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={this.loginClick}>Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                {/* <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card> */}
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
