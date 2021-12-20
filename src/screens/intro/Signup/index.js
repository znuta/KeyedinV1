import React, {useEffect} from 'react';
import {
  StatusBar,
} from 'react-native';
import AnimatedMultistep from 'react-native-animated-multistep';
import PhoneNumber from 'src/screens/intro/Signup/PhoneNumber';
import OTP from 'src/screens/intro/Signup/OTP';
import UserDetails from 'src/screens/intro/Signup/UserDetails';
import Employment from 'src/screens/intro/Signup/Employment';
import Education from 'src/screens/intro/Signup/Education';
import Expertise from 'src/screens/intro/Signup/Expertise';
import {useNavigation} from '@react-navigation/native';


const Steps = [
  {name: 'Phone Number Screen', component: PhoneNumber},
  {name: 'One Time Password', component: OTP},
  {name: 'Personal Information', component: UserDetails},
  {name: 'Expertise', component: Expertise},
  {name: 'Education', component: Education},
  {name: 'Employment', component: Employment}
];


const Auth = () => {
  const navigation = useNavigation();
  useEffect(() => {
    StatusBar.setHidden(false);
  }, []);

  const onNext = () => {
    console.log('Next');
  };

  const onBack = () => {
    console.log('Back');
  };

  const finish = finalState => {
    console.log(finalState);
  };
  
  return (
   
    <AnimatedMultistep
      steps={Steps}
      onFinish={finish}
      onBack={onBack}
      onNext={onNext}
      comeInOnNext="fadeInRight"
      OutOnNext="fadeOutLeft"
      comeInOnBack="fadeInLeft"
      OutOnBack="fadeOutRight"
    />
    
  );
};

export default Auth;

