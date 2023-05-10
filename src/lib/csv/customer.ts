import { createReadStream } from 'fs';
import { CustomerData } from '../classes.ts';
import { CustomerArgs, CustomerRow, DataReader } from '../types.ts';
import path from 'path';
import * as csv from 'fast-csv';

// Reads the customer csv file and returns a list of customer objects
// based on the filter arguments passed to the read function
export default class CustomerCSVReader implements DataReader<CustomerArgs, CustomerData> {
  read(args) {
    return new Promise<CustomerData[]>((resolve, reject) => {
      const results: CustomerData[] = [];
      createReadStream(path.resolve(process.cwd(), 'data', 'customer.csv'))
        .pipe(csv.parse({ headers: true }))
        .on('error', (error) => reject(error))
        .on('data', (row) => {
          this.filterCustomerArgs(row, args) &&
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

  /**
   * Checks the CSV row against the filter arguments (if any), and returns if
   * it should be present in the response
   * @param row customer csv row
   * @param args customer filter arguments
   * @returns whether the csv row passes the filter
   */
  filterCustomerArgs = (row: CustomerRow, args: CustomerArgs) => {
    if (args.email && row.email !== args.email) return false;
    if (args.forename && row.forename !== args.forename) return false;
    if (args.surname && row.surname !== args.surname) return false;
    if (args.contact_number && row.contactNumber !== args.contact_number) return false;
    if (args.postcode && row.postcode !== args.postcode) return false;
    return true;
  };
}
