import React, { Component } from "react";

import "./index.css";

export class JoinForm extends Component {
  render() {
    return (
      <div className="join-form-body">
        <div className="container join_form_subbody">
          <div className="join-title">
            <h2>Join Redledger</h2>
          </div>
          <div className="join-contain">
            <p>Experience the Ultimate Digital Assets Financial Services</p>
          </div>

          <form className="join-form">
            <input
              type="text"
              className="join-email"
              placeholder="Email"
              autoComplete="off"
              required
            />
            <input
              type="password"
              className="join-password"
              placeholder="Password"
              autoComplete="off"
              required
            />
            <input type="submit" className="join-sign-up" value="SIGN UP" />
          </form>
        </div>
      </div>
    );
  }
}

export default JoinForm;
