import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  KeyboardAvoidingView,
  Alert,
  Keyboard,
  RefreshControl,
} from 'react-native';
import styled from 'styled-components';
import Colors from 'src/constants/Colors';
import {colors} from 'src/config/variables';
import Feather from 'react-native-vector-icons/Feather'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker'
import {useNavigation} from '@react-navigation/native';
import {Header} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector} from 'react-redux';
import {saveAvatar, setLoading, updateProfile} from 'src/redux/actions/AuthActions';
import {
  SAVE_AVATAR,
  SET_LOADING,
  SET_USER_DETAILS,
} from 'src/redux/action-types';
import Loader from 'src/component/Loader';
import {ScrollView} from 'react-native';
import ListItemSeparator from 'src/component/ListItemSeparator';
import {BASEURL} from 'src/constants/Services';
import {useNetInfo} from '@react-native-community/netinfo';
import EditPen from 'src/assets/icons/edit.svg';
import EditWhitePen from 'src/assets/icons/editwhitepen.svg';
import { GetExpertiseFromApi, GetEducation, GetExperience, uploadImage } from 'src/redux/actions/AuthActions';
import axios from 'axios';


function EditProfile(props) {
    const auth = useSelector(state => state.auth)
    const {userData = {}, expertise = {}, education = [], experience = []} = auth
  /// TODO: implement a rest call here to check and update the users status
const dispatch = useDispatch()
  let netInfo = useNetInfo();
    const navigation = useNavigation();
    const [user, setUser] = useState(auth.userData);
    const [expertiseData, setExpertise] = useState({});
    const [ educationData, setEducation] = useState({});
    const [experienceData, setExperience] = useState({});
    const [refreshing, setRefreshing] = useState(false);
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);

  const [avatar, setAvatar] = useState(userData.avatar);
  useEffect(() => {
    // GetCategory();
    const {userData} = auth
    dispatch(GetExpertiseFromApi(userData.id));
    dispatch(GetEducation(userData.id));
    dispatch(GetExperience(userData.id));

   
  }, []);

  useEffect(() => {
    setExperience(experience[0])
    setEducation(education[0])
    setExpertise(expertise)
  }, [experience, education, expertise]);
    
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    const {userData} = auth
    dispatch(GetExpertiseFromApi(userData.id));
    dispatch(GetEducation(userData.id));
    dispatch(GetExperience(userData.id));
  }, []);


  const UploadAvatarToApi =async payload => {

    let uri = BASEURL + `/media/user/media/${auth.userData.id}`;

    // const data = new FormData();
    // data.append("files", payload);
     const data = {
       avatar: payload
      }
    console.log("___FILE__PAYLOAD__", payload)
    dispatch(setLoading(true));
    axios.put(uri,data, {
      
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer' + ' ' + auth.token,
      },

    }).then(res => {
      console.log("___AVATAR__RES__", res)
      dispatch(setLoading(false));
     
      })
      .catch(error => {
        console.log("___AVATAR__Error__",error.response)
        dispatch(setLoading(false));
        
      });
   
  };

  const _pickAvatar = async () => {
    console.log('Open Image Picker');
    
    try {
        let result = await launchImageLibrary({
            mediaType: 'mixed',
            //allowsEditing: true,
            aspect: [4, 3],
            quality: 0.4,
            //allowsMultipleSelection: false,
            includeBase64: true,
            
          });
        if (!result.cancelled) {
           
          const { uri, type, base64, fileName, fileSize, width, height } = result.assets[0]
          const file = {uri, type, base64,name:fileName , size:fileSize, width, height }
          console.log("___IMAGE___", file)
          // uploadImage(file)
          dispatch(setLoading(true));
        const imageUrl =  await uploadImage(file);
        console.log("___IMAGE___", imageUrl)
        setAvatar(imageUrl)
        dispatch(saveAvatar(imageUrl));
      await UploadAvatarToApi(imageUrl);
         
          
      }
      //console.log(result);
    } catch (E) {
      console.log(E);
    }
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
        {/* <Text style={styles.headerBack}>Wallet</Text> */}
      </TouchableOpacity>
    );
  };


  return (
    <Container>
      <Header
        leftComponent={<HeaderLeft />}
        statusBarProps={{barStyle: 'dark-content'}}
        centerComponent={
          <Text style={{color: colors.white, fontSize: 18, fontWeight: 'bold'}}>
            Edit Profile
          </Text>
        }
        // rightComponent={<HeaderRight />}
        containerStyle={{
          backgroundColor: Colors.primary,
          justifyContent: 'space-between',
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          paddingBottom: 15,
          height: 120,
          borderBottomWidth: 0,
        }}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.secondary, Colors.primary]}
          />
        }>
        <ImageSection>
          <ImageWrap
            style={{borderRadius: 100, width: 150, height: 150}}
            activeOpacity={0.6}>
            <Image
              source={{
                uri: avatar ? avatar : userData.avatar,
                // avatar,
                // "https://static.dribbble.com/users/1304678/screenshots/7301908/media/3f91189797dd514eb6446b21a4faa209.png",
              }}
              style={{...StyleSheet.absoluteFillObject, borderRadius: 100}}
            />
          </ImageWrap>
          <View
            style={{
              marginTop: -60,
              marginBottom: 10,
              marginRight: -105,
              backgroundColor: colors.green,
              width: 40,
              height: 40,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <EditWhitePen onPress={() => _pickAvatar()} />
          </View>
          {/* <Fullname>
            {fullname}
          </Fullname> */}
          <LocationWrap>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
              {netInfo.isInternetReachable == true ? (
                <>
                  <Text
                    style={{
                      fontSize: 24,
                      color: Colors.primary,
                      marginTop: -4,
                    }}>
                    &bull;
                  </Text>
                  <Location>Online</Location>
                </>
              ) : (
                <>
                  <Text
                    style={{
                      fontSize: 24,
                      color: colors.primary,
                      marginTop: -4,
                    }}>
                    &bull;
                  </Text>
                  <Location>Offline</Location>
                </>
              )}
            </View>
            {/* <Ionicons name="md-pin" size={20} color={Colors.mutedText} /> */}
            {/* <Location>Abuja, Nigeria</Location> */}
          </LocationWrap>
        </ImageSection>

        <View style={{paddingHorizontal: 20}}>
          <KeyboardAvoidingView style={{flex: 1}}>
            <KeyboardAwareScrollView
              contentInsetAdjustmentBehavior="automatic"
              showsVerticalScrollIndicator={false}
              style={{flex: 1}}
              // contentContainerStyle={{ flex: 1 }}
            >
              <ListItemSeparator
                style={{
                  backgroundColor: '#8A9C7B',
                  width: '100%',
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <View>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 17,
                      color: colors.green,
                      // width: "80%",
                    }}>
                    Personal Details
                  </Text>
                </View>
                <TouchableOpacity
                  style={{paddingLeft: 20}}
                  onPress={() => navigation.navigate('EditUser')}>
                  <EditPen onPress={() => navigation.navigate('EditUser')} />
                </TouchableOpacity>
              </View>
              <View style={{marginTop: 14, marginBottom: 10}}>
                <Text style={{color: Colors.mutedText}}>First Name</Text>
                <Text style={{fontSize: 14}}>
                  {auth.userData.first_name}
                </Text>
              </View>

              <View style={{marginBottom: 10}}>
                <Text style={{color: Colors.mutedText}}>Last Name</Text>
                <Text style={{fontSize: 14}}>
                  {auth.userData.last_name}
                </Text>
              </View>

              <View style={{marginBottom: 10}}>
                <Text style={{color: Colors.mutedText}}>Email</Text>
                <Text style={{fontSize: 14}}>{auth.userData.email}</Text>
              </View>

              <View style={{marginBottom: 10}}>
                <Text style={{color: Colors.mutedText}}>Phone Number</Text>
                <Text style={{fontSize: 14}}>{auth.userData.phone}</Text>
              </View>
              <ListItemSeparator
                style={{
                  backgroundColor: '#8A9C7B',
                  width: '100%',
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 17,
                    color: colors.green,
                  }}>
                  Expertise Details
                </Text>
                <EditPen onPress={() => navigation.navigate('EditExpertise')} />
              </View>

              <View style={{marginTop: 14, marginBottom: 10}}>
                <Text style={{color: Colors.mutedText}}>Bio</Text>
                <Text style={{fontSize: 14}}>
                {expertiseData&&expertiseData.bio
                    ? expertiseData.bio
                    : "Not yet added"}
                 
                </Text>
              </View>

              <View style={{marginBottom: 10}}>
                <Text style={{color: Colors.mutedText}}>Service Category</Text>
                <Text style={{fontSize: 14}}>
                  {/* {category_name} */}
                  {expertiseData&&expertiseData.category
                    ? expertiseData.category
                    : ""}
                </Text>
              </View>

             
              <View style={{marginBottom: 10}}>
                <Text style={{color: Colors.mutedText}}>Skills</Text>
                <View style={{}}>
                  {expertiseData&& expertiseData.skills && expertiseData.skills.length ? (
                     
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{marginRight: 5}}>{expertiseData.skills.toString()}</Text>
                      </View>
                   
                  ): (
                    <Text>No skill Added</Text>
                   
                  )}
                </View>
              </View>

              <ListItemSeparator
                style={{
                  backgroundColor: '#8A9C7B',
                  width: '100%',
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 17,
                    color: colors.green,
                  }}>
                  Experience
                </Text>
                <TouchableOpacity
                  style={{}}
                  onPress={() => navigation.navigate('EditEmployment')}>
                  <EditPen
                    onPress={() => navigation.navigate('EditEmployment')}
                  />
                </TouchableOpacity>
              </View>
              {experienceData ? (
                
                  <View
                   
                    style={{
                      marginTop: 14,
                      flex: 1,
                      width: '100%',
                      padding: 10,
                    }}>
                    <View style={{marginBottom: 10}}>
                      <Text style={{color: Colors.mutedText}}>Company</Text>
                      <Text style={{fontSize: 14}}>{experienceData.employerName}</Text>
                    </View>
                    <View style={{marginBottom: 10}}>
                      <Text style={{color: Colors.mutedText}}>Role</Text>
                      <Text style={{fontSize: 14}}>{experienceData.jobRole}</Text>
                    </View>
                    <View style={{}}>
                      <Text style={{color: Colors.mutedText}}>
                        Responsibility
                      </Text>
                      <Text style={{fontSize: 14}}>
                        {experienceData.jobDescription}
                      </Text>
                    </View>
                  </View>
               
              ) : (
                <View style={{marginTop: 14, marginBottom: 10}}>
                  <Text
                    style={{color: Colors.mutedText}}
                    onPress={() => navigation.navigate('EditEmployment')}>
                    Add work experience
                  </Text>
                  <Text style={{fontSize: 14}}>
                    {/* {auth.userData.first_name} */}
                  </Text>
                </View>
              )}

              <ListItemSeparator
                style={{
                  backgroundColor: '#8A9C7B',
                  width: '100%',
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  //backgroundColor: "red",
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 17,
                    color: colors.green,
                  }}>
                  Education History
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('EditEducation')}>
                  <EditPen
                    onPress={() => navigation.navigate('EditEducation')}
                  />
                </TouchableOpacity>
              </View>
              {educationData ? (
              
                  <View
                    
                    style={{
                      marginTop: 14,
                      flex: 1,
                      width: '100%',
                      padding: 10,
                    }}>
                    <View style={{marginBottom: 10}}>
                      <Text style={{color: Colors.mutedText}}>School</Text>
                      <Text style={{fontSize: 14}}>{educationData.schoolName}</Text>
                    </View>
                    <View style={{marginBottom: 10}}>
                      <Text style={{color: Colors.mutedText}}>Degree</Text>
                      <Text style={{fontSize: 14}}>{educationData.degree}</Text>
                    </View>
                    <View style={{}}>
                      <Text style={{color: Colors.mutedText}}>Course</Text>
                      <Text style={{fontSize: 14}}>{educationData.course}</Text>
                    </View>
                  </View>
                
              ) : (
                <View style={{marginTop: 14, marginBottom: 10}}>
                  <Text
                    style={{color: Colors.mutedText}}
                    onPress={() => navigation.navigate('EditEducation')}>
                    Add Education
                  </Text>
                  <Text style={{fontSize: 14}}>
                   
                  </Text>
                </View>
              )}
              <View style={{paddingTop: 14}} />
              
            </KeyboardAwareScrollView>
          </KeyboardAvoidingView>
        </View>
        <TouchableHighlight
          style={{
            padding: 15,
            backgroundColor: Colors.primary,
            marginTop: 20,
            height: 50,
            marginHorizontal: 140,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 25,
          }}
          onPress={() => navigation.goBack()}
          // onPress={() => {
          //   //validate(distance);
          //  // Keyboard.dismiss();
          // }}
        >
          <Text
            style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
            Save
          </Text>
        </TouchableHighlight>
      </ScrollView>
      {auth.loading && <Loader />}
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const ImageSection = styled.View`
  padding-vertical: 30px;
  align-items: center;
  justify-content: center;
`;

const ImageWrap = styled.TouchableOpacity`
  height: 100px;
  width: 100px;
  border-radius: 10px;
  background-color: ${Colors.mutedText};
  margin-bottom: 15px;
`;

const Fullname = styled.Text`
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 5px;
`;

const LocationWrap = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Location = styled.Text`
  font-weight: 500;
  color: ${Colors.mutedText};
  margin-left: 5px;
`;

const Body = styled.View`
  flex: 1;
  background-color: white;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding-horizontal: 30px;
  padding-top: 20px;
`;

const InputWrap = styled.View`
  margin-bottom: 15px;
`;

const InputLabel = styled.Text`
  font-weight: 700;
  text-transform: uppercase;
  font-size: 12px;
`;

const Input = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
  height: 50px;
  border-width: 1.5px;
  border-radius: 8px;
  margin-vertical: 10px;
  border-color: ${Colors.mutedText}25;
`;

export default EditProfile;
