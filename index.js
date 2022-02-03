/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import RNPaystack from 'react-native-paystack';
import messaging from '@react-native-firebase/messaging';


// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
RNPaystack.init({ publicKey: 'pk_test_1e34e9552967b1582c1a943f41473079a1ab7038' });

AppRegistry.registerComponent(appName, () => App);
