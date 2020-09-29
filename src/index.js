import express from 'express';
import { ApolloServer } from 'apollo-server-express';
// eslint-disable-next-line no-unused-vars
import colors from 'colors';
import { getMongoDBConnection } from './database';

// Construct a schema, using GraphQL schema language
import typeDefs from './graphql/schema';

// Provide resolver functions for your schema fields
import resolvers from './graphql/resolvers';

require('dotenv').config();

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

const PORT = 4200;

getMongoDBConnection();

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath} 🚀`.cyan.bold));
