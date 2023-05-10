import { createReadStream } from 'fs';
import { ProductData } from '../classes';
import { DataReader, ProductArgs, ProductRow } from '../types';
import path from 'path';
import * as csv from 'fast-csv';

export class ProductCSVReader implements DataReader<ProductArgs, ProductData> {
  read(args) {
    return new Promise<ProductData[]>((resolve, reject) => {
      const results: ProductData[] = [];
      createReadStream(path.resolve(process.cwd(), 'data', 'product.csv'))
        .pipe(csv.parse({ headers: true }))
        .on('error', (error) => reject(error))
        .on('data', (row) => {
          ProductCSVReader.filterProductArgs(row, args) &&
            results.push(
              new ProductData(row.vin.trim(), row.colour, row.make, row.model, Number(row.price))
            );
        })
        .on('end', () => resolve(results));
    });
  }

  static filterProductArgs = (row: ProductRow, args: ProductArgs) => {
    if (args.vin && row.vin !== args.vin) return false;
    if (args.colour && row.colour !== args.colour) return false;
    if (args.make && row.make !== args.make) return false;
    if (args.model && row.model !== args.model) return false;
    if (args.price && row.price !== args.price) return false;
    return true;
  };
}
