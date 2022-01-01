import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  Wrapper,
  ImageWrap,
  ContentWrap,
  ShadowBtn,
  InputWrap,
  Footer,
  styles,
  AvatarPlaceholder,
  AvaterPlaceholder,
  TakePhotoButton,
  IDWrap,
  IDPlaceholder,
} from './styles';

import Layout from 'src/constants/Layout';
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Colors from 'src/constants/Colors';
import {Header} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';


import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {check, request, PERMISSIONS} from 'react-native-permissions';
import { useSelector, useDispatch} from 'react-redux';

import {getGovId, getAvatar, } from 'src/redux/reducers/AuthReducer';
import PrivacyModal from 'src/component/PrivacyModal';
import TermsModal from 'src/component/PrivacyModal';
import {ScrollView} from 'react-native';
import {BASEURL} from 'src/constants/Services';
import {colors, hp, wp} from 'src/config/variables';
import Button from 'src/component/Button/index';
import axios from 'axios';
import { setLoading, termsModalActive, privacyModalActive, } from 'src/redux/actions/AuthActions';



const  GovernmentVerification = (props) => {
    const { auth, ui } = useSelector(state => state)
    const dispatch = useDispatch()
  const [avatar, setAvatar] = useState('');
  const [govId, setGovId] = useState('');
  const [terms, setTerms] = useState(false);
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
    const navigation = useNavigation();
    

  useEffect(() => {
    dispatch(setLoading(false));
    (async () => {
      if (Platform.OS === 'ios' && status === 'active') {
        const permissionC = await request(PERMISSIONS.IOS.CAMERA)
        const permissionL = await request(PERMISSIONS.IOS.LOCATION_ALWAYS)
        
      } else {
        const permissionC = await request(PERMISSIONS.ANDROID.CAMERA)
        const permissionL  = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
       
      }
      
     
    })();
   
  }, []);

  const nextStep = () => {
    const {next} = props;
    if (avatar == '') {
      alert('Please add your Profile Picture');
    } else if (govId == '') {
      alert('Please add your Government ID');
    } else {
      next();
    }

    // props.next();
  };

 
  const _pickAvatar = async () => {
    try {
        let result = await launchImageLibrary({
            mediaType: 'photo',
            aspect: [4, 3],
            quality: 0.4,
            base64: true,
          });
      if (!result.cancelled) {
        setAvatar(result.uri);
        saveAvatar(result.uri);
        UploadAvatarToApi(
          `data:${result.type}/${
            result.uri.split('.')[result.uri.split('.').length - 1]
          };base64,${result.base64}`,
        );
      }
    
    } catch (E) {
      console.log(E);
    }
  };


  const _pickId = async () => {
   
    try {
        let result = await launchImageLibrary({
            mediaType: 'photo',
            aspect: [4, 3],
            quality: 0.4,
            base64: true,
          });
      if (!result.cancelled) {
        console.log(result.type);
        setGovId(result.uri);
        
        UploadGovIdToApi(
          `data:${result.type}/${
            result.uri.split('.')[result.uri.split('.').length - 1]
          };base64,${result.base64}`,
        );
      
      }

    } catch (E) {
      console.log(E);
    }
  };

  const UploadAvatarToApi = text => {
    let uri = BASEURL + '/media/upload-avatar';

    let data = {
      image: text,
    };
    dispatch(setLoading(true));
    axios.put(uri,JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer' + ' ' + auth.token,
      },
    }).then(res => {
        console.log(res);
        dispatch(setLoading(false));
      })
      .catch(error => {
        console.log('Avatar could not be uploaded', error);
        dispatch(setLoading(false));
       
      });
   
  };

  const UploadGovIdToApi = text => {
    let uri = BASEURL + '/employer/government-id';

    let data = {
      government_id: text,
    };
    dispatch(setLoading(true));
    axios.post(uri, JSON.stringify(data),{
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer' + ' ' + auth.token,
      },
    }).then(res => console.log(res))
      .catch(error => {
        dispatch(setLoading(false));
        
      });
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
        <Feather name="arrow-left" size={22} color="white" />
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <Header
        leftComponent={<HeaderLeft />}
        statusBarProps={{barStyle: 'light-content'}}
        centerComponent={
          <Text
            style={{
              color: 'white',
              fontSize: 15,
              fontWeight: '900',
              fontWeight: 'bold',
            }}>
            Verify Your Identity
          </Text>
        }
        // rightComponent={<HeaderRight />}
        containerStyle={{
          backgroundColor: Colors.primary,
          justifyContent: 'space-between',
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          paddingBottom: 10,
          height: 100,
          borderBottomWidth: 0,
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        scrollToEnd={true}
      > */}
        <Wrapper>
          {/* <TitleWrap>
            <Title>
              <Text>Verify Your Identity</Text>
            </Title>
            <Subtitle>
              <Text style={{ fontWeight: "500", color: colors.medium }}>
                <Text onPress={_snapPicture}>Take Photo</Text> |{" "}
                <Text onPress={_pickAvatar}>Upload Photo.</Text>
              </Text>
            </Subtitle>
          </TitleWrap> */}

          <ContentWrap>
            <ImageWrap>
              <AvatarPlaceholder activeOpacity={0.6} onPress={_pickAvatar}>
                {avatar != '' && (
                  <Image
                    source={{uri: avatar}}
                    // style={{ width: 200, height: 200, borderRadius: 100 }}
                    style={{
                      ...StyleSheet.absoluteFillObject,
                      borderRadius: (Layout.window.height * 0.2) / 2,
                    }}
                  />
                )}
                {avatar == '' && (
                  <Image
                    source={require('src/config/images/snap.jpeg')}
                    style={{
                      height: wp('30%'),
                      width: wp('30%'),
                      borderRadius: 50,
                    }}
                    // style={{
                    //   ...StyleSheet.absoluteFillObject,
                    //   borderRadius: (Layout.window.height * 0.2) / 2,
                    // }}
                  />
                  // <Feather name="plus" size={36} color="#4a3f35" />
                )}
              </AvatarPlaceholder>
            </ImageWrap>

            {/* <ImageWrap>
              <View style={{}}>
                <Text>Picture component</Text>
              </View>
              <AvaterPlaceholder activeOpacity={0.6} onPress={_pickAvatar}>
                <Image
                  source={
                    avatar == ""
                      ? require("../../config/images/noun.png")
                      : { uri: avatar }
                  }
                  style={{
                    backgroundColor: "red",
                    ...StyleSheet.absoluteFillObject,
                    borderRadius: (Layout.window.height * 0.2) / 2,
                  }}
                />
              </AvaterPlaceholder>
            </ImageWrap> 
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TakePhotoButton onPress={_snapPicture}>
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: 14,
                    color: Colors.secondary,
                    letterSpacing: 0,
                  }}
                >
                  Take a Photo
                </Text>
              </TakePhotoButton>
              <Text>
                {"  "}
                {"  "}
                {"  "}
              </Text>
              <TakePhotoButton onPress={_pickAvatar}>
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: 14,
                    color: Colors.primary,
                    letterSpacing: 0,
                  }}
                >
                  Upload a Photo
                </Text>
              </TakePhotoButton>
            </View>*/}

            {/* Government ID section */}
            <View
              style={{
                width: '100%',
                flex: 1,
                alignItems: 'center',
                margin: 10,
                paddingVertical: 15,
                paddingHorizontal: 30,
              }}>
              <IDWrap>
                <IDPlaceholder onPress={() => _pickId()}>
                  {govId ? (
                    <Image
                      source={{uri: govId}}
                      // style={{ width: 200, height: 200, borderRadius: 100 }}
                      style={{
                        ...StyleSheet.absoluteFillObject,
                        borderRadius: 15,
                        padding: hp('5%'),
                      }}
                      resizeMode="contain"
                    />
                  ) : (
                    <>
                      <Image
                        style={{
                          width: '90%',
                          height: hp('10%'),
                          marginTop: hp('1%'),
                        }}
                        source={require('src/assets/icons/idskeleton.gif')}
                      />
                      <Button
                        type="primary"
                        text="Upload ID"
                        additionalStyle={{
                          button: {
                            width: wp('30%'),
                            paddingVertical: hp('1.5%'),
                            marginTop: hp('2%'),
                          },
                          text: {fontSize: wp('3%'), fontWeight: '500'},
                        }}
                      />
                    </>
                  )}
                </IDPlaceholder>
              </IDWrap>
              <Text>
                {/* {govId && (
                  <Image
                    // source={{ uri: avatar }}
                    source={{ uri: `data:image/jpeg;base64,${govIdString}` }}
                    style={{ width: 200, height: 200, borderRadius: 15 }}
                    resizeMode={"contain"}
                  />
                )} */}
              </Text>
              <Text style={{fontWeight: '300', color: colors.grey}}>
                Upload a valid government issued ID
              </Text>
            </View>
            {/* Government ID section */}

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: 20,
              }}
              onPress={nextStep}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 10,
                  //backgroundColor: "red",
                }}>
                
                <Text
                  style={{width: '90%', fontWeight: '300', color: colors.grey}}>
                  I accept the{' '}
                  <Text
                    style={{color: Colors.primary, fontWeight: '500'}}
                    onPress={() => {
                      dispatch(termsModalActive(true));
                      setAgree1(true);
                    }}>
                    Terms of Service
                  </Text>{' '}
                  and{' '}
                  <Text
                    style={{color: Colors.primary, fontWeight: '500'}}
                    onPress={() => {
                      dispatch(privacyModalActive(true));
                      setAgree2(true);
                    }}>
                    Privacy Policy
                  </Text>
                </Text>
              </View>
              {terms && (
                <View>
                  <ShadowBtn onPress={nextStep}>
                    <View style={styles.shadowFirst} />
                    <View style={styles.shadowSecond} />
                    <View style={styles.shadowMain}>
                      <AntDesign
                        name="arrowright"
                        color="white"
                        size={24}
                        style={{marginTop: -5}}
                      />
                    </View>
                  </ShadowBtn>
                </View>
              )}
            </View>

            <TouchableOpacity
              style={{
                padding: 15,
                backgroundColor: Colors.primary,
                marginTop: 20,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 25,
              }}
              onPress={() => navigation.goBack()}
             
            >
              <Text
                style={{
                  color: 'white',
                  marginHorizontal: 50,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Save
              </Text>
            </TouchableOpacity>
          </ContentWrap>
        </Wrapper>
       
        <PrivacyModal visible={ui.privacyModalActive} />
        <TermsModal visible={ui.termsModalActive} />
      </ScrollView>
    </Container>
  );
}

export default GovernmentVerification;
