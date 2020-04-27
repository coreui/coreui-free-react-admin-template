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

  handleSubmit(event, signupUser) {
    event.preventDefault();
    signupUser()
      .then(async ({ data }) => {})
      .catch(() => {});
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Mutation mutation={SIGNUP_USER}>
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
                              placeholder="Username"
                              autoComplete="username"
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
                              placeholder="Password"
                              autoComplete="new-password"
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
                              placeholder="Repeat password"
                              autoComplete="new-password"
                            />
                          </InputGroup>
                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>@</InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="text"
                              placeholder="Company Email"
                              autoComplete="company-email"
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
                              placeholder="Company Name"
                              autoComplete="company-name"
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
                                  placeholder="First Name"
                                  autoComplete="first-name"
                                />
                              </Col>
                              <Col xs="12" sm="6">
                                <Input
                                  type="last-name"
                                  placeholder="Last Name"
                                  autoComplete="last-name"
                                />
                              </Col>
                            </Row>
                          </InputGroup>
                          <Button
                            color="success"
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
