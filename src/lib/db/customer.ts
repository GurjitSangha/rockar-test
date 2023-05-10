import { CustomerData } from '../classes.ts';
import { CustomerArgs, DataReader } from '../types.ts';
import { prisma } from '../../../db/client.ts';

export class CustomerDBReader implements DataReader<CustomerArgs, CustomerData> {
  async read(args) {
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
