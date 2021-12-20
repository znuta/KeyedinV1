import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import TimeAgo from 'react-native-timeago';
import styled from 'styled-components';
import {
  Feather,
  MaterialIcons,
} from '@expo/vector-icons';
import ReadMore from 'react-native-read-more-text';
import {useNavigation} from '@react-navigation/native';
import {colors, hp, wp} from '../../../config/variables';

const ProposalItem = ({ item, index }) => {
    return (
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
    );
};
  
export default ProposalItem

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