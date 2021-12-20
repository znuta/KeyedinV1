import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, StatusBar} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Layout from 'src/constants/Layout';
import styled from 'styled-components';
import {TouchableHighlight} from 'react-native-gesture-handler';
import colors from 'src/config/colors';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {setFirstLaunch} from 'src/redux/actions/IntroActions';

const SlidesData = [
  {
    _id: 1,
    backgroundColor: colors.green2,
    image_url: 'src/assets/illustrations/slideone.png',
    titleBold: 'Relax,',
    titleLight: "we've got you",
    body: 'KeyedIn takes away the hassles and helps you find the perfect artisans for your projects.',
    color: '#ffffff',
    innerTitleColor: colors.white,
    bodycolor: colors.white,
  },
  {
    _id: 2,
    backgroundColor: '#fff',
    image_url: 'src/assets/illustrations/slidetwo.png',
    titleBold: 'Find the',
    titleLight: 'perfect pros',
    body: 'KeyedIn carefully vets and provides you the very best artisans and professionals (protisans) for all your projects.',
    color: 'black',
    innerTitleColor: colors.black,
    bodycolor: colors.black,
  },
  {
    _id: 3,
    backgroundColor: '#fff',
    image_url: 'src/assets/illustrations/slidethree.png',
    color: colors.green,
    innerTitleColor: colors.black,
    bodycolor: colors.black,
    titleBold: 'Track & manage',
    titleLight: 'projects',
    body: 'KeyedIn makes it easy for you to track and manage the progress of your projects from your mobile phone.',
  },
];

const Intro = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {intro} = useSelector(state => state);

  let [slides, setSlides] = useState(SlidesData);
  let [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    StatusBar.setHidden(true);
  }, []);

  const _renderSlide = ({item, index}) => {
    var img =
      item._id == 1
        ? require('src/assets/illustrations/slideone.png')
        : item._id == 2
        ? require('src/assets/illustrations/slidetwo.png')
        : require('src/assets/illustrations/slidethree.png');
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          justifyContent: 'center',
        }}>
        <View
          style={[
            styles.slideImage,
            {
              marginLeft: 25,
              // item._id == 1 ? 30 : 0,
            },
          ]}>
          <Image source={img} style={{...StyleSheet.absoluteFill}} />
        </View>
        <View style={styles.slideContent}>
          <Text style={[styles.slideTitle, {color: item.color}]}>
            {item.titleBold}{' '}
            <Text style={[styles.light, {color: item.innerTitleColor}]}>
              {item.titleLight}
            </Text>
          </Text>
          <Text
            style={[
              styles.slideBody,
              {color: item.bodycolor, textAlign: 'center'},
            ]}>
            {item.body}
          </Text>
          {/* <ArrowRight width={50} /> */}
        </View>
      </View>
    );
  };

  const _doneOnboarding = () => {
    dispatch(setFirstLaunch(false));
  };

  const _paginator = () => {
    var active = activeSlide;
    return (
      <View>
        <Pagination
          dotsLength={slides.length}
          activeDotIndex={active}
          containerStyle={{
            padding: 0,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',

            // maxWidth: "25%",
          }}
          dotStyle={{
            width: 10,
            height: 10,
            alignItems: 'center',
            borderRadius: 5,
            borderColor: colors.black,
            borderWidth: 1,
            backgroundColor:
              activeSlide == 1 ? 'rgba(255, 255, 255, 0.92)' : colors.green,
          }}
          inactiveDotOpacity={0.9}
          inactiveDotScale={0.8}
          activeOpacity={0.2}
        />
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: activeSlide <= 0 ? colors.green2 : colors.white,
        },
      ]}>
      <View style={styles.slidesContainer}>
        <Carousel
          ref={c => {
            let _carousel = c;
          }}
          data={slides}
          renderItem={_renderSlide}
          sliderWidth={Layout.window.width}
          itemWidth={Layout.window.width}
          onSnapToItem={
            index => setActiveSlide(index) /*setActiveSlide(index)*/
          }
        />
      </View>
      <View style={styles.sliderControls}>{_paginator()}</View>
      <View style={styles.myRectangle1}>
        <TouchableHighlight
          onPress={() => {
            _doneOnboarding();
            navigation.navigate('Auth');
          }}
          style={styles.myRectangle2}>
          <View>
            <Text style={styles.getStartedbtn}>Get Started</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            navigation.navigate('UserLogin');
            dispatch(setFirstLaunch(false));
          }}
          style={styles.myRectangle3}>
          <View>
            <Text style={styles.signInbtn}>Sign In</Text>
          </View>
        </TouchableHighlight>
      </View>

      {activeSlide == 1 ? (
        <StatusBar style="light" />
      ) : (
        <StatusBar style="dark" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  myRectangle1: {
    opacity: 1,
    position: 'relative',
    backgroundColor: 'rgba(48, 197, 123, 1)',
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: 'rgb(0,  0,  0)',
    shadowOpacity: 0.07058823529411765,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowRadius: 5,
    height: Layout.window.height * 0.2,
  },
  myRectangle2: {},
  myRectangle3: {
    opacity: 1,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: 'rgb(0,  0,  0)',
    shadowOpacity: 0.07058823529411765,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowRadius: 5,
    height: Layout.window.height * 0.2,
  },
  getStartedbtn: {
    opacity: 1,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 26,
    fontWeight: '700',
    fontStyle: 'normal',
    // "fontFamily": "Poppins",
    textAlign: 'center',
    marginTop: 20,
    marginRight: 0,
    marginBottom: 20,
    marginLeft: 0,
    lineHeight: 26,
    paddingTop: 2.6,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    height: 36,
  },
  signInbtn: {
    opacity: 1,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    color: 'rgba(48, 197, 123, 1)',
    fontSize: 26,
    fontWeight: '700',
    fontStyle: 'normal',
    // "fontFamily": "Poppins",
    textAlign: 'center',
    lineHeight: 26,
    marginTop: 15,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 2.6,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    height: 36,
  },
  slidesContainer: {
    flex: 1,
    width: '100%',
  },
  sliderControls: {
    height: Layout.window.height * 0.1,
    flexDirection: 'row',
    // paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    bottom: 0,
    width: Layout.window.width,
  },
  slideImage: {
    // backgroundColor: "#f4f6ff",
    width: Layout.window.width * 0.8,
    height: 300,
    // borderRadius: 20,
    marginBottom: 50,
  },
  slideContent: {
    //paddingHorizontal: 30,
    alignItems: 'center',
  },
  slideTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  light: {
    fontWeight: '400',
    //color:colors.black,
  },
  slideBody: {
    marginTop: 15,
    fontSize: 16,
    lineHeight: 25,
    fontWeight: '300',
    paddingHorizontal: 10,
  },
  shadowFirst: {
    alignItems: 'flex-start',
    opacity: 0.13,
    width: 58,
    height: 60,
    borderRadius: 18,
    backgroundColor: 'rgba(48, 197, 123, 255)',
  },
  shadowSecond: {
    alignItems: 'flex-start',
    marginStart: -43,
    opacity: 0.24,
    width: 58,
    height: 60,
    borderRadius: 18,
    backgroundColor: 'rgba(48, 197, 123, 255)',
  },
  shadowMain: {
    alignItems: 'flex-start',
    paddingStart: 17,
    paddingTop: 23,
    marginStart: -43,
    width: 58,
    height: 60,
    borderRadius: 18,
    backgroundColor: 'rgba(48, 197, 123, 255)',
  },
});

const ShadowBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: flex-start;
`;

export default Intro;
