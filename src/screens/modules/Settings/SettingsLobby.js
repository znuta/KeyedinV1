import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  Linking,
  Alert,
} from 'react-native';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import {Header} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import {colors} from 'src/config/variables';
import Colors from 'src/constants/Colors';
import ListItemSeparator from 'src/component/ListItemSeparator';
import { useDispatch, useSelector} from 'react-redux';
import Loader from 'src/component/Loader';
import {check, request, PERMISSIONS} from 'react-native-permissions';
import RNLocation from 'react-native-location';
import { privacyModalActive, setLoading, setLocation, termsModalActive } from 'src/redux/actions/AuthActions';
import TermsModal from 'src/component/TermsModal';
import PrivacyModal from 'src/component/PrivacyModal';


function SettingsLobby(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const {auth, ui} = useSelector(state=>state)
  const [joint_per, setJoint_per] = useState('');

  useEffect(() => {
    dispatch(setLoading(false));
    (async () => {
      if (Platform.OS === 'ios' && status === 'active') {
        const permissionC = await request(PERMISSIONS.IOS.CAMERA)
        const permissionL = await request(PERMISSIONS.IOS.LOCATION_ALWAYS)
        setLocation_per(permissionL.status);
        setGallery_per(permissionC.status);
      } else {
        const permissionC = await request(PERMISSIONS.ANDROID.CAMERA)
        const permissionL  = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        setLocation_per(permissionL.status);
        setGallery_per(permissionC.status);
      }
      setLocation_per(locations.status);
      setGallery_per(status);
     
    })();
    if (location_per == 'granted') {
      if (gallery_per == 'granted') {
        setJoint_per('granted');
      }
    } else {
      setJoint_per('No');
    }
    console.log('perm', location_per, gallery_per);
  }, []);

  const _handleLocationPermission = async () => {
    RNLocation.requestPermission({
      ios: "whenInUse",
      android: {
        detail: "coarse"
      }
    }).then(granted => {
      if (granted) {
        setLocation_per(granted);
          const locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {
            
           dispatch(setLocation(locations));
          })
        }
      })
   
  };

  const _handleGalleryPermission = async () => {
    let status = null
    if (Platform.OS === 'ios' && status === 'active') {
      const permission = await request(PERMISSIONS.IOS.CAMERA)
      status = permission.status
      setGallery_per(permission.status);
    } else {
      const permission  = await request(PERMISSIONS.ANDROID.CAMERA)
      status = permission.status
      setGallery_per(permission.status);
    }
  };

  const _handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout ?', [
      {
        text: 'Cancel',
        onPress: () => {
          console.log('cancel logout');
        },
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          console.log('do logout');
          // logout();
          //dispatch(setLoading(true));
          //navigation.goBack();
        },
      },
    ]);
  };

  const [user, setUser] = useState(auth.userData);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [location_per, setLocation_per] = useState('');
  const [gallery_per, setGallery_per] = useState('');

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

  const SettingItem = props => {
    return (
      <SectionItem
        style={{
          backgroundColor: colors.white,
          borderRadius: 50,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.25,
          shadowRadius: 1.41,

          elevation: 2,
        }}
        activeOpacity={0.6}
        onPress={() => {
          props.onPress && props.onPress();
        }}>
        <SectionIcon>
          {props.icontype == 'feather' ? (
            <Feather name={props.icon} size={18} color="green" />
          ) : (
            <Entypo name={props.icon} size={16} color="green" />
          )}
        </SectionIcon>
        <SectionDetails>
          <SectionItemLabel>{props.label}</SectionItemLabel>
          {/* {props.toggle ? (
            <Switch
              value={notificationsEnabled}
              onValueChange={(v) => {
                setNotificationsEnabled(v);
              }}
              style={{ marginLeft: "auto" }}
              color="#1AAF76"
            />
          ) : (
            <Feather name="chevron-right" size={20} color={Colors.mutedText} />
          )} */}
        </SectionDetails>
      </SectionItem>
    );
  };

  return (
    <Container style={{backgroundColor: colors.backgroundHome}}>
      <Header
        leftComponent={<HeaderLeft />}
        statusBarProps={{barStyle: 'light-content'}}
        centerComponent={
          <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
            Settings
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
      <ContentWrap
        style={{backgroundColor: colors.backgroundHome}}
        contentContainerStyle={{paddingBottom: 30, paddingTop: 0}}
        showsVerticalScrollIndicator={false}>
        {/* User Card Section */}
        {/* <Section style={{ marginBottom: 20, marginTop: 0 }}>
          <UserCard
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate("EditProfile", { type: "SettingsLobby" });
            }}
          >
            <UserImage>
              <Image
                style={{ ...StyleSheet.absoluteFillObject, borderRadius: 50 }}
                source={{
                  uri: auth.avatar,
                }}
              />
            </UserImage>
            <SectionDetails style={{ paddingBottom: 15 }}>
              <UserDetails>
                <Fullname>
                  {user.first_name} {user.last_name}
                </Fullname>
                <Contact>{user.email}</Contact>
              </UserDetails>
              <Feather
                name="chevron-right"
                size={20}
                color={Colors.mutedText}
              />
            </SectionDetails>
          </UserCard>
        </Section> */}

        <Section>
          <SectionTitle>General</SectionTitle>
          <SectionBody>
            <SettingItem
              label="Profile Verification"
              icon="user"
              icontype="feather"
              onPress={() => {
                navigation.navigate('GovernmentVerification', {});
              }}
            />

            {/* <SettingItem label="Notifications" icon="notification" toggle /> */}

            <SettingItem
              label="Password & Security"
              icon="key"
              onPress={() => {
                navigation.navigate('ChangePassword');
              }}
            />
            <SettingItem
              label="Support"
              icon="lifebuoy"
              onPress={() => {
                Linking.openURL(
                  'mailto: support@keyedin.app?subject=KeyedIn Support Ticket',
                );
              }}
            />
            <SettingItem
              label="Logout"
              icon="power"
              icontype="feather"
              onPress={() => {
                _handleLogout(auth.token);
                //logout(auth.token);
              }}
              last
            />
          </SectionBody>
          <ListItemSeparator />
        </Section>
        <Section>
          <SectionTitle>Feedback</SectionTitle>
          <SectionBody>
            <SettingItem
              label="App feedback"
              icon="megaphone"
              onPress={() => alert('To go to app store')}
            />
            <SettingItem
              label="Bug report"
              icon="bug"
              last
              onPress={() => {
                Linking.openURL(
                  'mailto: support@keyedin.app?subject=KeyedIn Bug Report',
                );
              }}
            />
          </SectionBody>
          <ListItemSeparator />
        </Section>

        <Section>
          <SectionTitle>Legal</SectionTitle>
          <SectionBody>
            <SettingItem
              label="Privacy"
              icon="shield"
              onPress={() => {
                dispatch(privacyModalActive(true));
              }}
            />
            <SettingItem
              label="Terms of use"
              icon="text-document"
              last
              onPress={() => {
                dispatch(termsModalActive(true));
              }}
            />
          </SectionBody>
        </Section>
        {location_per != 'granted' && gallery_per != 'granted' && (
          <Section>
            <SectionTitle>Permissions</SectionTitle>
            <SectionBody>
              {location_per != 'granted' && (
                <SettingItem
                  label="Location"
                  icon="location-pin"
                  onPress={() => {
                    _handleLocationPermission();
                  }}
                />
              )}
              {gallery_per != 'granted' && (
                <SettingItem
                  label="Gallery"
                  icon="picasa"
                  onPress={() => {
                    _handleGalleryPermission();
                  }}
                />
              )}
            </SectionBody>
          </Section>
        )}
      </ContentWrap>

      {auth.loading && <Loader />}

      {/* <Text>{JSON.stringify(ui)}</Text> */}
      {/* <PrivacyModal visible={true} /> */}
      <PrivacyModal visible={ui.privacyModalActive} />
      <TermsModal visible={ui.termsModalActive} />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

const ContentWrap = styled.ScrollView`
  flex: 1;
  padding: 30px;
  padding-top: 20px;
  background-color: white;
`;

const Section = styled.View`
  margin-bottom: 10px;
`;

const SectionTitle = styled.Text`
  color: ${Colors.mutedText};
  ${'' /* text-transform: uppercase; */}
  font-size: 14px;
  font-weight: 500;
`;

const SectionBody = styled.View`
  padding-vertical: 10px;
`;

const SectionItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

const SectionIcon = styled.View`
  height: 32px;
  width: 32px;
  ${'' /* border-radius: 18px; */}
  border-radius: 8px;
  ${'' /* background-color: ${colors.green}; */}
  margin-right: 15px;
  padding-left: 10px;
  align-items: center;
  justify-content: center;
`;

const SectionDetails = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  ${
    '' /* border-bottom-width: 1px;
  border-bottom-color: ${Colors.mutedText}40; */
  }
  height: 100%;
  padding-vertical: 10px;
`;

const SectionItemLabel = styled.Text`
  font-weight: 500;
  font-size: 15px;
  flex: 1;
`;

const UserCard = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  ${
    '' /* border-width: 1px;
    border-color: ${Colors.mutedText}40;
    border-radius: 8px; */
  }
  padding-vertical: 10px;
`;

const UserImage = styled.View`
  height: 60px;
  width: 60px;
  border-radius: 50px;
  background-color: #d1d1d1;
  margin-right: 20px;
`;

const UserDetails = styled.View`
  flex: 1;
`;

const Fullname = styled.Text`
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 5px;
`;

const Contact = styled.Text`
  font-weight: 500;
  color: ${Colors.mutedText};
`;

export default SettingsLobby;
