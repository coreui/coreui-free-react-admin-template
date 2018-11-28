import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Particles from 'react-particles-js';
import axios from 'axios';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, FormFeedback, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import auth from '../../../Auth';

class Login extends Component {

  state = {
    username: '',
    password: '',
  };

  componentDidMount() {
    if (auth.isLoggedIn()) {
      auth.hasAValidToken()
        .then(response => {
          auth.hasValidToken = true;
          this.setState({ redirectToReferrer: true })
        })
        .catch(err => {
          auth.signout()
        });
    }
  }

  handleChange = event => {
    // if (event.target.name === ('username' || 'password')) {
      this.setState({[event.target.name]: event.target.value});
    // }
  };

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password
    };

    axios.post('http://127.0.0.1:3001/login/auth', user)
      .then(res => {
        auth.authenticate(res.data.token);
        this.setState({ redirectToReferrer: true })
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      })
  };


  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      )
    }

    return (
      <div>
        <Particles style={{position: 'absolute'}} params={
          {
            particles: {
              number: {
                value: 40,
                density: {
                  enable: true,
                  value_area: 700
                }
              },
              color: {
                value: ["#aa73ff", "#f8c210", "#83d238", "#33b1f8"]
              },
              shape: {
                type: "circle",
                stroke: {
                  width: 0,
                  color: "#000000"
                },
                polygon: {
                  nb_sides: 15
                }
              },
              opacity: {
                value: 0.5,
                random: false,
                anim: {
                  enable: false,
                  speed: 1.5,
                  opacity_min: 0.15,
                  sync: false
                }
              },
              size: {
                value: 2.5,
                random: false,
                anim: {
                  enable: true,
                  speed: 2,
                  size_min: 0.15,
                  sync: false
                }
              },
              line_linked: {
                enable: true,
                distance: 110,
                color: "#33b1f8",
                opacity: 0.25,
                width: 1
              },
              move: {
                enable: true,
                speed: 1.6,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                  enable: false,
                  rotateX: 600,
                  rotateY: 1200
                }
              }
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: {
                  enable: false,
                  mode: "repulse"
                },
                onclick: {
                  enable: false,
                  mode: "push"
                },
                resize: true
              },
              modes: {
                grab: {
                  distance: 400,
                  line_linked: {
                    opacity: 1
                  }
                },
                "bubble": {
                  "distance": 400,
                  "size": 40,
                  "duration": 2,
                  "opacity": 8,
                  "speed": 3
                },
                "repulse": {
                  "distance": 200,
                  "duration": 0.4
                },
                "push": {
                  "particles_nb": 4
                },
                "remove": {
                  "particles_nb": 2
                }
              }
            },
            "retina_detect": true
          }
        }/>
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="6">
                <CardGroup>
                  <Card className="p-4">
                    <CardBody>
                      <Form onSubmit={this.handleSubmit}>
                        <h1>Login</h1>
                        <p className="text-muted">Sign In to your account</p>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" name="username" onChange={this.handleChange} placeholder="Username" autoComplete="username" invalid/>
                          <FormFeedback>Oh noes! that name is already taken</FormFeedback>
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="password" name="password" onChange={this.handleChange} placeholder="Password" autoComplete="current-password" />
                        </InputGroup>
                        <Row>
                          <Col xs="6">
                            <Button color="primary" className="px-4">Login</Button>
                          </Col>
                          <Col xs="6" className="text-right">
                            <Button color="link" className="px-0">Forgot password?</Button>
                          </Col>
                        </Row>
                      </Form>
                    </CardBody>
                  </Card>
                </CardGroup>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Login;
