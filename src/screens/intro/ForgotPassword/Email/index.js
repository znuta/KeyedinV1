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
  setLoading, setToast,
} from 'src/redux/actions/AuthActions';
import axios from 'axios';
import styles from './style';
import TextField from 'src/component/TextField';

const Email = props => {
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
    dispatch(setLoading(true));
      let uri = `${BASEURL}/auth/forgot-password/${email}`;
      props.saveState({email})
   
      
      
      axios.get(uri,{
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      }).then(res => {
          dispatch(setLoading(false));
          console.log("___EMAIL__", res)
          props.next()
          
        }).catch(error => {
        
          props.next()
         
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
        <Title style={{color: colors.green}}>Forgot Password</Title>
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
      </KeyboardAwareView>
      {/* </Footer> */}
    </Container>
  );
};

export default Email;
