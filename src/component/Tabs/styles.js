import {StyleSheet} from 'react-native';
import {colors, hp, wp} from 'src/config/variables';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5%'),
    alignItems: 'center',
    paddingVertical: hp('2%'),
    backgroundColor: colors.green,
    borderBottomLeftRadius: wp('5%'),
    borderBottomRightRadius: wp('5%'),
  },
  btnText: {
    color: colors.white,
    fontSize: wp('3.6%'),
    fontWeight: '700',
  },
  borderBar: {
    backgroundColor: colors.white,
    width: wp('3%'),
    height: hp('0.5%'),
    borderRadius: 50,
  },
  btnBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContent: {
    flex: 1,
  },
});
export default styles;
