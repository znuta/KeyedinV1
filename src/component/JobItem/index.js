import React, {useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import styled from 'styled-components/native';
import ReadMore from 'react-native-read-more-text';
import {colors, fonts, hp, wp} from 'src/config/variables';
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import TimeAgo from 'react-native-timeago';
import moment from 'moment';

const JobItem = ({ item, index, onPress = ()=>{} }) => {
const defaultImage = 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1222&q=80'
  const _renderTruncatedFooter = handlePress => {
    return <View style={{marginBottom: hp('0.5%')}}></View>;
  };

  const _renderRevealedFooter = handlePress => {
    return (
      <Text
        style={{color: '#000', marginTop: 5, fontWeight: '500', fontSize: 14}}
        //onPress={handlePress}
      >
        Show less
      </Text>
    );
  };

    return (
      <TouchableOpacity
        onPress={onPress}>
        <View
          style={{
            marginHorizontal: wp('3.5%'),
            marginVertical: hp('1.5%'),
            marginBottom: 0,
            flex: 1,
            borderRadius: 12,
            backgroundColor: colors.white,
            padding: wp('2%'),
            shadowColor: '#000',
            shadowOffset: {
              width: 2,
              height: 1,
            },
            shadowOpacity: 0.1,
            shadowRadius: 4,

            elevation: 10,
          }}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                width: 50,
                height: 50,
                marginRight: 10,
              }}>
              <Image
                source={{uri: item.avatar || defaultImage}}
                style={{width: wp('12%'), height: wp('12%'), borderRadius: 50}}
              />
            </View>

            <View
              style={{width: '70%'}}
              >
              <ReadMore
                numberOfLines={1}
                renderTruncatedFooter={_renderTruncatedFooter}
                renderRevealedFooter={_renderRevealedFooter}>
                <SectionTitle>{item.name}</SectionTitle>
              </ReadMore>
              <View>
                <View
                  style={{
                    flex: 1,
                  }}>
                  <ReadMore
                    numberOfLines={4}
                    renderTruncatedFooter={_renderTruncatedFooter}
                    renderRevealedFooter={_renderRevealedFooter}>
                    <DescriptionText style={{flex: 1}}>
                      {item.description}
                    </DescriptionText>
                  </ReadMore>
                </View>
              </View>
            </View>

            <View
              style={{
                marginLeft: 'auto',
                marginRight: wp('1%'),
              }}>
              <TouchableOpacity
                onPress={() => {
                  ///TODO: implement the love module
                  alert('to be implemented, awaiting design');
                }}>
                <Feather
                  name="heart"
                  style={{fontSize: wp('5%')}}
                  color={colors.disabled}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              flex: 1,
              marginTop: hp('0.5%'),
            }}>
            <View
              style={{
                flexDirection: 'row',
                //backgroundColor: "yellow",
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexWrap: 'wrap',
                width: '75%',
                flex: 1,
              }}>
              {item.skill_set.length > 2 ? (
                <>
                  
                  <SkillBadge>
                    <Text
                      style={{
                        fontSize: wp('2.8%'),
                        fontWeight: '700',
                        color: colors.green,
                      }}>
                      {item.skill_set[0]}
                    </Text>
                  </SkillBadge>
                  <SkillBadge>
                    <Text
                      style={{
                        fontSize: wp('2.8%'),
                        fontWeight: '700',
                        color: colors.green,
                      }}>
                      {item.skill_set[1]}
                    </Text>
                  </SkillBadge>
                  <Text style={{color: colors.medium, fontSize: wp('3%')}}>
                    {' '}
                    + {item.skill_set.length - 1}
                  </Text>
                </>
              ) : (
                item.skill_set.map((skill, index) => (
                  <SkillBadge key={index.toString()}>
                    <Text
                      style={{
                        fontSize: wp('2.8%'),
                        fontWeight: '700',
                        color: colors.green,
                      }}>
                      {skill}
                    </Text>
                  </SkillBadge>
                ))
              )}
              
              {/* skill will be here */}

              <MaterialIcons
                name="location-on"
                style={{
                  fontSize: wp('3%'),
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
                {item.city}
              </Text>
              <Text> </Text>

              <TimeWrapper>{moment(item.createdAt, "YYYYMMDD").fromNow() ||"5 min ago"}</TimeWrapper>
              {/* <TimeAgo
                style={{
                  fontSize: wp('2.5%'),
                  color: 'grey',
                  marginLeft: 'auto',
                  marginRight: wp('1.5%'),
                }}
               
                dateTo={item.createdAt}
              /> */}
            
            </View>
            
          </View>
        </View>
      </TouchableOpacity>
    );
};

export default JobItem
  
const TimeWrapper = styled.Text`
  font-size: ${wp('2.5%')};
  color: ${colors.lightgrey};
  font-weight: 300;
  margin-left: auto;
`;
const SkillBadge = styled.View`
  background-color: rgba(142, 135, 241, 0.1);
  padding: 6px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 8px;
  margin-right: ${wp('2%')};
`;
const SectionTitle = styled.Text`
  font-weight: 700;
  font-size: ${wp('4%')};
  color: rgba(19, 24, 68, 0.7);
  line-height: 25px;
  font-family: ${fonts.PRIMARY_REGULLAR}
`;
const GreenText = styled.Text`
  font-weight: 700;
  font-size: ${wp('5%')};
  color: ${colors.green};
`;
const DescriptionText = styled.Text`
font-size: ${wp('3%')}
margin-top: ${hp('1.8%')};
line-height: ${hp('1.8%')};
font-weight: 400;
color: ${colors.medium};
font-family: ${fonts.PRIMARY_REGULLAR}
`;
