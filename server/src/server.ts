import 'reflect-metadata';

import cors from 'cors';
import express from 'express';
import { FileResolver } from './resolvers';
import { ApolloServer } from 'apollo-server-express';
import { GraphQLUpload, graphqlUploadExpress } from 'graphql-upload';

import { makeExecutableSchema } from 'graphql-tools';
import { buildSchema, buildTypeDefsAndResolvers } from 'type-graphql';

async function main() {
  const app = express();

  app.use(cors());

  const graphqlResolversParsed = await buildTypeDefsAndResolvers({
    resolvers: [FileResolver],
  });

  const schema = makeExecutableSchema({
    typeDefs: /* GraphQL */ `
      ${graphqlResolversParsed.typeDefs}
    `,
    resolvers: {
      ...graphqlResolversParsed.resolvers,
    },
  });

  app.use(
    '/graphql',
    graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 })
  );

  const apoloServer = new ApolloServer({
    schema,
  });

  app.get('/', (_, response) => response.json({ message: 'Server is on' }));

  apoloServer.applyMiddleware({ app });

  app.listen(process.env.PORT || 4000, () =>
    console.log(`Port 4000, graphQL path ${apoloServer.graphqlPath}`)
  );
}

main();
