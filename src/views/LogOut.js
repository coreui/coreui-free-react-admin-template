import React, {Component} from 'react';
import auth from "../Auth";

class LogOut extends Component {
  componentWillMount() {
    auth.signout();
    this.props.history.push('/login')
  }

  render() {
    return (<div></div>)
  }
}

export default LogOut;
