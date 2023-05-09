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

const product = `
  type Product {
    vin: String
    colour: String
    make: String
    model: String
    price: Int
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
    product(
      vin: String
      colour: String
      make: String
      model: String
      price: Int
    ): [Product]
  }
`;

export default buildSchema([schema, customer, product].join());
