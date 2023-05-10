import { CustomerData } from '../../../src/lib/classes';
import mock from 'mock-fs';
import CustomerCSVReader from '../../../src/lib/csv/customer';
import path from 'path';

describe('CustomerCSVReader', () => {
  beforeEach(() => {
    mock({
      'data/customer.csv': mock.load(path.resolve(__dirname, 'fixtures/customers.csv')),
    });
  });
  afterEach(() => {
    mock.restore();
  });

  it('should return a list of customers with no search parameters', async () => {
    const expected = [
      new CustomerData('tom.harding1974@gmail.co.uk', 'Tom', 'Harding', '07938244758', 'SS26GH'),
      new CustomerData(
        'drosmanahmed@pharmaceuticalsglobal.org',
        'Osman',
        'Ahmed',
        '+91719548839',
        '396210'
      ),
    ];

    const actual = await new CustomerCSVReader().read({});
    expect(actual).toEqual(expected);
  });

  it('should filter the list of customers based on the search parameters', async () => {
    const expected = [
      new CustomerData('tom.harding1974@gmail.co.uk', 'Tom', 'Harding', '07938244758', 'SS26GH'),
    ];

    const actual = await new CustomerCSVReader().read({ forename: 'Tom' });
    expect(actual).toEqual(expected);
  });
});
