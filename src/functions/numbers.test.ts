import { DIGITS } from '../constants/numbers';
import { buildTests } from './fixtures';
import { IsDigit } from './numbers';

describe('#1 => isEnglishLetters', () => {
  buildTests({
    fn: IsDigit,
    array: DIGITS,
    notIn: 'a',
  });
});
