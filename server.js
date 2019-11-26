const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const NoIntrospection = require("graphql-disable-introspection");
const mongoose = require("mongoose");

const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");
const authenicated = require("./middleware/auth");
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(authenicated);

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
    validationRules: [NoIntrospection]
  })
);

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_DB } = process.env;
const DB_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0-uqsnw.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`;
const MONGO_PARAMS = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(DB_URL, MONGO_PARAMS, err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Connected to Mongo");
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`App running on ${port}`));
