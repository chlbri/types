import {
  COLOR_1_DIGITS,
  COLOR_2_DIGITS,
  COLOR_NUMBER_DIGITS,
  COLOR_STRING_DIGITS,
  CSS_COLORS,
  TRANSPARENCY_DIGITS,
} from '../constants/colors';
import { COLOR_3_DIGITS } from '../constants/colors/3digits';
import {
  isColor1Digits,
  isColor2Digits,
  isColorNumberDigits,
  isColorStringDigits,
  isCssColors,
  isTransparency,
} from './colors';
import { isColor3Digits } from './colors.extended';
import { buildTests } from './fixtures';

describe('#1 => isTransparency', () => {
  buildTests({
    fn: isTransparency,
    array: TRANSPARENCY_DIGITS,
    notIn: 500,
  });
});

describe('#2 => isColorNumberDigits', () => {
  buildTests({
    fn: isColorNumberDigits,
    array: COLOR_NUMBER_DIGITS,
    notIn: 500,
  });
});

describe('#3 => isColorStringDigits', () => {
  buildTests({
    fn: isColorStringDigits,
    array: COLOR_STRING_DIGITS,
    notIn: 'z',
  });
});

describe('#4 => isCssColors', () => {
  buildTests({
    fn: isCssColors,
    array: CSS_COLORS,
    notIn: 'simple string',
  });
});

describe('#5 => isColor1Digits', () => {
  buildTests({
    fn: isColor1Digits,
    array: COLOR_1_DIGITS,
    notIn: 10,
  });
});

describe('#6 => isColor2Digits', () => {
  buildTests({
    fn: isColor2Digits,
    array: COLOR_2_DIGITS,
    notIn: '100',
  });
});

describe('#7 => isColor3Digits', () => {
  buildTests({
    fn: isColor3Digits,
    array: COLOR_3_DIGITS,
    notIn: '1000',
  });
});
