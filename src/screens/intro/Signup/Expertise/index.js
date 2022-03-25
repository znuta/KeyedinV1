import React, {useState, useEffect, useRef, Fragment} from 'react';
import {wp, hp, fonts, colors} from 'src/config/variables';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import Button from 'src/component/Button/index';
import ListItemSeparator from 'src/component/ListItemSeparator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {BASEURL} from 'src/constants/Services';
import {useSelector, useDispatch} from 'react-redux';
import {
  setLoading,
  sendExpert,
} from 'src/redux/actions/AuthActions';
import {Container, styles} from 'src/screens/intro/Signup/styles';
// import styles from 'src/screens/intro/Signup/styles';
import ExpertiseForm from 'src/screens/forms/ExpertiseForm';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const Expertise = props => {
    const dispatch = useDispatch();
    const {auth, expert} = useSelector(state => state);
    const [value, setValue] = useState({});
    const { bio, service_category, skills, experience_level, } = value;
    
    const onChangeText = (key, data) => {
        setValue({...value, [key]: data});
    };
    

  const nextStep = () => {
    const {next, saveState, completeRegistration, newAccount} = props;
    if (skills.length == 0 || bio == '') {
      alert('Please Complete the form');
    } else {
      UploadExpertiseToApi();
    }
  };

  const UploadExpertiseToApi = () => {
    let uri = BASEURL + '/profiles/expertise';
    const {bio, service_category, skills, experience_level, } = value;
    
    let data = {
      user_id: auth.userData.id,
      role: 'protisan',
      bio: bio,
      category: service_category,
      skills: skills,
      level_of_experience: experience_level,
     
    };
    
    dispatch(setLoading(true));
    axios.post(uri, data,
      {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer' + ' ' + auth.token,
      },
    }).then(res => {
       
        dispatch(setLoading(false));
        if (res.data.error == 'Unauthenticated') {
          alert('Not Authenticated');
        } else {
          props.next();
        }
      })
      .catch(error => {
        console.log("___ERROR__", error.response)
        Toast.show({
          type: 'error',
          text1: 'Expertise Error ',
          text2: 'Error with expertise'
        });
        dispatch(setLoading(false));
       
      });
  };

  const HeaderLeft = () => {
    return (
      <TouchableOpacity
        style={styles.header_left2}
        onPress={() => {
          props.back();
        }}>
        <MaterialIcons name="arrow-back" style={styles.header_icon} />
        
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container2}>
      <SafeAreaView style={styles.header_safearea}>
        <View style={styles.header_wrapper2}>
          <HeaderLeft />
          <Text style={styles.header_text}>Expertise</Text>
        </View>
      </SafeAreaView>
      <View style={styles.contentWrapper2}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <Container>
              
            <View style={styles.subheader_container}>
              <Text style={styles.description}>
                Tell us about the work you do
              </Text>
            </View>

            <ListItemSeparator
              style={{borderWidth: wp('0.1%'), borderColor: '#707070'}}
            />
           
            <ScrollView
            
              showsVerticalScrollIndicator={false}
              style={{ flex: 1 }}>
               <Toast />
              <ExpertiseForm value={value} onChangeText={onChangeText} />
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  marginTop: hp('1%'),
                  marginBottom: hp('1%'),
                }}>
                <Button
                  text="Next"
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
                <Button
                  additionalStyle={{
                    button: {
                      width: wp('40%'),
                      borderRadius: 50,
                      paddingVertical: hp('1.5%'),
                    },
                  }}
                  text="Skip"
                  type="primary_text"
                  // onPress={()=>navigation.navigate()}
                />
              </View>
            </ScrollView>
          </Container>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default Expertise;
