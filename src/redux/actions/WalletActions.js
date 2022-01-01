import { SAVE_BALANCE, SET_TRANSACTIONS } from "../action-types";
import { BASEURL } from "../../constants/Services";
import axios from "axios";
import { getToken } from "./AuthActions";


const setTransactions = (transactions) => {
  return {
    type: SET_TRANSACTIONS,
    transactions: transactions,
  };
};

export const getAllTransactions =  (callback) => async (dispatch) => {
  const token = await getToken()
  console.log("Trying to get all user transactions...");
  let uri = BASEURL + `/wallet/txn/${token}`;

  try {
    axios.get(uri, {
    
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Authorization: "Bearer " + token,
      },
    })
    
      .then((res) => {
        dispatch(setTransactions(res.data));
        callback();

        return;
      })
      .catch((error) => {
        console.log("at error", error);
      });
  } catch (error) {
    console.log(error);
  }
};


export const saveBalance = data => {
  return { type: SAVE_BALANCE, data: data }
}
