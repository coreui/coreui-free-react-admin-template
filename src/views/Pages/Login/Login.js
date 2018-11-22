import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Particles from 'react-particles-js';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Login extends Component {
  render() {
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
          <Form>
          <h1>Login</h1>
          <p className="text-muted">Sign In to your account</p>
          <InputGroup className="mb-3">
          <InputGroupAddon addonType="prepend">
          <InputGroupText>
          <i className="icon-user"></i>
          </InputGroupText>
          </InputGroupAddon>
          <Input type="text" placeholder="Username" autoComplete="username" />
          </InputGroup>
          <InputGroup className="mb-4">
          <InputGroupAddon addonType="prepend">
          <InputGroupText>
          <i className="icon-lock"></i>
          </InputGroupText>
          </InputGroupAddon>
          <Input type="password" placeholder="Password" autoComplete="current-password" />
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
