import { ENGLISH_LETTERS } from '../constants/strings';
import { buildTests } from './fixtures';
import { isEnglishLetters } from './strings';

describe('#1 => isEnglishLetters', () => {
  buildTests({
    fn: isEnglishLetters,
    array: ENGLISH_LETTERS,
    notIn: 'é',
  });
});
