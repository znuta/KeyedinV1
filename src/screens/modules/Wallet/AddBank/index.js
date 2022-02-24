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
import { GetNigerianBank, GetUserBank, saveBank, validateAccountNumber } from 'src/redux/actions/payment/addCard/cardSetup';
import { useDispatch, useSelector } from 'react-redux';
import SelectField from 'src/component/SelectField';
import {LinearProgress} from 'react-native-elements'

const {width} = Dimensions.get('window');
const AddBank = ({setstep ,bankItems = [], refreshing=false, values={}, onChangeText = ()=>{}}) => {
  const dispatch = useDispatch()
  const {auth} = useSelector(state => state)
  const [loading, setLoading] = useState(refreshing)
  useEffect(()=>{
setLoading(refreshing)
  },[refreshing])
  // const [userBank, setUserBank] = useState({})
  // const [values, setValues] = useState({})
  // const [bankItems, setBankItems] = useState([])
  const {bank, account_number,account_name, amount} = values
  // const onChangeText = (key, value) => {
  
  //   setValues({...values, [key]: value})
    
  // };
  // useEffect(()=>{
  //   dispatch(GetUserBank((res,error)=>{
  //     if (res !==null) {
  //       const {data = []} = res.data
  //       if (data.length) {
  //         setUserBank(data[0])
  //         const payload = data[0]
  //         setUserBank(payload)
  //         setValues({...values, bank: payload.bank_id, account_number: payload.account_number, account_name: payload.account_name})
  //       }
        
  //       console.log("___RES__USER_BANK",res)
  //     }else{
  //       console.log("___ERROR__USER_BANK",error)
  //     }

  //   }))
  //   dispatch(GetNigerianBank((res,error)=>{
  //     if (res !==null) {
  //       const {data} = res.data
  //       setBanks(data)
  //       const bankSelections = []
  //       data.forEach(item => {
  //         bankSelections.push({label: item.name, value: item.id})
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
      <Text style={styles.walletHeader}> Withdrawal Bank</Text>
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
          Enter the bank you would like to add to
        </Text>
        <Text style={{color: 'gray'}}>your keyedin wallet.</Text>
      </View>
      {
        loading && <LinearProgress value={loading} style={{ marginVertical: 10 }} color={colors.green} />
      }
      
      <View style={{width: wp('80%')}}>
      <TextField
        value={account_name}
        label="Account Name"
        onChangeText={value => onChangeText('account_name', value)}
        placeholder="Account Name e.g Toyeeb Atunde"
        
      />
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
        value={account_number}
        label="Account Number e.g 0124707068"
        onChangeText={value => onChangeText('account_number', value)}
        placeholder="Account Number e.g 0124707068"
        keyboardType="phone-pad"
      />
      </View>
      {bankItems.length ? <View style={{width: wp('80%')}}>
      <SelectField 
      value={bank}
        label="Select Bank"
        items={[...bankItems]}
        onChangeText={itemValue => onChangeText('bank', itemValue)} />
      </View>: null}
      
      <View style={{marginTop: wp(15)}}>
        {/* <TouchableOpacity onPress={setstep} style={styles.buttonStyle}>
          <Text
            style={{color: 'white', fontWeight: 'bold', fontSize: wp('5%')}}>
            Proceed
          </Text>
        </TouchableOpacity> */}
        <Button
        disabled={refreshing}
        loading={refreshing}
          onPress={()=>{
            setstep()
            // const newBank = banks.filter(x=> x.id === bank)
            // console.log("___NEW__FILTER__BANK", newBank)
            // dispatch(validateAccountNumber({...values, bank: newBank[0]},(res,error)=>{
            //   if (res !==null) {
            //     const {data} = res.data
            //    dispatch(saveBank({account_number,account_name,user_id: auth.userData.id, bank_id: newBank[0].id},(res,error)=>{
            //       if (res !==null) {
            //         const {data} = res.data
            //         console.log("___RES__BANK__", res)
            //       }else{
            //         console.log("___ERROR___BANK",error)
            //       }
            //     }))
            //     console.log("___RES__Valid3",res)
            //   }else{
            //     console.log("___ERROR__Valid_BANK",error)
            //   }
        
            // }))
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
export default AddBank;

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
