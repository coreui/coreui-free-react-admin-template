import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Nav, NavItem, NavLink, Row, TabContent, TabPane, FormFeedback, FormText, Alert} from 'reactstrap';
import classnames from "classnames";
import api from "../../api";
import NotificationSystem from "react-notification-system";
import auth from "../../Auth";
import './profile.scss';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _notificationSystem: null,

      activeTab: '1',

      username: '',
      isValidUsername: true,
      occupation: '',
      isValidOccupation: true,

      password: '',
      npassword: '',
      isValidNPassword: true,
      cpassword: '',
      isValidCPassword: true,

      usernameToDelete: '',
      isValidUsernameToDelete: true,
    };

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdateGeneralInformation = this.handleUpdateGeneralInformation.bind(this);
    this.handleUpdatePassword = this.handleUpdatePassword.bind(this);
    this.handleDeleteProfile = this.handleDeleteProfile.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  handleUpdateGeneralInformation(event){
    event.preventDefault();
    this.setState({isValidOccupation: true, isValidUsername: true});

    let canSubmit = true;
    if(this.state.occupation !== '') {
      if (this.state.occupation.length < 2) {
        this.setState({isValidOccupation: false});
        canSubmit = false;
      }
    }

    if(this.state.username.length < 2){
      this.setState({isValidUsername: false});
      canSubmit=false;
    }

    if (!canSubmit){
      return;
    }

    api.updateProfile(this.state.username, this.state.occupation)
      .then(res => {this.state._notificationSystem.addNotification({message: 'Information updated', level: 'success'})})
      .catch(error => this.state._notificationSystem.addNotification(api.getFormattedErrorNotification(error)));
  }

  handleUpdatePassword(event){
    event.preventDefault();
    this.setState({isValidNPassword: true, isValidCPassword: true});

    let canSubmit = true;
    if(this.state.npassword.length < 12){
      this.setState({isValidNPassword: false});
      canSubmit=false;
    }

    if(this.state.npassword !== this.state.cpassword){
      this.setState({isValidCPassword: false});
      canSubmit=false;
    }

    if (!canSubmit){
      return;
    }

    api.updatePassword(this.state.password, this.state.npassword)
      .then(res => {this.state._notificationSystem.addNotification({message: 'Information updated', level: 'success'})})
      .catch(error => this.state._notificationSystem.addNotification(api.getFormattedErrorNotification(error)));
  }

  handleDeleteProfile(event){
    event.preventDefault();
    this.setState({isValidUsernameToDelete: true});

    let canSubmit = true;
    if(this.state.usernameToDelete.length < 2){
      this.setState({isValidUsernameToDelete: false});
      canSubmit=false;
    }

    if (!canSubmit){
      return;
    }

    api.deleteProfile(this.state.usernameToDelete)
      .then(res => {
        auth.signout();
        this.props.history.push('/login')
      })
      .catch(error => this.state._notificationSystem.addNotification(api.getFormattedErrorNotification(error)));
  }

  componentDidMount() {
    this.state._notificationSystem = this.refs.notificationSystem;
  }

  componentWillMount() {
    api.getProfile()
      .then(res => {
        let profile = res.data.message.user;
        this.setState({
          username: profile.username,
          occupation: profile.occupation === 'null' ? '' : profile.occupation
        });
      })
      .catch(error => this.state._notificationSystem.addNotification(api.getFormattedErrorNotification(error)));
  }

  render() {
    return (
      <div className="animated fadeIn padding-30">
        <NotificationSystem ref="notificationSystem" />
        <Row>
          <Col xs="12" md="2" className="mb-4">
            <div className={'frame'}>
              <span className={'helper'}><img src={'../assets/img/avatars/admin-default.jpg'} alt="admin@bootstrapmaster.com" /></span>
              {/*<span className="avatar-status badge-success"></span>*/}
            </div>
          </Col>
          <Col xs="12" md="8" className="mb-4">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                  General Information
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                >
                  Password
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '3' })}
                  onClick={() => { this.toggle('3'); }}
                >
                  Account
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane className={'p-4'} tabId="1">
                <Form>
                  <FormGroup>
                    <Label htmlFor="username">Username</Label>
                    <Input type="text" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Enter your username" invalid={!this.state.isValidUsername}/>
                    <FormFeedback>Username should contain at least 2 characters</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="occupation">Occupation</Label>
                    <Input type="text" name="occupation" value={this.state.occupation}  onChange={this.handleChange}  placeholder="Security Engineer" invalid={!this.state.isValidOccupation}/>
                    <FormFeedback>Username should contain at least 2 characters if defined</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Button type="submit" color="primary" onClick={this.handleUpdateGeneralInformation}>Save changes</Button>{' '}
                    <Button color="secondary">Cancel</Button>
                  </FormGroup>
                </Form>
              </TabPane>
              <TabPane tabId="2">
                <Form>
                  <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" name="password" onChange={this.handleChange} placeholder="Enter your current password" />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="npassword">New Password</Label>
                    <Input type="password" name="npassword" onChange={this.handleChange}  placeholder="Enter your new password" invalid={!this.state.isValidNPassword}/>
                    <FormText>New password should contain at least 12 characters</FormText>
                    <FormFeedback>Password is not correct</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="cpassword">Confirm New Password</Label>
                    <Input type="password" name="cpassword" onChange={this.handleChange}  placeholder="Confirm your new password" invalid={!this.state.isValidCPassword}/>
                    <FormFeedback>Does not match the new password</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Button type="submit" color="primary" onClick={this.handleUpdatePassword}>Save changes</Button>{' '}
                    <Button color="secondary">Cancel</Button>
                  </FormGroup>
                </Form>
              </TabPane>
              <TabPane tabId="3">
                <Alert color="danger">
                  This is not reversible. The user will be deleted from the database as well as its data. To confirm, please enter your password.
                </Alert>
                <Form>
                  <FormGroup>
                    <Label htmlFor="usernameToDelete">Username</Label>
                    <Input type="text" name="usernameToDelete" onChange={this.handleChange} placeholder="Enter your current username" invalid={!this.state.isValidUsernameToDelete}/>
                    <FormFeedback>Username should contain at least 2 characters</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Button type="submit" color="danger" onClick={this.handleDeleteProfile}>Delete Profile</Button>{' '}
                  </FormGroup>
                </Form>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Profile;
