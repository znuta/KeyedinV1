import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
} from 'react-native';


import SegmentControl from 'react-native-segment-controller';
import styled from 'styled-components';

import * as Animatable from 'react-native-animatable';
import Colors from 'src/constants/Colors';
import {Header, Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {getUserProjects} from 'src/redux/actions/ProjectsActions';
import {BASEURL} from 'src/constants/Services';
import {SET_ALL_PROJECTS} from 'src/redux/action-types';
import colors from 'src/config/colors';
import Empty from 'src/component/Empty';
import {hp, wp} from 'src/config/variables';
import axios from 'axios'
import ProjectItem from 'src/component/ProjectItem';
const mapStateToProps = state => {
  const {auth, projects, demo} = state;
  return {auth, projects, demo};
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

function ProjectsList(props) {
  const navigation = useNavigation();
  const [activeSegment, setActiveSegment] = useState(0);
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

      title: 'SoftWare Developer needed',
      description:
        'React Native SVG transformer allows you to import SVG files in your React Native project the same way that you would in a Web application when',
      skillSet: ['Java', 'Robotic'],
      location: 'Lagos',
      created_at: '',
      budget: 200,

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

      title: 'SoftWare Developer needed',
      description:
        'React Native SVG transformer allows you to import SVG files in your React Native project the same way that you would in a Web application when',
      skillSet: ['Java', 'Robotic'],
      location: 'Lagos',
      created_at: '',
      budget: 200,
      offer_status: {
        name: 'accepted',
      },
    },
  ]);
  const [projects, setProjects] = useState([
    {
      user: {
        first_name: 'Toyeeb',
        last_name: 'Atunde',
        avatar:
          'https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1222&q=80',
      },
      employer: {
        avatar:
          'https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1222&q=80',
      },
      job: {
        title: 'SoftWare Developer needed',
        description:
          'React Native SVG transformer allows you to import SVG files in your React Native project the same way that you would in a Web application when',
        skillSet: ['Java', 'Robotic'],
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
  const [jobOngoing, setJobOngoing] = useState([
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

      title: 'SoftWare Developer needed',
      description:
        'React Native SVG transformer allows you to import SVG files in your React Native project the same way that you would in a Web application when',
      skillSet: ['Java', 'Robotic'],
      location: 'Lagos',
      created_at: '',
      budget: 200,

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

      title: 'SoftWare Developer needed',
      description:
        'React Native SVG transformer allows you to import SVG files in your React Native project the same way that you would in a Web application when',
      skillSet: ['Java', 'Robotic'],
      location: 'Lagos',
      created_at: '',
      budget: 200,
      offer_status: {
        name: 'accepted',
      },
    },
  ]);
  const [jobCompleted, setjobCompleted] = useState([
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

      title: 'SoftWare Developer needed',
      description:
        'React Native SVG transformer allows you to import SVG files in your React Native project the same way that you would in a Web application when',
      skillSet: ['Java', 'Robotic'],
      location: 'Lagos',
      created_at: '',
      budget: 200,
      offer_status: {
        name: 'accepted',
      },
    },
  ]);

  useEffect(() => {
    const {auth, projects} = props;
    (async () => {
    GetJobOffers();
    GetOngoingJobs();
    GetCompletedJobs();
    props.getUserProjects(auth.token);
    setProjects(projects.projects);
    })();
  }, []);

  const RefreshJobOffers = () => {
    setisFetching(true);
    GetJobOffers();
  };
  const RefreshJobOngoing = () => {
    setisFetching(true);
    GetOngoingJobs();
  };
  const RefreshJobCompleted = () => {
    setisFetching(true);
    GetCompletedJobs();
  };

  const switchActiveSegment = index => {
    return setActiveSegment(index);
  };

  const GetJobOffers = () => {
    let uri = BASEURL + `/projects/status?status="open"&user_id=${props.auth.userData.id}`;

    axios.get(uri, {
     
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer' + ' ' + props.auth.token,
      },
    })
      
      .then(res => {
        console.log('what i am looking forsa', res.data);
        const {data=[]} = res.data
        setisFetching(false);
            setProposals(data);
          
      }).catch(error => {
        //props.setLoading(false);
        setisFetching(false);
      
      });
  };

  const GetOngoingJobs = async () => {
    
    let uri = BASEURL + `/projects/status?status="ongoing"&user_id=${props.auth.userData.id}`;
     axios.get(uri, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer' + ' ' + props.auth.token,
      },
    })
      .then(res => {
        console.log('ongoing', res.data);
        setisFetching(false);
        const {data=[]} = res.data
          setJobOngoing(data);
       
      })
      .catch(error => {
        //props.setLoading(false);
        setisFetching(false);
       
      });
  };

  const GetCompletedJobs = async () => {
    
    let uri = BASEURL + `/projects/status?status="completed"&user_id=${props.auth.userData.id}`;
   axios.get(uri, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer' + ' ' + props.auth.token,
      },
   }).then(res => {
    const {data=[]} = res.data
        console.log('what i am', res.data);
        setisFetching(false);
            setjobCompleted(data);
      }) .catch(error => {
        console.log('mase', error);
        //props.setLoading(false);
        setisFetching(false);
       
      });
  };

  const renderProjects = () => {
  
    return (
      <ProjectsWrap>

        {activeSegment == 1 ? (
          <FlatList
            data={jobOngoing}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 80}}
            style={{flex: 1}}
            renderItem={({item, index}) => {
              return <ProjectItem onPress={()=>navigation.navigate("OngoingProjectDetail", {data: item, type: 'Home'})} item={item} />;
            }}
            keyExtractor={(item, index) => index.toString()}
            onRefresh={() => RefreshJobOngoing()}
            refreshing={isFetching}
            ListEmptyComponent={
              <Empty
                title={'No Ongoing Jobs'}
                subTitle={'Ongoing Jobs show up here'}
              />
            }
           
          />
        ) : (
          <>
           
            <FlatList
              data={jobCompleted}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 80}}
              style={{flex: 1}}
              renderItem={({item, index}) => {
                return <ProjectItem onPress={()=>navigation.navigate("CompletedProjectDetail", {data: item, type: 'Home'})} item={item} />;
              }}
              keyExtractor={(item, index) => index.toString()}
              onRefresh={() => RefreshJobCompleted()}
              refreshing={isFetching}
              ListEmptyComponent={
                <Empty
                  title={'No Completed Jobs'}
                  subTitle={'Completed Jobs show up here'}
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

  const Proposals = () => {
    return (
      <Animatable.View style={{flex: 1}} animation="fadeInLeft">
        <FlatList
          data={proposals}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 80}}
          style={{flex: 1, paddingHorizontal: wp('4%')}}
          renderItem={({item, index}) => {
            return <ProjectItem onPress={()=>navigation.navigate("JobOfferDetail", {data: item, type: 'Home'})} item={item} />;
          }}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={() => RefreshJobOffers()}
          refreshing={isFetching}
          ListEmptyComponent={
            <Empty
              title={'No Job offers'}
              subTitle={' You have not received any Offers'}
            />
          }
        />
       </Animatable.View>
    );
  };


  return (
    <View style={{flex: 1}}>
      <StatusBar
        backgroundColor={Colors.primary}
       
      />
     

      <Header
        placement="center"
        leftComponent={
          <TouchableOpacity
            style={{
              justifyContent: 'flex-end',
              paddingHorizontal: wp('4%'),
            }}
            onPress={() => {
              navigation.navigate('Profile');
            }}>
            <Image
              source={{
                uri: props.auth.avatar,
                
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
          text: 'My Projects',
          style: {
            color: '#fff',
            fontWeight: '700',
            marginTop: hp('1%'),
            fontSize: wp('5%'),
          },
        }}
        // rightComponent={
        //   <TouchableOpacity onPress={() => {
        //     alert('to be implemented');
        //   }}>
        //     <MaterialCommunityIcons
        //         name="chart-bar"
        //         size={20}
        //         color="white"
        //         style={{ opacity: 0.8 }}
        //       />
        //   </TouchableOpacity>
        // }
        //rightComponent={<FilterButton />}
        // barStyle={"light-content"}

        containerStyle={{
          backgroundColor: Colors.primary,
          borderColor: colors.green,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      />
      <View
        style={[
          styles.segmentWrap,
          {
            borderBottomLeftRadius: wp('8%'),
            borderColor: colors.green,
            borderBottomRightRadius: wp('8%'),
            backgroundColor: colors.green,
            height: 75,
          },
        ]}>
        <SegmentControl
          values={['Job Offers', 'Ongoing', 'Completed']}
          badges={[proposals.length, jobOngoing.length, jobCompleted.length]}
          selectedIndex={activeSegment}
          onTabPress={index => {
            switchActiveSegment(index);
          }}
          activeTabStyle={styles.activeTabStyle}
          activeTabTextStyle={{color: colors.green, fontWeight: 'bold'}}
          tabStyle={styles.tabStyle}
          tabTextStyle={styles.tabTextStyle}
          borderRadius={50}
          height={40}
        />
      </View>

      <Wrapper>
        <View style={{flex: 1}}>
          {activeSegment == 0 ? <Proposals /> : <AllProjects />}
        </View>
      </Wrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  activeTabStyle: {
    backgroundColor: colors.white,
    borderRadius: 50,
    color: colors.green,
    fontWeight: 'bold',
  },
  tabStyle: {
    borderWidth: 0,
    borderColor: colors.green,
    backgroundColor: colors.green,
    borderRadius: 50,
  },
  tabTextStyle: {
    fontSize: 13,
    color: colors.white,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  segmentWrap: {
    paddingTop: 20,
    paddingHorizontal: 15,
    borderColor: colors.green,
  },
});

const Wrapper = styled.View`
  flex: 1;
  ${'' /* padding-horizontal: 20px; */}
  padding-top: 20px;
`;

const ProjectsContainer = styled.ScrollView`
  ${'' /* background: white; */}
  flex: 1;
 
  
`;

const ProjectsWrap = styled.View`
padding-horizontal: ${wp('4%')}
`;

const ProjectCard = styled.View`
  background-color: white;
  padding-horizontal: ${wp('5%')};
  z-index: 10;
  background-color: ${colors.white};
  border-radius: ${wp('3%')};

  min-width: 40%;
  min-height: 20%;

  shadow-color: #000;
  shadow-offset: 2px;
  shadow-opacity: 0.1;
  shadow-radius: 5;
  elevation: 10;
  margin-bottom: ${hp('2%')};
  padding-vertical: ${hp('2%')};
`;

const ProjectTitle = styled.Text`
  font-size: ${wp('4%')};
  font-weight: 700;
  line-height: 25px;
`;

const Meta = styled.View`
  margin-vertical: ${hp('1%')};
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

const Description = styled.View``;

const DescriptionText = styled.Text`
font-size: ${wp('3%')}
  margin-top: ${hp('1.8%')};
  line-height: ${hp('1.8%')};
  font-weight: 400;
  color: ${colors.medium};
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
  height: 50px;
  width: 50px;
  background-color: #e2e0de;
  border-radius: 10px;
  margin-end: 20px;
`;

const ProposalBody = styled.View`
  flex: 1;
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
  background-color: rgba(142, 135, 241, 0.1);
  padding: 6px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 8px;
  margin-right: ${wp('2%')};
`;

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);
