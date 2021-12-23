import React, {useEffect} from 'react';
import {StatusBar, TouchableOpacity, Text} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import GetStarted from './GetStarted';
import Main from './main/Main';
import AuthNav from './Intro/AuthNav';

import {useSelector, useDispatch} from 'react-redux';

const Stack = createStackNavigator();

function Navigation() {
  const dispatch = useDispatch();
  const {auth, intro} = useSelector(state => state);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}>
        <Stack.Screen name="AuthNav" component={AuthNav} />
        <Stack.Screen options={{ headerShown: false }} name="Main" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
