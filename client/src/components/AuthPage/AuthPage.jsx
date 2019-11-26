import React from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { createUserMutation, createUserQuery } from "../../helpers/queries"
import { createFetchOptions } from "../../helpers/fetchOptions"
export default class AuthPage extends React.Component {
  state = {
    isCurrentFormSignIn: true,
    signInActive: "active-form-tab-button",
    signUpActive: "",
    password: "",
    email: ""
  };

  toggleForm = () => {
    const { isCurrentFormSignIn, signUpActive, signInActive } = this.state;
    this.setState({
      isCurrentFormSignIn: !isCurrentFormSignIn,
      signUpActive: signInActive,
      signInActive: signUpActive
    });
  };

  onChangeUserInfo = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  createNewUser = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    const reqBody = createUserMutation(email, password)
    const fetchOptions = createFetchOptions("POST", reqBody)
		try {
			let userResponse = await fetch("http://localhost:8080/graphql", fetchOptions);
		  userResponse = await userResponse.json()
			console.log(userResponse)

		} catch (error) {
			throw error;
		}
	};
	
	loginExistingUser = async (e) => {
		e.preventDefault();
    const { email, password } = this.state;
    const reqBody = createUserQuery(email, password)
    const fetchOptions = createFetchOptions("POST", reqBody)
		try {
			let userResponse = await fetch("http://localhost:8080/graphql", fetchOptions);
		  userResponse = await userResponse.json()
			console.log(userResponse)

		} catch (error) {
			throw error;
		}
	}

  render() {
    const {
      isCurrentFormSignIn,
      signInActive,
      signUpActive,
      password,
      email
    } = this.state;
    return (
      <div className="form-container">
        <div className="form-container__tab-group">
          <button
            id={signInActive}
            className="form-container__tab-button"
            onClick={this.toggleForm}
          >
            Sign In
          </button>
          <button
            id={signUpActive}
            className="form-container__tab-button"
            onClick={this.toggleForm}
          >
            Sign Up
          </button>
        </div>

        {isCurrentFormSignIn && (
          <SignIn
            email={email}
            password={password}
            loginExistingUser={this.loginExistingUser}
            onChangeUserInfo={this.onChangeUserInfo}
          />
        )}
        {!isCurrentFormSignIn && (
          <SignUp
            email={email}
            password={password}
            createNewUser={this.createNewUser}
            onChangeUserInfo={this.onChangeUserInfo}
          />
        )}
      </div>
    );
  }
}
