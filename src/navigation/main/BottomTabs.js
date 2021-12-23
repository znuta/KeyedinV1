import React from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Homebtn from 'src/assets/icons/homebtn.svg';
import Homebtnalt from 'src/assets/icons/homebtnalt.svg';

import Projectbtn from 'src/assets/icons/projectbtn.svg';
import Projectbtnalt from 'src/assets/icons/projectbtnalt.svg';

import Proposalbtn from 'src/assets/icons/proposalbtn.svg';
import Proposalbtnalt from 'src/assets/icons/proposalbtnalt.svg';

import Messagebtn from 'src/assets/icons/messagebtn.svg';
import Messagebtnalt from 'src/assets/icons/messagebtnalt.svg';

import Walletbtn from 'src/assets/icons/walletbtn.svg';
import Walletbtnalt from 'src/assets/icons/walletbtnalt.svg';
//import the screens
import Home from 'src/screens/modules/Home';
// import Projects from 'src/screens/modules/Projects/Projects';
// import Settings from 'src/screens/modules/Settings/Settings';
// import Proposals from 'src/screens/modules/Projects/ProposalsList';
// import { ChatScreen } from "src/screens/modules/Messages/ChatScreen";
// import ArtisanProfile from 'src/screens/modules/Profile/ArtisanProfile';
// import Withdrawal from 'src/screens/modules/Wallet/Withdrawal';
// import Wallet from 'src/screens/modules/Wallet';
import ProjectApply from 'src/screens/modules/Home/ProjectDetail';
// import EditMyProfile from 'src/screens/modules/Settings/EditProfile';

// import EditEducation from 'src/screens/modules/Settings/EditEducation';
// import EditExpertise from 'src/screens/modules/Settings/EditExpertise';
// import EditEmployment from 'src/screens/modules/Settings/EditEmployment';
// import EditUser from 'src/screens/modules/Settings/EditUser';
// import Conversations from 'src/screens/modules/Messages/Conversations';
import {colors} from 'src/config/variables';
// import { CallingScreen } from 'src/screens/modules/Messages/CallingScreen';


const Tab = createBottomTabNavigator();

// function ProfileScreen() {
//   return <ArtisanProfile style={{flex: 1}} />;
// }

// function EditProfileScreen() {
//   return <EditMyProfile />;
// }

// function EditExpertiseScreen() {
//   return <EditExpertise />;
// }

// function SettingsScreen() {
//   return <Settings />;
// }



export function HomeTabs({navigation, route}) {


  return (
    <Tab.Navigator
      initialRouteName="Homex"
      screenOptions={{
        headerShown: false,
        
      }}
      tabBarOptions={{
        activeTintColor: colors.white, // Color of tab when pressed
        inactiveTintColor: '#b5b5b5', // Color of tab when not pressed
        activeBackgroundColor: colors.green,
        showIcon: 'true', // Shows an icon for both iOS and Android
        showLabel: 'true', //(Platform.OS !== 'android'), //No label for Android
        labelStyle: {
          fontSize: 11,
        },
        style: {
          //backgroundColor: colors.white, // Makes Android tab bar white instead of standard blue
          borderTopRightRadius: 35,
          borderTopWidth: 1,
          borderTopLeftRadius: 35,
          overflow: 'hidden',
          //height: (Platform.OS === 'ios') ? 58 : 60 // I didn't use this in my app, so the numbers may be off.
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size, focused}) =>
           
            focused ? <Homebtn /> : <Homebtnalt />,
        }}
        style={{borderTopLeftRadius: 25}}
      />

      {/* <Tab.Screen
        name="Projects"
        component={Projects}
        options={{
          tabBarLabel: 'Projects',
          tabBarIcon: ({color, size, focused}) =>
           
            focused ? <Projectbtn /> : <Projectbtnalt />,
        }}
      />
      <Tab.Screen
        name="Proposals"
        component={Proposals}
        options={{
          tabBarLabel: 'Proposals',
          tabBarIcon: ({color, size, focused}) =>
            focused ? <Proposalbtn /> : <Proposalbtnalt />,
        }}
      />
     
      <Tab.Screen
        name="Messages"
        component={Conversations}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({color, size, focused}) =>
            focused ? <Messagebtn /> : <Messagebtnalt />,
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          tabBarLabel: 'Wallet',
          tabBarIcon: ({color, size, focused}) =>
           
            focused ? <Walletbtn /> : <Walletbtnalt />,
        }}
      /> */}
      
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();
const BottomTabComponent = reduxProps => {
  
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}>
      <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeTabs} />
      <Stack.Screen name="Proposal" component={ProjectApply} />
      {/* <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Withdrawal" component={Withdrawal} />
      <Stack.Screen name="EditUser" component={EditUser} />
      <Stack.Screen name="EditExpertise" component={EditExpertiseScreen} />
      <Stack.Screen name="EditEmployment" component={EditEmployment} />
      <Stack.Screen name="EditEducation" component={EditEducation} />

      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="CallingScreen" component={CallingScreen} /> */}
      
    </Stack.Navigator>
  );
};

export default BottomTabComponent;
