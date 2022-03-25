import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  Wrapper,
  TitleWrap,
  Title,
  Subtitle,
  ImageWrap,
  ContentWrap,
  ShadowBtn,
  InputWrap,
  Footer,
  styles,
} from 'src/screens/intro/Signup/styles';
import {useSelector, useDispatch} from 'react-redux';
import Layout from 'src/constants/Layout';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Image} from 'react-native-animatable';
import PhoneInput from 'react-native-phone-input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {BASEURL} from 'src/constants/Services';
import Loader from 'src/component/Loader';
import colors from 'src/config/colors';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import {
  setLoading,
  sendOTPSuccess,
  sendOTPError,
  setToast,
} from 'src/redux/actions/AuthActions';
import ListItemSeparator from 'src/component/ListItemSeparator';
import {hp} from 'src/config/variables';
import axios from 'axios';
import { privacyModalActive, setLocation, termsModalActive } from 'src/redux/actions/AuthActions';
import TermsModal from 'src/component/TermsModal';
import PrivacyModal from 'src/component/PrivacyModal';


const PhoneNumber = props => {
  // let _phoneRef = useRef();
  let _phoneRef;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {auth,ui} = useSelector(state => state);

  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('234');
  const [readyNext, setReadyNext] = useState(false);

  useEffect(() => {
    phone.length >= 10 && setReadyNext(true);
  }, []);

  const _handlePhoneChange = value => {
    setReadyNext(_phoneRef.isValidNumber());
    setCountry(_phoneRef.getCountryCode());
    setPhone(value);
    return;
  };

  const nextStep = () => {
    const {next, saveState} = props;
    saveState({
      phone: phone,
    });
   
    _sendOtpRequest();
  };

  const _sendOtpRequest = () => {
    let uri = BASEURL + '/auth/register';
    let data = {
      phone: phone,
      country_code: country,
      role: 'protisan'
    };
    dispatch(setLoading(true));
      axios.post(uri, data).then(res => {
          console.log("___RES__", res)
          const { data } = res
          
          dispatch(setLoading(false));
          dispatch(sendOTPSuccess(phone));
          props.next();
       
      })
        .catch(error => {
         
          dispatch(setToast({ show: true, type: "error", message: "There is a problem signing you up, this user already exist", title: "Signup failed"}));
        dispatch(setLoading(false));
        dispatch(sendOTPError(error));
      });
  };

  const HeaderLeft = () => {
    return (
      <TouchableOpacity
        style={styles.header_left}
        onPress={() => navigation.goBack()}>
        <MaterialIcons name="close" style={styles.header_icon} />
        {/* <Text style={styles.headerBack}>Wallet</Text> */}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{
      flex: 1,
     
      paddingTop: hp('6%'),
      backgroundColor: colors.green,
    }}>
      <View style={styles.header_wrapper}>
        <HeaderLeft />
        <Text style={styles.header_text}>Get Started</Text>
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
                    source={require('src/assets/illustrations/password.jpg')}
                    // source={require("./../../config/images/community-2.png")}
                    style={{
                      height: hp('20%'),
                      width: Layout.window.height * 0.3,
                      borderRadius: 8,
                    }}
                  />
                </ImageWrap>
                <Title>Your Phone Number</Title>
                <Subtitle>
                  Please enter your mobile number to get started. A One-Time
                  Password (OTP) will be sent to you.
                </Subtitle>
              </TitleWrap>
              <Toast />
              <ContentWrap>
                {/* <InputWrap> */}
                <PhoneInput
                  textStyle={{fontSize: 16, fontWeight: '500'}}
                  ref={ref => {
                    _phoneRef = ref;
                  }}
                  style={styles.inputField}
                  initialCountry={'ng'}
                  textProps={{placeholder: 'Your Phone Number'}}
                  autoFormat={true}
                  value={phone}
                  onChangePhoneNumber={val => _handlePhoneChange(val)}
                />
                {/* </InputWrap> */}
                <View style={styles.btnBox}>
                  <TouchableOpacity
                    onPress={nextStep}
                    disabled={!readyNext}
                    style={styles.btn}>
                    <Text style={{color: colors.white, fontWeight: 'bold'}}>
                      Register
                    </Text>
                  </TouchableOpacity>
                  <View style={{marginTop: 'auto'}}></View>
                  <View
                    style={{
                      marginBottom: 20,
                      alignItems: 'center',
                      marginTop: 30,
                    }}>
                    <Text style={styles.agreement}>
                      By pressing the
                      <Text
                        style={{color: colors.black, fontWeight: 'bold'}}
                        onPress={() => navigation.navigate('GetStarted')}>
                        {' '}
                        Login
                      </Text>{' '}
                      button, you agree to our
                      <Text
                        style={{color: colors.green, fontWeight: 'bold'}}
                        onPress={() => dispatch(privacyModalActive(true))}>
                        {' '}
                        Terms of use
                      </Text>{' '}
                      and
                      <Text
                        style={{color: colors.green, fontWeight: 'bold'}}
                        onPress={() => dispatch(termsModalActive(true))}>
                        {' '}
                        Privacy Policy
                      </Text>
                    </Text>

                    <ListItemSeparator
                      style={{
                        backgroundColor: colors.disabled,
                        height: 2,
                        width: Layout.window.height * 0.5,
                      }}
                    />
                  </View>
                  <View style={{marginTop: hp('1%')}}>
                    <Text>
                      Have an account?{' '}
                      <Text
                        style={{color: colors.green, fontWeight: 'bold'}}
                        onPress={() => {
                          navigation.navigate('UserLogin');
                          //props.setFirstLaunch(false);
                        }}>
                        Login
                      </Text>
                    </Text>
                  </View>
                </View>
              </ContentWrap>
            </Wrapper>

            {auth.loading && <Loader />}
          </KeyboardAwareScrollView>
        </Container>
        <PrivacyModal visible={ui.privacyModalActive} />
      <TermsModal visible={ui.termsModalActive} />
      </View>
    </View>
  );
};

export default PhoneNumber;
