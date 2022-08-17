import React, { Component } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Keyboard,
  Platform,
  TouchableHighlight,
  Modal,
    ActivityIndicator,
    Text,
    SafeAreaView
    
} from "react-native";
import { CometChat } from "@cometchat-pro/react-native-chat";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import DocumentPicker from 'react-native-document-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Video from "react-native-video";
import { Linking } from "react-native";
import ActionSheet from "react-native-actionsheet";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareView } from "react-native-keyboard-aware-view";
import Gallery from "react-native-image-gallery";
import styled from "styled-components/native";
import Image from "react-native-image-progress";
import Colors from "src/constants/Colors";
import { Header, Icon } from "react-native-elements";
import {colors, fonts, hp, wp} from 'src/config/variables';
import { getUser } from "src/redux/actions/AuthActions";


let uid, messagelist, typingNotification, status, myUserID, username, avatar;

const PreviewModal = ({ showmodal, onClose, imguri, sendMediaMessage }) => {
  const galleryItems = [
    {
      id: 0,
      src: imguri,
    },
  ];
  var images = galleryItems.map((image) => ({ source: { uri: image.src } }));
  return (
    showmodal && (
      <View style={{}}>
        <Modal
          animationType="slide"
          transparent={false}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
          style={{ backgroundColor: "black" }}
        >
          <View style={{ flex: 1, backgroundColor: "black" }}>
            <View
              style={{ marginTop: 60, alignItems: "flex-end", paddingEnd: 30 }}
            >
              <TouchableHighlight onPress={onClose}>
                <Feather name="x" size={32} color="white" />
              </TouchableHighlight>
            </View>
            <Gallery images={images} />
          </View>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <ShadowBtn onPress={sendMediaMessage}>
              <View style={styles.shadowFirst} />
              <View style={styles.shadowSecond} />
              <View style={styles.shadowMain}>
                <AntDesign
                  name="arrowright"
                  color="white"
                  size={24}
                  style={{ marginTop: -5 }}
                />
              </View>
            </ShadowBtn>
          </View>
        </Modal>
      </View>
    )
  );
};

export class ChatScreen extends Component {
  messagesRequest = null;

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      txtMessage: "",
      mediaMsg: "",
      refreshing: false,
      autoScroll: true,
      uid: "",
      username: "",
      status:"",
      avatar:"",
      fullimage: "",
      isModalVisible: false,
      keyboardOffset: 0,
      showModal: false,
      ismediasent: false,
      userObject: {}
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.sendMediaMessage = this.sendMediaMessage.bind(this);
    this.sendMsg = this.sendMsg.bind(this);
    this.imagePicker = this.imagePicker.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.documentPicker = this.documentPicker.bind(this);
    this.showActionSheet = this.showActionSheet.bind(this);
    this.fetchMessages = this.fetchMessages.bind(this);
    this._handleRefresh = this._handleRefresh.bind(this);
    this.getLoggedInUser();
  }
 
  componentWillMount() {
    this.props.navigation.setParams({ initiateCall: this.initiateCall() });
    this.props.navigation.setParams({ navigation: this.props.navigation });
    // this.uid = this.props.route.params.uid;
    // this.username = this.props.route.params.username;
    // this.status = this.props.route.params.status;
    // this.avatar = this.props.route.params.avatar;
    const { route } = this.props;
    const { uid= "", username= "",status="",avatar=""} = route.params
    this.setState({ uid, username, status, avatar  });
   
    var limit = 10;
    // this.messagesRequest = new CometChat.MessagesRequestBuilder().setLimit(limit).setUID(uid).build();
    // console.log(this.messagesRequest);
    this.receiveMessages();
    
    this.messagelist;
    this.addUserListner();
    // this.addCallListner();
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
    let receiverType = CometChat.RECEIVER_TYPE.USER;
    typingNotification = new CometChat.TypingIndicator(this.state.uid, receiverType);

    this.props.navigation.setOptions({
      headerTitle: () => (
        // <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
        
          <View style={{}}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#FFF" }}>
              {this.props.route.params.username}
            </Text>
            {/* <Text>
                  {this.props.route.params.status}
                </Text> */}
          </View>
        </View>
        // </View> */}
      ),
      // headerRight: () => (
      //     <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 10 }}>
      //       <TouchableOpacity
      //         onPress={() => {
      //           this.initiateCall("video");
      //         }}
      //         style={{ marginHorizontal: 10 }}
      //       >
      //         <Ionicons name="ios-videocam" color="#FFF" size={26} />
      //       </TouchableOpacity>

      //       <TouchableOpacity
      //         onPress={() => {
      //           this.initiateCall("audio");
      //         }}
      //         style={{ marginHorizontal: 10 }}
      //       >
      //         <FontAwesome name="phone" color="#FFF" size={24} />
      //       </TouchableOpacity>
      //     </View>
      // ),
      headerStyle: {
        backgroundColor: "#30C57B",
      },
      headerTintColor: "#fff",
      // headerBackTitle: " ",
      headerBackTitleVisible: false,
    });
    // console.log(this.props.route.params);
  }
  componentDidMount() {
    console.log("ARTISAN___MESSAGE++++", { uid: this.state.uid, })
    getUser(this.state.uid,({user = {}, expertise = {}, employment = {},education = {},comments = {}, rating=""})=>{
      console.log("ARTISAN___MESSAGE++++", user)
    this.setState({userObject: user})

    })
  this.fetchMessages();
}
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  componentWillUnmount() {
    this.removeListeners();
  }

  

  removeListeners() {
    CometChat.removeUserListener("CHAT_SCREEN_USER_LISTNER");
    CometChat.removeCallListener("CHAT_SCREEN_CALL_LISTNER");
    CometChat.removeMessageListener("CHAT_SCREEN_MESSAGE_LISTENER");
  }


  
  // static navigationOptions = ({ navigation }) => {
  //   // console.log(navigation);

  //   uid = this.state.uid;

  //   username = this.props.route.params.username;

  //   status = this.props.route.params.status;

  //   avatar = this.props.route.params.avatar;

  //   const { state } = navigation;
  //   // console.log("navigation state")
  //   // console.log(navigation);
  //   return {
  //     headerTitle: (
  //       <View style={{ flex: 1 }}>
  //         <View
  //           style={{ flexDirection: "row", justifyContent: "space-between" }}
  //         >
  //           <View
  //             style={{
  //               flexDirection: "row",
  //               alignSelf: "center",
  //               justifyContent: "space-between",
  //             }}
  //           >
  //             {avatar === "user" ? (
  //               <FontAwesome
  //                 style={[
  //                   {
  //                     height: 48,
  //                     width: 48,
  //                     borderRadius: 24,
  //                     marginRight: 16,
  //                   },
  //                 ]}
  //                 name="user"
  //                 size={48}
  //                 color="#fff"
  //               />
  //             ) : (
  //               <Image
  //                 style={{
  //                   height: 48,
  //                   width: 48,
  //                   borderRadius: 24,
  //                   marginRight: 16,
  //                 }}
  //                 source={{ uri: avatar }}
  //               />
  //             )}

  //             <View style={{ alignSelf: "flex-start" }}>
  //               <Text
  //                 style={{ fontSize: 20, fontWeight: "bold", color: "#FFF" }}
  //               >
  //                 {username}
  //               </Text>

  //               <Text
  //                 style={{ fontSize: 15, fontStyle: "italic", color: "#FFF" }}
  //               >
  //                 {state.params.title}
  //               </Text>
  //             </View>
  //           </View>
  //         </View>
  //       </View>
  //     ),
  //     headerRight: (
  //       <View style={{ flex: 1 }}>
  //         <View style={{ flexDirection: "row" }}>
  //           <TouchableOpacity
  //             onPress={() => {
  //               state.params.initiateCall(CometChat.CALL_TYPE.VIDEO, state.params.navigation);
  //             }}
  //           >
  //             <MaterialCommunityIcons
  //               style={{ padding: 8 }}
  //               name="video"
  //               size={32}
  //               color="white"
  //             />
  //           </TouchableOpacity>

  //           <TouchableOpacity
  //             onPress={() => {
  //               state.params.initiateCall(CometChat.CALL_TYPE.AUDIO, state.params.navigation);
  //             }}
  //           >
  //             <MaterialCommunityIcons
  //               style={{ padding: 8 }}
  //               name="phone"
  //               size={32}
  //               color="white"
  //             />
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     ),
  //     headerStyle: {
  //       backgroundColor: "#3f51b5",
  //     },
  //     headerTintColor: "#fff",
  //   };
  // };

  initiateCall = (type) => {
    var callType = CometChat.CALL_TYPE.VIDEO;
    var receiverType = CometChat.RECEIVER_TYPE.USER;
    var call = new CometChat.Call(this.state.uid, type, receiverType);
    CometChat.initiateCall(call).then((Call) => {
      CometChat.getUser(this.state.uid).then((user) => {
        if (user) {
          const isAudio = type === CometChat.CALL_TYPE.AUDIO ? 1 : 0;
          const defaultLayout = 1;
          const initiator = 1;
          const isOutgoing = 1;
          this.props.navigation.navigate("CallingScreen", {
            call: Call,
            isInitiator: initiator,
            isAudioOnly: isAudio,
            enableDefaultLayout: defaultLayout,
            isOutgoingCall: isOutgoing,
            entity: user,
            entityType: CometChat.RECEIVER_TYPE.USER,
            userObject: this.state.userObject
          });
        }
      },
      error => {
        console.log("Call initialization failed with exception:", error);
      });
    });
  };

  getLoggedInUser() {
    CometChat.getLoggedinUser().then(
      (user) => {
        console.log("___cometuser__",user)
        myUserID = user.uid;
      },
      (error) => {
        console.log("error getting details:", { error });
      }
    );
  }

  mediaView(isMyMess, item, isRead, isDelivered) {
    // console.log(item.type);
    const mimetype = this.getMimeType(item.type);
    // console.log(mimetype);
    switch (item.type) {
      case "image": {
        if (isMyMess) {
          return (
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => this.renderFullScreenImage(item)}
              >
                <View style={{ alignSelf: "flex-end" }}>
                 
                  <Image
                    source={{ uri: item.data.url }}
                    indicator={Progress.Pie}
                    indicatorProps={{
                      size: 80,
                      borderWidth: 0,
                      color: "rgba(150, 150, 150, 1)",
                      unfilledColor: "rgba(200, 200, 200, 0.2)",
                    }}
                    style={{
                      width: 120,
                      height: 120,
                    }}
                  />
                </View>
              </TouchableOpacity>
              <View
                style={{ flexDirection: "column", justifyContent: "flex-end" }}
              >
                <Text style={{ alignSelf: "flex-end" }}>
                  {this.displayReceipt(isRead, isDelivered)}{" "}
                </Text>
              </View>
            </View>
          );
        } else {
          return (
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => this.renderFullScreenImage(item)}
              >
                <View style={{ alignSelf: "flex-start" }}>
                  <Image
                    style={{ height: 120, width: 120 }}
                    source={{ uri: item.data.url }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          );
        }
      }
      case "video": {
        if (isMyMess) {
          return (
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => this.renderFullScreenVideo(item)}
              >
                <View style={{ alignSelf: "flex-end" }}>
                  <Video
                    style={{ height: 150, width: 150 }}
                    source={{ uri: item.data.url }}
                    paused={true}
                    ref={(ref) => {
                      this.player = ref;
                    }}
                  />
                </View>
              </TouchableOpacity>
              <View
                style={{ flexDirection: "column", justifyContent: "flex-end" }}
              >
                <Text style={{ alignSelf: "flex-end" }}>
                  {this.displayReceipt(isRead, isDelivered)}{" "}
                </Text>
              </View>
            </View>
          );
        } else {
          return (
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => this.renderFullScreenVideo(item)}
              >
                <View style={{ alignSelf: "flex-start" }}>
                  <Video
                    style={{ height: 150, width: 150 }}
                    source={{ uri: item.data.url }}
                    paused={true}
                    ref={(ref) => {
                      this.player = ref;
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          );
        }
      }
      case "file": {
        if (isMyMess) {
          var msg = item.sender.name + " has sent you a file: ";
          return (
            <View
              style={{ flexDirection: "row", marginLeft: 30, marginRight: 10 }}
            >
              <View
                style={[
                  styles.balloon,
                  { backgroundColor: "#bdbdbd" },
                  { alignSelf: "flex-end" },
                ]}
              >
                <Text
                  style={[
                    styles.item,
                    { color: "#757575" },
                    { fontWeight: "600", fontStyle: "italic" },
                  ]}
                >
                  {msg}
                  <Text
                    onPress={() => Linking.openURL(item.data.url)}
                    style={{ color: "#0000EE", fontWeight: "600" }}
                  >
                    Download it here
                  </Text>
                </Text>
              </View>
              <View
                style={{ flexDirection: "column", justifyContent: "flex-end" }}
              >
                <Text style={{ alignSelf: "flex-end" }}>
                  {this.displayReceipt(isRead, isDelivered)}{" "}
                </Text>
              </View>
            </View>
          );
        } else {
          var msg = item.sender.name + " has sent you a file: ";
          return (
            <View
              style={{ flexDirection: "row", marginLeft: 30, marginRight: 10 }}
            >
              <View
                style={[
                  styles.balloon,
                  { backgroundColor: "#3f51b5" },
                  { alignSelf: "flex-start" },
                ]}
              >
                <Text
                  style={[
                    styles.item,
                    { color: "white" },
                    { fontWeight: "600", fontStyle: "italic" },
                  ]}
                >
                  {msg}
                  <Text
                    onPress={() => Linking.openURL(item.data.url)}
                    style={{ color: "#0000EE", fontWeight: "600" }}
                  >
                    Download it here
                  </Text>
                </Text>
              </View>
            </View>
          );
        }
      }
      default: {
        return null;
      }
    }
  }

  txtView(isMyMess, item, isRead, isDelivered) {
    if (isMyMess) {
      return (
        <View
          style={{
            flexDirection: "row",
           
            // backgroundColor: "yellow",
            justifyContent: "flex-end",
            width: "70%",
          }}
        >
          <View
            style={[
              styles.selfBaloon,
              { backgroundColor: colors.white,alignSelf: "flex-end", },
             
              
            ]}
          >
            <Text style={[styles.item, { color: colors.black}]}>
              {item.data.text}
              {/* {JSON.stringify(item.data.entities.sender.entity.uid)} -- {item.data.entities.receiver.entity.uid} */}
            </Text>
           
            <Text style={{ alignSelf: "flex-end" }}>
              {this.displayReceipt(isRead, isDelivered)}{" "}
            </Text>
          
          </View>
          
        </View>
      );
    } else {
      return (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            width: "70%",
           
           
          }}
        >
          <View
            style={[
              styles.balloon,
              { backgroundColor: colors.white,alignSelf: "flex-start" },
              
            ]}
          >
            <Text style={[styles.item, { color: colors.black }]}>
              {item.data.text}
            </Text>
          </View>
        </View>
      );
    }
  }

  renderItem = ({ item }) => {
    let isMyMess, isRead, isDelivered;
    isMyMess = false;
    if (item.receiverId === this.state.uid) {
      //this.state.uid
      // if (item.receiverId === uid) {
      isMyMess = true;
      "readAt" in item ? (isRead = true) : (isRead = false);
      "deliveredAt" in item ? (isDelivered = true) : (isDelivered = false);
    }
    if (item.category === "message") {
      if (isMyMess) {
        return (
          <View>
            <View style={styles.row}>
              <View style={{ alignSelf: "flex-end" }}>
                {item.type == "text"
                  ? this.txtView(isMyMess, item, isRead, isDelivered)
                  : this.mediaView(isMyMess, item, isRead, isDelivered)}
              </View>
            </View>
          </View>
        );
      } else {
        return (
          <View style={{ marginRight: 10 }}>
            <View style={styles.row}>
              <View style={{ alignSelf: "flex-start" }}>
                {item.type == "text"
                  ? this.txtView(isMyMess, item)
                  : this.mediaView(isMyMess, item)}
              </View>
            </View>
          </View>
        );
      }
    } else if (item.category === "call") {
      return (
        <View>
          <View style={styles.row}>
            <View style={{ alignSelf: "center" }}>
              {this.displayCallMessages(item)}
            </View>
          </View>
        </View>
      );
    }
  };

  displayCallMessages(item) {
    var message;
    switch (item.status) {
      case "initiated": {
        message = "Call Initiated";
        break;
      }
      case "ongoing": {
        message = "Call Ongoing";
        break;
      }
      case "unanswered": {
        message = "Call Unanswered";
        break;
      }
      case "rejected": {
        message = "Call Rejected";
        break;
      }
      case "busy": {
        message = "Call Busy";
        break;
      }
      case "cancelled": {
        message = "Call Cancelled";
        break;
      }
      case "ended": {
        message = "Call Ended";
        break;
      }
      default: {
        break;
      }
    }
    return (
      <View style={{ flexDirection: "row" }}>
        <View
          style={[
            styles.balloon,
            { backgroundColor: "#c2c5ca" },
            { alignSelf: "center" },
          ]}
        >
          <Text style={[styles.item, { color: "#fff" }]}>{message}</Text>
        </View>
      </View>
    );
  }

  displayReceipt(isRead, isDelivered) {
    if (isRead) {
      return (
        <MaterialCommunityIcons
          style={[{ alignSelf: "flex-end" }]}
          name="check-all"
          size={wp('3%')}
          color="#2196f3"
        />
      );
    } else if (isDelivered) {
      return (
        <MaterialCommunityIcons
          style={[{ alignSelf: "flex-end" }]}
          name="check-all"
          size={wp('3%')}
          color={Colors.mutedText}
        />
      );
    } else {
      return (
        <MaterialCommunityIcons
          style={[{ alignSelf: "flex-end" }]}
          name="check"
          size={wp('3%')}
          color="#000"
        />
      );
    }
  }

  addCallListner() {
    var listnerID = "CHAT_SCREEN_CALL_LISTNER";
    var that = this;
    CometChat.addCallListener(
      listnerID,
      new CometChat.CallListener({
        onIncomingCallReceived(call) {
          const defaultLayout = 1;
          const isOutgoing = false;
          that.props.navigation.navigate("CallingScreen", {
            call: call,
            enableDefaultLayout: defaultLayout,
            isOutgoingCall: isOutgoing,
            entity: call.getCallInitiator(),
            entityType: "user",
            acceptedFrom: "Chat",
            callType: call.type,
            userObject: this.state.userObject
          });
        },
        onOutgoingCallAccepted(call) {
          console.log('Incoming Call Accepted__Chat_', call);
        //   setCallObject(call)
        // startCall();
      },
      })
    );
  }

  addUserListner() {
    var listenerID = "CHAT_SCREEN_USER_LISTNER";

    CometChat.addUserListener(
      listenerID,
      new CometChat.UserListener({
        onUserOnline: (onlineUser) => {
          console.log("user online");
          if (onlineUser.uid == uid) {
            status = "Online";
            this.changeTypingText(status);
          }
        },
        onUserOffline: (offlineUser) => {
          console.log("user offline");
          if (offlineUser.uid == uid) {
            status = "Offline";
            this.changeTypingText(status);
          }
        },
      })
    );
  }

  _keyboardDidShow(event) {
    if (messagelist != null) {
      setTimeout(() => messagelist.scrollToEnd(), 100);
    }
  }

  _keyboardDidHide(event) {
    // console.log("keyboard was hidden");
  }

  getMimeType(type) {
    var MimeList = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      gif: "image/gif",
      png: "image/png",
      svg: "image/svg+xml",
      webp: "image/webp",
      mpeg: "video/mpeg",
      ogv: "video/ogg",
      webm: "video/webm",
      mp4: "video/mp4",
      doc: "application/msword",
      docx:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      pdf: "application/pdf",
      pptx:
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      zip: "application/zip",
      aac: "audio/aac",
      wav: "audio/wav",
      weba: "audio/webm",
      mp3: "audio/mpeg",
      oga: "audio/ogg",
    };
    return MimeList[type];
  }

  documentPicker = async () => {
    const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        })
    // alert(result.uri);
    console.log(result);
    this.setState({ image: result.uri });
    let name = "Doc_001";
    let uri = result.uri;
    let lastIndexOf = uri.lastIndexOf(".");
    let ext = uri.substr(lastIndexOf + 1, uri.length - 1);
    let type = this.getMimeType(ext);
    var file = {
      name: name,
      type: type,
      uri:
        Platform.OS === "android"
          ? result.uri
          : result.uri.replace("file://", ""),
    };

    this.setState({ mediaMsg: file });
  };

  documentPicke2r = async () => {
   
    try {
        const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        })
        
      let name = result.name;
      let uri = result.uri;
      let lastIndexOf = uri.lastIndexOf(".");
      let ext = uri.substr(lastIndexOf+1, uri.length-1);
      var file = {
          name: name,
          uri: Platform.OS === 'android' ? result.uri : result.uri.replace("file://", ""),
      };
      this.setState({ mediaMsg: file });
    } catch (err) {
        if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
        } else {
        throw err
        }
    }
  }

  async imagePicker() {
    try {
        let result = await launchImageLibrary({
            mediaType: 'photo',
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.4,
            allowsMultipleSelection: false,
            base64: true,
          });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
        const response = await fetch(result.uri);
        const blob = await response.blob();
        // let name = "Camera_001.jpeg";
        let name = blob.name;
        let uri = result.uri;
        let lastIndexOf = uri.lastIndexOf(".");
        let ext = uri.substr(lastIndexOf + 1, uri.length - 1);
        let type = this.getMimeType(ext);
        var file = {
          name: name,
          type: type,
          uri:
            Platform.OS === "android"
              ? result.uri
              : result.uri.replace("file://", ""),
        };
        this.setState({ mediaMsg: file });
        this.setState({ showModal: true });
      }
      console.log("this is state data");
      console.log(this.state.mediaMsg);
    } catch (E) {
      console.log(E);
    }
  }

 async imagePicker2() {
   
    try {
        let result = await launchImageLibrary({
          mediaType: 'photo',
          //allowsEditing: true,
          aspect: [4, 3],
          quality: 0.4,
          //allowsMultipleSelection: false,
          base64: true,
        });
        if (!result.cancelled) {
          
          const response = await fetch(result.uri);
          const blob = await response.blob();
          // let name = "Camera_001.jpeg";
          let name = blob.name;
          let uri = result.uri;
          let lastIndexOf = uri.lastIndexOf(".");
          let ext = uri.substr(lastIndexOf + 1, uri.length - 1);
          let type = this.getMimeType(ext);
          var file = {
            name: name,
            type: type,
            uri:
              Platform.OS === "android"
                ? result.uri
                : result.uri.replace("file://", ""),
          };
          this.setState({ mediaMsg: file });
  
          
        }
        //console.log(Object.keys(result));
      } catch (E) {
        console.log(E);
      }
  }

  showActionSheet() {
    this.ActionSheet.show();
  }

  renderFullScreenVideo(item) {
    this.props.navigation.navigate("Video", {
      url: item.data.url,
    });
  }

  renderFullScreenImage(item) {
    this.props.navigation.navigate("ImageViewer", {
      url: item.data.url,
    });
  }

  render() {
    const { ismediasent } = this.state;
    // console.log(this.state.messages)
    // console.log(this.props.navigation.state);
    // console.log(this.props.navigation.getParam('uid'));

    const rightComponent = () => {
      return (
        <View style={{ flexDirection: 'row',   alignSelf: "flex-end", justifyContent: "flex-end", alignItems: "center",  }}>
          <View style={{alignItems: "flex-end"}}>
            <Text style={{ color: colors.white, fontSize: wp('5%'), fontWeight: '700' }}>{ this.state.username }</Text>
            <Text style={{color: colors.white,fontSize: wp('3%')}}>5:03PM GMT</Text>
          </View>
          <TouchableOpacity
            style={{
              justifyContent: "flex-end",
              alignItems: "center",
              //justifyContent: "center",
              // backgroundColor: "red",
              padding: 8,
              //paddingBottom: 5,
            }}
            onPress={() => {
              //navigation.openDrawer();
              //Keyboard.dismiss();
              // navigation.navigate("Profile");
              this.props.navigation.goBack()
            }}
          >
            {/* <EntypoIcon name="menu" size={27} style={{}} /> */}

                  <Image
              source={{
                // uri: this.props.auth.avatar,
                // avatar,
                //uri:"https://static.dribbble.com/users/1304678/screenshots/7301908/media/3f91189797dd514eb6446b21a4faa209.png",
              }}
              style={{ ...StyleSheet.absoluteFillObject,borderColor:colors.white, borderWidth:2, position:"relative", borderRadius: 50, width:42, height:42, }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{  justifyContent: "flex-end",
                        alignItems: "center",
                        padding: 8,
                      }}
            onPress={() => {
              this.props.navigation.navigate("CallingScreen",
              {enableDefaultLayout: true, 
                callType: CometChat.CALL_TYPE.AUDIO,
                 isOutgoingCall: true, 
                 userObject: this.state.userObject,
                 entity: {name: 'user',username: this.state.username, status: this.state.status, avatar: this.state.avatar, uid: this.state.uid,},
                  entityType:''});
              }}
            >
                <Feather
                    name="phone-call"
                    size={24}
                    color="white"
                    style={{ opacity: 0.8,  }}
                  />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={{  justifyContent: "flex-end",
                        alignItems: "center",
                        padding: 8,
                      }}
                      onPress={() => {
                        this.props.navigation.navigate("CallingScreen",
                        {enableDefaultLayout: true,
                           callType: CometChat.CALL_TYPE.VIDEO,
                           isOutgoingCall: true, 
                           userObject: this.state.userObject,
                           entity: {name: 'user',username: this.state.username, status: this.state.status, avatar: this.state.avatar, uid: this.state.uid,},
                            entityType:''});
                        }}
            >
                <Feather
                    name="video"
                    size={24}
                    color="white"
                    style={{ opacity: 0.8,  }}
                  />
              </TouchableOpacity>

        </View>
      )
    }
    return (
      <KeyboardAwareView animated={true}>
        {/* <Header
        placement="center"
          leftComponent={
            () => {
              return (
          <View >
            <TouchableOpacity
            style={{
            justifyContent: "flex-end",
            alignItems: "center", 
                padding: 8,    
            
            }}
              onPress={() => {
              this.props.navigation.goBack()
            }}
            >
                <Feather
                    name="arrow-left"
                    size={24}
                    color="white"
                    style={{ opacity: 0.8,  }}
                  />
              </TouchableOpacity>
              </View>
              )}
              }
             
          rightComponent={ rightComponent}
        barStyle={"light-content"}
        containerStyle={{
          backgroundColor: colors.green,
          justifyContent: "space-between",
          borderBottomWidth: 0,
          height:110,
          borderBottomLeftRadius:30,
          borderBottomRightRadius:30
        }}
      /> */}
       <SafeAreaView
        style={{
          backgroundColor: colors.green,
          zIndex: 900000000,
          borderBottomRightRadius: wp('10%'),
          borderBottomLeftRadius: wp('10%'),
          flexDirection: "row",
        }}>
        <View
          style={{
            backgroundColor: 'transparent',
           flex: 1,
            flexDirection: "row",
            paddingVertical: hp('2%'),
            paddingHorizontal: hp('1%'),
            borderBottomRightRadius: wp('10%'),
          borderBottomLeftRadius: wp('10%'),
          }}>
          
            <TouchableOpacity
            style={{
            justifyContent: "flex-end",
            alignItems: "center", 
            alignSelf: 'flex-start',
                padding: 8,    
                marginRight: 'auto'
            
            }}
              onPress={() => {
              this.props.navigation.goBack()
            }}
            >
                <Feather
                    name="arrow-left"
                    size={24}
                    color="white"
                    style={{ opacity: 0.8,  }}
                  />
              </TouchableOpacity>
           

              {rightComponent()}
          
            
        </View>
        
      </SafeAreaView>
        <PreviewModal
          showmodal={this.state.showModal}
          onClose={() => this.setState({ showModal: false, mediaMsg: "" })}
          imguri={this.state.image}
          sendMediaMessage={this.sendMediaMessage}
        />
        <View style={styles.container}>
          <FlatList
            data={this.state.messages.length ? this.state.messages : []}
            renderItem={this.renderItem}
            extraData={this.state.messages}
            keyExtractor={(item) => item.id}
            ref={(ref) => (messagelist = ref)}
            onContentSizeChange={() => this._onContentSizeChange()}
            onRefresh={this._handleRefresh}
            refreshing={this.state.refreshing}
            style={{ marginBottom: 5, padding: wp('3%') }}
          />
          
          {ismediasent && (
            <ActivityIndicator
              style={{ height: 80 }}
              color="#C00"
              size="large"
            />
          )}

          <View style={styles.messageinputcontainer}>
          <View style={styles.messageinputField}>
            <TouchableOpacity
              style={styles.attachmentButton}
              // onPress={this.showActionSheet}
            >
              {/* <Image
                style={{ height: 30, width: 30, alignSelf: "center" }}
                source={require("./src/assets/images/attach_media_icon.png")}
              /> */}
              <Ionicons name="happy-outline" size={24} color={colors.green} />
            </TouchableOpacity>

            <TextInput
              style={{
                flex: 1,
                textAlign: "justify",
                
                padding: 5,
                //  backgroundColor: colors.layout,
                bottom: this.state.keyboardOffset,
              }}
              placeholder="Enter Message"
              // value={this.state.keyboardOffset}
              value={this.state.txtMessage}
              onChangeText={(text) => this.onTextChange(text)}
              />
               <TouchableOpacity
              style={styles.attachmentButton}
              onPress={this.showActionSheet}
            >
              {/* <Image
                style={{ height: 30, width: 30, alignSelf: "center" }}
                source={require("./src/assets/images/attach_media_icon.png")}
              /> */}
              <Ionicons name="ios-attach" size={24} color={Colors.mutedText} />
            </TouchableOpacity>
              </View>

            <TouchableOpacity style={styles.sendButton} onPress={this.sendMsg}>
              <Ionicons name="ios-send" size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>

          <ActionSheet
            title={"Choose File"}
            ref={(o) => (this.ActionSheet = o)}
            options={["Image", "Document", "Cancel"]}
            cancelButtonIndex={2}
            onPress={(index) => {
              if (index == 0) {
                this.imagePicker();
              } else if (index == 1) {
                this.documentPicker();
              }
            }}
          />
        </View>
      </KeyboardAwareView>
      // <View><Text>verifying page</Text></View>
    );
  }

  onTextChange(text) {
    this.setState({ txtMessage: text });
    this.sendTypingIndicator();
  }

  _onContentSizeChange = () => {
    if (this.state.autoScroll) {
      messagelist.scrollToEnd({ animated: false });
    } else {
      setTimeout(() => this.setState({ autoScroll: true }), 500);
    }
  };

  _handleRefresh() {
    this.setState({
      autoScroll: false,
      refreshing: true,
    });
    this.fetchMessages();
  }

  receiveMessages() {
    var listenerID = "CHAT_SCREEN_MESSAGE_LISTENER";

    CometChat.addMessageListener(
      listenerID,
      new CometChat.MessageListener({
        onTextMessageReceived: (textMessage) => {
          if (
            textMessage.sender.uid === uid &&
            textMessage.receiverType === "user"
          ) {
            CometChat.markAsRead(
              textMessage.id,
              textMessage.sender.uid,
              "user"
            );
            this.setState((prevState) => ({
              messages: [...prevState.messages, textMessage],
            }));
            messagelist.scrollToEnd({ animated: false });
          }
        },
        onMediaMessageReceived: (mediaMessage) => {
          if (
            mediaMessage.sender.uid == uid &&
            mediaMessage.receiverType == "user"
          ) {
            CometChat.markAsRead(
              mediaMessage.id,
              mediaMessage.sender.uid,
              "user"
            );
            this.setState((prevState) => ({
              messages: [...prevState.messages, mediaMessage],
            }));
            messagelist.scrollToEnd({ animated: false });
          }
        },
        onCutomMessageReceived: (customMessage) => {
          if (
            customMessage.sender.uid == uid &&
            customMessage.receiverType == "user"
          ) {
            CometChat.markAsRead(
              customMessage.id,
              customMessage.sender.uid,
              "user"
            );
            this.setState((prevState) => ({
              messages: [...prevState.messages, customMessage],
            }));
            messagelist.scrollToEnd({ animated: false });
          }
        },
        onTypingStarted: (typingIndicator) => {
          this.changeTypingText(typingIndicator.sender.uid + " is typing....");
        },
        onTypingEnded: (typingIndicator) => {
          this.changeTypingText(status);
        },
        onMessagesDelivered: (messageReceipt) => {
          var messages = this.state.messages;
          for (var i = 0; i < messages.length; i++) {
            var message = messages[i];
            if (
              message.deliveredAt == null ||
              message.deliveredAt == undefined
            ) {
              message.deliveredAt = messageReceipt.timestamp;
              this.setState({ messages: messages });
            }
          }
        },
        onMessagesRead: (messageReceipt) => {
          var messages = this.state.messages;
          for (var i = 0; i < messages.length; i++) {
            var message = messages[i];
            if (message.readAt == null || message.readAt == undefined) {
              message.readAt = messageReceipt.timestamp;
              this.setState({ messages: messages });
            }
          }
        },
      })
    );
  }

  changeTypingText = (titleText) => {
    const { setParams } = this.props.navigation;
    setParams({ title: titleText });
  };

  sendTypingIndicator() {
    CometChat.startTyping(typingNotification);
  }

  sendMsg() {
    if (this.state.txtMessage != "") {
      CometChat.endTyping(typingNotification);
      this.sendMessage();
    } else if (this.state.mediaMsg != "") {
      this.sendMediaMessage();
    }
  }

  sendMessage() {
    console.log("____LOGMM?s",this.state.uid)
    var receiverType = CometChat.RECEIVER_TYPE.USER;
    console.log(receiverType);
    var textMessage = new CometChat.TextMessage(
      this.state.uid,
      this.state.txtMessage,
      receiverType
    );
   
    CometChat.sendMessage(textMessage).then(
      (message) => {
        console.log("message", message);
        this.setState((prevState) => ({
          txtMessage: "",
          messages: [...prevState.messages, message],
        }));
        // console.log("message__ARRAY__", this.state.messages[0].e);
      },
      (error) => {
        console.log("Message sending failed with error:", error);
      }
    );
  }

  urlToBlob(url) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onerror = reject;
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          resolve(xhr.response);
        }
      };
      xhr.open("GET", url);
      xhr.responseType = "blob"; // convert type
      xhr.send();
    });
  }

  sendMediaMessage() {
    console.log("media message state");
    console.log(this.state.mediaMsg);
    console.log("full image message state");
    console.log(this.state.fullimage);
    var messageType = null;
    if (this.state.mediaMsg.type == "image") {
      messageType = CometChat.MESSAGE_TYPE.IMAGE;
    } else if (this.state.mediaMsg.type == "video") {
      messageType = CometChat.MESSAGE_TYPE.VIDEO;
    } else if (this.state.mediaMsg.type == "audio") {
      messageType = CometChat.MESSAGE_TYPE.AUDIO;
    } else {
      messageType = CometChat.MESSAGE_TYPE.FILE;
    }
    var receiverType = CometChat.RECEIVER_TYPE.USER;
    var mediaMessage = new CometChat.MediaMessage(
      this.state.uid,
      this.state.mediaMsg,
      messageType,
      receiverType
    );
    console.log("media message resp");
    console.log(mediaMessage);
    this.setState({
      mediaMsg: "",
      showModal: false,
      ismediasent: true,
    });

    CometChat.sendMediaMessage(mediaMessage).then(
      (message) => {
        this.setState((prevState) => ({
          messages: [...prevState.messages, message],
        }));
        this.setState({ ismediasent: false });
      },
      (error) => {
        console.log("Media message sending failed with error", error);
      }
    );
  }

  fetchMessages() {
    var limit = 20;
    console.log("frome fetch message method");
    console.log(this.state.uid);
    var mmessagesRequest = new CometChat.MessagesRequestBuilder()
      .setLimit(limit)
      .setUID(this.state.uid)
      .build();
    mmessagesRequest
      .fetchPrevious()
      .then(
        (mess) => {
          // console.log(mess);
          let lastMessage = mess[mess.length - 1];
          if (
            lastMessage.readAt == null ||
            (lastMessage.readAt == undefined &&
              lastMessage.receiverId == myUserID)
          ) {
            CometChat.markAsRead(
              lastMessage.id,
              lastMessage.sender.uid,
              lastMessage.receiverType
            );
          }
          console.log("____MESSAGES__VALUE___", mess)
          this.setState({
            messages: [...mess, ...this.state.messages],
            refreshing: false,
          });
          this.changeTypingText(status);
        },
        (error) => {
          console.log("Message fetching failed with error:", error);
        }
      )
      .catch((err) => {
        console.log(err);
      });
  }
}

const ShadowBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: flex-start;
  ${(props) => (!props.disabled ? `opacity: 1` : `opacity: 0.3`)}
`;

const styles = StyleSheet.create({
  shadowFirst: {
    alignItems: "flex-start",
    opacity: 0.13,
    width: 58,
    height: 60,
    borderRadius: 18,
    backgroundColor: "rgba(48, 197, 123, 255)",
  },
  shadowSecond: {
    alignItems: "flex-start",
    marginStart: -43,
    opacity: 0.24,
    width: 58,
    height: 60,
    borderRadius: 18,
    backgroundColor: "rgba(48, 197, 123, 255)",
  },
  shadowMain: {
    alignItems: "flex-start",
    paddingStart: 17,
    paddingTop: 23,
    marginStart: -43,
    width: 58,
    height: 60,
    borderRadius: 18,
    backgroundColor: "rgba(48, 197, 123, 255)",
  },
  container: {
    flex: 1,
  },
  item: {
    
    fontSize: wp('3%'),
    flexWrap: "wrap",
  },
  itemRight: {
    padding: 10,
    fontSize: 18,
    height: 44,
    alignSelf: "flex-end",
  },
  balloon: {
    alignSelf: "baseline",
    paddingHorizontal: 5,
    paddingVertical: wp('3%'),
    paddingHorizontal: wp('3%'),
    minWidth: wp('20%'),
    borderRadius: 15,
    borderTopLeftRadius: 0,
    marginTop: hp('0.5%')
  },
  selfBaloon: {
    alignSelf: "baseline",
    borderRadius: 15,
    borderTopRightRadius: 0,
    paddingVertical: wp('1.5%'),
    paddingHorizontal: wp('3.5%'),
    minWidth: wp('20%'),
    marginBottom: hp('0.5%')
  },
  row: {
    padding: 5,
    flex: 1,
  },
  messageinput: {
    flex: 1,
    textAlign: "justify",
    height: 50,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#FFFFFF",
  },
  messageinputcontainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    // marginHorizontal: 20,
    // marginBottom: 25,
    paddingHorizontal: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
    paddingVertical: 8,
  },
  messageinputField: {
    flexDirection: "row",
    backgroundColor: colors.layout,
     paddingHorizontal: wp('3%'),
    // marginBottom: 25,
    marginRight: wp('3%'),
    borderRadius: 30,
    alignItems: "center",
    paddingVertical: hp('0.5%'),
    marginVertical: hp('0.5%'),
    flex: 1
  },
  roundedbackgroud: {
    height: 40,
    width: 40,
    margin: 5,
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: "#30C57B",
  },
  attachmentButton: {
    //   backgroundColor: "#ececec",
    width: 30,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButton: {
    backgroundColor: Colors.primary + "30",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
