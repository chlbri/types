import { DIGITS as array } from '../constants/numbers';
import { buildTests } from './fixtures';
import { IsDigit as fn } from './numbers';

describe('#1 => IsDigit', () => {
  buildTests({
    fn,
    array,
    notIn: 'a',
  });
});
