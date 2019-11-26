exports.createUserMutation = (email, password) => {
  return {
    query: `
		mutation {
			createUser(userInput: {email: "${email}", password: "${password}"}) {
				_id
				email
			}
		}
    `
  };
};

exports.createUserQuery = (email, password) => {
  return {
    query: `
		query {
			login(email: "${email}", password: "${password}") {
				userId
				token
				tokenExpiration
			}
		}
    `
  };
};
