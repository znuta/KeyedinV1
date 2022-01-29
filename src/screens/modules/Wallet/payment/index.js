/* eslint-disable react-native/no-inline-styles */
import React, { useState,useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather'
import { colors, hp, wp } from 'src/config/variables';
import TextField from 'src/component/TextField';
import TextArea from 'src/component/TextArea';
import SelectField from 'src/component/SelectField';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import Button from 'src/component/Button';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Paystack from 'src/assets/illustrations/paystack.svg';
import Flutterwave from 'src/assets/illustrations/Flutterwave.svg';
import { Switch } from 'react-native-elements';
import CardDetails from '../deposite/CardDetails';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useDispatch, useSelector } from "react-redux";
import { AddPaymentApi, ChargeCard, GetCards, SetupPayment } from 'src/redux/actions/payment/addCard/cardSetup';
import { setLoading } from 'src/redux/actions/AuthActions';
import { BASEURL } from 'src/constants/Services';
import axios from 'axios';
import Empty from 'src/component/Empty';
import PaymentCard from 'src/component/PaymentCard';
const SCREEN_HEIGHT = Dimensions.get('window').height;

const mock = [];

const Payment = props => {
  const navigation = useNavigation();
  const {auth} = useSelector(state=>state)
  const [checked, setchecked] = useState(false);
  const [cards, setCards] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const refDepositeSheet = useRef();
  const [value, setValue] = useState({});
  const [paymentResponse, setPaymentResponse] = useState({});
  const dispatch = useDispatch()
  const _onChange = (k, v) => setValue({ ...value, [k]: v });

  useEffect(()=>{
    console.log("___paymentResponse__", {card_id: paymentResponse.reference, user_id: auth.userData.id,amount:50/100})
    // dispatch(ChargeCard({card_id: paymentResponse.payment_ref, user_id: auth.userData.id,amount:50/100},
    //     (res,err)=>{
    //     console.log("___RE___NEW__CARD__", res)
    //     console.log("___RE___NEW__CARD__", err)

    //     })
         
    //    )
    if (paymentResponse) {
     
    }
      
  },[paymentResponse])
  
  

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    dispatch(GetCards((res,err)=>{
      if (err !== null) console.log("___ERROR__Card__His", err)

      if (res !== null){ 
        const {data} = res.data
        setCards(data)};

      }));
   
  }, []);
  

  useEffect(()=>{
    dispatch(GetCards((res,err)=>{
      if (err !== null) console.log("___ERROR__Card__HIis", err)

      if (res !== null){ 
        const {data} = res.data
        setCards(data)};

      }));
  },[])

  
  const { back, next } = props;
  const BackButton = () => {
    return (
      <TouchableOpacity
        // style={{ paddingLeft: 10 }}
        onPress={() => navigation.goBack()}>
        <Feather name="chevron-left" size={28} color="white" />
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar backgroundColor={colors.green} />
      <View
        style={{
          backgroundColor: colors.green,
          height: wp('25%'),
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <BackButton />
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
          Set-Up Payments
        </Text>
        <View />
      </View>
      <View
        style={{
          display: 'flex',
          flex: 1,
          //   justifyContent: 'center',
          alignItems: 'center',
          //  paddingHorizontal: wp('8%'),
          marginTop: -20,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          backgroundColor: 'white',
          paddingVertical: wp('4%'),
        }}>
        <Text
          style={{
            color: colors.grey,
            fontSize: 15,
            textAlign: 'left',
            width: '90%',
            fontWeight: 'bold',
          }}>
          Add payment method
        </Text>
        <View
          style={{
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: colors.grey,
            marginVertical: 10,
            display: 'flex',
            width: '90%',

          }}
        />
        <TouchableOpacity>
          <Image
            source={require('src/assets/illustrations/paystack.png')}
            style={{ width: 150, height: 50, resizeMode: 'contain' }}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={require('src/assets/illustrations/flutterwave.png')}
            style={{ width: 150, height: 90, resizeMode: 'contain' }}
          />
        </TouchableOpacity>
        
        <View style={{ width: '90%' }}>
          <Text style={{ fontWeight: 'bold' }}>saved cards</Text>
        </View>
        <View
          style={{
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: colors.grey,
            marginVertical: 10,
            display: 'flex',
            width: '90%',
          }}
        />

      <CardsWrap >
          
          <FlatList
         data={[{},{}]}
         showsVerticalScrollIndicator={false}
         contentContainerStyle={{paddingBottom: 80}}
         style={{flex: 1, paddingTop: 10}}
         renderItem={({item, index}) =>  <PaymentCard item={item} />}
         keyExtractor={(item, index) => index.toString()}
         onRefresh={() => onRefresh()}
         refreshing={refreshing}
         ListEmptyComponent={
           <Empty
             title={'No Card'}
             subTitle={' You have no card yet !!'}
           />
         }
       />

       </CardsWrap>

        <TouchableOpacity
          onPress={() => {
            refDepositeSheet.current.open();

          }}>
          <View style={styles.addPayment}>
            <Text>
              <Text style={{ fontSize: 20, color: colors.green }}> + </Text>Add
              Payment Method
            </Text>
          </View>
        </TouchableOpacity>

        <View
          style={{
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: colors.grey,
            marginVertical: 10,
            display: 'flex',
            width: '90%',
          }}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',
          }}>
          <Text
            style={{
              color: colors.grey,
              fontSize: 15,
              textAlign: 'left',
              width: '90%',
              fontWeight: 'bold',
            }}>
            Use Cash Payment
          </Text>

          <Switch
            color="green"
            value={checked}
            onValueChange={value => setchecked(value)}
          />
        </View>
      </View>
      <RBSheet
        ref={refDepositeSheet}
        height={hp('70%')}
        animationType="slide"
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          wrapper: {
            // backgroundColor: 'transparent',
            borderTopLeftRadius: 10,
          },
          draggableIcon: {
            backgroundColor: 'lightgrey',
            width: '30%',
            height: '11%',
          },
        }}>
        <CardDetails _onChange={_onChange} setstep={() => {
          dispatch(SetupPayment(value, (ref) => {
            dispatch(AddPaymentApi(ref,
              (res,err)=>{
              if (err !== null) console.log("ADD_NEW_CAD", err)
      
              if (res !== null) navigation.navigate('Home');
      
              })
              )
              setPaymentResponse(ref)
          }))
        }}  />
      </RBSheet>
    </View>
  );
};

export default Payment;

const CardsWrap = styled.View`
  margin-top: 25px;
  flex: 1;
  width: ${wp('100%')};
  padding-horizontal: ${wp('5%')}
`;
const styles = StyleSheet.create({
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
    marginBottom: wp('3%'),
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: wp('3%'),
  },
  addPayment: {
    borderStyle: 'dashed',
    borderRadius: 50,
    borderWidth: StyleSheet.hairlineWidth + 0.5,
    height: 50,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
