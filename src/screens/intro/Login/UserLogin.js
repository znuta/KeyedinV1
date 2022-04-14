import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import {
  Title,
  Subtitle,
 
} from 'src/screens/intro/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

import messaging from '@react-native-firebase/messaging';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';
import {BASEURL, CometAppID, CometAuthKey} from 'src/constants/Services';
import Loader from 'src/component/Loader';
import {CometChat} from '@cometchat-pro/react-native-chat';
import colors from 'src/config/colors';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareView} from 'react-native-keyboard-aware-view';
import ListItemSeparator from 'src/component/ListItemSeparator';
import {
  setFirstLaunch,
  setLoading,
  saveToken,
  completeRegistration,
  sendUserDetails,
  setToast,
  // setIsAuthenticated
  
} from 'src/redux/actions/AuthActions';
import styles from './style';
import axios from 'axios';
import TextField from 'src/component/TextField';
import Toast from 'react-native-toast-message';
import { privacyModalActive, setLocation, termsModalActive } from 'src/redux/actions/AuthActions';
import TermsModal from 'src/component/TermsModal';
import PrivacyModal from 'src/component/PrivacyModal';
import { checkPermission, getFCMToken } from 'src/redux/actions/Notification';
const UserLogin = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {auth,ui} = useSelector(state => state);
  let _passwordinput = useRef();
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  const [allValid, setAllValid] = useState(false);
  let [errortext, setErrortext] = useState('');
  let [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  const [terms, setTerms] = useState(false);
  const [passwordReveal, setPasswordReveal] = useState(true);
  var topics = [];
  const checkEmptyInput = () => {
    if (firstname == '' || firstname == undefined) {
      alert('Please fill in your name');
    } else {
      console.log('Name inputed');
      if (email == '' || email == undefined) {
        alert('Please fill in your email');
      } else {
        console.log('not empty');
        if (password == '' || password == undefined) {
          alert('Password field is empty');
        } else {
          console.log('not empty');
          nextStep();
        }
      }
    }
  };

  useEffect(() => {
    dispatch(setLoading(false));
  }, []);


  const sendFcmToken = async (id,authToken) => {
    try {
    
      const token_permission = await checkPermission();
     if (token_permission) {
      const token = await getFCMToken()
      if (token) {
        await AsyncStorage.setItem("notification_token", token)
        const res=  await axios.put(`${BASEURL}/users/device/${id}`, {device_token:token}, {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer' + ' ' + authToken,
          }});
       }
     }
      
        
      
    } catch (err) {
      //Do nothing
      console.log("DEVICE_TOKEN___ERROR___",err);
      return;
    }
  };


  
  const login = () => {
    let uri = BASEURL + '/auth/login';
  
    //const apikey = "73dc1cb067c39b8b3026859320a668770e064e2c";
    const apikey = '9b276d509004d11955a380f29c65058679429862';
    let data = {
      email: email,
      password: password,
      role: 'protisan'
    };
    
    
    dispatch(setLoading(true));
    
    
      //console.log("Sending Login Data: ", data);
      axios.post(uri, data).then(res => {
         console.log("LOGIN_DETAILS", res)
            dispatch(setLoading(false));
        const { data = {} } = res.data
        const {
          first_name = '',
          last_name = '',
          id = '',
          avatar = ''
        } = data;
        let fullname = first_name + ' ' + last_name;
        let uid = id;
         sendFcmToken(id,data.token)
        var user = new CometChat.User(uid.toString());
        user.setAvatar(avatar)
        user.setName(fullname);
        CometChat.createUser(user, CometAuthKey).then(
          user => {
            console.log('Chat account created: ', user);
            // dispatch(setLoading(false));
            // AsyncStorage.setItem("token", data.token)
            // props.next();
          },
          error => {
            console.log('Error creating chat account: ', error.response);
            // dispatch(setLoading(false));
          },
        );
        
            CometChat.getLoggedinUser().then(
              user => {
                if(!user){
            CometChat.login(
              data.id,
              CometAuthKey,
            ).then(
              user => {
               user.setAvatar(avatar)
                console.log('Chat login successful: ', {user});
                let isIOS = Platform.OS === 'ios';
                var userTopic = CometAppID + "_user_" + user.getUid();
                if(isIOS){
                  var userTopicIos = userTopic + "_ios";
                  topics.push(userTopicIos);
                }else{
									var userTopicIos = userTopic + "_notification";
                  topics.push(userTopic);
                }
                topics.forEach(async topic => {
                  console.log('subscribing to topic => ', topic);
                  await messaging.subscribeToTopic(topic);
                });
              },
              error => {
                console.log('Chat login failed with exception: ', {error});
                dispatch(setLoading(false));
              
              },
            );
          }
        }, error => {
          console.log("Something went wrong", error);
        }
            );
            // Toast.show({
            //   type: 'success',
            //   text1: 'Login Success',
            //   text2: 'Welcome back 👋'
            // });
            dispatch(setToast({ show: true, type: "success", message: "Welcome back 👋, it's great seeing you back here!!", title: "Login Success"}));
            dispatch(saveToken(data.token));
            dispatch(sendUserDetails(data))
            // dispatch(setIsAuthenticated(true));
        dispatch(completeRegistration(true));
        AsyncStorage.setItem("token", data.token)
      navigation.navigate('Main');
         
        })
        .catch(error => {
          // Toast.show({
          //   type: 'error',
          //   text1: 'Login failed',
          //   text2: 'Error with credential'
          // });
          dispatch(setToast({ show: true, type: "error", message: "There is a problem signing you in !!!", title: "Login failed"}));
          dispatch(setLoading(false));
          
          console.log('Fetch Exception Caught...', error.response);
         
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
      _passwordinput && _passwordinput.focus();
      console.log('Email is Correct');
    }
  };

  const nextStep = () => {
   
    if (email === '' || password === '') {
      alert('Please enter your Email and Password');
    } else {
          login(); 
    }
  };

  const HeaderLeft = () => {
    return (
      <TouchableOpacity
        style={styles.header_left}
        onPress={() => navigation.goBack()}>

        <MaterialIcons name="close" style={styles.header_icon} />
      
      </TouchableOpacity>
    );
  };


  return (
    <View style={styles.container}>
      <View style={{marginBottom: 10, alignItems: 'center'}}>
        <HeaderLeft />
        <Title style={{color: colors.green}}>Sign in</Title>
        <Subtitle>Please sign into your account to continue</Subtitle>
      </View>
      <KeyboardAwareView>
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
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
              source={require('src/config/images/freelancer-2.png')}
              style={styles.image}
            />
          </View>
          <Toast />
          <TextField
              value={email}
              icon={<MaterialIcons
                name="email"
                size={20}
                color={colors.medium}
                style={{marginRight: 5}}
              />}
              onChangeText={uemail => setEmail(uemail)}
              placeholder="Enter Email"
              placeholderTextColor="#C9CFD2"
              keyboardType="email-address"
              autoCapitalize="none"
              ref={ref => {
                // _emailinput = ref;
              }}
              onSubmitEditing={() => validate(email)}
          />

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
              ref={ref => {
                _passwordinput = ref;
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
          {/* </Wrapper> */}

          {auth.loading && <Loader />}
          {/* <Footer> */}

          <View
            style={{
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
                borderRadius: 50,
              }}>
              <Text style={{color: colors.white, fontWeight: 'bold'}}>
                LOGIN
              </Text>
            </TouchableOpacity>
            <View
              style={{marginTop: 20, marginBottom: 0, alignItems: 'center'}}>
              <Text
                style={{color: colors.green, fontWeight: 'bold'}}
                onPress={() =>{ 
                  navigation.navigate('ForgotPassword')
                  }}>
                Forgotten Password ?
              </Text>
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
            </View>
            <View style={{marginBottom: 20}} />
            <ListItemSeparator style={{backgroundColor: colors.disabled}} />

            <View style={{marginTop: 20, marginBottom: 10}}>
              <Text>
                Don't have an account?{' '}
                <Text
                  style={{color: colors.green, fontWeight: 'bold'}}
                  onPress={() => navigation.navigate('Auth')}>
                  Register
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAwareView>
      <PrivacyModal visible={ui.privacyModalActive} />
      <TermsModal visible={ui.termsModalActive} />
      {/* </Footer> */}
    </View>
  );
};

export default UserLogin;
