import { StatusBar, StyleSheet } from 'react-native';
import { colors, fonts, hp, wp } from '../../config/variables';
const styles = StyleSheet.create({
  button: {
    paddingVertical: wp('5%'),
    backgroundColor: '#4B94E0',
    alignItems: 'center',
    paddingHorizontal: wp('7%'),
    borderRadius: wp('3%'),
    width: '90%',
    marginVertical: hp('1%'),
   
  },
  text: {
    textAlign: 'center',
    color: colors.WHITE,
    fontFamily: fonts.PRIMARY_REGULLAR,
    fontSize: wp('5%'),
  },
});

export default styles;

export const typeStyle = {
  primary: {
    text: { color: colors.white },
    button: { backgroundColor: colors.green },
  },
  secondary: {
    text: { color: colors.white },
    button: { backgroundColor: colors.secondary },
  },
  primary_text: {
    text: { color: colors.green, fontWeight: '700' },
    button: { backgroundColor: 'transparent' },
  },
  secondary_text: {
    text: { color: colors.secondary, fontWeight: '700', fontSize: wp('3.5%') },
    button: { backgroundColor: 'transparent', paddingVertical: 0 },
  },
};
