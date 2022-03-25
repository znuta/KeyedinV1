import React from "react";
import {
  StyleSheet,

} from "react-native";

import Layout from "src/constants/Layout";
import Colors from "src/constants/Colors";
import {colors, fonts, hp, wp} from 'src/config/variables';
 const styles = StyleSheet.create({
    container: {
      flex: 1,
      //backgroundColor: colors.green,
    },
    headerWrap: {
      paddingVertical: 10,
    },
    searchWrap: {
      paddingTop: wp('2%'),
      paddingHorizontal: wp('5%'),
     
    },
    search: {
      flexDirection: "row",
      backgroundColor: "#FFFFF99",
      borderRadius: 30,
      alignItems: "center",
      paddingLeft: wp('4%')
    },
    status:{
      height: 15,
      width: 15,
      borderRadius: 8,
      borderWidth: 3,
      borderColor: "#FFFFFF",
      
      position: "absolute",
      bottom: 0,
      right: 10,
    },
    searchInput: {
      marginLeft: wp('2%'),
      flex: 1,
      fontSize: wp('5%'),
     
    },
    content: {
      flex: 1,
     
      paddingHorizontal: wp('3%'),
      paddingVertical: 20,
    },
    conversationsWrap: {
      flex: 1,
    },
    messageWrap: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: hp('1%'),
     
    },
    messageImageWrap: {
      height: wp('18%'),
      width: wp('18%'),
      borderRadius: 20,
      backgroundColor: "#eee",
      marginRight: wp('3%'),
    },
    messageContent: {
      flex: 1,
    },
    messageTitleRow: {
      flexDirection: "row",
      marginBottom: 5,
    },
    messageSender: {
      fontWeight: "700",
      fontSize: wp('3.5%'),
      flex: 1,
      marginRight: 10,
      color: colors.green,
    },
    messageTime: {
      color: Colors.mutedText,
      fontSize: wp('3%')
    },
    messageBodyRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    messageBody: {
      color: colors.grey,
      lineHeight: 20,
      flex: 1,
      fontSize: wp('3%')
    },
    messageHeader: {
      color: colors.black,
      lineHeight: 20,
      flex: 1,
      fontSize: wp('3.5%')
    },
    unreadCountWrap: {
      height: 20,
      width: 20,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Colors.primary,
    },
    unreadCount: {
      color: "#FFFFFF",
      fontWeight: "500",
      fontSize: 13,
    },
    emptyContainer: {
      flex: 1,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 30,
    },
    emptyImagePlaceholder: {
      height: Layout.window.width * 0.65,
      width: Layout.window.width * 0.65,
      backgroundColor: "#eee",
      marginBottom: 40,
      // marginTop: -100,
      borderRadius: 16,
    },
    emptyImageStyles: {
      ...StyleSheet.absoluteFill,
      height: Layout.window.width * 0.7,
      width: Layout.window.width * 0.7,
    },
    emptyTitle: {
      textAlign: "center",
      marginBottom: 10,
      fontSize: 18,
      fontWeight: "700",
    },
    emptySubtitle: {
      textAlign: "center",
      marginBottom: 10,
      fontSize: 15,
      lineHeight: 22,
      color: Colors.mutedText,
    },
 });
  
 export default styles