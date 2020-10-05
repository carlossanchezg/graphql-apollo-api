/* eslint-disable no-unused-vars */
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import colors from 'colors';
import dotenv from 'dotenv/config';
import DBConnection from './database';

// Construct a schema, using GraphQL schema language
import typeDefs from './graphql/schema';

// Provide resolver functions for your schema fields
import resolvers from './graphql/resolvers';

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

const PORT = 4000;

DBConnection();

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath} 🚀`.cyan.bold));
