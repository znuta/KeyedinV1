import React, {useEffect} from 'react';
import {
  StatusBar,
} from 'react-native';
import AnimatedMultistep from 'react-native-animated-multistep';

import OTP from 'src/screens/intro/ForgotPassword/OTP';
import Email from 'src/screens/intro/ForgotPassword/Email';
import Password from 'src/screens/intro/ForgotPassword/Password';

import {useNavigation} from '@react-navigation/native';


const Steps = [
  {name: 'User Email', component: Email},
  {name: 'One Time Password', component: OTP},
  {name: 'New Password', component: Password},
  
];


const ForgotPassword = () => {
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

export default ForgotPassword;

