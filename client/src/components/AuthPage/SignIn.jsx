import React from "react";

const SignIn = props => {
  const { email, password, onChangeUserInfo, loginExistingUser } = props;
  return (
    <div>
      <h1>Welcome Back!</h1>
      <form onSubmit={loginExistingUser}>
        <label htmlFor="sign_in_email">Enter Email Address:</label>
        <input
          type="email"
          required
          id="sign_in_email"
          value={email}
          onChange={onChangeUserInfo}
          name="email"
        />

        <label htmlFor="sign_in_password">Enter Password:</label>
        <input
          type="password"
          required
          id="sign_in_password"
          value={password}
          onChange={onChangeUserInfo}
          name="password"
        />

        <input type="submit" value="Log In" id="form-container__submit" />
      </form>
    </div>
  );
};

export default SignIn;
