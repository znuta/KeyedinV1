import React, {useEffect} from 'react';
import {StatusBar, TouchableOpacity, Text} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import messaging from '@react-native-firebase/messaging';
// import GetStarted from './GetStarted';
import Main from './main/Main';
import AuthNav from './Intro/AuthNav';

import {useSelector, useDispatch} from 'react-redux';

const Stack = createStackNavigator();
const Page = () =>{
  const navigation = useNavigation()
  const dispatch = useDispatch();
  const {auth, intro} = useSelector(state => state);
  const {token = ""} = auth
  console.log("__AUTH__LOG___", auth)
  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      // navigation.navigate(remoteMessage.data.type);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        setLoading(false);
      });
  }, []);

  return(
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}>
      {
      !token? <Stack.Screen name="AuthNav" component={AuthNav} />
       : 
        <Stack.Screen options={{ headerShown: false }} name="Main" component={Main} />
        }
   
   
  </Stack.Navigator>
  )

}
function Navigation() {
  const dispatch = useDispatch();
  const {auth, intro} = useSelector(state => state);
  return (
    <NavigationContainer>
     <Page />
    </NavigationContainer>
  );
}

export default Navigation;
