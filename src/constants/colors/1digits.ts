import { DIGITS } from '../numbers';
import { COLOR_STRING_DIGITS } from './strings';

export const COLOR_1_DIGITS = [...DIGITS, ...COLOR_STRING_DIGITS] as const;
