import { buildSchema } from 'graphql';

const customer = `
  type Customer {
      email: String
      forename: String
      surname: String
      contactNumber: String
      postcode: String
  }
`;

const schema = `
  type Query {
    customer(
      email: String
      forename: String
      surname: String
      contactNumber: String
      postcode: String
    ): [Customer]
  }
`;

export default buildSchema([schema, customer].join());
