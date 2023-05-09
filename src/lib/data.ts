import { CSVAdaptor } from './csv.ts';
import { DataType } from './types.ts';

class DataObject {
  type: DataType;

  getAdaptor = () => {
    switch (process.env.DATA_SOURCE) {
      case 'csv':
        return new CSVAdaptor(this.type);
    }
  };
}

export class Customer extends DataObject {
  type = DataType.Customer;
}

export class Product extends DataObject {
  type = DataType.Product;
}
