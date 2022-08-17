import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  TouchableHighlight,
  Alert,
  StatusBar,
  Platform,
  SafeAreaView,
  ScrollView,
  ImageBackground

} from 'react-native';
import styled from 'styled-components';

import ReactNativeParallaxHeader from 'react-native-parallax-header';
import WhiteKey from 'src/assets/icons/white_key.svg';
import Layout from 'src/constants/Layout';
import Colors from 'src/constants/Colors';
import ReadMore from 'react-native-read-more-text';
import * as Animatable from 'react-native-animatable';

import VerifiedIcon from 'src/assets/icons/verified_icon.svg';
import LogoutIcon from 'src/assets/icons/logout.svg';
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import StarRating from 'react-native-star-rating';
import {Divider, FAB} from 'react-native-elements';
import colors from 'src/config/colors';
import { useSelector, useDispatch } from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {check, request, PERMISSIONS} from 'react-native-permissions';
// import {REVIEWS} from './reviews';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import Video from 'react-native-video';
import {BASEURL} from 'src/constants/Services';
//import base64 from "base-64";
import Loader from 'src/component/Loader';
import {Tabs, TabContent} from 'src/component/Tabs';
import ListItemSeparator from 'src/component/ListItemSeparator';
import Empty from 'src/component/Empty';
//import { setStatusBarHidden } from "expo-status-bar";
import ChatProfilePen from 'src/assets/icons/messagebtn.svg';
import {hp, wp} from 'src/config/variables';
import axios from 'axios';
import {
  setLoading,
  sendExpert,
  saveAvatar,
  GetExpertiseFromApi,
  getUser,
  getArtisanExpertise,
  getArtisanEducation,
  GetArtisanExperience,
  GetPortfolio,
} from 'src/redux/actions/AuthActions';
import ReviewItem from 'src/component/ReviewItem';
import ReviewForm from 'src/component/ReviewForm';

const SCREEN_HEIGHT = Layout.window.height;

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT =
  Platform.OS === 'ios'
    ? IS_IPHONE_X
      ? 44
      : 20
    : 20 + 5;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

const images = {
  background:
    'https://images.unsplash.com/photo-1591840870617-cbabab139a8a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80', // Put your own image here
};


function ProtisanProfile(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const refRBSheet = useRef();
  // const [reviews, setReviews] = useState(REVIEWS);
  const [reviewart, setReviewart] = useState('');
  const [activeGallery, setActiveGallery] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const [artisan, setArtisan] = useState({});
  const [artisanImg, setArtisanImg] = useState(images.background);
  const [preimage, setPreimage] = useState({});
  const [expertises, setExpertises] = useState({});
  const [videoUrl, setvideoUrl] = useState(artisan.video||'https://vjs.zencdn.net/v/oceans.mp4');
  const [rating, setRating] = useState({});
  const [jobsuccess, setJobSuccess] = useState({});
  const [play, setPlay] = useState(true)
  const [reviewsd, setReviewsd] = useState([]);
  const [view, setView] = useState({});
  const [portfolio, setPortfolio] = useState([]);
  const { auth  } = useSelector(state => state);
  const { params = {} } = props.route || {}
  const defaultImg =
    'https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1222&q=80';
  
  useEffect(() => {
    const {id} = params
    console.log("__ID", id)
    // StatusBar.setHidden(true);
    dispatch(getUser(id, ({user = {}, expertise = {}, employment = {},education = {},comments = {}, rating="",job_success_rate={}}) => {
    
      setArtisan(user);
      setExpertises(expertise)
      setReviewsd(comments);
      setRating(rating);
      setJobSuccess(job_success_rate)
    }));
    GetPortfolio(id,(res,err)=>{
      if (err !== null) {
        
      }else{
        setPortfolio(res)
      }
    })
    // setLoading(false);
  }, [params]);

  const _handleDeletePortfolio = _id => {
    Alert.alert(
      'Delete Portfolio',
      'Are you sure you want to Delete this Portfolio ?',
      [
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
            DeletePortfolio(_id);
            setModalVisible(!modalVisible);
            //setLoading(true);
            //navigation.goBack();
          },
        },
      ],
    );
  };

  const UploadVideoApi = item => {
    let uri = BASEURL + `/media/user/${auth.userData.id}`;
    setVideoVisible(false);

    //const { status } = await Permissions.askAsync(Permissio);

    let data = {
      video: item,
    };
    setLoading(true);
    axios.post(uri, JSON.stringify(data),{
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer' + ' ' + auth.userData.token,
      },
    })
      .then(res => {
        console.log('Look here', res.data); 
         dispatch(setLoading(false));
          setVideoVisible(false);
         
      })
      .catch(error => {
        setLoading(false);
        console.log('first', error);
       
      });

   
  };

  const DeletePortfolio = id => {
    let uri = BASEURL + `/artisan/portfolio/${id}`;
    //setLoading(true);
    axios.delete(uri, {
     
      //body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: 'Bearer' + ' ' + auth.token,
      },
    })
      
      .then(res => {
        console.log({res});
       
      })
      .then(rest => {
        setArtisanImg(auth.avatar);
       
      })
      .catch(error => {
        //setLoading(false);
      
      });
  };

  const renderNavBar = () => (
    
    
    <View style={styles.navBar}>
      <TouchableOpacity
        style={styles.iconLeft}
        onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={25} color={colors.white} />
      </TouchableOpacity>
     
    </View>
  
);

const _handleTextReady = () => {
  return (
    <BioText>
      Hi, I’m Ciroma Adebayor a professional freelance photographer that lives
      in Abuja. I shoot portraits and stills usually out of my studio at Wuse,
      but on certain occasions, also I work as a part time photographer with
      the Mavin & Gerald Shipping Company.
    </BioText>
  );
};

const _renderTruncatedFooter = handlePress => {
  return (
    <Text
      style={{color: '#000', marginTop: 5, fontWeight: '600', fontSize: 13}}
      onPress={handlePress}>
      Read more
    </Text>
  );
};

const _renderRevealedFooter = handlePress => {
  return (
    <Text
      style={{color: '#000', marginTop: 5, fontWeight: '500', fontSize: 14}}
      onPress={handlePress}>
      Show less
    </Text>
  );
};

const GalleryModal = item => {
  // var images = portfolio.map((image) => ({
  //   source: { uri: image.portfolios },
  // }));
  return (
    <View style={{}}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
        style={{backgroundColor: 'black'}}>
        <View style={{flex: 1, backgroundColor: 'black'}}>
          <View
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              style={{
                marginTop: 30,
                //justifyContent: "flex-start",
                paddingLeft: 10,
              }}>
              <TouchableHighlight
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Feather name="x" size={32} color="white" />
              </TouchableHighlight>
            </View>
            <View
              style={{
                marginTop: 30,
                //justifyContent: "flex-end",
                paddingRight: 10,
              }}>
              <TouchableHighlight
                onPress={() => {
                 
                  dispatch({type: 'TOGGLE_PORTFOLIO', id:preimage.id})
                  _handleDeletePortfolio(preimage.id);
                }}>
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={32}
                  color="white"
                />
              </TouchableHighlight>
            </View>
          </View>
          <View
            style={{
              //flex: 1,
              width: '100%',
              height: '80%',
              //backgroundColor: "red",
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={{
                uri: preimage.portfolio_url,
              }}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
            {console.log(Object.keys(item))}
          </View>
          {/* <Gallery images={images} initialPage={activeGallery}  /> */}
        </View>
      </Modal>
    </View>
  );
};

const GalleryVideoModal = item => {
  try {
    return (
      <View style={{}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={videoVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
          style={{backgroundColor: 'black'}}>
          <View style={{flex: 1, backgroundColor: 'black'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  marginTop: 30,
                  //justifyContent: "flex-start",
                  paddingLeft: 10,
                }}>
                <TouchableHighlight
                  onPress={() => {
                    setVideoVisible(false);
                  }}>
                  <Feather
                    name="x"
                    size={32}
                    color="white"
                    onPress={() => {
                      setVideoVisible(false);
                    }}
                  />
                </TouchableHighlight>
              </View>
              <View
                style={{
                  marginTop: 30,
                  //justifyContent: "flex-end",
                  paddingRight: 10,
                }}>
                {/* <TouchableHighlight
                  onPress={() => {
                    removePortfolios(preimage.id);
                    //setVideoVisible(!videoVisible);
                    _pickProfileVideo();
                  }}
                >
                  <MaterialCommunityIcons
                    name="folder-swap-outline"
                    size={32}
                    color="white"
                  />
                </TouchableHighlight> */}
              </View>
            </View>
            <View
              style={{
                //flex: 1,
                width: '100%',
                height: '80%',
                //backgroundColor: "red",
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {console.log('video', videoUrl)}
              {videoUrl !== '' ? (
                <Video
                  source={{
                    uri: videoUrl,
                  }}
                  style={{width: '80%', height: 300}}
                  shouldPlay
                  resizeMode={'contain'}
                  rate={1.0}
                />
              ) : (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 10,
                  }}>
                  <Image
                    source={require('src/config/images/Layer-12.png')}
                    resizeMode={'contain'}
                    style={{height: 150, width: '100%'}}
                  />
                  <Text style={{color: colors.medium, marginTop: 20}}>
                    You have not uploaded a Profile video
                  </Text>
                </View>
              )}
              {/* {console.log(Object.keys(item))} */}
            </View>

            {/* <Gallery images={images} initialPage={activeGallery}  /> */}
          </View>
        </Modal>
      </View>
    );
  } catch (error) {
    return alert('No video available');
  }
  
};

const Tab1 = () => {
  return (
    <ScrollView style={styles.tabContent} animation="fadeInLeft">
      <View>
        <Text style={{color: colors.medium, fontWeight: '700'}}>Bio</Text>
        {/* <ListItemSeparator style={{ backgroundColor: Colors.secondary }} /> */}
        <ReadMore
          numberOfLines={2}
          renderTruncatedFooter={_renderTruncatedFooter}
          renderRevealedFooter={_renderRevealedFooter}
          onReady={_handleTextReady}>
          {!expertises && !expertises.bio ? _handleTextReady() : <BioText>{expertises.bio}</BioText>}
        </ReadMore>
      </View>
      <Text
        style={{
          color: colors.medium,
          fontSize: 14,
          marginBottom: -15,
          fontWeight: '700',
          marginTop: 10,
        }}>
        Skills
      </Text>
      {/* <ListItemSeparator
        style={{ backgroundColor: Colors.secondary, marginBottom: -10 }}
      /> */}
      <View
        style={{
          marginTop: 10,
          flex: 1,
          flexDirection: 'row',
         
          
        }}>
        {/* skills */}
        {expertises  && expertises.skills &&  expertises.skills.map((item, index) => (
          <SkillsWrap key={index.toString()}>
            <SkillBadge>
              <Text
                style={{
                  fontSize: wp('2.8%'),
                  fontWeight: 'bold',
                  color: colors.green,
                }}>
                {item}
              </Text>
            </SkillBadge>
          </SkillsWrap>
        ))}
       
      </View>

      <View>
        <RatingsContainer style={{backgroundColor: colors.green}}>
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <WhiteKey
                  width={32}
                  height={32}
                  style={{width: 150, height: 150}}
                />
                <View style={{marginTop: 10}}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 28,
                    }}>
                    {!rating 
                      ? 0.0
                      : Number(rating)
                          .toFixed(1)
                          .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                    {/* {parseInt(Number(rating.rating))} */}
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 13,
                      marginTop: 5,
                      maxWidth: '50%',
                      fontWeight: '500',
                      textAlign: 'center',
                    }}>
                    Average Rating
                  </Text>
                </View>
              </View>
              <View style={{flex: 1, alignItems: 'center'}}>
                <AntDesign name="like2" size={28} color="white" />
                <View style={{marginTop: 10}}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 28,
                    }}>
                    {jobsuccess && jobsuccess.job_success_rate != null
                        ? parseInt(Number(jobsuccess.job_success_rate))
                        : 0}
                    {'%'}
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 13,
                      marginTop: 5,
                      maxWidth: '70%',
                      fontWeight: '500',

                      textAlign: 'center',
                    }}>
                    {'Job Success Rate'}
                  </Text>
                </View>
              </View>
            </View>

            <Divider
              style={{
                marginTop: 20,
                marginBottom: 32,
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
                height: 1,
              }}
            />

            <View style={{flexDirection: 'row', paddingRight: 30}}>
              <View style={{flex: 1, paddingRight: 20}}>
                <View
                  style={{flex: 1, paddingRight: 20, alignItems: 'center'}}>
                  <Text
                    style={{
                      textTransform: 'uppercase',
                      color: 'white',

                      fontWeight: '700',
                    }}>
                    Quality
                  </Text>
                  {console.log('rating', rating)}
                  <View style={{marginTop: 15, maxWidth: '85%'}}>
                    <StarRating
                      disabled={true}
                      maxStars={5}
                      rating={
                       !rating || !rating.quality 
                          ? 0
                          : parseInt(Number(rating.quality))
                      }
                      // emptyStar={"star-o"}
                      fullStar={require('src/assets/icons/white_key_fill.png')}
                      halfStar={require('src/assets/icons/gray_key.png')}
                      emptyStar={require('src/assets/icons/gray_key.png')}
                      fullStarColor={'#FFFFFF'}
                      emptyStarColor={'#FFFFFF'}
                      starSize={16}
                    />
                  </View>
                </View>
              </View>
              <View style={{flex: 1, paddingRight: 20, alignItems: 'center'}}>
                <Text
                  style={{
                    textTransform: 'uppercase',
                    color: 'white',

                    fontWeight: '700',
                  }}>
                  Availability
                </Text>
                <View style={{marginTop: 15, maxWidth: '85%'}}>
                  <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={
                    rating &&  rating.availability 
                        ? parseInt(Number(rating.availability))
                        : 0
                    }
                    // emptyStar={"star-o"}
                    fullStar={require('src/assets/icons/gold_key.png')}
                    halfStar={require('src/assets/icons/gray_key.png')}
                    emptyStar={require('src/assets/icons/gray_key.png')}
                    fullStarColor={'#FFFFFF'}
                    emptyStarColor={'#FFFFFF'}
                    starSize={16}
                  />
                </View>
              </View>
            </View>
          </View>
        </RatingsContainer>
      </View>
    </ScrollView>
  );
};


const Tab2 = () => {
  return (
    <Animatable.View style={styles.tabContent} animation="fadeInLeft">
      {/* <Review /> */}
      <TouchableOpacity
                onPress={()=>{
                  refRBSheet.current.open();
                }}
                style={{
                  width: '32%',
                  height: 100,
                  backgroundColor: 'transparent',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  marginHorizontal: 2,
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                  zIndex: 1000
                }}>
                <MaterialCommunityIcons name="comment-account-outline" style={{color: colors.green, fontSize: wp('8%')}} />
              </TouchableOpacity>
      <FlatList
        data={reviewsd||[{
          rating: 5,
          comment: "Hello protisan, I am currently looking for someone to fix my refrigerator today and I would be happy to",
          user:{
            first_name: "Toyeeb",
            last_name: "Atunde",
            avatar: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1222&q=80'
          }
        },
        {
          rating: 3,
          comment: "No employer has reviewed you",
          user:{
            first_name: "Toyeeb",
            last_name: "Atunde",
            avatar: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1222&q=80'
          }
        },{
          rating: 3,
          comment: "No employer has reviewed you",
          user:{
            first_name: "Toyeeb",
            last_name: "Atunde",
            avatar: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1222&q=80'
          }
        }]}
       
        // style={{marginTop: -10}}
        renderItem={({item, index}) =>   <ReviewItem item={item} />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Empty title="No reviews" subTitle="No employer has reviewed you" />
        }
      />
    </Animatable.View>
  );
};

const Tab3 = () => {
  return (
    <Animatable.View style={{paddingTop: 0}} animation="fadeInLeft">
       
        <FlatList
          data={portfolio}
         
          style={{ width: wp('100%'),marginTop: hp('3%')}}
          renderItem={({item}) => <PortfolioView  item={item} />}
          numColumns={3}
          // "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
          // keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <Empty title="No reviews" subTitle="No employer has reviewed you" />
          }
        />

       
      
    </Animatable.View>
  );
};

const PortfolioView = ({item}) => {

    return (
      
      <TouchableOpacity
      key={item.id}
      style={{
        width: wp('32%'),
        height: hp('20%'),
        marginBottom: 5,
        marginHorizontal: 2,
        // backgroundColor: 'green'
      }}
      onPress={() => {
        setModalVisible(true);
        setPreimage(item);
        //GalleryModal(item);
        //setActiveGallery(index);
      }}>
     
      <Image
        source={{uri: item.portfolio_url}}
        resizeMode='contain'
        style={{ borderRadius: 0, width: wp('32%'),
        height: hp('20%'),}}
      />
     
    </TouchableOpacity>
         
    );
 
};

const renderContent = () => {
  return (
    <View style={styles.container}>
      <Wrapper>
        <TitleSection>
          <TitleRow>
            <View
              style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
              <Title>
                
                {artisan.first_name}{' '}
                {artisan.last_name}
              </Title>
              {/* <View style={{marginLeft: 5}}>
                {!auth.userData.verified && (
                  <VerifiedIcon
                    width={20}
                    height={20}
                    style={{width: 150, height: 150}}
                  />
                )}
              </View> */}
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ChatScreen", {
                  nested: true,
                  username: artisan.username || `${artisan.first_name} ${artisan.last_name}`,
                  uid: artisan.id,
                  avatar: artisan.avatar || defaultImg
                });
              }}>
              <View
                style={{
                  backgroundColor: colors.green,
                  borderRadius: 50,
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ChatProfilePen />
              </View>
            </TouchableOpacity>
          </TitleRow>
          <Subtitle style={{color: colors.medium}}>
            
            {expertises && expertises.category || "Photographer"}
           
            <Text style={{fontWeight: '500'}}>{artisan.address}</Text>
          </Subtitle>
        </TitleSection>

        <Tabs
          initiaTab={0}
          setView={setView}
          headers={[
            {text: 'About', tab: 'About'},
            {text: 'Reviews', tab: 'Reviews'},
            {text: 'Portfolio', tab: 'Portfolio'},
          ]}>
          <TabContent tab="About" view={view}>
            <Tab1 />
          </TabContent>
          <TabContent tab="Reviews" view={view}>
            <Tab2 />
          </TabContent>
          <TabContent tab="Portfolio" view={view}>
           
              <Tab3 />
             
          </TabContent>
        </Tabs>
      </Wrapper>
    </View>
  );
};

  return (
    <View style={styles.container}>
      {/* <StatusBar hidden={false} /> */}
      <View style={{height: hp('30%')}}>
           {renderNavBar()}
            {artisan.video  ? (
              
                  <Video
                  source={{uri: artisan.video}}
                  ref={(ref)=>{
                 
                console.log("__PLAYER__REF__", ref)
                  }} 
                  
                  style={{flex: 1, color: colors.green }}
                 controls
                  resizeMode={'cover'}
                  paused={play}
                  />
                 
                ) : (
                  <ImageBackground source={{
                    uri: artisan.avatar || defaultImg
                  }} style={{height: hp('30%')}}>

                  </ImageBackground>
                )}
       </View>
      <View style={{flex:1}}>
      {renderContent()}
      </View>
      {auth.loading && <Loader />}
      <GalleryModal />
      <GalleryVideoModal />

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
            },
            wrapper: {
              // backgroundColor: 'transparent',
              borderTopLeftRadius: 10,
            },
            draggableIcon: {
              backgroundColor: 'lightgrey',
              width: '30%',
              height: '11%',
            },
          }}>
          <ReviewForm close={()=>refRBSheet.current.close()} protisan_id={params.id}  />
        </RBSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: Constants.statusBarHeight,
  },
  contentContainer: {
    flexGrow: 1,
  },
  navContainer: {
    height: HEADER_HEIGHT,
    backgroundColor: 'transparent',
    // marginHorizontal: 10,
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
    //backgroundColor: Platform.OS == "ios" ? "transparent" : Colors.primary,
    // backgroundColor: "#00000030",
  },
  navBar: {
    position: 'absolute',
    top: hp('4%'),
    zIndex: 10000,
   width: wp('100%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
  },
  titleStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  activeTabText: {
    fontWeight: 'bold',
    fontSize: 14,
    // borderWidth: 1
    color: colors.white,
  },
  tabText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  tabStyle: {
    backgroundColor: '#25955e',
  },
  tabUnderline: {
    height: 5.5,
    backgroundColor: colors.white,
    marginBottom: 10,
    //left:"50%",
    width: 20,
    marginHorizontal: 55,
    borderRadius: 50,
    //   maxWidth: "50%"
  },
  activeTab: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    display: 'flex',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: colors.green,
  },
  tabContent: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  videoButton: {
    // padding: 10,
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Wrapper = styled.View`
  flex: 1;
`;

const TitleSection = styled.View`
  background-color: #f7f8fa;
  padding-horizontal: 30px;
  padding-vertical: 10px;
`;

const TitleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0px;
`;

const Title = styled.Text`
  font-size: 22px;
  font-weight: 700;
  color: rgba(40, 28, 78, 0.8);
`;

const Subtitle = styled.Text`
  font-size: 13px;
  font-weight: 300;
  color: #b5b2b2;
`;

// const TabContent = styled.View`
//   ${'' /* border-width: 1px; */}
// `;

const BioText = styled.Text`
  font-size: ${wp('3%')};
  letter-spacing: 0px;
  color: rgba(19, 24, 68, 0.55);
  line-height: ${hp('2%')};
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 20px;
`;

const GalleryWrapper = styled.View`
  margin-top: 15px;
  padding-bottom: 50px;
`;

const SkillsWrap = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
  ${'' /* margin-vertical: -6; */}
`;

const SkillBadge = styled.View`
  margin-vertical: 2px;
  background-color: rgba(142, 135, 241, 0.1);
  padding: 5px;
  border-radius: 8px;
  margin-right: 10px;
`;

const RatingsContainer = styled.View`
  width: 100%;
  left: 0px;
  ${'' /* flex: 1; */}
  ${'' /* height: ${Layout.window.height * 0.9 }px; */}
  padding-vertical: 40px;
  padding-start: 30px;
  background-color: #083e9e;
  display: flex;
  margin-top: 30px;
  border-radius: 10px;
`;

const RatingWrap = styled.View`
  flex-direction: row;
  margin-vertical: 20px;
`;

const RatingImage = styled.View`
  height: 50px;
  width: 50px;
  background-color: #e2e0de;
  border-radius: 10px;
  margin-end: 20px;
`;

const RatingBody = styled.View`
  flex: 1;
`;

const RatingTitle = styled.Text`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 5px;
`;

const RatingComment = styled.Text`
  color: #8a9796;
  font-size: 13px;
  line-height: 20px;
`;

const StarsWrap = styled.View`
  flex-direction: row;
  margin-top: 10px;
  align-items: center;
`;

const RatingCount = styled.Text`
  font-weight: 500;
  margin-left: 5px;
`;

/* Left to do:
  [x] FAB for send message
  [x] Video player
  [x] Navbar links (Invite and back)
*/

export default ProtisanProfile;
