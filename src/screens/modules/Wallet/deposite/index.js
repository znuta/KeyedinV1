import React, { useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import CardDetails from './CardDetails';
import Deposit from './Deposit';
import { useDispatch, useSelector } from "react-redux";
import { SetupPayment } from 'src/redux/actions/payment/addCard/cardSetup';
import { setLoading } from 'src/redux/actions/AuthActions';
import { BASEURL } from 'src/constants/Services';
import axios from 'axios';
const Index = (props) => {
  const {refDepositeSheet} = props
  const [steps, setsteps] = useState(0);
  const [value, setValue] = useState({});
  const dispatch = useDispatch()
  const {auth} = useSelector(state=>state)
    const _onChange = (k, v) => setValue({...value, [k]: v});
  
    const AddPaymentApi = async (ref) => {

      let uri = BASEURL + `/wallets/add-money/${auth.userData.id}`;
     
      let data = {
        payment_ref: ref,
        amount: value.amount,
        
      };
  
      dispatch(setLoading(true));
      axios.post(uri, data,{
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: 'Bearer' + ' ' + auth.token,
        },
      }) .then(res => {
          console.log('Proposal sent', res);
          dispatch(setLoading(false));
          refDepositeSheet.current.close();
          
        })
        .catch(error => {
          console.log("__ERROR_RESPONSE__",error.response);
         dispatch(setLoading(false));
         
        });
    };
  
  const nextStep = () => {
    setsteps(steps + 1)
  }
  switch (steps) {
    case 0:
      return <Deposit onChangeText={_onChange} setstep={nextStep} />;

    case 1:
      return <CardDetails _onChange={_onChange} setstep={() => {
        dispatch(SetupPayment(value, (ref) => {
          AddPaymentApi(ref)  
        }))
      }}  />;
  }
};
export default Index;
