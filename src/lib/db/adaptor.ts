import { DataAdaptor } from '../classes.ts';
import { DataType } from '../types.ts';
import { CustomerDBReader } from './customer.ts';
import { ProductDBReader } from './product.ts';

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
