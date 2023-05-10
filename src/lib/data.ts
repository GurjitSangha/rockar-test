import { DataAdaptor } from './classes.ts';
import { CSVAdaptor } from './csv/adaptor.ts';
import { DBAdaptor } from './db.ts';
import { DataType } from './types.ts';

class DataObject {
  type: DataType;
  adaptor: DataAdaptor;

  constructor() {
    switch (process.env.DATA_SOURCE) {
      case 'csv':
        this.adaptor = new CSVAdaptor(this.type);
        break;
      case 'db':
      default:
        this.adaptor = new DBAdaptor(this.type);
    }
  }

  async read(args) {
    return await this.adaptor.read(args);
  }
}

export class Customer extends DataObject {
  type = DataType.Customer;
}

export class Product extends DataObject {
  type = DataType.Product;
}
