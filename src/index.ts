import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import schema from './graphql/schema.ts';
import { customerQueryResolver, productQueryResolver } from './graphql/resolvers.ts';

// Load the env file
import * as dotenv from 'dotenv';
dotenv.config();

// Define the graphql typedefs, resolvers and server
const typeDefs = schema;
const resolvers = {
  Query: {
    customer: customerQueryResolver,
    product: productQueryResolver,
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
