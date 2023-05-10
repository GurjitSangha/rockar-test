import { DataAdaptor } from '../classes.ts';
import { DataReader, DataType } from '../types.ts';
import CustomerCSVReader from './customer.ts';
import { ProductCSVReader } from './product.ts';

// CSV Data adaptor
// Instantiates it's own reader based on the data type it was created with
export class CSVAdaptor extends DataAdaptor {
  constructor(type: DataType, reader?: DataReader<any, any>) {
    super(type, reader);
    if (!this.reader) {
      switch (this.dataType) {
        case DataType.Customer:
          this.reader = new CustomerCSVReader();
          break;
        case DataType.Product:
        default:
          this.reader = new ProductCSVReader();
      }
    }
  }

  read = (args) => {
    return this.reader.read(args);
  };
}
