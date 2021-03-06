import React, {useState, useEffect,useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  ImageBackground,
} from 'react-native';
import styled from 'styled-components';
import {Header, Icon, Divider} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {WebView} from 'react-native-webview';
import ReadMore from 'react-native-read-more-text';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import Colors from 'src/constants/Colors';
import Layout from 'src/constants/Layout';
import {colors, fonts, hp, wp} from 'src/config/variables';
import {BASEURL} from 'src/constants/Services';
import {connect} from 'react-redux';
import {styles} from './styles';
import Loader from 'src/component/Loader';
import Button from 'src/component/Button/index';
import TextField from 'src/component/TextField';
import TextArea from 'src/component/TextArea';
import SelectField from 'src/component/SelectField';
import DataTimeField from 'src/component/DataTimeField';
import ListItemSeparator from 'src/component/ListItemSeparator';
import DocumentPicker from 'react-native-document-picker'
import moment from 'moment';
import axios from 'axios';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { setLoading } from 'src/redux/actions/AuthActions';

const OngoingProjectDetail = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const mapRef = useRef();
  const {auth} = useSelector(state => state);
  const [item, setItem] = useState({});
  const [type, setType] = useState('');
  const [items, setitems] = useState(null);
  const [isSendProposal, setSendProposal] = useState(false);
  const [defaultImage, setDefaultImage] = useState(
    'https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1222&q=80',
  );
  const [value, setValue] = useState({...item});
  const { due_date = new Date(), bid_amount = '', cover_letter = '' } = value;
  var num = parseFloat(bid_amount);
  var amountToReceived = num - (num * .20);
  const {params = {}} = props.route

  const onChangeText = (key, data) => {
    setValue({...value, [key]: data});
  };

  useEffect(() => {
    if (params) {
      console.log(params);
      setItem(params.data);
    
      
    }
  }, [params]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.fitToSuppliedMarkers([item.id]);
    }
    const {proposal=[{}]} = item
    console.log("___PROP___LOL",proposal)
     setValue({...value, ...proposal[0]});
  }, [item]);

    const documentPicker = async () => {

        // Pick a single file
        try {
            const result = await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles],
            })
            
        console.log(result);
          setValue({ ...value, image: result.uri });
          let name = result.name;
          let uri = result.uri;
          let lastIndexOf = uri.lastIndexOf(".");
          let ext = uri.substr(lastIndexOf+1, uri.length-1);
          var file = {
              name: name,
              uri: Platform.OS === 'android' ? result.uri : result.uri.replace("file://", ""),
          };
          setValue({ ...value, file });
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
            // User cancelled the picker, exit any dialogs or menus and move on
            } else {
            throw err
            }
        }
    
          
}

  const GetJobs = () => {
    let uri = BASEURL + `/projects/${auth.userData.location.lat}`;
    
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
          console.log("__Download___", res)
          setisFetching(false);
        props.setLoading(false);
        
      })
      .catch(error => {
        setisFetching(false);
        props.setLoading(false);
        console.log('Job Get Failed because', error.response);
       
      });
  };


  const BackButton = () => {
    return (
      <TouchableOpacity
        style={{paddingHorizontal: 10}}
        onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" style={styles.header_icon} />
      </TouchableOpacity>
    );
  };
  const RightButton = () => {
    return (
      <TouchableOpacity
        style={{paddingHorizontal: 10}}
        onPress={() => navigation.goBack()}>
        <MaterialIcons name="favorite" style={styles.header_icon} />
      </TouchableOpacity>
    );
  };
 


  const completeProject = () => {
    let uri = BASEURL + '/projects/completed';
    const data = {
      user_id: auth.userData.id,
      project_id: item.id,
     
    };
    dispatch(setLoading(true))
    axios.post(uri,data, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer' + ' ' + auth.token,
      },
    })
      .then(res => {
       
        console.log('___PROJECT__COMPLETE__', res);
        dispatch(setLoading(false))
        navigation.goBack()
      })
      .catch(error => {
        console.log("___ERROR___COMPLETE",error);
        dispatch(setLoading(false))
       
      });
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

  
  return (
    <Container>
      <Header
        leftComponent={<BackButton />}
        rightComponent={<RightButton />}
        //rightComponent={<FilterButton />}
        centerComponent={{
          text: 'View Offer',
          style: {
            fontWeight: '700',
            fontSize: wp('5%'),
            color: colors.white,
          },
        }}
        statusBarProps={{barStyle: 'dark-content'}}
        containerStyle={{
          backgroundColor: 'transparent',
          justifyContent: 'space-between',
          borderBottomWidth: 0,
          paddingVertical: hp('3%'),
          backgroundColor: colors.green,
          borderBottomLeftRadius: wp('8%'),
          borderBottomRightRadius: wp('8%'),
        }}
      />
      <ContentContainer containerStyle={{flex: 1}}>
        <TitleSection>
          <Title>{item.name}</Title>
        </TitleSection>
        <Row style={{marginHorizontal: wp('4%'), alignItems: 'center'}}>
          <MaterialIcons style={styles.paste_icon_style} name="content-paste" />
          <DescriptionHeader>Job Description</DescriptionHeader>
          <TimeWrapper>{ item.createdAt ?moment(item.createdAt, "YYYYMMDD").fromNow() : "5 min ago"}</TimeWrapper>
        </Row>
        <InnerContentContainer>
          {/* <Sectiontitle>Description :</Sectiontitle> */}
          <ProposalWrap>
            <ProposalImage 
            onPress={()=>{
              navigation.navigate('ProtisanProfile', {id: item.user_id})
            }}
             style={{}}>
              <Image
                source={{
                  uri: item && item.user ? item.user.avatar : defaultImage,
                }}
                style={{...StyleSheet.absoluteFill, borderRadius: 50}}
              />
            </ProposalImage>

            <ProposalBody>
              <ReadMore
                numberOfLines={4}
                renderTruncatedFooter={_renderTruncatedFooter}
                renderRevealedFooter={_renderRevealedFooter}>
                <JobDesc>{item.description}</JobDesc>
              </ReadMore>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  flex: 1,
                }}>
                <FlatList
                  data={item.skillSet}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  bounces={false}
                  decelerationRate={'normal'}
                  scrollEnabled={true}
                  //numColumns={2}
                  horizontal={true}
                  style={{marginTop: 10, flex: 1}}
                  // renderItem={({item}) => _renderGalleryImage}
                  renderItem={({item, index}) => (
                    <View style={{flex: 1, width: '100%'}}>
                      <SkillBadge key={index.toString()}>
                        <BadgeText>{item}</BadgeText>
                      </SkillBadge>
                    </View>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  //ItemSeparatorComponent={ListItemSeparator}
                />
                <StatusWrap>
                  <Feather
                    name="info"
                    style={{
                      fontSize: wp('4%'),
                      color: colors.green,
                      fontWeight: '500',
                      marginLeft: 7,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: wp('3.5%'),
                      color: colors.green,
                      fontWeight: '500',
                      marginLeft: 7,
                    }}>
                    {item.status || "Open"}
                  </Text>
                </StatusWrap>
              </View>
            </ProposalBody>
          </ProposalWrap>

          <ProposalWrap>
            <MaterialCommunityIcons
              name="paperclip"
              style={{
                fontSize: wp('6%'),
                color: colors.grey,
                fontWeight: '500',
                marginLeft: wp('10%'),
              }}
            />

            <ProposalBody>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  flex: 1,
                }}>
                <FlatList
                  data={item.attachments || [defaultImage,
                    defaultImage,
                    defaultImage,
                    defaultImage,]}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  bounces={false}
                  decelerationRate={'normal'}
                  scrollEnabled={true}
                  //numColumns={2}
                  horizontal={true}
                  style={{marginTop: 10, flex: 1}}
                  // renderItem={({item}) => _renderGalleryImage}
                  renderItem={({item, index}) => (
                    <ProposalImage style={{}}>
                      <Image
                        source={{
                          uri: item.uri,
                        }}
                        style={{...StyleSheet.absoluteFill, borderRadius: 8}}
                      />
                    </ProposalImage>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  //ItemSeparatorComponent={ListItemSeparator}
                />
                <StatusWrap style={{flex: 0}}>
                  <Text
                    style={{
                      fontSize: wp('2.5%'),
                      color: colors.grey,
                      fontWeight: '300',
                      marginLeft: 7,
                    }}>
                    {item.attachments && item.attachments.length > 3?`+${item.attachments.length}`: ''}
                  </Text>
                </StatusWrap>
              </View>
            </ProposalBody>
          </ProposalWrap>

          <ProposalWrap>
            <MaterialIcons
              name="location-pin"
              style={{
                fontSize: wp('3.5%'),
                color: colors.grey,
                fontWeight: '500',
                marginLeft: wp('10%'),
              }}
            />

            <ProposalBody>
              <DescriptionText>
                {item.address_str || "No. 19 Nile Crescent, Sun City, Galadimawa, Abuja"}
              </DescriptionText>
            </ProposalBody>
          </ProposalWrap>
        </InnerContentContainer>

        <InnerContentContainer>
        <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1, height: hp('30%') }}
        initialRegion={{
          latitude: item.location && item.location.coordinates[1],
          longitude: item.location && item.location.coordinates[0],
          longitudeDelta: 0.05,
         latitudeDelta: 0.05,
        }}
        region={{
          latitude: item.location && item.location.coordinates[1],
          longitude: item.location && item.location.coordinates[0],
          longitudeDelta: 0.05,
          latitudeDelta: 0.05,
        }}
        zoomEnabled={true}
        showsUserLocation={true}
        initialPosition={{
          latitude: item.location && item.location.coordinates[1],
          longitude: item.location && item.location.coordinates[0],
          longitudeDelta: 0.05,
          latitudeDelta: 0.05,
        }}
        minZoomLevel={2}>
        
          <Marker
            onSelect={ ()=>{}}
            style={{width: 400, height: 400}}
            identifier={item.id}
            id={item.id}
            draggable={false}
            coordinate={{
              latitude: item.location && item.location.coordinates[1],
              longitude: item.location && item.location.coordinates[0],
              longitudeDelta: 0.05,
              latitudeDelta: 0.05,
            }}
            image={require('src/assets/marker.png')}
          >
           
            <ImageBackground
              source={require('src/assets/mark.png')}
              style={{
                width: 50,
                height: 50,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={{ uri: item && item.avatar ? item.avatar : defaultImage,}}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  marginBottom: 10,
                  borderWidth: 1.5,
                  borderColor: '#fff',
                  shadowColor: '#7F5DF0',
                  shadowOffset: {
                    width: 0,
                    height: 10,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.5,
                  elevation: 5,
                }}
              />
            </ImageBackground>
          </Marker>
       
      </MapView>
        </InnerContentContainer>


        <InnerContentContainer>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
              <Label>Urgency: </Label>
              <CoverLetter>
                {item.priority ?? 'High'}{' '}
              </CoverLetter>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
              <Label>Payment: </Label>
              <CoverLetter>{item.payment_mode||"Fixed"} </CoverLetter>
            </View>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
              <Label>Budget: </Label>
              <CoverLetter>
                <Text>
                  &#8358;
                  {Number(item.budget || '40000')
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                </Text>
              </CoverLetter>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
              <Label>Deadline: </Label>
              <CoverLetter>{item.end_date||"Negotiable"} </CoverLetter>
            </View>
          </View>

         
        </InnerContentContainer>

        
          <View style={styles.actionBox}>
            <View
              style={{
                borderRadius: 12,
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                marginTop: 10,
                // justifyContent: 'space-between',
              }}>
              <DataTimeField
                // style={{ width: 100 }}
                editable={false}
                additionalStyle={{
                  inputGroup: {},
                  inputField: {
                    width: wp('30%'),
                  },
                }}
                duration={150}
                date={due_date}
                label="Due Date"
                placeholder="select date"
                setDate={value => onChangeText('due_date', value)}
              />

              <TextField
                additionalStyle={{
                  inputGroup: {
                    marginLeft: 'auto',
                  },
                  inputField: {
                    width: wp('30%'),
                    backgroundColor: colors.layout,
                    height: wp('10%'),
                  },
                }}
                editable={false}
                value={bid_amount}
                label="Proposed Amount"
                onChangeText={value => onChangeText('bid_amount', value)}
              />
            </View>
            <InnerContentContainer>
          <ReadMore
                numberOfLines={4}
                renderTruncatedFooter={_renderTruncatedFooter}
                renderRevealedFooter={_renderRevealedFooter}>
                <JobDesc>{cover_letter}</JobDesc>
              </ReadMore>
        </InnerContentContainer>
            
            <TextField
              additionalStyle={{
                inputField: {
                  backgroundColor: colors.layout,
                },
              }}
              label="View Documents"
              editable={false}
              />
             
            <ListItemSeparator />
            <View style={{width: '100%'}}>
              <Label style={{color: colors.green, marginBottom: hp('0.3%')}}>
                Total:
              </Label>
              <DescriptionText style={{marginBottom: hp('0.3%')}}>
                {bid_amount || "N40,000"}
              </DescriptionText>
              <SecondaryBadge style={{marginBottom: hp('0.3%')}}>
                <SecondaryBadgeText>KeyedIn Services Fee Included (20%)</SecondaryBadgeText>
              </SecondaryBadge>
            </View>
            <ListItemSeparator />
            <View style={{width: '100%'}}>
              <Label style={{color: colors.green, marginBottom: hp('0.3%')}}>
                Amount to be received:
              </Label>
              <DescriptionText style={{marginBottom: hp('0.3%')}}>
                {amountToReceived||"N38,000"}
              </DescriptionText>
            </View>
          </View>
        

        <View style={styles.actionBox}>
        <CTAWrap>
              <CTAButton
                onPress={() => {
                 
                  console.log('accept', item.id);
                  completeProject()
                  
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '600',
                  }}>
                  Mark Completed
                </Text>
              </CTAButton>
              <CTAButton
                style={{backgroundColor: Colors.primary + 15}}
              onPress={() => {
                  
                }}>
                <Text
                  style={{
                    color: Colors.primary,
                    fontWeight: '600',
                  }}>
                  Cancel
                </Text>
              </CTAButton>
            </CTAWrap>
        </View>
      </ContentContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  ${'' /* background-color: white; */}
`;

const ContentContainer = styled.ScrollView`
  padding-vertical: ${hp('1%')};
  background-color: #ebf1f2;
  flex: 1;
  padding-horizontal: ${wp('5%')};
`;
const InnerContentContainer = styled.View`
  padding-vertical: ${hp('1%')};
  background-color: #ffffff;
  margin-vertical: ${hp('1%')};
min-height: ${hp('10%')}
  flex: 1;
  padding-horizontal: ${wp('4%')};

  border-radius: 10px;
  ${'' /* align-items: center; */}
`;

const ProtisanImage = styled.View`
  z-index: 1;
  border-radius: 25px;
  margin-bottom: -50px;
  background-color: #ececec;
  width: ${Layout.window.width * 0.3}px;
  height: ${Layout.window.width * 0.3}px;
`;

const ContentWrap = styled.View`
  background-color: white;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  width: 100%;
  padding-bottom: 50px;
  ${'' /* flex: 1; */}
  padding-horizontal: 30px;
  padding-top: 70px;
`;

const TitleSection = styled.View`
  margin-vertical: ${hp('1%')};
`;
const TimeWrapper = styled.Text`
  font-size: ${wp('3.5%')};
  color: ${colors.lightgrey};
  font-weight: 300;
  margin-left: auto;
`;
const DescriptionHeader = styled.Text`
  font-size: ${wp('4%')};
  color: ${colors.header};
  font-weight: 700;
  font-family: ${fonts.PRIMARY_REGULLAR};
`;

const Title = styled.Text`
  font-size: ${wp('5%')};
  font-weight: 600;
  font-weight: bold;
  text-align: center;
  color: ${colors.green};
`;

const JobDesc = styled.Text`
  text-align: left;
  font-size: ${wp('3.5%')};
  font-weight: 300;
  line-height: ${wp('5%')};
  color: black;
  margin-top: ${hp('4%')};
`;

const Section = styled.View`
  margin-top: 15px;
  margin-bottom: 10px;
`;

const Sectiontitle = styled.Text`
  font-weight: 700;
  font-weight: bold;
  font-size: 15px;
`;

const SectionContent = styled.View``;

const CoverLetter = styled.Text`
  font-weight: 400;
  margin-vertical: 10px;
  line-height: 22px;
  color: #00000090;
`;

const BidAmount = styled.Text`
  margin-vertical: 10px;
  font-size: 20px;
  color: #000000;
`;

const Row = styled.View`
  flex-direction: row;
  margin-vertical: ${hp('1%')};
`;

const SkillsWrap = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
  ${'' /* margin-vertical: -6; */}
`;

const SkillBadge = styled.View`
  background-color: ${colors.light};
  padding-top: ${wp('1%')};
  padding-bottom: ${wp('1%')};
  padding-left: ${wp('3%')};
  padding-right: ${wp('3%')};
  border-radius: 50px;
  margin-right: ${wp('2%')};
  align-items: center;
  
`;
const BadgeText = styled.Text`
  font-size: ${wp('3.5%')};
  font-weight: 300;
  color: ${colors.green};
`;

const SecondaryBadge = styled.View`
  background-color: ${colors.green};
  padding-top: ${wp('1%')};
  padding-bottom: ${wp('1%')};
  padding-left: ${wp('2%')};
  padding-right: ${wp('2%')};
  border-radius: 50px;
  margin-right: ${wp('2%')};
  align-items: center;
  width: ${wp('70%')};
`;
const SecondaryBadgeText = styled.Text`
  font-size: ${wp('3.5%')};
  font-weight: 300;
  color: ${colors.white};
`;
const CTAWrap = styled.View`
  flex-direction: row;
 
`;

const CTAButton = styled.TouchableOpacity`
  margin-horizontal: 10px;
  height: 50px;
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${Colors.primary}30;
  background-color: ${Colors.primary};
`;
const ProposalWrap = styled.View`
  flex-direction: row;
  margin-vertical: ${hp('1%')};
`;

const ProposalImage = styled.TouchableOpacity`
  height: ${wp('14%')};
  width: ${wp('14%')};
  background-color: #e2e0de;
  border-radius: 50;
  margin-end: ${wp('2%')};
`;

const ProposalBody = styled.View`
  flex: 1;
  margin-left: ${wp('1%')};
`;

const ProposalTitle = styled.Text`
  font-size: ${wp('4%')};
  font-weight: 700;
  flex: 1;
`;

const ProposalMeta = styled.View`
  margin-top: 5px;
`;

const ProposalRole = styled.Text`
  font-size: ${wp('3%')};
  font-weight: 400;
  color: #b5b2b2;
`;

const ProposalContent = styled.Text`
  margin-vertical: ${'1%'};
  line-height: 15px;
  font-size: ${wp('3%')};
`;

const StatusWrap = styled.View`
  flex: 0.4;
  flex-direction: row;
  align-items: center;
`;
const DescriptionText = styled.Text`
font-size: ${wp('3%')}
  
  line-height: ${hp('1.8%')};
  font-weight: 400;
  color: ${colors.medium};
`;
const ProposalLink = styled.View`
  padding-vertical: 5px;
  flex-direction: row;
  align-items: center;
`;
const Label = styled.Text`
  font-size: ${wp('3.5%')};
  font-weight: 700;
  color: ${colors.dark};
`;

export default OngoingProjectDetail;
