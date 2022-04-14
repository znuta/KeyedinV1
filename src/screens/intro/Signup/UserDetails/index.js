import React, {useState, useRef, useEffect} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {KeyboardAwareView} from 'react-native-keyboard-aware-view';
import {wp, hp, fonts, colors} from 'src/config/variables';
import {Title, Subtitle, styles} from 'src/screens/intro/Signup/styles';
// import {styles} from 'src/screens/intro/Signup/styles';otp
import Button from 'src/component/Button/index';
import {BASEURL, CometAuthKey} from 'src/constants/Services';
import {CometChat} from '@cometchat-pro/react-native-chat';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';
import {
  setLoading,
  saveToken,
  sendUserDetails,
} from 'src/redux/actions/AuthActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PersonalDetailForm from 'src/screens/forms/PersonalDetailForm';
import axios from 'axios';

const UserDetails = props => {
  let _passwordinput = useRef();
  const [allValid, setAllValid] = useState(false);
  let [errortext, setErrortext] = useState('');
  let [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  const [terms, setTerms] = useState(false);
 
  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);
  const [value, setValue] = useState({});
  const {firstname, lastname, email, password, category,longitude = "0.0", latitude="0.0", address_str="ng" } = value;
  const onChangeText = (key, data) => {
    setValue({...value, [key]: data});
    
  };

  const checkEmptyInput = () => {
    nextStep();
    if (firstname == '' || firstname == '' || email == '' || password == '') {
      alert('Please fill complete the form');
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

  const handleLocationAddress = (data, details) => {
    
    const { description } = data;
    const {
      geometry: {
        location: { lat, lng },
      },
    } = details;
    
    setValue({ ...value, address_str: description, longitude: lng, latitude: lat });
    
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
    const {next, saveState} = props;
    
    createAccount();
  
  };

  const createAccount = () => {
    //console.log("At create account action ", data);
    let uri = BASEURL + '/auth/register';
    dispatch(setLoading(true));
    //const apikey = "73dc1cb067c39b8b3026859320a668770e064e2c";
    const apikey = '6686a7164e01892a097d097438a1d4d30be16bee';

    //console.log(auth);
    let data = {
      first_name: firstname,
      last_name: lastname,
      email: email,
      role: 'protisan',
      password: password,
      // city: "IKeja",
      // state: "Lagos",
      country_code: auth.userData.country_code,
      location: {
        coordinates: [
          longitude, latitude
        ]
      },
      address_str,
      phone: auth.userData.phone || "+234 8159 910 9387",
    };

   
      axios.put(uri, data)
        .then(res => {
         
          if (res.status === 200) {
            const {data = {}} = res.data;
            
            const {
              first_name = '',
              last_name = '',
              id = '',
            } = data;

            let fullname = first_name + ' ' + last_name;
            let uid = id;
           
            var user = new CometChat.User(uid.toString());
            user.setName(fullname);
            CometChat.createUser(user, CometAuthKey).then(
              user => {
                console.log('Chat account created: ', user);
                dispatch(setLoading(false));
                AsyncStorage.setItem("token", data.token)
                props.next();
              },
              error => {
                console.log('Error creating chat account: ', error.response);
                dispatch(setLoading(false));
              },
            );
            dispatch(saveToken(data.token));
           
            dispatch(sendUserDetails({...data}))
            props.next();

          } 
        })
        .catch(error => {
          dispatch(setLoading(false));
          console.log('Fetch Exception Caught...', error.response);
        });
    
  };

  const HeaderLeft = () => {
    return (
      <TouchableOpacity
        style={styles.header_left}
        onPress={() => props.back()}>
        <MaterialIcons name="arrow-back" style={styles.header_icon} />
        {/* <Text style={styles.headerBack}>Wallet</Text> */}
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View style={{marginBottom: 10, alignItems: 'center'}}>
        <HeaderLeft />
        <Title style={{color: colors.green}}>Sign up</Title>
        <Subtitle>Please input your account detailes to continue</Subtitle>
      </View>
      <KeyboardAwareView>
        <View showsVerticalScrollIndicator={false} style={{flex: 1}}>
          <PersonalDetailForm handleLocationAddress={handleLocationAddress} value={value} onChangeText={onChangeText} />

          <View
            style={{
              width: '100%',
              alignItems: 'center',
              marginTop: hp('1%'),
              marginBottom: hp('1%'),
            }}>
            <Button
              text="Signup"
              type="primary"
              additionalStyle={{
                button: {
                  marginTop: hp('5%'),
                  width: wp('40%'),
                  borderRadius: 50,
                  paddingVertical: hp('1.5%'),
                },
              }}
              onPress={nextStep}
            />
            
          </View>
        </View>
      </KeyboardAwareView>

      {/* </Footer> */}
    </View>
  );
};

export default UserDetails;
