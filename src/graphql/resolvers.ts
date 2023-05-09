import { Customer } from '../lib/data.ts';

export const customerQueryResolver = () => {
  return new Customer().getAdaptor().read();
};
