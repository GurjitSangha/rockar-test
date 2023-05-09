import { CustomerData, DataAdaptor, ProductData } from './classes.ts';
import { CustomerArgs, DataType, ProductArgs } from './types.ts';
import { prisma } from '../../db/client.ts';

export class DBAdaptor extends DataAdaptor {
  constructor(type: DataType) {
    super(type);
  }
  read = async (args) => {
    switch (this.dataType) {
      case DataType.Customer:
        return await new CustomerDBFetcher().fetch(args);
      case DataType.Product:
        return await new ProductDBFetcher().fetch(args);
    }
  };
}

interface DBFetcher<Args, Data> {
  fetch(args: Args): Promise<Data[]>;
}

class CustomerDBFetcher implements DBFetcher<CustomerArgs, CustomerData> {
  async fetch(args) {
    const customers = await prisma.customer.findMany({
      where: {
        email: args.email,
        forename: args.forename,
        surname: args.surname,
        contact_number: args.contactNumber,
        postcode: args.postcode,
      },
    });

    return customers.map((customer) => {
      return new CustomerData(
        customer.email,
        customer.forename,
        customer.surname,
        customer.contact_number,
        customer.postcode
      );
    });
  }
}

class ProductDBFetcher implements DBFetcher<ProductArgs, ProductData> {
  async fetch(args) {
    const products = await prisma.product.findMany({
      where: {
        vin: args.vin,
        colour: args.colour,
        make: args.make,
        model: args.model,
        price: args.price,
      },
    });

    return products.map((product) => {
      return new ProductData(
        product.vin,
        product.colour,
        product.make,
        product.model,
        product.price
      );
    });
  }
}
