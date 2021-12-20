import React, {useRef, useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {
  Container,
  Wrapper,
  TitleWrap,
  Title,
  Subtitle,
  ImageWrap,
  ContentWrap,
 
  styles,
} from 'src/screens/intro/Signup/styles';

import Layout from 'src/constants/Layout';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Image} from 'react-native-animatable';
// import OTPInputView from '@twotalltotems/react-native-otp-input';
import {useNavigation} from '@react-navigation/native';
// import OTPTextInput from 'react-native-otp-textinput';
import OTPField from 'react-native-otp-field';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import ListItemSeparator from 'src/component/ListItemSeparator';
import {useSelector, useDispatch} from 'react-redux';

import {BASEURL} from 'src/constants/Services';
import Loader from 'src/component/Loader';
import colors from 'src/config/colors';
import {
  setLoading,
  sendOTPError,
} from 'src/redux/actions/AuthActions';
import {hp, wp} from 'src/config/variables';
import axios from 'axios';

const OTP = props => {
  const [phone, setPhone] = useState();
  const [otp, setOTP] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);

  useEffect(() => {
    setPhone(auth.userData.phone);
  }, []);

  const nextStep = () => {
    const {next, saveState} = props;

    if (otp.toString().length < 4) {
      alert('Please complete the otp');
    } else {
      _verifyOTP();
    }
   
  };

  const _verifyOTP = () => {
  
    let uri = BASEURL + '/otp/verify-otp';
    let data = {
      phone: phone,
      code: '234',
      otp: otp,
    };

    dispatch(setLoading(true));
    axios.post(uri, data).then(res => {
      const { next, saveState } = props;
      const {data = {}} = res.data;
        dispatch(setLoading(false));
      // dispatch(sendUserDetails(data))
        next();
      })
      .catch(error => {
        console.log('Error', error);
        dispatch(setLoading(false));
        dispatch(sendOTPError(error));
      });
  };

  const HeaderLeft = () => {
    return (
      <TouchableOpacity
        style={styles.header_left}
        onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" style={styles.header_icon} />
        {/* <Text style={styles.headerBack}>Wallet</Text> */}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header_wrapper}>
        <HeaderLeft />
        <Text style={styles.header_text}>Enter One Time Password</Text>
      </View>
      <View style={styles.contentWrapper}>
        <Container>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            scrollToEnd={true}>
            {/* <View style={{ flex: 1, borderWidth: 1, height: "100%" }}> */}
            <Wrapper>
              <TitleWrap>
                <ImageWrap>
                  <Image
                    animation="fadeInRight"
                    resizeMode="contain"
                    source={require('src/config/images/otp-2.png')}
                    style={{
                      height: Layout.window.height * 0.3,
                      width: Layout.window.height * 0.35,
                      borderRadius: 8,
                    }}
                  />
                </ImageWrap>
                <Subtitle>
                  Please enter the OTP that was sent to {'\n'}{' '}
                  {auth.userData.phone}.
                </Subtitle>
              </TitleWrap>

              <ContentWrap>
                {/* {Platform.OS == 'ios' && (
                  <>
                    <OTPInputView
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '80%',
                      }}
                      pinCount={4}
                      // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                      // onCodeChanged = {code => { this.setState({code})}}
                      autoFocusOnLoad
                      codeInputFieldStyle={styles.otpBox}
                      //   codeInputHighlightStyle={styles.optBoxFocus}
                      onCodeFilled={code => {
                        console.log(
                          `Code is ${code}, let's send to server for verification!`,
                        );
                        setOTP(code);
                      }}
                      placeholderTextColor="black"
                    />
                  </>
                )} */}
                {/* {Platform.OS == 'android' && ( */}
                  <OTPField
                    length={4}
                    value={otp}
                    //error={"Please fill in complete OTP."}
                    onChange={res => setOTP(res)}
                    containerStyle={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    textFieldStyle={styles.otpBox}
                  />
                {/* )} */}

                <View style={styles.actionBox}>
                  <Text style={styles.footText}>Didn't receive the OTP?</Text>

                  <ListItemSeparator
                    style={{
                      backgroundColor: colors.disabled,
                      height: 2,
                      width: Layout.window.height * 0.5,
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                      width: '35%',
                    }}>
                    <Text style={{color: colors.green, fontWeight: 'bold'}}>
                      Resend OTP
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      width: '65%',
                    }}>
                    <Text
                      onPress={() => props.back()}
                      style={{color: colors.green, fontWeight: 'bold'}}>
                      Change phone number
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    marginTop: 30,
                  }}>
                  <TouchableOpacity
                    onPress={nextStep}
                    disabled={otp == null && true}
                    style={{
                      width: Layout.window.height * 0.3,
                      height: 60,
                      backgroundColor: colors.green,
                      borderRadius: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{color: colors.white, fontWeight: 'bold'}}>
                      Continue
                    </Text>
                  </TouchableOpacity>
                </View>
              </ContentWrap>
            </Wrapper>

            {auth.loading && <Loader />}
          </KeyboardAwareScrollView>
        </Container>
      </View>
    </View>
  );
};
export default OTP;
