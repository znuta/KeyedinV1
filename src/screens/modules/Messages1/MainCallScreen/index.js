/* eslint-disable keyword-spacing */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import { View } from 'react-native';
import {CometChat} from '@cometchat-pro/react-native-chat';


export const MainCallScreen = (props) => {

    const {params} = props.route
    console.log("___MAINCALL__PARAM__",params)
    var sessionId = params.sessionId;
        var callType = params.type;
  
        let callListener = new CometChat.OngoingCallListener({
            onUserJoined: user => {
                console.log('User joined call:', user);
            },
            onUserLeft: user => {
                console.log('User left call:', user);
            },
            onUserListUpdated: userList => {
                    console.log("user list:", userList);
            },
            onAudioModesUpdated: (audioModes) => {
                console.log("audio modes:", audioModes);
            },
            onCallEnded: call => {
                console.log('Call ended listener', call);
            },
            onError: error => {
                console.log('Call Error: ', error);
            },
        });
       
   
    var callSettings = new CometChat.CallSettingsBuilder()
    .setSessionID(sessionId)
    .enableDefaultLayout(true)
    .setIsAudioOnlyCall(callType == 'aduio' ? true : false)
    .setCallEventListener(callListener)
    .build();

        return(
            <View style={{flex: 1, background: '#000'}}>
                <CometChat.CallingComponent callsettings= {callSettings} onFailure = {(e)=>{console.log('error', e);}} />
            </View>
        );
    
}