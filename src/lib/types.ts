export enum DataType {
  Customer = 'customer',
  Product = 'product',
}

export type CustomerArgs = {
  email?: string;
  forename?: string;
  surname?: string;
  contact_number?: string;
  postcode?: string;
};

export type CustomerRow = {
  email: string | null;
  forename: string | null;
  surname: string | null;
  contactNumber: string | null;
  postcode: string | null;
};

export type ProductArgs = {
  vin: string;
  colour: string;
  make: string;
  model: string;
  price: number;
};

export type ProductRow = {
  vin: string | null;
  colour: string | null;
  make: string | null;
  model: string | null;
  price: number | null;
};
