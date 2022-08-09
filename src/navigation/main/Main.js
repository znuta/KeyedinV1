import React, { Component } from "react";
import { StyleSheet } from "react-native";
import BottomTabs, { pushToScreen } from "./BottomTabs";
import {
  getAllCategories,
  initUser,
  sendUserDetails,
  saveAvatar,
  saveBalance
} from "src/redux/actions/AuthActions";
import { BASEURL } from "src/constants/Services";
import {useSelector, useDispatch, connect} from 'react-redux';
import { ZEGO_SERVER_URL, ZEGO_APPID } from 'src/constants/Services';
import { saveZegoToken } from 'src/redux/actions/AuthActions';
import messaging from '@react-native-firebase/messaging';
import { Platform, Alert } from 'react-native'
import notifee, { AuthorizationStatus, EventType, AndroidImportance, AndroidVisibility } from '@notifee/react-native';

//\/\/\/\/\/\/\/\/\/\/\/\/\/ 👉👉👉👉 READ THIS IF YOU WANT TO DO MORE 👈👈👈 \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
// For how to use Firebase in ReactNative: https://rnfirebase.io/
// For how to display notification in ReactNative: https://notifee.app/react-native/docs/overview
// For how to use ZEGOCLOUD's API: https://docs.zegocloud.com/article/6674
///\/\/\/\/\/\/\/\/\/\/\/\/\ 👉👉👉👉 READ THIS IF YOU WANT TO DO MORE 👈👈👈 /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\


///\/\/\/\/\/\/\/\/\/\/\/\/\ 🔔🔔🔔 READ THIS IF YOU WANT TO DO MORE 🔔🔔🔔 /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// For android only.
// More doc: https://notifee.app/react-native/docs/android/channels
notifee.createChannel({
  id: 'callinvite',
  name: 'Call Invite',
  badge: false,
  vibration: true,
  vibrationPattern: [300, 500],
  importance: AndroidImportance.HIGH,
  visibility: AndroidVisibility.PUBLIC,
  // Check below link for get more sound \/\/\/\/\/\/\/
  // https://clideo.com/merge-audio
  // https://www.zedge.net/find/ringtones/sound-effects
  sound: 'call_invite',
});

notifee.onBackgroundEvent(async ({ type, detail }) => {
   if (type === EventType.PRESS) {
      console.log('User press on background event: ', detail)
      pushToScreen('CallingScreen', { 'roomID': detail.notification.data.roomID, 'callType': detail.notification.data.callType,  entity: detail.notification.data })
      // await notifee.cancelNotification(detail.notification.id);
      await notifee.cancelAllNotifications();
   } else if (type === EventType.ACTION_PRESS && detail.pressAction.id) {
    console.log('User pressed the "Mark as read" action.');
    if (detail.pressAction.id == 'accept') {
      console.log('Accept the call...', detail.notification.data.roomID)
      this.handleIncomingCall(detail.notification.data.roomID,detail.notification.data.callType, detail.notification.data );
   }
   await notifee.cancelAllNotifications();
  }
});

// async function setCategories() {
//   await notifee.setNotificationCategories([
//     {
//       id: 'message',
//       actions: [
//         {
//           id: 'accept',
//           title: 'Accept',
//           pressAction: {
//            id: 'accept',
//         },
//         },
//         {
//            title: 'Denied',
//            id: 'denied',
//            //   icon: 'https://my-cdn.com/icons/snooze.png',
//            pressAction: {
//               id: 'denied',
//            },
//         },
//       ],
//     },
//   ]);
// }

//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/ Code for APP been killed \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/

// Store the RoomID in global section while the APP has been killed. 
// Then you can read it on App component call 'componentDidMount', if this variable with an empty value means it launches by the user, otherwise, launch by FCM notification.
var killedIncomingCallRoomId = '';
var killedIncomingCallType = '';
var entity = '';

// Display a message while APP has been killed, trigger by FCM
async function onBackgroundMessageReceived(message) {

  await notifee.setNotificationCategories([
     {
       id: 'message',
       actions: [
         {
           id: 'accept',
           title: 'Accept',
           pressAction: {
            id: 'accept',
         },
         },
         {
            title: 'Denied',
            id: 'denied',
            //   icon: 'https://my-cdn.com/icons/snooze.png',
            pressAction: {
               id: 'denied',
            },
         },
       ],
     },
   ]);
  // invokeApp();
  console.log(">>>>>>>>>>Message: ", message, message.data.callerUserName);
  killedIncomingCallRoomId = message.data.roomID;
  killedIncomingCallType = message.data.callType;
  entity = message.data;
  
  notifee.displayNotification({
   title:  message.data.callerUserName + ' incoming call..',
     body: 'Tap to view contact.',
     data: { "roomID": message.data.roomID, "callType": message.data.callType },
     android: {
        channelId: 'callinvite',
        largeIcon: message.data.callerIconUrl,
        // Launch the app on lock screen
        fullScreenAction: {
           // For Android Activity other than the default:
           id: 'full_screen_body_press',
           launchActivity: 'default',
        },
        pressAction: {
           id: 'body_press',
           launchActivity: 'default',
        },
        actions: [
           {
              title: 'Denied',
              //   icon: 'https://my-cdn.com/icons/snooze.png',
              pressAction: {
                 id: 'denied',
              },
           },
           {
              title: 'Accept',
              //   icon: 'https://my-cdn.com/icons/snooze.png',
              pressAction: {
                 id: 'accept',
                 launchActivity: 'default',
              },
           },
        ],
     },
     ios: {
        channelId: 'callinvite',
        largeIcon: message.data.callerIconUrl,
        // Launch the app on lock screen
        fullScreenAction: {
           // For Android Activity other than the default:
           id: 'full_screen_body_press',
           launchActivity: 'default',
        },
        pressAction: {
           id: 'body_press',
           launchActivity: 'default',
        },
        actions: [
           {
              title: 'Denied',
              id: 'denied',
              //   icon: 'https://my-cdn.com/icons/snooze.png',
              pressAction: {
                 id: 'denied',
              },
           },
           {
              id: 'accept',
              title: 'Accept',
              foreground: true,
              //   icon: 'https://my-cdn.com/icons/snooze.png',
              pressAction: {
                 id: 'accept',
                 launchActivity: 'default',
              },
           },
        ],
     },
  });
  console.log('Show completed.')
}

// Handle message while APP has been killed
messaging().setBackgroundMessageHandler(onBackgroundMessageReceived);

///\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\ Code for APP been killed /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

class Main extends Component {
  routesInstance;
  navigationRef;
  messageListener;

  state = {
     userID: this.props.auth.userData.id,
     zegoToken: '',
     fcmToken: '',
  }

  componentDidMount() {
     this.onAppBootstrap();
    
  }

  componentWillUnmount() {
     this.messageListener;
  }

  handleIncomingCall(roomID,callType, entity) {
     console.log('Navigate to home with incoming call..........', roomID);
     pushToScreen('CallingScreen', { 'roomID': roomID, 'callType': callType, entity })
  }

  async onAppBootstrap() {
     await this.checkPermission();

     await this.prepareBasicData();

     await this.setupNotification();

     // If this variable comes with a non-empty value, means the APP launched by FCM notification. Then jump to incoming call logic
     if (killedIncomingCallRoomId != '') {
        this.handleIncomingCall(killedIncomingCallRoomId, killedIncomingCallType, entity );
     }
  }

  //////////////////////////// notification /////////////////////////
  async setupNotification() {
     // When APP is open or in the foreground, any notification interaction with the user will trigger this event
     // Read more doc: https://notifee.app/react-native/docs/events#foreground-events
     notifee.onForegroundEvent(async ({ type, detail }) => {
        if (type === EventType.PRESS) {
           console.log('User press on froeground event: ', detail)
           console.log('Accept the call...', detail.notification.data.roomID)
         //   pushToScreen('CallingScreen', { 'callingID': detail.notification.data.roomID, 'callType': detail.notification.data.callType, entity: detail.notification.data})
         this.handleIncomingCall(detail.notification.data.roomID, detail.notification.data.callType, detail.notification.data);
          //  this.handleIncomingCall(detail.notification.data.roomID, detail.notification.data.callType);
           await notifee.cancelAllNotifications();
        } else if (type == EventType.ACTION_PRESS && detail.pressAction.id) {
           if (detail.pressAction.id == 'accept') {
              console.log('Accept the call...', detail.notification.data.roomID)
              this.handleIncomingCall(detail.notification.data.roomID, detail.notification.data.callType, detail.notification.data);
           }
           
           await notifee.cancelAllNotifications();
        }
     });
     // When APP has been killed or in the background,  any notification interaction with the user will trigger this event
     // Read more doc: https://notifee.app/react-native/docs/events#background-events
     notifee.onBackgroundEvent(async ({ type, detail }) => {
        if (type === EventType.PRESS) {
           console.log('User press on background event: ', detail)
           this.handleIncomingCall(detail.notification.data.roomID, detail.notification.data.callType, detail.notification.data);
         //   pushToScreen('CallingScreen', { 'callingID': detail.notification.data.roomID, 'callType': detail.notification.data.callType,  entity: detail.notification.data })
           // await notifee.cancelNotification(detail.notification.id);
           await notifee.cancelAllNotifications();
        } else if (type == EventType.ACTION_PRESS && detail.pressAction.id) {
           if (detail.pressAction.id == 'accept') {
              console.log('Accept the call...', detail.notification.data.roomID)
              this.handleIncomingCall(detail.notification.data.roomID,detail.notification.data.callType, detail.notification.data );
           }
           await notifee.cancelAllNotifications();
        }
     });
     
         // try {
            // Binding FCM message callback for APP in foreground
            this.messageListener = messaging().onMessage(this.onMessageReceived);
         // } catch (error) {
         //    console.log("___ERRRROR___", error)
         // }
    
  }

  // Receive message from FCM and display the notification
  async onMessageReceived(message) {
     // invokeApp();
     pushToScreen('CallingScreen', { 'roomID': message.data.roomID, 'callType': message.data.callType,  entity: message.data })
     console.log(">>>>>>>>>>Foreground Message: ", message, message.data.callerUserName);
     notifee.displayNotification({
        title:  message.data.callerUserName + ' incoming call..',
        body: 'Tap to view contact.',
        data: { "roomID": message.data.roomID, "callType": message.data.callType },
        android: {
           channelId: 'callinvite',
           largeIcon: message.data.callerIconUrl,
           // Launch the app on lock screen
           fullScreenAction: {
              // For Android Activity other than the default:
              id: 'full_screen_body_press',
              launchActivity: 'default',
           },
           pressAction: {
              id: 'body_press',
              launchActivity: 'default',
           },
           actions: [
              {
                 title: 'Denied',
                 //   icon: 'https://my-cdn.com/icons/snooze.png',
                 pressAction: {
                    id: 'denied',
                    launchActivity: 'default',
                 },
              },
              {
                 title: 'Accept',
                 //   icon: 'https://my-cdn.com/icons/snooze.png',
                 pressAction: {
                    id: 'accept',
                    launchActivity: 'default',
                 },
              },
           ],
        },
        ios: {
           channelId: 'callinvite',
           largeIcon: message.data.callerIconUrl,
           // Launch the app on lock screen
           fullScreenAction: {
              // For Android Activity other than the default:
              id: 'full_screen_body_press',
              launchActivity: 'default',
           },
           pressAction: {
              id: 'body_press',
              launchActivity: 'default',
           },
           actions: [
              {
                 title: 'Denied',
                 id: 'denied',
                 //   icon: 'https://my-cdn.com/icons/snooze.png',
                 pressAction: {
                    id: 'denied',
                    launchActivity: 'default',
                 },
              },
              {
                 title: 'Accept',
                 id: 'accept',
                 //   icon: 'https://my-cdn.com/icons/snooze.png',
                 pressAction: {
                    id: 'accept',
                    launchActivity: 'default',
                 },
              },
           ],
        },
     });
     console.log('Show completed.')
  }
  //////////////////////////// notification /////////////////////////

  //////////////////////////// basic data /////////////////////////
  async prepareBasicData() {
     console.log("___ITEM__+++++")
     // Get fcm token
     await this.updateFcmToken();
     // Generate user id
   //   this.setState({
   //      userID: Math.floor(Math.random() * 1000000).toString()
   //   })
     // Save the fcm token with user id to server, then you can invite someone to call by user's id
     const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userID: this.state.userID, token: this.state.fcmToken })
     };
     const reps = await fetch(`${ZEGO_SERVER_URL}/store_fcm_token`, requestOptions);
     console.log('Store fcm token reps: ', reps);
     await this.updateZegoToken();
  }

  // Request Zego Token for access ZEGO's API
  // Read more doc: https://docs.zegocloud.com/article/11649
  async updateZegoToken() {
     // Obtain the token interface provided by the App Server
     const reps = await fetch(
        `${ZEGO_SERVER_URL}/access_token?uid=${this.state.userID}`,
        {
           method: 'GET',
           headers: {
              'Content-Type': 'application/json; charset=utf-8',
           },
        },
     );
     if (reps.ok) {
        const tokenObj = await reps.json();
        console.log('Get zego token succeed');
        this.setState({
           zegoToken: tokenObj['token']
        });
        this.props.saveZegoToken(tokenObj['token'])
     } else {
        console.warn('Get zego token error: ', reps);
     }
  };

  // Request FCM token and binding with user id for make the call invitation
  // Every device has the unique FCM token
  // Read more doc: https://rnfirebase.io/messaging/usage
  async updateFcmToken() {
     // Register the device with FCM
     await messaging().registerDeviceForRemoteMessages();

     // Get the token
     const token = await messaging().getToken();
     console.log('Fcm token: ', token);
     this.setState({
        fcmToken: token
     });

  }
  //////////////////////////// basic data /////////////////////////

  //////////////////////////// permission stuffs /////////////////////////
  async checkPermission() {
     // For android
     if (Platform.OS === 'android') {
        await this.checkAndroidNotificationPermission();
        await this.checkAndroidChannelPermission('callinvite');
        await this.checkBatteryOptimization();
        await this.checkPowerManagerRestrictions();
     }
     // For ios 
     else {
        await this.requestiOSUserPermission();
     }
  }

  async checkAndroidNotificationPermission() {
     const settings = await notifee.getNotificationSettings();

     if (settings.authorizationStatus == AuthorizationStatus.AUTHORIZED) {
        console.log('Notification permissions has been authorized');
     } else if (settings.authorizationStatus == AuthorizationStatus.DENIED) {
        console.log('Notification permissions has been denied');
     }
  }

  async checkAndroidChannelPermission(channelId) {
     const channel = await notifee.getChannel(channelId);
     console.log(">>>>>>>>", channel)

     if (!channel) {
        console.warn('Channel has not been created!');
     } else if (channel.blocked) {
        console.log('Channel is disabled');
        Alert.alert(
           'Restrictions Detected',
           'To ensure notifications are delivered, please enable notification for the app.',
           [
              // 3. launch intent to navigate the user to the appropriate screen
              {
                 text: 'OK, open settings',
                 onPress: async () => await notifee.openNotificationSettings(),
              },
              {
                 text: "Cancel",
                 onPress: () => console.log("Cancel Pressed"),
                 style: "cancel"
              },
           ],
           { cancelable: false }
        );
     } else {
        console.log('Channel is enabled');
     }
  }

  // Need for background message
  async requestiOSUserPermission() {
     const authStatus = await messaging().requestPermission();
     const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

     if (enabled) {
        console.log('Authorization status:', authStatus);
     }
  }

  async checkBatteryOptimization() {
     const batteryOptimizationEnabled = await notifee.isBatteryOptimizationEnabled();
     console.log("batteryOptimizationEnabled", batteryOptimizationEnabled)
     if (batteryOptimizationEnabled) {
        // 2. ask your users to disable the feature
        Alert.alert(
           'Restrictions Detected',
           'To ensure notifications are delivered, please disable battery optimization for the app.',
           [
              // 3. launch intent to navigate the user to the appropriate screen
              {
                 text: 'OK, open settings',
                 onPress: async () => await notifee.openBatteryOptimizationSettings(),
              },
              {
                 text: "Cancel",
                 onPress: () => console.log("Cancel Pressed"),
                 style: "cancel"
              },
           ],
           { cancelable: false }
        );
     };
  }

  async checkPowerManagerRestrictions() {
     const powerManagerInfo = await notifee.getPowerManagerInfo();
     console.log("powerManagerInfo", powerManagerInfo.activity)
     if (powerManagerInfo.activity) {
        // 2. ask your users to adjust their settings
        Alert.alert(
           'Restrictions Detected',
           'To ensure notifications are delivered, please adjust your settings to prevent the app from being killed',
           [
              // 3. launch intent to navigate the user to the appropriate screen
              {
                 text: 'OK, open settings',
                 onPress: async () => await notifee.openPowerManagerSettings(),
              },
              {
                 text: "Cancel",
                 onPress: () => console.log("Cancel Pressed"),
                 style: "cancel"
              },
           ],
           { cancelable: false }
        );
     };
  }

  //////////////////////////// permission stuffs /////////////////////////

  render() {
   
     if (this.state.userID != '' && this.state.zegoToken != '' && this.state.fcmToken != '') {
        var appData = {
           appID: ZEGO_APPID,
           serverUrl: ZEGO_SERVER_URL,
           userID: this.state.userID,
           zegoToken: this.state.zegoToken,
        }
      
  return (
      <BottomTabs />
      )
    } else {
       return (null)
    }
  }
  
  }

const mapStateToProps = (state)=>{

  return{
    auth: state.auth
  }

}
const mapDispatchToProps = (dispatch)=>{

  return{

    saveZegoToken: (token) => dispatch(saveZegoToken(token))

  }
 
}
export default connect(mapStateToProps,mapDispatchToProps)(Main);

