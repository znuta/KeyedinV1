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
import {colors, hp, wp} from 'src/config/variables';
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import TimeAgo from 'react-native-timeago';

const JobItem = ({ item, index, onPress = ()=>{} }) => {

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
            marginVertical: 15,
            marginBottom: 0,
            flex: 1,
            borderRadius: 12,
            backgroundColor: colors.white,
            padding: wp('2%'),
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 1.41,

            elevation: 2,
          }}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                width: 50,
                height: 50,
                marginRight: 10,
              }}>
              <Image
                source={{uri: item.user.avatar ?? defaultImage}}
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
                <SectionTitle>{item.title}</SectionTitle>
              </ReadMore>
              <View>
                <View
                  style={{
                    flex: 1,
                  }}>
                  <ReadMore
                    numberOfLines={3}
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
              {item.skills.length > 2 ? (
                <>
                  
                  <SkillBadge>
                    <Text
                      style={{
                        fontSize: wp('2.8%'),
                        fontWeight: '700',
                        color: colors.green,
                      }}>
                      {item.skills[0]}
                    </Text>
                  </SkillBadge>
                  <SkillBadge>
                    <Text
                      style={{
                        fontSize: wp('2.8%'),
                        fontWeight: '700',
                        color: colors.green,
                      }}>
                      {item.skills[1]}
                    </Text>
                  </SkillBadge>
                  <Text style={{color: colors.medium, fontSize: wp('3%')}}>
                    {' '}
                    + {item.skills.length - 1}
                  </Text>
                </>
              ) : (
                item.skills.map((skill, index) => (
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
                {item.state}
              </Text>
              <Text> </Text>
              <TimeAgo
                style={{
                  fontSize: wp('2.5%'),
                  color: 'grey',
                  marginLeft: 'auto',
                  marginRight: wp('1.5%'),
                }}
                dateFrom={item.created_at}
                dateTo={new Date()}
              />
            
            </View>
            
          </View>
        </View>
      </TouchableOpacity>
    );
};

export default JobItem
  

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
  font-size: ${wp('3.5%')};
  color: rgba(19, 24, 68, 0.7);
`;
const GreenText = styled.Text`
  font-weight: 700;
  font-size: ${wp('5%')};
  color: ${colors.green};
`;
const DescriptionText = styled.Text`
  font-size: ${wp('3%')};
  letter-spacing: 0px;
  color: rgba(19, 24, 68, 0.5);
  line-height: ${wp('3.8%')};
  font-weight: 500;

  flex: 1;
`;
