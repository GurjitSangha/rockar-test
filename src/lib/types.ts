export enum DataType {
  Customer = 'customer',
  Product = 'product',
}

export type CustomerDataType = {
  email: string;
  forename: string;
  surname: string;
  contactNumber: string;
  postcode: string;
};
