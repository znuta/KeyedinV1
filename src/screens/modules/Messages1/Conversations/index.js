import React, {useCallback, useState, useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  FlatList,
  RefreshControl,
} from "react-native";
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Colors from "src/constants/Colors";
import styles from "./styles";
import { Header, Icon } from "react-native-elements";
import { getAllConversations } from "src/redux/actions/ChatActions";
import { connect, useDispatch, useSelector } from "react-redux";
import Layout from "src/constants/Layout";
import TimeAgo from "react-native-timeago";
import { useNavigation } from "@react-navigation/native";
import styled from 'styled-components';
import {colors, fonts, hp, wp} from 'src/config/variables';
import { debounce } from "debounce";

function Conversations(props) {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const {auth, chat} = useSelector(state=>state)
  const [refreshing, setRefreshing] = useState(false);
  const [filterParam, setFilterParam] = useState(null);
  const [filterResult, setFilterResult] = useState([]);

  useEffect(() => {
    dispatch(getAllConversations((response) => {
     
      setFilterResult(response)
      setRefreshing(false)
    }));
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    dispatch(getAllConversations((response) => {
     
      setFilterResult(response)
      setRefreshing(false)
    }));
  }, refreshing);

  const _filterMessages = (text) => {
    
    if (text) {
      
      const filtered = chat.conversations.filter((convo) => {
        const convoData = `${convo.conversationWith.name.toLowerCase()}`;
        const filterData = text.toLowerCase();
        return convoData.indexOf(filterData) > -1;
      });
     
      setFilterResult(filtered);

    }
   
  };

  const _resetFilter = () => {
    setFilterParam("");
    setFilterResult([]);
  };

  const handler = useCallback(debounce((filterParam)=>_filterMessages(filterParam), 1000), []);
  useEffect(() => {
  
    if (filterParam !== "") {
      handler(filterParam)
    }else{
      if (filterParam !== null ) {

        dispatch(getAllConversations((response) => {
          
          setFilterResult(response)
          setRefreshing(false)
        }));

      }
    }
   
},[filterParam])

  
  const MessageItem = ({ conversation }) => {
   
    let peerId = conversation.conversationWith.uid;
    let peerName = conversation.conversationWith.name;
    return (
      <InnerContentContainer>
      <TouchableOpacity
        style={styles.messageWrap}
        activeOpacity={0.4}
        onPress={() => {
          props.navigation.navigate("ChatScreen", {
            nested: true,
            username: peerName,
            uid: peerId,
          });
        }}
      >
        <View>
            <Image
              source={{ uri: conversation.conversationWith.avatar }}
              style={styles.messageImageWrap} />
          
            
            <View
            style={[styles.status, {backgroundColor:
              conversation.conversationWith.status == "online"
                ? "#21C600"
                : "#eaeaea",}]}
          ></View>
            </View>
       
        <View style={styles.messageContent}>
          <View style={styles.messageTitleRow}>
            <Text style={styles.messageSender}>{peerName}</Text>
            <Text style={styles.messageTime}>
              <TimeAgo
                time={new Date(conversation.lastMessage.sentAt * 1000)}
              />
            </Text>
            </View>
            {/* <Text style={styles.messageHeader}>
                {conversation.lastMessage.header.substr(0, 67) +
                  (conversation.lastMessage.header.length > 67 ? "..." : "")}
              </Text> */}
          <View style={styles.messageBodyRow}>
            {conversation.lastMessage.category === "message" ? (
              <Text style={styles.messageBody}>
                {conversation.lastMessage.text.substr(0, 67) +
                  (conversation.lastMessage.text.length > 67 ? "..." : "")}
              </Text>
            ) : conversation.lastMessage.category == "call" ? (
              <View
                style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
              >
                <Feather
                  name={
                    conversation.lastMessage.action == "cancelled"
                      ? "phone-missed"
                      : "phone"
                  }
                  size={16}
                  style={{
                    marginRight: 7,
                    color:
                      conversation.lastMessage.action == "cancelled"
                        ? Colors.errorBackground
                        : Colors.secondary,
                  }}
                />
                <Text style={styles.messageBody}>
                  {conversation.lastMessage.type === "audio"
                    ? "Missed voice call"
                    : conversation.lastMessage.type === "video"
                    ? "Missed video call"
                    : "Missed call"}
                </Text>
              </View>
            ) : (
              <Text>You received a message</Text>
            )}
            {/* {conversation.unreadMessageCount !== 0 && (
              <View style={styles.unreadCountWrap}>
                <Text style={styles.unreadCount}>
                  {conversation.unreadMessageCount}
                </Text>
              </View>
            )} */}
          </View>
        </View>
          {/* <Text>{JSON.stringify(conversation.lastMessage.type)}</Text> */}
         
      </TouchableOpacity>
      </InnerContentContainer>
    );
  };

  const EmptyMessages = () => {
    return (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
         
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1, alignItems: "center" }}>
          <View style={styles.emptyContainer}>
            <View style={styles.emptyImagePlaceholder}>
              <Image
                source={require("src/assets/illustrations/proposal_empty.jpg")}
                style={styles.emptyImageStyles}
              />
            </View>
            <View style={styles.emptyTextWrap}>
              <Text style={styles.emptyTitle}>Oops! No messages yet</Text>
              <Text style={styles.emptySubtitle}>
                Looks like you do not have any messages yet.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };

  const AllConversations = () => {
    return (
      <FlatList
        data={
           filterResult
        }
        showsVerticalScrollIndicator={false}
        style={styles.conversationsWrap}
        renderItem={({ item }) => <MessageItem conversation={item} />}
        keyExtractor={(item) => item.conversationId.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header
        placement="center"
        leftComponent={
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
                          navigation.navigate("Profile");
                        }}
                      >
                        {/* <EntypoIcon name="menu" size={27} style={{}} /> */}

                              <Image
                          source={{
                            uri: auth.userData.avatar,
                            // avatar,
                            //"https://static.dribbble.com/users/1304678/screenshots/7301908/media/3f91189797dd514eb6446b21a4faa209.png",
                          }}
                          style={{ ...StyleSheet.absoluteFillObject,borderColor:colors.white, borderWidth:2, position:"relative", borderRadius: 50, width:42, height:42, }}
                        />
                      </TouchableOpacity>
              }
        centerComponent={{
          text: "Messages",
          style: { color: "#fff", fontWeight: "500", fontSize: 18 },
        }}
        // rightComponent={ 
        //       <TouchableOpacity
        //       style={{
        //                   justifyContent: "flex-end",
        //                   alignItems: "center",
        //                   //justifyContent: "center",
        //                   // backgroundColor: "red",
        //                   padding: 8,
        //                   //paddingBottom: 5,
        //                 }}
        //       onPress={() => {
        //           //alert('to be implemented');
        //           //isProposal = false;
        //           //setIsProposal(false);
        //         }}
        //       >
        //           <Feather
        //               name="more-vertical"
        //               size={24}
        //               color="white"
        //               style={{ opacity: 0.8,  }}
        //             />
        //         </TouchableOpacity>}
        barStyle={"light-content"}
        containerStyle={{
          backgroundColor: colors.green,
          justifyContent: "space-between",
          borderBottomWidth: 0,
          height:110,
          borderBottomLeftRadius:50,
          borderBottomRightRadius:50
        }}
      />
      
        <View style={styles.searchWrap}>
          <View style={styles.search}>
            <Feather name="search" size={20} color="grey" />
            <TextInput
              placeholder="Search by name..."
              //placeholderTextColor="white"
              style={styles.searchInput}
              onChangeText={(param) =>{ 
              
                setFilterParam(param)}}
              value={filterParam}
              autoCorrect={false}
            />
            {filterParam ? 
              <MaterialIcons
                name="cancel"
                color="grey"
                size={18}
                onPress={() => _resetFilter()}
              />: null
            }
          </View>
        </View>
     

      <View
        style={[
          styles.content,
          { marginTop: filterResult.length === 0 ? 10 : 0 },
        ]}
      >
        {filterResult.length === 0 ? (
          <EmptyMessages />
        ) : (
          <AllConversations />
        )}
      </View>

      <StatusBar hidden={false} />
    </View>
  );
}


const InnerContentContainer = styled.View`
  padding-vertical: ${hp('0.1%')};
  background-color: #ffffff;
  margin-vertical: ${hp('1%')};
min-height: ${hp('10%')}
  flex: 1;
  padding-horizontal: ${wp('2%')};

  border-radius: ${wp('4%')};
  ${'' /* align-items: center; */}
`;



export default Conversations;
