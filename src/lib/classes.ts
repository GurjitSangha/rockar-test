import { DataReader, DataType } from './types.ts';

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

export class ProductData {
  vin: string;
  colour: string;
  make: string;
  model: string;
  price: number;
  constructor(vin, colour, make, model, price) {
    this.vin = vin;
    this.colour = colour;
    this.make = make;
    this.model = model;
    this.price = price;
  }
}

export class DataAdaptor {
  dataType: DataType;
  reader: DataReader<any, any>;
  constructor(type: DataType, reader?: DataReader<any, any>) {
    this.dataType = type;
    this.reader = reader;
  }

  read: (args) => Promise<any>;
}
