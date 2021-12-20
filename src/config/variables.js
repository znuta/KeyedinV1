import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

export const fonts = {
  PRIMARY_REGULLAR: 'Poppins',
  PRIMARY_MEDIUM: 'Poppins-Medium',
  PRIMARY_BOLD: 'Poppins-Bold',
  SECONDARY_REGULLAR: 'SegoeUI-Bold',
  SECONDARY_MEDIUM: 'GillSans-Medium',
  SEMI_BOLD: 'Mulish-SemiBoldRomanS',
};

export const colors = {
  primary: '#fc5c65',
  secondary: '#4ecdc4',
  black: '#282828',
  white: '#fff',
  medium: '#6e6969',
  backgroundHome: '#f9f9f9',
  light: '#f8f4f4',
  dark: '#0c0c0c',
  danger: '#ff5252',
  green: '#30C57B',
  green2: '#22996f',
  disabled: '#DCDCDC',
  lowergreen: '#c6d8b6',
  grey: '#707070',
  gray2: '8492a6',
  lightgrey: '#959595',
  header: '#4b4b4b',
  layout: '#e6e6e6',
};

export const variables = {
  LINE_HEIGHT: '70%',
};

export const wp = (value = '') => {
  return widthPercentageToDP(value);
};

export const hp = (value = '') => {
  return heightPercentageToDP(value);
};
