import { Customer, Product } from '../lib/data.ts';
import { CustomerArgs, ProductArgs } from '../lib/types.ts';

export const customerQueryResolver = (parent: unknown, args: CustomerArgs) => {
  return new Customer().read(args);
};

export const productQueryResolver = (parent: unknown, args: ProductArgs) => {
  return new Product().read(args);
};
