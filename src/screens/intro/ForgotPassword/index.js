import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Container,
  Title,
  Subtitle,
} from 'src/screens/intro/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {BASEURL} from 'src/constants/Services';
import Loader from 'src/component/Loader';
import {CometChat} from '@cometchat-pro/react-native-chat';
import colors from 'src/config/colors';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareView} from 'react-native-keyboard-aware-view';
import {useSelector, useDispatch} from 'react-redux';
import {
  setLoading,
} from 'src/redux/actions/AuthActions';
import axios from 'axios';

const ForgotPassword = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);
  let [email, setEmail] = useState('');

  const [resetSuccess, setResetSuccess] = useState(false);


  useEffect(() => {
    dispatch(setLoading(false));
  }, []);

  const doCometLogin = uid => {
    let retVal = false;
    CometChat.login(uid, CometCredentials.apiKey).then(
      user => {
        console.log('Chat login successful: ', {user});
        retVal = true;
      },
      error => {
        console.log('Chat login failed with exception: ', {error});
        retVal = false;
      },
    );

    return retVal;
  };

  const submitEmail = () => {
      let uri = BASEURL + '/auth/password/forgot-password';
      
    let data = {
      email: email,
    };
      dispatch(setLoading(true));
      
      axios.post(uri, JSON.stringify(data),{
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      }).then(res => {
          dispatch(setLoading(false));
          console.log('ran', res);
         
            setResetSuccess(true);
            dispatch(setLoading(false));
            // navigation.goBack();
          
        }).catch(error => {
          setResetSuccess(false);
          dispatch(setLoading(false));
          
        });
    
  };

  const validate = text => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      console.log('Email is Not Correct');
      alert('Check your Email');
      return false;
    } else {
      //   _passwordinput && _passwordinput.focus();
      console.log('Email is Correct');
      submitEmail();
    }
  };

  const nextStep = () => {
    //console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      console.log('Email is Not Correct');
      alert('Check your Email');
      return false;
    } else {
      //   _passwordinput && _passwordinput.focus();
      console.log('Email is Correct');
      submitEmail();
    }
  };

  const HeaderLeft = () => {
    return (
      <TouchableOpacity
        style={{
          marginLeft: -15,
          marginBottom: 10,
          flexDirection: 'row',
          alignItems: 'center',
          //backgroundColor: "red",
        }}
        onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={24} color="black" />
        {/* <Text style={styles.headerBack}>Wallet</Text> */}
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setEmail(auth.userData.email);
  }, []);

  return (
    <Container
      style={{
        paddingHorizontal: 20,
        paddingTop: 100,
        backgroundColor: 'white',
      }}>
      <HeaderLeft />
      <View style={{marginBottom: 10}}>
        <Title>Forgot Password</Title>
        <Subtitle>Please enter your email address continue</Subtitle>
      </View>
      <KeyboardAwareView>
        <View
          style={{
            //backgroundColor: "yellow",
            justifyContent: 'flex-end',
            width: '100%',
            alignItems: 'center',
          }}>
          <Image
            //animation="fadeInRight"
            resizeMode="contain"
            source={require('src/config/images/otp-2.png')}
            style={{
              height: 160,
              width: '80%',
              borderRadius: 8,
              //backgroundColor: "red",
              //justifyContent: "center",
              //alignItems: "center",
            }}
          />
        </View>

        {/* <Wrapper> */}
        <View
          style={{
            backgroundColor: '#f2f3f4',
            borderRadius: 12,
            flexDirection: 'row',
            width: '100%',
            padding: 15,
            marginVertical: 10,
            alignItems: 'center',
          }}>
          <MaterialIcons
            name="email"
            size={20}
            color={colors.medium}
            style={{marginRight: 5}}
          />

          <TextInput
            //placeholder="Enter Last Name"
            onChangeText={uemail => setEmail(uemail)}
            value={email}
            placeholder="Enter Email"
            keyboardType="email-address"
            autoCapitalize="none"
            onSubmitEditing={() => validate(email)}
            style={{
              color: colors.dark,
              fontSize: 14,
              fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
              width: '90%',
            }}
          />
              </View>
              
        {auth.loading && <Loader />}

        <View
          style={{
            //position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            marginTop: 25,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              width: '80%',
              height: 50,
              backgroundColor: colors.green,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 12,
            }}>
            <Text style={{color: colors.white, fontWeight: 'bold'}}>
              SUBMIT
            </Text>
          </TouchableOpacity>
          
        </View>
      </KeyboardAwareView>
      {/* </Footer> */}
    </Container>
  );
};

export default ForgotPassword;
