import React from "react";

const SignUp = props => {
  const { email, password, onChangeUserInfo, createNewUser } = props;
  return (
    <div>
      <h1>Sign Up For Free</h1>
      <form onSubmit={createNewUser}>
        <label htmlFor="sign_up_email">Enter Email Address:</label>
        <input
          type="email"
          required
          id="sign_up_email"
          value={email}
          onChange={onChangeUserInfo}
          name="email"
        />

        <label htmlFor="sign_up_password">Enter Password:</label>
        <input
          type="password"
          required
          id="sign_up_password"
          value={password}
          onChange={onChangeUserInfo}
          name="password"
        />

        <input type="submit" value="Get Started" id="form-container__submit" />
      </form>
    </div>
  );
};

export default SignUp;
