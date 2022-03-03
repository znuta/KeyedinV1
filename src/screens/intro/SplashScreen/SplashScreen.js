import React, {useState, useEffect} from 'react';
import {StatusBar, View, StyleSheet, Text, Button} from 'react-native';
// import AnimatedSplash from 'react-native-animated-splash-screen';
import {colors} from 'src/config/variables';
import {useSelector, useDispatch} from 'react-redux';
import Navigation from '../../../navigation/navigation';
import Toast from 'src/component/Toast';
import { setToast } from 'src/redux/actions/AuthActions';

const SplashScreen = props => {
  const dispatch = useDispatch();
  const {auth, intro} = useSelector(state => state);
  const {toast = {}} = auth
  const [loaded, setLoaded] = useState(false);

  

  

  useEffect(() => {
    StatusBar.setHidden(true);
    setTimeout(() => {
      setLoaded(true);
    }, 1500);
  }, []);

  useEffect(() => {
  if (toast.show) {
    setTimeout(() => {
      dispatch(setToast({message:"", show: false}));
    }, 3000);
  }
    
  }, [toast]);

  const _completeOnboarding = () => {
    // this.props.setFirstLaunch(false);
  };

  return (
    <View style={styles.container}>
      {/* <AnimatedSplash
        translucent={false}
        isLoaded={loaded}
        logoImage={require('../../assets/keyedinGoldLogo.png')}
        backgroundColor={colors.primary}
        logoHeight={150}
        logoWidth={150}> */}
        <Navigation />
        {/* <AuthNav /> */}
        {/* {!this.props.auth.regComplete && this.props.intro.firstLaunch ? <Intro /> : <Auth />}
          {this.props.auth.regComplete && <Main />} */}
        {/* {!auth.regComplete ? (
          intro.firstLaunch ? (
            <IntroNav />
          ) : (
            <AuthNav />
          )
        ) : (
          // <Main />
          <IntroNav />
        )} */}
      {/* </AnimatedSplash> */}

      <Toast {...toast} />
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
});

export default SplashScreen;
// export default connect()
