import { createReadStream } from 'fs';
import path from 'path';
import * as csv from 'fast-csv';
import { CustomerArgs, CustomerRow, DataType, ProductArgs, ProductRow } from './types.ts';
import { CustomerData, DataAdaptor, ProductData } from './classes.ts';

export class CSVAdaptor extends DataAdaptor {
  constructor(type: DataType) {
    super(type);
  }
  read = async (args) => {
    switch (this.dataType) {
      case DataType.Customer:
        return await new CustomerCSVAdaptor().parse(args);
      case DataType.Product:
        return await new ProductCSVAdaptor().parse(args);
    }
  };
}

interface CSVParser<Args, Data> {
  parse(args: Args): Promise<Data[]>;
}

class CustomerCSVAdaptor implements CSVParser<CustomerArgs, CustomerData> {
  parse(args) {
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
  }

  filterCustomerArgs = (row: CustomerRow, args: CustomerArgs) => {
    if (args.email && row.email !== args.email) return false;
    if (args.forename && row.forename !== args.forename) return false;
    if (args.surname && row.surname !== args.surname) return false;
    if (args.contact_number && row.contactNumber !== args.contact_number) return false;
    if (args.postcode && row.postcode !== args.postcode) return false;
    return true;
  };

  rowToCustomerData = (row: CustomerArgs) => {
    return new CustomerData(row.email, row.forename, row.surname, row.contact_number, row.postcode);
  };
}

class ProductCSVAdaptor implements CSVParser<ProductArgs, ProductData> {
  parse(args) {
    return new Promise<ProductData[]>((resolve, reject) => {
      const results: ProductData[] = [];
      createReadStream(path.resolve(process.cwd(), 'data', 'product.csv'))
        .pipe(csv.parse({ headers: true }))
        .on('error', (error) => reject(error))
        .on('data', (row) => {
          this.filterProductArgs(row, args) && results.push(this.rowToProductData(row));
        })
        .on('end', () => resolve(results));
    });
  }

  filterProductArgs = (row: ProductRow, args: ProductArgs) => {
    if (args.vin && row.vin !== args.vin) return false;
    if (args.colour && row.colour !== args.colour) return false;
    if (args.make && row.make !== args.make) return false;
    if (args.model && row.model !== args.model) return false;
    if (args.price && row.price !== args.price) return false;
    return true;
  };

  rowToProductData = (row: ProductArgs) => {
    return new ProductData(row.vin, row.colour, row.make, row.model, row.price);
  };
}
