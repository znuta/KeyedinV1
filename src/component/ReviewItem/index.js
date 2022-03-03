import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
} from 'react-native';
import TimeAgo from 'react-native-timeago';
import styled from 'styled-components';
import Feather from 'react-native-vector-icons/Feather'
import ReadMore from 'react-native-read-more-text';
import {useNavigation} from '@react-navigation/native';
import colors from 'src/config/colors';
import {hp, wp} from 'src/config/variables';
import StarRating from 'react-native-star-rating';

const ReviewItem = props => {
    let {rating=0,comment = "",username,avatar, user={}} = props.item;
const {onPress=()=>{}} = props
    const _renderTruncatedFooter = handlePress => {
        return (
          <Text
            style={{color: '#000', marginTop: 5, fontWeight: '600', fontSize: 13}}
            // onPress={handlePress}
          >
            {/* Read more */}
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
      <ProjectCard
        activeOpacity={0.7}
      >
        
        <RatingWrap>
          <RatingImage>
            <Image
              source={{
                uri: avatar,
              }}
              style={{...StyleSheet.absoluteFill, borderRadius: 10}}
            />
          </RatingImage>
          <RatingBody>
         
            <RatingTitle>{`${username}`}</RatingTitle>
            <Description>
            
            <ReadMore
              numberOfLines={4}
              renderTruncatedFooter={_renderTruncatedFooter}
              renderRevealedFooter={_renderRevealedFooter}>
              <DescriptionText>
                {/* Hello protisan, I am currently looking for someone to fix my
            refrigerator today and I would be happy to... */}
                {comment}
              </DescriptionText>
            </ReadMore>
          </Description>
          <View style={{marginVertical: hp('1.7%'), width: '50%'}}>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={
                  !rating ? 0
                    : parseInt(Number(rating))
                }
                // emptyStar={"star-o"}
                fullStar={require('src/assets/icons/gold_key.png')}
                halfStar={require('src/assets/icons/gray_key.png')}
                emptyStar={require('src/assets/icons/gray_key.png')}
                fullStarColor={'#FFFFFF'}
                emptyStarColor={'#FFFFFF'}
                starSize={wp('3.5%')}
              />
            </View>
          </RatingBody>
        </RatingWrap>
       
      </ProjectCard>
    );
  };
  export default ReviewItem

  const styles = StyleSheet.create({
    activeTabStyle: {
      // borderWidth: 1,
      // borderColor: Colors.primary,
      backgroundColor: colors.white,
      borderRadius: 50,
      color: colors.green,
      fontWeight: 'bold',
    },
    tabStyle: {
      //padding: 10,
      //paddingHorizontal: 10,
      //marginHorizontal: 5,
      borderWidth: 0,
      //borderLeftWidth: 0,
      //borderLeftColor: "#f5f5f5",
      //borderEndWidth: 0,
      borderColor: colors.green,
      //   maxWidth: 120,
      backgroundColor: colors.green,
      //color: colors.green,
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
  align-items: center;
 
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
  const ProjectsContainer = styled.ScrollView`
    ${'' /* background: white; */}
    flex: 1;
    padding-top: 10px;
    padding-horizontal: 30px;
  `;
  
  const ProjectsWrap = styled.View``;
  
  const ProjectCard = styled.View`
    background-color: white;
    padding-horizontal: ${wp('5%')};
    z-index: 10;
    background-color: ${colors.white};
    border-radius: ${wp('3%')};
    min-width: 40%;
    min-height: ${hp('10%')};
    shadow-color: #000;
    shadow-offset: 1px;
    shadow-opacity: 0.1;
    shadow-radius: 5;
    elevation: 2;
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
  font-size: ${wp('3.1%')}
    margin-top: ${hp('1.8%')};
    line-height: ${hp('1.8%')};
    font-weight: 300;
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