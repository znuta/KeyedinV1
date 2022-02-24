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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
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
import { GetNigerianBank, GetUserBank, saveBank, validateAccountNumber } from 'src/redux/actions/payment/addCard/cardSetup';
import { setLoading } from 'src/redux/actions/AuthActions';
import { BASEURL } from 'src/constants/Services';
import axios from 'axios';
import Empty from 'src/component/Empty';
import PaymentCard from 'src/component/PaymentCard';
import Toast from 'src/component/Toast';
import AddBank from '../AddBank';
const SCREEN_HEIGHT = Dimensions.get('window').height;

const mock = [];

const Payment = props => {
  const navigation = useNavigation();
  const {auth} = useSelector(state=>state)
  const [checked, setchecked] = useState(false);
  const [cards, setCards] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const refDepositeSheet = useRef();
  const refBankSheet = useRef();
  const [value, setValue] = useState({});
  const [bankValue, setBankValue] = useState({});
  const [paymentResponse, setPaymentResponse] = useState({});
  const dispatch = useDispatch()
  const [banks, setBanks] = useState([])
  const [userBank, setUserBank] = useState({})
  const [values, setValues] = useState({})
  const [bankItems, setBankItems] = useState([])
  const [localToast, setLocalToast] = useState({});
  const {bank, account_number,account_name, amount} = values
  // const onChangeText = (key, value) => {
  
  //   setValues({...values, [key]: value})
    
  // };
  const _onChange = (k, v) => setValue({ ...value, [k]: v });
  const onChange = (key, value) => {
  
    setValues({...values, [key]: value})
    
  };
  useEffect(()=>{
    dispatch(GetUserBank((res,error)=>{
      if (res !==null) {
        const {data = []} = res.data
        if (data.length) {
          setUserBank(data[0])
          const payload = data[0]
          setUserBank(payload)
          setValues({...values, bank: payload.bank_id, account_number: payload.account_number, account_name: payload.account_name})
        }
        
        console.log("___RES__USER_BANK",res)
      }else{
        console.log("___ERROR__USER_BANK",error)
      }

    }))
    dispatch(GetNigerianBank((res,error)=>{
      if (res !==null) {
        const {data} = res.data
        setBanks(data)
        const bankSelections = []
        data.forEach(item => {
          bankSelections.push({label: item.name, value: item.id})
        });
        setBankItems(bankSelections)
        console.log("___RES__NIGERIAN_BANK",res)
      }else{
        console.log("___ERROR__NIGERIAN_BANK",error)
      }

    }))
  },[])


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
        console.log("___LOG__CARDS", res)
        const {data} = res.data
        setCards(data)};

      }));
   
  }, []);
  

  useEffect(()=>{
    dispatch(GetCards((res,err)=>{
      if (err !== null) console.log("___ERROR__Card__HIis", err)

      if (res !== null){ 
        const {data} = res.data
        console.log("____GET_CARD_ RES__", res)
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

  const LeftButton = () => {
    return (
      <TouchableOpacity
        // style={{ marginLeft: 'auto'}}
        onPress={() => {
          refBankSheet.current.open()
          }}>
        <MaterialCommunityIcons name="bank-plus" size={28} color="white" />
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
          height: wp('35%'),
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <BackButton />
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: wp('5%'), marginLeft: 'auto', marginRight: 'auto' }}>
          Set-Up Payments
        </Text>
        <LeftButton />
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
         data={cards}
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
           <Toast {...localToast}/>
        <CardDetails _onChange={_onChange} refreshing={refreshing} setstep={() => {
             setRefreshing(true)
          dispatch(SetupPayment(value, (ref) => {
            dispatch(AddPaymentApi({...ref, amount: 50/100},
              (res,err)=>{
                if (res !==null) {
                  const {data} = res.data
                  setLocalToast({ title: "Successful", message: `New payment card added.`, show: true, type:"success", callback: ()=>{
                    setLocalToast({})
                    refDepositeSheet.current.close()
                    setRefreshing(false)
                  }})
                  console.log("___RES__BANK__", res)
                 
                }else{
                  setLocalToast({ title: "Card Error", message: "An error occured while adding card details", show: true, type:"error", callback: ()=>{
                    setLocalToast({})
                    
                    setRefreshing(false)
                  }})
                  console.log("___ERROR___BANK",error)
                }
      
              })
              )
              setPaymentResponse(ref)
          }))
        }}  />
      </RBSheet>

      <RBSheet
        ref={refBankSheet}
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
            <Toast {...localToast}/>
        <AddBank values={values} refreshing={refreshing} bankItems={bankItems} onChangeText={onChange} setstep={() => {
          setRefreshing(true)
          const newBank = banks.filter(x=> x.id === bank)
         
          dispatch(validateAccountNumber({...values, bank: newBank[0]},(res,error)=>{
            if (res !==null) {
              const {data} = res.data
             dispatch(saveBank({account_number,account_name,user_id: auth.userData.id, bank_id: newBank[0].id},(res,error)=>{
                if (res !==null) {
                  const {data} = res.data
                  setLocalToast({ title: "Successful", message: `Your withdrawal bank account has now been update.`, show: true, type:"success", callback: ()=>{
                    setLocalToast({})
                    refBankSheet.current.close()
                    setRefreshing(false)
                  }})
                  console.log("___RES__BANK__", res)
                 
                }else{
                  setLocalToast({ title: "Bank Error", message: "An error occured while updating your bank details", show: true, type:"error", callback: ()=>{
                    setLocalToast({})
                    
                    setRefreshing(false)
                  }})
                  console.log("___ERROR___BANK",error)
                }
              }))
              console.log("___RES__Valid3",res)
            }else{
              setLocalToast({ title: "Bank Error", message: "An error occured while validating your bank details", show: true, type:"error", callback: ()=>{
                setLocalToast({})
             
                setRefreshing(false)
              }})
              console.log("___ERROR__Valid_BANK",error)
            }
           
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
