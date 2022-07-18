import React, { useEffect } from "react";
import { View, StatusBar } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

// import ImageViewer from "./ImageViewer";
// import Messages from "./Messages";
// import CallingScreen from "./CallingScreen";
// import {ChatScreen} from "./ChatScreen";
import Conversations from "./Conversations";

const Stack = createStackNavigator();

const MessageScreen = () => {
  // useEffect(() => {
  //   StatusBar.setHidden(false);
  // }, []);

  return (
    // <View style={{ flex: 1 }}>
    //   <ProjectsList />
    // </View>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="Conversations" component={Conversations} />
      {/* <Stack.Screen name="ChatScreen" component={ChatScreen} /> */}
      {/* <Stack.Screen name="CallingScreen" component={CallingScreen} /> */}
    </Stack.Navigator>
  );
};

export default MessageScreen;
