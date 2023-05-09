import { createReadStream } from 'fs';
import path from 'path';
import * as csv from 'fast-csv';
import { CustomerArgs, CustomerRow, DataType } from './types.ts';
import { CustomerData, DataAdaptor } from './classes.ts';

export class CSVAdaptor extends DataAdaptor {
  constructor(type: DataType) {
    super(type);
  }
  read = async (args: CustomerArgs) => {
    switch (this.dataType) {
      case DataType.Customer:
        return await this.parseCustomerCSV(args);
    }
  };

  parseCustomerCSV = (args = {}) => {
    return new Promise<CustomerData[]>((resolve, reject) => {
      const results: CustomerData[] = [];
      createReadStream(path.resolve(process.cwd(), 'data', 'customer.csv'))
        .pipe(csv.parse({ headers: true }))
        .on('error', (error) => reject(error))
        .on('data', (row) => {
          this.filterCustomerArgs(row, args) && results.push(this.rowToCustomerData(row));
        })
        .on('end', () => resolve(results));
    });
  };

  filterCustomerArgs = (row: CustomerRow, args: CustomerArgs) => {
    if (args.email && row.email !== args.email) return false;
    if (args.forename && row.forename !== args.forename) return false;
    if (args.surname && row.surname !== args.surname) return false;
    if (args.contactNumber && row.contactNumber !== args.contactNumber) return false;
    if (args.postcode && row.postcode !== args.postcode) return false;
    return true;
  };

  rowToCustomerData = (row) => {
    return new CustomerData(row.email, row.forename, row.surname, row.contact_number, row.postcode);
  };
}
