/**
 * @format
 */



//  import React, {useState, useEffect} from 'react';
 import {AppRegistry, } from 'react-native';
 import App from './App';
 import {name as appName} from './app.json';
 import RNPaystack from 'react-native-paystack';
//  import messaging from '@react-native-firebase/messaging';
 
 
 // Register background handler
//  messaging().setBackgroundMessageHandler(async remoteMessage => {
//    console.log('Message handled in the background!', remoteMessage);
//  });
 RNPaystack.init({ publicKey: 'pk_live_87326b671916bc0636f27f396f4f9789410bf1ef' });

//  function HeadlessCheck({ isHeadless }) {
//   if (isHeadless) {
//     // App has been launched in the background by iOS, ignore
//     return null;
//   }

//   return <App />;
// }
 
 AppRegistry.registerComponent(appName, () => App);
 