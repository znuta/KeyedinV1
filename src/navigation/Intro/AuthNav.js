import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// import GetStarted from './GetStarted';
import UserLogin from 'src/screens/intro/Login/UserLogin';
import Auth from 'src/screens/intro/Signup';
import Intro from 'src/screens/intro/Intro/Intro';
import {useSelector, useDispatch} from 'react-redux';
import ForgotPassword from 'src/screens/intro/ForgotPassword';

const Stack = createStackNavigator();
function AuthNav(props) {
  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);
  
  return (
   
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
          <Stack.Screen name="Intro" component={Intro} />
          {/* <Stack.Screen name="GetStarted" component={GetStarted} /> */}
          <Stack.Screen name="UserLogin" component={UserLogin} />
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        
    </Stack.Navigator>

  );
}
export default AuthNav;
