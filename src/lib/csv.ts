import { createReadStream } from 'fs';
import path from 'path';
import * as csv from 'fast-csv';
import { DataType } from './types.ts';
import { CustomerData, DataAdaptor } from './classes.ts';

export class CSVAdaptor extends DataAdaptor {
  constructor(type: DataType) {
    super(type);
  }
  read = async () => {
    switch (this.dataType) {
      case DataType.Customer:
        return await this.parseCustomerCSV();
    }
  };

  parseCustomerCSV = () => {
    return new Promise<CustomerData[]>((resolve, reject) => {
      const results: CustomerData[] = [];
      createReadStream(path.resolve(process.cwd(), 'data', 'customer.csv'))
        .pipe(csv.parse({ headers: true }))
        .on('error', (error) => reject(error))
        .on('data', (row) => {
          results.push(this.rowToCustomerData(row));
        })
        .on('end', () => resolve(results));
    });
  };

  rowToCustomerData = (row) => {
    return new CustomerData(row.email, row.forename, row.surname, row.contact_number, row.postcode);
  };
}
