import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import {styles} from 'src/screens/intro/Signup/styles';
import Button from 'src/component/Button/index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {BASEURL} from 'src/constants/Services';
import DocumentPicker from 'react-native-document-picker'
import {check, request, PERMISSIONS} from 'react-native-permissions';
import {useSelector, useDispatch} from 'react-redux';
import {
  setLoading,
  sendWorkDetails,
} from 'src/redux/actions/AuthActions';
import {wp, hp, fonts, colors} from 'src/config/variables';
import EmploymentForm from 'src/screens/forms/EmploymentForm';
import axios from 'axios';
import Toast from 'react-native-toast-message';


const Employment = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);
  const [value, setValue] = useState({});
  const [organizations, setOrganizations] = useState([{}]);

  const onChangeText = (key, data, index) => {
    const newindex = organizations[index];  
    const newArray = [...organizations]  
    newArray[index] = { ...newindex, [key]: data }
    setOrganizations(newArray)
    
  };
    
  const nextStep = () => {
    UploadEmploymentToApi()

  };


  const documentPicker = async (index) => {

    try {
        const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        })
        
      let name = result.name;
      let uri = result.uri;
      let lastIndexOf = uri.lastIndexOf(".");
      let ext = uri.substr(lastIndexOf+1, uri.length-1);
      var file = {
          name: name,
          uri: Platform.OS === 'android' ? result.uri : result.uri.replace("file://", ""),
      };
      onChangeText("portfolio", file, index)
    } catch (err) {
        if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
        } else {
        throw err
        }
    }
  
  }
    
  const UploadEmploymentToApi = () => {
    let uri = BASEURL + '/profiles/employment';
    console.log('pressing');
    let data = {
      user_id: auth.userData.id,
      role: auth.userData.role,
      organizations: organizations,
      
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
        
        navigation.navigate('Main');
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Employment Error ',
          text2: 'Error with employment'
        });
        dispatch(setLoading(false));
       
      });
  };

  const HeaderLeft = () => {
    return (
      <TouchableOpacity
        style={styles.header_left2}
        onPress={() => props.back()}>
        <MaterialIcons name="arrow-back" style={styles.header_icon} />
      
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container2}>
      <SafeAreaView style={styles.header_safearea}>
        <View style={styles.header_wrapper2}>
          <HeaderLeft />
          <Text style={styles.header_text}>Employment</Text>
        </View>
      </SafeAreaView>
      <View style={styles.contentWrapper2}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <Toast />
            { organizations.length ? organizations.map((value,index) => {
              return <EmploymentForm value={value} documentPicker={documentPicker} onChangeText={(key, data) => { 
                onChangeText(key, data,index)
               }} />
            }) : null}
            
            <View style={{marginVertical: 10}}>
          <TouchableOpacity
            onPress={() => {
              setOrganizations([...organizations, {}])
              //addCompany()
              console.log('pressed');
            }}
            style={styles.plus_button}>
            <MaterialCommunityIcons name="plus" size={30} color={colors.green} />
            <Text style={styles.plus_text}>Add Employment</Text>
          </TouchableOpacity>
      </View>
           
            <View style={styles.actionBox}>
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
                onPress={()=>nextStep()}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default Employment;
