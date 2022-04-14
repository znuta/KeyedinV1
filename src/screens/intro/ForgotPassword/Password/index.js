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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {BASEURL} from 'src/constants/Services';
import Loader from 'src/component/Loader';
import {CometChat} from '@cometchat-pro/react-native-chat';
import colors from 'src/config/colors';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareView} from 'react-native-keyboard-aware-view';
import {useSelector, useDispatch} from 'react-redux';
import {
  setLoading, setToast,
} from 'src/redux/actions/AuthActions';
import axios from 'axios';
import styles from './style';
import TextField from 'src/component/TextField';
import { hp } from 'src/config/variables';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Password = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [confirmPassword, setConfirmPassword] = useState('');
  const [passwordReveal, setPasswordReveal] = useState(true);
  const [confirmPassReveal, setConfirmPasswordReveal] = useState(true);
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
    if (password ==="" || confirmPassword ==="") {
      return 
    }
    
    if (password !== confirmPassword) {
      dispatch(setToast({ show: true, type: "error", message: "Password does not match !!!", title: "Not Match"}));
      return
    }

    dispatch(setLoading(true));
      let uri = BASEURL + '/auth/change-password';
      const {email=""} = props.getState()
    let data = {
      email: email,
      password,
    };
      
      
      axios.post(uri, JSON.stringify(data),{
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      }).then(res => {
        console.log("____LOgo",res)
          dispatch(setLoading(false));
          
          navigation.navigate('UserLogin')
          
        }).catch(error => {
          console.log("____LOgoE",error)
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
    // if (reg.test(email) === false) {
    //   console.log('Email is Not Correct');
    //   alert('Check your Email');
    //   return false;
    // } else {
      //   _passwordinput && _passwordinput.focus();
     
      submitEmail();
    // }
  };

  const HeaderLeft = () => {
    return (
      <View style={styles.header_left}>
  <TouchableOpacity
        
        onPress={() => navigation.goBack()}>

        <MaterialIcons name="arrow-back" style={styles.header_icon} />
      
      </TouchableOpacity>
      </View>
     
      
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
      <View style={{marginBottom: 10, alignItems: 'center'}}>
        <Title style={{color: colors.green}}>New Password</Title>
        <Subtitle>Please enter your new password to continue</Subtitle>
      </View>
      <KeyboardAwareScrollView>
        <View
          style={{
            //backgroundColor: "yellow",
            justifyContent: 'flex-end',
            width: '100%',
            alignItems: 'center',
            marginBottom: hp('5%')
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

      

        <View style={styles.inputField}>
            <MaterialIcons
              name="lock"
              size={20}
              color={colors.medium}
              style={{marginRight: 5}}
            />

            <TextInput
              onChangeText={pwd => setPassword(pwd)}
              placeholder="Enter Password"
              placeholderTextColor="#C9CFD2"
              //autoCapitalize="sentences"
              secureTextEntry={passwordReveal}
              value={password}
             
              returnKeyType="done"
              onSubmitEditing={() => {
                nextStep();
                Keyboard.dismiss();
              }}
              style={{
                color: colors.dark,
                fontSize: 14,
                fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
                width: '85%',
              }}
            />
            {passwordReveal && (
              <MaterialCommunityIcons
                name="eye"
                size={20}
                color={colors.medium}
                onPress={() => setPasswordReveal(!passwordReveal)}
                
              />
            )}
            {!passwordReveal && (
              <MaterialCommunityIcons
                name="eye-off"
                size={20}
                color={colors.medium}
                onPress={() => setPasswordReveal(!passwordReveal)}
                //style={{ backgroundColor: "red" }}
              />
            )}
          </View>

          <View style={styles.inputField}>
            <MaterialIcons
              name="lock"
              size={20}
              color={colors.medium}
              style={{marginRight: 5}}
            />

            <TextInput
              onChangeText={pwd => setConfirmPassword(pwd)}
              placeholder="Confirm Password"
              placeholderTextColor="#C9CFD2"
              //autoCapitalize="sentences"
              secureTextEntry={confirmPassReveal}
              value={confirmPassword}
              ref={ref => {
              
              }}
              returnKeyType="done"
              onSubmitEditing={() => {
                nextStep();
                Keyboard.dismiss();
              }}
              style={{
                color: colors.dark,
                fontSize: 14,
                fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
                width: '85%',
              }}
            />
            {confirmPassReveal && (
              <MaterialCommunityIcons
                name="eye"
                size={20}
                color={colors.medium}
                onPress={() => setConfirmPasswordReveal(!confirmPassReveal)}
                
              />
            )}
            {!confirmPassReveal && (
              <MaterialCommunityIcons
                name="eye-off"
                size={20}
                color={colors.medium}
                onPress={() => setConfirmPasswordReveal(!confirmPassReveal)}
                //style={{ backgroundColor: "red" }}
              />
            )}
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
            onPress={nextStep}
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
      </KeyboardAwareScrollView>
      {/* </Footer> */}
    </Container>
  );
};

export default Password;
