import axios from 'axios';
import { BASEURL } from 'src/constants/Services';
import RNPaystack from 'react-native-paystack';
import { setLoading } from 'src/redux/actions/AuthActions';

export const SetupPayment = (formvalues, cb) => async (dispatch, getState) => {
  console.log('====iside paymentS');
  const {expiry, cardNumber, cvv, amount} = formvalues;
  const result = expiry.split('/');
  const payStackValues = {
    expiryMonth: result[0],
    expiryYear: result[1],
    cvc: cvv,
    cardNumber,
    email: getState().auth.userData.email,
    amountInKobo:amount?amount*100 : 50,
    subAccount: '',
  };

  console.log("__PAYMENT___", payStackValues)

  try {
    const reference = await RNPaystack.chargeCard(payStackValues);
    /* adding ref ID to phastmoney server */
    console.log("__CARD___",reference);

    cb(reference);
  } catch (error) {
    //console.log(error.response.data);
    // dispatch(showNotification(error.response.data.responseCode, error.response.data.responseMessage))
    // dispatch(showNotification('ERR', error.message));

    console.log('====error', error); // error is a javascript Error object
    console.log('====error message', error.message);
    console.log('====error code', error.code);
    cb();
  }
};


export const ChargeCard = (formvalues, callback) => async (dispatch, getState) => {
 
    let uri = BASEURL + `/wallets/charge-card`;
    
    dispatch(setLoading(true));
    
    axios.post(uri, formvalues,{
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: 'Bearer' + ' ' + getState().auth.token,
      },
    }).then(res => {

      dispatch(setLoading(false));
      callback(res,null)
    
      }).catch(error => {
        
        callback(null,error)
      dispatch(setLoading(false));
      });
};

export const AddPaymentApi = (ref, callback) => async (dispatch, getState) =>  {
 
  let uri = BASEURL + `/wallets/add-money/${getState().auth.userData.id}`;
 
  let data = {
    payment_ref: ref.reference,
    amount: ref.amount,
    
  };

  dispatch(setLoading(true));
  axios.post(uri, data,{
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer' + ' ' + getState().auth.token,
    },
  }) .then(res => {
     
      dispatch(setLoading(false));
      callback(res,null)
    
    })
    .catch(error => {
     
      callback(null,error)
     dispatch(setLoading(false));
     
    });
};

export const GetCards = (callback) => async (dispatch, getState) =>  {
  let uri = BASEURL + `/wallets/cards/${getState().auth.userData.id}`;

  dispatch(setLoading(true));
  axios.get(uri, {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: 'Bearer' + ' ' + getState().auth.token,
    },
  }).then(res => {
    
      dispatch(setLoading(false));
      callback(res,null)

    }).catch(error => {
      
      dispatch(setLoading(false));
      callback(null,error)
      
    });
};

export const GetNigerianBank = (callback) => async (dispatch, getState) =>  {
  let uri = BASEURL + `/wallets/banks`;

  dispatch(setLoading(true));
  axios.get(uri, {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: 'Bearer' + ' ' + getState().auth.token,
    },
  }).then(res => {
    
      dispatch(setLoading(false));
      callback(res,null)

    }).catch(error => {
      
      dispatch(setLoading(false));
      callback(null,error)
      
    });
};


export const validateAccountNumber = (payload, callback) => async (dispatch, getState) =>  {
  console.log("__PAYLOAD__VSLI__", payload)
  const { code } = payload.bank
  let uri = BASEURL + `/wallets/banks?bank_code${code}&account_number${payload.account}`;
 
  dispatch(setLoading(true));
  axios.get(uri,{
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer' + ' ' + getState().auth.token,
    },
  }).then(res => {
     
      dispatch(setLoading(false));
      callback(res,null)
    
    }).catch(error => {
     
      callback(null,error)
     dispatch(setLoading(false));
     
    });
};


export const saveBank = (payload, callback) => async (dispatch, getState) =>  {
  console.log("__PAYLOAD__VSLI__", payload)
 
  let uri = BASEURL + `/wallets/banks/save`;
 
  dispatch(setLoading(true));
  axios.post(uri,{...payload},{
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer' + ' ' + getState().auth.token,
    },
  }).then(res => {
     
      dispatch(setLoading(false));
      callback(res,null)
    
    }).catch(error => {
     
      callback(null,error)
     dispatch(setLoading(false));
     
    });
};


export const GetUserBank = (callback) => async (dispatch, getState) =>  {
  let uri = BASEURL + `/wallets/bank-accounts/${getState().auth.userData.id}`;

  dispatch(setLoading(true));
  axios.get(uri, {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: 'Bearer' + ' ' + getState().auth.token,
    },
  }).then(res => {
    
      dispatch(setLoading(false));
      callback(res,null)

    }).catch(error => {
      
      dispatch(setLoading(false));
      callback(null,error)
      
    });
};


export const intializePayment = (payload, callback) => async (dispatch, getState) =>  {
  console.log("__PAYLOAD__VSLI__", payload)
 
  let uri = BASEURL + `/wallets/initialize-payment-gateway`;
 
  dispatch(setLoading(true));
  axios.post(uri,{...payload},{
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer' + ' ' + getState().auth.token,
    },
  }).then(res => {
     
      dispatch(setLoading(false));
      callback(res,null)
    
    }).catch(error => {
     
      callback(null,error)
     dispatch(setLoading(false));
     
    });
};

export const tranferFund = (payload, callback) => async (dispatch, getState) =>  {
  console.log("__PAYLOAD__VSLI__", payload)
 
  let uri = BASEURL + `/wallets/send-money`;
 
  dispatch(setLoading(true));
  axios.post(uri,{...payload, user_id: getState().auth.userData.id},{
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer' + ' ' + getState().auth.token,
    },
  }).then(res => {
     
      dispatch(setLoading(false));
      callback(res,null)
    
    }).catch(error => {
     
      callback(null,error)
     dispatch(setLoading(false));
     
    });
};