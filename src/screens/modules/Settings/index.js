import React, {useEffect} from 'react';
import {StatusBar, TouchableOpacity, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components';
import SettingsLobby from './SettingsLobby';
// import EditProfile from './EditProfile';
import GovernmentVerification from './IDVerification';
import ChangePassword from './ChangePassword';
import {createStackNavigator} from '@react-navigation/stack';
// import EditUser from './EditUser';


const Stack = createStackNavigator();

const Settings = () => {
  const navigation = useNavigation();
  useEffect(() => {
    StatusBar.setHidden(false);
  }, []);

  return (
   
    <View style={{flex: 1}}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}>
              <Stack.Screen name="SettingsLobby" component={SettingsLobby} />
              <Stack.Screen
          name="GovernmentVerification"
          component={GovernmentVerification}
        />
         <Stack.Screen name="ChangePassword" component={ChangePassword} />
        {/* <Stack.Screen name="EditProfile" component={EditProfile} />
       
        <Stack.Screen name="EditUser" component={EditUser} /> */}
      </Stack.Navigator>
    </View>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

export default Settings;
