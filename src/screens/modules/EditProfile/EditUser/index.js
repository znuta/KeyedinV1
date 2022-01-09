import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  styles,
} from 'src/screens/modules/EditProfile/styles';
import {Header} from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {BASEURL} from 'src/constants/Services';
import Loader from 'src/component/Loader';
import { useDispatch, useSelector} from 'react-redux';
import {colors, hp, wp} from 'src/config/variables';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import LocationInput from 'src/component/LocationInput';
import Button from 'src/component/Button';
import { sendUserDetails, setLoading } from 'src/redux/actions/AuthActions';
import { ScrollView } from 'react-native-gesture-handler';

function EditUser(props) {
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()
  let _lastnameinput = useRef();
  let _passwordinput = useRef();
  let [value, setValue] = useState({});
const {first_name, last_name, username, email, phone, address_str,} = value
  const navigation = useNavigation();

  useEffect(() => {
    setValue({...value, ...auth.userData});
    
  }, []);

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

  const PostToApi = () => {
    let uri = BASEURL + `/users/profile/${auth.userData.id}`;
const {longitude="", latitude= ""} = value
    let data = {
      first_name: value.first_name,
      last_name: value.last_name,
      email: value.email,
      role: value.role,
      phone: value.phone,
      username: value.username,
      avatar: value.avatar,
      address_str: value.address_str,
      country: value.country,
      location: {
        coordinates: [
          longitude, latitude
        ]
      },
      
      type: 'Protisan',
    };
    console.log("___DATA_Payload__", data)
   dispatch(setLoading(true));
    axios.put(uri,data, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer' + ' ' + auth.token,
      },
    })
      .then(res => {

        const { user = {} } = res.data
        console.log("___DATA_RES__6", res)
        dispatch(sendUserDetails(user))
       dispatch(setLoading(false));
        //setImchange(!imchange);
        navigation.goBack();
       
      })
      .catch(error => {
        console.log("__ERROR_USER",error.response);
       dispatch(setLoading(false));
       
      });
    //props.setLoading(false);
  };
  const onChangeText = (key, data) => {
    setValue({...value, [key]: data}); 
  };

  const handleLocationAddress = (data, details) => {
    const { description } = data;
    const {
      geometry: {
        location: { lat, lng },
      },
    } = details;
    
    console.log("___LOcation",details,data)

    setValue({ ...value, address_str: description, longitude: lng, latitude: lat });
    
  };

  const HeaderLeft = () => {
    return (
      <TouchableOpacity
        style={{
          paddingHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color="white" />
       
      </TouchableOpacity>
    );
  };

  return (
    <Container style={{backgroundColor: colors.white}}>
      <Header
        leftComponent={<HeaderLeft />}
        statusBarProps={{barStyle: 'dark-content'}}
        centerComponent={
          <Text style={{color: colors.white, fontSize: 18, fontWeight: 'bold'}}>
            Edit Personal Information
          </Text>
        }
        //rightComponent={<HeaderRight />}
        containerStyle={{
          backgroundColor: colors.green,
          justifyContent: 'space-between',
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          paddingBottom: 30,
          borderBottomWidth: 0,
        }}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        scrollToEnd={true}
        style={{
          marginHorizontal: wp('5%'),
          backgroundColor: colors.white,
          paddingTop: hp('2%'),
        }}>
        <View
          style={styles.inputField}>
          <MaterialIcons
            name="person"
            size={wp('4%')}
            color={colors.medium}
            style={{marginRight: 5}}
          />

          <TextInput
            placeholder="Enter First Name"
            value={first_name}
            onChangeText={fname => onChangeText("first_name", fname)}
            onSubmitEditing={() => _lastnameinput && _lastnameinput.focus()}
            style={{
              color: colors.dark,
              fontSize: wp('3%'),
              fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
              width: '100%',
            }}
          />
        </View>
        <View
         style={styles.inputField}>
          <MaterialIcons
            name="person"
            size={20}
            color={colors.medium}
            style={{marginRight: 5}}
          />

          <TextInput
            placeholder="Enter Last Name"
            value={last_name}
            onChangeText={lname => onChangeText("last_name", lname)}
            onSubmitEditing={() => _lastnameinput && _lastnameinput.focus()}
            style={{
              color: colors.dark,
              fontSize: 14,
              fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
              width: '100%',
            }}
          />
        </View>

        <View
          style={styles.inputField}>
          <Ionicons
            name="ios-people"
            size={20}
            color={colors.medium}
            style={{marginRight: 5}}
          />

          <TextInput
            placeholder="Enter Username"
            value={username}
            onChangeText={uname => onChangeText("username", uname)}
            onSubmitEditing={() => _lastnameinput && _lastnameinput.focus()}
            ref={ref => {
              _lastnameinput = ref;
            }}
            //onSubmitEditing={() => _emailinput && _emailinput.focus()}
            style={{
              color: colors.dark,
              fontSize: 14,
              fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
              width: '100%',
            }}
          />
        </View>

        <View
         style={styles.inputField}>
          <MaterialIcons
            name="email"
            size={20}
            color={colors.medium}
            style={{marginRight: 5}}
          />

          <TextInput
            //placeholder="Enter Last Name"
            onChangeText={uemail => onChangeText("email",uemail)}
            value={email}
            placeholder="Enter Email"
            keyboardType="email-address"
            autoCapitalize="none"
            ref={ref => {
              // _emailinput = ref;
            }}
            onSubmitEditing={() => validate(email)}
            style={{
              color: colors.dark,
              fontSize: 14,
              fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
              width: '100%',
            }}
          />
        </View>

        

        <View
         style={styles.inputField}>
          <MaterialIcons
            name="phone"
            size={20}
            color={colors.medium}
            style={{marginRight: 5}}
          />

          <TextInput
            placeholder="Enter Phone Number"
            value={phone}
            onChangeText={phone => onChangeText("phone", phone)}
            onSubmitEditing={() => _lastnameinput && _lastnameinput.focus()}
            style={{
              color: colors.dark,
              fontSize: 14,
              fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
              width: '100%',
            }}
          />
        </View>

        <LocationInput icon={
              <MaterialIcons
              name="location-pin"
              size={20}
              color={colors.medium}
              style={{marginRight: 5}}
              />}
            
              handleLocationAddress={handleLocationAddress}
              placeholder={"Enter Location"}
            />

        

    

        {auth.loading && <Loader />}
      </KeyboardAwareScrollView>

      
          <View style={styles.actionBox}>
                <Button
                  text="Save Changes"
                  type="primary"
                  additionalStyle={{
                    button: {
                      marginTop: hp('5%'),
                      width: wp('60%'),
                      borderRadius: 50,
                      paddingVertical: hp('1.5%'),
                    },
                  }}
                  onPress={PostToApi}
                />
              </View>
    </Container>
  );
}

export default EditUser;
