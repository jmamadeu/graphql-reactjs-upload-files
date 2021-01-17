import 'reflect-metadata';

import cors from 'cors';
import express from 'express';
import { FileResolver } from './resolvers';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';

async function main() {
  const app = express();

  app.use(cors());

  const schema = await buildSchema({ resolvers: [FileResolver] });

  const apoloServer = new ApolloServer({ schema, uploads: true });

  app.get('/', (_, response) => response.json({ message: 'Server is on' }));

  app.use('/graphql');

  apoloServer.applyMiddleware({ app });

  app.listen(process.env.PORT || 4000, () =>
    console.log(`Port 4000, graphQL path ${apoloServer.graphqlPath}`)
  );
}

main();
