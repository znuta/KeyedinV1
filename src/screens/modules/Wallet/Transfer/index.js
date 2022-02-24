/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {wp, fonts, colors, hp} from 'src/config/variables';
import TextField from 'src/component/TextField';
import Button from 'src/component/Button';
import styled from 'styled-components/native';
import { GetNigerianBank, tranferFund, validateAccountNumber } from 'src/redux/actions/payment/addCard/cardSetup';
import { useDispatch, useSelector } from 'react-redux';
import SelectField from 'src/component/SelectField';
import Loader from 'src/component/Loader';

const {width} = Dimensions.get('window');
const Transfer = ({setstep}) => {
  const dispatch = useDispatch()
  const {auth} = useSelector(state=>state)
  const [banks, setBanks] = useState([])
  const [values, setValues] = useState({})
  const [bankItems, setBankItems] = useState([])
  const {bank, receiver_email, amount} = values

  const onChangeText = (key, value) => {
   
    setValues({...values, [key]: value})
    
  };

  // useEffect(()=>{
  //   dispatch(GetNigerianBank((res,error)=>{
  //     if (res !==null) {
  //       const {data} = res.data
  //       setBanks(data)
  //       const bankSelections = []
  //       data.forEach(item => {
  //         bankSelections.push({label: item.name, value: item})
  //       });
  //       setBankItems(bankSelections)
  //       console.log("___RES__NIGERIAN_BANK",res)
  //     }else{
  //       console.log("___ERROR__NIGERIAN_BANK",error)
  //     }

  //   }))
  // },[])

  return (
    <View style={styles.walletContainer}>
       {auth.loading && <Loader />}
      <Text style={styles.walletHeader}> Transfer Amount</Text>
      <View
        style={{
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: '#e0e6ed',
          width: width / 1.2,
          marginTop: 10,
        }}
      />
      <View
        style={{marginTop: 10, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: 'gray'}}>
          Enter the amount you would like to transfer from
        </Text>
        <Text style={{color: 'gray'}}>your keyedin wallet.</Text>
      </View>
      
      <View style={styles.inputContainer}>
        <View style={styles.nairaStyle}>
          <Text style={{fontWeight: 'bold', fontSize: wp('7%')}}>N</Text>
        </View>
        <InputField >
          <TextInput
          value={amount}
            placeholder="Amount"
            onChangeText={value => onChangeText('amount', value)}
            style={[styles.inputField]}
            keyboardType="phone-pad"
          />
        </InputField>
       
      </View>
      <Text
        style={{
          color: colors.green2,
          width: '100%',
          textAlign: 'right',
          fontWeight: 'bold',
          fontSize: wp(3),
        }}>
        Min. Transfer amount of NGN 500
      </Text>
      <View style={{width: wp('80%')}}>
      <TextField
       label="Receipient Email"
        value={receiver_email}
        keyboardType="email-address"
         autoCapitalize="none"
        onChangeText={value => onChangeText('receiver_email', value)}
        placeholder="Account Email e.g atundearisekola@gmail.com"
        
      />
      </View>
      
      <View style={{marginTop: wp(15)}}>
       
        <Button
          onPress={()=>{

            setstep(values)
            
          }}
          text="Proceed"
          type="primary"
          additionalStyle={{
            button: {

              width: wp('40%'),
              borderRadius: 50,
              paddingVertical: hp('1.5%'),
            },
          }}
        />
      </View>
    </View>
  );
};
const InputField = styled.View`
  width: 90%;
  background-color: #f2f3f4;
  border-top-right-radius: 50;
  border-bottom-right-radius: 50;
  flex-direction: row;
  padding-horizontal: ${wp('3%')};
  height: ${wp('12%')};
  align-items: center;
`;
export default Transfer;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: colors.green,
    width: wp('55%'),
    height: wp('13%'),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nairaStyle: {
    backgroundColor: '#f2f3f4',
    width: wp(10),
    height: wp('12%'),
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: '#8492a6',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  walletHeader: {
    fontSize: wp('8%'),
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
  walletContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp('10%'),
  },
});
