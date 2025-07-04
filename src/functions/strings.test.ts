import { ENGLISH_LETTERS } from '../constants/strings';
import { buildBooleanTests } from './fixtures';
import { isEnglishLetters } from './strings';

describe('#1 => isEnglishLetters', () => {
  buildBooleanTests({
    fn: isEnglishLetters,
    array: ENGLISH_LETTERS,
    notIn: ['é'],
  });
});
