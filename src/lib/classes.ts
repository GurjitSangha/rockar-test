import { CustomerArgs, DataType } from './types.ts';

export class CustomerData {
  email: string;
  forename: string;
  surname: string;
  contactNumber: string;
  postcode: string;
  constructor(email, forename, surname, contactNumber, postcode) {
    this.email = email;
    this.forename = forename;
    this.surname = surname;
    this.contactNumber = contactNumber;
    this.postcode = postcode;
  }
}

export class DataAdaptor {
  dataType: DataType;
  read: (args?: CustomerArgs) => Promise<CustomerData[]>;
  constructor(type: DataType) {
    this.dataType = type;
  }
}
