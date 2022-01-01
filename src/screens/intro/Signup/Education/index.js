import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Platform,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ListItemSeparator from 'src/component/ListItemSeparator';
import {KeyboardAvoidingView} from 'react-native';
import {BASEURL} from 'src/constants/Services';
import Button from 'src/component/Button/index';

import {Container, styles} from 'src/screens/intro/Signup/styles';
// import styles from 'src/screens/intro/Signup/styles';
import {useSelector, useDispatch} from 'react-redux';
import {
  setLoading,
  sendEducationDetails,
} from 'src/redux/actions/AuthActions';
import {wp, hp, fonts, colors} from 'src/config/variables';
import EducationForm from 'src/screens/forms/EducationForm';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const Education = props => {
  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);
  const todos = useSelector(state => state.todo);
  const [value, setValue] = useState({});
  const [educations, setEducations] = useState([{}]);
  const onChangeText = (key, data, index) => {
    const newindex = educations[index];  
    const newArray = [...educations]  
    newArray[index] = { ...newindex, [key]: data }
    setEducations(newArray)
    
  };
  const previousStep = () => {
    const {back, saveState} = props;
    back();
  };

  const nextStep = () => {
    const {next, saveState} = props;
    console.log(todos);
    if ((schoolName.length > 1) & (course.length > 1)) {
      alert(
        "Please press the 'Save Education Information' button to save the Education Information",
      );
    } else {
      const data = todos;
   SaveEducationToApi()

      saveState({Education: data});
      
    }
  };
    
  const SaveEducationToApi = () => {
    let uri = BASEURL + '/profiles/education';

    let data = {
      //completed: false,
      user_id: auth.userData.id,
      role: auth.userData.role,
      institutions: educations
    };
    dispatch(setLoading(true));
    axios.post(uri, data,
      {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer' + ' ' + auth.token,
      },
    }).then(res => {
       
        console.log('mert', res);
        dispatch(setLoading(false));
        props.next()
      })
      .catch(error => {

        Toast.show({
          type: 'error',
          text1: 'Education Error ',
          text2: 'Error with education'
        });
        console.log("__ERROR__", error.response)
        dispatch(setLoading(false));
       
      });
  };

  const todayA = new Date();
  const formattedToday =
    todayA.getDate() +
    '-0' +
    (todayA.getMonth() + 1) +
    '-' +
    todayA.getFullYear();

  const [schoolName, setschoolName] = useState('');

  const [course, setcourse] = useState('');
 
  const HeaderLeft = () => {
    return (
      <TouchableOpacity
        style={styles.header_left2}
        onPress={() => props.back()}>
        <MaterialIcons name="arrow-back" style={styles.header_icon} />
        {/* <Text style={styles.headerBack}>Wallet</Text> */}
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container2}>
      <SafeAreaView style={styles.header_safearea}>
        <View style={styles.header_wrapper2}>
          <HeaderLeft />
          <Text style={styles.header_text}>Education</Text>
        </View>
      </SafeAreaView>
      <View style={styles.contentWrapper2}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <Container>
            {/* <ScrollView showsVerticalScrollIndicator={false}> */}
            <View style={styles.subheader_container}>
              <Text style={styles.description}>
                Add school you attended, area of study and degree earned
              </Text>
            </View>

            <ListItemSeparator
              style={{borderWidth: wp('0.1%'), borderColor: '#707070'}}
            />
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            <Toast />
            {educations && educations.length ? educations.map((value, index) => {
              return <EducationForm value={value} onChangeText={(key, data) => { 
                onChangeText(key, data,index)
               }} />
            }) : null}
              
              <TouchableOpacity
          onPress={() =>{setEducations([...educations, {}])}}
          style={styles.plus_button}>
          <MaterialCommunityIcons name="plus" size={30} color={colors.green} />
          <Text style={styles.plus_text}>Add Education</Text>
        </TouchableOpacity>
              
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  marginTop: 'auto',
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
                  onPress={nextStep}
                />
              </View>
            </ScrollView>
          </Container>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default Education;
