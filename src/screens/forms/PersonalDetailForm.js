import React, {useState, useRef, useEffect} from 'react';
import {View, TextInput} from 'react-native';
import {Container, Wrapper, styles} from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {BASEURL} from 'src/constants/Services';
import Loader from 'src/component/Loader';
import colors from 'src/config/colors';
import {useSelector, useDispatch} from 'react-redux';
import { setLoading, sendUserDetails } from 'src/redux/actions/AuthActions';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { ScrollView } from 'react-native-gesture-handler';
import LocationInput from 'src/component/LocationInput';

const PersonalDetailForm = props => {
  const {onChangeText, value, handleLocationAddress} = props;
  const {firstname, lastname, email, password, category} = value;
  let _lastnameinput = useRef();
  let _emailinput = useRef();
  let _passwordinput = useRef();
  const [passwordview, setPasswordview] = useState(true);

  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);

  


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

  const autocomplete = {
    container: {
      flex: 1,
    },
    textInputContainer: {
      flexDirection: "row",
    },
    textInput: {
      // backgroundColor: colors.green,
      height: 25,
      borderRadius: 5,
      paddingVertical: 5,
      paddingHorizontal: 10,
      fontSize: 15,
      flex: 1,
    },
    poweredContainer: {
      justifyContent: "flex-end",
      alignItems: "center",
      borderBottomRightRadius: 5,
      borderBottomLeftRadius: 5,
      borderColor: "#c8c7cc",
      borderTopWidth: 0.5,
    },
    powered: {},
    listView: {},
    row: {
      backgroundColor: "#FFFFFF",
      padding: 13,
      height: 44,
      flexDirection: "row",
    },
    separator: {
      height: 0.5,
      backgroundColor: "#c8c7cc",
    },
    description: {},
    loader: {
      flexDirection: "row",
      justifyContent: "flex-end",
      height: 20,
    },
  };

  
  return (
    <Container>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        scrollToEnd={true}>
        <Wrapper>
          <View style={styles.inputField}>
            <MaterialIcons
              name="person"
              size={20}
              color={colors.medium}
              style={{marginRight: 5}}
            />

            <TextInput
              placeholder="Enter First Name"
              value={firstname}
              onChangeText={value => onChangeText('firstname', value)}
              onSubmitEditing={() => _lastnameinput && _lastnameinput.focus()}
              style={{
                color: colors.dark,
                fontSize: 14,
                fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
                width: '90%',
              }}
            />
          </View>

          <View style={styles.inputField}>
            <Ionicons
              name="ios-people"
              size={20}
              color={colors.medium}
              style={{marginRight: 5}}
            />

            <TextInput
              placeholder="Enter Last Name"
              value={lastname}
              onChangeText={value => onChangeText('lastname', value)}
              onSubmitEditing={() => _emailinput && _emailinput.focus()}
              ref={ref => {
                _lastnameinput = ref;
              }}
              //onSubmitEditing={() => _emailinput && _emailinput.focus()}
              style={{
                color: colors.dark,
                fontSize: 14,
                fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
                width: '90%',
              }}
            />
          </View>

          <View style={styles.inputField}>
            <MaterialIcons
              name="email"
              size={20}
              color={colors.medium}
              style={{marginRight: 5}}
            />

            <TextInput
              //placeholder="Enter Last Name"
              onChangeText={value => onChangeText('email', value)}
              value={email}
              placeholder="Enter Email"
              keyboardType="email-address"
              autoCapitalize="none"
              ref={ref => {
                _emailinput = ref;
              }}
              onSubmitEditing={() => {
                validate(email);
                //_pickerinput;
              }}
              style={{
                color: colors.dark,
                fontSize: 14,
                fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
                width: '90%',
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
              onChangeText={value => onChangeText('password', value)}
              placeholder="Enter Password (at least 8 characters)"
              placeholderTextColor="#C9CFD2"
              //autoCapitalize="sentences"
              secureTextEntry={passwordview}
              value={password}
              ref={ref => {
                _passwordinput = ref;
              }}
              returnKeyType="done"
              //onSubmitEditing={Keyboard.dismiss}
              style={{
                color: colors.dark,
                fontSize: 14,
                // fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
                width: '85%',
              }}
            />
            {passwordview && (
              <MaterialCommunityIcons
                name="eye"
                size={20}
                color={colors.medium}
                onPress={() => setPasswordview(!passwordview)}
                //style={{ backgroundColor: "red" }}
              />
            )}
            {!passwordview && (
              <MaterialCommunityIcons
                name="eye-off"
                size={20}
                color={colors.medium}
                onPress={() => setPasswordview(!passwordview)}
                //style={{ backgroundColor: "red" }}
              />
            )}
          </View>
          <ScrollView>
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
            
        </ScrollView>
          

          
        </Wrapper>

        {auth.loading && <Loader />}
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default PersonalDetailForm;
