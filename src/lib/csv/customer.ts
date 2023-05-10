import { createReadStream } from 'fs';
import { CustomerData } from '../classes';
import { CustomerArgs, CustomerRow, DataReader } from '../types';
import path from 'path';
import * as csv from 'fast-csv';

export default class CustomerCSVReader implements DataReader<CustomerArgs, CustomerData> {
  read(args) {
    return new Promise<CustomerData[]>((resolve, reject) => {
      const results: CustomerData[] = [];
      createReadStream(path.resolve(process.cwd(), 'data', 'customer.csv'))
        .pipe(csv.parse({ headers: true }))
        .on('error', (error) => reject(error))
        .on('data', (row) => {
          CustomerCSVReader.filterCustomerArgs(row, args) &&
            results.push(
              new CustomerData(
                row.email,
                row.forename,
                row.surname,
                row.contact_number,
                row.postcode
              )
            );
        })
        .on('end', () => resolve(results));
    });
  }

  static filterCustomerArgs = (row: CustomerRow, args: CustomerArgs) => {
    if (args.email && row.email !== args.email) return false;
    if (args.forename && row.forename !== args.forename) return false;
    if (args.surname && row.surname !== args.surname) return false;
    if (args.contact_number && row.contactNumber !== args.contact_number) return false;
    if (args.postcode && row.postcode !== args.postcode) return false;
    return true;
  };
}
