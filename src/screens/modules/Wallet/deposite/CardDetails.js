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
import {wp, fonts, colors} from 'src/config/variables';
import TextField from 'src/component/TextField';
import Button from 'src/component/Button';
import styled from 'styled-components/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const {width} = Dimensions.get('window');
const CardDetails = ({setstep, _onChange=()=>{}}) => {
  return (
    <View style={styles.walletContainer}>
      <Text style={styles.walletHeader}>Enter Card Details</Text>
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
          Enter your card details from which you would like
        </Text>
        <Text style={{color: 'gray'}}>
          to add funds to your keyedin wallet.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.nairaStyle}>
          <FontAwesome name="credit-card" size={20} color="gray" />
        </View>
        <InputField>
          <TextInput
            placeholder="Card Number"
            style={[styles.inputField]}
            keyboardType="phone-pad"
            onChangeText={(v) => {
              _onChange("cardNumber",v)
            }}
          />
        </InputField>
      </View>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          flexDirection: 'row',

        }}>
        <View style={[styles.inputContainer, {flex: 0.45}]}>
          <View style={styles.nairaStyle}>
            <FontAwesome name="calendar" size={20} color="gray" />
          </View>
          <InputField>
            <TextInput
              placeholder="Expiry Date"
              style={[styles.inputField]}
              keyboardType="phone-pad"
              onChangeText={(v) => {
                _onChange("expiry",v)
              }}
            />
          </InputField>
        </View>
        <View style={[styles.inputContainer, {flex: 0.45}]}>
          <View style={styles.nairaStyle}>
            <MaterialIcons name="lock" size={20} color="gray" />
          </View>
          <InputField>
            <TextInput
              placeholder="CVV"
              style={[styles.inputField]}
              keyboardType="phone-pad"
              onChangeText={(v) => {
                _onChange("cvv",v)
              }}
            />
          </InputField>
        </View>
      </View>

      <View style={{marginTop: wp(15)}}>
        <TouchableOpacity onPress={setstep} style={styles.buttonStyle}>
          <Text
            style={{color: 'white', fontWeight: 'bold', fontSize: wp('5%')}}>
            Proceed
          </Text>
        </TouchableOpacity>
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
export default CardDetails;

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
    paddingLeft: 10,
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
  inputChildren: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
