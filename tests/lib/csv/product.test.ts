import mock from 'mock-fs';
import path from 'path';
import { ProductData } from '../../../src/lib/classes';
import { ProductCSVReader } from '../../../src/lib/csv/product';

describe('ProductCSVReader', () => {
  beforeEach(() => {
    mock({
      'data/product.csv': mock.load(path.resolve(__dirname, 'fixtures/products.csv')),
    });
  });
  afterEach(() => {
    mock.restore();
  });

  it('should return a list of products with no search parameters', async () => {
    const expected = [
      new ProductData('WVGCV7AX7AW000784', 'Red', 'Ford', 'Fiesta', 10000),
      new ProductData('5TBRV54138S478794', 'Green', 'Mitsubishi', 'Eclipse', 35000),
    ];

    const actual = await new ProductCSVReader().read({});
    expect(actual).toEqual(expected);
  });

  it('should filter the list of products based on the search parameters', async () => {
    const expected = [new ProductData('WVGCV7AX7AW000784', 'Red', 'Ford', 'Fiesta', 10000)];

    const actual = await new ProductCSVReader().read({ make: 'Ford' });
    expect(actual).toEqual(expected);
  });
});
