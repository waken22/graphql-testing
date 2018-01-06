var express = require("express");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");

var schema = buildSchema(`
  type Query {
    me: User
  }

  type User {
    id: ID
    name: String
    phrase: String
  }
`);



const getPhrase = () => {
  const phrases = [`i'm bored... sorry`, `What the hell is that?`, `I'm a dragon, and dragons are cool`]
  return phrases[Math.floor(Math.random() * 3)];
}

var root = {
  me: () => {
    return {
      id: 21,
      name: 'Jessè',
      phrase: getPhrase()
    }
  },
};

console.log(root)

var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);
app.listen(4000, () => console.log("Now browse to localhost:4000/graphql"));
