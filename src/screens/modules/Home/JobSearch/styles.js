import {
    StyleSheet,
    
} from 'react-native';
  
import {colors, hp, wp} from 'src/config/variables';
 export default  StyleSheet.create({
    container: {
      flex: 1,
      //marginRight: 20,
      backgroundColor: colors.backgroundHome,
      //paddingTop: Constants.statusBarHeight,
      // position:"relative"
    },
    rect3: {
      width: '80%',
      height: '100%',
      backgroundColor: colors.lowergreen,
      borderRadius: 16,
  
      flexDirection: 'row',
    },
    filterContainer: {
      flex: 1,
      paddingHorizontal: wp('5%'),
    },
    filterHeader: {
      flexDirection: 'row',
      marginBottom: hp('2%'),
      alignItems: 'center',
    },
    icon4: {
      color: '#000',
      fontSize: 30,
      height: 33,
      width: 30,
      marginTop: 6,
    },
    icon40: {
      color: '#000',
      fontSize: 20,
      height: 33,
      width: 30,
      marginTop: 6,
    },
    textInput: {
      //fontFamily: "roboto-regular",
      color: colors.black,
      height: 44,
      width: 183,
      textAlign: 'left',
      marginLeft: 10,
    },
    icon5: {
      color: 'rgba(128,128,128,1)',
      fontSize: 30,
      //height: 33,
      width: '100%',
      //marginLeft: 4,
      marginTop: 4,
    },
    icon50: {
      color: 'rgba(128,128,128,1)',
      fontSize: 30,
      height: 33,
      width: 30,
      //marginLeft: 4,
      //marginTop: 7,
    },
    icon4Row: {
      height: '100%',
  
      flexDirection: 'row',
      flex: 1,
      marginRight: 11,
      marginLeft: 7,
    },
    icon3: {
      color: 'rgba(128,128,128,1)',
      fontSize: 40,
      marginLeft: 20,
    },
    rect3Row: {
      height: 40,
      flexDirection: 'row',
      marginTop: 10,
      marginBottom: 20,
      //marginLeft: 24,
      //marginRight: 24,
    },
    rect5: {
      //width: "100%",
      //height: "100%",
      //backgroundColor: colors.disabled,
      //alignItems: "center",
      marginTop: 13,
      justifyContent: 'center',
      //marginBottom: 120,
      //borderRadius: 10,
      //marginLeft: 24,
      flex: 1,
    },
    text: {
      fontSize: 22,
      fontWeight: 'bold',
      //marginVertical: hp("2%"),
      color: colors.white,
    },
    textcontainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: hp('1%')
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
      //width: "60%",
      //height: "70%",
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    openButton: {
      backgroundColor: '#F194FF',
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
 });
  
 