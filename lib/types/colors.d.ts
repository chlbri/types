import { COLORS } from '../constants';
export declare type Color1Digit = typeof COLORS.COLOR_DIGITS[number];
export declare type TransparencyDigits = typeof COLORS.TRANSPARENCY_DIGITS[number];
export declare type ColorNumberDigits = typeof COLORS.COLOR_NUMBER_DIGITS[number];
export declare type ColorStringDigits = typeof COLORS.COLOR_STRING_DIGITS[number];
export declare type Color2Digits = `${Color1Digit}${Color1Digit}`;
export declare type CssColors = typeof COLORS.CSS_COLORS[number];
export declare type RGBA1 = `#${Color1Digit}${Color1Digit}${Color1Digit}${Color1Digit | ''}`;
