import {StyleSheet} from 'react-native';
import {wp, hp, fonts, colors} from 'src/config/variables';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('6%'),
    paddingTop: hp('6%'),
    backgroundColor: 'white',
  },
  inputField: {
    backgroundColor: '#f2f3f4',
    borderRadius: 50,
    flexDirection: 'row',
    width: '100%',
    height: wp('13%'),
    paddingHorizontal: wp('3%'),
    marginVertical: hp('2%'),
    alignItems: 'center',
  },
  selectField: {
    backgroundColor: '#f2f3f4',
    borderRadius: wp('2%'),

    width: '100%',
    height: wp('13%'),
    paddingHorizontal: wp('3%'),
    marginVertical: hp('1%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: hp('26%'),
    width: '80%',
    borderRadius: 8,
  },
  agreement: {fontSize: wp('3%'), marginTop: hp('2%')},
  header_left: {
    position: 'absolute',
    top: hp('12%'),
    left: wp('5%'),

    zIndex: 100000
    //backgroundColor: "red",
  },
  header_icon: {
    color: colors.green,
    fontSize: wp('7%'),
    fontWeight: '700',
  },
});

export default styles;
