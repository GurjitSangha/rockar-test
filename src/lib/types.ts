export enum DataType {
  Customer = 'customer',
  Product = 'product',
}

export type CustomerArgs = {
  email?: string;
  forename?: string;
  surname?: string;
  contactNumber?: string;
  postcode?: string;
};

export type CustomerRow = {
  email: string | null;
  forename: string | null;
  surname: string | null;
  contactNumber: string | null;
  postcode: string | null;
};
