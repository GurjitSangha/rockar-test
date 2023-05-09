import { Customer } from '../lib/data.ts';
import { CustomerArgs } from '../lib/types.ts';

export const customerQueryResolver = (parent: unknown, args: CustomerArgs) => {
  return new Customer().getAdaptor().read(args);
};
