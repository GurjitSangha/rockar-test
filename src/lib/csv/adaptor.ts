import { DataAdaptor } from '../classes';
import { DataReader, DataType } from '../types';
import CustomerCSVReader from './customer';
import { ProductCSVReader } from './product';

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
