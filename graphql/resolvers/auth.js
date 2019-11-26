const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

module.exports = {
  createUser: async args => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error("User exists already.");
      }
      const hashedPassword = bcrypt.hashSync(args.userInput.password, 12);

      const newUser = new User({
        email: args.userInput.email,
        password: hashedPassword
      });

      const result = await newUser.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  login: async ({ email, password }) => {
    try {
      const existingUser = await User.findOne({ email });
      if (!existingUser) throw new Error("User Does Not Exist.");

      const isCorrectPassword = bcrypt.compareSync(password, existingUser.password);

      if (!isCorrectPassword) throw new Error("Incorrect Password.");

      const jwtToken = jwt.sign(
        { userId: existingUser.id, email: existingUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      
      return { userId: existingUser.id, token: jwtToken, tokenExpiration: 1 };
    } catch (error) {
      throw error;
    }
  }
};
