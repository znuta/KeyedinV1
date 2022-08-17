/* eslint-disable keyword-spacing */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet,ImageBackground } from 'react-native';
import { CometChat } from '@cometchat-pro/react-native-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import styles from "./styles";
import { wp,colors,hp, fonts } from 'src/config/variables';
import Sound from 'react-native-sound';
import { ZEGO_APPID, ZEGO_SERVER_URL } from 'src/constants/Services';
import { useSelector } from 'react-redux';

export const CallingScreen = (props) => {
    const {params = {}} =  props.route

    console.log("___CALL__PROPS__", params)
    const {entity, callType, entityType,roomID, callingID, enableDefaultLayout,defaultLayout,acceptedFrom, isOutgoingCall, call = {}, userObject = {},outgoingCallAccepted = false, } = params
    const navigation = useNavigation();
    const [sessionID,setSessionID] = useState(call.sessionId)
    const [callingText, setCallingText] = useState("Calling...")
    const [muteMic,setMuteMic] = useState(false)
    const [isSpeaker,setSpeaker] = useState(false)
    const [callObject,setCallObject] = useState(call)
    const [callAccepted, setCallAccepted] = useState(outgoingCallAccepted)
    const {auth}  = useSelector(state => state)
    const appData = {
        appID: ZEGO_APPID,
        serverUrl: ZEGO_SERVER_URL,
        zegoToken: auth.zego_token,
        userID: auth.userData.id
    }
  
    // Sound.setCategory('Playback');
    var ding = new Sound('ringing_tone.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        // when loaded successfully
        console.log('duration in seconds: ' + ding.getDuration() + 'number of channels: ' + ding.getNumberOfChannels());
      });

        // useEffect(()=>{
        //     ding.setVolume(isSpeaker?1:0.2);
        //     ding.play(success => {
        //         if (success) {
        //         console.log('successfully finished playing');
        //         } else {
        //         console.log('playback failed due to audio decoding errors');
        //         }
        //     });
        // },[isSpeaker])

        // useEffect(()=>{

        //     if (roomID && roomID !=="") {
                
        //         handleIncomingCall(roomID)
               
        //     }else{
    
                
        //     }
    
        //     return () => {
        //         ding.release();
        //       };
           
        // },[])
   
    
    const renderVideoCallScreen = () => {
        // var receiver = this.Call.getCallReceiver();
        var receiver = entity;
        var avatar = receiver.avatar;
        var name = receiver.username;
        if(avatar === '' || avatar === undefined || avatar === null){
            if(entityType === 'user'){
                avatar = 'user';
            }else{
                avatar = 'group';
            }
        }
        return(
            <View style={{  flex: 1, backgroundColor: colors.white, alignItems: 'center'}}>

                <ImageBackground resizeMode='cover' imageStyle={{opacity: 0.2}} 
                style={{flex:1,
                 backgroundColor: colors.green,
                  width: wp('100%'),
                 alignItems: 'center'
                }} source={{
                uri: userObject.avatar || "https://static.dribbble.com/users/1304678/screenshots/7301908/media/3f91189797dd514eb6446b21a4faa209.png",
                // avatar,
                // "https://static.dribbble.com/users/1304678/screenshots/7301908/media/3f91189797dd514eb6446b21a4faa209.png",
              }}>

             <View  
             style={{
                 flex:1,
                  width: wp('100%'),
                
                 alignItems: 'center',
                 marginTop: hp('10%'),
                }}>

                  <Image
              source={{
                uri: userObject.avatar || "https://static.dribbble.com/users/1304678/screenshots/7301908/media/3f91189797dd514eb6446b21a4faa209.png",
                
              }}
              style={{
                ...StyleSheet.absoluteFillObject,
                borderColor: colors.white,
                borderWidth: wp('2%'),
                position: 'relative',
                borderRadius: 100,
                width: wp('35%'),
                height: wp('35%'),
              }}
            />
             <Text style={{ fontSize: wp('6%'), color: '#FFF', marginTop: hp('2%'), fontFamily:fonts.PRIMARY_BOLD,fontWeight: '700' }}>{name}</Text>
             <Text style={{ fontSize: wp('4%'), color: '#FFF', marginTop: hp('1%'), fontFamily:fonts.PRIMARY_BOLD,fontWeight: '400' }}>{callingText}</Text>

                  </View>

       
            
             <View style={{ alignSelf: 'flex-end', marginTop: 'auto', alignItems: 'center' }}>
                    {/* <TouchableOpacity style={{ 
                    padding: 16,
                     borderRadius: 100,
                     backgroundColor: 'red',
                     height: 64,
                      width: 64,
                      marginBottom: hp('3%')
                       }} 
                       onPress={()=>{this.rejectCall(CometChat.CALL_STATUS.CANCELLED);}}
                       >
                        <MaterialCommunityIcons  name="phone-hangup" size={32} color="white"/>
                    </TouchableOpacity> */}
                    <View style={{ flexDirection: 'row',  marginBottom: hp('3%')}}>

                        {!isOutgoingCall &&  <TouchableOpacity style={styles.answerButton} onPress={()=>{
                             handleIncomingCall(roomID)
                        
                            }}>
                            <MaterialCommunityIcons  name="phone" size={32} color="white"/>
                        </TouchableOpacity>}

                        <TouchableOpacity style={styles.hangupButton} onPress={()=>{

                            {isOutgoingCall? cancelOutgoingCall() : rejectCall(CometChat.CALL_STATUS.REJECTED)}
                            
                        
                            }}>
                            <MaterialCommunityIcons  name="phone-hangup" size={32} color="white"/>
                        </TouchableOpacity>
                        </View>


                    <View style={{
                        
                    height: hp('10%'),
                   
                    flexDirection: 'row',
                    
                      backgroundColor: colors.green, 
                       width: wp('100%'),
                       borderTopLeftRadius: wp('8%'),
                       borderTopRightRadius: wp('8%'),
                       paddingHorizontal: wp('10%'),
                       alignItems: 'center',
                       justifyContent: 'space-between'

                       }}>

                    <TouchableOpacity  onPress={()=>{this.rejectCall(CometChat.CALL_STATUS.CANCELLED);}}>
                        <MaterialCommunityIcons  name="volume-low" style={{fontSize: wp('10%'), color: colors.white}}/>
                    </TouchableOpacity>   
                    <TouchableOpacity  onPress={()=>{this.rejectCall(CometChat.CALL_STATUS.CANCELLED);}}>
                        <MaterialCommunityIcons  name="phone" style={{fontSize: wp('10%'), color: colors.white}}/>
                    </TouchableOpacity>  
                    <TouchableOpacity  onPress={()=>{this.rejectCall(CometChat.CALL_STATUS.CANCELLED);}}>
                        <MaterialCommunityIcons style={{fontSize: wp('10%'), color: colors.white}}  name="microphone" />
                    </TouchableOpacity>    
                   
                </View>


                </View>
                
                </ImageBackground>
               
                
            </View>
        );
    }

    const cancelOutgoingCall = () =>{

        setCallingText("Disconnecting...")

        navigation.goBack()
    }

   const renderOutgoingCallScreen = () =>{
        // var receiver = Call.getCallReceiver();
        var receiver = entity;
        var avatar = receiver.callerUserIcon;
        var name = receiver.callerUserName;

        if(avatar === '' || avatar === undefined || avatar === null){
            if(entityType === 'user'){
                avatar = 'user';
            }else{
                avatar = 'group';
            }
        }

        return(
            <View style={styles.callContainer}>

                <ImageBackground resizeMode='cover' imageStyle={{opacity: 0.2}} 
                style={styles.callImageBackground} source={{
                uri: userObject.avatar || "https://static.dribbble.com/users/1304678/screenshots/7301908/media/3f91189797dd514eb6446b21a4faa209.png",
                // avatar,
                // "https://static.dribbble.com/users/1304678/screenshots/7301908/media/3f91189797dd514eb6446b21a4faa209.png",
              }}>

        <Image
              source={{
                uri: userObject.avatar || "https://static.dribbble.com/users/1304678/screenshots/7301908/media/3f91189797dd514eb6446b21a4faa209.png",
                
              }}
              style={styles.callImage}
            />
             <Text style={styles.callName}>{name}</Text>
             <Text style={styles.callText}>{callingText}</Text>
                
                </ImageBackground>
                <View style={{ flexDirection: 'row', marginVertical: hp('3%')}}>

                    {!isOutgoingCall &&  <TouchableOpacity style={styles.answerButton} onPress={()=>{
                        // acceptCall()
                        handleIncomingCall(roomID)
                      
                        }}>
                        <MaterialCommunityIcons  name="phone" size={32} color="white"/>
                    </TouchableOpacity>}
               
                    <TouchableOpacity style={styles.hangupButton} onPress={()=>{
                       
                        {isOutgoingCall? cancelOutgoingCall() : rejectCall(CometChat.CALL_STATUS.REJECTED)}
                        
                      
                        }}>
                        <MaterialCommunityIcons  name="phone-hangup" size={32} color="white"/>
                    </TouchableOpacity>
                </View>
                <View style={styles.callBottomBar}>

                    <TouchableOpacity  onPress={()=>{
                         let callController = CometChat.CallController.getInstance();
                         setSpeaker(!isSpeaker)
                         callController.setAudioMode(isSpeaker?CometChat.AUDIO_MODE.SPEAKER:CometChat.AUDIO_MODE.EARPIEC);;
                    }}>
                        <MaterialCommunityIcons  name={isSpeaker?"volume-high":"volume-low"} style={styles.callBottomBarBtn}/>
                    </TouchableOpacity>   
                    <TouchableOpacity  onPress={()=>{
                        
                    }}>
                        <MaterialCommunityIcons  name="video" style={styles.callBottomBarBtn}/>
                    </TouchableOpacity>  
                    <TouchableOpacity  onPress={()=>{
                        let callController = CometChat.CallController.getInstance();
                        setMuteMic(!muteMic)
                        callController.muteAudio(muteMic);
                       
                    }}>
                        <MaterialCommunityIcons style={styles.callBottomBarBtn}  name={!muteMic?"microphone":"microphone-off"} />
                    </TouchableOpacity>    
                   
                </View>
               
            </View>
        );
    }

    // Call by Routes's instance which would be trigger in the APP component by user click the notification
  const handleIncomingCall = (roomID) => {
    jumpToCallPage(roomID);
    console.log("Handle incoming call with room id: ",roomID)
  }

  // Post a request to backend service will the targetUserID
  // Because every device(FCM token) has been binding with a specific user id at APP launched, 
  // so the server can find out who you are trying to call
  const sendCallInvite = async (roomID) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        targetUserID: entity.uid,
        callerUserID: auth.id,
        callerUserName: auth.first_name,
        callerIconUrl: auth.avatar,
        roomID: roomID,
        callType: callType // TODO For test only
      })
    };
    const reps = await fetch(`${ZEGO_SERVER_URL}/call_invite`, requestOptions);
    console.log('Send call invite reps: ', reps);
  }

  const jumpToCallPage = (roomID) => {
    navigation.navigate('CallPage', { appData: appData, roomID: roomID, userName: auth.first_name, callType: callType});
  }

  // Start call by click the call button
   const startCall = () => {
    if (entity.uid == '') {
      console.warn('Invalid user id');
      return;
    }
    // TODO the caller use he/her own user id to join room, for test only
    jumpToCallPage(auth.id);
    sendCallInvite(auth.id);
  }
        return(
            
            <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.9)'}}>

                {
                    callType === "Audio" ? renderOutgoingCallScreen() : renderVideoCallScreen()
                }
            </View>
        );
   
}
