import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import Loader from 'src/component/Loader';
import Button from 'src/component/Button/index';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {colors, hp, wp} from 'src/config/variables';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import { useDispatch, useSelector} from 'react-redux';
import {check, request, PERMISSIONS} from 'react-native-permissions';
import Feather from 'react-native-vector-icons/Feather'
import {Header} from 'react-native-elements';
import {BASEURL} from 'src/constants/Services';
import EmploymentForm from 'src/screens/forms/EmploymentForm';
import {
  styles as style,
  styles,
  Container,
} from 'src/screens/modules/EditProfile/styles';
import axios from 'axios';
import { sendWorkDetails, setLoading, uploadImage } from 'src/redux/actions/AuthActions';
import DocumentPicker from 'react-native-document-picker'

function EditEmployment(props) {
  const navigation = useNavigation();
  const { auth } = useSelector(state => state)
  const dispatch = useDispatch()
  const [label, setLabel] = useState(false);
  const [profUpload, setprofUpload] = useState(false);
  const [profileVideo, setProfileVideo] = useState('');
  const [organizations, setOrganizations] = useState([{}]);
  const { experience = [] } = auth
    
    useEffect(() => {
      setOrganizations(experience)
    },[experience])

  const onChangeText = (key, data, index) => {
    const newindex = organizations[index];  
    const newArray = [...organizations]  
    newArray[index] = { ...newindex, [key]: data }
    setOrganizations(newArray)
    
  };

  const documentPicker = async (index) => {

    // Pick a single file
    try {
        const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        })
        
      let name = result.name;
      let uri = result.uri;
      let lastIndexOf = uri.lastIndexOf(".");
      let ext = uri.substr(lastIndexOf+1, uri.length-1);
      // var file = {
      //     name: name,
      //     uri: Platform.OS === 'android' ? result.uri : result.uri.replace("file://", ""),
      // };
      Alert.alert('Upload', 'Are you sure you want to upload this file ?', [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('cancel logout');
          },
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async() => {
            const imageUrl =  await uploadImage(result)
      onChangeText("portfolio", imageUrl, index)
          },
        },
      ]);
     
    } catch (err) {
        if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
        } else {
        throw err
        }
    }

      
}

  const PutToApi = () => {
    dispatch(setLoading(true));
    let uri = BASEURL + `/profiles/employment/${auth.userData.id}`;
  
    let data = {
      user_id: auth.userData.id,
      role: 'protisan',
      organizations
    };
    dispatch(setLoading(true));
    axios.put(uri, data,{
      
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer' + ' ' + auth.token,
      },
    })
      .then(res => {
        const { data } = res.data
       
       dispatch(sendWorkDetails(data.organizations))
        dispatch(setLoading(false));
        navigation.goBack()
      })
      .catch(error => {
        dispatch(setLoading(false));
       
      });
    
  };

  const DeleteToApi = id => {
    let uri = BASEURL + `/professional/work-experience/${id}`;
   
    dispatch(setLoading(true));
    axios.delete(uri, {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer' + ' ' + auth.token,
      },
    }).then(res => {
       
        dispatch(setLoading(false));
        
      }).catch(error => {
        dispatch(setLoading(false));
       
      });
   
  };

  
  const _pickPortfolio = async () => {

    let status = null
    if (Platform.OS === 'ios' && status === 'active') {
      const permission = await request(PERMISSIONS.IOS.CAMERA)
      status = permission.status

    } else {
      const permission  = await request(PERMISSIONS.ANDROID.CAMERA)
      status = permission.status
    }
    try {
      let result = await launchImageLibrary({
        mediaType: 'photo',
        aspect: [4, 3],
        quality: 0.4,
        base64: true,
      });
      if (!result.cancelled) {
        const value = Object.values(result.uri.split('/'));
        const fed = value[value.length - 1];
       
      }

    } catch (E) {
      console.log(E);
    }
  };


  const _pickProfileVideo = async () => {
    let {saveAvatar} = props;
    let status = null
    if (Platform.OS === 'ios' && status === 'active') {
      const permission = await request(PERMISSIONS.IOS.CAMERA)
      status = permission.status

    } else {
      const permission  = await request(PERMISSIONS.ANDROID.CAMERA)
      status = permission.status
    }
    if (status != 'granted') {
      alert('You did not accept the Permissions, so no video for you.');
    } else {
      try {
        let result = await launchImageLibrary({
          mediaType: 'video',
          //allowsEditing: true,
          aspect: [4, 3],
          quality: 0.4,
          //allowsMultipleSelection: false,
          base64: true,
        });
        if (!result.cancelled) {
          console.log('duration');
          const duration = Math.round(result.duration / 1000);
          if (duration > 30) {
            alert('This video is more than 30 seconds');
          } else {
           
            setprofUpload(true);
            setProfileVideo(result.uri);
          }
          console.log(result.duration / 1000);
        
        }
      } catch (E) {
        console.log(E);
      }
    }
  };

  const _shootProfileVideo = async () => {
    let { saveAvatar } = props;
    let status = null
    if (Platform.OS === 'ios' && status === 'active') {
      const permission = await request(PERMISSIONS.IOS.CAMERA)
      status = permission.status

    } else {
      const permission  = await request(PERMISSIONS.ANDROID.CAMERA)
      status = permission.status
    }
    if (status != 'granted') {
      alert('You didnt accept Permissions.');
    } else {
      try {
        let result = await launchImageLibrary({
          mediaType: 'video',
          aspect: [4, 3],
          quality: 0.4,
          base64: true,
        });
        if (!result.cancelled) {
        
          const duration = Math.round(result.duration / 1000);
          if (duration > 30) {
            alert('This video is more than 30 seconds');
          } else {
           
            setprofUpload(true);
           
          }
          
        }
      } catch (E) {
        console.log(E);
      }
    }
  };

 
  const saveChanges = () => {
    PutToApi();
  
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
              Employment
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
      </SafeAreaView>
      <View style={styles.contentWrapper2}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <Container>
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              scrollToEnd={true}>
              <View style={styles.subheader_container}>
                <Text style={styles.description}>
                  Tell us about the work you do
                </Text>
              </View>
              {auth.loading && <Loader />}

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
                  onPress={saveChanges}
                />
              </View>
              {label && (
                <TouchableOpacity
                  style={{
                    //width: "80%",
                    height: 50,
                    backgroundColor: colors.light,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 12,
                    width: '80%',
                  }}
                  onPress={saveChanges}>
                  <View>
                    <Text style={{color: colors.black}}>Save Changes</Text>
                  </View>
                </TouchableOpacity>
              )}

         
            </KeyboardAwareScrollView>
          </Container>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

export default EditEmployment;
