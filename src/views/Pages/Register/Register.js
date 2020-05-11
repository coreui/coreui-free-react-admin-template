import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
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
import { SIGNUP_USER } from "../../../schema/schema";
import { Mutation } from "react-apollo";

const initialState = {
  userName: "",
  password: "",
  email: "",
  companyName: "",
  firstName: "",
  lastName: "",
  passwordConfirm: "",
  error: "",
  passwordMatch: null,
};

class Register extends Component {
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

  handleSubmit(event, signupUser) {
    event.preventDefault();
    signupUser()
      .then(async ({ data }) => {
        Cookies.set("token", data.signupUser.token);
        this.props.history.push("/dashboard");
      })
      .catch(() => {
        this.setState({
          error:
            "Either your email or username is already taken. Please adjust and try again.",
        });
      });
  }

  isValidForm() {
    return (
      this.state.userName &&
      this.state.password &&
      this.state.email &&
      this.state.companyName &&
      this.state.firstName &&
      this.state.lastName &&
      this.state.passwordConfirm.length >= 6 &&
      this.state.passwordConfirm.length <= 12 &&
      this.state.password === this.state.passwordConfirm
    );
  }

  render() {
    const {
      userName,
      password,
      email,
      companyName,
      firstName,
      lastName,
      passwordConfirm,
    } = this.state;

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Mutation
                    mutation={SIGNUP_USER}
                    variables={{
                      userName,
                      password,
                      email,
                      companyName,
                      firstName,
                      lastName,
                    }}
                  >
                    {(signupUser, { loading }) => {
                      return (
                        <Form>
                          <h1>Register</h1>
                          <p className="text-muted">Create your account</p>
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
                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-lock"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="password"
                              name="password"
                              placeholder="Password"
                              autoComplete="new-password"
                              value={password}
                              onChange={this.handleChange.bind(this)}
                            />
                          </InputGroup>
                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-lock"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="password"
                              name="passwordConfirm"
                              placeholder="Repeat password"
                              autoComplete="new-password"
                              value={passwordConfirm}
                              onChange={this.handleChange.bind(this)}
                            />
                          </InputGroup>
                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>@</InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="text"
                              name="email"
                              placeholder="Company Email"
                              autoComplete="company-email"
                              value={email}
                              onChange={this.handleChange.bind(this)}
                            />
                          </InputGroup>
                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-people"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="company-name"
                              name="companyName"
                              placeholder="Company Name"
                              autoComplete="company-name"
                              value={companyName}
                              onChange={this.handleChange.bind(this)}
                            />
                          </InputGroup>
                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-user"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Row>
                              <Col xs="12" sm="6">
                                <Input
                                  type="first-name"
                                  name="firstName"
                                  placeholder="First Name"
                                  autoComplete="first-name"
                                  value={firstName}
                                  onChange={this.handleChange.bind(this)}
                                />
                              </Col>
                              <Col xs="12" sm="6">
                                <Input
                                  type="last-name"
                                  name="lastName"
                                  placeholder="Last Name"
                                  autoComplete="last-name"
                                  value={lastName}
                                  onChange={this.handleChange.bind(this)}
                                />
                              </Col>
                            </Row>
                          </InputGroup>
                          <Button
                            color="success"
                            disabled={loading || !this.isValidForm()}
                            onClick={(event) =>
                              this.handleSubmit(event, signupUser)
                            }
                          >
                            Create Account
                          </Button>
                        </Form>
                      );
                    }}
                  </Mutation>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
