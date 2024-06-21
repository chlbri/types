import { ENGLISH_LETTERS } from '../constants/strings';
import { eq } from './utils';

export const isEnglishLetters = (value: string) => {
  return eq(value, ...ENGLISH_LETTERS);
};
