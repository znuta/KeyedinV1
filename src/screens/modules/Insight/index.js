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
import TimeAgo from 'react-native-timeago';
import SegmentControl from 'react-native-segment-controller';
import styled from 'styled-components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import ReadMore from 'react-native-read-more-text';
import * as Animatable from 'react-native-animatable';
import Colors from 'src/constants/Colors';
import {Header, Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {getUserProjects} from 'src/redux/actions/ProjectsActions';
import {BASEURL} from 'src/constants/Services';
import {SET_ALL_PROJECTS} from 'src/redux/action-types';
import ListItemSeparator from 'src/component/ListItemSeparator';
import {colors, hp, wp} from 'src/config/variables';
import Empty from 'src/component/Empty';
import { styles, InnerContentContainer } from './styles';
import axios from 'axios';
import ProjectItem from 'src/component/ProjectItem';

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

function Insight(props) {
  const navigation = useNavigation();
  const [reviews, setReviews] = useState([]);
  const [activeSegment, setActiveSegment] = useState(1);
  const [isProposal, setIsProposal] = useState(true);
  const [proposals, setProposals] = useState([]);
  

  const [projects, setProjects] = useState([]);
  const [isFetching, setisFetching] = useState(false);
 
  const [jobInsight, setJobInsight] = useState({});
  const [schedule, setSchedule] = useState([]);
  const [earnings, setEarnings] = useState([]);
  const [defaultImage, setDefaultImage] = useState(
    'https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1222&q=80',
  );
  useEffect(() => {
    const {auth, proposals} = props;
    (async () => {
     
      GetInsights();
      GetEarnings();
      GetRating();
      GetArtisanReview()
    })();
  }, []);

 

  const GetEarnings = () => {
    let uri = BASEURL + '/artisan/earnings';
  
    axios.get(uri, {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: 'Bearer' + ' ' + props.auth.token,
      },
    })
      .then(res => {
        // setEarnings(res.data); 
      })
      .catch(error => {
        //props.setLoading(false);
       
      });
  };

  const GetRating = () => {
    let uri = BASEURL + '/artisan/ratings';

    axios.get(uri, {
      headers: {
        //"Content-Type": "application/json;charset=utf-8",
        Authorization: 'Bearer' + ' ' + props.auth.token,
      },
    })
      .then(res => {
        //GetPortfolio();
        // setRating(res.data);
        console.log('rating', res.data);
      })
      .catch(error => {
        //props.setLoading(false);
       
      });
  };

  const GetInsights = () => {
    let uri = BASEURL + '/artisan/job-insight';

      axios.get(uri, {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: 'Bearer' + ' ' + props.auth.token,
        },
      }).then(res => {
        
      }).catch(error => {
          console.log('insig', error);   
        });
   
  };

  const GetArtisanReview = () => {
    let uri = BASEURL + '/artisan/reviews';
    axios.get(uri, {
      
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: 'Bearer' + ' ' + props.auth.token,
      },
    })
      .then(res => {
        console.log('Look here again', res.data);
       
      })
      .catch(error => {
        //props.setLoading(false);
       
      });
  };
  const switchActiveSegment = index => {
    return setActiveSegment(index);
  };

  const SkillItem = item => {
    return (
      <SkillBadge>
        <Text
          style={{
            fontSize: 11,
            fontWeight: 'bold',
            color: '#8E87F1',
          }}>
          {item.name}
        </Text>
      </SkillBadge>
    );
  };

  const renderProjects = () => {
    
    return (
      <ProjectsWrap>
       
        {activeSegment == 1 ? (
          <>
            <FlatList
            data={[]}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 80}}
            style={{flex: 1}}
            renderItem={({item, index}) => {
              return <ProjectItem item={item} />;
            }}
            keyExtractor={(item, index) => index.toString()}
           
            refreshing={isFetching}
            ListEmptyComponent={
              <Empty
                title={'No Reviews'}
                subTitle={'You have not been reviewed by any employer'}
              />
            }
           
          />
            
          </>
        ) : (
            <>
              
              <FlatList
            data={[]}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 80}}
            style={{flex: 1}}
            renderItem={({item, index}) => {
              return <ProjectItem item={item} />;
            }}
            keyExtractor={(item, index) => index.toString()}
           
            refreshing={isFetching}
            ListEmptyComponent={
              <Empty
                title={'No Ongoing Jobs'}
                subTitle={'Ongoing Jobs show up here'}
              />
            }
           
          />
           
          </>
        )}
      </ProjectsWrap>
    );
  };

  const AllProjects = () => {
    return (
      <Animatable.View style={{flex: 1}} animation="fadeInLeft">
        <ProjectsContainer
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 30}}>
          {renderProjects()}
        </ProjectsContainer>
      </Animatable.View>
    );
  };

  const MyReviews = () => {
    return (
      <View style={styles.reviewsWrap}>
        <View style={styles.reviewRows}>
          <Text style={styles.reviewText}>Total Number of Jobs</Text>
          <Text style={styles.reviewText}>0</Text>
        </View>
        <View style={styles.reviewRows}>
          <Text style={styles.reviewText}>Number of job offers</Text>
          <Text style={styles.reviewText}>0</Text>
        </View>
        <View style={styles.reviewRows}>
          <Text style={styles.reviewText}>Number of completed jobs</Text>
          <Text style={styles.reviewText}>0</Text>
        </View>
        <View style={styles.reviewRows}>
          <Text style={styles.reviewText}>Job success rate</Text>
          <Text style={styles.reviewText}>0%</Text>
        </View>
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
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: 6,
                
              }}
              onPress={() => {
                navigation.goBack()
                setIsProposal(true);
              }}>
              <Feather name="arrow-left" size={25} color={colors.white} />
            </TouchableOpacity>
          }
          centerComponent={
            <Image
              source={{
                uri: props.auth.avatar,
                // avatar,
                // "https://static.dribbble.com/users/1304678/screenshots/7301908/media/3f91189797dd514eb6446b21a4faa209.png",
              }}
              style={{
                ...StyleSheet.absoluteFillObject,
                borderColor: colors.white,
                borderWidth: 7,
                position: 'relative',
                borderRadius: 100,
                width: 120,
                height: 120,
              }}
            />
          }
          containerStyle={{
            backgroundColor: Colors.primary,
            borderColor: colors.green,
            height: 190,
            justifyContent: 'space-between',
          }}
        />
      
        <View
          style={[
            styles.segmentWrap,
            {
              borderBottomLeftRadius: 50,

              borderColor: colors.green,
              borderBottomRightRadius: 50,
              backgroundColor: colors.green,
              height: 75,
            },
          ]}>
          <SegmentControl
            values={['Earnings', 'Insights', 'Schedule']}
            
            selectedIndex={activeSegment}
            onTabPress={index => {
              switchActiveSegment(index);
            }}
            activeTabStyle={[
              styles.activeTabStyle,
              {backgroundColor: colors.white, borderRadius: 50},
            ]}
          activeTabTextStyle={{ color: colors.green, fontWeight: 'bold' }}
          tab
            tabStyle={[styles.tabStyle, {backgroundColor: colors.green}]}
            tabTextStyle={[styles.tabTextStyle, {color: colors.white}]}
            borderRadius={50}
            height={40}
        />
        
      </View>
      <MyReviews/>
      <Wrapper>
        <View style={{flex: 1}}>
          {activeSegment == 0 ? <ProjectsWrap>
            <FlatList
            data={[]}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 80}}
            style={{flex: 1}}
            renderItem={({item, index}) => {
              return <ProjectItem item={item} />;
            }}
            keyExtractor={(item, index) => index.toString()}
           
            refreshing={isFetching}
            ListEmptyComponent={
              <Empty
                title={'No Ongoing Jobs'}
                subTitle={'Ongoing Jobs show up here'}
              />
            }
           
          />
          </ProjectsWrap> : <AllProjects />}
        </View>
      </Wrapper>
     
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

export default connect(mapStateToProps, mapDispatchToProps)(Insight);
