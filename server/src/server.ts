import 'reflect-metadata';

import express from 'express';

import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { FileResolver } from './resolvers';
import { graphqlUploadExpress } from 'graphql-upload';

async function main() {
  const app = express();

  const schema = await buildSchema({ resolvers: [FileResolver] });

  const apoloServer = new ApolloServer({ schema });

  app.get('/', (_, response) => response.json({ message: 'Server is on' }));

  app.use(
    '/graphql',
    graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 })
  );

  apoloServer.applyMiddleware({ app });

  app.listen(process.env.PORT || 4000, () =>
    console.log(`Port 4000, graphQL path ${apoloServer.graphqlPath}`)
  );
}

main();
