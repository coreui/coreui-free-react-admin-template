import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";

import * as Cookies from "es-cookie";
import { SIGNIN_USER } from "../../../schema/schema";
import { Mutation } from "react-apollo";

const initialState = {
  userName: "",
  password: "",
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
  }

  clearState() {
    this.setState({ ...initialState });
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event, signinUser) {
    event.preventDefault();
    signinUser()
      .then(async ({ data }) => {
        Cookies.set("token", data.signinUser.token);
        this.props.history.push("/dashboard");
      })
      .catch(() => {
        this.setState({
          error:
            "User name and password does not match. Please adjust and try again.",
        });
      });
  }

  render() {
    const { userName, password } = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Mutation
                      mutation={SIGNIN_USER}
                      variables={{
                        userName,
                        password,
                      }}
                    >
                      {(signinUser, { loading }) => {
                        return (
                          <Form>
                            <h1>Login</h1>
                            <p className="text-muted">
                              Sign In to your account
                            </p>
                            <InputGroup className="mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="icon-user"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                type="text"
                                name="userName"
                                placeholder="Username"
                                autoComplete="username"
                                value={userName}
                                onChange={this.handleChange.bind(this)}
                              />
                            </InputGroup>
                            <InputGroup className="mb-4">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="icon-lock"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                type="password"
                                name="password"
                                placeholder="Password"
                                autoComplete="current-password"
                                value={password}
                                onChange={this.handleChange.bind(this)}
                              />
                            </InputGroup>
                            <Row>
                              <Col xs="6">
                                <Button
                                  color="primary"
                                  className="px-4"
                                  disabled={loading}
                                  onClick={(event) =>
                                    this.handleSubmit(event, signinUser)
                                  }
                                >
                                  Login
                                </Button>
                              </Col>
                              <Col xs="6" className="text-right">
                                <Button color="link" className="px-0">
                                  Forgot password?
                                </Button>
                              </Col>
                            </Row>
                          </Form>
                        );
                      }}
                    </Mutation>
                  </CardBody>
                </Card>
                <Card
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: "44%" }}
                >
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                      </p>
                      <Link to="/register">
                        <Button
                          color="primary"
                          className="mt-3"
                          active
                          tabIndex={-1}
                        >
                          Register Now!
                        </Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
