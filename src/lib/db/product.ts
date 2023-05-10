import { ProductData } from '../classes.ts';
import { DataReader, ProductArgs } from '../types.ts';
import { prisma } from '../../../db/client.ts';

export class ProductDBReader implements DataReader<ProductArgs, ProductData> {
  async read(args) {
    const products = await prisma.product.findMany({
      where: {
        vin: args.vin,
        colour: args.colour,
        make: args.make,
        model: args.model,
        price: args.price,
      },
    });

    return products.map((product) => {
      return new ProductData(
        product.vin,
        product.colour,
        product.make,
        product.model,
        product.price
      );
    });
  }
}
