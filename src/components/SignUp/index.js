import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import app from "../../libs/base";
import SignUpView from "./SignUpView";


class SignUpContainer extends Component {

  constructor(props) {
    super(props);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  async handleSignUp (event) {
    event.preventDefault();
    console.log("event:", event, event.target);
    const { email, password } = event.target.elements;
    console.log("email", email, "password", password);
    try {
      const user = await app
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value);
      this.props.history.push("/home");
      console.log("history:",this.props.history);
    } catch (error) {
      alert(error);
    }
  }

  render() {
    return <SignUpView onSubmit={this.handleSignUp} />;
  }
}

export default withRouter(SignUpContainer);
