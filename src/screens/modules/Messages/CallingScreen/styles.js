import React from "react";
import {
  StyleSheet,

} from "react-native";

import Layout from "src/constants/Layout";
import Colors from "src/constants/Colors";
import {colors, fonts, hp, wp} from 'src/config/variables';
 const styles = StyleSheet.create({
   callContainer:{  flex: 1, backgroundColor: colors.white, alignItems: 'center'},
   callImageBackground:{flex: 0.85,
    backgroundColor: colors.green,
     width: wp('100%'),
    borderBottomRightRadius: wp('7%'), 
    borderBottomLeftRadius: wp('7%'),
    justifyContent: 'center',
    alignItems: 'center'
   },
   callImage:{
    ...StyleSheet.absoluteFillObject,
    borderColor: colors.white,
    borderWidth: wp('3%'),
    position: 'relative',
    borderRadius: 100,
    width: wp('50%'),
    height: wp('50%'),
  },
  callName:{ fontSize: wp('6%'), color: '#FFF', marginTop: hp('2%'), fontFamily:fonts.PRIMARY_BOLD,fontWeight: '700' },
  callText:{ fontSize: wp('4%'), color: '#FFF', marginTop: hp('1%'), fontFamily:fonts.PRIMARY_BOLD,fontWeight: '400' },
  hangupButton:{ padding: 16, borderRadius: 100, backgroundColor: 'red', height: 64, width: 64 , marginHorizontal: wp('10%'),},
  answerButton:{ padding: 16, borderRadius: 100, backgroundColor: colors.green, height: 64, width: 64, marginHorizontal: wp('10%') },
  callBottomBar:{ flex: 0.15, 
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

       },
       callBottomBarBtn:{fontSize: wp('10%'), color: colors.white}
    




 });
  
 export default styles