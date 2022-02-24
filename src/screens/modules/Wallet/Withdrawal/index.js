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
import { GetNigerianBank, GetUserBank, intializePayment, validateAccountNumber } from 'src/redux/actions/payment/addCard/cardSetup';
import { useDispatch, useSelector } from 'react-redux';
import SelectField from 'src/component/SelectField';

const {width} = Dimensions.get('window');
const Deposit = ({setstep}) => {
  const dispatch = useDispatch()
  const {auth} = useSelector(state => state)
  const [banks, setBanks] = useState([])
  const [values, setValues] = useState({email: auth.userData.email, full_name: `${auth.userData.first_name} ${auth.userData.last_name}`})
  const [bankItems, setBankItems] = useState([])
  const {full_name, email, amount} = values
  const onChangeText = (key, value) => {
   
    setValues({...values, [key]: value})
    
  };
  useEffect(()=>{
    // dispatch(GetUserBank((res,error)=>{
    //   if (res !==null) {
    //     const {data = []} = res.data
    //     if (data.length) {
         
    //       const payload = data[0]
       
    //       setValues({...values, bank_id: payload.bank_id, })
    //     }
        
    //     console.log("___RES__USER_BANK",res)
    //   }else{
    //     console.log("___ERROR__USER_BANK",error)
    //   }

    // }))
  },[])
  return (
    <View style={styles.walletContainer}>
      <Text style={styles.walletHeader}> Withdrawal Amount</Text>
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
          Enter the amount you would like to add to
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
        Min. deposit amount of NGN 500
      </Text>
      <View style={{width: wp('80%')}}>
      <TextField
        value={full_name}
        onChangeText={value => onChangeText('full_name', value)}
        placeholder="Toyeeb Atunde"
        placeholder="Full Name"
        
      />
      </View>
      <View style={{width: wp('80%')}}>
      <TextField
        value={email}
        onChangeText={value => onChangeText('email', value)}
        placeholder="atundearisekola@gmail.com"
        placeholder="Email Address"
        
      />
      </View>
      
      <View style={{marginTop: wp(15)}}>
        {/* <TouchableOpacity onPress={setstep} style={styles.buttonStyle}>
          <Text
            style={{color: 'white', fontWeight: 'bold', fontSize: wp('5%')}}>
            Proceed
          </Text>
        </TouchableOpacity> */}
        <Button
          onPress={()=>{
            setstep(values)
           
          }}
          text="Proceed"
          type="primary"
          additionalStyle={{
            button: {
              //  marginTop: hp('5%'),
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
export default Deposit;

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
