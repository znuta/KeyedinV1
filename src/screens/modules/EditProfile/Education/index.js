import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Platform,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import Loader from 'src/component/Loader';
import {colors, hp, wp} from 'src/config/variables';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {Header} from 'react-native-elements';
import {BASEURL} from 'src/constants/Services';
import EducationForm from 'src/screens/forms/EducationForm';
import Button from 'src/component/Button/index';
import {
  styles as style,
  styles,
  Container,
} from 'src/screens/modules/EditProfile/styles';
import axios from 'axios';
import { sendEducationDetails, sendWorkDetails, setLoading } from 'src/redux/actions/AuthActions';

function EditEducation(props) {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const {auth} = useSelector(state=>state)
    const [name, setschoolName] = useState('');
    const [degree, setdegree] = useState('B.Sc');
    const [course, setcourse] = useState('');
    const [startDate, setStartDate] = useState('2016-02-15');
    const [stopDate, setStopDate] = useState('2017-08-15');
    const [updateid, setUpdateid] = useState(null);
    const [educations, setEducations] = useState([{}]);
    const { education = [] } = auth
    
    useEffect(() => {
        setEducations(education)
    },[education])
  
  const PutToApi = () => {
    let uri = BASEURL + `/profiles/education/${auth.userData.id}`;
    console.log({uri});

    let data = {
      user_id: auth.userData.id,
      role: "artisan",
      institutions: educations
    };
      
    dispatch(setLoading(true));  
    
    axios.put(uri,data, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer' + ' ' + auth.token,
      },
    }).then(res => {
      console.log("___DATA_EDUCATION__", res)
      const {data} = res.data
      dispatch(sendEducationDetails(data.institutions))
      dispatch(setLoading(false));
      navigation.goBack()
        
      }).catch(error => {
        console.log("___ITEM__EDU_ERRO", error)
        dispatch(setLoading(false));
        
      });
  };
    
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const DeleteToApi = id => {
    let uri = BASEURL + `/professional/educational-background/${id}`;
      console.log({ uri });
      
    dispatch(setLoading(true));
    axios.delete(uri, {
     
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer' + ' ' + auth.token,
      },
    }).then(res => {
        dispatch(setLoading(false));
       
      })
      .catch(error => {
        dispatch(setLoading(false));
        
      });

  };

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const onChangeText = (key, data, index) => {
    const newindex = educations[index];  
    const newArray = [...educations]  
    newArray[index] = { ...newindex, [key]: data }
    setEducations(newArray)
    
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
    <View style={styles.container2}>
      <SafeAreaView style={styles.header_safearea}>
        <Header
          leftComponent={<HeaderLeft />}
          statusBarProps={{barStyle: 'dark-content'}}
          centerComponent={
            <Text
              style={{color: colors.white, fontSize: 18, fontWeight: 'bold'}}>
              Education
            </Text>
          }
          containerStyle={{
            backgroundColor: colors.green,
            justifyContent: 'space-between',
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            paddingBottom: 30,
            borderBottomWidth: 0,
          }}
        />
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
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{marginHorizontal: 10}}>
            
              {auth.loading && <Loader />}
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

              {!isKeyboardVisible && (
                
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
                  onPress={() => PutToApi()}
                />
              </View>
                    
                   
                 
              )}
            </ScrollView>
          </Container>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

export default EditEducation;
