import { DataAdaptor } from '../classes';
import { DataType } from '../types';
import { CustomerDBReader } from './customer';
import { ProductDBReader } from './product';

// DB Data adaptor
// Instantiates it's own reader based on the data object type
export class DBAdaptor extends DataAdaptor {
  constructor(type: DataType) {
    super(type);
  }
  read = async (args) => {
    switch (this.dataType) {
      case DataType.Customer:
        return await new CustomerDBReader().read(args);
      case DataType.Product:
        return await new ProductDBReader().read(args);
    }
  };
}
