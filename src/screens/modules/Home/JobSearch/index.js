import React, {Component, useState, useEffect, useRef, useCallback} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  TouchableHighlight,
  StatusBar,
  Keyboard,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import styled from 'styled-components/native';
import ReadMore from 'react-native-read-more-text';
import {colors, hp, wp} from 'src/config/variables';
import {useNavigation} from '@react-navigation/native';
import {BASEURL} from 'src/constants/Services';
import {connect} from 'react-redux';
import Colors from 'src/constants/Colors';
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ContentLoader from 'react-native-easy-content-loader';
import TimeAgo from 'react-native-timeago';
import RBSheet from 'react-native-raw-bottom-sheet';
import SelectField from 'src/component/SelectField';
import { useSelector, useDispatch } from 'react-redux';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {
  GET_ALL_JOBS,
  SET_DISTANCE,
  SET_LOADING,
  SET_LOCATION,
} from 'src/redux/action-types';
import Empty from 'src/component/Empty';
import Button from 'src/component/Button/index';
import axios from 'axios';
import { debounce } from "debounce";
import styles from './styles';
import JobItem from 'src/component/JobItem';
import LocationInput from 'src/component/LocationInput';
import TextField from 'src/component/TextField';


const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => {
  return {
    setLoading: status =>
      dispatch({
        type: SET_LOADING,
        status: status,
      }),
    getAllJobs: status =>
      dispatch({
        type: GET_ALL_JOBS,
        status: status,
      }),
    setLocation: data =>
      dispatch({
        type: SET_LOCATION,
        data,
      }),
    setReachDistance: value =>
      dispatch({
        type: SET_DISTANCE,
        value: value,
      }),
  };
};

function JobSearch(props) {
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const [searchItem, setsearchItem] = useState('');
  const [filters, setFilter] = useState({});
  const [searchFocused, setSearchFocused] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const {auth, expert} = useSelector(state => state);
  const [Data, setData] = useState([
    {
      user: {
        avatar:
          'https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1222&q=80',
      },
      title: 'SoftWare Developer needed',
      description:
        'React Native SVG transformer allows you to import SVG files in your React Native project the same way that you would in a Web application when',
      skills: [ 'Java', 'Robotic'],
      location: { longitude: '0.0', latitude: '0.0' },
       address_str: 'No. 19 Nile Crescent, Sun City, Galadimawa, Abuja',
      state: "Lagos",
      created_at: '',
    },
    {
      user: {
        avatar:
          'https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1222&q=80',
      },
      title: 'Back-End Developer Urgently Needed',
      description:
        'React Native SVG transformer allows you to import SVG files in your React Native project the same way that you would in a Web application when',
      skills: [ 'Java', 'Robotic'],
      location: { longitude: '0.0', latitude: '0.0' },
       address_str: 'No. 19 Nile Crescent, Sun City, Galadimawa, Abuja',
      state: "Lagos",
      created_at: '',
    },
    {
      user: {
        avatar:
          'https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1222&q=80',
      },
      title: 'Back-End Developer Urgently Needed',
      description:
        'React Native SVG transformer allows you to import SVG files in your React Native project the same way that you would in a Web application when',
        skills: [ 'Java', 'Robotic'],
      location: { longitude: '0.0', latitude: '0.0' },
       address_str: 'No. 19 Nile Crescent, Sun City, Galadimawa, Abuja',
      state: "Lagos",
      created_at: '',
    },
    {
      user: {
        avatar:
          'https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1222&q=80',
      },
      title: 'Back-End Developer Urgently Needed',
      description:
        'React Native SVG transformer allows you to import SVG files in your React Native project the same way that you would in a Web application when',
        skills: [ 'Java', 'Robotic'],
        location: { longitude: '0.0', latitude: '0.0' },
         address_str: 'No. 19 Nile Crescent, Sun City, Galadimawa, Abuja',
      state: "Lagos",
      created_at: '',
    },
    {
      user: {
        avatar:
          'https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1222&q=80',
      },
      title: 'Back-End Developer Urgently Needed',
      description:
        'React Native SVG transformer allows you to import SVG files in your React Native project the same way that you would in a Web application when',
        skills: [ 'Java', 'Robotic'],
        location: { longitude: '0.0', latitude: '0.0' },
         address_str: 'No. 19 Nile Crescent, Sun City, Galadimawa, Abuja',
      state: "Lagos",
      created_at: '',
    },
    {
      user: {
        avatar:
          'https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1222&q=80',
      },
      title: 'Back-End Developer Urgently Needed',
      description:
        'React Native SVG transformer allows you to import SVG files in your React Native project the same way that you would in a Web application when',
        skills: [ 'Java', 'Robotic'],
        location: { longitude: '0.0', latitude: '0.0' },
         address_str: 'No. 19 Nile Crescent, Sun City, Galadimawa, Abuja',
      state: "Lagos",
      created_at: '',
    },
    {
      user: {
        avatar:
          'https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1222&q=80',
      },
      title: 'Back-End Developer Urgently Needed',
      description:
        'React Native SVG transformer allows you to import SVG files in your React Native project the same way that you would in a Web application when',
        skills: [ 'Java', 'Robotic'],
        location: { longitude: '0.0', latitude: '0.0' },
        address_str: 'No. 19 Nile Crescent, Sun City, Galadimawa, Abuja',
        state: "Lagos",
      created_at: '',
    },
    {
      user: {
        avatar:
          'https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1222&q=80',
      },
      title: 'Back-End Developer Urgently Needed',
      description:
        'React Native SVG transformer allows you to import SVG files in your React Native project the same way that you would in a Web application when',
      skills: [ 'Java', 'Robotic'],
      location: { longitude: '0.0', latitude: '0.0' },
      address_str: 'No. 19 Nile Crescent, Sun City, Galadimawa, Abuja',
      state: "Lagos",
      created_at: '',
    },
  ]);
  const [sData, setsData] = useState([]);
  const [filterResult, setFilterResult] = useState(null);
  const [show, setShow] = useState(false);
  const [defaultImage, setDefaultImage] = useState(
    'https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1222&q=80',
  );
  const [errormessage, setErrormessage] = useState('');
  const [isFetching, setisFetching] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [distance, setDistance] = useState(1);
  const [editing, setEditing] = useState(false);
  const autocomplete = {
    container: {
      flex: 1,
      position: "absolute",

      left: wp('7%'),
      top: wp('3%'),
      
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
      backgroundColor: '#f2f3f4',
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

  const onChangeText = (key, data) => {
    setFilter({...filters, [key]: data});
  };

  const handleLocationAddress = (data, details) => {
    
    const { description } = data;
    const {
      geometry: {
        location: { lat, lng },
      },
    } = details;
    setFilter({...filters, address_str: description, longitude: lng, latitude: lat });
    
  };
   useEffect(() => {
   GetJobs() 
    
  }, []);
  
  const RefreshAllJobs = () => {
    setisFetching(true);
    GetJobs();
  };

  const closeSearch = () => {
    Keyboard.dismiss();
    setEditing(false);
    setsearchItem('');
  };

 
  const _renderReviewItem = (props) => {
  const  { item, index} = props
    return (
      <JobItem item={item} index={index} onPress={() => {
        navigation.navigate('Proposal', {data: item, type: 'Home'});
      }} />
    );
  };

  const GetJobs = () => {
    let uri = BASEURL + `/projects/find/${auth.userData.location.lng}/${auth.userData.location.lat}`;
    
    let data = {
      longitude: auth.userData.location.lng,
      latitude: auth.userData.location.lat
      
      //distance: "1",
    };
    props.setLoading(true);
    axios.get(uri, 
      {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer' + ' ' + props.auth.token,
      },
      }).then(res => {
        const {data} = res.data
        console.log("__Download___", res)
        props.setLoading(false);
        setData(data);
       

      })
      .catch(error => {
        setisFetching(false);
        props.setLoading(false);
        console.log('Job Get Failed because', error.response);
        //props.setLoading(false);
       
      });
  };

  const filterJobs = () => {
    const {latitude="", longitude = "", priority="", skill="", profession} = filters
    let uri = BASEURL + `/projects/filter/longitude=${longitude}&latitude=${latitude}&priority=${priority}&skill_set=${skill}&profession=${profession}`;
    const data = {
      longitude: auth.userData.location.lng,
      latitude: auth.userData.location.lat
}
    props.setLoading(true);
    axios.get(uri,{
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: 'Bearer' + ' ' + props.auth.token,
      },
    }).then(res => {
      const {data} = res.data
        console.log("__Download___", res)
        props.setLoading(false);
        setData(data);
       
      })
      .catch(error => {
        console.log('Job Get Failed because', error.response);
        props.setLoading(false);
        setisFetching(false);
       
      });
  };

  const JobsSearch = () => {

    let uri = BASEURL + `/projects/find`;

    //props.setLoading(true);
    let data = {
      longitude: auth.userData.location.lng,
      latitude: auth.userData.location.lat,
      search: searchItem
    };
    axios.get(uri, 
     JSON.stringify(data),
      {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer' + ' ' + props.auth.token,
      },
    })
     
      .then(res => {
        const {data} = res.data
        console.log("__Download___", res)
        props.setLoading(false);
        setData(data);
      })
      
      .catch(error => {
        
        console.log('Job Get Failed because', error.response);
        props.setLoading(false);
        
      });
  };

  const handler = useCallback(debounce(()=>JobsSearch(), 2000), []);
  useEffect(() => {
    handler()
},[searchItem])

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={Colors.primary}
        //barStyle={'dark-content'}
      />
      <SafeAreaView
        style={{
          backgroundColor: colors.green,
          zIndex: 900000000,
          borderBottomRightRadius: wp('8%'),
          borderBottomLeftRadius: wp('8%'),
        }}>
        <View
          style={{
            backgroundColor: colors.green,
            borderBottomLeftRadius: wp('8%'),
            paddingVertical: hp('4%'),

            borderBottomRightRadius: wp('8%'),
          }}>
          <View style={[styles.textcontainer]}>
            <Text style={styles.text}>Job Feed</Text>
          </View>

          {/* <JobSearchHeader /> */}

          {/* search bar */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              //alignItems: "center",
              // marginTop: hp("2%"),
              //backgroundColor: colors.green,

              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
            }}>
            <View
              style={{
                flexDirection: 'row',

                width: '85%',

                alignItems: 'center',
                paddingHorizontal: 8,

                borderColor: Colors.primary,
                shadowOpacity: 1,
                shadowOffset: {width: 1, height: 1},
                shadowColor: colors.medium,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                {/* drawer icon */}
                {!editing ? (
                  <TouchableOpacity
                    style={{
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      marginRight: wp('5%'),
                      //justifyContent: "center",
                      // backgroundColor: "red",
                      padding: 6,
                      //paddingBottom: 5,
                    }}
                    onPress={() => {
                      //navigation.openDrawer();
                      Keyboard.dismiss();
                      navigation.navigate('Profile');
                    }}>
                    {/* <EntypoIcon name="menu" size={27} style={{}} /> */}
                    <Image
                      source={{
                        uri: props.auth.avatar,
                        // avatar,
                        // "https://static.dribbble.com/users/1304678/screenshots/7301908/media/3f91189797dd514eb6446b21a4faa209.png",
                      }}
                      style={{
                        ...StyleSheet.absoluteFillObject,
                        borderColor: colors.white,
                        borderWidth: 2,
                        position: 'relative',
                        borderRadius: 50,
                        width: 42,
                        height: 42,
                      }}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      //justifyContent: "center",
                      // backgroundColor: "red",
                      padding: 6,

                      //paddingBottom: 5,
                    }}
                    onPress={() => {
                      closeSearch();
                    }}>
                    <Ionicons
                      name={'md-close'}
                      size={27}
                      color={colors.medium}
                    />
                  </TouchableOpacity>
                )}
                {/* drawer icon */}
                <View
                  style={{
                    //marginLeft: 10,
                    flex: 1,
                    flexDirection: 'row',
                    backgroundColor: '#25955e',
                    borderRadius: 50,

                    //flex: 1,
                    alignItems: 'center',
                  }}>
                  {/* text input */}

                  <TouchableOpacity
                    style={{paddingLeft: 20}}
                    onPress={() => {
                     
                    }}>
                    <Entypo
                      name="magnifying-glass"
                      color={colors.white}
                      size={25}
                    />
                  </TouchableOpacity>

                  <TextInput
                   
                    placeholderTextColor={colors.medium}
                    multiline={false}
                    numberOfLines={1}
                    style={{
                      fontSize: 15,
                      backgroundColor: '#25955e',
                      color: colors.white,
                      flex: 1,
                      height: 42,
                      borderRadius: 50,
                    }}
                    value={searchItem}
                    onChangeText={input => {
                      setsearchItem(input);
                      // JobsLogic(input);
                      // _filter(input);
                    }}
                  />
                 
                </View>
              </View>
              
            </View>

            <TouchableOpacity
              style={{
                //backgroundColor: "#E2E2E2",
                //backgroundColor: colors.light,
                height: 60,
                width: 60,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                marginRight: wp('4%'),
              }}
              onPress={() => {
                //navigation.navigate("SearchOptions");
                refRBSheet.current.open();
              }}>
              
              <MaterialIcons name="tune" size={32} color={colors.white} />
              {/* </Tooltip> */}
            </TouchableOpacity>
          </View>

         
        </View>
      </SafeAreaView>
      <View
        style={{
          paddingHorizontal: wp('3.5%'),
          flex: 1,
          
        }}>
        
        <View style={{marginTop: 0, paddingHorizontal: wp('2%')}}>
          <ContentLoader
            avatar
            aShape={'square'}
            avatarStyles={{borderRadius: 15}}
            animationDuration={400}
            listSize={7}
            pRows={1}
            pHeight={[28, 20]}
            pWidth={['90%', '100%']}
            tWidth={'70%'}
            tHeight={35}
            loading={props.auth.loading}
            active
            containerStyles={{
              marginTop: 20,
              shadowOffset: 5,
              shadowColor: colors.disabled,
            }}
          />
        </View>

        <View style={styles.rect5}>
          {errormessage && !errormessage.error == 'Unauthenticated' ? (
            <Text>Please Login</Text>
          ) : (
            <View style={{flex: 1, zIndex: 10}}>
              <FlatList
                data={Data}
                showsVerticalScrollIndicator={false}
                style={{
                  marginBottom: 10,
                  flex: 1,
                  shadowColor: colors.disabled,
                }}
                renderItem={({item, index}) => _renderReviewItem({item, index})}
                keyExtractor={(item, index) => index.toString()}
                onRefresh={() => {
                  GetJobs() 
                  setsearchItem('');
                }}
                refreshing={isFetching}
                ListEmptyComponent={
                  <Empty
                    title={'No Job Found'}
                    subTitle={`No Job Found in a ${props.auth.distance} Mile Radius of your Location`}
                  />
                }
              />
            </View>
          )}
         
        </View>

        {show && (
          <View>
            <Text>No Result</Text>
          </View>
        )}
      </View>
      

      <RBSheet
        ref={refRBSheet}
        height={hp('70%')}
        animationType="slide"
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            marginTop: 0,
          },
          wrapper: {
            backgroundColor: 'transparent',
            borderTopLeftRadius: 10,
          },
          draggableIcon: {
            backgroundColor: 'lightgrey',
            width: '30%',
            height: '11%',
          },
        }}>
        <ScrollView style={styles.filterContainer}>
          <View style={styles.filterHeader}>
            <GreenText>Filter</GreenText>

            <Button
              text="Apply"
              type="primary"
              additionalStyle={{
                button: {
                  width: wp('30%'),
                  borderRadius: 50,
                  paddingVertical: hp('1.5%'),
                  marginLeft: 'auto',
                },
                text: {fontSize: wp('3%')},
              }}
              onPress={() => {
                filterJobs()
              }}
            />
          </View>

          <LocationInput icon={
            <MaterialIcons
            name="location-pin"
            size={20}
            color={colors.medium}
            style={{marginRight: 5}}
            />}
            label={"Location"}
            handleLocationAddress={handleLocationAddress}
            placeholder={"Enter Location"}
          />

          <TextField
            placeholder={"Profession"}
            label="Profession"
            onChangeText={itemValue => onChangeText('profession', itemValue)}
          />

          <TextField
            
            label="Skill"
            placeholder={"e.g Plumber, Architect, Vet Doctor "}
            onChangeText={itemValue => onChangeText('skill', itemValue)}
          />

          {/* <SelectField
            value={''}
            label="Location"
            items={[
              {label: 'Junior WAEC', value: 'Junior WAEC'},
              {label: 'WAEC', value: 'WAEC'},
              {label: 'B.Sc', value: 'Bachelor of Science'},
              {label: 'Masters', value: 'Masters'},
              {label: 'PhD', value: 'Doctor of Philosophy'},
            ]}
            onChangeText={itemValue => onChangeText('degree', itemValue)}
          />

          <SelectField
            value={''}
            label="Distance"
            items={[
              {label: 'Junior WAEC', value: 'Junior WAEC'},
              {label: 'WAEC', value: 'WAEC'},
              {label: 'B.Sc', value: 'Bachelor of Science'},
              {label: 'Masters', value: 'Masters'},
              {label: 'PhD', value: 'Doctor of Philosophy'},
            ]}
            onChangeText={itemValue => onChangeText('degree', itemValue)}
          /> */}

          <SelectField
            value={''}
            label="Urgency"
            items={[
              {label: 'Junior WAEC', value: 'Junior WAEC'},
              {label: 'WAEC', value: 'WAEC'},
              {label: 'B.Sc', value: 'Bachelor of Science'},
              {label: 'Masters', value: 'Masters'},
              {label: 'PhD', value: 'Doctor of Philosophy'},
            ]}
            onChangeText={itemValue => onChangeText('priority', itemValue)}
          />
         
        </ScrollView>
      </RBSheet>
    </View>
  );
}


const GreenText = styled.Text`
  font-weight: 700;
  font-size: ${wp('5%')};
  color: ${colors.green};
`;



export default connect(mapStateToProps, mapDispatchToProps)(JobSearch);
