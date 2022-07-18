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

export const CallingScreen = (props) => {
    const {params} =  props.route
    // console.log("___CALL__PROPS__", props)
    const {entity, callType, entityType,enableDefaultLayout,defaultLayout,acceptedFrom, isOutgoingCall, call = {}, userObject = {},outgoingCallAccepted = false} = params
    const navigation = useNavigation();
    const [sessionID,setSessionID] = useState(call.sessionId)
    const [callingText, setCallingText] = useState("Calling...")
    const [muteMic,setMuteMic] = useState(false)
    const [isSpeaker,setSpeaker] = useState(false)
    const [callObject,setCallObject] = useState(call)
    const [callAccepted, setCallAccepted] = useState(outgoingCallAccepted)
  
    // Sound.setCategory('Playback');
    var ding = new Sound('ringing_tone.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        // when loaded successfully
        console.log('duration in seconds: ' + ding.getDuration() + 'number of channels: ' + ding.getNumberOfChannels());
      });
     
    useEffect(()=>{

        if (isOutgoingCall) {
            initiateCall(callType);
           
        }else{

            // const {call = {}} = params
            // setCallObject(call)
            // setSessionID(call.getSessionId())
        }

        return () => {
            ding.release();
          };
       
    },[])


    useEffect(()=>{
        addCallListner();

        return  CometChat.removeCallListener('CALLING_SCREEN_CALL_LISTENER');

    },[])
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

    const initiateCall = (type) => {
        // var callType = CometChat.CALL_TYPE.VIDEO;
        var receiverType = CometChat.RECEIVER_TYPE.USER;
        var call = new CometChat.Call(entity.uid, type, receiverType);
        CometChat.initiateCall(call).then((Call) => {
           

            setCallObject(Call)
          CometChat.getUser(entity.uid).then((user) => {
          

            // ding.play(success => {
            //     if (success) {
            //     console.log('successfully finished playing');
            //     } else {
            //     console.log('playback failed due to audio decoding errors');
            //     }
            // });
          },
          error => {
            console.log("Call initialization failed with exception:", error);
          });
        });
      };
    

   
  const addCallListner =()=>{
        var listnerID = 'CALLING_SCREEN_CALL_LISTENER_22';
       
        CometChat.addCallListener(
            listnerID,
            new CometChat.CallListener({
                // onIncomingCallReceived(call) {
                //     console.log("___CALL__OBJECT___",call)
                //     var session_id = call.getSessionId();
                //     setSessionID(session_id)
                //     setCallObject(call)
                //     // acceptCall();
                //     // var status = CometChat.CALL_STATUS.BUSY;
                //     // CometChat.rejectCall(sessionID, status).then(
                //     //     rejectedCall => {
                //     //         console.log('Incoming Call rejected', rejectedCall);
                //     //     },
                //     //     error => {
                //     //         console.log('Call rejection failed with error:', error);
                //     //     }
                //     // );
                // },
                onOutgoingCallAccepted(call) {
                    console.log('Incoming Call Accepted___', call);
                    setSessionID(call.getSessionId())
                    setCallObject(call)
                  startCall();
                  
                },
                onOutgoingCallRejected(call) {
                    console.log('OnOutgoing Call rejected', call);
                    navigation.goBack()
                    
                //    gotoChat();
                },
                onIncomingCallCancelled(call) {
                    console.log('Incoming Call Cancelled', call);
                    navigation.goBack()
                //    gotoChat();
                },
            })
        );
    }



    const navigationOptions = () => {
        return {
           header: () => null,
        };
    }

   const gotoChat = () =>{
        if(acceptedFrom === 'Home'){
           navigation.navigate('Home');
        }else{
            if(entityType === 'user'){
               navigation.navigate('ChatScreen', {
                    uid: entity.uid,
                    username: entity.username,
                    status: entity.status,
                    avatar: entity.avatar ? entity.avatar : 'user',
                });
            }else{
               navigation.navigate('ChatScreen', {
                    uid: entity.uid,
                    username: entity.username,
                    avatar: entity.avatar ? entity.avatar : 'group',
                });
            }
        }
    }

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
                            acceptCall()
                        
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
useEffect(()=>{
if (callingText ==="Disconnected") {
    navigation.goBack()
          gotoChat()
}
},[callingText])
const cancelOutgoingCall = () =>{
    setCallingText("Disconnecting...")
    navigation.goBack()
    CometChat.rejectCall(CometChat.CALL_STATUS.CANCELLED).then(
        call => {
          console.log("Call rejected successfully:", call);
          setCallingText("Disconnected")
          navigation.goBack()
          gotoChat()
        }
       
    ).catch( error => {
        gotoChat();
      console.log("Call rejection failed with error", error);
    })
}
   const renderOutgoingCallScreen = () =>{
        // var receiver = Call.getCallReceiver();
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
                        acceptCall()
                      
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

  const rejectCall = (status) => {
        // var sessionID = call.sessionId;
      
        CometChat.rejectCall(sessionID, status).then(
            call => {
              console.log("Call rejected successfully:", call);
              navigation.goBack()
            },
            error => {
                // gotoChat();
              console.log("Call rejection failed with error", error);
            }
        );
    }

    const renderMainCallScreen = () => {
       navigation.navigate('MainCallScreen',{
            sessionId: sessionID,
            type: callType,
            enableDefaultLayout: defaultLayout,
            entity: entity,
            entityType: entityType,
            acceptedFrom: acceptedFrom,
        });
    }

  const  startCall = () => {
    setCallAccepted(true)
        // renderMainCallScreen();
    }

   const acceptCall = () => {
       
        CometChat.acceptCall(sessionID).then(
            Call => {
                console.log("____CALL__LOG__", Call)
                startCall();
            },
            error => {
                if (error.code === "ERR_CALL_TERMINATED") {
                    navigation.goBack()
                }
                console.log("Call acceptance failed with error", error);
                // handle exception
            }
        );
    }

    if (callAccepted) {
        let callListener = new CometChat.OngoingCallListener({
            onUserJoined: user => {
                console.log('User joined call:', user);
            },
            onUserLeft: user => {
                console.log('User left call:', user);
                navigation.goBack();
            },
            onUserListUpdated: userList => {
                    console.log("user list:", userList);
            },
            onAudioModesUpdated: (audioModes) => {
                console.log("audio modes:", audioModes);
            },
            onCallEnded: call => {
                console.log('Call ended listener', call);
                navigation.goBack();
            },
            onError: error => {
                console.log('Call Error: ', error);
                navigation.goBack();
            },
        });
       
    
    var callSettings = new CometChat.CallSettingsBuilder()
    .setSessionID(sessionID)
    .enableDefaultLayout(true)
    .setIsAudioOnlyCall(callType == 'aduio' ? true : false)
    .setCallEventListener(callListener)
    .build();
        return(
        <View style={{flex: 1, background: '#000'}}>
        <CometChat.CallingComponent callsettings= {callSettings} onFailure = {(e)=>{console.log('error', e);}} />
       </View>
        )
    }
        return(
            
            <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.9)'}}>

                {
                    callType === CometChat.CALL_TYPE.AUDIO ? renderOutgoingCallScreen() : renderVideoCallScreen()
                }
            </View>
        );
   
}
