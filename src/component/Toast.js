
import React from 'react';
import {StyleSheet, View, Modal,Text, ActivityIndicator} from 'react-native';
// import * as Progress from 'react-native-progress';
// import {ActivityIndicator} from 'react-native-paper';
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons' 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons' 
import { wp, hp, fonts, colors } from 'src/config/variables';
import Button from './Button';
const Toast = props => {
  const {loading, title = "Toast", message = "", show = false, type = "success", callback, ...attributes} = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={show}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          {
            type === 'success' && <Ionicons
            name="md-checkmark-circle-sharp"
            style={{fontSize: wp('10%'),
            marginTop: wp("-2%")
          }}
            color={colors.green}
          />
          }
           {
            type === 'error' && <MaterialIcons
            name="cancel"
            style={{fontSize: wp('10%'),
            marginTop: wp("-2%")
          }}
            color={colors.red}
          />
          }

          <Text style={styles.toastTitle}>{title}</Text>
               
         <Text style={styles.toastMsg}>{message}</Text>
         {callback && <Button additionalStyle={{
           button:{ 
            width: wp('20%'),
           
            paddingVertical: hp('0.6%'),
           },
           text:{
             fontSize: wp('4%')
           }
           
         }} text="Ok" onPress={callback} />}
         
          {/* <Progress.Circle size={30} indeterminate={true} /> */}
        </View>
      </View>
    </Modal>
  );
};
export default Toast;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
   paddingHorizontal: wp('5%'),
   paddingVertical: wp('6%'),
   minWidth: wp('50%'),
   maxWidth:wp('80%'),
   minHeight: hp('10%'),
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  toastMsg:{
    fontSize: wp('3.5%'),
marginBottom: hp('0.7%'),
    fontFamily: fonts.PRIMARY_REGULLAR,
    fontWeight: '300',
    textAlign: 'center'
  },
  toastTitle:{
    fontSize: wp('4%'),
    marginVertical: wp('1%'),
    fontFamily: fonts.PRIMARY_REGULLAR,
    fontWeight: '600',
    textAlign: 'center'
    
  },

});
