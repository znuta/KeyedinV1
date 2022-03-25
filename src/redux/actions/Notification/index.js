import {decode, encode} from 'base-64';
import {CometChat} from '@cometchat-pro/react-native-chat';
import messaging from '@react-native-firebase/messaging';
import {HIDE_NOTIFICATION, SHOW_NOTIFICATION} from 'src/redux/action-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
var topics = []
export const showNotification = (status, message) => {
  return {
    type: SHOW_NOTIFICATION,
    payload: {status, message},
  };
};

export const hideNotification = () => {
  return {
    type: HIDE_NOTIFICATION,
  };
};


export const createNotificationListeners =()=> {
    // const messageListener = messaging.call().onMessage(async remoteMessage => {
    //   Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    // });
  }
export  const getFCMToken = async () =>{
    const token = await AsyncStorage.getItem("artisan_notification_token")
   console.log("___DEVICE__S_", token)
    if (!token) {
     
        try {
            // await messaging().registerDeviceForRemoteMessages();
             const new_token = await messaging().getToken();
             console.log("___DEVICE__F_", new_token)
             if (new_token) {
                await AsyncStorage.setItem("artisan_notification_token", new_token)
                return new_token
             }
            } catch (error) {
              
            }
    }

    return false
   
  }
  export const checkPermission = async () =>{
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      return true
    }

    return false
   
  }
  const unsubscribeFromPushNotification = () =>{
    topics.forEach(async topic => {
      await messaging.unsubscribeFromTopic(topic);
    });
  }