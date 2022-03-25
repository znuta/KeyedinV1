import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
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
import { setLoading, termsModalActive, privacyModalActive, uploadImage, setToast, } from 'src/redux/actions/AuthActions';
import TextField from 'src/component/TextField';



const  GovernmentVerification = (props) => {
    const { auth, ui } = useSelector(state => state)
    const dispatch = useDispatch()
  const [avatar, setAvatar] = useState('');
  const [avatarUri, setAvatarUri] = useState('');
  const [govId, setGovId] = useState({});
  const [cardUri, setCardUri] = useState("");
  const [idType, setIdType] = useState('');
  const [terms, setTerms] = useState(false);
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
    const navigation = useNavigation();
   

  useEffect(() => {
    // dispatch(setLoading(false));
   
    (async () => {
      if (Platform.OS === 'ios' && status === 'active') {
        const permissionC = await request(PERMISSIONS.IOS.CAMERA)
        const permissionL = await request(PERMISSIONS.IOS.LOCATION_ALWAYS)
        
      } else {
        const permissionC = await request(PERMISSIONS.ANDROID.CAMERA)
        const permissionL  = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
       
      }
      
     
    })();

    getUserIdentity()
   
  }, []);

  const nextStep = () => {
    const {next} = props;
    if (avatar == '') {
      alert('Please add your Profile Picture');
    } else if (govId == '') {
      alert('Please add your Government ID');
    }else if (idType == '') {
      alert('Please enter the type of Government ID');
    } else {
      UploadGovIdToApi()
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
       
        const {uri} = result.assets[0]
        setAvatar(result.assets[0]);
        setAvatarUri(uri)
        
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
      
        const {uri} = result.assets[0]
        setGovId(result.assets[0]);
        setCardUri(uri)
       
      }

    } catch (E) {
      console.log(E);
    }
  };

  const getUserIdentity = () => {
    let uri = BASEURL + `/users/verify-identity/${auth.userData.id}`;

   
    dispatch(setLoading(true));
    axios.get(uri, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer' + ' ' + auth.token,
      },
    }).then(res => {
      
        const {data} = res.data
        const {id_card_url = "", passport_url = "", id_type = ""} = data
        setAvatarUri(passport_url)
        setCardUri(id_card_url)
        setIdType(id_type)
        dispatch(setLoading(false));
      })
      .catch(error => {
        console.log('ERROR__ID__GET', error);
        dispatch(setLoading(false));
       
      });
   
  };

  const UploadGovIdToApi = async () => {
    dispatch(setLoading(true));
    let uri = BASEURL + `/users/verify-identity/${auth.userData.id}`;
    const govIDUrl = await uploadImage(govId)
    const avatarURL =  await uploadImage(avatar)
   
    let data = {
      id_type: idType,
      id_card_url: govIDUrl,
      passport_url: avatarURL
    };

    axios.put(uri, data,{
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer' + ' ' + auth.token,
      },
    }).then(res =>{ 
     
      dispatch(setLoading(false));
      dispatch(setToast({ title: "Submition Successful", message: `Submition of your government identity was successful.`, show: true, type:"success"}))
    }).catch(error => {
      console.log("___ERROR__ID",error)
        dispatch(setToast({ title: "Submition Error", message: `Submition of your government identity was not successful.`, show: true, type:"error"}))
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
               
              
                  <Image
                   resizeMode='contain'
                    source={avatarUri?{uri:avatarUri}:require('src/assets/icons/passport.png')}
                    style={{
                      height: '100%',
                      width: '100%',
                      borderRadius: 50,
                    }}
                   
                  />
             <Feather style={{
               position: 'absolute',
              //  bottom: -20,
               color: colors.green
            }} name="camera" size={36} />
               
              </AvatarPlaceholder>
            </ImageWrap>

           
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
                  
                      <ImageBackground
                      resizeMode='contain'
                        style={{
                          minWidth: '90%',
                        
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          
                         
                        }}
                        source={cardUri ?{uri: cardUri} : require('src/assets/icons/idskeleton.gif')}
                      >
                      <Button
                        type="primary"
                        text="Upload ID"
                        onPress={() => _pickId()}
                        additionalStyle={{
                          button: {
                            width: wp('40%'),
                            paddingVertical: hp('1.5%'),
                            // marginBottom: hp('4%'),
                           backgroundColor: 'transparent'
                          },
                          text: {fontSize: wp('4%'), fontWeight: '700', color: colors.green2},
                        }}
                      />

                      </ImageBackground>
                  

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
              <Text style={{fontWeight: '300',  color: colors.grey}}>
                Upload a valid government issued ID
              </Text>

              <TextField
              additionalStyle={{inputField:{
                backgroundColor: colors.white
              }}}
                value={idType}
                label="ID type"
                onChangeText={value => setIdType(value)}
                placeholder="Type of government issued ID"
              />
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
              onPress={() => nextStep()}
             
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
