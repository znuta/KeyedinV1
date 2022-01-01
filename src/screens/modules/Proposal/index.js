import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import styled from 'styled-components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import ReadMore from 'react-native-read-more-text';
import Colors from 'src/constants/Colors';
import {Header, Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {connect, useDispatch, useSelector} from 'react-redux';
import {getUserProjects} from 'src/redux/actions/ProjectsActions';
import {BASEURL} from 'src/constants/Services';
import {SET_ALL_PROJECTS} from 'src/redux/action-types';
import {colors, hp, wp} from 'src/config/variables';
import Empty from 'src/component/Empty';
import { styles, InnerContentContainer } from './styles';
import axios from 'axios';

const mapStateToProps = state => {
  const {auth, proposals, demo} = state;
  return {auth, proposals, demo};
};

const mapDispatchToProps = dispatch => {
  return {
    projectModalActive: state =>
      dispatch({type: PROJECT_MODAL_ACTIVE, state: state}),
    setLoading: status => dispatch({type: SET_LOADING, status: status}),
    setShowToast: state => dispatch({type: SET_SHOW_TOAST, state: state}),
    setAllProjects: projects =>
      dispatch({type: SET_ALL_PROJECTS, projects: projects}),
    getUserProjects: token => dispatch(getUserProjects(token)),
  };
};

function ProposalsList(props) {
    const navigation = useNavigation();
    const dispatch = useDispatch()
  const [isProposal, setIsProposal] = useState(true);
  const [proposals, setProposals] = useState([
    {
      user: {
        first_name: 'Toyeeb',
        last_name: 'Atunde',
        avatar:
          'https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1222&q=80',
      },
      employer: {
        first_name: 'Toyeeb',
        last_name: 'Atunde',
        avatar:
          'https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1222&q=80',
      },
      job: {
        title: 'SoftWare Developer needed',
        description:
          'React Native SVG transformer allows you to import SVG files in your React Native project the same way that you would in a Web application when',
        skillSet: [{skillSet: 'Java'}, {skillSet: 'Robotic'}],
        location: 'Lagos',
        created_at: '',
        budget: 200,
      },
      offer_status: {
        name: 'accepted',
      },
    },

    {
      user: {
        first_name: 'Toyeeb',
        last_name: 'Atunde',
        avatar:
          'https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1222&q=80',
      },
      employer: {
        first_name: 'Toyeeb',
        last_name: 'Atunde',
        avatar:
          'https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1222&q=80',
      },
      job: {
        title: 'SoftWare Developer needed',
        description:
          'React Native SVG transformer allows you to import SVG files in your React Native project the same way that you would in a Web application when',
        skillSet: [{skillSet: 'Java'}, {skillSet: 'Robotic'}],
        location: 'Lagos',
        created_at: '',
        budget: 200,
      },
      offer_status: {
        name: 'accepted',
      },
    },
    {
      user: {
        first_name: 'Toyeeb',
        last_name: 'Atunde',
        avatar:
          'https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1222&q=80',
      },
      employer: {
        first_name: 'Toyeeb',
        last_name: 'Atunde',
        avatar:
          'https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1222&q=80',
      },
      job: {
        title: 'SoftWare Developer needed',
        description:
          'React Native SVG transformer allows you to import SVG files in your React Native project the same way that you would in a Web application when',
        skillSet: [{skillSet: 'Java'}, {skillSet: 'Robotic'}],
        location: 'Lagos',
        created_at: '',
        budget: 200,
      },
      offer_status: {
        name: 'accepted',
      },
    },
  ]);
  const [isFetching, setisFetching] = useState(false);
  const [defaultImage, setDefaultImage] = useState(
    'https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1222&q=80',
  );
  useEffect(() => {
    (async () => {
      GetProposals();
    })();
  }, []);

  const RefreshProposals = () => {
    setisFetching(true);
    GetProposals();
  };
 
  const GetProposals = () => {
    let uri = BASEURL + `/proposals/artisan/${props.auth.userData.id}`;

    axios.get(uri, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer' + ' ' + props.auth.token,
      },
    }).then(res => {
      console.log('what i am looking forsa', res.data);
      const {data} = res.data
        setProposals(data);
      }).catch(error => {
        //props.setLoading(false);
        console.log(error);
        setisFetching(false);
     
      });
  };

  const _renderTruncatedFooter = handlePress => {
    return (
      <Text
        style={{color: '#000', fontWeight: '600', fontSize: 13}}
        // onPress={handlePress}
      >
        {/* Read more */}
      </Text>
    );
  };

  const _renderRevealedFooter = handlePress => {
    return (
      <Text
        style={{color: '#000', fontWeight: '500', fontSize: 14}}
        onPress={handlePress}>
        Show less
      </Text>
    );
  };

  

  // const SkillItem = item => {
  //   return (
  //     <SkillBadge>
  //       <Text
  //         style={{
  //           fontSize: 11,
  //           fontWeight: 'bold',
  //           color: '#8E87F1',
  //         }}>
  //         {item.name}
  //       </Text>
  //     </SkillBadge>
  //   );
  // };

  const ProposalItem = ({item, index}) => {
      return (
        <TouchableOpacity onPress={()=>navigation.navigate("ProposalDetail", {data: item, type: 'Home'})}>
      <ProjectCard>
        <ProposalWrap>
          <ProposalImage style={{borderRadius: 50}}>
            <Image
              source={{
                uri: item.employer.avatar ?? defaultImage,
              }}
              style={{...StyleSheet.absoluteFill, borderRadius: 50}}
            />
          </ProposalImage>

          <ProposalBody>
            <ProposalTitle>{item.job.title ?? 'Nothing'}</ProposalTitle>

            <View
              style={{
                flex: 1,
                marginVertical: hp('0.3%'),
                paddingRight: wp('5%'),
              }}>
              <ReadMore
                numberOfLines={3}
                renderTruncatedFooter={_renderTruncatedFooter}
                renderRevealedFooter={_renderRevealedFooter}>
                <DescriptionText style={{flex: 1}}>
                  {item.job.description}
                </DescriptionText>
              </ReadMore>
            </View>
          </ProposalBody>
        </ProposalWrap>
        <View style={{flexDirection: 'row'}}>
          <MaterialIcons
            name="location-on"
            style={{
              fontSize: wp('3.5%'),
              marginLeft: wp('2%'),
              color: colors.green,
              fontWeight: '700',
            }}
          />
          <Text
            style={{
              fontSize: wp('3%'),
              color: colors.green,
              fontWeight: '700',
            }}>
            {item.job.location}
          </Text>

          <Text
            style={{
              marginLeft: 'auto',
              fontSize: wp('3%'),
              color: colors.green,
              fontWeight: '700',
            }}>
            Amount To Be Received:
          </Text>
          <Text
            style={{
              fontSize: wp('3%'),
              color: colors.medium,
              fontWeight: '300',
            }}>
            {' '}
            N38,000
          </Text>
        </View>
    </ProjectCard>
    </TouchableOpacity>
    );
  };

  const Proposals = () => {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={proposals}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 80}}
          style={{flex: 1, paddingHorizontal: wp('4%'), paddingTop: 10}}
          renderItem={({item, index}) => ProposalItem({item, index})}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={() => RefreshProposals()}
          refreshing={isFetching}
          ListEmptyComponent={
            <Empty
              title={'No Proposals'}
              subTitle={' You have no ongoing proposals'}
            />
          }
        />
      </View>
    );
  };

  return (
    <View style={{backgroundColor: '#f5f5f5', flex: 1}}>
     
        <Header
          placement="center"
          leftComponent={
            <TouchableOpacity
              style={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                padding: 6,
              }}
              onPress={() => {
                navigation.navigate('Profile');
              }}>
             
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
          }
          centerComponent={{
            text: 'Proposals',
            style: {color: '#fff', fontWeight: 'bold', fontSize: 16},
          }}
          rightComponent={
            <TouchableOpacity
              onPress={() => {
                setIsProposal(false);
              }}>
              <MaterialCommunityIcons
                name="chart-bar"
                size={24}
                color="white"
                style={{opacity: 0.8}}
              />
            </TouchableOpacity>
          }
          barStyle={'light-content'}
          containerStyle={{
            backgroundColor: Colors.primary,
            justifyContent: 'space-between',
            height: 110,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
          }}
        />
      
        <View style={[styles.segmentWrap, {flex: 1}]}>
          <Proposals />
        </View>
      
    </View>
  );
}

const Wrapper = styled.View`
  flex: 1;
  ${'' /* padding-horizontal: 20px; */}
  padding-top: 20px;
`;

const ProjectsContainer = styled.ScrollView`
  ${'' /* background: white; */}
  flex: 1;
  padding-top: 10px;
  padding-horizontal: ${wp('2%')};
`;

const ProjectsWrap = styled.View``;

const ProjectCard = styled.View`
  background-color: white;
  padding-vertical: ${hp('2%')};
  margin-vertical: ${hp('0.5%')};
  padding-horizontal: ${wp('2.5%')};
  border-radius: 15px;
  box-shadow: 2px 5px 40px rgba(0, 0, 0, 0.03);
`;

const ProjectTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  line-height: 25px;
`;

const Meta = styled.View`
  margin-top: 20px;
  flex-direction: row;
`;

const StatusWrap = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const DeadlineWrap = styled.View`
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;

const Description = styled.View`
  margin-top: 20px;
`;

const DescriptionText = styled.Text`
  font-size: ${wp('3%')};
  letter-spacing: 0px;
  color: rgba(19, 24, 68, 0.5);
  line-height: ${wp('3.8%')};
  font-weight: 300;
   margin-vertical: ${hp('4%')}
  flex: 1;
  font-family: Poppins-Regular
`;

const Footer = styled.View`
  margin-top: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${'' /* border-width: 1; */}
`;

const MembersWrap = styled.View`
  flex-direction: row;
  flex: 1;
  ${'' /* border-width: 1; */}
`;

const Member = styled.Image`
  width: 45px;
  height: 45px;
  border-width: 3px;
  border-color: white;
  margin-right: -15px;
`;

const ProgressWrap = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

const ProposalWrap = styled.View`
  flex-direction: row;
`;

const ProposalImage = styled.View`
  height: ${wp('14%')};
  width: ${wp('14%')};
  background-color: #e2e0de;
  border-radius: 50;
  margin-end: ${wp('2%')};
`;

const ProposalBody = styled.View`
  flex: 1;
`;

const ProposalTitle = styled.Text`
  font-size: ${wp('3.5%')};
  font-weight: 700;
  flex: 1;
`;

const ProposalMeta = styled.View`
  margin-top: 5px;
`;

const ProposalRole = styled.Text`
  font-size: 14px;
  font-weight: 400;
  color: #b5b2b2;
`;

const ProposalContent = styled.Text``;

const ProposalLink = styled.View`
  padding-vertical: 5px;
  flex-direction: row;
  align-items: center;
`;

const ArtisanRating = styled.View`
  z-index: 10;
  background-color: white;
  border-radius: 8px;
  padding: 5px;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: center;
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.05);
  max-width: 60%;
`;

const SkillsWrap = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  ${'' /* margin-top: 10px; */}
  ${'' /* margin-vertical: -6; */}
`;

const SkillBadge = styled.View`
  margin-vertical: 5px;
  background-color: rgba(142, 135, 241, 0.1);
  padding: 10px;
  border-radius: 8px;
  margin-right: 10px;
`;

export default connect(mapStateToProps, mapDispatchToProps)(ProposalsList);
