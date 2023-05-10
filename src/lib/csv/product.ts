import { createReadStream } from 'fs';
import { ProductData } from '../classes.ts';
import { DataReader, ProductArgs, ProductRow } from '../types.ts';
import path from 'path';
import * as csv from 'fast-csv';

// Reads the product csv file and returns a list of products dependant on the
// filter arguments passed in
export class ProductCSVReader implements DataReader<ProductArgs, ProductData> {
  read(args) {
    return new Promise<ProductData[]>((resolve, reject) => {
      const results: ProductData[] = [];
      createReadStream(path.resolve(process.cwd(), 'data', 'product.csv'))
        .pipe(csv.parse({ headers: true }))
        .on('error', (error) => reject(error))
        .on('data', (row) => {
          this.filterProductArgs(row, args) &&
            results.push(
              new ProductData(row.vin.trim(), row.colour, row.make, row.model, Number(row.price))
            );
        })
        .on('end', () => resolve(results));
    });
  }

  /**
   * Checks the CSV row against the filter arguments (if any), and returns if
   * it should be present in the response
   * @param row product csv row
   * @param args product filter arguments
   * @returns whether the csv row passes the filter
   */
  filterProductArgs = (row: ProductRow, args: ProductArgs) => {
    if (args.vin && row.vin !== args.vin) return false;
    if (args.colour && row.colour !== args.colour) return false;
    if (args.make && row.make !== args.make) return false;
    if (args.model && row.model !== args.model) return false;
    if (args.price && row.price !== args.price) return false;
    return true;
  };
}
