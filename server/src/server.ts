import express from 'express';

import { ApolloServer } from 'apollo-server-express';

async function main() {
  const app = express();

  const typeDefs = `
    type Query {
      hello: String
    }
  `;

  const resolvers = {
    Query: {
      hello: () => 'Hello to graphQL',
    },
  };

  const apoloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  app.get('/', (_, response) => response.json({ message: 'Server is on' }));

  apoloServer.applyMiddleware({ app });

  app.listen(process.env.PORT || 4000, () =>
    console.log(`Port 4000, graphQL path ${apoloServer.graphqlPath}`)
  );
}

main();
