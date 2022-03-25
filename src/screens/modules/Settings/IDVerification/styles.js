import styled from 'styled-components/native';
import Colors from 'src/constants/Colors';
import Layout from 'src/constants/Layout';
import {StyleSheet, Platform} from 'react-native';

import {wp, hp, fonts, colors} from 'src/config/variables';

const Container = styled.View`
  flex: 1;
`;

const Wrapper = styled.View`
  flex: 1;
`;

const TitleWrap = styled.View`
  align-items: center;
`;

const Title = styled.Text`
  font-size: ${wp('6%')};
  text-align: left;
  font-weight: 700;
`;

const Subtitle = styled.Text`
 
  font-weight: 400;
  line-height: 22px;
  text-align: center;
  font-size: ${wp('3.5%')}
  color: ${colors.medium};
  margin-bottom: ${hp('2%')}
  margin-top: ${hp('0.5%')}
`;
const GetStext = styled.Text`
  margin-top: ${hp('2%')};
  line-height: 22px;
  text-align: left;
  color: ${Colors.tintColor};
`;

const Subtatle = styled.Text`
  color: ${Colors.mutedText};
`;

const ImageWrap = styled.View`
  ${'' /* background-color: #f4f6ff; */}
  border-radius: 8px;
  max-height: ${Layout.window.height * 0.3}px;
  max-width: ${Layout.window.height * 0.35}px;
`;

const ContentWrap = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
`;

const InputWrap = styled.View`
  margin-vertical: 10px;
  width: 100%;
  background-color: #f2f3f4;
  border-radius: 12px;
  flex-direction: row;
  padding-horizontal: 5px;
`;
const TextAreaWrap = styled.View`
  margin-vertical: 10px;
  width: 100%;
  background-color: #f2f3f4;
  border-radius: ${wp('7%')};
  flex-direction: row;
  padding-horizontal: 5px;
`;
const InputGroup = styled.View`
  margin-top: ${hp('1%')};
`;
const InputLabel = styled.Text`
  font-size: ${wp('4%')};
  font-weight: 700;
  color: ${colors.grey};
`;
const Footer = styled.View`
  width: 100%;
  display: flex;
  flex: 1;
  position: absolute;
  bottom: 0px;
  border-width: 1px;
`;

const Foter = styled.View`
  width: 100%;
  display: flex;
  flex: 1;
  position: absolute;
  bottom: 0px;
  justify-content: center;
  align-items: center;
`;

const ShadowBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: flex-start;
  ${props => (!props.disabled ? `opacity: 1` : `opacity: 0.3`)}
`;

const AvatarPlaceholder = styled.TouchableOpacity`
  height: ${wp('40%')};
  width: ${wp('40%')};
  margin-top: ${hp('5%')};
  border-radius: 50;
  
  align-items: center;
  justify-content: center;
`;

const AvaterPlaceholder = styled.TouchableOpacity`
  height: ${Layout.window.height * 0.2}px;
  width: ${Layout.window.height * 0.2}px;
  border-radius: ${(Layout.window.height * 0.2) / 2}px;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
`;

const TakePhotoButton = styled.TouchableOpacity`
  margin-top: 20px;
`;

const IDWrap = styled.View`
  margin-top: 15px;
  height: ${hp('20%')}px;
  width: ${Layout.window.height * 0.2}px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const IDVideo = styled.View`
  margin-top: 15px;
  height: 250px;
  width: ${Layout.window.height * 0.2}px;
  width: 100%;
`;

const IDPlaceholder = styled.TouchableOpacity`
  height: 100%;
  width: 100%;
  border-radius: 15px;

  align-items: center;
  justify-content: center;
  border-style: dashed;
  border-width: 2px;
  border-color: ${colors.disabled};
`;

const IDVideoPlaceholder = styled.View`
  height: 100%;
  width: 100%;
  border-radius: 15px;
  background-color: #f2f3f4;
  align-items: center;
  justify-content: center;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: hp('2%'),
  },
  container2: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentWrapper: {
    backgroundColor: 'white',
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  contentWrapper2: {
    backgroundColor: 'white',
    flex: 1,

    paddingTop: hp('1%'),
    paddingHorizontal: 20,
  },
  shadowFirst: {
    alignItems: 'flex-start',
    opacity: 0.13,
    width: 58,
    height: 60,
    borderRadius: 18,
    backgroundColor: 'rgba(48, 197, 123, 255)',
  },
  shadowSecond: {
    alignItems: 'flex-start',
    marginStart: -43,
    opacity: 0.24,
    width: 58,
    height: 60,
    borderRadius: 18,
    backgroundColor: 'rgba(48, 197, 123, 255)',
  },
  tickBox: {
    height: 15,
    width: 15,
    borderWidth: 1,
    borderColor: colors.medium,
    borderRadius: 2,
    marginRight: 5,
  },
  activeTick: {},
  inactiveTick: {},
  shadowMain: {
    alignItems: 'flex-start',
    paddingStart: 17,
    paddingTop: 23,
    marginStart: -43,
    width: 58,
    height: 60,
    borderRadius: 18,
    backgroundColor: 'rgba(48, 197, 123, 255)',
  },
  kav: {
    flex: 1,
  },
  otpBox: {
    marginHorizontal: wp('2%'),
    //flex: 1,
    height: hp('9%'),
    width: wp('15%'),
    fontSize: wp('4%'),
    backgroundColor: '#dcdcdc',
    borderRadius: wp('2.5%'),
    color: colors.dark,
  },
  optBoxFocus: {
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  inputStyle: {
    height: 50,
    flex: 1,
    alignItems: 'center',

    marginLeft: 5,
  },
  actionBox: {
    marginBottom: hp('1%'),
    alignItems: 'center',
    marginTop: hp('1%'),
  },
  footText: {
    fontSize: wp('3.2%'),
    marginVertical: hp('1%'),
    color: colors.medium,
  },
  contain: {
    flex: 1,
    paddingHorizontal: wp('6%'),
    paddingTop: hp('6%'),
    backgroundColor: colors.light,
    borderRadius: 25,
    flexDirection: 'row',
    width: '100%',
  },
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
  portfolio_text: {
    fontSize: wp('4%'),
    color: colors.grey,
  },
  circle: {
    width: wp('6%'),
    height: wp('6%'),
    backgroundColor: colors.green,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  white_plus: {
    fontSize: wp('5%'),
    color: colors.white,
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
    //  backgroundColor: '#f2f3f4',

    flexDirection: 'row',
    width: '100%',
    minHeight: wp('20%'),
    paddingHorizontal: wp('3%'),
    marginVertical: hp('1%'),

    color: colors.dark,
    fontSize: 14,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
  },

  image: {
    height: hp('26%'),
    width: '80%',
    borderRadius: 8,
    //backgroundColor: "red",
    //justifyContent: "center",
    //alignItems: "center",
  },
  agreement: {fontSize: wp('3%'), marginTop: hp('2%')},
  btnBox: {
    position: 'relative',
    //left: 0,
    //right: 0,
    // bottom: 30,
    marginTop: hp('3%'),
    //bottom: Layout.window.height,
    //flex: 1,
    //marginBottom: 15,
    //backgroundColor: "yellow",
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: Layout.window.height * 0.3,
    height: hp('8%'),
    backgroundColor: colors.green,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header_wrapper: {
    alignItems: 'center',
    marginTop: hp('5%'),
    marginBottom: hp('2%'),
  },
  header_wrapper2: {
    alignItems: 'center',
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
    backgroundColor: colors.green,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingVertical: hp('3%'),
  },
  header_safearea: {
    backgroundColor: colors.green,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header_left: {
    position: 'absolute',
    left: wp('2%'),
    //backgroundColor: "red",
  },
  header_left2: {
    position: 'absolute',
    left: wp('2%'),
    top: hp('3%'),
    //backgroundColor: "red",
  },
  header_text: {fontSize: wp('6%'), fontWeight: '700', color: colors.white},
  header_icon: {
    color: colors.white,
    fontSize: wp('7%'),
    fontWeight: '700',
  },
  description: {
    color: colors.medium,
    fontWeight: '400',
    textAlign: 'center',
    fontSize: wp('3.2%'),
  },
  subheader_container: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: hp('1%'),
  },

  each: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'dodgerblue',
  },
  dot: {
    borderWidth: 1,
    height: 20,
    width: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  inactiveDot: {
    backgroundColor: 'white',
    height: 8,
    width: 8,
    borderRadius: 4,
  },
  experience_level: {
    flexDirection: 'row',
    marginVertical: hp('0.5%'),
  },
  activeDot: {
    backgroundColor: colors.green,
    height: 10,
    width: 10,
    borderRadius: 5,
  },
  statusText: {
    fontSize: wp('3.5%'),
    fontWeight: '400',
    color: colors.grey,
  },
  cover: {
    //flexDirection: "row",
    paddingHorizontal: 10,
    paddingTop: 2,
    //paddingBottom: 10,
    //backgroundColor: "tomato",
    //justifyContent: "center",
    //flex: 1,
    alignItems: 'center',
  },
  dateText: {
    //position: "absolute",
    //left: 0,
    color: Colors.tintColor,
    fontSize: wp('3.5%'),
    fontWeight: '300',
  },
  plus_button: {
    flexDirection: 'row',
    marginVertical: Layout.window.height * 0.007,
    alignItems: 'center',
  },
  plus_text: {
    fontSize: wp('3.5%'),
    fontWeight: '300',
    marginLeft: wp('2%'),
    color: colors.grey,
  },
});

export {
  Container,
  Wrapper,
  TitleWrap,
  Title,
  Subtitle,
  Subtatle,
  ImageWrap,
  ContentWrap,
  ShadowBtn,
  InputWrap,
  Footer,
  Foter,
  styles,
  AvatarPlaceholder,
  AvaterPlaceholder,
  TakePhotoButton,
  IDWrap,
  IDPlaceholder,
  IDVideo,
  IDVideoPlaceholder,
  GetStext,
  InputLabel,
  InputGroup,
  TextAreaWrap,
};
