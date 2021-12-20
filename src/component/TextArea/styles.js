import {StatusBar, StyleSheet} from 'react-native';
import {colors, fonts, hp, wp} from '../../config/variables';

const styles = StyleSheet.create({
  inputWrap: {
    backgroundColor: '#f2f3f4',
    borderRadius: 12,
    flexDirection: 'row',
    width: '100%',
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  inputField: {
    backgroundColor: '#f2f3f4',
    borderRadius: wp('50%'),
    flexDirection: 'row',
    width: '100%',
    height: wp('12%'),
    paddingHorizontal: wp('3%'),
    marginVertical: hp('1%'),
    alignItems: 'center',
  },
  selectField: {
    borderColor: colors.dark,
    borderRadius: wp('50%'),
    borderWidth: 1,

    width: '100%',
    height: wp('11%'),
    paddingHorizontal: wp('3%'),
    marginVertical: hp('1%'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  textArea: {
    flexDirection: 'row',
    width: '100%',
    minHeight: wp('20%'),
    paddingHorizontal: wp('3%'),
    marginVertical: hp('1%'),
    color: colors.dark,
    fontSize: 14,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
  },
});

export default styles;
