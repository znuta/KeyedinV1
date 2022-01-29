/* eslint-disable react-native/no-inline-styles */
import React from 'react';
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

const {width} = Dimensions.get('window');
const Deposit = ({setstep, onChangeText=()=>{}}) => {
  return (
    <View style={styles.walletContainer}>
      <Text style={styles.walletHeader}> Deposit Amount</Text>
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
        <InputField>
          <TextInput
            placeholder="Amount"
            style={[styles.inputField]}
            keyboardType="phone-pad"
            onChangeText={(v) => {
              onChangeText("amount",v)
            }}
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

      <View style={{marginTop: wp(15)}}>
        {/* <TouchableOpacity onPress={setstep} style={styles.buttonStyle}>
          <Text
            style={{color: 'white', fontWeight: 'bold', fontSize: wp('5%')}}>
            Proceed
          </Text>
        </TouchableOpacity> */}
        <Button
          onPress={setstep}
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
