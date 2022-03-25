/* eslint-disable keyword-spacing */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet,ImageBackground } from 'react-native';
import { CometChat } from '@cometchat-pro/react-native-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { wp,colors,hp, fonts } from 'src/config/variables';
let call;
export class CallingScreen extends Component {

    constructor(props){
        super(props);
        this.addCallListner();
        this.Call = this.props.navigation.getParam('call',{});
        // this.defaultLayout = this.props.navigation.getParam('enableDefaultLayout', 1);
        // this.isCallOutGoing = this.props.navigation.getParam('isOutgoingCall', 1);
        // this.entity = this.props.navigation.getParam('entity', {});
        // this.entityType = this.props.navigation.getParam('entityType', 'default');
        // this.acceptedFrom = this.props.navigation.getParam('acceptedFrom', 'Home');
        this.state = {

        }
        this.call = this.props.route.params.call;
        console.log("this is call object");
        console.log(this.call);
        this.defaultLayout = this.props.route.params.enableDefaultLayout;
        this.isCallOutGoing = this.props.route.params.isOutgoingCall;
        this.entity = this.props.route.params.entity;
        this.entityType = this.props.route.params.entityType;
        this.acceptedFrom = this.props.route.params.acceptedFrom;
    }

    componentWillUnmount(){
        CometChat.removeCallListener('CALLING_SCREEN_CALL_LISTENER');
      const {params} = this.props.route
        this.setState({...params.acceptedFrom})
    }

    addCallListner(){
        var listnerID = 'CALLING_SCREEN_CALL_LISTENER';
        var that = this;
        CometChat.addCallListener(
            listnerID,
            new CometChat.CallListener({
                onIncomingCallReceived(call) {
                    var sessionID = call.getSessionId();
                    that.acceptCall();
                    // var status = CometChat.CALL_STATUS.BUSY;
                    // CometChat.rejectCall(sessionID, status).then(
                    //     rejectedCall => {
                    //         console.log('Incoming Call rejected', rejectedCall);
                    //     },
                    //     error => {
                    //         console.log('Call rejection failed with error:', error);
                    //     }
                    // );
                },
                onOutgoingCallAccepted(call) {
                    that.startCall();
                },
                onOutgoingCallRejected(call) {
                    that.gotoChat();
                },
                onIncomingCallCancelled(call) {
                    that.gotoChat();
                },
            })
        );
    }

    static navigationOptions = () => {
        return {
           header: () => null,
        };
    }

    gotoChat(){
        if(this.acceptedFrom === 'Home'){
            this.props.navigation.navigate('Home');
        }else{
            if(this.state.entityType === 'user'){
                this.props.navigation.navigate('ChatScreen', {
                    uid: this.entity.uid,
                    username: this.entity.name,
                    status: this.entity.status,
                    avatar: this.entity.avatar ? this.entity.avatar : 'user',
                });
            }else{
                this.props.navigation.navigate('ChatScreen', {
                    uid: this.entity.uid,
                    username: this.entity.name,
                    avatar: this.entity.avatar ? this.entity.avatar : 'group',
                });
            }
        }
    }

    renderIncomingCallScreen(){
        if(this.entityType === 'user'){
            var initiator = this.call.callInitiator();
        }else{
            var initiator = this.call.getCallReceiver();
        }
        var avatar = initiator.avatar;
        var name = initiator.name;
        if(avatar === '' || avatar === undefined || avatar === null){
            if(this.entityType === 'user'){
                avatar = 'user';
            }else{
                avatar = 'group';
            }
        }
        return(
            <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center'}}>
                {
                    avatar === 'user' || avatar === 'group'
                    ?
                    <FontAwesome style={[{ height: 136, width: 136, borderRadius: 50, marginVertical: 16 }]} name={avatar} size={136} color="#fff"/>
                    :
                    <Image style={{ height: 136, width: 136, borderRadius: 50, marginVertical: 16 }} source={{uri: avatar}} />
                }
                <Text style={{ fontSize: 32, color: '#FFF', marginVertical: 16 }}>{name}</Text>
                <View style={{ flexDirection: 'row', marginVertical: 16}}>
                    <TouchableOpacity onPress={()=>{this.acceptCall();}}>
                        <MaterialCommunityIcons style={{ marginHorizontal: 32, padding: 16, borderRadius: 32, borderWidth: 1, backgroundColor: 'green', height: 64, width: 64 }} name="phone" size={32} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.rejectCall(CometChat.CALL_STATUS.REJECTED);}}>
                        <MaterialCommunityIcons style={{ marginHorizontal: 32, padding: 16, borderRadius: 32, borderWidth: 1, backgroundColor: 'red', height: 64, width: 64 }} name="phone-hangup" size={32} color="white"/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    renderOutgoingCallScreen(){
        // var receiver = this.Call.getCallReceiver();
        var receiver = this.call.callReceiver;
        var avatar = receiver.avatar;
        var name = receiver.name;
        if(avatar === '' || avatar === undefined || avatar === null){
            if(this.entityType === 'user'){
                avatar = 'user';
            }else{
                avatar = 'group';
            }
        }
        return(
            <View style={{  flex: 1, backgroundColor: colors.white, alignItems: 'center'}}>

                <ImageBackground resizeMode='cover' imageStyle={{opacity: 0.2}} 
                style={{flex: 0.85,
                 backgroundColor: colors.green,
                  width: wp('100%'),
                 borderBottomRightRadius: wp('7%'), 
                 borderBottomLeftRadius: wp('7%'),
                 justifyContent: 'center',
                 alignItems: 'center'
                }} source={{
                uri: "https://static.dribbble.com/users/1304678/screenshots/7301908/media/3f91189797dd514eb6446b21a4faa209.png",
                // avatar,
                // "https://static.dribbble.com/users/1304678/screenshots/7301908/media/3f91189797dd514eb6446b21a4faa209.png",
              }}>

        <Image
              source={{
                uri: "https://static.dribbble.com/users/1304678/screenshots/7301908/media/3f91189797dd514eb6446b21a4faa209.png",
                
              }}
              style={{
                ...StyleSheet.absoluteFillObject,
                borderColor: colors.white,
                borderWidth: wp('3%'),
                position: 'relative',
                borderRadius: 100,
                width: wp('50%'),
                height: wp('50%'),
              }}
            />
             <Text style={{ fontSize: wp('6%'), color: '#FFF', marginTop: hp('2%'), fontFamily:fonts.PRIMARY_BOLD,fontWeight: '700' }}>{name} Arisekola</Text>
             <Text style={{ fontSize: wp('4%'), color: '#FFF', marginTop: hp('1%'), fontFamily:fonts.PRIMARY_BOLD,fontWeight: '400' }}>Calling</Text>
                
                </ImageBackground>
                <View style={{ flexDirection: 'row', marginVertical: hp('3%')}}>
                    <TouchableOpacity style={{ padding: 16, borderRadius: 100, backgroundColor: 'red', height: 64, width: 64 }} onPress={()=>{this.rejectCall(CometChat.CALL_STATUS.CANCELLED);}}>
                        <MaterialCommunityIcons  name="phone-hangup" size={32} color="white"/>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.15, 
                    marginTop: 'auto', 
                    flexDirection: 'row',
                     alignSelf: 'flex-end',
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
                        <MaterialCommunityIcons  name="video" style={{fontSize: wp('10%'), color: colors.white}}/>
                    </TouchableOpacity>  
                    <TouchableOpacity  onPress={()=>{this.rejectCall(CometChat.CALL_STATUS.CANCELLED);}}>
                        <MaterialCommunityIcons style={{fontSize: wp('10%'), color: colors.white}}  name="microphone" />
                    </TouchableOpacity>    
                   
                </View>
                {/* {
                    avatar === 'user' || avatar === 'group'
                    ?
                    <FontAwesome style={[{ height: 136, width: 136, borderRadius: 50, marginVertical: 16 }]} name={avatar} size={136} color="#fff"/>
                    :
                    <Image style={{ height: 136, width: 136, borderRadius: 50, marginVertical: 16 }} source={{uri: avatar}} />
                }
                <Text style={{ fontSize: 32, color: '#FFF', marginVertical: 16 }}>{name}</Text>
                <View style={{ flexDirection: 'row', marginVertical: 16}}>
                    <TouchableOpacity onPress={()=>{this.rejectCall(CometChat.CALL_STATUS.CANCELLED);}}>
                        <MaterialCommunityIcons style={{ padding: 16, borderRadius: 32, borderWidth: 1, backgroundColor: 'red', height: 64, width: 64 }} name="phone-hangup" size={32} color="white"/>
                    </TouchableOpacity>
                </View> */}
            </View>
        );
    }

    rejectCall(status){
        var sessionID = this.call.sessionId;
        this.gotoChat();
        CometChat.rejectCall(sessionID, status).then(
            call => {
              console.log("Call rejected successfully:", call);
              this.gotoChat();
            },
            error => {
                this.gotoChat();
              console.log("Call rejection failed with error", error);
            }
        );
    }

    renderMainCallScreen(){
        this.props.navigation.navigate('MainCallScreen',{
            sessionId: this.call.sessionId,
            enableDefaultLayout: this.defaultLayout,
            entity: this.entity,
            entityType: this.entityType,
            acceptedFrom: this.acceptedFrom,
        });
    }

    startCall(){
        this.renderMainCallScreen();
    }

    acceptCall(){
        CometChat.acceptCall(this.call.sessionId).then(
            Call => {
                this.renderMainCallScreen();
            }
        );
    }

    render(){
        return(
            <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.9)'}}>
                {
                    this.isCallOutGoing ? this.renderOutgoingCallScreen() : this.renderIncomingCallScreen()
                }
            </View>
        );
    }
}
